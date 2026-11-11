// Original hand-drawn line-art SVGs inspired by artist sketchbooks and illustrated studios.
// Uses organic bezier curves, varied line weights, and warm watercolor-like accent fills.

type ArtProps = { className?: string };

/**
 * Hand-drawn artist monogram "AY" with a playful bicycle flourish
 */
export function MarkLogo({ className = 'w-8 h-8' }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* Hand-drawn circular stamp outline */}
      <path
        d="M32 4 C 47 3.5, 59 15, 60 31 C 61 48, 48 60, 31 60 C 14 60, 3.5 48, 4 32 C 4.5 16, 16 4.5, 32 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Hand-lettered 'A' */}
      <path
        d="M17 44 C 19 32, 23 18, 26 15 C 27 14, 29 16, 33 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20 33 C 24 32.5, 29 33, 31 33.5"
        fill="none"
        stroke="#c84b31"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Hand-lettered 'Y' */}
      <path
        d="M36 17 C 38 24, 40 28, 42 31 M 48 17 C 46 23, 44 28, 42 31 C 42 36, 41 42, 40 45 C 39.5 47, 37 48, 35 47"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Tiny whimsical bike wheel doodle */}
      <circle cx="49" cy="45" r="5" fill="none" stroke="#c84b31" strokeWidth="1.6" />
      <circle cx="49" cy="45" r="1.2" fill="#c84b31" />
    </svg>
  );
}

/**
 * 01 — Neural Database Query Optimizer
 * Branching query tree with database cylinders, magnifying glass, cost reduction note
 */
export function DiagramNeural({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Root node - Hash Join */}
      <path d="M160 22 C 160 14, 182 14, 185 22 C 187 32, 133 32, 135 22" fill="#faf8f3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="130" y="16" width="60" height="24" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="1.8" />
      <text x="160" y="32" fontFamily="'Inter', sans-serif" fontSize="10" fontWeight="600" textAnchor="middle" fill="currentColor">
        Hash Join
      </text>

      {/* Curved organic branches */}
      <path d="M142 40 C 120 54, 88 58, 76 72" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M178 40 C 198 54, 230 58, 244 72" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Left intermediate: Index Scan */}
      <rect x="44" y="72" width="66" height="24" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
      <text x="77" y="87" fontFamily="'Inter', sans-serif" fontSize="9" fontWeight="500" textAnchor="middle" fill="currentColor">
        Index Scan
      </text>

      {/* Right intermediate: Seq Scan */}
      <rect x="210" y="72" width="68" height="24" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
      <text x="244" y="87" fontFamily="'Inter', sans-serif" fontSize="9" fontWeight="500" textAnchor="middle" fill="currentColor">
        Filter Scan
      </text>

      {/* Sub-branches to leaves (database cylinders) */}
      <path d="M60 96 C 52 110, 42 118, 38 126" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M94 96 C 102 110, 112 118, 116 126" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M244 96 C 244 110, 244 116, 244 124" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

      {/* Database cylinder 1: lineitem */}
      <g transform="translate(24, 124)">
        <ellipse cx="14" cy="5" rx="14" ry="4" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M0 5 C 0 16, 0 18, 0 20 C 0 24, 28 24, 28 20 L 28 5" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="14" cy="20" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="14" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">lineitem</text>
      </g>

      {/* Database cylinder 2: orders */}
      <g transform="translate(102, 124)">
        <ellipse cx="14" cy="5" rx="14" ry="4" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M0 5 C 0 16, 0 18, 0 20 C 0 24, 28 24, 28 20 L 28 5" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="14" cy="20" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="14" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">orders</text>
      </g>

      {/* Database cylinder 3: customer */}
      <g transform="translate(230, 124)">
        <ellipse cx="14" cy="5" rx="14" ry="4" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M0 5 C 0 16, 0 18, 0 20 C 0 24, 28 24, 28 20 L 28 5" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="14" cy="20" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="14" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">customer</text>
      </g>

      {/* Magnifying glass inspecting the root join */}
      <g transform="translate(182, 12) rotate(18)">
        <circle cx="16" cy="16" r="13" fill="rgba(200, 75, 49, 0.08)" stroke="#c84b31" strokeWidth="1.8" />
        <path d="M26 26 L 38 38" stroke="#c84b31" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#c84b31" opacity="0.3" />
      </g>

      {/* Handwritten annotation badge */}
      <path d="M152 74 C 168 64, 184 76, 172 90" fill="none" stroke="#c84b31" strokeWidth="1.2" strokeLinecap="round" />
      <text x="156" y="98" fontFamily="'Caveat', cursive" fontSize="16" fill="#c84b31" transform="rotate(-4 156 98)">
        2.17x faster!
      </text>

      {/* Bottom subtle note */}
      <text x="160" y="162" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        184 REAL PLANS · GNN TOP-1 RANKING · ONNX 0.21MS
      </text>
    </svg>
  );
}

