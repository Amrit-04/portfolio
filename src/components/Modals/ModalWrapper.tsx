import React, { useEffect, useState } from 'react';
import { X, ExternalLink, GitBranch, Terminal, BookOpen, Layers, ShieldCheck, AlertTriangle } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS, ProjectDefinition } from '../../data/projects';
import { soundEffects } from '../../lib/soundEffects';

import { NeuralQueryDemo } from './NeuralQueryDemo';
import { TraceExplorerDemo } from './TraceExplorerDemo';
import { PipelineReplayDemo } from './PipelineReplayDemo';
import { WarehouseRoutingDemo } from './WarehouseRoutingDemo';
import { TradeflowDemo } from './TradeflowDemo';
import { MoneyballDemo } from './MoneyballDemo';
import { WorkplaceSafetyDemo } from './WorkplaceSafetyDemo';

export const ModalWrapper: React.FC = () => {
  const { activeModalProjectId, closeModal, isSoundMuted } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'demo' | 'blueprint'>('demo');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Reset tab when modal opens
  useEffect(() => {
    setActiveTab('demo');
  }, [activeModalProjectId]);

  if (!activeModalProjectId) return null;

  const project = PROJECTS.find(p => p.id === activeModalProjectId);
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-[#faf8f5] dark:bg-[#12161f] sketch-border overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between p-3.5 bg-white dark:bg-slate-900 border-b-2 border-slate-900 dark:border-slate-700 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-slate-500 font-bold uppercase">{project.id}</span>
            <span className="text-slate-400">/</span>
            <h2 id="modal-title" className="font-editorial font-bold text-base sm:text-lg truncate max-w-md">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Interactive Demo vs Architecture Specs */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded sketch-border text-xs font-mono">
              <button
                onClick={() => {
                  soundEffects.playUiTap(isSoundMuted);
                  setActiveTab('demo');
                }}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-bold ${
                  activeTab === 'demo'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Interactive Demo</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playUiTap(isSoundMuted);
                  setActiveTab('blueprint');
                }}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-bold ${
                  activeTab === 'blueprint'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Blueprint Specs &amp; Notebook</span>
              </button>
            </div>

            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded sketch-border text-xs flex items-center gap-1 font-mono"
              title="View GitHub Repository"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button
              onClick={() => {
                soundEffects.playUiTap(isSoundMuted);
                closeModal();
              }}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded sketch-border"
              aria-label="Close Modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 engineering-grid">
          {activeTab === 'demo' ? (
            <div>
              {project.demoType === 'onnx-gnn' && <NeuralQueryDemo onClose={closeModal} />}
              {project.demoType === 'trace-explorer' && <TraceExplorerDemo />}
              {project.demoType === 'pipeline-replay' && <PipelineReplayDemo />}
              {project.demoType === 'spatial-wasm' && <WarehouseRoutingDemo />}
              {project.demoType === 'oms-fsm' && <TradeflowDemo />}
              {project.demoType === 'hmm-risk' && <MoneyballDemo />}
              {project.demoType === 'case-study' && <WorkplaceSafetyDemo />}
            </div>
          ) : (
            <BlueprintNotebookView project={project} onSwitchToDemo={() => setActiveTab('demo')} />
          )}
        </div>
      </div>
    </div>
  );
};

// Blueprint Notebook Subcomponent
const BlueprintNotebookView: React.FC<{ project: ProjectDefinition; onSwitchToDemo: () => void }> = ({
  project,
  onSwitchToDemo
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 sketch-border">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-start">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
            ARCHITECTURAL DESIGN SPECIFICATION // {project.id}
          </span>
          <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-slate-500">{project.tagline}</p>
        </div>

        <button
          onClick={onSwitchToDemo}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5 shrink-0"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Launch Sandbox Demo</span>
        </button>
      </div>

      {/* Problem & Built */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-display">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border space-y-2">
          <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Problem Statement
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border space-y-2">
          <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
            What Was Built
          </span>
          <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
            {project.built.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Architectural Decisions & Tradeoffs */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Key Architectural Decisions &amp; Tradeoffs
        </span>
        <div className="space-y-2.5">
          {project.decisions.map((d, i) => (
            <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 sketch-border text-xs space-y-1.5 font-mono">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="text-emerald-600">Decision:</span>
                <span>{d.decision}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-500">Rationale:</span> {d.rationale}
              </p>
              <p className="text-amber-800 dark:text-amber-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Tradeoff:</span> {d.tradeoff}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Empirical Benchmarks */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Verified Benchmark Measurements
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.metrics.map(m => (
            <div key={m.label} className="p-3 bg-slate-50 dark:bg-slate-800/40 sketch-border font-mono text-xs space-y-1">
              <span className="text-[11px] text-slate-500 block">{m.label}</span>
              <a
                href={m.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{m.value}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              {m.benchmarkContext && (
                <span className="text-[10px] text-slate-400 block">{m.benchmarkContext}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Honest Limitations & Lessons Learned */}
      <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded font-mono text-xs space-y-2">
        <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Engineering Limitations &amp; Real-World Context</span>
        </div>
        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
          {project.limitations.map((lim, i) => (
            <li key={i}>{lim}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
