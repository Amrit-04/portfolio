import React from "react";

const NeuralQueryDemo = React.lazy(() => import("./NeuralQueryDemo"));
const TraceExplorerDemo = React.lazy(() => import("./TraceExplorerDemo"));
const PipelineReplayDemo = React.lazy(() => import("./PipelineReplayDemo"));
const TradeflowDemo = React.lazy(() => import("./TradeflowDemo"));
const WarehouseRoutingDemo = React.lazy(() => import("./WarehouseRoutingDemo"));
const MoneyballDemo = React.lazy(() => import("./MoneyballDemo"));
const WorkplaceSafetyDemo = React.lazy(() => import("./WorkplaceSafetyDemo"));

export const demos: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  "onnx-gnn": NeuralQueryDemo,
  "trace-explorer": TraceExplorerDemo,
  "pipeline-replay": PipelineReplayDemo,
  "oms-fsm": TradeflowDemo,
  "spatial-wasm": WarehouseRoutingDemo,
  "hmm-risk": MoneyballDemo,
  "case-study": WorkplaceSafetyDemo,
};
