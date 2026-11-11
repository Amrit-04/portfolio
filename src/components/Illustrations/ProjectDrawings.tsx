import React from 'react';

export const NeuralQueryDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Neural Database Query Optimizer Schematic">
    {/* Background technical grid */}
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />
    <path d="M 0 40 L 360 40 M 0 80 L 360 80 M 0 120 L 360 120 M 0 160 L 360 160 M 60 0 L 60 190 M 120 0 L 120 190 M 180 0 L 180 190 M 240 0 L 240 190 M 300 0 L 300 190" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />

    {/* Plan tree hierarchy */}
    {/* Root Node: Hash Join */}
    <rect x="135" y="20" width="90" height="26" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" />
    <text x="180" y="37" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[10px] font-bold">Hash Join</text>

    {/* Edges */}
    <line x1="160" y1="46" x2="80" y2="75" className="stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />
    <line x1="200" y1="46" x2="280" y2="75" className="stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />

    {/* Intermediate Node 1: Seq Scan (lineitem) */}
    <rect x="35" y="75" width="90" height="24" rx="3" className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.2" />
    <text x="80" y="91" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-[9px]">Seq Scan (lineitem)</text>

    {/* Intermediate Node 2: Nested Loop */}
    <rect x="235" y="75" width="90" height="24" rx="3" className="fill-indigo-100 dark:fill-indigo-950 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.2" />
    <text x="280" y="91" textAnchor="middle" className="fill-indigo-950 dark:fill-indigo-200 font-mono text-[9px] font-bold">Nested Loop</text>

    {/* Sub-branches */}
    <line x1="260" y1="99" x2="230" y2="125" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2,2" />
    <line x1="300" y1="99" x2="320" y2="125" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2,2" />

    <rect x="190" y="125" width="75" height="20" rx="2" className="fill-amber-50 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1" />
    <text x="227" y="139" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-mono text-[8px]">Index Scan (orders)</text>

    <rect x="275" y="125" width="80" height="20" rx="2" className="fill-amber-50 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1" />
    <text x="315" y="139" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-mono text-[8px]">Index Scan (customer)</text>

    {/* Technical annotation badges */}
    <rect x="15" y="155" width="130" height="22" rx="2" className="fill-emerald-600 text-white" />
    <text x="80" y="170" textAnchor="middle" className="fill-white font-mono text-[9px] font-bold">2.17x Q10 Speedup</text>

    <text x="180" y="170" className="fill-slate-600 dark:fill-slate-400 font-hand text-sm font-bold">
      Spearman rho = 0.74 &bull; ONNX 0.21ms
    </text>
  </svg>
);

export const ControlPlaneDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="LLM Reliability Control Plane Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* OTLP Gateway Funnel */}
    <path d="M 20 50 L 70 65 L 70 115 L 20 130 Z" className="fill-indigo-100 dark:fill-indigo-950 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.2" />
    <text x="45" y="93" textAnchor="middle" className="fill-indigo-950 dark:fill-indigo-200 font-mono text-[8px] font-bold">C++ OTLP</text>

    {/* Arrow into WAL */}
    <line x1="70" y1="90" x2="105" y2="90" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" />

    {/* CRC-32 WAL Cylinders */}
    <g transform="translate(105, 55)">
      <rect x="0" y="0" width="75" height="70" rx="3" className="fill-amber-100 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.5" />
      <text x="37" y="24" textAnchor="middle" className="fill-amber-950 dark:fill-amber-200 font-mono text-[9px] font-bold">CRC-32 WAL</text>
      <text x="37" y="42" textAnchor="middle" className="fill-amber-800 dark:fill-amber-300 font-mono text-[8px]">64 MB Rotation</text>
      <text x="37" y="58" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-hand text-[10px] font-bold">fsync before ack</text>
    </g>

    {/* Compaction arrow */}
    <line x1="180" y1="90" x2="210" y2="90" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" />

    {/* Parquet & DuckDB block */}
    <g transform="translate(210, 45)">
      <rect x="0" y="0" width="135" height="90" rx="3" className="fill-emerald-50 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" />
      <text x="67" y="22" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[9px] font-bold">Zstd Parquet (50k/s)</text>
      <line x1="10" y1="32" x2="125" y2="32" className="stroke-emerald-300 dark:stroke-emerald-800" strokeWidth="1" />
      
      {/* DuckDB & Redis tags */}
      <rect x="15" y="42" width="105" height="18" rx="2" className="fill-white dark:fill-slate-900 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1" />
      <text x="67" y="55" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-[8px]">DuckDB &lt; 100ms p99</text>

      <rect x="15" y="65" width="105" height="18" rx="2" className="fill-white dark:fill-slate-900 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1" />
      <text x="67" y="78" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-[8px]">Redis Cosine 0.90</text>
    </g>

    {/* Circuit Breaker Tag */}
    <text x="20" y="165" className="fill-emerald-700 dark:fill-emerald-300 font-hand text-sm font-bold">
      ~5 ms p99 ingestion &bull; 54 Automated Tests &bull; Zero crash loss
    </text>
  </svg>
);

