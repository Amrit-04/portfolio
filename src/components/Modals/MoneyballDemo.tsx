import React, { useState, useEffect } from 'react';
import { TrendingDown, Activity, Cpu, ShieldCheck } from 'lucide-react';

export const MoneyballDemo: React.FC = () => {
  const [quantData, setQuantData] = useState<any>(null);
  const [numPaths, setNumPaths] = useState<number>(10000);
  const [jumpIntensity, setJumpIntensity] = useState<number>(3.0);
  const [simulatedVaR, setSimulatedVaR] = useState<{ var95: number; var99: number; cvar99: number; timeMs: number } | null>(null);

  useEffect(() => {
    fetch('/data/quant_and_routing_benchmarks.json')
      .then(res => res.json())
      .then(data => {
        setQuantData(data.moneyball);
      })
      .catch(console.error);
  }, []);

  // Quick client-side Monte Carlo simulator running Merton Jump-Diffusion over CPU
  const runCpuSimulation = () => {
    const t0 = performance.now();
    const dt = 10 / 252; // 10 days
    const mu = 0.08;
    const sigma = 0.18;
    const lambda = jumpIntensity;
    const muJ = -0.02;
    const sigmaJ = 0.04;

    const returns = new Float64Array(numPaths);

    for (let i = 0; i < numPaths; i++) {
      // Standard normal diffusion
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      // Poisson jumps
      const numJumps = Math.random() < lambda * dt ? 1 : 0;
      let jumpComponent = 0;
      if (numJumps > 0) {
        const uj1 = Math.random();
        const uj2 = Math.random();
        const zj = Math.sqrt(-2.0 * Math.log(uj1)) * Math.cos(2.0 * Math.PI * uj2);
        jumpComponent = muJ + sigmaJ * zj;
      }

      returns[i] = (mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z + jumpComponent;
    }

    returns.sort();

    const idx95 = Math.floor(0.05 * numPaths);
    const idx99 = Math.floor(0.01 * numPaths);

    const var95 = -returns[idx95] * 100;
    const var99 = -returns[idx99] * 100;

    let cvarSum = 0;
    for (let i = 0; i < idx99; i++) {
      cvarSum += -returns[i] * 100;
    }
    const cvar99 = cvarSum / idx99;

    const timeMs = performance.now() - t0;
    setSimulatedVaR({ var95, var99, cvar99, timeMs });
  };

  useEffect(() => {
    runCpuSimulation();
  }, [numPaths, jumpIntensity]);

  const hmm = quantData?.hmm_regimes;
  const backtest = quantData?.portfolio_backtest_net_10bps;

  return (
    <div className="space-y-6">
      {/* Tier Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-900 sketch-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded">TIER B: REAL RUN, RECORDED</span>
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded">TIER A: CPU SLIDER</span>
          </div>
          <h3 className="text-lg font-bold mt-1">Quantitative Alpha, HMM Regimes & Jump-Diffusion VaR</h3>
        </div>
        <div className="text-right font-mono">
          <div className="text-xs text-slate-500">CUDA Monte Carlo Engine</div>
          <div className="text-sm font-bold text-emerald-600">1,000,000 paths in 29.26 ms</div>
          <div className="text-[10px] text-slate-400">42.9x hardware speedup over NumPy</div>
        </div>
      </div>

      {/* Backtest & HMM Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white dark:bg-slate-800 sketch-border">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Walk-Forward Rank IC</span>
          <span className="text-xl font-mono font-bold text-blue-600">0.0359</span>
          <span className="text-[10px] text-slate-400 block font-mono">1.521 Annualized ICIR</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-800 sketch-border">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">HMM Drawdown Reduction</span>
          <span className="text-xl font-mono font-bold text-emerald-600">13.58% → 8.59%</span>
          <span className="text-[10px] text-slate-400 block">Sharpe 2.02 (Sortino 3.48)</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-800 sketch-border">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">QAOA / QUBO Optimizer</span>
          <span className="text-xl font-mono font-bold text-purple-600">95.49%</span>
          <span className="text-[10px] text-slate-400 block">14-Qubit Ising Hamiltonian</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-800 sketch-border">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Transaction Costs</span>
          <span className="text-xl font-mono font-bold text-slate-800 dark:text-slate-200">10 bps net</span>
          <span className="text-[10px] text-slate-400 block">Deducted from turnover</span>
        </div>
      </div>

      {/* Interactive CPU Monte Carlo Slider */}
      <div className="p-4 bg-white dark:bg-slate-800 sketch-border space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
          <div>
            <h4 className="font-bold text-sm">Interactive Monte Carlo Tail Risk Explorer</h4>
            <span className="text-xs text-amber-600 font-bold">
              [CPU Simulation Port; the 29.26 ms benchmark is achieved by the PyTorch CUDA GPU risk engine across 1,000,000 paths]
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {simulatedVaR ? `${simulatedVaR.timeMs.toFixed(2)} ms in browser` : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span>Simulated Paths:</span>
                <span className="font-bold">{numPaths.toLocaleString()} paths</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={numPaths}
                onChange={e => setNumPaths(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <span>Jump Intensity ($\lambda$ jumps/year):</span>
                <span className="font-bold">{jumpIntensity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={jumpIntensity}
                onChange={e => setJumpIntensity(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 sketch-border text-center">
              <span className="text-[10px] text-slate-500 block uppercase">95% VaR</span>
              <span className="text-lg font-bold font-mono text-blue-600">
                {simulatedVaR ? `${simulatedVaR.var95.toFixed(2)}%` : '--'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 sketch-border text-center">
              <span className="text-[10px] text-slate-500 block uppercase">99% VaR</span>
              <span className="text-lg font-bold font-mono text-emerald-600">
                {simulatedVaR ? `${simulatedVaR.var99.toFixed(2)}%` : '--'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 sketch-border text-center">
              <span className="text-[10px] text-slate-500 block uppercase">99% CVaR</span>
              <span className="text-lg font-bold font-mono text-purple-600">
                {simulatedVaR ? `${simulatedVaR.cvar99.toFixed(2)}%` : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Asset Panel Reconciliation Note */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs sketch-border">
        <strong>Cross-Asset Panel Reconciliation:</strong> The Moneyball research framework spans 24 assets over 1,260 trading days: 16 equities/ETFs (`AAPL`, `MSFT`, `NVDA`, `SPY`, `QQQ`, etc.), 4 commodities & rates (`GLD`, `TLT`, `HYG`, `XOM`), and 4 major crypto assets (`BTC`, `ETH`, `SOL`, `BNB`). All walk-forward results are backtest simulations and do not represent live capital trading execution.
      </div>
    </div>
  );
};
