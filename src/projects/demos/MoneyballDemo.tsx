import React, { useState, useEffect, useMemo } from 'react';
import { getAssetUrl } from '../../lib/assets';

interface QuantData {
  moneyball: {
    hmm_regimes?: any;
    portfolio_backtest_net_10bps?: any;
  };
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function MoneyballDemo() {
  const [data, setData] = useState<QuantData['moneyball'] | null>(null);
  const [numPaths, setNumPaths] = useState(10000);
  const [jumpIntensity, setJumpIntensity] = useState(3.0);
  const [seed, setSeed] = useState(42);
  const [result, setResult] = useState<{ var95: number; var99: number; cvar99: number; ms: number; bins: number[] } | null>(null);

  useEffect(() => {
    fetch(getAssetUrl('data/quant_and_routing_benchmarks.json'))
      .then((r) => r.json())
      .then((d) => setData(d.moneyball))
      .catch(console.error);
  }, []);

  // Seeded Merton jump-diffusion Monte Carlo, browser CPU port (not the CUDA engine)
  useEffect(() => {
    const t0 = performance.now();
    const rng = mulberry32(seed);
    const dt = 10 / 252;
    const mu = 0.08;
    const sigma = 0.18;
    const muJ = -0.02;
    const sigmaJ = 0.04;
    const returns = new Float64Array(numPaths);

    for (let i = 0; i < numPaths; i++) {
      const u1 = Math.max(rng(), 1e-12);
      const u2 = rng();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      let jump = 0;
      if (rng() < jumpIntensity * dt) {
        const uj1 = Math.max(rng(), 1e-12);
        const uj2 = rng();
        jump = muJ + sigmaJ * Math.sqrt(-2 * Math.log(uj1)) * Math.cos(2 * Math.PI * uj2);
      }
      returns[i] = (mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z + jump;
    }
    returns.sort();

    const i95 = Math.floor(0.05 * numPaths);
    const i99 = Math.floor(0.01 * numPaths);
    let cvarSum = 0;
    for (let i = 0; i < i99; i++) cvarSum += -returns[i] * 100;

    // histogram bins for the chart
    const NB = 42;
    const lo = returns[Math.floor(numPaths * 0.002)] * 100;
    const hi = returns[Math.floor(numPaths * 0.995)] * 100;
    const bins = new Array(NB).fill(0);
    for (let i = 0; i < numPaths; i++) {
      const v = returns[i] * 100;
      const idx = Math.floor(((v - lo) / (hi - lo)) * NB);
      if (idx >= 0 && idx < NB) bins[idx]++;
    }

    setResult({
      var95: -returns[i95] * 100,
      var99: -returns[i99] * 100,
      cvar99: cvarSum / i99,
      ms: performance.now() - t0,
      bins,
    });
  }, [numPaths, jumpIntensity, seed]);

  const maxBin = useMemo(() => (result ? Math.max(...result.bins) : 1), [result]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Recorded walk-forward results + seeded CPU Monte Carlo</p>
          <p className="text-sm text-ink2 mt-1">
            24-asset universe · 1,260 trading days · purged & embargoed walk-forward (504d train / 5d purge)
          </p>
        </div>
        <p className="font-mono text-xs text-ink3 text-right">
          native CUDA engine: 1M paths in 29.26 ms (42.9×)
          <br />
          this page: CPU JS, seeded for reproducibility
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ['Rank IC', '0.0359', 'ICIR 1.521 annualized'],
          ['HMM max drawdown', '13.58% → 8.59%', '3-state Gaussian HMM, 2.02 Sharpe'],
          ['QAOA approximation', '95.49%', '14-qubit QUBO, depth p=2'],
          ['Costs', '10 bps', 'net of turnover'],
        ].map(([l, v, n]) => (
          <div key={l} className="frame-sm bg-paper p-3 shadow-hard-sm">
            <p className="label-mono text-ink3">{l}</p>
            <p className="font-mono text-base font-bold text-blue mt-1">{v}</p>
            <p className="text-[10px] font-mono text-ink3">{n}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5">
        <div className="frame-sm bg-paper p-4 space-y-4 shadow-hard-sm font-mono text-xs">
          <p className="label-mono text-ink3">Jump-diffusion parameters</p>
          <label className="block">
            <span className="flex justify-between"><span className="text-ink3">paths</span><b>{numPaths.toLocaleString()}</b></span>
            <input type="range" min="1000" max="50000" step="1000" value={numPaths} onChange={(e) => setNumPaths(Number(e.target.value))} className="w-full accent-[#D9381E]" data-testid="mb-paths" />
          </label>
          <label className="block">
            <span className="flex justify-between"><span className="text-ink3">jump intensity λ /yr</span><b>{jumpIntensity}</b></span>
            <input type="range" min="0" max="10" step="0.5" value={jumpIntensity} onChange={(e) => setJumpIntensity(Number(e.target.value))} className="w-full accent-[#D9381E]" data-testid="mb-jump" />
          </label>
          <label className="block">
            <span className="flex justify-between"><span className="text-ink3">rng seed</span><b>{seed}</b></span>
            <input type="range" min="1" max="999" step="1" value={seed} onChange={(e) => setSeed(Number(e.target.value))} className="w-full accent-[#D9381E]" data-testid="mb-seed" />
          </label>
          <p className="text-[10px] text-ink3 leading-relaxed">
            dS = μS dt + σS dW + J·dN — 10-day horizon, same Merton model as the CUDA engine, computed on your CPU.
          </p>
        </div>

        <div className="space-y-4">
          <div className="frame-sm bg-paper p-4 shadow-hard-sm">
            <p className="label-mono text-ink3 mb-2">Simulated 10-day return distribution</p>
            <div className="border-[1.5px] border-ink/70 bg-paper2/50 sketch-hatch p-2">
              <svg viewBox="0 0 420 130" className="w-full" aria-label="Monte Carlo return histogram">
                {result?.bins.map((c, i) => {
                  const h = (c / maxBin) * 105;
                  const isTail = i < 4;
                  return (
                    <rect
                      key={i}
                      x={4 + i * (412 / 42)}
                      y={112 - h}
                      width={412 / 42 - 2}
                      height={h}
                      fill={isTail ? '#D9381E' : '#18528C'}
                      opacity={isTail ? 0.85 : 0.55}
                    />
                  );
                })}
                <text x="6" y="126" fontFamily="'JetBrains Mono'" fontSize="8" fill="#8A8680">worst returns ←</text>
                <text x="352" y="126" fontFamily="'JetBrains Mono'" fontSize="8" fill="#8A8680">→ best</text>
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 font-mono" data-testid="mb-var">
              {[
                ['95% VaR', result ? `${result.var95.toFixed(2)}%` : '—'],
                ['99% VaR', result ? `${result.var99.toFixed(2)}%` : '—'],
                ['99% CVaR', result ? `${result.cvar99.toFixed(2)}%` : '—'],
              ].map(([l, v]) => (
                <div key={l} className="border-l-2 border-red pl-2.5">
                  <p className="text-ink3 text-[10px]">{l}</p>
                  <p className="text-base font-bold">{v}</p>
                </div>
              ))}
            </div>
            {result && <p className="font-mono text-[10px] text-ink3 mt-2">{numPaths.toLocaleString()} paths in {result.ms.toFixed(1)} ms on this device</p>}
          </div>

          <div className="frame-red bg-paper2/50 p-4 text-xs leading-relaxed text-ink2">
            <span className="font-bold">Browser vs native: </span>
            the 29.26 ms / 1M-path figure comes from the PyTorch CUDA risk engine in the repo. What you just ran is a
            seeded JavaScript port for intuition — same math, a few orders of magnitude slower, and all recorded alpha
            numbers are backtests, not live trading.
          </div>
        </div>
      </div>
    </div>
  );
}
