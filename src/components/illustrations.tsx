// Original hand-drawn line-art SVGs. stroke="currentColor" so they ink themselves
// against the paper. Wobbly paths on purpose — this is a sketchbook, not a design system.

type ArtProps = { className?: string };

export function MarkLogo({ className = 'w-8 h-8' }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="59" height="59" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M6 46 C 16 46, 22 34, 32 34 S 48 46, 58 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="19" cy="47" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="45" cy="47" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="46" y1="12" x2="46" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 12 L60 17 L46 23 Z" fill="#D9381E" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

/* ---------- Project diagrams (gallery cards + notebook headers) ---------- */

export function DiagramNeural({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <path {...S} d="M20 85 Q 60 85 85 60" />
      <path {...S} d="M20 85 Q 60 88 85 112" />
      <rect {...S} x="85" y="42" width="52" height="26" rx="2" />
      <rect {...S} x="85" y="100" width="52" height="26" rx="2" />
      <path {...S} d="M137 55 Q 168 55 186 68" />
      <path {...S} d="M137 113 Q 168 113 186 96" />
      <path {...S} d="M186 78 L 210 78" />
      <rect {...S} x="210" y="62" width="60" height="30" rx="2" />
      <text x="30" y="89" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">SCAN</text>
      <text x="92" y="58" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">σ join</text>
      <text x="92" y="116" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">σ filter</text>
      <text x="196" y="70" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">π</text>
      <rect x="218" y="68" width="44" height="18" fill="#D9381E" opacity="0.14" />
      <text x="222" y="80" fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">Hash J.</text>
      <path {...S} strokeDasharray="3 4" d="M240 92 Q 240 128 120 140 Q 60 146 30 128" />
      <circle cx="30" cy="128" r="3" fill="#D9381E" />
      <text x="244" y="130" fontFamily="'Caveat'" fontSize="17" fill="#D9381E">cheaper plan?</text>
      <path {...S} strokeWidth="1.2" d="M238 122 Q 228 110 226 96" />
      <text x="20" y="160" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">184 PLANS · GCN/GAT/GRAPHSAGE</text>
    </svg>
  );
}

export function DiagramControl({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <rect {...S} x="16" y="16" width="288" height="104" rx="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="28"
          y={28 + i * 15}
          width={[150, 90, 200, 60, 120, 40][i]}
          height="8"
          fill={i === 2 ? '#18528C' : i === 4 ? '#D9381E' : '#1A1A1A'}
          opacity={i === 2 || i === 4 ? 0.75 : 0.3}
        />
      ))}
      <path {...S} strokeWidth="1.2" d="M16 100 L 304 100" strokeDasharray="2 4" />
      <text x="248" y="97" fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">p99 = 5ms</text>
      {/* circuit breakers */}
      <rect {...S} x="40" y="132" width="46" height="22" rx="2" />
      <path {...S} d="M52 154 L 52 140 M 52 140 L 74 136" />
      <circle cx="76" cy="136" r="2.5" fill="#1A1A1A" />
      <text x="94" y="147" fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">BREAKER 01</text>
      <rect {...S} x="170" y="132" width="46" height="22" rx="2" />
      <path {...S} d="M182 154 L 182 140 L 204 140" />
      <text x="224" y="147" fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">BREAKER 02</text>
      <text x="16" y="168" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">OTLP → WAL → PARQUET · 50K SPANS/SEC</text>
    </svg>
  );
}

