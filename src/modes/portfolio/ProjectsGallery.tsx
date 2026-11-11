import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectDefinition } from '../../data/projects';
import {
  DiagramNeural,
  DiagramControl,
  DiagramTrade,
  DiagramWarehouse,
  DiagramQuant,
  DiagramPipeline,
  DiagramSafety,
} from '../../components/illustrations';
import { NotebookPen, PlayCircle, ExternalLink, Sparkles } from 'lucide-react';
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

// Asymmetric gallery compositions for each project
const GALLERY_STYLES = [
  // 01 Neural Query Optimizer - Feature landscape piece
  'lg:col-span-7 rotate-[-0.8deg] bg-paper shadow-sm hover:shadow-md border-t-4 border-t-accent',
  // 02 LRCP - Portrait exhibition piece
  'lg:col-span-5 rotate-[0.6deg] bg-paper2/95 shadow-sm hover:shadow-md border-t-4 border-t-accent2',
  // 03 Telemetry Pipeline - Resilient stream poster
  'lg:col-span-5 rotate-[0.8deg] bg-paper shadow-sm hover:shadow-md border-t-4 border-t-gold',
  // 04 Tradeflow - Institutional trade dispatch
  'lg:col-span-7 rotate-[-0.5deg] bg-paper shadow-sm hover:shadow-md border-t-4 border-t-accent',
  // 05 Moneyball - Research folio piece
  'lg:col-span-7 rotate-[0.5deg] bg-paper shadow-sm hover:shadow-md border-t-4 border-t-gold',
  // 06 Warehouse Routing - Geometric spatial study
  'lg:col-span-5 rotate-[-0.7deg] bg-paper2/95 shadow-sm hover:shadow-md border-t-4 border-t-accent2',
  // 07 Workplace Safety - Full-width exhibition centerpiece
  'lg:col-span-12 rotate-[0.2deg] bg-paper shadow-sm hover:shadow-md border-t-4 border-t-accent',
];

const Card: React.FC<{
  project: ProjectDefinition;
  index: number;
  onOpen: (id: string) => void;
}> = ({ project, index, onOpen }) => {
  const Diagram = DIAGRAMS[project.demoType];
  const galleryStyle = GALLERY_STYLES[index % GALLERY_STYLES.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.06 }}
      className={`relative p-6 md:p-8 rounded-2xl border border-ink3/30 transition-all duration-300 flex flex-col justify-between ${galleryStyle}`}
      data-testid={`project-card-${project.id}`}
    >
      <div>
        {/* Exhibition header & badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-semibold text-accent font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            Exhibit No. 0{index + 1}
          </span>
          <span className="sticker text-[11px] font-sans">
            {project.tierLabel}
          </span>
        </div>

        {/* Title & Tagline */}
        <button
          onClick={() => onOpen(project.id)}
          className="text-left group w-full cursor-pointer"
          data-testid={`open-notebook-${project.id}`}
        >
          <h3 className="font-serif text-2xl md:text-3xl leading-snug font-semibold text-ink group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
            {project.tagline}
          </p>
        </button>

        {/* Illustrated Artwork Frame */}
        <div className="my-5 rounded-xl border border-ink3/20 bg-paper2/50 p-3 flex items-center justify-center overflow-hidden">
          <Diagram className="w-full h-40 max-h-44 text-ink drop-shadow-xs" />
        </div>

        {/* Technology stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s} className="chip bg-paper3/60">
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="chip border-dashed text-ink3">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Verified metrics showcase */}
        <div className="pt-3 border-t border-ink3/20 space-y-2 mb-6">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-4 text-xs font-sans">
              <span className="text-ink3 font-medium">{m.label}</span>
              <a
                href={m.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-semibold text-ink hover:text-accent transition-colors text-right underline decoration-accent/40 underline-offset-4"
                title="View the benchmark artifact in repository"
              >
                {m.value}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-4 border-t border-ink3/20 flex flex-wrap items-center gap-3">
        <button
          className="btn-ink !py-2 !px-4 text-xs cursor-pointer flex items-center gap-1.5"
          onClick={() => onOpen(project.id)}
          data-testid={`notebook-btn-${project.id}`}
        >
          <NotebookPen className="w-3.5 h-3.5" />
          <span>Open notebook</span>
        </button>

        {project.tier !== 'C' && (
          <span className="annotation text-base text-accent flex items-center gap-1">
            <PlayCircle className="w-4 h-4 text-accent" /> sandbox inside
          </span>
        )}

        <a
          href={project.links.repo}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost ml-auto text-xs flex items-center gap-1.5 text-ink2 hover:text-accent"
          aria-label={`${project.title} on GitHub`}
          data-testid={`github-${project.id}`}
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline font-mono">repo</span>
        </a>
      </div>
    </motion.article>
  );
};

export const ProjectsGallery: React.FC<{ onOpen: (id: string) => void }> = ({ onOpen }) => (
  <section id="work" className="relative py-24 md:py-32 px-5 md:px-10">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="sticker text-xs text-accent bg-paper2">
              <Sparkles className="w-3 h-3 text-accent mr-1" />
              Exhibition Wall
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.2rem)] leading-[1.0] font-normal tracking-tight text-ink">
            Illustrated works &amp; systems.
          </h2>
        </div>
        <p className="max-w-md text-sm text-ink2 font-sans leading-relaxed">
          Seven engineering systems, each framed with its own hand-drawn study.
          Every metric is grounded in an empirical benchmark artifact — click any figure to verify its repository receipt.
        </p>
      </div>

      {/* Asymmetric Exhibition Wall Grid */}
      <div className="grid md:grid-cols-12 gap-8 md:gap-10">
        {PROJECTS.map((p, i) => (
          <Card key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  </section>
);
