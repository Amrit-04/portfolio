import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS, RoleLensKey, LENS_RESUME_MAP, ProjectDefinition } from '../../data/projects';
import { getAssetUrl } from '../../lib/assets';
import { soundEffects } from '../../lib/soundEffects';
import { WorkstationHeroSvg } from '../Illustrations/WorkstationHeroSvg';
import {
  NeuralQueryDrawing,
  ControlPlaneDrawing,
  TradeflowDrawing,
  WarehouseDrawing,
  MoneyballDrawing,
  TelemetryPipelineDrawing,
  WorkplaceSafetyDrawing
} from '../Illustrations/ProjectDrawings';
import { 
  GitBranch, ExternalLink, Play, ArrowRight, Download, 
  Terminal, ShieldCheck, Sun, Moon, Bike, BookOpen, Bug, CheckCircle2,
  Volume2, VolumeX, Sparkles, Layers, Cpu, Database, Activity, FileText, Send
} from 'lucide-react';

export const BlueprintView: React.FC = () => {
  const { 
    setMode, activeLens, setLens, openModal, 
    isDarkMode, toggleDarkMode, showFlyPet, toggleFlyPet,
    isSoundMuted, toggleSound, setTargetRideSector
  } = usePortfolioStore();

  const [activeFilterStack, setActiveFilterStack] = useState<string | null>(null);

  const currentLensKey: RoleLensKey = activeLens === 'general' ? 'aiml' : activeLens;
  const sortedProjects = [...PROJECTS]
    .filter(p => !activeFilterStack || p.stack.includes(activeFilterStack))
    .sort((a, b) => a.lensRank[currentLensKey] - b.lensRank[currentLensKey]);

  const activeResume = LENS_RESUME_MAP[activeLens];

  const handleModeSwitch = (sectorIndex?: number) => {
    soundEffects.playUiTap(isSoundMuted);
    if (sectorIndex !== undefined) {
      setTargetRideSector(sectorIndex);
    }
    setMode('rider');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0f131a] text-[#11141a] dark:text-[#f3f4f6] engineering-grid selection:bg-emerald-500/30">
      {/* Drafting Ruler Tape Header */}
      <header className="border-b-2 border-slate-900 dark:border-slate-700 bg-[#faf8f5]/90 dark:bg-[#0f131a]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Monogram */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEffects.playUiTap(isSoundMuted);
                toggleFlyPet();
              }}
              title="Click for Fly_pet Drosophila Circuit Easter Egg"
              className="w-9 h-9 rounded bg-slate-900 dark:bg-white text-white dark:text-black font-mono font-bold flex items-center justify-center sketch-border text-sm hover:scale-105 transition-transform"
            >
              AY
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-lg sm:text-xl font-bold tracking-tight leading-tight">
                  Amriteshkumar Yadav
                </h1>
                <span className="stamp-badge text-[9px] px-1.5 py-0.2 hidden sm:inline-block">
                  VERIFIED 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                AI/ML Systems &bull; Distributed Pipelines &bull; Low-Latency Go &bull; C++17
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-4 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">// About</a>
            <a href="#work" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">// Selected Work</a>
            <a href="#skills" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">// Skills</a>
            <a href="#research" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">// Research</a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">// Contact</a>
          </nav>

          {/* Social Links & Controls */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <a
              href="https://github.com/Amrit-04"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-2 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1"
              title="GitHub Profile"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/amriteshkumar-yadav-214594250/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-2 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1"
              title="LinkedIn Profile"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <button
              onClick={() => {
                soundEffects.playUiTap(isSoundMuted);
                toggleSound();
              }}
              className="p-1.5 px-2 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle Sound Effects"
              title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
            <button
              onClick={() => {
                soundEffects.playUiTap(isSoundMuted);
                toggleDarkMode();
              }}
              className="p-1.5 px-2 bg-white dark:bg-slate-800 sketch-border hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>
            {/* The Signature Enter the Track Mode Switcher */}
            <button
              onClick={() => handleModeSwitch()}
              className="p-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white sketch-border-accent flex items-center gap-1.5 font-bold hover:scale-102 transition-transform"
            >
              <Bike className="w-4 h-4" />
              <span className="font-display tracking-tight">Try Rider Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workshop */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        
        {/* SECTION 1: HERO DRAFTING WORKBENCH */}
        <section className="relative p-6 sm:p-10 bg-white dark:bg-slate-900/90 sketch-border space-y-8 overflow-hidden">
          {/* Masking tape decorations on corners */}
          <div className="drafting-tape -top-2 -left-3" />
          <div className="drafting-tape -top-2 -right-3 rotate-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 rounded font-mono text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL WORKSHOP // SRI INSTITUTE GRADUATE (JUL 2026)</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight">
                Engineering high-throughput pipelines, learned query models, and verifiable reliability.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-display">
                I am a systems and applied AI engineer with a B.Tech in CSE (AI/ML) from SRM Institute of Science and Technology. 
                I design low-latency state machines in Go, zero-overhead C++17 spatial pathfinders, and empirical graph neural network cost models.
              </p>

              {/* Creed Callout */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-l-4 border-emerald-600 dark:border-emerald-500 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Strict Empirical Source-of-Truth Standard</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                  All 7 project metrics are verified against repository test suites, benchmarks, and IEEE conference publication records. Zero synthetic numbers.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#work"
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-bold sketch-border flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleModeSwitch(0)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold sketch-border-accent flex items-center gap-2 transition-transform hover:scale-102"
                >
                  <Bike className="w-4 h-4" />
                  <span>Enter The Track (2D Game)</span>
                </button>

                <a
                  href={getAssetUrl(`resumes/${activeResume.filename}`)}
                  download={activeResume.filename}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume ({activeLens.toUpperCase()})</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hand-Drawn Workstation Schematic */}
            <div className="lg:col-span-5 relative">
              <div className="p-2 bg-slate-100/50 dark:bg-slate-800/40 rounded-sm sketch-border">
                <WorkstationHeroSvg />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>PLATE 01: DRAFTING DESK // WORKBENCH SCHEMATIC</span>
                <span className="font-hand text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  * click elements in track to play
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ROLE LENS FILTER BAR & RESUME ROUTER */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 sketch-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>ROLE LENS:</span>
              </span>
              {(['general', 'aiml', 'ds', 'fintech', 'sde'] as const).map(lens => (
                <button
                  key={lens}
                  onClick={() => {
                    soundEffects.playUiTap(isSoundMuted);
                    setLens(lens);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded sketch-border transition-all ${
                    activeLens === lens
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-black font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {lens === 'general' ? 'General Full-Stack' : lens.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Handwritten callout */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-hand text-sm text-slate-500 dark:text-slate-400 font-bold">
                re-ranks projects &amp; binds targeted resume
              </span>
              <a
                href={getAssetUrl(`resumes/${activeResume.filename}`)}
                download={activeResume.filename}
                className="px-3.5 py-1.5 bg-black dark:bg-white text-white dark:text-black sketch-border font-mono text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {activeResume.label.split(' ')[0]} PDF</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 3: ABOUT / ENGINEERING PHILOSOPHY */}
        <section id="about" className="p-6 sm:p-8 bg-white dark:bg-slate-900 sketch-border space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                01 // ENGINEERING ETHOS
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                The Architect's Notebook
              </h3>
            </div>
            <span className="font-hand text-base text-slate-500 hidden sm:inline">
              Craft, microbenchmarks &amp; rigor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-display">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 sketch-border space-y-2">
              <div className="w-7 h-7 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Low-Latency Systems First</h4>
              <p>
                Whether orchestrating concurrent Go gateways (288 RPS, 24.3 MB RSS), writing integer basis-point pre-trade risk engines (311 ns/op), or C++17 A* pathfinding (0.50 ms), I treat latency percentiles and memory bounds as primary architectural constraints.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 sketch-border space-y-2">
              <div className="w-7 h-7 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Learned Systems &amp; Graphs</h4>
              <p>
                I apply machine learning where traditional heuristics fail: modeling relational database EXPLAIN plan trees with GNNs (GCN, GAT, GraphSAGE) to beat flat GBDT baselines by +9.7 pp, validated under nested leave-one-template-out folds with ONNX single-thread execution.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 sketch-border space-y-2">
              <div className="w-7 h-7 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Empirical Fault Tolerance</h4>
              <p>
                Real distributed systems fail. I engineer write-ahead logs with CRC-32 checksums and fsync before ack, Kafka dead-letter queues isolating 44,493 malformed events, and transactional outbox patterns with zero event loss across 900K+ chaos injection events.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: SELECTED WORK (THE DRAFTING GALLERY) */}
        <section id="work" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-900 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                02 // SELECTED WORK
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold">
                Drafting Plates &amp; Interactive Blueprints
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-sm text-right hidden sm:block">
              Click &quot;Launch In-Browser Demo&quot; to test models, state machines, and pathfinders directly in your browser with zero backend setup.
            </p>
          </div>

          {/* Project Drafting Wall */}
          <div className="space-y-12">
            {sortedProjects.map((project, index) => (
              <ProjectBlueprintPlate
                key={project.id}
                project={project}
                index={index}
                onOpenModal={() => openModal(project.id)}
                onRideToSector={() => handleModeSwitch(index)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 5: TECHNICAL SKILLS TAXONOMY */}
        <section id="skills" className="p-6 sm:p-8 bg-white dark:bg-slate-900 sketch-border space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                03 // TECHNICAL TOOLCHEST
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                Systems &amp; Engineering Taxonomy
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              Languages &bull; Infra &bull; Math &bull; AI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Languages &amp; Runtimes</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="flex justify-between"><span>Go (Golang 1.22+)</span> <span className="text-slate-400">113ns OMS</span></li>
                <li className="flex justify-between"><span>C++ (C++17/20)</span> <span className="text-slate-400">A*, WAL</span></li>
                <li className="flex justify-between"><span>Python 3.11+</span> <span className="text-slate-400">PyTorch/GNN</span></li>
                <li className="flex justify-between"><span>TypeScript / React</span> <span className="text-slate-400">WebAssembly</span></li>
                <li className="flex justify-between"><span>SQL / PLpgSQL</span> <span className="text-slate-400">PostgreSQL 16</span></li>
              </ul>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 uppercase flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>Distributed &amp; Telemetry</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="flex justify-between"><span>Apache Kafka (KRaft)</span> <span className="text-slate-400">12 Partitions</span></li>
                <li className="flex justify-between"><span>OpenTelemetry (OTLP)</span> <span className="text-slate-400">Span hierarchies</span></li>
                <li className="flex justify-between"><span>Redis / Redis Lua</span> <span className="text-slate-400">Atomic 311ns</span></li>
                <li className="flex justify-between"><span>DuckDB</span> <span className="text-slate-400">&lt;100ms analytics</span></li>
                <li className="flex justify-between"><span>Parquet (Zstandard)</span> <span className="text-slate-400">Two-phase compaction</span></li>
              </ul>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border">
              <span className="font-bold text-amber-700 dark:text-amber-400 uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Applied AI/ML &amp; Math</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="flex justify-between"><span>PyG (GCN, GAT, SAGE)</span> <span className="text-slate-400">Plan graphs</span></li>
                <li className="flex justify-between"><span>ONNX Runtime (WASM)</span> <span className="text-slate-400">0.21ms inference</span></li>
                <li className="flex justify-between"><span>Hidden Markov Models</span> <span className="text-slate-400">3-State regime</span></li>
                <li className="flex justify-between"><span>Merton Jump-Diffusion</span> <span className="text-slate-400">CUDA MC VaR</span></li>
                <li className="flex justify-between"><span>Qiskit QAOA / QUBO</span> <span className="text-slate-400">14-Qubit approx</span></li>
              </ul>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border">
              <span className="font-bold text-slate-700 dark:text-slate-400 uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Core Architectures</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="flex justify-between"><span>Transactional Outbox</span> <span className="text-slate-400">Kafka relay</span></li>
                <li className="flex justify-between"><span>Write-Ahead Logging</span> <span className="text-slate-400">CRC-32 checksum</span></li>
                <li className="flex justify-between"><span>Held-Karp TSP + 2-Opt</span> <span className="text-slate-400">56.5x speedup</span></li>
                <li className="flex justify-between"><span>FIX 4.2 Protocol</span> <span className="text-slate-400">State machines</span></li>
                <li className="flex justify-between"><span>Dead-Letter Queues</span> <span className="text-slate-400">44,493 isolated</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: RESEARCH & PEER-REVIEWED PUBLICATIONS */}
        <section id="research" className="p-6 sm:p-8 bg-white dark:bg-slate-900 sketch-border space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                04 // PEER-REVIEWED PUBLICATION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                Conference Research &amp; Citations
              </h3>
            </div>
            <span className="stamp-badge text-[9px] px-2 py-0.5">
              IEEE RMKMATE 2026
            </span>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 sketch-border space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                  IEEE Xplore Digital Library &bull; Electronic ISBN: 979-8-3315-4623-6 &bull; Record: 11518869
                </span>
                <h4 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  &quot;Workplace Safety Using Computer Vision: A Framework for Personal Protective Equipment Detection and Intrusion Monitoring&quot;
                </h4>
                <p className="font-mono text-xs text-slate-500">
                  Authors: Amriteshkumar Yadav, et al. &bull; IEEE International Conference on Research in Multidisciplinary Knowledge, Machine Learning and Advanced Technology in Engineering (RMKMATE 2026).
                </p>
              </div>

              <a
                href="https://ieeexplore.ieee.org/document/11518869"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold sketch-border flex items-center gap-1.5 shrink-0"
              >
                <span>View on IEEE Xplore</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-display leading-relaxed">
              <strong>Abstract Summary:</strong> Proposed an automated end-to-end framework integrating dual-model deep learning for PPE compliance (hard hats, vests, safety gear) with arbitrary polygon geofencing and temporal centroid tracking. Evaluates real-time intrusion monitoring under occlusion and variable illumination with automated safety alert dispatch.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono">
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded sketch-border text-[11px]">YOLO PPE Detection</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded sketch-border text-[11px]">Polygon Geofencing (zones.json)</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded sketch-border text-[11px]">Temporal Centroid Tracking</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded sketch-border text-[11px]">Real-time Event Dispatch</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT DRAFTING DESK */}
        <section id="contact" className="relative p-6 sm:p-10 bg-white dark:bg-slate-900 sketch-border space-y-6">
          <div className="drafting-tape -top-2 -left-3" />
          <div className="drafting-tape -top-2 -right-3" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                05 // DISPATCH &amp; REACH OUT
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                Let&apos;s Build Technically Substantial Systems
              </h3>
            </div>
            <span className="font-hand text-base text-slate-500">
              Open to AI/ML &amp; Systems Engineering roles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border space-y-2">
              <span className="font-bold text-slate-500 uppercase block">DIRECT EMAIL</span>
              <a href="mailto:amriteshyadav2004@gmail.com" className="font-bold text-sm text-emerald-600 dark:text-emerald-400 hover:underline block truncate">
                amriteshyadav2004@gmail.com
              </a>
              <p className="text-[11px] text-slate-400">Fastest response for engineering discussions &amp; roles.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border space-y-2">
              <span className="font-bold text-slate-500 uppercase block">GITHUB PROFILE</span>
              <a href="https://github.com/Amrit-04" target="_blank" rel="noreferrer" className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>github.com/Amrit-04</span>
              </a>
              <p className="text-[11px] text-slate-400">Inspect the verified code, commits, and benchmarks.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 sketch-border space-y-2">
              <span className="font-bold text-slate-500 uppercase block">LINKEDIN</span>
              <a href="https://www.linkedin.com/in/amriteshkumar-yadav-214594250/" target="_blank" rel="noreferrer" className="font-bold text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4" />
                <span>Amriteshkumar Yadav</span>
              </a>
              <p className="text-[11px] text-slate-400">Professional background &amp; university credentials.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold">DOWNLOAD TARGETED RESUME:</span>
              <a
                href={getAssetUrl(`resumes/${activeResume.filename}`)}
                download={activeResume.filename}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{activeResume.label}</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => handleModeSwitch(0)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold sketch-border flex items-center gap-2"
            >
              <Bike className="w-4 h-4" />
              <span>Ride The Engineering Track</span>
            </button>
          </div>
        </section>

        {/* Drosophila Circuit Easter Egg Drawer */}
        {showFlyPet && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 sketch-border text-xs font-mono flex items-center justify-between gap-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                Fly_pet Biology Simulation Easter Egg
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Simulating Drosophila melanogaster visual sensory neural processing and movement loops.
              </p>
            </div>
            <a
              href="https://github.com/Amrit-04/Fly_pet"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold sketch-border shrink-0"
            >
              Inspect Repository
            </a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 dark:border-slate-700 py-10 px-4 text-center font-mono text-xs text-slate-500 bg-[#faf8f5]/80 dark:bg-[#0f131a]/80">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-base text-slate-800 dark:text-slate-200 font-bold">
            Amriteshkumar Yadav &bull; Systems &amp; Applied AI Engineer
          </div>
          <p className="text-[11px] text-slate-400">
            Hand-drawn architectural sketchbook aesthetic inspired by Tiago Fragoso &bull; 2D Verlet physics track inspired by Free Rider HD.
          </p>
          <div className="text-[10px] text-slate-400 pt-1">
            Built with React 19, TypeScript, Tailwind CSS v4, ONNX Runtime Web, and Web Audio API synthesis. All metrics empirically verified.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Subcomponent: Architectural Drafting Plate
interface PlateProps {
  project: ProjectDefinition;
  index: number;
  onOpenModal: () => void;
  onRideToSector: () => void;
}

const ProjectBlueprintPlate: React.FC<PlateProps> = ({ project, index, onOpenModal, onRideToSector }) => {
  const isEven = index % 2 === 0;

  // Render matching vector schematic
  const renderDrawing = () => {
    switch (project.id) {
      case 'neural-query-optimizer':
        return <NeuralQueryDrawing className="w-full h-auto" />;
      case 'llm-reliability-control-plane':
        return <ControlPlaneDrawing className="w-full h-auto" />;
      case 'tradeflow':
        return <TradeflowDrawing className="w-full h-auto" />;
      case 'warehouse-routing':
        return <WarehouseDrawing className="w-full h-auto" />;
      case 'moneyball':
        return <MoneyballDrawing className="w-full h-auto" />;
      case 'telemetry-pipeline':
        return <TelemetryPipelineDrawing className="w-full h-auto" />;
      case 'workplace-safety':
        return <WorkplaceSafetyDrawing className="w-full h-auto" />;
      default:
        return null;
    }
  };

  return (
    <article
      data-testid={`project-plate-${project.id}`}
      className="relative p-6 sm:p-8 bg-white dark:bg-slate-900 sketch-border space-y-6 transition-all hover:shadow-lg"
    >
      {/* Corner Drafting Tape */}
      <div className={`drafting-tape -top-2 ${isEven ? '-left-3 rotate-[-4deg]' : '-right-3 rotate-[5deg]'}`} />

      {/* Plate Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
              PLATE 0{index + 1} // {project.id.toUpperCase()}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
              project.tier === 'A'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : project.tier === 'B'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
            }`}>
              TIER {project.tier}: {project.tierLabel}
            </span>
          </div>

          <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {project.title}
          </h4>
          <p className="font-mono text-xs text-slate-500">
            {project.tagline}
          </p>
        </div>

        {/* GitHub link and ride shortcut */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRideToSector}
            title="Ride to this project in 2D game"
            className="p-1.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 sketch-border font-mono text-xs flex items-center gap-1"
          >
            <Bike className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Track Sector</span>
          </button>

          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 sketch-border font-mono text-xs flex items-center gap-1.5"
            title="Inspect GitHub Repository"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Schematic on one side, specs on other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Vector Schematic */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded sketch-border">
            {renderDrawing()}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-slate-400">
            <span>ARCHITECTURAL SCHEMATIC</span>
            <span className="font-hand text-xs text-emerald-600 dark:text-emerald-400">
              * interactive sandbox available
            </span>
          </div>
        </div>

        {/* Problem, Solution, and Stack */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          <div className="space-y-1.5 text-xs sm:text-sm font-display">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
              The Engineering Problem:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">
              What Was Built:
            </span>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-display list-disc list-inside">
              {project.built.slice(0, 3).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Technology Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map(st => (
              <span key={st} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono rounded">
                {st}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Benchmark Metrics Bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 sketch-border space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-1.5">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>EMPIRICAL BENCHMARKS (ALL SOURCED):</span>
          </span>
          <span className="text-[10px] text-slate-400">click value to view test artifact</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {project.metrics.map(m => (
            <div key={m.label} className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded sketch-border flex flex-col justify-between">
              <span className="text-slate-500 text-[10px] block">{m.label}</span>
              <a
                href={m.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center justify-between gap-1 mt-1"
                title="View verified benchmark file in repository"
              >
                <span className="truncate">{m.value}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>
              {m.benchmarkContext && (
                <span className="text-[9px] text-slate-400 mt-0.5 block truncate">
                  {m.benchmarkContext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            data-testid={`open-demo-${project.id}`}
            onClick={onOpenModal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded sketch-border flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>
              {project.tier === 'A' ? 'Launch Live Browser Demo' : project.tier === 'B' ? 'Replay Real Telemetry' : 'Inspect Case Study'}
            </span>
          </button>

          <button
            onClick={onOpenModal}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Inspect Blueprint Details</span>
          </button>
        </div>

        <span className="font-hand text-sm text-slate-500">
          Zero installation required &bull; 100% in-browser
        </span>
      </div>
    </article>
  );
};
