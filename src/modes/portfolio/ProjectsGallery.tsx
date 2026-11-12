import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import {
  DiagramNeural,
  DiagramControl,
  DiagramTrade,
  DiagramWarehouse,
  DiagramQuant,
  DiagramPipeline,
  DiagramSafety,
} from '../../components/illustrations';
import { NotebookPen, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

interface GalleryProps {
  onOpen?: (id: string) => void;
  onOpenProject?: (id: string) => void;
}

export const ProjectsGallery: React.FC<GalleryProps> = ({ onOpen, onOpenProject }) => {
  const handleOpen = onOpenProject || onOpen || (() => {});
  const pNeural = PROJECTS[0]; // neural-query-optimizer
  const pLrcp = PROJECTS[1]; // lrcp
  const pPipeline = PROJECTS[2]; // fault-tolerant-telemetry-pipeline
  const pTrade = PROJECTS[3]; // tradeflow
  const pMoneyball = PROJECTS[4]; // moneyball
  const pWarehouse = PROJECTS[5]; // warehouse-spatial-routing
  const pSafety = PROJECTS[6]; // edge-workplace-safety

  return (
    <section className="py-20 px-5 md:px-10 max-w-7xl mx-auto" id="work">
      {/* Editorial Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper2/90 border border-ink3/40">
            <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5 inline" />
            Selected Systems &amp; Research Portfolio
          </span>
          <span className="annotation text-ink3 text-base hidden sm:inline rotate-[-1.5deg]">
            all 7 systems include interactive browser sandboxes
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl font-normal text-ink tracking-tight">
          Illustrated Works &amp; Architecture Studies
        </h2>
        <p className="mt-3 text-base text-ink2 max-w-2xl font-sans leading-relaxed">
          Each exhibit represents a substantial engineering system: measured benchmarks, verified source code,
          documented tradeoffs, and a runnable client-side simulation.
        </p>
      </div>

      {/* Handcrafted Exhibition Wall Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            EXHIBIT 01: NEURAL QUERY OPTIMIZER (Panoramic Drafting Plate)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-12 relative p-6 md:p-10 rounded-3xl border-2 border-ink3/30 bg-paper shadow-sm hover:shadow-md transition-shadow overflow-hidden rotate-[-0.3deg]"
          data-testid={`project-card-${pNeural.id}`}
        >
          {/* Top tape doodle */}
          <div className="absolute top-0 left-12 w-28 h-4 bg-paper3/80 -translate-y-1.5 rotate-[-2deg] border-x border-ink3/30 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                Exhibit No. 01 · Feature Architectural Study
              </span>
            </div>
            <span className="sticker text-xs font-mono">{pNeural.tierLabel}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <button
                onClick={() => handleOpen(pNeural.id)}
                className="text-left group cursor-pointer"
                data-testid={`open-notebook-${pNeural.id}`}
              >
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                  {pNeural.title}
                </h3>
                <p className="mt-2 text-base text-ink2 font-sans leading-relaxed">
                  {pNeural.tagline}
                </p>
              </button>

              <div className="border-l-2 border-accent pl-4 py-1 space-y-1">
                <p className="font-serif text-lg text-ink font-medium">
                  &ldquo;Can graph neural networks beat PostgreSQL&apos;s native cost-based optimizer?&rdquo;
                </p>
                <p className="font-sans text-xs text-ink3">
                  184 real execution plans · PlanGCN GNN architecture · ONNX Runtime WebAssembly
                </p>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {pNeural.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20">
                    <p className="font-mono text-xs font-bold text-ink">{m.value}</p>
                    <p className="font-sans text-[11px] text-ink2 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pNeural.stack.map((s) => (
                  <span key={s} className="chip bg-paper3/60 font-mono text-[11px]">
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  className="btn-ink flex items-center gap-2"
                  onClick={() => handleOpen(pNeural.id)}
                >
                  <NotebookPen className="w-4 h-4 text-accent" />
                  <span>Open Notebook &amp; Demo</span>
                </button>
                <a
                  href={pNeural.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline flex items-center gap-1.5 font-sans text-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

            {/* Right Large Illustration Frame */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl border border-ink3/30 bg-paper2/60 p-4 shadow-inner">
                <DiagramNeural className="w-full h-auto text-ink drop-shadow-xs" />
              </div>
              <p className="annotation text-center text-ink3 text-base mt-2 rotate-[-1deg]">
                plan operator AST · GNN cost prediction · PostgreSQL 16 EXPLAIN
              </p>
            </div>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 02: LRCP (Tall Vertical Dossier / Field Notebook)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="lg:col-span-5 relative p-6 md:p-8 rounded-3xl border border-ink3/30 bg-paper2/95 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[0.6deg]"
          data-testid={`project-card-${pLrcp.id}`}
        >
          {/* Top pin sticker */}
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-accent2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent2" />
              Exhibit No. 02 · Dossier
            </span>
            <span className="sticker text-[11px] font-mono border-accent2/40 text-accent2">
              OTLP GATEWAY
            </span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pLrcp.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pLrcp.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pLrcp.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pLrcp.tagline}
              </p>
            </button>

            {/* Illustrated Artwork Frame */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper p-3 overflow-hidden shadow-xs">
              <DiagramControl className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <div className="space-y-2 mb-4">
              <p className="font-sans text-xs text-ink3 leading-relaxed">
                High-throughput telemetry gateway with CRC-32 write-ahead log, zstd parquet compactor, and circuit breaker fallbacks.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pLrcp.stack.slice(0, 5).map((s) => (
                  <span key={s} className="chip bg-paper font-mono text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex items-center justify-between gap-3">
            <span className="annotation text-ink3 text-base">54 automated tests · zero span loss</span>
            <button
              onClick={() => handleOpen(pLrcp.id)}
              className="btn-outline !py-1.5 !px-3 font-sans text-xs flex items-center gap-1"
            >
              <span>Explore</span>
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 03: TELEMETRY STREAMING PIPELINE (Factory Conveyor Canvas)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="lg:col-span-7 relative p-6 md:p-8 rounded-3xl border border-ink3/30 bg-paper shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[-0.5deg]"
          data-testid={`project-card-${pPipeline.id}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Exhibit No. 03 · Stream Infrastructure
            </span>
            <span className="sticker text-[11px] font-mono border-accent/40 text-accent">
              2.2M+ EVENTS REPLAY
            </span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pPipeline.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pPipeline.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pPipeline.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pPipeline.tagline}
              </p>
            </button>

            {/* Illustration */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper2/50 p-3 overflow-hidden shadow-xs">
              <DiagramPipeline className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <div className="grid sm:grid-cols-3 gap-2.5 mb-4">
              <div className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20 font-mono text-xs">
                <p className="text-ink3 text-[10px]">SUSTAINED RATE</p>
                <p className="font-bold text-ink mt-0.5">7,117 eps</p>
              </div>
              <div className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20 font-mono text-xs">
                <p className="text-ink3 text-[10px]">CHAOS LOAD</p>
                <p className="font-bold text-ink mt-0.5">8,000 eps</p>
              </div>
              <div className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20 font-mono text-xs">
                <p className="text-ink3 text-[10px]">INTEGRITY RECON</p>
                <p className="font-bold text-blue mt-0.5">0 Loss / 0 Dup</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {pPipeline.stack.map((s) => (
                <span key={s} className="chip bg-paper3/60 font-mono text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex items-center justify-between gap-3">
            <span className="annotation text-ink3 text-base">honest failure modes documented</span>
            <button
              onClick={() => handleOpen(pPipeline.id)}
              className="btn-ink !py-1.5 !px-3 font-sans text-xs flex items-center gap-1.5"
            >
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
              <span>Inspect Run</span>
            </button>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 04: TRADEFLOW OMS (Trading Desk Dispatch Slip)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="lg:col-span-6 relative p-6 md:p-8 rounded-3xl border border-ink3/30 bg-paper shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[0.4deg]"
          data-testid={`project-card-${pTrade.id}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Exhibit No. 04 · High-Throughput Trading
            </span>
            <span className="sticker text-[11px] font-mono border-accent/40 text-accent">
              113 ns OMS · 311 ns RISK
            </span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pTrade.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pTrade.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pTrade.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pTrade.tagline}
              </p>
            </button>

            {/* Illustration */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper2/50 p-3 overflow-hidden shadow-xs">
              <DiagramTrade className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <p className="font-sans text-xs text-ink3 leading-relaxed mb-4">
              Deterministic order state machine paired with Redis Lua script pre-trade risk checks across 7 risk rules. Zero event loss across 2,057 FIX orders.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {pTrade.stack.map((s) => (
                <span key={s} className="chip bg-paper3/60 font-mono text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex items-center justify-between gap-3">
            <span className="annotation text-ink3 text-base">transactional outbox pattern</span>
            <button
              onClick={() => handleOpen(pTrade.id)}
              className="btn-outline !py-1.5 !px-3 font-sans text-xs flex items-center gap-1"
            >
              <span>View Notebook</span>
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 05: MONEYBALL (Quantitative Researcher's Open Ledger)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="lg:col-span-6 relative p-6 md:p-8 rounded-3xl border border-ink3/30 bg-paper shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[-0.6deg]"
          data-testid={`project-card-${pMoneyball.id}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-accent2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent2" />
              Exhibit No. 05 · Quantitative Research
            </span>
            <span className="sticker text-[11px] font-mono border-accent2/40 text-accent2">
              CUDA 1M PATHS IN 29.26 MS
            </span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pMoneyball.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pMoneyball.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pMoneyball.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pMoneyball.tagline}
              </p>
            </button>

            {/* Illustration */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper2/50 p-3 overflow-hidden shadow-xs">
              <DiagramQuant className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-4 font-mono text-xs">
              <div className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20">
                <p className="text-ink3 text-[10px]">WALK-FORWARD RANK IC</p>
                <p className="font-bold text-ink mt-0.5">0.0359 (ICIR 1.521)</p>
              </div>
              <div className="bg-paper2/70 p-2.5 rounded-xl border border-ink3/20">
                <p className="text-ink3 text-[10px]">QAOA CARDINALITY</p>
                <p className="font-bold text-ink mt-0.5">95.49% approx (p=2)</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {pMoneyball.stack.map((s) => (
                <span key={s} className="chip bg-paper3/60 font-mono text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex items-center justify-between gap-3">
            <span className="annotation text-ink3 text-base">purged &amp; embargoed cross-validation</span>
            <button
              onClick={() => handleOpen(pMoneyball.id)}
              className="btn-outline !py-1.5 !px-3 font-sans text-xs flex items-center gap-1"
            >
              <span>View Notebook</span>
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 06: WAREHOUSE ROUTING (Architectural Blueprint Floorplan)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="lg:col-span-5 relative p-6 md:p-8 rounded-3xl border border-ink3/30 bg-paper2/95 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[0.5deg]"
          data-testid={`project-card-${pWarehouse.id}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue" />
              Exhibit No. 06 · Spatial Optimization
            </span>
            <span className="sticker text-[11px] font-mono">C++17 NATIVE EXTENSION</span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pWarehouse.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pWarehouse.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pWarehouse.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pWarehouse.tagline}
              </p>
            </button>

            {/* Illustration */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper p-3 overflow-hidden shadow-xs">
              <DiagramWarehouse className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <p className="font-sans text-xs text-ink3 leading-relaxed mb-4">
              Obstacle-aware A* pathfinding coupled with exact Held-Karp dynamic programming (56.5× native speedup) and 2-opt local search.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {pWarehouse.stack.map((s) => (
                <span key={s} className="chip bg-paper font-mono text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex items-center justify-between gap-3">
            <span className="annotation text-ink3 text-base">31x A* speedup vs Python</span>
            <button
              onClick={() => handleOpen(pWarehouse.id)}
              className="btn-outline !py-1.5 !px-3 font-sans text-xs flex items-center gap-1"
            >
              <span>Explore Engine</span>
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </motion.article>

        {/* =========================================================================
            EXHIBIT 07: WORKPLACE SAFETY (Exhibition Masterpiece Centerpiece)
            ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-7 relative p-6 md:p-8 rounded-3xl border-2 border-accent/40 bg-paper shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rotate-[-0.2deg]"
          data-testid={`project-card-${pSafety.id}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Exhibit No. 07 · Peer-Reviewed Research
            </span>
            <span className="sticker text-[11px] font-mono border-accent text-accent">
              IEEE XPLORE PUBLICATION
            </span>
          </div>

          <div>
            <button
              onClick={() => handleOpen(pSafety.id)}
              className="text-left group cursor-pointer w-full"
              data-testid={`open-notebook-${pSafety.id}`}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                {pSafety.title}
              </h3>
              <p className="mt-2 text-sm text-ink2 font-sans leading-relaxed">
                {pSafety.tagline}
              </p>
            </button>

            {/* Illustration */}
            <div className="my-5 rounded-2xl border border-ink3/20 bg-paper2/50 p-3 overflow-hidden shadow-xs">
              <DiagramSafety className="w-full h-44 text-ink drop-shadow-xs" />
            </div>

            <p className="font-sans text-xs text-ink3 leading-relaxed mb-4">
              Dual YOLO spatial-temporal edge vision architecture for PPE non-compliance and dynamic geofencing intrusion detection.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {pSafety.stack.map((s) => (
                <span key={s} className="chip bg-paper3/60 font-mono text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ink3/20 flex flex-wrap items-center justify-between gap-3">
            <a
              href="https://ieeexplore.ieee.org/document/11518869"
              target="_blank"
              rel="noreferrer"
              className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-accent" />
              <span>IEEE Xplore Paper</span>
              <ExternalLink className="w-3 h-3 text-ink3" />
            </a>
            <button
              onClick={() => handleOpen(pSafety.id)}
              className="btn-ink !py-1.5 !px-3 font-sans text-xs flex items-center gap-1.5"
            >
              <NotebookPen className="w-3.5 h-3.5 text-accent" />
              <span>Open Notebook &amp; Sandbox</span>
            </button>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
