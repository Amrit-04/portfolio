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
import { X, ExternalLink, FileWarning, FlaskConical, BookOpen } from 'lucide-react';
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
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project notebook`}
      data-testid="project-detail-modal"
    >
      <div className="fixed inset-0 bg-ink/50" onClick={onClose} aria-hidden="true" />

      <motion.div
        initial={{ y: 40, opacity: 0, rotate: -0.4 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-paper frame shadow-hard-lg w-full max-w-5xl my-4"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[1.5px] border-ink bg-paper px-5 md:px-8 py-4">
          <span className="label-mono">Project notebook — {project.id}</span>
          <button className="btn-ghost !px-2" onClick={onClose} aria-label="Close notebook" data-testid="close-notebook-btn">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 md:px-8 py-8">
          <h3 className="font-serif text-4xl md:text-5xl leading-[0.98] tracking-tight">{project.title}</h3>
          <p className="mt-3 text-ink2">{project.tagline}</p>

          <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* spec rail */}
            <aside className="space-y-7 lg:border-r-[1.5px] lg:border-dashed lg:border-ink/30 lg:pr-8">
              <div>
                <p className="label-mono text-ink3 mb-2">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-mono text-ink3 mb-2">Links</p>
                <div className="space-y-2">
                  <a href={project.links.repo} target="_blank" rel="noreferrer" className="link-sketch font-mono text-xs uppercase tracking-[0.12em] flex items-center gap-1.5 w-fit">
                    <Github className="w-4 h-4" /> Source repository
                  </a>
                  {project.links.paper && (
                    <a href={project.links.paper} target="_blank" rel="noreferrer" className="link-sketch font-mono text-xs uppercase tracking-[0.12em] flex items-center gap-1.5 w-fit">
                      <BookOpen className="w-4 h-4" /> IEEE Xplore
                    </a>
                  )}
                </div>
              </div>
              <div>
                <p className="label-mono text-ink3 mb-2">Verified benchmarks</p>
                <div className="space-y-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="border-l-2 border-red/70 pl-3">
                      <p className="font-mono text-[13px] font-bold leading-snug">{m.value}</p>
                      <p className="font-mono text-[10px] text-ink3 mt-0.5">{m.label}</p>
                      {m.benchmarkContext && <p className="font-mono text-[10px] text-ink3 mt-0.5">{m.benchmarkContext}</p>}
                      <a href={m.sourceUrl} target="_blank" rel="noreferrer" className="font-mono text-[10px] text-blue underline underline-offset-2 flex items-center gap-1 mt-1">
                        source artifact <ExternalLink className="w-3 h-3" />
                      </a>
                      {m.isInformal && (
                        <p className="font-mono text-[10px] text-red mt-1 flex items-center gap-1">
                          <FileWarning className="w-3 h-3" /> informal dev measurement
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* narrative */}
            <div className="space-y-10 min-w-0">
              <section>
                <h4 className="label-mono text-red mb-3">The problem</h4>
                <p className="font-serif text-xl md:text-2xl leading-snug">{project.problem}</p>
              </section>

              <section>
                <h4 className="label-mono text-red mb-3">What I built</h4>
                <ul className="space-y-2.5">
                  {project.built.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink2">
                      <span className="font-mono text-red shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="border-[1.5px] border-ink/80 bg-paper2/60 px-4 py-3 sketch-hatch">
                  <Diagram className="w-full text-ink" />
                </div>
                <p className="annotation text-lg text-ink3 mt-2">
                  fig — hand-drawn schematic, absolutely not to scale
                </p>
              </section>

              <section>
                <h4 className="label-mono text-red mb-4">Engineering decisions & tradeoffs</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.decisions.map((d, i) => (
                    <div key={i} className="frame-sm bg-paper p-4 shadow-hard-sm">
                      <p className="font-mono text-xs font-bold">{d.decision}</p>
                      <p className="text-[13px] text-ink2 mt-2 leading-relaxed">{d.rationale}</p>
                      <p className="font-mono text-[11px] text-ink3 mt-2 leading-relaxed">
                        <span className="text-red font-bold">tradeoff — </span>
                        {d.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="frame-red bg-paper2/50 p-5">
                <h4 className="label-mono text-red mb-3 flex items-center gap-2">
                  <FileWarning className="w-4 h-4" /> Honest limitations
                </h4>
                <ul className="space-y-2 list-disc list-outside pl-4 text-[13px] leading-relaxed text-ink2">
                  {project.limitations.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>

              {Demo && (
                <section>
                  <h4 className="label-mono text-red mb-3 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Interactive demo
                  </h4>
                  <div className="frame-sm bg-paper p-4 md:p-6" data-testid={`demo-${project.id}`}>
                    <React.Suspense
                      fallback={
                        <div className="py-10 text-center">
                          <p className="label-mono animate-pulse">Unpacking the demo crate…</p>
                        </div>
                      }
                    >
                      <Demo />
                    </React.Suspense>
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
