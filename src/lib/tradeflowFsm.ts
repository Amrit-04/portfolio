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

export function evaluatePreTradeRisk(
  order: Order,
  lastPrice: number,
  currentDailyNotional: number,
  limits: RiskLimits
): RiskCheckResult {
  const t0 = performance.now();

  if (limits.killSwitchActive) {
    return {
      passed: false,
      rejectReason: 'KILL_SWITCH_ACTIVE: account is under emergency trading halt',
      ruleViolated: 'Rule 1 (Emergency Kill Switch)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  if (order.qty <= 0) {
    return {
      passed: false,
      rejectReason: 'INVALID_QUANTITY: order quantity must be strictly positive',
      ruleViolated: 'Rule 2 (Quantity Sanity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  if (order.qty > limits.maxOrderQty) {
    return {
      passed: false,
      rejectReason: `MAX_ORDER_QTY_EXCEEDED: ${order.qty} exceeds limit ${limits.maxOrderQty}`,
      ruleViolated: 'Rule 3 (Max Order Quantity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  if (order.price <= 0) {
    return {
      passed: false,
      rejectReason: 'INVALID_PRICE: order limit price must be strictly positive',
      ruleViolated: 'Rule 4 (Price Sanity)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  if (lastPrice > 0) {
    const diff = Math.abs(order.price - lastPrice);
    const bpsDiff = Math.floor((diff * 10000) / lastPrice);
    if (bpsDiff > limits.priceCollarBps) {
      return {
        passed: false,
        rejectReason: `PRICE_COLLAR_VIOLATION: price deviates by ${bpsDiff} bps (limit: ${limits.priceCollarBps} bps)`,
        ruleViolated: 'Rule 5 (Price Collar Band)',
        evaluationTimeNs: (performance.now() - t0) * 1e6,
      };
    }
  }

  const orderNotional = order.qty * order.price;
  if (currentDailyNotional + orderNotional > limits.maxDailyNotional) {
    return {
      passed: false,
      rejectReason: `DAILY_NOTIONAL_EXCEEDED: cumulative notional ${currentDailyNotional + orderNotional} exceeds ceiling ${limits.maxDailyNotional}`,
      ruleViolated: 'Rule 6 (Daily Gross Notional)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  if (order.symbol === 'RESTRICTED') {
    return {
      passed: false,
      rejectReason: 'SYMBOL_RESTRICTED: compliance restricted list violation',
      ruleViolated: 'Rule 7 (Compliance Symbol Restriction)',
      evaluationTimeNs: (performance.now() - t0) * 1e6,
    };
  }

  return {
    passed: true,
    evaluationTimeNs: (performance.now() - t0) * 1e6,
  };
}

export function applyTransition(
  order: Order,
  trigger: Trigger,
  fillQty: number = 0
): { order: Order; error?: string } {
  const current = order.state;
  const updated = { ...order };

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
        if (fillQty <= 0) return { order, error: 'Fill quantity must be positive' };
        if (fillQty >= order.qty) {
          updated.cumQty = order.qty;
          updated.state = 'Filled';
        } else {
          updated.cumQty += fillQty;
          updated.state = 'PartiallyFilled';
        }
        return { order: updated };
      }
      if (trigger === 'CancelRequest') {
        updated.state = 'PendingCancel';
        return { order: updated };
      }
      break;

    case 'PartiallyFilled':
      if (trigger === 'Fill') {
        const remaining = order.qty - order.cumQty;
        if (fillQty >= remaining) {
          updated.cumQty = order.qty;
          updated.state = 'Filled';
        } else {
          updated.cumQty += fillQty;
        }
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
      return { order, error: `Illegal transition: order is in terminal state ${current}` };
  }

  return { order, error: `Invalid transition trigger ${trigger} from state ${current}` };
}