export const TradeflowDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Tradeflow OMS Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* FIX 4.2 Message Input */}
    <rect x="15" y="30" width="65" height="35" rx="2" className="fill-slate-100 dark:fill-slate-800 stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.2" />
    <text x="47" y="48" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-[8px] font-bold">FIX 4.2 In</text>
    <text x="47" y="59" textAnchor="middle" className="fill-slate-500 font-mono text-[7px]">35=D (New)</text>

    <line x1="80" y1="47" x2="110" y2="47" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" />

    {/* 7-Rule Redis Lua Risk Gate */}
    <g transform="translate(110, 20)">
      <polygon points="45,0 90,30 45,60 0,30" className="fill-amber-100 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.5" />
      <text x="45" y="28" textAnchor="middle" className="fill-amber-950 dark:fill-amber-200 font-mono text-[8px] font-bold">7-Rule Risk</text>
      <text x="45" y="39" textAnchor="middle" className="fill-amber-800 dark:fill-amber-400 font-mono text-[7px]">311 ns/op</text>
    </g>

    <line x1="200" y1="50" x2="235" y2="50" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" />

    {/* Go OMS FSM */}
    <g transform="translate(235, 20)">
      <rect x="0" y="0" width="110" height="60" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" />
      <text x="55" y="24" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[9px] font-bold">Go OMS Engine</text>
      <text x="55" y="39" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[8px]">113 ns/op transition</text>
      <text x="55" y="51" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">50 concurrent workers</text>
    </g>

    {/* Transactional Outbox Conveyor */}
    <g transform="translate(30, 100)">
      <rect x="0" y="0" width="300" height="40" rx="2" className="fill-slate-100 dark:fill-slate-800/80 stroke-slate-700 dark:stroke-slate-400" strokeWidth="1.2" strokeDasharray="4,4" />
      <text x="15" y="16" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold">PostgreSQL Transactional Outbox + Kafka Stream:</text>

      {/* Outbox event blocks */}
      <rect x="15" y="22" width="60" height="14" rx="1" className="fill-emerald-600 text-white" />
      <text x="45" y="32" textAnchor="middle" className="fill-white font-mono text-[7px]">OrderApproved</text>

      <rect x="85" y="22" width="60" height="14" rx="1" className="fill-emerald-600 text-white" />
      <text x="115" y="32" textAnchor="middle" className="fill-white font-mono text-[7px]">OrderFilled</text>

      <rect x="155" y="22" width="60" height="14" rx="1" className="fill-indigo-600 text-white" />
      <text x="185" y="32" textAnchor="middle" className="fill-white font-mono text-[7px]">PositionUpdate</text>

      <rect x="225" y="22" width="60" height="14" rx="1" className="fill-indigo-600 text-white" />
      <text x="255" y="32" textAnchor="middle" className="fill-white font-mono text-[7px]">P&amp;L Reconciled</text>
    </g>

    <text x="20" y="168" className="fill-emerald-700 dark:fill-emerald-300 font-hand text-sm font-bold">
      14.38 ms median &bull; 17.99 ms p99 &bull; 1,000 Property-based tests &bull; 0 event loss
    </text>
  </svg>
);

