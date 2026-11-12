// Client-side execution of Warehouse Routing Engine (Obstacle-aware A*, Held-Karp DP, 2-opt)
// Solves Open-Path TSP: Fixed Start (Dock) -> Intermediate Pick Stops -> Fixed Goal (Checkout)

export interface GridPoint {
  x: number;
  y: number;
}

export interface PathResult {
  path: GridPoint[];
  distance: number;
  executionTimeMs: number;
  nodesExpanded: number;
  unreachable?: boolean;
}

export interface OpenPathTSPResult {
  orderedStops: GridPoint[];
  fullPath: GridPoint[];
  totalDistance: number;
  astarTimeMs: number;
  tspTimeMs: number;
  totalTimeMs: number;
  nodesExpanded: number;
  method: 'held-karp' | '2-opt';
  unreachable?: boolean;
  unreachableReason?: string;
}

function manhattan(p1: GridPoint, p2: GridPoint): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

const key = (p: GridPoint) => `${p.x},${p.y}`;

/**
 * Obstacle-aware A* pathfinding on a 2D 4-connected grid.
 */
export function aStarSearch(
  start: GridPoint,
  goal: GridPoint,
  width: number,
  height: number,
  obstacles: Set<string>
): PathResult {
  const t0 = performance.now();
  let nodesExpanded = 0;

  const startKey = key(start);
  const goalKey = key(goal);

  if (startKey === goalKey) {
    return {
      path: [start],
      distance: 0,
      executionTimeMs: performance.now() - t0,
      nodesExpanded: 0,
    };
  }

  if (obstacles.has(startKey) || obstacles.has(goalKey)) {
    return {
      path: [],
      distance: Infinity,
      executionTimeMs: performance.now() - t0,
      nodesExpanded: 0,
      unreachable: true,
    };
  }

  const openSet: { point: GridPoint; f: number; g: number }[] = [
    { point: start, f: manhattan(start, goal), g: 0 },
  ];
  const gScore = new Map<string, number>();
  gScore.set(startKey, 0);

  const cameFrom = new Map<string, GridPoint>();
  const closedSet = new Set<string>();

  const neighbors = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  while (openSet.length > 0) {
    // Find min f
    let bestIdx = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestIdx].f) bestIdx = i;
    }
    const current = openSet.splice(bestIdx, 1)[0];
    const currKey = key(current.point);

    if (currKey === goalKey) {
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
        nodesExpanded,
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

      const tentativeG = current.g + 1;
      const currentG = gScore.get(neighborKey);
      if (currentG === undefined || tentativeG < currentG) {
        cameFrom.set(neighborKey, current.point);
        gScore.set(neighborKey, tentativeG);
        const f = tentativeG + manhattan({ x: nx, y: ny }, goal);
        const existing = openSet.find((o) => key(o.point) === neighborKey);
        if (existing) {
          existing.g = tentativeG;
          existing.f = f;
        } else {
          openSet.push({ point: { x: nx, y: ny }, f, g: tentativeG });
        }
      }
    }
  }

  return {
    path: [],
    distance: Infinity,
    executionTimeMs: performance.now() - t0,
    nodesExpanded,
    unreachable: true,
  };
}

/**
 * Open-path TSP optimizer with fixed start (dock) and fixed goal (checkout).
 * Uses obstacle-aware A* pairwise distance matrix, exact Held-Karp DP for <= 10 stops,
 * and 2-opt local search for > 10 stops.
 */