/**
 * 02 — LLM Reliability Control Plane
 * Illustrated control room with dials, telemetry trace spans, circuit breakers
 */
export function DiagramControl({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Control room console outline */}
      <rect x="18" y="16" width="284" height="124" rx="10" fill="#faf8f3" stroke="currentColor" strokeWidth="1.8" />

      {/* Screen header */}
      <path d="M18 42 L 302 42" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="32" cy="29" r="3" fill="#c84b31" />
      <circle cx="42" cy="29" r="3" fill="#d4a843" />
      <circle cx="52" cy="29" r="3" fill="#3a6ea5" />
      <text x="70" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#4a4540">
        LRCP TRACE STREAM // P99 &lt; 5MS
      </text>

      {/* Waterfall spans (OTLP Ingestion -> WAL -> Materializer -> DuckDB) */}
      <g transform="translate(32, 52)">
        {/* Span 1: OTLP Ingest */}
        <rect x="0" y="0" width="85" height="10" rx="3" fill="#3a6ea5" opacity="0.8" />
        <text x="92" y="8" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">OTLP Ingest (C++20)</text>

        {/* Span 2: CRC-32 WAL */}
        <rect x="25" y="14" width="60" height="10" rx="3" fill="#c84b31" opacity="0.85" />
        <text x="92" y="22" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">WAL fsync (64MB)</text>

        {/* Span 3: Parquet Compact */}
        <rect x="50" y="28" width="120" height="10" rx="3" fill="#d4a843" opacity="0.85" />
        <text x="178" y="36" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">50k spans/s Zstd</text>

        {/* Span 4: DuckDB Scan */}
        <rect x="90" y="42" width="70" height="10" rx="3" fill="currentColor" opacity="0.4" />
        <text x="168" y="50" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">DuckDB &lt;100ms</text>
      </g>

      {/* Dials / gauges on the right side */}
      <g transform="translate(262, 78)">
        <circle cx="0" cy="0" r="14" fill="#faf8f3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 0 L 8 -6" stroke="#c84b31" strokeWidth="1.8" strokeLinecap="round" />
        <text x="0" y="21" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" textAnchor="middle" fill="#8a8478">RAG GUARD</text>
      </g>

      {/* Circuit breaker switch sketch */}
      <g transform="translate(36, 120)">
        <path d="M0 8 L 12 0 L 24 8" fill="none" stroke="#c84b31" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="0" r="2" fill="#c84b31" />
        <text x="32" y="8" fontFamily="'Caveat', cursive" fontSize="14" fill="#c84b31">zero span loss</text>
      </g>

      <text x="160" y="158" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        54 AUTOMATED TESTS · CRC-32 WAL ROTATION · CHROMA RETRIEVAL
      </text>
    </svg>
  );
}

/**
 * 03 — Tradeflow OMS & Pre-Trade Risk
 * Financial ticker tape, order ticket slips, balance scale for risk
 */