export function DiagramTrade({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      {[
        [30, 110, 26], [58, 92, 34], [86, 104, 30], [114, 78, 40], [142, 88, 32],
        [170, 60, 42], [198, 74, 28], [226, 52, 44],
      ].map(([x, y, h], i) => (
        <g key={i}>
          <line x1={x + 7} y1={y - 12} x2={x + 7} y2={y + h + 12} stroke="currentColor" strokeWidth="1.2" />
          <rect x={x} y={y} width="14" height={h} fill={i % 3 === 1 ? '#D9381E' : '#1A1A1A'} opacity={i % 3 === 1 ? 0.85 : 0.25} stroke="currentColor" strokeWidth="1.2" />
        </g>
      ))}
      <path {...S} strokeDasharray="4 3" d="M30 96 Q 120 70 240 58" />
      <rect {...S} x="248" y="20" width="58" height="74" rx="2" />
      {['PEND', 'NEW', 'PFILL', 'FILL'].map((s, i) => (
        <g key={s}>
          <rect x="256" y={28 + i * 17} width="42" height="12" fill={i === 3 ? '#D9381E' : 'none'} opacity={i === 3 ? 0.15 : 0} stroke="currentColor" strokeWidth="1" />
          <text x="260" y={37 + i * 17} fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">{s}</text>
        </g>
      ))}
      <text x="18" y="158" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">113 NS/OP FSM · 311 NS/OP RISK · FIX 4.2</text>
    </svg>
  );
}

export function DiagramWarehouse({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <rect {...S} x="16" y="14" width="288" height="130" rx="2" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} {...S} x={44 + c * 86} y={30 + r * 38} width="58" height="20" opacity="0.85" />
        ))
      )}
      <path {...S} stroke="#D9381E" strokeWidth="2" strokeDasharray="5 4" d="M28 132 L 92 132 L 92 118 L 180 118 L 180 104 L 264 104 L 264 26 L 292 26" />
      <circle cx="28" cy="132" r="4" fill="#D9381E" />
      <rect x="288" y="20" width="9" height="9" fill="none" stroke="#18528C" strokeWidth="2" />
      <text x="24" y="30" fontFamily="'Caveat'" fontSize="16" fill="#18528C">dock</text>
      <text x="250" y="16" fontFamily="'Caveat'" fontSize="16" fill="#D9381E">A* + 2-opt</text>
      <text x="18" y="160" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">31× A* · 56.5× HELD-KARP · 144 RPS</text>
    </svg>
  );
}

export function DiagramQuant({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <path {...S} d="M20 120 C 70 120 80 40 130 40 C 180 40 190 120 240 120 C 270 120 290 118 300 118" />
      <line x1="20" y1="120" x2="300" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <path d="M118 120 C 122 96 138 96 142 120 Z" fill="#D9381E" opacity="0.2" stroke="#D9381E" strokeWidth="1.2" />
      <line x1="150" y1="120" x2="150" y2="64" stroke="#18528C" strokeWidth="2" strokeDasharray="4 3" />
      <text x="155" y="66" fontFamily="'JetBrains Mono'" fontSize="9" fill="#18528C">CVaR 99%</text>
      <text x="96" y="140" fontFamily="'Caveat'" fontSize="16" fill="#D9381E">tail risk</text>
      <text x="196" y="60" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">dS = μS dt + σS dW + J</text>
      <path {...S} strokeWidth="1.1" d="M60 36 Q 66 28 74 34 Q 82 26 88 32" />
      <text x="52" y="24" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">HMM · 3 STATES</text>
      <text x="18" y="160" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">IC 0.0359 · ICIR 1.521 · DD 8.59%</text>
    </svg>
  );
}

export function DiagramPipeline({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <rect {...S} x="16" y="52" width="58" height="60" rx="2" />
      <text x="26" y="86" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">GO API</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect {...S} x="106" y={34 + i * 34} width="70" height="22" rx="2" />
          <text x="112" y={48 + i * 34} fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">PART-{i}</text>
          <path {...S} d={`M74 82 Q 90 82 92 ${45 + i * 34 + 11} L 106 ${45 + i * 34 + 11}`} />
        </g>
      ))}
      <rect {...S} x="208" y="52" width="58" height="60" rx="2" />
      <text x="216" y="86" fontFamily="'JetBrains Mono'" fontSize="9" fill="currentColor">PG 16</text>
      <path {...S} d="M176 45 Q 192 45 196 66 L 208 70" />
      <path {...S} d="M176 79 L 208 79" />
      <path {...S} d="M176 113 Q 192 113 196 92 L 208 88" />
      <circle cx="292" cy="66" r="4" fill="none" stroke="#D9381E" strokeWidth="2" />
      <text x="256" y="46" fontFamily="'JetBrains Mono'" fontSize="8" fill="#D9381E">DLQ</text>
      <path {...S} stroke="#D9381E" strokeWidth="1.2" strokeDasharray="3 3" d="M266 82 L 288 70" />
      <text x="18" y="160" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">7,117 EPS SUSTAINED · 0 LOST · 310S RUN</text>
    </svg>
  );
}

