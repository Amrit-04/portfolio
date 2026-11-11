import React, { useState } from 'react';
import { aStarSearch, solveHeldKarpTSP, solve2OptTSP, GridPoint } from '../../lib/routingEngine';
import { Play, RotateCcw } from 'lucide-react';

const W = 16;
const H = 12;

export default function WarehouseRoutingDemo() {
  const [start, setStart] = useState<GridPoint>({ x: 1, y: 1 });
  const [goal, setGoal] = useState<GridPoint>({ x: 14, y: 10 });
  const [stops, setStops] = useState<GridPoint[]>([
    { x: 3, y: 4 },
    { x: 7, y: 8 },
    { x: 11, y: 3 },
    { x: 5, y: 10 },
    { x: 13, y: 6 },
  ]);
  const [obstacles, setObstacles] = useState<Set<string>>(
    new Set(['4,2', '4,3', '4,4', '4,5', '8,6', '8,7', '8,8', '8,9', '12,2', '12,3', '12,4'])
  );
  const [mode, setMode] = useState<'pick' | 'obstacle' | 'start' | 'goal'>('pick');
  const [path, setPath] = useState<GridPoint[]>([]);
  const [stats, setStats] = useState<{ astarMs: number; tspMs: number; method: string; dist: number; expanded: number } | null>(null);

  const cellClick = (x: number, y: number) => {
    const k = `${x},${y}`;
    if (mode === 'start') return setStart({ x, y });
    if (mode === 'goal') return setGoal({ x, y });
    if (mode === 'obstacle') {
      const next = new Set(obstacles);
      if (next.has(k)) next.delete(k);
      else {
        next.add(k);
        setStops(stops.filter((p) => !(p.x === x && p.y === y)));
      }
      setObstacles(next);
    } else {
      if (stops.some((p) => p.x === x && p.y === y)) return setStops(stops.filter((p) => !(p.x === x && p.y === y)));
      const next = new Set(obstacles);
      next.delete(k);
      setObstacles(next);
      setStops([...stops, { x, y }]);
    }
  };

  const run = () => {
    const all = [start, ...stops, goal];
    const tsp = all.length <= 10 ? solveHeldKarpTSP(all) : solve2OptTSP(all);
    let fullPath: GridPoint[] = [];
    let ms = 0;
    let expanded = 0;
    for (let i = 0; i < tsp.orderedStops.length - 1; i++) {
      const seg = aStarSearch(tsp.orderedStops[i], tsp.orderedStops[i + 1], W, H, obstacles);
      ms += seg.executionTimeMs;
      expanded += seg.nodesExpanded;
      if (seg.path.length) fullPath = fullPath.concat(fullPath.length ? seg.path.slice(1) : seg.path);
    }
    setPath(fullPath);
    setStats({
      astarMs: ms,
      tspMs: tsp.executionTimeMs,
      method: tsp.method === 'held-karp' ? 'exact Held-Karp DP' : '2-opt local search',
      dist: tsp.totalDistance,
      expanded,
    });
  };

  const reset = () => {
    setPath([]);
    setStats(null);
  };

  const pathSet = new Set(path.map((p) => `${p.x},${p.y}`));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Real A* + Held-Karp / 2-opt running in your browser</p>
          <p className="text-sm text-ink2 mt-1">
            JS port of the C++17 engine — the 31× / 56.5× speedups below are the native benchmarks, not this page.
          </p>
        </div>
        <p className="font-mono text-xs text-ink3 text-right">
          native C++17: A* 15.52→0.50 ms (31×)
          <br />
          Held-Karp 10-stop: 73.57→1.30 ms (56.5×)
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ['pick', 'place pick stops'],
            ['obstacle', 'toggle obstacles'],
            ['start', 'move dock (start)'],
            ['goal', 'move checkout (goal)'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 transition-transform duration-150 hover:-translate-y-0.5 ${
              mode === key ? 'border-red text-red bg-paper2 shadow-hard-sm' : 'border-ink/40 text-ink2 hover:border-ink'
            }`}
            data-testid={`wr-mode-${key}`}
          >
            {label}
          </button>
        ))}
        <button className="btn-ink !py-2 !px-3 ml-auto" onClick={run} data-testid="wr-compute">
          <Play className="w-3.5 h-3.5" /> Compute route
        </button>
        <button className="btn-outline !py-2 !px-3" onClick={reset} aria-label="Clear route">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_240px] gap-5">
        <div className="grid gap-[3px] p-2 border-[1.5px] border-ink/70 bg-paper2/50 sketch-hatch" style={{ gridTemplateColumns: `repeat(${W}, minmax(0,1fr))` }} data-testid="wr-grid">
          {Array.from({ length: H }).map((_, y) =>
            Array.from({ length: W }).map((_, x) => {
              const k = `${x},${y}`;
              const isStart = x === start.x && y === start.y;
              const isGoal = x === goal.x && y === goal.y;
              const isStop = stops.some((p) => p.x === x && p.y === y);
              const isObs = obstacles.has(k);
              const isPath = pathSet.has(k);
              return (
                <button
                  key={k}
                  onClick={() => cellClick(x, y)}
                  aria-label={`cell ${x},${y}`}
                  className={`aspect-square min-h-[18px] flex items-center justify-center font-mono text-[9px] font-bold border transition-colors duration-100 ${
                    isStart
                      ? 'bg-blue text-paper border-blue'
                      : isGoal
                      ? 'bg-ink text-paper border-ink'
                      : isStop
                      ? 'bg-red text-paper border-red'
                      : isObs
                      ? 'bg-ink2 border-ink2'
                      : isPath
                      ? 'bg-blue/20 border-ink/30'
                      : 'bg-paper border-ink/15 hover:border-ink/60'
                  }`}
                >
                  {isStart ? 'S' : isGoal ? 'E' : isStop ? '★' : ''}
                </button>
              );
            })
          )}
        </div>

        <div className="space-y-4">
          <div className="frame-sm bg-paper p-4 shadow-hard-sm font-mono text-xs space-y-2" data-testid="wr-stats">
            <p className="label-mono text-ink3">browser execution</p>
            {stats ? (
              <>
                <p className="flex justify-between"><span className="text-ink3">tsp solver</span><b>{stats.method}</b></p>
                <p className="flex justify-between"><span className="text-ink3">stitched A*</span><b>{stats.astarMs.toFixed(3)} ms</b></p>
                <p className="flex justify-between"><span className="text-ink3">tsp time</span><b>{stats.tspMs.toFixed(3)} ms</b></p>
                <p className="flex justify-between"><span className="text-ink3">nodes expanded</span><b>{stats.expanded.toLocaleString()}</b></p>
                <p className="flex justify-between"><span className="text-ink3">tour distance</span><b>{stats.dist.toFixed(0)} units</b></p>
              </>
            ) : (
              <p className="text-ink3 italic">click “Compute route” to run pathfinding…</p>
            )}
          </div>
          <div className="frame-sm bg-paper2/60 p-4 text-[11px] font-mono text-ink2 space-y-1.5">
            <p className="font-bold uppercase tracking-[0.14em] text-ink3 text-[10px]">native benchmarks (from repo)</p>
            <p>A* on 30k-cell grid: 3,294 nodes expanded, 31× over Python.</p>
            <p>FastAPI + versioned Redis cache: −43.8% p50 at 144 RPS, 79.7% hit rate, 0.0% errors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
