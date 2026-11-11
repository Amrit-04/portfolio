import React, { useState } from 'react';
import { evaluatePreTradeRisk, applyTransition, Order, RiskLimits, OrderState } from '../../lib/tradeflowFsm';
import { RotateCcw, ShieldCheck, ShieldX } from 'lucide-react';

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
  const [risk, setRisk] = useState<{ passed: boolean; text: string } | null>(null);
  const [log, setLog] = useState<string[]>(['OMS initialized — order PendingNew, awaiting pre-trade risk evaluation.']);

  const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 40));

  const runRisk = () => {
    const res = evaluatePreTradeRisk(order, lastPrice, currentNotional, limits);
    const trans = applyTransition(order, res.passed ? 'RiskPassed' : 'RiskRejected');
    setOrder(trans.order);
    setRisk({ passed: res.passed, text: res.passed ? 'all 7 rules passed' : `${res.ruleViolated} — ${res.rejectReason}` });
    push(
      res.passed
        ? `[risk ✓ ${res.evaluationTimeNs.toFixed(0)} ns] all 7 pre-trade rules passed → state New`
        : `[risk ✗ ${res.evaluationTimeNs.toFixed(0)} ns] ${res.ruleViolated}: ${res.rejectReason} → state Rejected`
    );
  };

  const fill = (qty: number) => {
    const trans = applyTransition(order, 'Fill', qty);
    if (trans.error) return push(`[fill error] ${trans.error}`);
    setOrder(trans.order);
    push(`[fill] ${qty} sh filled — cum_qty ${trans.order.cumQty}/${trans.order.qty}, state ${trans.order.state}`);
  };

  const cancelFlow = () => {
    const trans = applyTransition(order, 'CancelRequest');
    if (trans.error) return push(`[cancel error] ${trans.error}`);
    setOrder(trans.order);
    push(`[cancel request] → state ${trans.order.state}`);
  };
  const cancelAck = () => {
    const trans = applyTransition(order, 'CancelAck');
    if (trans.error) return push(`[cancel error] ${trans.error}`);
    setOrder(trans.order);
    push(`[cancel ack] → state ${trans.order.state}`);
  };

  const reset = () => {
    setOrder({
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      symbol: 'AAPL',
      side: 'BUY',
      qty: 500,
      cumQty: 0,
      price: 185.0,
      state: 'PendingNew',
      account: 'INST-EQ-01',
    });
    setRisk(null);
    setLog(['Order reset to PendingNew. Ready for risk check.']);
  };

  const canFill = order.state === 'New' || order.state === 'PartiallyFilled';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Client-side port of the Go OMS FSM + Redis Lua risk rules</p>
          <p className="text-sm text-ink2 mt-1">
            Browser simulation — not a live FIX venue, Redis, Kafka or PostgreSQL. Native: 113 ns/op OMS · 311 ns/op risk.
          </p>
        </div>
        <p className="font-mono text-xs text-ink3 text-right">
          14.38 ms median / 17.99 ms p99 e2e
          <br />
          2,057 FIX orders, zero event loss
        </p>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5">
        <div className="space-y-4">
          <div className="frame-sm bg-paper p-4 space-y-3 shadow-hard-sm">
            <p className="label-mono text-ink3">Order ticket</p>
            <div className="font-mono text-xs space-y-2">
              <label className="block">
                <span className="text-ink3 block text-[10px] uppercase">symbol (try RESTRICTED)</span>
                <input className="input-frame w-full !py-1.5 !text-xs" value={order.symbol} onChange={(e) => setOrder({ ...order, symbol: e.target.value.toUpperCase() })} data-testid="tf-symbol" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-ink3 block text-[10px] uppercase">qty</span>
                  <input type="number" className="input-frame w-full !py-1.5 !text-xs" value={order.qty} onChange={(e) => setOrder({ ...order, qty: Number(e.target.value) })} data-testid="tf-qty" />
                </label>
                <label className="block">
                  <span className="text-ink3 block text-[10px] uppercase">limit $</span>
                  <input type="number" className="input-frame w-full !py-1.5 !text-xs" value={order.price} onChange={(e) => setOrder({ ...order, price: Number(e.target.value) })} data-testid="tf-price" />
                </label>
              </div>
              <label className="flex items-center gap-2 pt-1 text-red font-bold">
                <input type="checkbox" checked={limits.killSwitchActive} onChange={(e) => setLimits({ ...limits, killSwitchActive: e.target.checked })} className="accent-[#D9381E]" data-testid="tf-kill-switch" />
                trip emergency kill switch
              </label>
              <p className="text-[10px] text-ink3">
                ref price {lastPrice} · collar {limits.priceCollarBps} bps · daily notional used ${currentNotional.toLocaleString()} / ${limits.maxDailyNotional.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="btn-ink flex-1 !py-2 !px-2" disabled={order.state !== 'PendingNew'} onClick={runRisk} data-testid="tf-evaluate-risk">
                Evaluate risk
              </button>
              <button className="btn-outline !py-2 !px-3" onClick={reset} aria-label="Reset order" data-testid="tf-reset">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="frame-sm bg-paper p-4 space-y-2 shadow-hard-sm">
            <p className="label-mono text-ink3">Market fills & cancels</p>
            <div className="flex gap-2">
              <button className="btn-outline flex-1 !py-2 !px-2" disabled={!canFill} onClick={() => fill(250)} data-testid="tf-partial-fill">
                Partial 250
              </button>
              <button className="btn-outline flex-1 !py-2 !px-2" disabled={!canFill} onClick={() => fill(order.qty - order.cumQty)} data-testid="tf-full-fill">
                Rest
              </button>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline flex-1 !py-2 !px-2" disabled={!canFill} onClick={cancelFlow} data-testid="tf-cancel-req">
                Cancel req
              </button>
              <button className="btn-outline flex-1 !py-2 !px-2" disabled={order.state !== 'PendingCancel'} onClick={cancelAck} data-testid="tf-cancel-ack">
                Cancel ack
              </button>
            </div>
          </div>

          {risk && (
            <div className={`frame-sm p-3 font-mono text-xs flex items-start gap-2 ${risk.passed ? 'border-blue text-blue' : 'border-red text-red'}`} data-testid="tf-risk-result">
              {risk.passed ? <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" /> : <ShieldX className="w-4 h-4 shrink-0 mt-0.5" />}
              {risk.text}
            </div>
          )}
        </div>

        <div className="space-y-4 min-w-0">
          <div className="frame-sm bg-paper p-4 shadow-hard-sm">
            <div className="flex justify-between items-center">
              <p className="label-mono text-ink3">State machine</p>
              <span className={`font-mono text-xs font-bold border-[1.5px] px-2 py-0.5 ${order.state === 'Rejected' || order.state === 'Canceled' ? 'border-red text-red' : 'border-blue text-blue'}`} data-testid="tf-state">
                {order.state}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-4 font-mono text-[11px]">
              {FLOW.map((s, i) => (
                <React.Fragment key={s}>
                  <span className={`border-[1.5px] px-2 py-1 ${order.state === s ? 'border-ink bg-ink text-paper' : 'border-ink/40 text-ink3'}`}>{s}</span>
                  {i < FLOW.length - 1 && <span className="text-ink3">→</span>}
                </React.Fragment>
              ))}
              <span className="text-ink3 ml-2">· PendingCancel → Canceled</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between font-mono text-[11px] text-ink2">
                <span>filled {order.cumQty} / {order.qty}</span>
                <span>{((order.cumQty / Math.max(1, order.qty)) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2.5 bg-paper2 border border-ink/40 mt-1">
                <div className="h-full bg-blue" style={{ width: `${(order.cumQty / Math.max(1, order.qty)) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-ink text-paper p-4 font-mono text-xs max-h-52 overflow-y-auto" data-testid="tf-event-log">
            <p className="text-paper/60 border-b border-paper/20 pb-1.5 mb-2 uppercase text-[10px] tracking-[0.18em]">
              event ledger — outbox stream replay
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
