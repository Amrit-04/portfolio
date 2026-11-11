import React from 'react';

const NeuralQueryDemo = React.lazy(() => import('./NeuralQueryDemo'));
const TraceExplorerDemo = React.lazy(() => import('./TraceExplorerDemo'));
const PipelineReplayDemo = React.lazy(() => import('./PipelineReplayDemo'));
const TradeflowDemo = React.lazy(() => import('./TradeflowDemo'));
const WarehouseRoutingDemo = React.lazy(() => import('./WarehouseRoutingDemo'));
const MoneyballDemo = React.lazy(() => import('./MoneyballDemo'));
const WorkplaceSafetyDemo = React.lazy(() => import('./WorkplaceSafetyDemo'));

export const getLazyDemo = (demoType: string | undefined): React.LazyExoticComponent<React.ComponentType> | null => {
  switch (demoType) {
    case 'onnx-gnn':
      return NeuralQueryDemo;
    case 'trace-explorer':
      return TraceExplorerDemo;
    case 'pipeline-replay':
      return PipelineReplayDemo;
    case 'oms-fsm':
      return TradeflowDemo;
    case 'spatial-wasm':
      return WarehouseRoutingDemo;
    case 'hmm-risk':
      return MoneyballDemo;
    case 'case-study':
      return WorkplaceSafetyDemo;
    default:
      return null;
  }
};
