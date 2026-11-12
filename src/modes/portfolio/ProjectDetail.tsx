import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectDefinition } from '../../data/projects';
import {
  DiagramNeural,
  DiagramControl,
  DiagramTrade,
  DiagramWarehouse,
  DiagramQuant,
  DiagramPipeline,
  DiagramSafety,
} from '../../components/illustrations';
import { getLazyDemo } from '../../projects/demos';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { X, ExternalLink, FileWarning, FlaskConical, BookOpen, Sparkles } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

const DIAGRAMS: Record<string, React.FC<{ className?: string }>> = {
  'onnx-gnn': DiagramNeural,
  'trace-explorer': DiagramControl,
  'oms-fsm': DiagramTrade,
  'spatial-wasm': DiagramWarehouse,
  'hmm-risk': DiagramQuant,
  'pipeline-replay': DiagramPipeline,
  'case-study': DiagramSafety,
};

export const ProjectDetail: React.FC<{
  project: ProjectDefinition | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;
  const Diagram = DIAGRAMS[project.demoType];
  const Demo = getLazyDemo(project.demoType);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project notebook`}
      data-testid="project-detail-modal"
    >
      {/* Dimmed backdrop */}
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Paper Card */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-paper rounded-3xl border border-ink3/40 shadow-xl w-full max-w-5xl my-6 overflow-hidden z-10"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink3/20 bg-paper/95 backdrop-blur-md px-6 md:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="sticker text-xs text-accent">
              <Sparkles className="w-3 h-3 text-accent mr-1" />
              Project Notebook — {project.id}
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-paper2 hover:bg-paper3 flex items-center justify-center text-ink hover:text-accent transition-colors"
            onClick={onClose}
            aria-label="Close notebook"
            data-testid="close-notebook-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-6 md:px-10 py-8 max-h-[85vh] overflow-y-auto">
          <h3 className="font-serif text-3xl md:text-5xl leading-tight font-semibold text-ink">
            {project.title}
          </h3>
          <p className="mt-2 text-base text-ink2 font-sans">
            {project.tagline}
          </p>

          <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left Rail: Specs & Verified Metrics */}
            <aside className="space-y-6 lg:border-r border-ink3/20 lg:pr-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-2">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="chip bg-paper2/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-2">
                  Links
                </p>
                <div className="space-y-2">
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent flex items-center gap-1.5 w-fit"
                  >
                    <Github className="w-4 h-4" /> Source repository
                  </a>
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      target="_blank"
                      rel="noreferrer"
                      className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent flex items-center gap-1.5 w-fit"
                    >
                      <BookOpen className="w-4 h-4" /> IEEE Xplore
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-3">
                  Verified benchmarks
                </p>
                <div className="space-y-3.5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="border-l-2 border-accent pl-3 py-0.5">
                      <p className="font-mono text-sm font-bold text-ink leading-snug">
                        {m.value}
                      </p>
                      <p className="font-sans text-[11px] text-ink2 mt-0.5 font-medium">
                        {m.label}
                      </p>
                      {m.benchmarkContext && (
                        <p className="font-sans text-[10px] text-ink3 mt-0.5">
                          {m.benchmarkContext}
                        </p>
                      )}
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] text-accent2 underline underline-offset-2 flex items-center gap-1 mt-1 hover:text-accent"
                      >
                        source artifact <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      {m.isInformal && (
                        <p className="font-sans text-[10px] text-accent mt-1 flex items-center gap-1">
                          <FileWarning className="w-3 h-3" /> informal dev measurement
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Column: Narrative & Architecture */}
            <div className="space-y-8 min-w-0">
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-2">
                  THE PROBLEM
                </h4>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-ink">
                  {project.problem}
                </p>
              </section>

              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-3">
                  WHAT I BUILT
                </h4>
                <ul className="space-y-2.5 font-sans">
                  {project.built.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink2">
                      <span className="font-mono text-xs text-accent font-bold shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Hand-drawn Illustrated Architecture */}
              <section>
                <div className="rounded-2xl border border-ink3/30 bg-paper2/60 p-4">
                  <Diagram className="w-full text-ink drop-shadow-xs" />
                </div>
                <p className="annotation text-base text-ink3 mt-2 text-center">
                  illustrated architectural study · all verified numbers cited
                </p>
              </section>

              {/* Engineering Decisions & Tradeoffs */}
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-3">
                  ENGINEERING DECISIONS &amp; TRADEOFFS
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.decisions.map((d, i) => (
                    <div key={i} className="bg-paper2/50 rounded-xl border border-ink3/20 p-4">
                      <p className="font-sans text-xs font-bold text-ink">
                        {d.decision}
                      </p>
                      <p className="text-xs text-ink2 mt-2 leading-relaxed font-sans">
                        {d.rationale}
                      </p>
                      <p className="text-xs text-ink3 mt-2 font-sans">
                        <strong className="text-accent">Tradeoff: </strong>
                        {d.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Honest Limitations */}
              <section className="bg-paper2/40 rounded-2xl border border-accent/40 p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-3 flex items-center gap-1.5">
                  <FileWarning className="w-4 h-4 text-accent" />
                  HONEST LIMITATIONS
                </h4>
                <ul className="space-y-2 list-disc list-outside pl-4 text-xs leading-relaxed text-ink2 font-sans">
                  {project.limitations.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>

              {/* Interactive In-Browser Demo */}
              {Demo && (
                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent font-sans mb-3 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-accent" />
                    INTERACTIVE DEMO
                  </h4>
                  <div
                    className="bg-paper rounded-2xl border border-ink3/30 p-4 md:p-6 shadow-xs overflow-hidden"
                    data-testid={`demo-${project.id}`}
                  >
                    <ErrorBoundary fallbackTitle={`${project.title} Sandbox`} repoUrl={project.links.repo}>
                      <React.Suspense
                        fallback={
                          <div className="py-12 text-center">
                            <p className="font-sans text-xs text-ink3 animate-pulse">
                              Unpacking interactive browser sandbox…
                            </p>
                          </div>
                        }
                      >
                        <Demo />
                      </React.Suspense>
                    </ErrorBoundary>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