export function DiagramTrade({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Flowing ticker tape background */}
      <path
        d="M12 40 C 60 28, 120 48, 180 34 C 240 20, 280 38, 308 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <path
        d="M12 56 C 60 44, 120 64, 180 50 C 240 36, 280 54, 308 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />

      {/* Candlestick chart snippet */}
      <g transform="translate(24, 76)">
        {[
          { x: 0, o: 18, c: 6, h: 2, l: 24, up: true },
          { x: 18, o: 8, c: 22, h: 4, l: 26, up: false },
          { x: 36, o: 20, c: 10, h: 6, l: 28, up: true },
          { x: 54, o: 10, c: 4, h: 0, l: 18, up: true },
          { x: 72, o: 6, c: 16, h: 2, l: 22, up: false },
          { x: 90, o: 14, c: 2, h: 0, l: 20, up: true },
        ].map((bar, i) => (
          <g key={i}>
            <line x1={bar.x + 5} y1={bar.h} x2={bar.x + 5} y2={bar.l} stroke="currentColor" strokeWidth="1.2" />
            <rect
              x={bar.x}
              y={Math.min(bar.o, bar.c)}
              width="10"
              height={Math.abs(bar.c - bar.o) || 2}
              rx="1.5"
              fill={bar.up ? '#c84b31' : '#2a2520'}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </g>

      {/* Order Ticket Paper Slip (floating angled card) */}
      <g transform="translate(144, 60) rotate(-2)">
        <rect x="0" y="0" width="88" height="66" rx="5" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <line x1="8" y1="14" x2="80" y2="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <text x="10" y="10" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="#c84b31">FIX 4.2 TICKET</text>
        <text x="10" y="26" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">SIDE: BUY 500</text>
        <text x="10" y="36" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">LMT: $142.50</text>
        <text x="10" y="47" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#3a6ea5">FSM: 113 ns/op</text>
        <text x="10" y="58" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#c84b31">RISK: 311 ns/op</text>
      </g>

      {/* Balance scale doodle representing pre-trade risk */}
      <g transform="translate(265, 82)">
        <line x1="20" y1="0" x2="20" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="42" x2="35" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Beam */}
        <line x1="2" y1="6" x2="38" y2="10" stroke="#c84b31" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="8" r="2.5" fill="#c84b31" />
        {/* Left pan */}
        <path d="M4 8 L 0 20 L 8 20 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {/* Right pan */}
        <path d="M36 10 L 32 22 L 40 22 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </g>

      <text x="144" y="146" fontFamily="'Caveat', cursive" fontSize="16" fill="#c84b31">
        atomic Lua checks · 0 overfills
      </text>

      <text x="160" y="162" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        14.38MS MEDIAN E2E · 1,000 RAPID PROPERTY CHECKS · REDIS LUA
      </text>
    </svg>
  );
}

/**
 * 04 — Real-Time Warehouse Routing Engine
 * Bird's eye warehouse shelves, picking path, robot cart
 */
export function DiagramWarehouse({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Warehouse outer grid frame */}
      <rect x="20" y="16" width="280" height="126" rx="8" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />

      {/* Warehouse racking aisles (rows of shelves) */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <g key={`${row}-${col}`} transform={`translate(${42 + col * 64}, ${30 + row * 34})`}>
            <rect x="0" y="0" width="46" height="16" rx="2" fill="rgba(42, 37, 32, 0.04)" stroke="currentColor" strokeWidth="1.3" />
            <line x1="15" y1="0" x2="15" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <line x1="31" y1="0" x2="31" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          </g>
        ))
      )}

      {/* Winding A* / TSP picking route */}
      <path
        d="M32 128 L 32 82 L 96 82 L 96 52 L 160 52 L 160 114 L 224 114 L 224 52 L 286 52"
        fill="none"
        stroke="#c84b31"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 4"
      />

      {/* Pick stops (points of interest) */}
      {[
        { x: 32, y: 128, label: 'START' },
        { x: 96, y: 82, label: 'SKU A' },
        { x: 160, y: 52, label: 'SKU B' },
        { x: 224, y: 114, label: 'SKU C' },
        { x: 286, y: 52, label: 'DOCK' },
      ].map((stop, i) => (
        <g key={i}>
          <circle cx={stop.x} cy={stop.y} r="4.5" fill="#faf8f3" stroke="#c84b31" strokeWidth="2" />
          <circle cx={stop.x} cy={stop.y} r="2" fill="#c84b31" />
        </g>
      ))}

      {/* Small automated picking cart doodle */}
      <g transform="translate(148, 104)">
        <rect x="0" y="0" width="18" height="12" rx="2" fill="#3a6ea5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="4" cy="13" r="2" fill="currentColor" />
        <circle cx="14" cy="13" r="2" fill="currentColor" />
      </g>

      {/* Handwritten note */}
      <text x="210" y="32" fontFamily="'Caveat', cursive" fontSize="15" fill="#c84b31">
        Held-Karp: 56.5x faster
      </text>

      <text x="160" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        30,000 NODES EXPANDED · C++17 KERNEL · 0.50MS A* · 144 RPS
      </text>
    </svg>
  );
}