export function solveWarehouseRoute(
  start: GridPoint,
  pickStops: GridPoint[],
  goal: GridPoint,
  width: number,
  height: number,
  obstacles: Set<string>
): OpenPathTSPResult {
  const t0 = performance.now();
  const k = pickStops.length;

  // Check if start or goal is in obstacle
  if (obstacles.has(key(start))) {
    return {
      orderedStops: [start, ...pickStops, goal],
      fullPath: [],
      totalDistance: 0,
      astarTimeMs: 0,
      tspTimeMs: 0,
      totalTimeMs: performance.now() - t0,
      nodesExpanded: 0,
      method: 'held-karp',
      unreachable: true,
      unreachableReason: 'Dock (start) is inside an obstacle',
    };
  }
  if (obstacles.has(key(goal))) {
    return {
      orderedStops: [start, ...pickStops, goal],
      fullPath: [],
      totalDistance: 0,
      astarTimeMs: 0,
      tspTimeMs: 0,
      totalTimeMs: performance.now() - t0,
      nodesExpanded: 0,
      method: 'held-karp',
      unreachable: true,
      unreachableReason: 'Checkout (goal) is inside an obstacle',
    };
  }

  // Nodes list: index 0 is start, 1..k are pickStops, k+1 is goal
  const allNodes: GridPoint[] = [start, ...pickStops, goal];
  const totalNodes = allNodes.length;

  let totalAstarMs = 0;
  let totalNodesExpanded = 0;

  // Pairwise A* path cache and distance matrix
  const distMatrix: number[][] = Array.from({ length: totalNodes }, () => Array(totalNodes).fill(0));
  const pathMatrix: (GridPoint[] | null)[][] = Array.from({ length: totalNodes }, () =>
    Array(totalNodes).fill(null)
  );

  for (let i = 0; i < totalNodes; i++) {
    for (let j = 0; j < totalNodes; j++) {
      if (i === j) {
        distMatrix[i][j] = 0;
        pathMatrix[i][j] = [allNodes[i]];
        continue;
      }
      if (j < i) {
        // Reverse symmetrical path
        distMatrix[i][j] = distMatrix[j][i];
        pathMatrix[i][j] = pathMatrix[j][i] ? [...pathMatrix[j][i]!].reverse() : null;
        continue;
      }
      const res = aStarSearch(allNodes[i], allNodes[j], width, height, obstacles);
      totalAstarMs += res.executionTimeMs;
      totalNodesExpanded += res.nodesExpanded;

      if (res.unreachable || res.path.length === 0) {
        return {
          orderedStops: [start, ...pickStops, goal],
          fullPath: [],
          totalDistance: 0,
          astarTimeMs: totalAstarMs,
          tspTimeMs: 0,
          totalTimeMs: performance.now() - t0,
          nodesExpanded: totalNodesExpanded,
          method: k <= 10 ? 'held-karp' : '2-opt',
          unreachable: true,
          unreachableReason: `Cannot find path between (${allNodes[i].x},${allNodes[i].y}) and (${allNodes[j].x},${allNodes[j].y}) due to obstacles`,
        };
      }

      distMatrix[i][j] = res.distance;
      pathMatrix[i][j] = res.path;
    }
  }

  // Edge case: no pick stops, just start -> goal
  if (k === 0) {
    const directPath = pathMatrix[0][1] ?? [];
    return {
      orderedStops: [start, goal],
      fullPath: directPath,
      totalDistance: distMatrix[0][1],
      astarTimeMs: totalAstarMs,
      tspTimeMs: 0,
      totalTimeMs: performance.now() - t0,
      nodesExpanded: totalNodesExpanded,
      method: 'held-karp',
    };
  }

  const tspT0 = performance.now();
  let orderedIndices: number[] = [];
  const method: 'held-karp' | '2-opt' = k <= 10 ? 'held-karp' : '2-opt';

  if (k <= 10) {
    // Exact Held-Karp DP for Open Path: Fixed Start 0, subset of pickStops {1..k}, Fixed Goal k+1
    // memo[mask][u] = min cost from start (0), visiting subset `mask` of pickStops (1..k), ending at pickStop `u`
    // mask is bitmask over {0, ..., k-1} corresponding to pickStops index (1 + bit)
    const numSubsets = 1 << k;
    const memo: number[][] = Array.from({ length: numSubsets }, () => Array(k).fill(Infinity));
    const parent: number[][] = Array.from({ length: numSubsets }, () => Array(k).fill(-1));

    // Base cases: first stop after start (0)
    for (let u = 0; u < k; u++) {
      const stopIdx = u + 1;
      memo[1 << u][u] = distMatrix[0][stopIdx];
    }

    for (let mask = 1; mask < numSubsets; mask++) {
      for (let u = 0; u < k; u++) {
        if ((mask & (1 << u)) === 0 || memo[mask][u] === Infinity) continue;
        const uStopIdx = u + 1;
        for (let v = 0; v < k; v++) {
          if ((mask & (1 << v)) !== 0) continue;
          const nextMask = mask | (1 << v);
          const vStopIdx = v + 1;
          const cost = memo[mask][u] + distMatrix[uStopIdx][vStopIdx];
          if (cost < memo[nextMask][v]) {
            memo[nextMask][v] = cost;
            parent[nextMask][v] = u;
          }
        }
      }
    }

    // Connect last pick stop to goal (k+1)
    const fullMask = numSubsets - 1;
    let bestTotalCost = Infinity;
    let bestLastPick = -1;

    for (let u = 0; u < k; u++) {
      const uStopIdx = u + 1;
      const totalCost = memo[fullMask][u] + distMatrix[uStopIdx][k + 1];
      if (totalCost < bestTotalCost) {
        bestTotalCost = totalCost;
        bestLastPick = u;
      }
    }

    // Reconstruct tour backwards
    const pickPath: number[] = [];
    let curr = bestLastPick;
    let mask = fullMask;
    while (curr !== -1) {
      pickPath.push(curr + 1);
      const prev = parent[mask][curr];
      mask ^= 1 << curr;
      curr = prev;
    }
    pickPath.reverse();
    orderedIndices = [0, ...pickPath, k + 1];
  } else {
    // 2-Opt heuristic with fixed start (0) and fixed goal (k+1)
    // Greedy nearest-neighbor initialization
    const visited = new Set<number>();
    const route: number[] = [0];
    let current = 0;

    while (route.length < totalNodes - 1) {
      let nextPick = -1;
      let minDist = Infinity;
      for (let p = 1; p <= k; p++) {
        if (!visited.has(p)) {
          const d = distMatrix[current][p];
          if (d < minDist) {
            minDist = d;
            nextPick = p;
          }
        }
      }
      visited.add(nextPick);
      route.push(nextPick);
      current = nextPick;
    }
    route.push(k + 1); // Append goal

    const calcRouteDist = (r: number[]) => {
      let d = 0;
      for (let i = 0; i < r.length - 1; i++) {
        d += distMatrix[r[i]][r[i + 1]];
      }
      return d;
    };

    let improved = true;
    let bestDist = calcRouteDist(route);

    // 2-opt loop: reverse subsegments between index 1 and k (keeping 0 and k+1 fixed)
    while (improved) {
      improved = false;
      for (let i = 1; i < k; i++) {
        for (let j = i + 1; j <= k; j++) {
          const newRoute = [...route.slice(0, i), ...route.slice(i, j + 1).reverse(), ...route.slice(j + 1)];
          const newDist = calcRouteDist(newRoute);
          if (newDist < bestDist) {
            bestDist = newDist;
            route.splice(0, route.length, ...newRoute);
            improved = true;
            break;
          }
        }
        if (improved) break;
      }
    }
    orderedIndices = route;
  }

  const tspTimeMs = performance.now() - tspT0;

  // Concatenate actual A* path segments
  let fullPath: GridPoint[] = [];
  let calculatedDistance = 0;

  for (let i = 0; i < orderedIndices.length - 1; i++) {
    const fromIdx = orderedIndices[i];
    const toIdx = orderedIndices[i + 1];
    const seg = pathMatrix[fromIdx][toIdx];
    if (seg && seg.length > 0) {
      if (fullPath.length === 0) {
        fullPath = [...seg];
      } else {
        fullPath = fullPath.concat(seg.slice(1));
      }
      calculatedDistance += distMatrix[fromIdx][toIdx];
    }
  }

  return {
    orderedStops: orderedIndices.map((i) => allNodes[i]),
    fullPath,
    totalDistance: calculatedDistance,
    astarTimeMs: totalAstarMs,
    tspTimeMs,
    totalTimeMs: performance.now() - t0,
    nodesExpanded: totalNodesExpanded,
    method,
  };
}
