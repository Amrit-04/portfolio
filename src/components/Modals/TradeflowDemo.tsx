import React, { useState } from 'react';
import { evaluatePreTradeRisk, applyTransition, Order, RiskLimits } from '../../lib/tradeflowFsm';
import { Play, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

export const TradeflowDemo: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    orderId: 'ORD-98214',
    symbol: 'AAPL',
    side: 'BUY',
    qty: 500,
    cumQty: 0,
    price: 185.00,
    state: 'PendingNew',
    account: 'INST-EQ-01'
  });

  const lastPrice = 184.50;
  const currentNotional = 450000;

  const [limits, setLimits] = useState<RiskLimits>({
    maxOrderQty: 1000,
    maxDailyNotional: 1000000,
    priceCollarBps: 500, // 5%
    killSwitchActive: false
  });

  const [riskOutcome, setRiskOutcome] = useState<any>(null);
  const [log, setLog] = useState<string[]>([
    'OMS initialized. Order state: PendingNew. Ready for pre-trade risk evaluation.'
  ]);

  const runRiskCheck = () => {
    const res = evaluatePreTradeRisk(order, lastPrice, currentNotional, limits);
    setRiskOutcome(res);
    if (res.passed) {
      const trans = applyTransition(order, 'RiskPassed');
      setOrder(trans.order);
      setLog(prev => [
        `[Risk Approved in ${res.evaluationTimeNs.toFixed(0)} ns] All 7 pre-trade risk rules passed. Order transitioned to New.`,
        ...prev
      ]);
    } else {
      const trans = applyTransition(order, 'RiskRejected');
      setOrder(trans.order);
      setLog(prev => [
        `[Risk Rejected in ${res.evaluationTimeNs.toFixed(0)} ns] ${res.rejectReason}. Order transitioned to Rejected.`,
        ...prev
      ]);
    }
  };

  const executeFill = (fillQty: number) => {
    const trans = applyTransition(order, 'Fill', fillQty);
    if (trans.error) {
      setLog(prev => [`[Fill Error] ${trans.error}`, ...prev]);
    } else {
      setOrder(trans.order);
      setLog(prev => [
        `[Execution Fill] Received fill of ${fillQty} shares. cum_qty=${trans.order.cumQty}/${trans.order.qty}. State: ${trans.order.state}`,
        ...prev
      ]);
    }
  };

  const resetOrder = () => {
    setOrder({
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      symbol: 'AAPL',
      side: 'BUY',
      qty: 500,
      cumQty: 0,
      price: 185.00,
      state: 'PendingNew',
      account: 'INST-EQ-01'
    });
    setRiskOutcome(null);
    setLog(['Order reset to PendingNew. Ready for risk check.']);
  };

  return (
    <div className="space-y-6">
      {/* Tier Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-900 sketch-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded">TIER A: RUNS IN BROWSER</span>
            <span className="text-xs text-slate-500">Go OMS FSM & Redis Lua Risk Check</span>
          </div>
          <h3 className="text-lg font-bold mt-1">Tradeflow: Pre-Trade Risk Engine & State Transitions</h3>
        </div>
        <div className="text-right font-mono">
          <div className="text-xs text-slate-500">Verified Benchmarks</div>
          <div className="text-sm font-bold text-emerald-600">113 ns/op OMS | 311 ns/op Risk</div>
          <div className="text-[10px] text-slate-400">14.38 ms median / 17.99 ms p99 end-to-end</div>
        </div>
      </div>

      {/* Interactive Controls & FSM State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Order Inspector & Rules Setup */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Order Parameters</h4>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <label className="text-slate-500 block text-[11px]">Symbol:</label>
                <input
                  type="text"
                  value={order.symbol}
                  onChange={e => setOrder({ ...order, symbol: e.target.value })}
                  className="w-full p-1.5 sketch-border bg-slate-50 dark:bg-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 block text-[11px]">Qty (shares):</label>
                  <input
                    type="number"
                    value={order.qty}
                    onChange={e => setOrder({ ...order, qty: Number(e.target.value) })}
                    className="w-full p-1.5 sketch-border bg-slate-50 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block text-[11px]">Price ($):</label>
                  <input
                    type="number"
                    value={order.price}
                    onChange={e => setOrder({ ...order, price: Number(e.target.value) })}
                    className="w-full p-1.5 sketch-border bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <label className="flex items-center gap-2 text-xs font-mono text-rose-600 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={limits.killSwitchActive}
                  onChange={e => setLimits({ ...limits, killSwitchActive: e.target.checked })}
                  className="accent-rose-600"
                />
                Trigger Emergency Kill Switch
              </label>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                disabled={order.state !== 'PendingNew'}
                onClick={runRiskCheck}
                className="flex-1 py-1.5 bg-emerald-600 disabled:opacity-40 text-white rounded sketch-border text-xs font-bold"
              >
                Evaluate Risk
              </button>
              <button
                onClick={resetOrder}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded sketch-border text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* FSM Actions */}
          <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Simulate Market Fills</h4>
            <div className="flex gap-2">
              <button
                disabled={order.state !== 'New' && order.state !== 'PartiallyFilled'}
                onClick={() => executeFill(250)}
                className="flex-1 py-1.5 bg-blue-600 disabled:opacity-40 text-white rounded sketch-border text-xs font-bold"
              >
                Partial Fill (250)
              </button>
              <button
                disabled={order.state !== 'New' && order.state !== 'PartiallyFilled'}
                onClick={() => executeFill(500)}
                className="flex-1 py-1.5 bg-purple-600 disabled:opacity-40 text-white rounded sketch-border text-xs font-bold"
              >
                Full Fill
              </button>
            </div>
          </div>
        </div>

        {/* OMS FSM State Visualization */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">OMS State Machine</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                order.state === 'Filled'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  : order.state === 'New' || order.state === 'PartiallyFilled'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : order.state === 'Rejected'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
              }`}>
                {order.state}
              </span>
            </div>

            {/* State Graph Flow */}
            <div className="flex flex-wrap items-center gap-2 py-2 text-xs font-mono justify-center">
              {['PendingNew', 'New', 'PartiallyFilled', 'Filled'].map((s, idx) => {
                const isActive = order.state === s;
                return (
                  <React.Fragment key={s}>
                    <div className={`px-3 py-1.5 rounded sketch-border ${
                      isActive
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                    }`}>
                      {s}
                    </div>
                    {idx < 3 && <span className="text-slate-400">→</span>}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span>Filled Shares:</span>
                <span>{order.cumQty} / {order.qty} ({((order.cumQty / order.qty) * 100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(order.cumQty / order.qty) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audit Log Console */}
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs sketch-border space-y-1 max-h-48 overflow-y-auto">
            <div className="text-slate-500 border-b border-slate-800 pb-1 mb-2 font-bold uppercase text-[10px]">
              Tradeflow Event Audit Ledger (PostgreSQL Outbox Stream)
            </div>
            {log.map((entry, idx) => (
              <div key={idx} className="leading-relaxed">
                &gt; {entry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