/**
 * 05 — Moneyball Quantitative Alpha & GPU Risk Engine
 * Probability distribution, Merton jump-diffusion, researcher's formula notebook
 */
export function DiagramQuant({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Baseline axis */}
      <line x1="24" y1="126" x2="296" y2="126" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

      {/* Normal Gaussian bell curve */}
      <path
        d="M24 126 C 60 126, 90 122, 120 70 C 145 28, 165 28, 190 70 C 220 122, 250 126, 296 126"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Shaded fat tail (CVaR 99% region) */}
      <path
        d="M24 126 C 50 126, 75 120, 95 95 L 95 126 Z"
        fill="#c84b31"
        opacity="0.22"
        stroke="#c84b31"
        strokeWidth="1.2"
      />

      {/* Tail Risk marker */}
      <line x1="95" y1="126" x2="95" y2="80" stroke="#c84b31" strokeWidth="1.6" strokeDasharray="3 3" />
      <text x="50" y="142" fontFamily="'Caveat', cursive" fontSize="16" fill="#c84b31">
        tail risk 99%
      </text>

      {/* Merton Jump Diffusion Stochastic Formula snippet */}
      <g transform="translate(142, 38) rotate(1)">
        <rect x="0" y="0" width="144" height="42" rx="4" fill="#faf8f3" stroke="currentColor" strokeWidth="1.2" />
        <text x="10" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#4a4540">
          dS = μS dt + σS dW + J dq
        </text>
        <text x="10" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#3a6ea5">
          1,000,000 paths in 29.26 ms
        </text>
      </g>

      {/* 3-State HMM Regime indicators */}
      <g transform="translate(170, 92)">
        <circle cx="12" cy="12" r="9" fill="rgba(200, 75, 49, 0.15)" stroke="#c84b31" strokeWidth="1.4" />
        <text x="12" y="15" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#c84b31">S1</text>

        <path d="M22 12 C 34 8, 44 8, 56 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

        <circle cx="66" cy="12" r="9" fill="rgba(58, 110, 165, 0.15)" stroke="#3a6ea5" strokeWidth="1.4" />
        <text x="66" y="15" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#3a6ea5">S2</text>

        <path d="M76 12 C 88 8, 98 8, 110 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

        <circle cx="120" cy="12" r="9" fill="rgba(212, 168, 67, 0.15)" stroke="#d4a843" strokeWidth="1.4" />
        <text x="120" y="15" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#d4a843">S3</text>
      </g>

      <text x="160" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        0.0359 RANK IC · 1.521 ICIR · 13.58% → 8.59% DRAWDOWN (2.02 SHARPE)
      </text>
    </svg>
  );
}

/**
 * 06 — Fault-Tolerant ML Telemetry Pipeline
 * Stream pipes, Kafka partition routing, Postgres, Zero-loss DLQ shield
 */
