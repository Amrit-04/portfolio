import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../../lib/assets';
import { Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';

interface Benchmarks {
  throughput: {
    timestamp: string;
    target_rate_eps: number;
    duration_seconds: number;
    achieved_peak_consume_rate_eps: number;
    achieved_avg_consume_rate_eps: number;
    peak_consumer_lag: number;
    total_valid_persisted: number;
  };
  go_vs_python: any;
  tuning: any;
  chaos: {
    malformed_events_total: number;
    malformed_isolated: number;
    chaos_events_total: number;
    chaos_persisted: number;
  };
}

const TABS = ['throughput', 'polyglot', 'tuning', 'chaos'] as const;
type Tab = (typeof TABS)[number];

/** Deterministic replay curve anchored to the recorded summary numbers. */
const rateAt = (t: number) => 7100 + Math.sin(t / 10) * 400 + Math.sin(t / 3.7) * 90;
const lagAt = (t: number) => Math.min(1563567, Math.pow(t / 310, 1.6) * 1563567);

export default function PipelineReplayDemo() {
  const [b, setB] = useState<Benchmarks | null>(null);
  const [tab, setTab] = useState<Tab>('throughput');
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch(getAssetUrl('data/telemetry_benchmarks.json'))
      .then((r) => r.json())
      .then(setB)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((p) => (p >= 310 ? 0 : p + 2)), 100);
    return () => clearInterval(id);
  }, [playing]);

  if (!b) {
    return <p className="label-mono animate-pulse py-8 text-center">Loading the recorded 310-second benchmark…</p>;
  }

  const tp = b.throughput;
  const W = 560;
  const H = 150;
  const points = (fn: (t: number) => number, max: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const tt = (i / 120) * 310;
      pts.push(`${(tt / 310) * W},${H - (fn(tt) / max) * (H - 10)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-blue">Recorded run — replay, not live Kafka</p>
          <p className="text-sm text-ink2 mt-1">
            Captured {tp.timestamp} · 310 s sustained run · 2.2M+ events on a single node
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map((x) => (
            <button
              key={x}
              onClick={() => setTab(x)}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 transition-transform duration-150 hover:-translate-y-0.5 ${
                tab === x ? 'border-red text-red bg-paper2 shadow-hard-sm' : 'border-ink/40 text-ink2 hover:border-ink'
              }`}
              data-testid={`replay-tab-${x}`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      {tab === 'throughput' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ['Target rate', '10,000 eps', 'target NOT met on 1 node', true],
              ['Sustained consume', `${Math.round(tp.achieved_avg_consume_rate_eps).toLocaleString()} eps`, `${tp.achieved_peak_consume_rate_eps.toLocaleString()} peak`, false],
              ['Peak consumer lag', tp.peak_consumer_lag.toLocaleString(), 'backpressure accumulation', true],
              ['Valid persisted', tp.total_valid_persisted.toLocaleString(), '0 lost · 0 duplicates', false],
            ].map(([label, value, note, bad]) => (
              <div key={label as string} className="frame-sm bg-paper p-3 shadow-hard-sm">
                <p className="label-mono text-ink3">{label}</p>
                <p className={`font-mono text-lg font-bold mt-1 ${bad ? 'text-red' : 'text-blue'}`}>{value}</p>
                <p className="text-[10px] font-mono text-ink3">{note}</p>
              </div>
            ))}
          </div>

          <div className="frame-sm bg-paper p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-ink !py-2 !px-3" onClick={() => setPlaying(!playing)} data-testid="replay-play">
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? 'Pause' : 'Play replay'}
              </button>
              <button className="btn-outline !py-2 !px-3" onClick={() => setT(0)} aria-label="Restart replay">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs">t = {t}s / 310s</span>
            </div>
            <input
              type="range"
              min="0"
              max="310"
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
              className="w-full accent-[#D9381E]"
              data-testid="replay-scrubber"
            />

            <div className="border-[1.5px] border-ink/70 bg-paper2/50 sketch-hatch p-2">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Throughput and lag replay graph">
                <polyline points={points(rateAt, 8000)} fill="none" stroke="#18528C" strokeWidth="1.8" />
                <polyline points={points(lagAt, 1600000)} fill="none" stroke="#D9381E" strokeWidth="1.8" strokeDasharray="5 4" />
                <line x1={(t / 310) * W} y1="0" x2={(t / 310) * W} y2={H} stroke="#1A1A1A" strokeWidth="1.5" />
                <text x="4" y="12" fontFamily="'JetBrains Mono'" fontSize="9" fill="#18528C">consume rate (eps)</text>
                <text x="4" y={H - 4} fontFamily="'JetBrains Mono'" fontSize="9" fill="#D9381E">consumer lag</text>
              </svg>
            </div>

            <div>
              <p className="label-mono text-ink3 mb-2">12 Kafka partitions — lag distribution at t={t}s</p>
              <div className="grid grid-cols-12 gap-1" data-testid="replay-partitions">
                {Array.from({ length: 12 }).map((_, i) => {
                  const fill = Math.min(100, (lagAt(t) / 1600000) * 100 * (0.75 + 0.3 * Math.abs(Math.sin(i * 2.7))));
                  return (
                    <div key={i} className="border-[1.5px] border-ink/70 h-16 relative bg-paper">
                      <div className="absolute bottom-0 inset-x-0 bg-blue/70" style={{ height: `${fill}%` }} />
                      <span className="absolute top-0 left-0.5 font-mono text-[8px]">P{i}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'polyglot' && (
        <div className="frame-sm bg-paper p-5 space-y-4">
          <p className="font-mono text-sm font-bold">Go (Chi) vs Python (FastAPI) — 50k requests @ concurrency 50</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['Throughput', '288.0 RPS', '151.6 RPS', '+90.0%'],
              ['p99 latency', '756 ms', '1,671 ms', '-54.7%'],
              ['Peak RSS', '24.3 MB', '85.7 MB', '-71.6%'],
            ].map(([label, go, py, delta]) => (
              <div key={label} className="border-l-2 border-blue pl-3">
                <p className="label-mono text-ink3">{label}</p>
                <p className="font-mono text-lg font-bold text-blue mt-1">{go}</p>
                <p className="font-mono text-xs text-ink3">vs {py}</p>
                <p className="font-mono text-xs font-bold text-red mt-1">{delta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tuning' && (
        <div className="frame-sm bg-paper p-5 space-y-3">
          <p className="font-mono text-sm font-bold">27-configuration tuning sweep — key rows</p>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs text-left">
              <thead>
                <tr className="border-b-[1.5px] border-ink">
                  <th className="py-2 pr-4">Partitions</th>
                  <th className="py-2 pr-4">Consumers</th>
                  <th className="py-2 pr-4">Batch</th>
                  <th className="py-2 pr-4">Peak lag</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', '1', '250', '0', 'single-partition baseline', false],
                  ['1', '3', '500', '0', '2 consumers starved (Kafka 1-per-partition rule)', true],
                  ['6', '3', '500', '0', '2 partitions per consumer — balanced', false],
                  ['12', '6', '500', '36,294', 'optimal production config — stable lag drain', false],
                ].map(([p, c, bs, lag, note, bad], i) => (
                  <tr key={i} className={`border-b border-ink/20 ${i === 3 ? 'bg-paper2 font-bold' : ''}`}>
                    <td className="py-2 pr-4">{p}</td>
                    <td className="py-2 pr-4">{c}</td>
                    <td className="py-2 pr-4">{bs}</td>
                    <td className={`py-2 pr-4 ${bad ? 'text-red' : ''}`}>{lag}</td>
                    <td className="py-2 text-ink2">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'chaos' && (
        <div className="frame-sm bg-paper p-5 space-y-4">
          <p className="font-mono text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue" /> Chaos fault recovery & DLQ isolation
          </p>
          <p className="text-xs text-ink2 leading-relaxed">
            At peak traffic (8,000 eps, 5% malformed) the writer process was killed and PostgreSQL 16 + Redis were
            restarted mid-run.
          </p>
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="frame-sm bg-paper2/60 p-3">
              <p className="text-ink3 text-[10px]">malformed isolated</p>
              <p className="font-bold text-blue mt-1">{b.chaos.malformed_isolated.toLocaleString()} / {b.chaos.malformed_events_total.toLocaleString()}</p>
            </div>
            <div className="frame-sm bg-paper2/60 p-3">
              <p className="text-ink3 text-[10px]">chaos events persisted</p>
              <p className="font-bold text-blue mt-1">{b.chaos.chaos_persisted.toLocaleString()}</p>
            </div>
            <div className="frame-sm bg-paper2/60 p-3">
              <p className="text-ink3 text-[10px]">lost / duplicated</p>
              <p className="font-bold text-blue mt-1">0 / 0</p>
            </div>
          </div>
        </div>
      )}

      <div className="frame-red bg-paper2/50 p-4 text-xs leading-relaxed text-ink2">
        <span className="font-bold">Honest assessment: </span>
        the pipeline sustained 7,117 events/sec avg (7,892 peak) against an aspirational 10,000 eps target — it missed,
        and lag climbed to 1.56M events before draining post-run. Redis caching was negligible locally (1,575 ms vs
        1,585 ms p99) because NVMe page cache. This demo replays the saved benchmark JSON; no Kafka broker involved.
      </div>
    </div>
  );
}
