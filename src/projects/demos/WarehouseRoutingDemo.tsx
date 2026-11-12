import React, { useState } from 'react';
import { solveWarehouseRoute, GridPoint } from '../../lib/routingEngine';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

const W = 16;
const H = 12;

const DEFAULT_START: GridPoint = { x: 1, y: 1 };
const DEFAULT_GOAL: GridPoint = { x: 14, y: 10 };
const DEFAULT_STOPS: GridPoint[] = [
  { x: 3, y: 4 },
  { x: 7, y: 8 },
  { x: 11, y: 3 },
  { x: 5, y: 10 },
  { x: 13, y: 6 },
];
const DEFAULT_OBSTACLES = new Set(['4,2', '4,3', '4,4', '4,5', '8,6', '8,7', '8,8', '8,9', '12,2', '12,3', '12,4']);

export default function WarehouseRoutingDemo() {
  const [start, setStart] = useState<GridPoint>(DEFAULT_START);
  const [goal, setGoal] = useState<GridPoint>(DEFAULT_GOAL);
  const [stops, setStops] = useState<GridPoint[]>(DEFAULT_STOPS);
  const [obstacles, setObstacles] = useState<Set<string>>(new Set(DEFAULT_OBSTACLES));
  const [mode, setMode] = useState<'pick' | 'obstacle' | 'start' | 'goal'>('pick');
  const [path, setPath] = useState<GridPoint[]>([]);
  const [orderedStops, setOrderedStops] = useState<GridPoint[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    astarMs: number;
    tspMs: number;
    totalMs: number;
    method: string;
    dist: number;
    expanded: number;
  } | null>(null);

  const cellClick = (x: number, y: number) => {
    const k = `${x},${y}`;
    setErrorMsg(null);

    if (mode === 'start') {
      if (obstacles.has(k)) {
        return setErrorMsg('Cannot place dock (start) on an obstacle');
      }
      if (goal.x === x && goal.y === y) {
        return setErrorMsg('Cannot place start on the same cell as checkout (goal)');
      }
      setStart({ x, y });
      setStops(stops.filter((p) => !(p.x === x && p.y === y)));
      return;
    }

    if (mode === 'goal') {
      if (obstacles.has(k)) {
        return setErrorMsg('Cannot place checkout (goal) on an obstacle');
      }
      if (start.x === x && start.y === y) {
        return setErrorMsg('Cannot place checkout on the same cell as dock (start)');
      }
      setGoal({ x, y });
      setStops(stops.filter((p) => !(p.x === x && p.y === y)));
      return;
    }

    if (mode === 'obstacle') {
      if ((start.x === x && start.y === y) || (goal.x === x && goal.y === y)) {
        return setErrorMsg('Cannot place obstacle on dock or checkout');
      }
      const next = new Set(obstacles);
      if (next.has(k)) {
        next.delete(k);
      } else {
        next.add(k);
        setStops(stops.filter((p) => !(p.x === x && p.y === y)));
      }
      setObstacles(next);
      return;
    }

    // mode === 'pick'
    if (start.x === x && start.y === y) return setErrorMsg('Dock is already at this cell');
    if (goal.x === x && goal.y === y) return setErrorMsg('Checkout is already at this cell');
    if (obstacles.has(k)) return setErrorMsg('Cannot place pick stop on an obstacle');

    if (stops.some((p) => p.x === x && p.y === y)) {
      setStops(stops.filter((p) => !(p.x === x && p.y === y)));
    } else {
      setStops([...stops, { x, y }]);
    }
  };

  const run = () => {
    setErrorMsg(null);
    const result = solveWarehouseRoute(start, stops, goal, W, H, obstacles);

    if (result.unreachable) {
      setPath([]);
      setOrderedStops([]);
      setStats(null);
      setErrorMsg(result.unreachableReason || 'Target unreachable: obstacle blocking shortest path');
      return;
    }

    setPath(result.fullPath);
    setOrderedStops(result.orderedStops);
    setStats({
      astarMs: result.astarTimeMs,
      tspMs: result.tspTimeMs,
      totalMs: result.totalTimeMs,
      method: result.method === 'held-karp' ? 'Exact Held-Karp DP' : '2-Opt Local Search',
      dist: result.totalDistance,
      expanded: result.nodesExpanded,
    });
  };

  const reset = () => {
    setStart(DEFAULT_START);
    setGoal(DEFAULT_GOAL);
    setStops(DEFAULT_STOPS);
    setObstacles(new Set(DEFAULT_OBSTACLES));
    setPath([]);
    setOrderedStops([]);
    setErrorMsg(null);
    setStats(null);
  };

  const pathSet = new Set(path.map((p) => `${p.x},${p.y}`));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Real Obstacle-Aware A* + Open-Path Held-Karp / 2-Opt</p>
          <p className="text-sm text-ink2 mt-1">
            Browser JS port of C++17 engine: fixed dock start → optimal pick permutation → checkout goal.
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
            onClick={() => {
              setMode(key);
              setErrorMsg(null);
            }}
            className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 transition-transform duration-150 hover:-translate-y-0.5 ${
              mode === key ? 'border-red text-red bg-paper2 shadow-hard-sm' : 'border-ink/40 text-ink2 hover:border-ink'
            }`}
            data-testid={`wh-mode-${key}`}
          >
            {label}
          </button>
        ))}

        <div className="flex gap-2 ml-auto">
          <button
            className="btn-ink flex items-center gap-1.5 !py-1.5 !px-3"
            onClick={run}
            data-testid="wh-solve-btn"
          >
            <Play className="w-3.5 h-3.5 text-accent" />
            <span>Optimize route</span>
          </button>
          <button
            className="btn-outline flex items-center gap-1.5 !py-1.5 !px-3"
            onClick={reset}
            aria-label="Reset to default layout"
            data-testid="wh-reset-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div
          className="frame-sm bg-paper2/60 border-red text-red p-3 text-xs font-mono flex items-center gap-2 shadow-hard-sm"
          data-testid="wh-error-msg"
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid Canvas */}
      <div className="border-[1.5px] border-ink bg-paper2/50 p-2 overflow-x-auto shadow-hard-sm">
        <div
          className="grid gap-[2px] min-w-[500px]"
          style={{ gridTemplateColumns: `repeat(${W}, minmax(0, 1fr))` }}
          data-testid="wh-grid"
        >
          {Array.from({ length: H }).map((_, y) =>
            Array.from({ length: W }).map((_, x) => {
              const isStart = start.x === x && start.y === y;
              const isGoal = goal.x === x && goal.y === y;
              const isObstacle = obstacles.has(`${x},${y}`);
              const pickIndex = stops.findIndex((p) => p.x === x && p.y === y);
              const isPick = pickIndex !== -1;
              const isPath = pathSet.has(`${x},${y}`);

              let bg = 'bg-paper';
              let text = '';
              let textColor = 'text-ink';

              if (isObstacle) {
                bg = 'bg-ink/85';
              } else if (isStart) {
                bg = 'bg-blue text-paper font-bold';
                text = 'D';
                textColor = 'text-paper';
              } else if (isGoal) {
                bg = 'bg-red text-paper font-bold';
                text = 'C';
                textColor = 'text-paper';
              } else if (isPick) {
                bg = 'bg-paper font-bold border-2 border-red';
                // Show order number if solved
                const orderNumber = orderedStops.findIndex((p) => p.x === x && p.y === y);
                text = orderNumber > 0 ? `${orderNumber}` : `P${pickIndex + 1}`;
                textColor = 'text-red';
              } else if (isPath) {
                bg = 'bg-accent/20 border border-accent/50';
              }

              return (
                <button
                  key={`${x},${y}`}
                  onClick={() => cellClick(x, y)}
                  className={`aspect-square flex items-center justify-center font-mono text-[10px] rounded-xs transition-colors ${bg} ${textColor} hover:opacity-80`}
                  title={`(${x}, ${y})`}
                  data-testid={`wh-cell-${x}-${y}`}
                >
                  {text}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink2">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-blue text-paper flex items-center justify-center text-[9px] font-bold rounded-xs">D</span>
            <span>Dock (start)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-red text-paper flex items-center justify-center text-[9px] font-bold rounded-xs">C</span>
            <span>Checkout (goal)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 border-2 border-red text-red flex items-center justify-center text-[9px] font-bold rounded-xs">P</span>
            <span>Pick stops ({stops.length})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-ink/85 rounded-xs" />
            <span>Racks / Obstacles</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-accent/20 border border-accent/50 rounded-xs" />
            <span>Optimal Path</span>
          </span>
        </div>

        {stats && (
          <div className="frame-sm bg-paper p-3 shadow-hard-sm font-mono text-xs space-y-1.5" data-testid="wh-stats">
            <div className="flex items-center gap-1.5 text-blue font-bold">
              <CheckCircle2 className="w-4 h-4 text-blue" />
              <span>{stats.method}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-ink2 pt-1 border-t border-ink/20">
              <p>Total distance: <b className="text-ink">{stats.dist} steps</b></p>
              <p>A* nodes expanded: <b className="text-ink">{stats.expanded}</b></p>
              <p>A* pairwise time: <b className="text-ink">{stats.astarMs.toFixed(2)} ms</b></p>
              <p>TSP solve time: <b className="text-ink">{stats.tspMs.toFixed(3)} ms</b></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