export function DiagramPipeline({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Ingestion gateway (Go HTTP) */}
      <g transform="translate(18, 52)">
        <rect x="0" y="0" width="56" height="52" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <text x="28" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#3a6ea5">GO API</text>
        <text x="28" y="38" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">288 RPS</text>
      </g>

      {/* Branching flow to 3 representative partitions of 12 */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M74 78 C 94 78, 102 ${46 + i * 32}, 118 ${46 + i * 32}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Kafka partition box */}
          <rect x="118" y={34 + i * 32} width="66" height="24" rx="4" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
          <text x="151" y={49 + i * 32} fontFamily="'JetBrains Mono', monospace" fontSize="7.5" textAnchor="middle" fill="#4a4540">
            PART-{i * 4}
          </text>
          {/* Output pipe to DB */}
          <path
            d={`M184 ${46 + i * 32} C 200 ${46 + i * 32}, 208 78, 224 78`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Target sink: PostgreSQL 16 */}
      <g transform="translate(224, 52)">
        <rect x="0" y="0" width="56" height="52" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <text x="28" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">PG 16</text>
        <text x="28" y="38" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">900k saved</text>
      </g>

      {/* DLQ safety net / shield on the bottom */}
      <g transform="translate(228, 114)">
        <path d="M12 0 L 24 5 L 24 16 C 24 24, 12 28, 12 28 C 12 28, 0 24, 0 16 L 0 5 Z" fill="#faf8f3" stroke="#c84b31" strokeWidth="1.5" />
        <path d="M6 14 L 10 18 L 18 10" fill="none" stroke="#c84b31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="#c84b31">
          DLQ: 44,493 routed
        </text>
        <text x="30" y="25" fontFamily="'Caveat', cursive" fontSize="13" fill="#c84b31">
          0 valid events lost
        </text>
      </g>

      <text x="160" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        7,117 EPS SUSTAINED · 12 KAFKA PARTITIONS · -54.7% P99 LATENCY
      </text>
    </svg>
  );
}

/**
 * 07 — Workplace Safety Computer Vision Framework
 * Industrial camera tripod, worker with detected PPE, geofenced polygon
 */
export function DiagramSafety({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {/* Geofenced dangerous zone polygon (wavy dashed boundary) */}
      <polygon
        points="32,130 96,86 210,86 274,130"
        fill="rgba(200, 75, 49, 0.08)"
        stroke="#c84b31"
        strokeWidth="1.8"
        strokeDasharray="6 4"
      />
      <text x="44" y="146" fontFamily="'Caveat', cursive" fontSize="15" fill="#c84b31">
        restricted hazard perimeter
      </text>

      {/* Worker stick figure */}
      <g transform="translate(136, 42)">
        {/* Head */}
        <circle cx="16" cy="18" r="9" fill="#faf8f3" stroke="currentColor" strokeWidth="1.8" />
        {/* Hardhat doodle on head */}
        <path d="M5 16 C 5 7, 27 7, 27 16 Z" fill="#d4a843" stroke="currentColor" strokeWidth="1.6" />
        <line x1="3" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {/* Body torso */}
        <line x1="16" y1="27" x2="16" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Safety vest fill */}
        <rect x="10" y="29" width="12" height="18" rx="2" fill="#c84b31" opacity="0.3" stroke="#c84b31" strokeWidth="1.2" />
        {/* Arms */}
        <path d="M4 38 L 16 32 L 28 38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {/* Legs to ground plane */}
        <path d="M7 74 L 16 54 L 25 74" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Foot contact probe dots */}
        <circle cx="7" cy="74" r="2" fill="#3a6ea5" />
        <circle cx="25" cy="74" r="2" fill="#3a6ea5" />
      </g>

      {/* Detection bounding box with confidence score */}
      <rect x="124" y="32" width="56" height="88" rx="4" fill="none" stroke="#3a6ea5" strokeWidth="1.4" strokeDasharray="3 3" />
      <g transform="translate(124, 24)">
        <rect x="0" y="0" width="56" height="12" rx="2" fill="#3a6ea5" />
        <text x="4" y="9" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#faf8f3">person 0.98</text>
      </g>

      {/* Camera on tripod observing from right side */}
      <g transform="translate(268, 64)">
        {/* Camera body */}
        <rect x="0" y="0" width="22" height="14" rx="2" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="11" cy="7" r="3.5" fill="#3a6ea5" />
        {/* Lens cone ray pointing toward worker */}
        <path d="M0 4 L -42 16 M 0 10 L -42 34" stroke="#d4a843" strokeWidth="1" strokeDasharray="3 3" />
        {/* Tripod legs */}
        <line x1="11" y1="14" x2="2" y2="62" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="14" x2="11" y2="62" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="14" x2="20" y2="62" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <text x="160" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#8a8478" textAnchor="middle">
        IEEE RMKMATE 2026 (RECORD 11518869) · DUAL YOLO · TEMPORAL CENTROID TRACKING
      </text>
    </svg>
  );
}