export const WarehouseDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Warehouse Routing Engine Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* Warehouse Racking Aisles */}
    <g transform="translate(30, 25)">
      {/* Aisle 1 */}
      <rect x="0" y="0" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <rect x="0" y="35" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <text x="35" y="12" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK A-01</text>
      <text x="35" y="47" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK A-02</text>

      {/* Aisle 2 */}
      <rect x="110" y="0" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <rect x="110" y="35" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <text x="145" y="12" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK B-01</text>
      <text x="145" y="47" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK B-02</text>

      {/* Aisle 3 */}
      <rect x="220" y="0" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <rect x="220" y="35" width="70" height="16" className="fill-slate-200 dark:fill-slate-750 stroke-slate-600" />
      <text x="255" y="12" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK C-01</text>
      <text x="255" y="47" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">RACK C-02</text>

      {/* Path route line */}
      <path d="M 10 75 L 10 25 L 85 25 L 85 75 L 195 75 L 195 25 L 305 25 L 305 75" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4,2" />

      {/* Waypoint Pick Stop Dots */}
      <circle cx="10" cy="75" r="5" className="fill-emerald-500 stroke-slate-900" strokeWidth="1.5" />
      <circle cx="85" cy="25" r="4" className="fill-amber-500 stroke-slate-900" strokeWidth="1" />
      <circle cx="195" cy="55" r="4" className="fill-amber-500 stroke-slate-900" strokeWidth="1" />
      <circle cx="305" cy="75" r="5" className="fill-rose-500 stroke-slate-900" strokeWidth="1.5" />

      <text x="10" y="93" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px] font-bold">START</text>
      <text x="305" y="93" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px] font-bold">PACKING</text>
    </g>

    {/* Metric callout box */}
    <g transform="translate(25, 130)">
      <rect x="0" y="0" width="145" height="24" rx="2" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1" />
      <text x="72" y="16" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[8px] font-bold">C++17 A*: 31x Speedup (0.50ms)</text>

      <rect x="160" y="0" width="150" height="24" rx="2" className="fill-indigo-100 dark:fill-indigo-950 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1" />
      <text x="235" y="16" textAnchor="middle" className="fill-indigo-950 dark:fill-indigo-200 font-mono text-[8px] font-bold">Held-Karp TSP: 56.5x (1.30ms)</text>
    </g>

    <text x="25" y="176" className="fill-slate-600 dark:fill-slate-400 font-hand text-sm font-bold">
      pybind11 &bull; FastAPI Redis O(1) Cache &bull; 144 RPS &bull; 0% Errors
    </text>
  </svg>
);

export const MoneyballDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Moneyball Quantitative Platform Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* 3-State HMM State Machine */}
    <g transform="translate(30, 25)">
      {/* State 0: Low Volatility (Bull) */}
      <circle cx="35" cy="35" r="24" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" />
      <text x="35" y="32" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[8px] font-bold">STATE 0</text>
      <text x="35" y="44" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px]">Low Vol / Bull</text>

      {/* State 1: High Volatility */}
      <circle cx="150" cy="35" r="24" className="fill-amber-100 dark:fill-amber-950 stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.5" />
      <text x="150" y="32" textAnchor="middle" className="fill-amber-950 dark:fill-amber-200 font-mono text-[8px] font-bold">STATE 1</text>
      <text x="150" y="44" textAnchor="middle" className="fill-amber-800 dark:fill-amber-300 font-mono text-[7px]">High Volatility</text>

      {/* State 2: Bear Market */}
      <circle cx="265" cy="35" r="24" className="fill-rose-100 dark:fill-rose-950 stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" />
      <text x="265" y="32" textAnchor="middle" className="fill-rose-950 dark:fill-rose-200 font-mono text-[8px] font-bold">STATE 2</text>
      <text x="265" y="44" textAnchor="middle" className="fill-rose-800 dark:fill-rose-300 font-mono text-[7px]">Crash / Bear</text>

      {/* State transitions */}
      <path d="M 60 30 Q 92 10 125 30" className="stroke-slate-500" strokeWidth="1.2" fill="none" />
      <path d="M 125 40 Q 92 60 60 40" className="stroke-slate-500" strokeWidth="1.2" fill="none" />
      <path d="M 175 30 Q 207 10 240 30" className="stroke-slate-500" strokeWidth="1.2" fill="none" />
      <path d="M 240 40 Q 207 60 175 40" className="stroke-slate-500" strokeWidth="1.2" fill="none" />
    </g>

    {/* Monte Carlo Fan / VaR distribution curve */}
    <g transform="translate(35, 95)">
      <rect x="0" y="0" width="290" height="45" rx="2" className="fill-slate-100/70 dark:fill-slate-800/50 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
      <text x="10" y="15" className="fill-slate-700 dark:fill-slate-300 font-mono text-[8px] font-bold">CUDA Monte Carlo (1M Paths in 29.26 ms &bull; 42.9x vs NumPy)</text>
      
      {/* Simulation lines */}
      <path d="M 10 35 Q 60 30 120 28 T 240 22" className="stroke-emerald-600" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 10 35 Q 60 35 120 32 T 240 30" className="stroke-indigo-600" strokeWidth="1.2" fill="none" opacity="0.9" />
      <path d="M 10 35 Q 60 38 120 40 T 240 43" className="stroke-rose-600" strokeWidth="1" fill="none" opacity="0.7" />

      {/* VaR Line */}
      <line x1="210" y1="5" x2="210" y2="45" className="stroke-rose-500" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="215" y="16" className="fill-rose-600 font-mono text-[7px] font-bold">99% VaR</text>
    </g>

    <text x="25" y="172" className="fill-emerald-700 dark:fill-emerald-300 font-hand text-sm font-bold">
      Sharpe 2.02 &bull; Max Drawdown 13.58% → 8.59% &bull; 14-qubit QAOA (95.49% AR)
    </text>
  </svg>
);

