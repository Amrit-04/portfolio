// Client-side TypeScript port of the Tradeflow Order State Machine & Pre-Trade Risk Engine.
// This is a browser simulation of the Go OMS / Redis Lua engine — not the production services.

export type OrderState =
  | 'PendingNew'
  | 'New'
  | 'PartiallyFilled'
  | 'Filled'
  | 'PendingCancel'
  | 'Canceled'
  | 'Rejected'
  | 'Expired';

export type Trigger = 'SubmitNew' | 'RiskPassed' | 'RiskRejected' | 'Fill' | 'CancelRequest' | 'CancelAck';

export interface Order {
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  cumQty: number;
  price: number;
  state: OrderState;
  account: string;
}

export interface RiskLimits {
  maxOrderQty: number;
  maxDailyNotional: number;
  priceCollarBps: number;
  killSwitchActive: boolean;
}

export interface RiskCheckResult {
  passed: boolean;
  rejectReason?: string;
  ruleViolated?: string;
  evaluationTimeNs: number;
}

/**
 * Pre-trade risk evaluation implementing all 7 institutional checks:
 * 1. Emergency Kill Switch
 * 2. Quantity Sanity (qty > 0)
 * 3. Max Order Quantity (qty <= maxOrderQty)
 * 4. Price Sanity (price > 0)
 * 5. Price Collar Band (diff in bps <= priceCollarBps)
 * 6. Daily Gross Notional (cumulative notional <= maxDailyNotional)
 * 7. Compliance Symbol Restriction (symbol not in restricted list)
 */
export function evaluatePreTradeRisk(
  order: Order,
  lastPrice: number,
  currentDailyNotional: number,
  limits: RiskLimits
): RiskCheckResult {
  const t0 = performance.now();

  // Rule 1: Emergency Kill Switch
  if (limits.killSwitchActive) {
    return {
      passed: false,
      rejectReason: 'KILL_SWITCH_ACTIVE: account or venue is under emergency trading halt',
      ruleViolated: 'Rule 1 (Emergency Kill Switch)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  // Rule 2: Quantity Sanity (must be strictly positive integer)
  if (order.qty <= 0 || !Number.isFinite(order.qty)) {
    return {
      passed: false,
      rejectReason: `INVALID_QUANTITY: order quantity must be strictly positive (got ${order.qty})`,
      ruleViolated: 'Rule 2 (Quantity Sanity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  // Rule 3: Max Single Order Size
  if (order.qty > limits.maxOrderQty) {
    return {
      passed: false,
      rejectReason: `MAX_ORDER_QTY_EXCEEDED: ${order.qty} exceeds limit ${limits.maxOrderQty}`,
      ruleViolated: 'Rule 3 (Max Order Quantity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  // Rule 4: Price Sanity (must be strictly positive)
  if (order.price <= 0 || !Number.isFinite(order.price)) {
    return {
      passed: false,
      rejectReason: `INVALID_PRICE: order limit price must be strictly positive (got ${order.price})`,
      ruleViolated: 'Rule 4 (Price Sanity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  // Rule 5: Price Collar Band (reference price deviation collar)
  if (lastPrice > 0) {
    const diff = Math.abs(order.price - lastPrice);
    const bpsDiff = Math.floor((diff * 10000) / lastPrice);
    if (bpsDiff > limits.priceCollarBps) {
      return {
        passed: false,
        rejectReason: `PRICE_COLLAR_VIOLATION: price deviates by ${bpsDiff} bps from reference $${lastPrice} (limit: ${limits.priceCollarBps} bps)`,
        ruleViolated: 'Rule 5 (Price Collar Band)',
        evaluationTimeNs: (performance.now() - t0) * 1e6,
      };
    }
  }

  // Rule 6: Daily Gross Notional Exposure
  const orderNotional = order.qty * order.price;
  if (currentDailyNotional + orderNotional > limits.maxDailyNotional) {
    return {
      passed: false,
      rejectReason: `DAILY_NOTIONAL_EXCEEDED: cumulative exposure $${(currentDailyNotional + orderNotional).toLocaleString()} exceeds ceiling $${limits.maxDailyNotional.toLocaleString()}`,
      ruleViolated: 'Rule 6 (Daily Gross Notional)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  // Rule 7: Compliance Symbol Restriction
  const restrictedSymbols = ['RESTRICTED', 'BLOCKED', 'SANCTION'];
  if (restrictedSymbols.includes(order.symbol.toUpperCase())) {
    return {
      passed: false,
      rejectReason: `SYMBOL_RESTRICTED: ticker ${order.symbol} is on compliance restricted trading list`,
      ruleViolated: 'Rule 7 (Compliance Symbol Restriction)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  return {
    passed: true,
    evaluationTimeNs: (performance.now() - t0) * 1e6,
  };
}

/**
 * Applies a state machine transition to an order.
 * Guards against illegal fills, terminal states, and unexpected triggers.
 */
export function applyTransition(
  order: Order,
  trigger: Trigger,
  fillQty: number = 0
): { order: Order; error?: string } {
  const current = order.state;
  const updated: Order = { ...order };

  switch (current) {
    case 'PendingNew':
      if (trigger === 'RiskPassed') {
        updated.state = 'New';
        return { order: updated };
      }
      if (trigger === 'RiskRejected') {
        updated.state = 'Rejected';
        return { order: updated };
      }
      break;

    case 'New':
      if (trigger === 'Fill') {
        if (fillQty <= 0) {
          return { order, error: `Invalid fill quantity: ${fillQty}. Must be strictly positive.` };
        }
        if (fillQty > order.qty) {
          return {
            order,
            error: `Fill quantity ${fillQty} exceeds total order quantity ${order.qty}.`,
          };
        }
        updated.cumQty = fillQty;
        updated.state = fillQty === order.qty ? 'Filled' : 'PartiallyFilled';
        return { order: updated };
      }
      if (trigger === 'CancelRequest') {
        updated.state = 'PendingCancel';
        return { order: updated };
      }
      break;

    case 'PartiallyFilled':
      if (trigger === 'Fill') {
        if (fillQty <= 0) {
          return { order, error: `Invalid fill quantity: ${fillQty}. Must be strictly positive.` };
        }
        const remaining = order.qty - order.cumQty;
        if (fillQty > remaining) {
          return {
            order,
            error: `Fill quantity ${fillQty} exceeds remaining unfilled quantity ${remaining}.`,
          };
        }
        const newCum = order.cumQty + fillQty;
        updated.cumQty = newCum;
        updated.state = newCum === order.qty ? 'Filled' : 'PartiallyFilled';
        return { order: updated };
      }
      if (trigger === 'CancelRequest') {
        updated.state = 'PendingCancel';
        return { order: updated };
      }
      break;

    case 'PendingCancel':
      if (trigger === 'CancelAck') {
        updated.state = 'Canceled';
        return { order: updated };
      }
      break;

    case 'Filled':
    case 'Canceled':
    case 'Rejected':
    case 'Expired':
      return {
        order,
        error: `Illegal transition: order is in terminal state '${current}'. No further triggers permitted.`,
      };
  }

  return {
    order,
    error: `Invalid transition trigger '${trigger}' from state '${current}'.`,
  };
}
