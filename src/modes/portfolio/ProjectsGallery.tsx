import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import {
  TreeEaselArt,
  ControlConsoleArt,
  PneumaticPipelineArt,
  TradingDeskArt,
  ResearchLedgerArt,
  IsometricWarehouseArt,
  IndustrialVisionArt,
} from '../../components/illustrations';
import { NotebookPen, ExternalLink, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

interface GalleryProps {
  onOpen?: (id: string) => void;
  onOpenProject?: (id: string) => void;
}

export const ProjectsGallery: React.FC<GalleryProps> = ({ onOpen, onOpenProject }) => {
  const handleOpen = onOpenProject || onOpen || (() => {});
  const pNeural = PROJECTS[0]; // neural-query-optimizer
  const pLrcp = PROJECTS[1]; // llm-reliability-control-plane
  const pPipeline = PROJECTS[2]; // fault-tolerant-ml-telemetry
  const pTrade = PROJECTS[3]; // tradeflow
  const pMoneyball = PROJECTS[4]; // moneyball
  const pWarehouse = PROJECTS[5]; // warehouse-routing-engine
  const pSafety = PROJECTS[6]; // workplace-safety-vision

  return (
    <section className="py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto" id="work">
      {/* Editorial Exhibition Wall Header */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper2/90 border border-ink3/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5 inline" />
            The Illustrated Exhibition Wall
          </span>
          <span className="annotation text-ink3 text-base hidden sm:inline rotate-[-1.5deg]">
            7 individual architectural installations
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight">
          Physical Works &amp; Engineering Folios
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink2 font-sans leading-relaxed">
          Not conventional project cards. Every exhibit below is an individually illustrated physical installation
          housing measured benchmarks, verified source code, and a runnable in-browser sandbox.
        </p>
      </div>

      <div className="space-y-24">
        {/* ========================================================================= */}
        {/* EXHIBIT 01: NEURAL QUERY OPTIMIZER (The Grand Drafting Easel) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pNeural.id}`}
        >
          {/* Architectural installation header badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 01 · DRAFTING EASEL
              </span>
              <span className="font-serif text-sm italic text-ink2">Living Query Tree Blueprint</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">TPC-H Q10 (2.17x Speedup)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Massive Drafting Easel Illustration taking center stage */}
            <div className="lg:col-span-7">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <TreeEaselArt className="w-full h-auto text-ink" />
              </div>
            </div>

            {/* Right Column: Architectural Dossier & Verified Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="sticker text-xs text-blue bg-paper border border-blue/40 mb-2 inline-block">
                  Graph Neural Networks · PostgreSQL 16
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pNeural.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pNeural.problem}
                </p>

                {/* Hand-drawn verified metric highlights */}
                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>PlanGCN Top-1 Accuracy:</span>
                    <strong className="text-accent">38.9% (+9.7 pp vs GBDT)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Rank Correlation:</span>
                    <strong className="text-blue">Spearman ρ = 0.74</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>ONNX CPU Inference:</span>
                    <strong>0.21 ms p95 (0.44 ms E2E)</strong>
                  </div>
                </div>

                {/* Technology chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pNeural.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pNeural.id)}
                  data-testid={`open-notebook-${pNeural.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Inspect Blueprint &amp; Run ONNX GNN</span>
                </button>
                <a
                  href={pNeural.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 02: LLM RELIABILITY CONTROL PLANE (The Observability Console) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#221f1d] text-paper border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-xl"
          data-testid={`project-card-${pLrcp.id}`}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-paper3/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-accent text-paper rounded-xs">
                EXHIBIT 02 · OBSERVABILITY RACK
              </span>
              <span className="font-serif text-sm italic text-paper3">19-Inch Telemetry Console &amp; WAL Drum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-gold">54 Passing Pytest Suites</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Dossier Information & Metrics */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between">
              <div>
                <span className="sticker text-xs text-gold bg-ink/60 border border-gold/40 mb-2 inline-block">
                  C++20 &amp; Python OTLP · DuckDB · Redis
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-paper leading-tight">
                  {pLrcp.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-paper2/90 font-sans leading-relaxed">
                  {pLrcp.problem}
                </p>

                {/* Control room verified gauges */}
                <div className="mt-5 p-4 bg-ink/80 rounded-xl border border-paper3/20 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-paper2">
                    <span>WAL Segment Rotation:</span>
                    <strong className="text-gold">64 MB · CRC-32 Checksummed</strong>
                  </div>
                  <div className="flex justify-between items-center text-paper2">
                    <span>Compaction Throughput:</span>
                    <strong className="text-blue">50,000 spans/sec Zstd Parquet</strong>
                  </div>
                  <div className="flex justify-between items-center text-paper2">
                    <span>Analytical Queries:</span>
                    <strong className="text-accent">&lt;100 ms p99 (DuckDB)</strong>
                  </div>
                  <div className="flex justify-between items-center text-paper2">
                    <span>Circuit Breaker Fallback:</span>
                    <strong>30s Automatic Trip Window</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pLrcp.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-ink border border-paper3/20 text-paper3">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-paper3/20">
                <button
                  className="btn-red flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pLrcp.id)}
                  data-testid={`open-notebook-${pLrcp.id}`}
                >
                  <Terminal className="w-4 h-4 text-gold" />
                  <span>Launch Trace Explorer &amp; Waterfall</span>
                </button>
                <a
                  href={pLrcp.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline !text-paper !border-paper3/40 hover:!bg-paper/10 text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>

            {/* Right Column: Console Art */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative p-2 bg-ink/90 rounded-xl border border-paper3/20 shadow-inner">
                <ControlConsoleArt className="w-full h-auto text-paper" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 03: TELEMETRY STREAMING PIPELINE (Pneumatic Sorter & DLQ) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pPipeline.id}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 03 · PNEUMATIC MANIFOLD
              </span>
              <span className="font-serif text-sm italic text-ink2">12 Kafka Partitions &amp; DLQ Quarantine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">Zero Loss Across 900K+ Chaos Events</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <PneumaticPipelineArt className="w-full h-auto text-ink" />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="sticker text-xs text-blue bg-paper border border-blue/40 mb-2 inline-block">
                  Go · Kafka KRaft · PostgreSQL 16 · Redis
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pPipeline.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pPipeline.problem}
                </p>

                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>Go HTTP Ingestion:</span>
                    <strong className="text-blue">288 RPS · 5.37 ms p99</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Sustained Stream Rate:</span>
                    <strong className="text-accent">7,117 events/sec (7,892 peak)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Dead Letter Quarantine:</span>
                    <strong>44,493 malformed isolated (100%)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Consumer Tuning Matrix:</span>
                    <strong>27 sweep configurations tested</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pPipeline.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pPipeline.id)}
                  data-testid={`open-notebook-${pPipeline.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Open 310s Kafka Replay Scrubber</span>
                </button>
                <a
                  href={pPipeline.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 04: TRADEFLOW OMS & RISK ENGINE (Mechanical Trading Desk) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pTrade.id}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 04 · EXCHANGE TRADING DESK
              </span>
              <span className="font-serif text-sm italic text-ink2">Split-Flap FSM &amp; Ticker Tape Dispenser</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">113 ns OMS · 311 ns Risk Lua</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <span className="sticker text-xs text-accent bg-paper border border-accent/40 mb-2 inline-block">
                  Go · FIX 4.2 · Redis Lua · PostgreSQL Outbox
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pTrade.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pTrade.problem}
                </p>

                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>FSM State Machine:</span>
                    <strong className="text-accent">113 ns/op deterministic</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Pre-Trade Risk Checks:</span>
                    <strong className="text-blue">311 ns/op (7 integer rules)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>End-to-End Latency:</span>
                    <strong>14.38 ms median (17.99 ms p99)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Property-Based Testing:</span>
                    <strong>1,000 rapid randomized tests</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pTrade.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pTrade.id)}
                  data-testid={`open-notebook-${pTrade.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Operate FIX 4.2 State Machine</span>
                </button>
                <a
                  href={pTrade.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <TradingDeskArt className="w-full h-auto text-ink" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 05: MONEYBALL (Senior Researcher's Open Field Ledger) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pMoneyball.id}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 05 · OPEN FIELD LEDGER
              </span>
              <span className="font-serif text-sm italic text-ink2">Merton Jump Curves &amp; 14-Qubit QAOA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">CUDA 1M Paths: 29.26 ms (42.9x)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <ResearchLedgerArt className="w-full h-auto text-ink" />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="sticker text-xs text-blue bg-paper border border-blue/40 mb-2 inline-block">
                  PyTorch CUDA · HMM · Qiskit QAOA · CVXPY
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pMoneyball.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pMoneyball.problem}
                </p>

                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>Purged Walk-Forward:</span>
                    <strong className="text-blue">Rank IC 0.0359 · ICIR 1.521</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Gaussian 3-State HMM:</span>
                    <strong className="text-accent">Drawdown 13.58% → 8.59% (Sharpe 2.02)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>14-Qubit QAOA / QUBO:</span>
                    <strong>95.49% approximation ratio</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Simulated Asset Universe:</span>
                    <strong>24 assets · 1,260 trading days</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pMoneyball.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pMoneyball.id)}
                  data-testid={`open-notebook-${pMoneyball.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Run Seeded Jump-Diffusion Sandbox</span>
                </button>
                <a
                  href={pMoneyball.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 06: WAREHOUSE ROUTING ENGINE (Architectural Isometric Table) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pWarehouse.id}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 06 · ISOMETRIC SURVEY TABLE
              </span>
              <span className="font-serif text-sm italic text-ink2">3D Shelving &amp; Open-Path Tour</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">Held-Karp 56.5x · A* 31x</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <span className="sticker text-xs text-blue bg-paper border border-blue/40 mb-2 inline-block">
                  C++17 · pybind11 · FastAPI · Redis O(1)
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pWarehouse.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pWarehouse.problem}
                </p>

                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>C++17 A* Pathfinding:</span>
                    <strong className="text-accent">0.50 ms (31x speedup vs Python)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Held-Karp / 2-Opt TSP:</span>
                    <strong className="text-blue">1.30 ms (56.5x speedup)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>FastAPI &amp; Redis Cache:</span>
                    <strong>144 RPS (-43.8% p50 latency)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Open-Path Guarantee:</span>
                    <strong>Fixed Dock [1,1] → Checkout [14,10]</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pWarehouse.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pWarehouse.id)}
                  data-testid={`open-notebook-${pWarehouse.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Solve Real-Time Routing Tour</span>
                </button>
                <a
                  href={pWarehouse.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <IsometricWarehouseArt className="w-full h-auto text-ink" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EXHIBIT 07: WORKPLACE SAFETY VISION (Surveillance Observation Bay) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-paper2/60 border-2 border-ink rounded-2xl p-6 sm:p-10 shadow-lg"
          data-testid={`project-card-${pSafety.id}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-paper rounded-xs">
                EXHIBIT 07 · SURVEILLANCE BAY
              </span>
              <span className="font-serif text-sm italic text-ink2">PTZ Optical Cones &amp; Hazard Geofencing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">IEEE RMKMATE 2026 (Xplore: 11518869)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative p-2 bg-paper rounded-xl border border-ink3/30 shadow-inner">
                <IndustrialVisionArt className="w-full h-auto text-ink" />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="sticker text-xs text-accent bg-paper border border-accent/40 mb-2 inline-block">
                  Python · Ultralytics YOLOv11 · OpenCV · ByteTrack
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {pSafety.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink2 font-sans leading-relaxed">
                  {pSafety.problem}
                </p>

                <div className="mt-5 p-4 bg-paper rounded-xl border border-ink3/30 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-ink">
                    <span>Peer-Reviewed Publication:</span>
                    <strong className="text-blue">IEEE RMKMATE 2026</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Dual-Model Architecture:</span>
                    <strong className="text-accent">best.pt (PPE) + yolo11n.pt (Person)</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Multi-Class Compliance:</span>
                    <strong>Hardhat, Mask, Vest, Cone, Machinery</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>Temporal Tracking:</span>
                    <strong>SimpleTracker centroid correlation</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pSafety.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-paper border border-ink3/30 text-ink2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
                <button
                  className="btn-ink flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpen(pSafety.id)}
                  data-testid={`open-notebook-${pSafety.id}`}
                >
                  <NotebookPen className="w-4 h-4 text-gold" />
                  <span>Test Hazard Geofencing Canvas</span>
                </button>
                <a
                  href="https://ieeexplore.ieee.org/document/11518869"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs flex items-center gap-1.5 text-blue"
                >
                  <BookOpen className="w-3.5 h-3.5" /> IEEE Xplore
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
