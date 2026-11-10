import React from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS, RoleLensKey, LENS_RESUME_MAP, ProjectDefinition } from '../../data/projects';
import { 
  GitBranch, ExternalLink, Play, ArrowRight, Download, 
  Terminal, ShieldCheck, Sun, Moon, Bike, BookOpen, Bug, CheckCircle2 
} from 'lucide-react';

export const BlueprintView: React.FC = () => {
  const { 
    setMode, activeLens, setLens, openModal, 
    isDarkMode, toggleDarkMode, showFlyPet, toggleFlyPet 
  } = usePortfolioStore();

  const currentLensKey: RoleLensKey = activeLens === 'general' ? 'aiml' : activeLens;
  const sortedProjects = [...PROJECTS].sort((a, b) => a.lensRank[currentLensKey] - b.lensRank[currentLensKey]);
  const activeResume = LENS_RESUME_MAP[activeLens];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f141c] text-[#1e1e1e] dark:text-[#f1f5f9] engineering-grid">
      {/* Top Architectural Header */}
      <header className="border-b border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFlyPet}
              title="Click for Fly_pet Easter Egg"
              className="w-8 h-8 rounded bg-slate-900 dark:bg-white text-white dark:text-black font-mono font-bold flex items-center justify-center sketch-border text-sm hover:scale-105 transition-transform"
            >
              AY
            </button>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight">Amriteshkumar Yadav</h1>
              <p className="text-xs text-slate-500 font-mono">B.Tech CSE (AI/ML Specialization), SRM Institute &bull; Graduated Jul 2026</p>
            </div>
          </div>

          {/* Social Links & Mode Switchers */}
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <a
              href="https://github.com/Amrit-04"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-2.5 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/amriteshkumar-yadav-214594250/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-2.5 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:amriteshyadav2004@gmail.com"
              className="p-1.5 px-2.5 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Email
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-1.5 px-2 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => setMode('rider')}
              className="p-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white sketch-border-accent flex items-center gap-1.5 font-bold animate-bounce sm:animate-none"
            >
              <Bike className="w-4 h-4" />
              <span>Try Rider Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Narrative Section */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="p-6 bg-white dark:bg-slate-900 sketch-border space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                AI/ML Systems &bull; Backend Engineering &bull; Distributed Systems &bull; Quantitative Computing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Architectural Blueprint & Verified Systems Portfolio
              </h2>
            </div>
            <a
              href={`/resumes/${activeResume.filename}`}
              download={activeResume.filename}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black sketch-border font-mono text-xs font-bold flex items-center gap-2 hover:opacity-90"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume ({activeLens.toUpperCase()})</span>
            </a>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            I engineer high-throughput event-driven systems, learned query cost models, and reliable LLM guardrail pipelines. Every numeric metric, benchmark run, and performance claim across these projects has been empirically evaluated, verified against repository artifacts, and honestly contextualized.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Open to Roles:</span> Software Engineer / AI-ML Systems Engineer (Remote / Worldwide / India)
            </div>
            <div>&bull;</div>
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Publication:</span> IEEE RMKMATE 2026 (IEEE Xplore: 11518869)
            </div>
          </div>
        </section>

        {/* Role Lens Filter Bar */}
        <section className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono font-bold text-slate-500 mr-2">ROLE LENS:</span>
          {(['general', 'aiml', 'ds', 'fintech', 'sde'] as const).map(lens => (
            <button
              key={lens}
              onClick={() => setLens(lens)}
              className={`px-3 py-1.5 text-xs font-mono rounded sketch-border transition-all ${
                activeLens === lens
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lens === 'general' ? 'General Full-Stack' : lens.toUpperCase()}
            </button>
          ))}
        </section>

        {/* Featured Projects Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg tracking-tight">Featured Engineering Systems</h3>
            <span className="text-xs font-mono text-slate-500">{sortedProjects.length} Verified Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProjects.map(project => (
              <ProjectCard key={project.id} project={project} onOpenModal={() => openModal(project.id)} />
            ))}
          </div>
        </section>

        {/* Deep Dive Engineering Case Studies */}
        <section className="space-y-6 pt-6">
          <h3 className="font-bold text-xl tracking-tight border-b border-slate-300 dark:border-slate-800 pb-3">
            In-Depth Engineering Decisions & Technical Tradeoffs
          </h3>

          <div className="space-y-8">
            {sortedProjects.map(project => (
              <ProjectDeepDive key={project.id} project={project} onOpenModal={() => openModal(project.id)} />
            ))}
          </div>
        </section>

        {/* IEEE Publication Card */}
        <section className="p-6 bg-white dark:bg-slate-900 sketch-border space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-base">Peer-Reviewed Conference Publication</h4>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
            "Workplace Safety Using Computer Vision: A Framework for Personal Protective Equipment Detection and Intrusion Monitoring"
          </p>
          <div className="text-xs font-mono text-slate-500">
            Published in <em>2026 International Conference on Research Methodologies in Knowledge Management, Artificial Intelligence and Telecommunication Engineering (RMKMATE)</em>
          </div>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono">
            <a
              href="https://ieeexplore.ieee.org/document/11518869"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-bold flex items-center gap-1"
            >
              <span>IEEE Xplore Record: 11518869</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-400">&bull;</span>
            <a
              href="https://github.com/Amrit-04/workplace-safety-vision"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:underline flex items-center gap-1"
            >
              <span>Repository Implementation</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Fly_pet Easter Egg Modal */}
        {showFlyPet && (
          <div className="fixed bottom-6 right-6 z-50 p-4 bg-white dark:bg-slate-900 sketch-border max-w-xs shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2 mb-2 font-mono text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-emerald-600" />
                <span>Fly_pet (FlyWire LIF Circuit)</span>
              </span>
              <button onClick={toggleFlyPet} className="text-slate-400 hover:text-black dark:hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Biologically inspired Drosophila desktop pet powered by Leaky Integrate-and-Fire neurons simulating hunger, sensory input, and locomotion.
            </p>
            <div className="mt-3">
              <a
                href="https://github.com/Amrit-04/Fly_pet"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-1.5 bg-emerald-600 text-white rounded text-xs font-mono font-bold sketch-border"
              >
                Inspect Drosophila Circuit
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-300 dark:border-slate-800 py-8 px-4 text-center font-mono text-xs text-slate-500 bg-white/50 dark:bg-slate-900/50">
        <div>Amriteshkumar Yadav &bull; Verified Portfolio & Engineering Blueprint</div>
        <div className="mt-1 text-[11px] text-slate-400">
          All metrics sourced from empirical repository test suites and benchmark JSONs. Built with Vite, React 18, TypeScript, Tailwind CSS, and ONNX Runtime Web.
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const ProjectCard: React.FC<{ project: ProjectDefinition; onOpenModal: () => void }> = ({ project, onOpenModal }) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 sketch-border flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded ${
            project.tier === 'A'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : project.tier === 'B'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
          }`}>
            TIER {project.tier}: {project.tierLabel}
          </span>
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-black dark:hover:text-white"
            title="View GitHub Repository"
          >
            <GitBranch className="w-4 h-4" />
          </a>
        </div>

        <h4 className="font-bold text-base tracking-tight">{project.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 5).map(s => (
            <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono rounded">
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400">+{project.stack.length - 5}</span>
          )}
        </div>
      </div>

      {/* Metrics Highlights */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
        {project.metrics.slice(0, 2).map((m, idx) => (
          <div key={idx} className="flex justify-between items-baseline text-xs font-mono">
            <span className="text-slate-500 truncate mr-2">{m.label}:</span>
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-900 dark:text-slate-100 hover:underline shrink-0 flex items-center gap-1"
              title="Click to view benchmark source file"
            >
              <span>{m.value}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={onOpenModal}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs font-bold rounded sketch-border flex items-center justify-center gap-2"
        >
          {project.tier === 'A' ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Terminal className="w-3.5 h-3.5 text-blue-600" />}
          <span>{project.tier === 'A' ? 'Launch Live Browser Demo' : project.tier === 'B' ? 'Replay Real Telemetry' : 'Inspect Case Study'}</span>
        </button>
      </div>
    </div>
  );
};

const ProjectDeepDive: React.FC<{ project: ProjectDefinition; onOpenModal: () => void }> = ({ project, onOpenModal }) => {
  return (
    <article className="p-6 bg-white dark:bg-slate-900 sketch-border space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">System Case Study &bull; {project.id}</span>
          <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mt-0.5">{project.title}</h4>
        </div>
        <button
          onClick={onOpenModal}
          className="px-3 py-1.5 bg-emerald-600 text-white font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Launch Modal Demo</span>
        </button>
      </div>

      {/* Problem & Built */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
        <div className="space-y-2">
          <span className="font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider block">The Problem</span>
          <p className="text-slate-600 dark:text-slate-400">{project.problem}</p>
        </div>
        <div className="space-y-2">
          <span className="font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider block">What Was Built</span>
          <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
            {project.built.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Engineering Decisions & Tradeoffs */}
      <div className="space-y-3 pt-2">
        <span className="font-bold font-mono text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
          Key Engineering Decisions & Tradeoffs
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.decisions.map((d, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 sketch-border text-xs space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 font-mono">{d.decision}</div>
              <div className="text-slate-600 dark:text-slate-300"><strong>Rationale:</strong> {d.rationale}</div>
              <div className="text-slate-500 text-[11px]"><strong>Tradeoff:</strong> {d.tradeoff}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Limitations */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs sketch-border space-y-1 font-mono">
        <div className="font-bold uppercase text-[10px]">Honest Limitations & Edge Cases:</div>
        <ul className="space-y-1 list-disc list-inside">
          {project.limitations.map((lim, i) => (
            <li key={i}>{lim}</li>
          ))}
        </ul>
      </div>

      {/* Verified Metrics Matrix */}
      <div className="pt-2">
        <span className="font-bold font-mono text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
          Verified Performance Metrics (Cited to Source)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 sketch-border flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">{m.label}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">{m.value}</span>
                {m.benchmarkContext && <span className="text-[10px] text-slate-500 block mt-0.5">{m.benchmarkContext}</span>}
              </div>
              <a
                href={m.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-emerald-600 hover:underline mt-2 flex items-center gap-1 font-bold"
              >
                <span>View Source</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
