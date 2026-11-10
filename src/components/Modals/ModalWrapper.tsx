import React, { useEffect } from 'react';
import { X, ExternalLink, GitBranch } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS } from '../../data/projects';

import { NeuralQueryDemo } from './NeuralQueryDemo';
import { TraceExplorerDemo } from './TraceExplorerDemo';
import { PipelineReplayDemo } from './PipelineReplayDemo';
import { WarehouseRoutingDemo } from './WarehouseRoutingDemo';
import { TradeflowDemo } from './TradeflowDemo';
import { MoneyballDemo } from './MoneyballDemo';
import { WorkplaceSafetyDemo } from './WorkplaceSafetyDemo';

export const ModalWrapper: React.FC = () => {
  const { activeModalProjectId, closeModal } = usePortfolioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (!activeModalProjectId) return null;

  const project = PROJECTS.find(p => p.id === activeModalProjectId);
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-5xl max-h-[90vh] bg-[#f8f9fa] dark:bg-[#0f141c] sketch-border overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500 font-bold uppercase">{project.id}</span>
            <span className="text-slate-400">/</span>
            <h2 id="modal-title" className="font-bold text-sm sm:text-base truncate max-w-md">
              {project.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded sketch-border text-xs flex items-center gap-1 font-mono"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={closeModal}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded sketch-border"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {project.demoType === 'onnx-gnn' && <NeuralQueryDemo onClose={closeModal} />}
          {project.demoType === 'trace-explorer' && <TraceExplorerDemo />}
          {project.demoType === 'pipeline-replay' && <PipelineReplayDemo />}
          {project.demoType === 'spatial-wasm' && <WarehouseRoutingDemo />}
          {project.demoType === 'oms-fsm' && <TradeflowDemo />}
          {project.demoType === 'hmm-risk' && <MoneyballDemo />}
          {project.demoType === 'case-study' && <WorkplaceSafetyDemo />}
        </div>
      </div>
    </div>
  );
};