export const TelemetryPipelineDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Fault-Tolerant ML Telemetry Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* Ingestion Comparison */}
    <g transform="translate(20, 25)">
      <rect x="0" y="0" width="85" height="50" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" />
      <text x="42" y="18" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-200 font-mono text-[9px] font-bold">Go Gateway</text>
      <text x="42" y="32" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[8px]">288.0 RPS (+90%)</text>
      <text x="42" y="44" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px]">24.3 MB (-71.6% RSS)</text>
    </g>

    <line x1="105" y1="50" x2="135" y2="50" className="stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" />

    {/* Kafka Cluster (12 Partitions) */}
    <g transform="translate(135, 15)">
      <rect x="0" y="0" width="95" height="70" rx="3" className="fill-slate-100 dark:fill-slate-800 stroke-slate-800 dark:stroke-slate-300" strokeWidth="1.5" />
      <text x="47" y="18" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-[9px] font-bold">Kafka KRaft</text>
      <text x="47" y="30" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[8px]">12 Partitions</text>

      {/* Partition lanes */}
      <line x1="15" y1="40" x2="80" y2="40" className="stroke-slate-400" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="15" y1="50" x2="80" y2="50" className="stroke-slate-400" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="15" y1="60" x2="80" y2="60" className="stroke-slate-400" strokeWidth="1" strokeDasharray="3,2" />
    </g>

    {/* Dual branch: Valid vs Malformed DLQ */}
    <path d="M 230 40 L 260 30" className="stroke-emerald-600" strokeWidth="1.5" />
    <path d="M 230 60 L 260 70" className="stroke-rose-600" strokeWidth="1.5" />

    {/* Valid Store */}
    <rect x="260" y="18" width="85" height="26" rx="2" className="fill-emerald-50 dark:fill-emerald-950 stroke-emerald-600" strokeWidth="1.2" />
    <text x="302" y="34" textAnchor="middle" className="fill-emerald-900 dark:fill-emerald-200 font-mono text-[7px] font-bold">Postgres 16 (251k ok)</text>

    {/* Dead Letter Queue */}
    <rect x="260" y="58" width="85" height="26" rx="2" className="fill-rose-50 dark:fill-rose-950 stroke-rose-600" strokeWidth="1.2" />
    <text x="302" y="74" textAnchor="middle" className="fill-rose-900 dark:fill-rose-200 font-mono text-[7px] font-bold">DLQ (44,493 isolated)</text>

    {/* Chaos and Tuning summary */}
    <g transform="translate(20, 105)">
      <rect x="0" y="0" width="320" height="40" rx="2" className="fill-slate-100/60 dark:fill-slate-800/40 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
      <text x="15" y="16" className="fill-slate-700 dark:fill-slate-300 font-mono text-[8px] font-bold">
        Chaos Resilience: Writer Kill &bull; Postgres Restart &bull; Redis Restart
      </text>
      <text x="15" y="30" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[8px]">
        900,469 events processed &bull; ZERO duplicates &bull; ZERO event loss &bull; 27 configs swept
      </text>
    </g>

    <text x="20" y="172" className="fill-slate-600 dark:fill-slate-400 font-hand text-sm font-bold">
      Consumed at 7,117 events/sec sustained (7,892 peak) &bull; 76 Unit tests
    </text>
  </svg>
);

