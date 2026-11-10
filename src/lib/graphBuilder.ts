// Utilities for Neural Query Optimizer Web Demo

export const OPERATOR_TYPES = [
  'Seq Scan', 'Index Scan', 'Index Only Scan', 'Bitmap Heap Scan', 'Bitmap Index Scan',
  'Nested Loop', 'Merge Join', 'Hash Join', 'Aggregate', 'Hash Aggregate',
  'Sort', 'Limit', 'Subquery Scan', 'Materialize', 'Unique',
  'Set Op', 'Append', 'ModifyTable', 'Memoize', 'Gather',
  'Gather Merge', 'CTE Scan', 'Unknown'
] as const;

const typeToId = new Map<string, number>();
OPERATOR_TYPES.forEach((t, i) => typeToId.set(t, i));
const UNK_ID = typeToId.get('Unknown') ?? 22;

export function getOperatorId(nodeType: string): number {
  return typeToId.get(nodeType) ?? UNK_ID;
}

export interface FlattenedPlanNode {
  nodeType: string;
  depth: number;
  startupCost: number;
  totalCost: number;
  planRows: number;
  planWidth: number;
  relationName?: string;
  actualTotalTime?: number;
}

export interface PlanGraph {
  nodes: FlattenedPlanNode[];
  edges: [number, number][]; // [parent, child]
}

export function parsePlanTree(rawPlan: any): PlanGraph {
  const planObj = Array.isArray(rawPlan) ? rawPlan[0]?.Plan : (rawPlan?.Plan || rawPlan);
  if (!planObj) {
    return { nodes: [], edges: [] };
  }

  const nodes: FlattenedPlanNode[] = [];
  const edges: [number, number][] = [];

  function dfs(curr: any, depth: number, parentIdx: number | null): number {
    const idx = nodes.length;
    nodes.push({
      nodeType: curr['Node Type'] || 'Unknown',
      depth,
      startupCost: parseFloat(curr['Startup Cost'] || '0') || 0,
      totalCost: parseFloat(curr['Total Cost'] || '0') || 0,
      planRows: parseFloat(curr['Plan Rows'] || '0') || 0,
      planWidth: parseInt(curr['Plan Width'] || '0', 10) || 0,
      relationName: curr['Relation Name'],
      actualTotalTime: curr['Actual Total Time'] ? parseFloat(curr['Actual Total Time']) : undefined
    });

    if (parentIdx !== null) {
      edges.push([parentIdx, idx]);
    }

    const children = curr['Plans'] || [];
    for (const child of children) {
      dfs(child, depth + 1, idx);
    }

    return idx;
  }

  dfs(planObj, 0, null);
  return { nodes, edges };
}

export function buildTensors(graph: PlanGraph) {
  const numNodes = graph.nodes.length;
  const numEdges = graph.edges.length;

  const xOpData = new BigInt64Array(numNodes);
  const xContData = new Float32Array(numNodes * 4);
  const edgeIndexData = new BigInt64Array(2 * numEdges);
  const batchData = new BigInt64Array(numNodes);

  for (let i = 0; i < numNodes; i++) {
    const n = graph.nodes[i];
    xOpData[i] = BigInt(getOperatorId(n.nodeType));
    
    // Feature transforms: log1p(max(0, val))
    xContData[i * 4 + 0] = Math.log1p(Math.max(0, n.startupCost));
    xContData[i * 4 + 1] = Math.log1p(Math.max(0, n.totalCost));
    xContData[i * 4 + 2] = Math.log1p(Math.max(0, n.planRows));
    xContData[i * 4 + 3] = Math.log1p(Math.max(0, n.planWidth));

    batchData[i] = 0n;
  }

  for (let e = 0; e < numEdges; e++) {
    edgeIndexData[e] = BigInt(graph.edges[e][0]);
    edgeIndexData[numEdges + e] = BigInt(graph.edges[e][1]);
  }

  return {
    x_op: { data: xOpData, dims: [numNodes] },
    x_cont: { data: xContData, dims: [numNodes, 4] },
    edge_index: { data: edgeIndexData, dims: [2, numEdges] },
    batch: { data: batchData, dims: [numNodes] }
  };
}