/**
 * Large Illustrated Hero Scene: The Engineer's Studio & Creative Workshop
 * An artist's desk with laptop displaying code, coffee mug, pinned notes,
 * small plant, desk lamp casting warm golden glow, tiny bicycle doodle.
 */
export function WorkbenchArt({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 600 500" className={className} aria-hidden="true">
      {/* Background warm lamp cone light wash */}
      <path
        d="M80 85 L 30 420 L 420 420 Z"
        fill="rgba(212, 168, 67, 0.08)"
        opacity="0.8"
      />

      {/* Main wooden desk surface with hand-drawn perspective */}
      <path
        d="M30 380 C 180 378, 420 378, 570 380 L 595 440 L 5 440 Z"
        fill="#faf8f3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Desk edge front wood plank */}
      <path
        d="M5 440 L 595 440 L 590 455 L 10 455 Z"
        fill="#f0ece3"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Desk legs */}
      <path d="M45 455 L 45 490 M 70 455 L 70 490" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M530 455 L 530 490 M 555 455 L 555 490" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

      {/* Corkboard / back wall pinned notes */}
      <g transform="translate(140, 60)">
        {/* Pinned note 1: Query optimizer plan graph */}
        <g transform="rotate(-3)">
          <rect x="0" y="0" width="130" height="95" rx="3" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="10" r="3" fill="#c84b31" />
          {/* Plan graph doodle */}
          <circle cx="65" cy="28" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M59 34 L 42 52 M 71 34 L 88 52" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="38" cy="56" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="92" cy="56" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="65" y="78" fontFamily="'Caveat', cursive" fontSize="14" fill="#c84b31" textAnchor="middle">
            GNN plan selection
          </text>
        </g>

        {/* Pinned note 2: Little bicycle sketch on graph paper */}
        <g transform="translate(150, 20) rotate(4)">
          <rect x="0" y="0" width="115" height="85" rx="3" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="100" cy="10" r="3" fill="#d4a843" />
          {/* Bicycle line art doodle */}
          <circle cx="32" cy="52" r="14" fill="none" stroke="#2a2520" strokeWidth="1.6" />
          <circle cx="82" cy="52" r="14" fill="none" stroke="#2a2520" strokeWidth="1.6" />
          <path d="M32 52 L 56 52 L 44 28 L 32 52 M 56 52 L 72 28 L 82 52" fill="none" stroke="#2a2520" strokeWidth="1.8" />
          <line x1="68" y1="24" x2="76" y2="24" stroke="#2a2520" strokeWidth="2" strokeLinecap="round" />
          <text x="58" y="78" fontFamily="'Caveat', cursive" fontSize="13" fill="#3a6ea5" textAnchor="middle">
            Free Rider 120Hz!
          </text>
        </g>
      </g>

      {/* Desk lamp on the left */}
      <g transform="translate(48, 70)">
        <path d="M30 310 C 30 260, 20 200, 35 150 C 45 110, 70 85, 95 85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Lamp joints */}
        <circle cx="30" cy="305" r="5" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
        <circle cx="35" cy="150" r="4.5" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
        {/* Lamp shade cone */}
        <path d="M90 70 L 135 95 L 110 125 Z" fill="#f0ece3" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Bulb glow */}
        <circle cx="112" cy="108" r="6" fill="#d4a843" />
        {/* Lamp base */}
        <ellipse cx="30" cy="312" rx="22" ry="7" fill="#faf8f3" stroke="currentColor" strokeWidth="2.2" />
      </g>

      {/* Laptop / Monitor on desk */}
      <g transform="translate(195, 230)">
        {/* Monitor screen */}
        <rect x="0" y="0" width="190" height="125" rx="7" fill="#faf8f3" stroke="currentColor" strokeWidth="2.2" />
        <rect x="8" y="8" width="174" height="102" rx="4" fill="#f0ece3" stroke="currentColor" strokeWidth="1.4" />
        {/* Code editor syntax lines on screen */}
        {[
          { w: 45, c: '#c84b31' },
          { w: 90, c: '#4a4540' },
          { w: 120, c: '#3a6ea5' },
          { w: 75, c: '#4a4540' },
          { w: 105, c: '#d4a843' },
          { w: 60, c: '#c84b31' },
        ].map((line, i) => (
          <line
            key={i}
            x1="18"
            y1={24 + i * 14}
            x2={18 + line.w}
            y2={24 + i * 14}
            stroke={line.c}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
        {/* Laptop stand / keyboard base */}
        <path d="M80 125 L 75 148 L 115 148 L 110 125" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="95" cy="148" rx="36" ry="6" fill="#f0ece3" stroke="currentColor" strokeWidth="1.8" />
      </g>

      {/* Stack of books on the right */}
      <g transform="translate(435, 305)">
        {/* Book 1 (bottom) */}
        <path d="M0 55 L 115 55 L 110 74 L -5 74 Z" fill="#3a6ea5" opacity="0.25" stroke="currentColor" strokeWidth="1.8" />
        <text x="55" y="68" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#4a4540">DISTRIBUTED SYSTEMS</text>
        {/* Book 2 (middle) */}
        <path d="M8 34 L 110 34 L 105 52 L 3 52 Z" fill="#d4a843" opacity="0.3" stroke="currentColor" strokeWidth="1.8" />
        <text x="55" y="47" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#4a4540">DEEP LEARNING / GNN</text>
        {/* Book 3 (top) */}
        <path d="M14 16 L 105 16 L 100 32 L 9 32 Z" fill="#c84b31" opacity="0.2" stroke="currentColor" strokeWidth="1.8" />
        <text x="55" y="27" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#4a4540">DATABASE INTERNALS</text>
      </g>

      {/* Potted succulent plant */}
      <g transform="translate(485, 235)">
        {/* Pot */}
        <path d="M12 40 L 40 40 L 34 68 L 18 68 Z" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
        {/* Plant leaves */}
        <path d="M26 40 C 20 22, 10 18, 6 22 C 4 25, 14 34, 26 40" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M26 40 C 26 18, 26 10, 26 12 C 26 14, 26 28, 26 40" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M26 40 C 32 22, 42 18, 46 22 C 48 25, 38 34, 26 40" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
      </g>

      {/* Coffee mug with steam on desk */}
      <g transform="translate(130, 342)">
        <ellipse cx="20" cy="10" rx="14" ry="5" fill="#faf8f3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 10 L 8 40 C 8 48, 32 48, 32 40 L 34 10" fill="#faf8f3" stroke="currentColor" strokeWidth="1.8" />
        {/* Mug handle */}
        <path d="M33 16 C 44 16, 44 32, 32 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {/* Steam curly lines */}
        <path d="M14 4 C 12 -8, 20 -12, 16 -24" fill="none" stroke="#c84b31" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M24 6 C 22 -6, 28 -10, 26 -20" fill="none" stroke="#c84b31" strokeWidth="1.4" strokeLinecap="round" />
        <text x="46" y="24" fontFamily="'Caveat', cursive" fontSize="14" fill="#c84b31">fuel</text>
      </g>

      {/* Scattered pencil and ruler */}
      <g transform="translate(240, 396) rotate(-4)">
        <rect x="0" y="0" width="110" height="12" rx="1" fill="#faf8f3" stroke="currentColor" strokeWidth="1.4" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1={10 + i * 12} y1="0" x2={10 + i * 12} y2={i % 2 === 0 ? 7 : 4} stroke="currentColor" strokeWidth="0.9" />
        ))}
      </g>

      {/* Handwritten caption bottom right */}
      <text x="480" y="470" fontFamily="'Caveat', cursive" fontSize="22" fill="#c84b31" transform="rotate(-2 480 470)">
        welcome to my workshop ✎
      </text>
    </svg>
  );
}