export function DiagramSafety({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <path {...S} stroke="#D9381E" strokeDasharray="6 4" d="M30 140 L 90 96 L 190 96 L 250 140 Z" />
      <text x="34" y="158" fontFamily="'Caveat'" fontSize="16" fill="#D9381E">restricted zone</text>
      {/* stick figure with hardhat */}
      <circle {...S} cx="136" cy="52" r="12" />
      <path {...S} d="M120 50 Q 136 34 152 50" fill="#1A1A1A" opacity="0.85" />
      <path {...S} d="M136 64 L 136 104 M 136 74 L 112 92 M 136 74 L 160 92 M 136 104 L 120 132 M 136 104 L 152 132" />
      <rect x="108" y="40" width="56" height="26" fill="none" stroke="#18528C" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="112" y="36" fontFamily="'JetBrains Mono'" fontSize="8" fill="#18528C">person 0.98</text>
      <rect x="120" y="42" width="32" height="12" fill="none" stroke="#D9381E" strokeWidth="1.2" />
      <text x="168" y="50" fontFamily="'JetBrains Mono'" fontSize="8" fill="#D9381E">hardhat</text>
      {/* camera tower */}
      <path {...S} d="M268 140 L 276 84 L 284 140 M 268 96 L 284 96" />
      <rect {...S} x="272" y="72" width="16" height="10" />
      <path {...S} strokeWidth="1.2" d="M272 74 L 250 84" strokeDasharray="3 3" />
      <text x="18" y="30" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">PPE DETECTION · GEOFENCING · TRACKING</text>
    </svg>
  );
}

/* ---------- Hero workbench scene ---------- */

export function WorkbenchArt({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 560 470" className={className} aria-hidden="true">
      {/* drafting board */}
      <path {...S} strokeWidth="2" d="M40 380 L 520 380 L 545 430 L 15 430 Z" />
      <path {...S} strokeWidth="1.2" d="M40 380 L 15 430 M 520 380 L 545 430" />
      {/* pinned sheet: query tree */}
      <g transform="translate(70 96) rotate(-3)">
        <rect {...S} width="220" height="150" fill="#FBF9F4" />
        <circle cx="18" cy="18" r="3" fill="#D9381E" />
        <path {...S} strokeWidth="1.4" d="M30 40 L 60 40 M 45 40 L 45 60 M 30 60 L 90 60 M 45 60 L 45 84 M 30 84 L 100 84" />
        <rect {...S} strokeWidth="1.2" x="100" y="76" width="64" height="16" />
        <text x="104" y="87" fontFamily="'JetBrains Mono'" fontSize="8" fill="currentColor">Hash Join</text>
        <text x="30" y="118" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">EXPLAIN ANALYZE…</text>
        <text x="120" y="136" fontFamily="'Caveat'" fontSize="16" fill="#D9381E">cost ↓ 2.17×</text>
      </g>
      {/* pinned sheet: track doodle */}
      <g transform="translate(310 130) rotate(2)">
        <rect {...S} width="180" height="120" fill="#FBF9F4" />
        <path {...S} strokeWidth="1.6" d="M14 84 C 40 84 48 60 76 60 S 130 84 166 84" />
        <circle cx="46" cy="86" r="7" {...S} strokeWidth="1.4" />
        <circle cx="120" cy="86" r="7" {...S} strokeWidth="1.4" />
        <path {...S} strokeWidth="1.4" d="M46 86 L 76 66 L 120 86" />
        <line x1="140" y1="30" x2="140" y2="48" stroke="currentColor" strokeWidth="1.4" />
        <path d="M140 30 L 156 36 L 140 42 Z" fill="#D9381E" stroke="currentColor" strokeWidth="1" />
      </g>
      {/* database cylinders */}
      <g transform="translate(316 268)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 44} ${-i * 14})`}>
            <ellipse {...S} strokeWidth="1.4" cx="20" cy="8" rx="20" ry="7" />
            <path {...S} strokeWidth="1.4" d="M0 8 L 0 40 Q 20 50 40 40 L 40 8" />
          </g>
        ))}
        <text x="8" y="66" fontFamily="'JetBrains Mono'" fontSize="8" opacity="0.6">plans.db</text>
      </g>
      {/* coffee */}
      <g transform="translate(236 316)">
        <ellipse cx="22" cy="30" rx="34" ry="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="3 3" />
        <path {...S} d="M6 0 L 10 26 Q 22 32 34 26 L 38 0" />
        <path {...S} strokeWidth="1.2" d="M38 6 Q 48 8 44 16 Q 41 21 35 18" />
        <text x="46" y="24" fontFamily="'Caveat'" fontSize="15" fill="#D9381E">fuel</text>
      </g>
      {/* ruler + pencil */}
      <g transform="translate(60 352) rotate(-1)">
        <rect {...S} strokeWidth="1.4" width="130" height="14" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={12 + i * 16} y1="0" x2={12 + i * 16} y2={i % 2 ? 6 : 9} stroke="currentColor" strokeWidth="1" />
        ))}
      </g>
      <g transform="translate(420 348) rotate(8)">
        <path {...S} d="M0 6 L 84 6 L 84 12 L 12 12 L 0 9 Z" />
        <path d="M84 6 L 96 9 L 84 12 Z" fill="#1A1A1A" />
      </g>
      {/* lamp */}
      <g transform="translate(26 60)">
        <path {...S} d="M10 160 L 10 60 Q 10 30 40 30 L 58 30" />
        <path {...S} d="M56 18 L 92 34 L 74 58 Z" fill="#F4F1EA" />
        <path d="M60 24 L 86 36 L 74 52 Z" fill="#D9381E" opacity="0.25" />
        <path {...S} strokeWidth="1.2" strokeDasharray="2 4" d="M74 58 Q 96 110 150 300" />
      </g>
      {/* annotation */}
      <text x="332" y="446" fontFamily="'Caveat'" fontSize="20" fill="#D9381E">fig. 01 — the desk</text>
    </svg>
  );
}

