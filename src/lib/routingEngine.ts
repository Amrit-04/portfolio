// Client-side execution of Warehouse Routing Engine (A*, Held-Karp, 2-opt)

export interface GridPoint {
  x: number;
  y: number;
}

export interface PathResult {
  path: GridPoint[];
  distance: number;
  executionTimeMs: number;
  nodesExpanded: number;
}

export interface TSPResult {
  orderedStops: GridPoint[];
  totalDistance: number;
  executionTimeMs: number;
  method: 'held-karp' | '2-opt';
}

function manhattan(p1: GridPoint, p2: GridPoint): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

// A* pathfinding over 2D cost grid
export function aStarSearch(
  start: GridPoint,
  goal: GridPoint,
  width: number,
  height: number,
  obstacles: Set<string>
): PathResult {
  const t0 = performance.now();
  let nodesExpanded = 0;

  const key = (p: GridPoint) => `${p.x},${p.y}`;
  const startKey = key(start);
  const goalKey = key(goal);

  if (obstacles.has(startKey) || obstacles.has(goalKey)) {
    return { path: [], distance: Infinity, executionTimeMs: performance.now() - t0, nodesExpanded: 0 };
  }

  const openSet: { point: GridPoint; f: number; g: number }[] = [{ point: start, f: manhattan(start, goal), g: 0 }];
  const gScore = new Map<string, number>();
  gScore.set(startKey, 0);

  const cameFrom = new Map<string, GridPoint>();
  const closedSet = new Set<string>();

  const neighbors = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
  ];

  while (openSet.length > 0) {
    // Sort by f-score
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;
    const currKey = key(current.point);

    if (currKey === goalKey) {
      // Reconstruct path
      const path: GridPoint[] = [];
      let temp: GridPoint | undefined = current.point;
      while (temp) {
        path.push(temp);
        temp = cameFrom.get(key(temp));
      }
      path.reverse();
      return {
        path,
        distance: current.g,
        executionTimeMs: performance.now() - t0,
        nodesExpanded
      };
    }

    closedSet.add(currKey);
    nodesExpanded++;

    for (const d of neighbors) {
      const nx = current.point.x + d.x;
      const ny = current.point.y + d.y;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const neighborKey = `${nx},${ny}`;
      if (obstacles.has(neighborKey) || closedSet.has(neighborKey)) continue;

      const tentativeG = current.g + 1.0;
      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current.point);
        gScore.set(neighborKey, tentativeG);
        const f = tentativeG + manhattan({ x: nx, y: ny }, goal);
        const existing = openSet.find(o => key(o.point) === neighborKey);
        if (existing) {
          existing.g = tentativeG;
          existing.f = f;
        } else {
          openSet.push({ point: { x: nx, y: ny }, f, g: tentativeG });
        }
      }
    }
  }

  return { path: [], distance: Infinity, executionTimeMs: performance.now() - t0, nodesExpanded };
}

// Exact Held-Karp Dynamic Programming (K <= 10)
export function solveHeldKarpTSP(stops: GridPoint[]): TSPResult {
  const t0 = performance.now();
  const n = stops.length;
  if (n <= 1) {
    return { orderedStops: stops, totalDistance: 0, executionTimeMs: performance.now() - t0, method: 'held-karp' };
  }

  // Distance matrix
  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = manhattan(stops[i], stops[j]);
    }
  }

  const numSubsets = 1 << n;
  const memo: number[][] = Array.from({ length: numSubsets }, () => Array(n).fill(Infinity));
  const parent: number[][] = Array.from({ length: numSubsets }, () => Array(n).fill(-1));

  memo[1][0] = 0; // start at node 0

  for (let mask = 1; mask < numSubsets; mask += 2) {
    for (let u = 0; u < n; u++) {
      if ((mask & (1 << u)) === 0 || memo[mask][u] === Infinity) continue;
      for (let v = 0; v < n; v++) {
        if ((mask & (1 << v)) !== 0) continue;
        const nextMask = mask | (1 << v);
        const cost = memo[mask][u] + dist[u][v];
        if (cost < memo[nextMask][v]) {
          memo[nextMask][v] = cost;
          parent[nextMask][v] = u;
        }
      }
    }
  }

  // Find min cost returning to 0 or completing tour
  const fullMask = numSubsets - 1;
  let bestCost = Infinity;
  let lastNode = -1;

  for (let u = 1; u < n; u++) {
    const cost = memo[fullMask][u] + dist[u][0];
    if (cost < bestCost) {
      bestCost = cost;
      lastNode = u;
    }
  }

  // Reconstruct tour
  const tourIndices: number[] = [];
  let curr = lastNode;
  let mask = fullMask;
  while (curr !== -1) {
    tourIndices.push(curr);
    const prev = parent[mask][curr];
    mask ^= (1 << curr);
    curr = prev;
  }
  tourIndices.reverse();

  return {
    orderedStops: tourIndices.map(i => stops[i]),
    totalDistance: bestCost,
    executionTimeMs: performance.now() - t0,
    method: 'held-karp'
  };
}

// 2-Opt Local Search Heuristic (K > 10)
export function solve2OptTSP(stops: GridPoint[]): TSPResult {
  const t0 = performance.now();
  const n = stops.length;
  if (n <= 2) {
    return { orderedStops: stops, totalDistance: 0, executionTimeMs: performance.now() - t0, method: '2-opt' };
  }

  // Initial Nearest Neighbor tour
  const visited = new Set<number>([0]);
  const tour = [0];
  while (tour.length < n) {
    const curr = tour[tour.length - 1];
    let bestNext = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        const d = manhattan(stops[curr], stops[i]);
        if (d < minDist) {
          minDist = d;
          bestNext = i;
        }
      }
    }
    visited.add(bestNext);
    tour.push(bestNext);
  }

  const calcDist = (t: number[]) => {
    let d = 0;
    for (let i = 0; i < t.length - 1; i++) {
      d += manhattan(stops[t[i]], stops[t[i + 1]]);
    }
    d += manhattan(stops[t[t.length - 1]], stops[t[0]]);
    return d;
  };

  let improved = true;
  let bestDist = calcDist(tour);

  while (improved) {
    improved = false;
    for (let i = 1; i < n - 1; i++) {
      for (let k = i + 1; k < n; k++) {
        const newTour = [...tour.slice(0, i), ...tour.slice(i, k + 1).reverse(), ...tour.slice(k + 1)];
        const newDist = calcDist(newTour);
        if (newDist < bestDist) {
          bestDist = newDist;
          tour.splice(0, n, ...newTour);
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  return {
    orderedStops: tour.map(i => stops[i]),
    totalDistance: bestDist,
    executionTimeMs: performance.now() - t0,
    method: '2-opt'
  };
}