export const WorkplaceSafetyDrawing: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Workplace Safety Computer Vision Schematic">
    <rect x="0" y="0" width="360" height="190" className="fill-slate-50/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

    {/* Camera Frustum Cone */}
    <g transform="translate(30, 20)">
      {/* CCTV Camera Head */}
      <polygon points="0,10 25,0 25,20" className="fill-slate-800 dark:fill-slate-200" />
      <circle cx="28" cy="10" r="4" className="fill-rose-500 animate-pulse" />

      {/* Vision Cone projection */}
      <path d="M 28 10 L 150 0 L 150 90 L 28 10 Z" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="1" strokeDasharray="3,3" />

      {/* Polygon Geofence Restricted Zone */}
      <polygon points="85,30 140,20 145,75 75,70" className="fill-rose-500/20 stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" />
      <text x="110" y="52" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 font-mono text-[7px] font-bold">RESTRICTED ZONE</text>

      {/* Person Bounding Box */}
      <rect x="100" y="25" width="22" height="42" className="stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="1.5" />
      <text x="100" y="20" className="fill-amber-700 dark:fill-amber-300 font-mono text-[6px] font-bold">Person #12</text>
      {/* PPE Label */}
      <rect x="98" y="70" width="30" height="10" rx="1" className="fill-rose-600 text-white" />
      <text x="113" y="78" textAnchor="middle" className="fill-white font-mono text-[6px] font-bold">NO VEST</text>
    </g>

    {/* Dual-Model Cascade Specs */}
    <g transform="translate(195, 20)">
      <rect x="0" y="0" width="145" height="85" rx="3" className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.2" />
      <text x="12" y="18" className="fill-slate-900 dark:fill-slate-100 font-mono text-[8px] font-bold">DUAL-MODEL CASCADE</text>
      <line x1="12" y1="24" x2="133" y2="24" className="stroke-slate-300 dark:stroke-slate-600" />
      
      <text x="12" y="38" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[7px] font-bold">Stage 1: best.pt</text>
      <text x="12" y="48" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">YOLO PPE Detector (Vest/Helmet)</text>

      <text x="12" y="64" className="fill-indigo-600 dark:fill-indigo-400 font-mono text-[7px] font-bold">Stage 2: yolo11n.pt</text>
      <text x="12" y="74" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">Temporal Centroid Tracker</text>
    </g>

    {/* IEEE Publication Plaque Banner */}
    <g transform="translate(20, 125)">
      <rect x="0" y="0" width="320" height="42" rx="2" className="fill-blue-50 dark:fill-blue-950 stroke-blue-600 dark:stroke-blue-400" strokeWidth="1.2" />
      <text x="15" y="16" className="fill-blue-900 dark:fill-blue-200 font-mono text-[8px] font-bold">
        PUBLICATION &bull; IEEE RMKMATE 2026 (IEEE Xplore: 11518869)
      </text>
      <text x="15" y="30" className="fill-slate-700 dark:fill-slate-300 font-editorial text-xs italic">
        "Workplace Safety Using Computer Vision: Framework for PPE Detection &amp; Intrusion Monitoring"
      </text>
    </g>

    <text x="20" y="180" className="fill-emerald-700 dark:fill-emerald-300 font-hand text-sm font-bold">
      Temporal centroid tracking &bull; Polygon geofencing &bull; Real-time event dispatch
    </text>
  </svg>
);
