import React, { useState } from 'react';
import { evaluatePreTradeRisk, applyTransition, Order, RiskLimits, OrderState } from '../../lib/tradeflowFsm';
import { RotateCcw, ShieldCheck, ShieldX, Play } from 'lucide-react';

const FLOW: OrderState[] = ['PendingNew', 'New', 'PartiallyFilled', 'Filled'];

export default function TradeflowDemo() {
  const [order, setOrder] = useState<Order>({
    orderId: 'ORD-98214',
    symbol: 'AAPL',
    side: 'BUY',
    qty: 500,
    cumQty: 0,
    price: 185.0,
    state: 'PendingNew',
    account: 'INST-EQ-01',
  });
  const lastPrice = 184.5;
  const currentNotional = 450000;
  const [limits, setLimits] = useState<RiskLimits>({
    maxOrderQty: 1000,
    maxDailyNotional: 1000000,
    priceCollarBps: 500,
    killSwitchActive: false,
  });
  const [customFill, setCustomFill] = useState<number>(250);
  const [risk, setRisk] = useState<{ passed: boolean; text: string; timeNs: number } | null>(null);
  const [log, setLog] = useState<string[]>([
    'OMS initialized — order ORD-98214 in state PendingNew. Awaiting pre-trade risk evaluation.',
  ]);

  const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 40));

  const runRisk = () => {
    const res = evaluatePreTradeRisk(order, lastPrice, currentNotional, limits);
    const trans = applyTransition(order, res.passed ? 'RiskPassed' : 'RiskRejected');
    setOrder(trans.order);
    setRisk({
      passed: res.passed,
      text: res.passed ? 'All 7 pre-trade risk checks passed' : `${res.ruleViolated}: ${res.rejectReason}`,
      timeNs: res.evaluationTimeNs,
    });
    push(
      res.passed
        ? `[risk ✓ ${(res.evaluationTimeNs / 1000).toFixed(2)} µs] All 7 pre-trade rules passed → state New`
        : `[risk ✗ ${(res.evaluationTimeNs / 1000).toFixed(2)} µs] ${res.ruleViolated}: ${res.rejectReason} → state Rejected`
    );
  };

  const fill = (qty: number) => {
    const trans = applyTransition(order, 'Fill', qty);
    if (trans.error) {
      push(`[fill rejected] ${trans.error}`);
      return;
    }
    setOrder(trans.order);
    push(`[fill executed] ${qty} shares filled — cumulative ${trans.order.cumQty}/${trans.order.qty}, state ${trans.order.state}`);
  };

  const cancelFlow = () => {
    const trans = applyTransition(order, 'CancelRequest');
    if (trans.error) return push(`[cancel rejected] ${trans.error}`);
    setOrder(trans.order);
    push(`[cancel requested] → state ${trans.order.state}`);
  };

  const cancelAck = () => {
    const trans = applyTransition(order, 'CancelAck');
    if (trans.error) return push(`[cancel ack error] ${trans.error}`);
    setOrder(trans.order);
    push(`[cancel acked] → order terminal state ${trans.order.state}`);
  };

  const reset = () => {
    const newId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrder({
      orderId: newId,
      symbol: 'AAPL',
      side: 'BUY',
      qty: 500,
      cumQty: 0,
      price: 185.0,
      state: 'PendingNew',
      account: 'INST-EQ-01',
    });
    setLimits({
      maxOrderQty: 1000,
      maxDailyNotional: 1000000,
      priceCollarBps: 500,
      killSwitchActive: false,
    });
    setCustomFill(250);
    setRisk(null);
    setLog([`New order ${newId} initialized in state PendingNew. Ready for risk check.`]);
  };

  // Rule test scenarios
  const applyScenario = (type: string) => {
    reset();
    setTimeout(() => {
      if (type === 'pass') {
        setOrder((o) => ({ ...o, symbol: 'AAPL', qty: 500, price: 185.0 }));
        setLimits((l) => ({ ...l, killSwitchActive: false }));
      } else if (type === 'kill_switch') {
        setLimits((l) => ({ ...l, killSwitchActive: true }));
      } else if (type === 'zero_qty') {
        setOrder((o) => ({ ...o, qty: 0 }));
      } else if (type === 'max_qty') {
        setOrder((o) => ({ ...o, qty: 1500 }));
      } else if (type === 'bad_price') {
        setOrder((o) => ({ ...o, price: -10 }));
      } else if (type === 'collar') {
        setOrder((o) => ({ ...o, price: 210.0 })); // > 500 bps from 184.5
      } else if (type === 'daily_notional') {
        setOrder((o) => ({ ...o, qty: 3500, price: 185.0 })); // 3500 * 185 = 647,500 + 450,000 > 1,000,000
      } else if (type === 'restricted') {
        setOrder((o) => ({ ...o, symbol: 'RESTRICTED' }));
      }
    }, 10);
  };

  const canFill = order.state === 'New' || order.state === 'PartiallyFilled';
  const remaining = order.qty - order.cumQty;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Client-Side Port of Go OMS FSM + Redis Lua Risk Engine</p>
          <p className="text-sm text-ink2 mt-1">
            Browser simulation — demonstrates all 7 pre-trade risk rules, fill accounting, and FSM transition guards.
          </p>
        </div>
        <p className="font-mono text-xs text-ink3 text-right">
          Production benchmarks: 113 ns/op OMS · 311 ns/op risk
          <br />
          Client JS timer: informal browser measurement (~0.05–0.2 ms)
        </p>
      </div>

      {/* Preset Rule Tester */}
      <div className="frame-sm bg-paper2/50 p-3">
        <p className="label-mono text-ink3 mb-2">Preset Rule Test Scenarios</p>
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          <button onClick={() => applyScenario('pass')} className="chip hover:border-ink cursor-pointer">
            Valid (Pass All 7)
          </button>
          <button onClick={() => applyScenario('kill_switch')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R1: Kill Switch
          </button>
          <button onClick={() => applyScenario('zero_qty')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R2: Zero Qty
          </button>
          <button onClick={() => applyScenario('max_qty')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R3: Exceed Max Qty
          </button>
          <button onClick={() => applyScenario('bad_price')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R4: Negative Price
          </button>
          <button onClick={() => applyScenario('collar')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R5: Price Collar
          </button>
          <button onClick={() => applyScenario('daily_notional')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R6: Exceed Notional
          </button>
          <button onClick={() => applyScenario('restricted')} className="chip border-red text-red hover:bg-paper cursor-pointer">
            R7: Restricted Ticker
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-5">
        <div className="space-y-4">
          {/* Order Ticket */}
          <div className="frame-sm bg-paper p-4 space-y-3 shadow-hard-sm">
            <div className="flex justify-between items-center">
              <p className="label-mono text-ink3">Order Ticket</p>
              <span className="font-mono text-xs text-ink3">{order.orderId}</span>
            </div>
            <div className="font-mono text-xs space-y-2">
              <label className="block">
                <span className="text-ink3 block text-[10px] uppercase">Symbol (try RESTRICTED)</span>
                <input
                  className="input-frame w-full !py-1.5 !text-xs"
                  value={order.symbol}
                  onChange={(e) => setOrder({ ...order, symbol: e.target.value.toUpperCase() })}
                  disabled={order.state !== 'PendingNew'}
                  data-testid="tf-symbol"
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-ink3 block text-[10px] uppercase">Quantity</span>
                  <input
                    type="number"
                    className="input-frame w-full !py-1.5 !text-xs"
                    value={order.qty}
                    onChange={(e) => setOrder({ ...order, qty: Number(e.target.value) })}
                    disabled={order.state !== 'PendingNew'}
                    data-testid="tf-qty"
                  />
                </label>
                <label className="block">
                  <span className="text-ink3 block text-[10px] uppercase">Limit Price ($)</span>
                  <input
                    type="number"
                    step="0.5"
                    className="input-frame w-full !py-1.5 !text-xs"
                    value={order.price}
                    onChange={(e) => setOrder({ ...order, price: Number(e.target.value) })}
                    disabled={order.state !== 'PendingNew'}
                    data-testid="tf-price"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 pt-1 text-red font-bold text-xs">
                <input
                  type="checkbox"
                  checked={limits.killSwitchActive}
                  onChange={(e) => setLimits({ ...limits, killSwitchActive: e.target.checked })}
                  className="accent-[#D9381E]"
                  data-testid="tf-kill-switch"
                />
                Trip emergency kill switch
              </label>
              <p className="text-[10px] text-ink3 leading-tight">
                Ref price: ${lastPrice} · Collar: {limits.priceCollarBps} bps · Notional: ${(order.qty * order.price).toLocaleString()} + used ${currentNotional.toLocaleString()} / max ${limits.maxDailyNotional.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                className="btn-ink flex-1 !py-2 !px-2 flex items-center justify-center gap-1.5"
                disabled={order.state !== 'PendingNew'}
                onClick={runRisk}
                data-testid="tf-evaluate-risk"
              >
                <Play className="w-3.5 h-3.5 text-accent" />
                <span>Evaluate risk</span>
              </button>
              <button
                className="btn-outline !py-2 !px-3"
                onClick={reset}
                aria-label="Reset fresh order"
                data-testid="tf-reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fills & Cancels */}
          <div className="frame-sm bg-paper p-4 space-y-2 shadow-hard-sm">
            <p className="label-mono text-ink3">Execution Controls</p>
            <div className="flex items-center gap-2 font-mono text-xs">
              <input
                type="number"
                value={customFill}
                onChange={(e) => setCustomFill(Number(e.target.value))}
                className="input-frame w-20 !py-1 !text-xs"
                placeholder="Qty"
                data-testid="tf-custom-fill-input"
              />
              <button
                className="btn-outline flex-1 !py-1.5 !px-2 text-xs"
                disabled={!canFill}
                onClick={() => fill(customFill)}
                data-testid="tf-custom-fill-btn"
              >
                Fill Custom
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-outline flex-1 !py-1.5 !px-2 text-xs"
                disabled={!canFill}
                onClick={() => fill(250)}
                data-testid="tf-partial-fill"
              >
                Partial (250)
              </button>
              <button
                className="btn-outline flex-1 !py-1.5 !px-2 text-xs"
                disabled={!canFill || remaining <= 0}
                onClick={() => fill(remaining)}
                data-testid="tf-full-fill"
              >
                Fill Rest ({remaining})
              </button>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                className="btn-outline flex-1 !py-1.5 !px-2 text-xs"
                disabled={!canFill}
                onClick={cancelFlow}
                data-testid="tf-cancel-req"
              >
                Cancel Request
              </button>
              <button
                className="btn-outline flex-1 !py-1.5 !px-2 text-xs"
                disabled={order.state !== 'PendingCancel'}
                onClick={cancelAck}
                data-testid="tf-cancel-ack"
              >
                Cancel Ack
              </button>
            </div>
          </div>

          {risk && (
            <div
              className={`frame-sm p-3 font-mono text-xs flex items-start gap-2 shadow-hard-sm ${
                risk.passed ? 'border-blue text-blue bg-paper' : 'border-red text-red bg-paper'
              }`}
              data-testid="tf-risk-result"
            >
              {risk.passed ? (
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <ShieldX className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold">{risk.passed ? 'Risk Check Passed' : 'Risk Rejected'}</p>
                <p className="text-[11px] mt-0.5 leading-snug">{risk.text}</p>
                <p className="text-[10px] opacity-75 mt-1 font-mono">
                  Browser evaluation time: {(risk.timeNs / 1000).toFixed(2)} µs
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 min-w-0">
          {/* State Machine Overview */}
          <div className="frame-sm bg-paper p-4 shadow-hard-sm">
            <div className="flex justify-between items-center">
              <p className="label-mono text-ink3">Order State Machine</p>
              <span
                className={`font-mono text-xs font-bold border-[1.5px] px-2 py-0.5 rounded-xs ${
                  order.state === 'Rejected' || order.state === 'Canceled'
                    ? 'border-red text-red'
                    : order.state === 'Filled'
                    ? 'border-blue bg-blue/10 text-blue'
                    : 'border-ink text-ink'
                }`}
                data-testid="tf-state"
              >
                {order.state}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-4 font-mono text-[11px]">
              {FLOW.map((s, i) => (
                <React.Fragment key={s}>
                  <span
                    className={`border-[1.5px] px-2 py-1 rounded-xs transition-colors ${
                      order.state === s ? 'border-ink bg-ink text-paper font-bold' : 'border-ink/40 text-ink3'
                    }`}
                  >
                    {s}
                  </span>
                  {i < FLOW.length - 1 && <span className="text-ink3">→</span>}
                </React.Fragment>
              ))}
              <span className="text-ink3 ml-2">· PendingCancel → Canceled</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between font-mono text-[11px] text-ink2">
                <span>Filled {order.cumQty} / {order.qty} shares</span>
                <span>{((order.cumQty / Math.max(1, order.qty)) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2.5 bg-paper2 border border-ink/40 mt-1 rounded-xs overflow-hidden">
                <div
                  className="h-full bg-blue transition-all duration-200"
                  style={{ width: `${Math.min(100, (order.cumQty / Math.max(1, order.qty)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audit Event Ledger */}
          <div className="bg-ink text-paper p-4 font-mono text-xs max-h-56 overflow-y-auto rounded-xs shadow-hard-sm" data-testid="tf-event-log">
            <p className="text-paper/60 border-b border-paper/20 pb-1.5 mb-2 uppercase text-[10px] tracking-[0.18em]">
              Event Ledger — Outbox Stream Replay
            </p>
            {log.map((entry, i) => (
              <p key={i} className="leading-relaxed text-paper/90">&gt; {entry}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