/**
 * About Section Portrait: Friendly hand-drawn avatar sketch of Amritesh
 */
export function AvatarSketch({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 280 280" className={className} aria-hidden="true">
      {/* Background soft circular wash */}
      <circle cx="140" cy="140" r="120" fill="rgba(212, 168, 67, 0.08)" stroke="currentColor" strokeWidth="1.4" strokeDasharray="6 4" />

      {/* Head shape */}
      <path
        d="M80 114 C 76 56, 134 46, 142 46 C 150 46, 204 56, 200 114 C 196 148, 172 176, 140 176 C 108 176, 84 148, 80 114 Z"
        fill="#faf8f3"
        stroke="currentColor"
        strokeWidth="2.2"
      />

      {/* Hair outline */}
      <path
        d="M84 94 C 80 50, 110 32, 140 32 C 172 32, 202 50, 198 94 C 188 80, 174 84, 164 80 C 150 74, 130 76, 118 82 C 106 88, 92 84, 84 94 Z"
        fill="#2a2520"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Friendly smiling eyes & eyebrows */}
      <path d="M104 98 C 110 94, 120 94, 124 98" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M156 98 C 160 94, 170 94, 176 98" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

      {/* Round engineer glasses */}
      <rect x="98" y="104" width="34" height="26" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
      <rect x="148" y="104" width="34" height="26" rx="6" fill="#faf8f3" stroke="currentColor" strokeWidth="2" />
      {/* Bridge of glasses */}
      <path d="M132 116 L 148 116" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Glasses temples */}
      <path d="M98 114 L 84 108 M 182 114 L 196 108" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Pupils with warm glint */}
      <circle cx="115" cy="117" r="3.5" fill="#2a2520" />
      <circle cx="165" cy="117" r="3.5" fill="#2a2520" />
      <circle cx="116" cy="116" r="1.2" fill="#faf8f3" />
      <circle cx="166" cy="116" r="1.2" fill="#faf8f3" />

      {/* Nose */}
      <path d="M140 124 C 142 134, 144 136, 136 138" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

      {/* Friendly smile */}
      <path d="M124 150 C 134 160, 146 160, 156 150" fill="none" stroke="#c84b31" strokeWidth="2.2" strokeLinecap="round" />

      {/* Pencil tucked behind right ear */}
      <g transform="translate(192, 88) rotate(-35)">
        <rect x="0" y="0" width="38" height="6" rx="1" fill="#d4a843" stroke="currentColor" strokeWidth="1.4" />
        <polygon points="38,0 46,3 38,6" fill="#2a2520" stroke="currentColor" strokeWidth="1.2" />
      </g>

      {/* Torso / collar with casual jacket */}
      <path
        d="M100 174 C 70 195, 48 238, 40 268 L 240 268 C 232 238, 210 195, 180 174"
        fill="#faf8f3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Shirt collar V-neck */}
      <path d="M140 176 L 126 210 L 140 268 M 140 176 L 154 210 L 140 268" stroke="currentColor" strokeWidth="1.8" />

      {/* Handwritten caption */}
      <text x="140" y="274" fontFamily="'Caveat', cursive" fontSize="18" fill="#c84b31" textAnchor="middle">
        Amritesh · systems &amp; ML
      </text>
    </svg>
  );
}

/**
 * Hand-drawn flagpole doodle
 */
export function FlagDoodle({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 40 60" className={className} aria-hidden="true">
      <line x1="12" y1="6" x2="12" y2="56" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M12 8 C 22 4, 30 14, 36 10 C 32 18, 24 16, 12 24 Z"
        fill="#c84b31"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