/* ---------- About avatar sketch ---------- */

export function AvatarSketch({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 260 260" className={className} aria-hidden="true">
      <path {...S} strokeWidth="2" d="M70 108 Q 66 44 130 42 Q 194 44 190 108 Q 188 132 176 148 Q 160 170 130 170 Q 100 170 84 148 Q 72 132 70 108 Z" />
      <path {...S} d="M64 108 Q 78 96 84 108 M 176 108 Q 188 96 196 108" />
      <path {...S} strokeWidth="2" d="M96 44 Q 130 22 168 42 Q 182 50 190 70 Q 176 60 160 62 Q 130 66 108 60 Q 96 58 88 66 Q 82 56 96 44 Z" fill="#1A1A1A" opacity="0.85" />
      {/* glasses */}
      <rect {...S} x="94" y="96" width="30" height="22" rx="3" />
      <rect {...S} x="138" y="96" width="30" height="22" rx="3" />
      <path {...S} strokeWidth="1.4" d="M124 106 L 138 106 M 94 102 L 84 98 M 168 102 L 178 98" />
      <path {...S} strokeWidth="1.6" d="M118 146 Q 130 154 144 146" />
      {/* collar / torso */}
      <path {...S} strokeWidth="2" d="M96 166 Q 60 186 50 232 L 210 232 Q 200 186 164 166" />
      <path {...S} strokeWidth="1.6" d="M130 170 L 118 200 L 130 232 M 130 170 L 142 200 L 130 232" />
      {/* pencil behind ear */}
      <path {...S} strokeWidth="1.4" d="M178 84 L 196 52 L 202 56 L 184 88" />
      <text x="152" y="128" fontFamily="'Caveat'" fontSize="15" fill="#D9381E">fig. 02 — the engineer</text>
    </svg>
  );
}

export function FlagDoodle({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 40 60" className={className} aria-hidden="true">
      <line x1="12" y1="6" x2="12" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M13 7 L 36 14 L 13 22 Z" fill="#D9381E" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
