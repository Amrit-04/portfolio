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
import { NotebookPen, PlayCircle } from 'lucide-react';
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

const CARD_LAYOUT = [
  'md:col-span-7 md:rotate-[-0.6deg]',
  'md:col-span-5 md:translate-y-6 md:rotate-[0.8deg]',
  'md:col-span-5 md:rotate-[0.5deg]',
  'md:col-span-7 md:translate-y-6 md:rotate-[-0.8deg]',
  'md:col-span-7 md:rotate-[0.6deg]',
  'md:col-span-5 md:translate-y-6 md:rotate-[-0.5deg]',
  'md:col-span-12 md:rotate-[0.3deg]',
];

const TIER_STYLE: Record<string, string> = {
  A: 'border-red text-red',
  B: 'border-blue text-blue',
  C: 'border-ink text-ink',
};

const Card: React.FC<{
  project: ProjectDefinition;
  index: number;
  onOpen: (id: string) => void;
}> = ({ project, index, onOpen }) => {
  const Diagram = DIAGRAMS[project.demoType];
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      className={`relative bg-paper frame tape p-6 md:p-8 flex flex-col gap-5 ${CARD_LAYOUT[index % CARD_LAYOUT.length]}`}
      data-testid={`project-card-${project.id}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="label-mono text-ink3">FIG. 0{index + 1} — {project.id}</span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] border-[1.5px] px-2 py-0.5 ${TIER_STYLE[project.tier]}`}>
          {project.tierLabel}
        </span>
      </div>

      <button onClick={() => onOpen(project.id)} className="text-left group" data-testid={`open-notebook-${project.id}`}>
        <h3 className="font-serif text-3xl md:text-4xl leading-[1.02] group-hover:text-red transition-colors duration-200">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-ink2 leading-relaxed">{project.tagline}</p>
      </button>

      <div className="border-[1.5px] border-ink/80 bg-paper2/60 px-3 py-2 sketch-hatch">
        <Diagram className="w-full h-36 text-ink" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
        {project.stack.length > 6 && <span className="chip border-dashed">+{project.stack.length - 6}</span>}
      </div>

      <div className="border-t-[1.5px] border-dashed border-ink/40 pt-4 space-y-2">
        {project.metrics.slice(0, 2).map((m) => (
          <div key={m.label} className="flex items-baseline justify-between gap-4 text-xs">
            <span className="text-ink3 font-mono">{m.label}</span>
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono font-bold text-ink hover:text-red transition-colors text-right underline decoration-red/60 underline-offset-4"
              title="View the benchmark artifact"
            >
              {m.value}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
        <button className="btn-ink !py-2.5 !px-4" onClick={() => onOpen(project.id)} data-testid={`notebook-btn-${project.id}`}>
          <NotebookPen className="w-4 h-4" /> Open notebook
        </button>
        {project.tier !== 'C' && (
          <span className="annotation text-lg text-ink3 flex items-center gap-1">
            <PlayCircle className="w-4 h-4 text-red" /> demo inside
          </span>
        )}
        <a
          href={project.links.repo}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost ml-auto !px-2"
          aria-label={`${project.title} on GitHub`}
          data-testid={`github-${project.id}`}
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  );
};

export const ProjectsGallery: React.FC<{ onOpen: (id: string) => void }> = ({ onOpen }) => (
  <section id="work" className="relative py-24 md:py-32">
    <div className="max-w-page mx-auto px-5 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="label-mono text-red mb-3">01 — Selected work</p>
          <h2 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] tracking-tight">
            The blueprint wall.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink2 leading-relaxed">
          Seven systems, each pinned with its own schematic. Every number is lifted from a real benchmark artifact —
          click any figure to read its source.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-x-10 md:gap-y-14">
        {PROJECTS.map((p, i) => (
          <Card key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  </section>
);
