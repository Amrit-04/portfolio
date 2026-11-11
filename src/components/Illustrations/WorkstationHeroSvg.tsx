import React from 'react';

export const WorkstationHeroSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 680 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none ${className}`}
      aria-label="Engineer's drafting workstation illustration"
    >
      <defs>
        {/* Subtle paper hatching pattern */}
        <pattern id="drafting-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" />
        </pattern>
        <pattern id="crosshatch" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 0 8 L 8 0 M 0 0 L 8 8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
      </defs>

      {/* Main Drafting Board Frame */}
      <rect
        x="20"
        y="15"
        width="640"
        height="390"
        rx="6"
        className="fill-white dark:fill-slate-900 stroke-slate-900 dark:stroke-slate-600"
        strokeWidth="2.5"
      />
      <rect x="20" y="15" width="640" height="390" fill="url(#drafting-grid)" />

      {/* Drafting Board Border Tapes */}
      <rect x="15" y="10" width="45" height="18" className="fill-amber-200/80 dark:fill-slate-700" transform="rotate(-6 15 10)" />
      <rect x="625" y="8" width="45" height="18" className="fill-amber-200/80 dark:fill-slate-700" transform="rotate(8 625 8)" />
      <rect x="12" y="385" width="45" height="18" className="fill-amber-200/80 dark:fill-slate-700" transform="rotate(4 12 385)" />
      <rect x="625" y="385" width="45" height="18" className="fill-amber-200/80 dark:fill-slate-700" transform="rotate(-6 625 385)" />

      {/* Technical Drawing Sheet Title Block (Bottom Right) */}
      <g transform="translate(430, 310)">
        <rect x="0" y="0" width="215" height="80" className="fill-slate-50 dark:fill-slate-850 stroke-slate-800 dark:stroke-slate-600" strokeWidth="1.5" />
        <line x1="0" y1="26" x2="215" y2="26" className="stroke-slate-800 dark:stroke-slate-600" strokeWidth="1" />
        <line x1="0" y1="52" x2="215" y2="52" className="stroke-slate-800 dark:stroke-slate-600" strokeWidth="1" />
        <line x1="100" y1="26" x2="100" y2="80" className="stroke-slate-800 dark:stroke-slate-600" strokeWidth="1" />

        <text x="10" y="18" className="fill-slate-900 dark:fill-slate-100 font-mono text-[10px] font-bold">SPEC: SYSTEMS &amp; AI WORKSHOP</text>
        <text x="10" y="42" className="fill-slate-500 font-mono text-[9px]">ENGINEER:</text>
        <text x="10" y="70" className="fill-slate-500 font-mono text-[9px]">INSTITUTION:</text>
        <text x="110" y="42" className="fill-slate-900 dark:fill-slate-100 font-mono text-[9px] font-bold">Amriteshkumar Yadav</text>
        <text x="110" y="70" className="fill-slate-900 dark:fill-slate-100 font-mono text-[9px] font-bold">SRM Institute (Jul 2026)</text>
      </g>

      {/* Center Sketch 1: Hand-Drawn Bicycle & Terrain Ramp (Free Rider HD Homage) */}
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="340" height="200" className="fill-slate-50/50 dark:fill-slate-800/30 stroke-slate-300 dark:stroke-slate-700" strokeDasharray="3,3" />
        
        {/* Terrain Incline with crosshatch */}
        <path d="M 15 150 Q 80 150 140 120 T 260 80 L 325 50" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="3" strokeLinecap="round" />
        <path d="M 15 150 Q 80 150 140 120 T 260 80 L 325 50 L 325 185 L 15 185 Z" fill="url(#crosshatch)" />

        {/* Free Rider Bicycle Silhouette */}
        <g transform="translate(150, 68) rotate(-18)">
          {/* Rear wheel */}
          <circle cx="0" cy="20" r="12" className="stroke-slate-900 dark:stroke-slate-100 fill-white dark:fill-slate-800" strokeWidth="2" />
          <line x1="-12" y1="20" x2="12" y2="20" className="stroke-slate-900 dark:stroke-slate-200" strokeWidth="1" />
          <line x1="0" y1="8" x2="0" y2="32" className="stroke-slate-900 dark:stroke-slate-200" strokeWidth="1" />

          {/* Front wheel */}
          <circle cx="42" cy="20" r="12" className="stroke-slate-900 dark:stroke-slate-100 fill-white dark:fill-slate-800" strokeWidth="2" />
          <line x1="30" y1="20" x2="54" y2="20" className="stroke-slate-900 dark:stroke-slate-200" strokeWidth="1" />
          <line x1="42" y1="8" x2="42" y2="32" className="stroke-slate-900 dark:stroke-slate-200" strokeWidth="1" />

          {/* Frame */}
          <polygon points="0,20 21,3 42,20" className="stroke-emerald-600 dark:stroke-emerald-400 fill-none" strokeWidth="2.5" />
          <line x1="0" y1="20" x2="18" y2="20" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="2" />
          <line x1="18" y1="20" x2="21" y2="3" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="2" />

          {/* Handlebar & Fork */}
          <line x1="42" y1="20" x2="38" y2="-2" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <line x1="33" y1="-2" x2="44" y2="-2" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2.5" strokeLinecap="round" />

          {/* Rider Stickman */}
          <line x1="17" y1="3" x2="26" y2="-12" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2.2" /> {/* Torso */}
          <circle cx="28" cy="-20" r="6" className="fill-amber-500 stroke-slate-900 dark:stroke-slate-100" strokeWidth="1.5" /> {/* Head */}
          <line x1="26" y1="-12" x2="36" y2="-2" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="1.8" /> {/* Arms */}
          <line x1="17" y1="3" x2="21" y2="14" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="1.8" /> {/* Legs */}
          <line x1="21" y1="14" x2="18" y2="20" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="1.8" />
        </g>

        {/* Handwritten Annotation Callout */}
        <path d="M 230 40 Q 260 25 290 35" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        <text x="200" y="22" className="fill-emerald-700 dark:fill-emerald-300 font-hand text-base font-bold">
          Verlet integration / 60 FPS
        </text>
      </g>

      {/* Center Sketch 2: Database Query Plan Graph (Neural Query Optimizer) */}
      <g transform="translate(420, 50)">
        <rect x="0" y="0" width="225" height="135" className="fill-slate-50/70 dark:fill-slate-800/40 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.2" />
        <text x="12" y="20" className="fill-slate-700 dark:fill-slate-300 font-mono text-[9px] font-bold">EXPLAIN PLAN: GNN COST TREE</text>

        {/* Tree Nodes */}
        {/* Root */}
        <rect x="80" y="32" width="65" height="22" rx="3" className="fill-indigo-100 dark:fill-indigo-950 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.2" />
        <text x="112" y="46" textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-200 font-mono text-[8px] font-bold">Hash Join</text>

        {/* Branch 1 */}
        <line x1="95" y1="54" x2="50" y2="80" className="stroke-slate-400" strokeWidth="1.2" />
        <rect x="20" y="80" width="60" height="20" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.2" />
        <text x="50" y="93" textAnchor="middle" className="fill-emerald-900 dark:fill-emerald-200 font-mono text-[8px]">Seq Scan</text>

        {/* Branch 2 */}
        <line x1="130" y1="54" x2="165" y2="80" className="stroke-slate-400" strokeWidth="1.2" />
        <rect x="135" y="80" width="65" height="20" rx="3" className="fill-amber-100 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.2" />
        <text x="167" y="93" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-mono text-[8px]">Index Scan</text>

        {/* Callout */}
        <text x="12" y="122" className="fill-slate-600 dark:fill-slate-400 font-hand text-sm font-bold">
          2.17x Q10 speedup &bull; ONNX 0.21ms
        </text>
      </g>

      {/* Bottom Sketch 3: Telemetry Stream Pipeline & WAL */}
      <g transform="translate(60, 265)">
        <rect x="0" y="0" width="340" height="125" className="fill-slate-50/70 dark:fill-slate-800/40 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.2" />
        <text x="12" y="20" className="fill-slate-700 dark:fill-slate-300 font-mono text-[9px] font-bold">HIGH-THROUGHPUT PIPELINE SPEC</text>

        {/* Ingestion & Outbox */}
        <g transform="translate(20, 35)">
          <rect x="0" y="0" width="70" height="30" rx="2" className="fill-slate-100 dark:fill-slate-750 stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.2" />
          <text x="35" y="18" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold">Go HTTP (288 RPS)</text>

          <path d="M 70 15 L 105 15" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="105" y="0" width="95" height="30" rx="2" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-700 dark:stroke-emerald-400" strokeWidth="1.2" />
          <text x="152" y="18" textAnchor="middle" className="fill-emerald-900 dark:fill-emerald-200 font-mono text-[8px] font-bold">Kafka 12 Partitions</text>

          <path d="M 200 15 L 235 15" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="235" y="0" width="65" height="30" rx="2" className="fill-slate-100 dark:fill-slate-750 stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.2" />
          <text x="267" y="18" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold">PostgreSQL 16</text>
        </g>

        {/* Marginalia annotation */}
        <text x="20" y="95" className="fill-emerald-700 dark:fill-emerald-400 font-hand text-sm font-bold">
          * 7,117 events/sec consumed &bull; 0 duplicates across 900K+ chaos events
        </text>
        <text x="20" y="112" className="fill-slate-500 font-mono text-[8px]">
          [CRC-32 Checksummed WAL &bull; 64 MB Rotation &bull; DuckDB analytical query &lt; 100ms]
        </text>
      </g>

      {/* Drafting Instrument 1: Triangular Draftsman Ruler */}
      <g transform="translate(370, 195) rotate(22)">
        <polygon points="0,0 80,0 0,60" className="fill-amber-100/70 dark:fill-amber-900/40 stroke-amber-700 dark:stroke-amber-400" strokeWidth="1" />
        <polygon points="12,10 50,10 12,38" className="fill-white dark:fill-slate-900 stroke-amber-700 dark:stroke-amber-400" strokeWidth="0.8" />
      </g>

      {/* Drafting Instrument 2: Compass & Coffee Mug Stain */}
      <g transform="translate(415, 255)">
        {/* Coffee Mug Ring */}
        <circle cx="0" cy="0" r="22" className="stroke-amber-900/20 dark:stroke-amber-600/20" strokeWidth="3" fill="none" />
        <circle cx="2" cy="1" r="21" className="stroke-amber-900/10 dark:stroke-amber-600/10" strokeWidth="1" fill="none" />
      </g>

      {/* Arrow Marker */}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-800 dark:fill-slate-200" />
        </marker>
      </defs>
    </svg>
  );
};
