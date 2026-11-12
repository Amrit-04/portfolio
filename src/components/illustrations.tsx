// Master Hand-Drawn Illustrated World Artwork Components
// Inspired by the artisanal craftsmanship of Tiago Fragoso's portfolio and Free Rider HD.
// Rich organic bezier linework, cross-hatching, stippling, architectural drafting textures,
// and warm ink washes.

type ArtProps = { className?: string; ariaHidden?: boolean };

/**
 * Hand-drawn artist monogram "AY" with a playful bicycle flourish
 */
export function MarkLogo({ className = 'w-8 h-8' }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 4 C 47 3.5, 59 15, 60 31 C 61 48, 48 60, 31 60 C 14 60, 3.5 48, 4 32 C 4.5 16, 16 4.5, 32 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
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
      <path
        d="M36 17 C 38 24, 40 28, 42 31 M 48 17 C 46 23, 44 28, 42 31 C 42 36, 41 42, 40 45 C 39.5 47, 37 48, 35 47"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="49" cy="45" r="5" fill="none" stroke="#c84b31" strokeWidth="1.6" />
      <circle cx="49" cy="45" r="1.2" fill="#c84b31" />
    </svg>
  );
}

/**
 * THE GRAND WORKSHOP ENTRANCE (HERO SCENE)
 * A rich architectural facade of an engineer's creative studio and workshop.
 * Paved cobblestones, brickwork facade, arched doorway showing inner workshop screens,
 * hand-carved wooden sign with Amritesh's name, classic bicycle leaning outside,
 * and directional wooden signposts pointing to the exhibitions and the 2D game track.
 */
export function WorkshopEntranceHeroArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 1020 540" className={className} aria-hidden="true">
      <defs>
        {/* Soft paper texture wash */}
        <pattern id="brick-pat" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 L40 10 M20 0 L20 10 M0 20 L40 20 M40 10 L40 20 M0 0 L0 10" fill="none" stroke="rgba(74,69,64,0.12)" strokeWidth="1" />
        </pattern>
        <pattern id="roof-shingles" width="24" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 C6 7, 18 7, 24 14" fill="none" stroke="rgba(74,69,64,0.18)" strokeWidth="1.2" />
        </pattern>
      </defs>

      {/* Sky & background subtle sketch clouds */}
      <g stroke="rgba(74,69,64,0.22)" fill="none" strokeWidth="1.4" strokeLinecap="round">
        <path d="M60 80 C90 70, 140 75, 170 85 C200 70, 260 75, 290 90" />
        <path d="M720 60 C750 50, 810 52, 840 65 C870 55, 930 60, 950 75" />
      </g>

      {/* Workshop Main Building Facade */}
      <rect x="180" y="110" width="660" height="370" fill="#faf8f3" stroke="#2a2520" strokeWidth="3.2" rx="4" />
      {/* Brick texture fill */}
      <rect x="180" y="110" width="660" height="370" fill="url(#brick-pat)" />

      {/* Pitched Timber Roof & Chimney */}
      <polygon points="150,110 510,20 870,110" fill="#f0ece3" stroke="#2a2520" strokeWidth="3.2" strokeLinejoin="round" />
      <polygon points="150,110 510,20 870,110" fill="url(#roof-shingles)" />
      {/* Roof fascia board & decorative ridge beam */}
      <line x1="140" y1="112" x2="880" y2="112" stroke="#2a2520" strokeWidth="4" strokeLinecap="round" />
      <line x1="510" y1="20" x2="510" y2="10" stroke="#c84b31" strokeWidth="3" strokeLinecap="round" />
      <circle cx="510" cy="8" r="4" fill="#c84b31" />

      {/* Chimney on the right with gentle smoke curls */}
      <rect x="760" y="35" width="46" height="55" fill="#e8e2d6" stroke="#2a2520" strokeWidth="2.5" />
      <rect x="754" y="30" width="58" height="10" rx="2" fill="#2a2520" />
      <path d="M783 25 C780 12, 800 8, 795 -5 C790 -16, 815 -20, 810 -35" fill="none" stroke="rgba(74,69,64,0.35)" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />

      {/* Arched Workshop Double Entrance */}
      <g>
        {/* Stone arch lintel */}
        <path d="M370 480 L370 240 C370 170, 650 170, 650 240 L650 480 Z" fill="#2a2520" stroke="#2a2520" strokeWidth="3" />
        {/* Arch voussoirs (hand-drawn decorative stones) */}
        <path d="M358 240 C358 152, 662 152, 662 240" fill="none" stroke="#2a2520" strokeWidth="10" strokeDasharray="14 4" />

        {/* Interior glowing workshop backdrop */}
        <path d="M380 480 L380 244 C380 185, 640 185, 640 244 L640 480 Z" fill="#1c1917" />
        {/* Warm amber light glow from ceiling */}
        <radialGradient id="workshop-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(212,168,67,0.4)" />
          <stop offset="60%" stopColor="rgba(200,75,49,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <path d="M380 480 L380 244 C380 185, 640 185, 640 244 L640 480 Z" fill="url(#workshop-glow)" />

        {/* Interior Workshop Details: Workbench, Monitors, CRT Scope, Shelves */}
        {/* Industrial hanging pendant lamp */}
        <line x1="510" y1="185" x2="510" y2="235" stroke="#faf8f3" strokeWidth="1.8" />
        <path d="M495 235 L525 235 L530 248 L490 248 Z" fill="#d4a843" stroke="#faf8f3" strokeWidth="1.2" />
        <circle cx="510" cy="250" r="4" fill="#faf8f3" />

        {/* Workbench inside */}
        <rect x="410" y="380" width="200" height="12" fill="#4a4540" stroke="#2a2520" strokeWidth="1.5" />
        <line x1="430" y1="392" x2="430" y2="480" stroke="#4a4540" strokeWidth="3" />
        <line x1="590" y1="392" x2="590" y2="480" stroke="#4a4540" strokeWidth="3" />

        {/* Terminal Screen showing live code & GNN tree */}
        <rect x="425" y="320" width="70" height="58" rx="3" fill="#0f172a" stroke="#4a4540" strokeWidth="2" />
        <rect x="430" y="325" width="60" height="48" fill="#020617" />
        {/* Terminal prompt lines */}
        <line x1="434" y1="334" x2="455" y2="334" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="434" y1="342" x2="480" y2="342" stroke="#38bdf8" strokeWidth="1.2" />
        <line x1="434" y1="349" x2="470" y2="349" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="434" y1="356" x2="460" y2="356" stroke="#22c55e" strokeWidth="1.2" />
        <rect x="464" y="354" width="4" height="6" fill="#22c55e" />

        {/* CRT Oscilloscope showing telemetry wave */}
        <rect x="525" y="330" width="65" height="48" rx="4" fill="#1e293b" stroke="#4a4540" strokeWidth="2" />
        <circle cx="558" cy="354" r="18" fill="#022c22" stroke="#059669" strokeWidth="1.4" />
        {/* Green sine trace */}
        <path d="M542 354 Q546 342, 550 354 T558 354 T566 354 T574 354" fill="none" stroke="#10b981" strokeWidth="1.4" />

        {/* Open wooden double doors folded back */}
        <g stroke="#2a2520" strokeWidth="2.4" fill="#faf8f3">
          {/* Left open door leaf */}
          <polygon points="340,480 340,240 380,248 380,480" />
          <line x1="340" y1="300" x2="380" y2="304" />
          <line x1="340" y1="420" x2="380" y2="422" />
          <circle cx="372" cy="360" r="3" fill="#2a2520" />
          {/* Right open door leaf */}
          <polygon points="680,480 680,240 640,248 640,480" />
          <line x1="680" y1="300" x2="640" y2="304" />
          <line x1="680" y1="420" x2="640" y2="422" />
          <circle cx="648" cy="360" r="3" fill="#2a2520" />
        </g>
      </g>

      {/* MASTER HAND-CARVED WOODEN STUDIO SIGNBOARD OVER DOORWAY */}
      <g id="master-studio-sign">
        {/* Wrought iron hanging brackets */}
        <path d="M360 120 C360 145, 385 145, 385 160" fill="none" stroke="#2a2520" strokeWidth="3" strokeLinecap="round" />
        <path d="M660 120 C660 145, 635 145, 635 160" fill="none" stroke="#2a2520" strokeWidth="3" strokeLinecap="round" />
        {/* Wooden main signboard plate */}
        <rect x="300" y="148" width="420" height="64" rx="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="3" />
        <rect x="306" y="154" width="408" height="52" rx="3" fill="none" stroke="#c84b31" strokeWidth="1.4" strokeDasharray="8 3" />
        {/* Carved rivets */}
        <circle cx="314" cy="162" r="2.5" fill="#2a2520" />
        <circle cx="706" cy="162" r="2.5" fill="#2a2520" />
        <circle cx="314" cy="198" r="2.5" fill="#2a2520" />
        <circle cx="706" cy="198" r="2.5" fill="#2a2520" />
        {/* Hand-lettered Title */}
        <text x="510" y="180" fontFamily="'Playfair Display', Georgia, serif" fontSize="21" fontWeight="800" textAnchor="middle" fill="#2a2520" letterSpacing="0.08em">
          AMRITESH KUMAR YADAV
        </text>
        <text x="510" y="196" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="600" textAnchor="middle" fill="#c84b31" letterSpacing="0.18em">
          ENGINEERING WORKSHOP · AI/ML &amp; SYSTEMS
        </text>
      </g>

      {/* Left Wall Features: Large Multi-Pane Studio Window & Pinned Blueprints */}
      <g>
        {/* Studio Window with arched top */}
        <path d="M215 320 L215 220 C215 190, 315 190, 315 220 L315 320 Z" fill="#e8e2d6" stroke="#2a2520" strokeWidth="2.5" />
        {/* Window muntins */}
        <line x1="265" y1="195" x2="265" y2="320" stroke="#2a2520" strokeWidth="2" />
        <line x1="215" y1="250" x2="315" y2="250" stroke="#2a2520" strokeWidth="2" />
        <line x1="215" y1="285" x2="315" y2="285" stroke="#2a2520" strokeWidth="2" />
        {/* Window sill */}
        <rect x="208" y="320" width="114" height="8" rx="2" fill="#2a2520" />

        {/* Pinned Engineering Blueprints on left brick wall */}
        <g transform="translate(220, 350) rotate(-4)">
          <rect x="0" y="0" width="70" height="90" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.4" />
          {/* Blue drafting tape */}
          <rect x="22" y="-4" width="26" height="8" fill="rgba(58,110,165,0.7)" />
          {/* Sketched graph & equations */}
          <path d="M10 20 L25 40 L45 25 L60 55" fill="none" stroke="#3a6ea5" strokeWidth="1.4" />
          <circle cx="25" cy="40" r="2" fill="#3a6ea5" />
          <circle cx="45" cy="25" r="2" fill="#3a6ea5" />
          <text x="35" y="74" fontFamily="'Caveat', cursive" fontSize="11" textAnchor="middle" fill="#2a2520">
            GNN Plan Tree
          </text>
        </g>
      </g>

      {/* Right Wall Features: Lantern, Notice Board & Pinned Metric Slips */}
      <g>
        {/* Ornamental Wrought Iron Wall Lantern */}
        <path d="M720 220 L742 220 L742 245" fill="none" stroke="#2a2520" strokeWidth="2.5" />
        <polygon points="730,245 754,245 760,280 724,280" fill="#d4a843" stroke="#2a2520" strokeWidth="2" />
        <line x1="742" y1="280" x2="742" y2="295" stroke="#2a2520" strokeWidth="2" />
        <circle cx="742" cy="262" r="5" fill="#faf8f3" />

        {/* Pinned Verified Systems Metric Notice Board */}
        <g transform="translate(710, 310) rotate(3)">
          <rect x="0" y="0" width="100" height="125" fill="#f0ece3" stroke="#2a2520" strokeWidth="2" />
          {/* Pushpin */}
          <circle cx="50" cy="8" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />
          <text x="50" y="24" fontFamily="'Playfair Display', Georgia, serif" fontSize="10" fontWeight="700" textAnchor="middle" fill="#2a2520">
            STUDIO VERIFIED
          </text>
          <line x1="14" y1="30" x2="86" y2="30" stroke="#2a2520" strokeWidth="1" />
          <text x="14" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">✓ 113 ns OMS FSM</text>
          <text x="14" y="58" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">✓ 311 ns Risk Lua</text>
          <text x="14" y="72" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">✓ 5.37 ms p99 Go</text>
          <text x="14" y="86" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">✓ 29.26 ms 1M CUDA</text>
          <text x="14" y="100" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">✓ 31x C++ A* Path</text>
          <text x="50" y="116" fontFamily="'Caveat', cursive" fontSize="11" textAnchor="middle" fill="#c84b31">
            zero fabrication
          </text>
        </g>
      </g>

      {/* CLASSIC BICYCLE LEANING AGAINST THE WORKSHOP WALL (Inspired by Free Rider HD) */}
      <g id="hero-bicycle" transform="translate(620, 395)">
        {/* Rear Wheel with detailed spokes */}
        <circle cx="40" cy="55" r="28" fill="none" stroke="#2a2520" strokeWidth="3" />
        <circle cx="40" cy="55" r="24" fill="none" stroke="rgba(74,69,64,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="40" cy="55" r="4" fill="#2a2520" />
        {/* Front Wheel */}
        <circle cx="150" cy="55" r="28" fill="none" stroke="#2a2520" strokeWidth="3" />
        <circle cx="150" cy="55" r="24" fill="none" stroke="rgba(74,69,64,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="150" cy="55" r="4" fill="#2a2520" />

        {/* Bicycle Diamond Frame in signature red */}
        <g stroke="#c84b31" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Chainstay: rear wheel to bottom bracket */}
          <line x1="40" y1="55" x2="88" y2="55" />
          {/* Seatstay: rear wheel to seat lug */}
          <line x1="40" y1="55" x2="74" y2="18" />
          {/* Seat tube: seat lug to bottom bracket */}
          <line x1="74" y1="18" x2="88" y2="55" />
          {/* Top tube: seat lug to head tube */}
          <line x1="74" y1="18" x2="135" y2="18" />
          {/* Down tube: head tube to bottom bracket */}
          <line x1="135" y1="18" x2="88" y2="55" />
          {/* Front fork: head tube to front wheel */}
          <line x1="135" y1="18" x2="150" y2="55" />
        </g>

        {/* Crankset & Chainring */}
        <circle cx="88" cy="55" r="8" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
        <line x1="88" y1="55" x2="80" y2="68" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="76" y1="68" x2="84" y2="68" stroke="#2a2520" strokeWidth="3" strokeLinecap="round" />

        {/* Leather Saddle */}
        <path d="M60 14 C66 12, 85 12, 85 16 C85 18, 76 19, 70 19 Z" fill="#2a2520" stroke="#2a2520" strokeWidth="1.5" />
        <line x1="74" y1="18" x2="74" y2="24" stroke="#2a2520" strokeWidth="2.5" />

        {/* Drop Handlebars & Stem */}
        <line x1="135" y1="18" x2="136" y2="8" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M136 8 C144 6, 148 14, 142 22" fill="none" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />

        {/* Lean kickstand */}
        <line x1="82" y1="56" x2="94" y2="82" stroke="#2a2520" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* COBBLESTONE GROUND & STREET PAVEMENT */}
      <g stroke="#2a2520" strokeWidth="2.8" strokeLinecap="round" fill="none">
        {/* Main ground line */}
        <line x1="40" y1="480" x2="980" y2="480" />
        {/* Stepping curb */}
        <line x1="60" y1="495" x2="960" y2="495" strokeWidth="1.8" />
        {/* Cobblestone texture loops */}
        <g stroke="rgba(74,69,64,0.3)" strokeWidth="1.2">
          <path d="M140 508 C155 502, 175 502, 190 508 M200 514 C215 508, 235 508, 250 514" />
          <path d="M420 508 C440 502, 460 502, 480 508 M510 514 C530 508, 550 508, 570 514" />
          <path d="M780 508 C800 502, 820 502, 840 508 M870 514 C890 508, 910 508, 930 514" />
        </g>
      </g>

      {/* FOREGROUND WOODEN SIGNPOST WITH DIRECTIONAL ARROWS */}
      <g id="directional-signpost" transform="translate(100, 360)">
        {/* Vertical wooden post rooted in ground */}
        <rect x="36" y="0" width="12" height="135" fill="#e8e2d6" stroke="#2a2520" strokeWidth="2.2" />
        <polygon points="36,0 42,-10 48,0" fill="#2a2520" stroke="#2a2520" strokeWidth="1" />

        {/* Arrow 1: Pointing right to the Exhibition Wall */}
        <g transform="translate(42, 18)">
          <path d="M0 0 L150 0 L168 15 L150 30 L0 30 Z" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
          <circle cx="8" cy="15" r="2.5" fill="#2a2520" />
          <text x="20" y="19" fontFamily="'Playfair Display', Georgia, serif" fontSize="10.5" fontWeight="700" fill="#2a2520">
            → The Exhibition (7 Systems)
          </text>
        </g>

        {/* Arrow 2: Pointing to the 2D Game Track */}
        <g transform="translate(42, 56)">
          <path d="M0 0 L155 0 L173 15 L155 30 L0 30 Z" fill="#f0ece3" stroke="#c84b31" strokeWidth="2" />
          <circle cx="8" cy="15" r="2.5" fill="#c84b31" />
          <text x="20" y="19" fontFamily="'Playfair Display', Georgia, serif" fontSize="10.5" fontWeight="700" fill="#c84b31">
            🚲 Play Free Rider Track
          </text>
        </g>

        {/* Pinned Blueprint Scroll on post */}
        <g transform="translate(40, 96)">
          <rect x="-10" y="0" width="130" height="24" rx="4" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.8" />
          <text x="55" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600" textAnchor="middle" fill="#3a6ea5">
            📄 Verified Resume &amp; Specs
          </text>
        </g>
      </g>

      {/* Whimsical hand-written marginal note in the margin */}
      <g transform="translate(740, 498)">
        <text x="0" y="0" fontFamily="'Caveat', cursive" fontSize="16" fill="#c84b31" transform="rotate(-3)">
          drawn by hand · built for production ↗
        </text>
      </g>
    </svg>
  );
}

/**
 * 01 — THE GRAND DRAFTING EASEL & LIVING TREE BLUEPRINT
 * (Neural Database Query Optimizer)
 * A massive wooden drafting easel holding an architectural vellum sheet.
 * A living query plan tree physically grows upwards from disk cylinder roots
 * into join trunks and leafy analytical query branches.
 */
export function TreeEaselArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Wooden Drafting Easel Frame */}
      <g stroke="#2a2520" strokeWidth="3" fill="#e8e2d6" strokeLinejoin="round">
        {/* Left easel leg */}
        <line x1="80" y1="410" x2="220" y2="40" strokeLinecap="round" />
        {/* Right easel leg */}
        <line x1="600" y1="410" x2="460" y2="40" strokeLinecap="round" />
        {/* Back stay leg */}
        <line x1="340" y1="40" x2="340" y2="420" stroke="#4a4540" strokeWidth="2.5" strokeDasharray="6 4" />
        {/* Cross support beam */}
        <line x1="120" y1="360" x2="560" y2="360" strokeLinecap="round" />
        {/* Wooden drawing board ledge with pencil groove */}
        <rect x="50" y="348" width="580" height="14" rx="3" fill="#d4a843" stroke="#2a2520" strokeWidth="2" />
      </g>

      {/* Oversized Architectural Vellum Sheet pinned to board */}
      <rect x="75" y="45" width="530" height="295" rx="5" fill="#faf8f3" stroke="#2a2520" strokeWidth="2.8" />
      {/* Drafting grid background */}
      <g stroke="rgba(58,110,165,0.08)" strokeWidth="1">
        <line x1="75" y1="100" x2="605" y2="100" />
        <line x1="75" y1="160" x2="605" y2="160" />
        <line x1="75" y1="220" x2="605" y2="220" />
        <line x1="75" y1="280" x2="605" y2="280" />
        <line x1="200" y1="45" x2="200" y2="340" />
        <line x1="340" y1="45" x2="340" y2="340" />
        <line x1="480" y1="45" x2="480" y2="340" />
      </g>

      {/* Brass corner drafting pins */}
      <circle cx="88" cy="58" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />
      <circle cx="592" cy="58" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />
      <circle cx="88" cy="328" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />
      <circle cx="592" cy="328" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />

      {/* THE LIVING DATABASE TREE */}
      {/* Roots in deep disk cylinders */}
      <g transform="translate(140, 270)">
        {/* Cylinder 1: lineitem */}
        <g transform="translate(0, 0)">
          <ellipse cx="25" cy="8" rx="25" ry="7" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <path d="M0 8 L0 30 C0 38, 50 38, 50 30 L50 8" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <ellipse cx="25" cy="30" rx="25" ry="7" fill="none" stroke="#2a2520" strokeWidth="1.8" />
          <text x="25" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600" textAnchor="middle" fill="#2a2520">lineitem</text>
        </g>
        {/* Cylinder 2: orders */}
        <g transform="translate(170, 0)">
          <ellipse cx="25" cy="8" rx="25" ry="7" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <path d="M0 8 L0 30 C0 38, 50 38, 50 30 L50 8" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <ellipse cx="25" cy="30" rx="25" ry="7" fill="none" stroke="#2a2520" strokeWidth="1.8" />
          <text x="25" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600" textAnchor="middle" fill="#2a2520">orders</text>
        </g>
        {/* Cylinder 3: partsupp */}
        <g transform="translate(340, 0)">
          <ellipse cx="25" cy="8" rx="25" ry="7" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <path d="M0 8 L0 30 C0 38, 50 38, 50 30 L50 8" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <ellipse cx="25" cy="30" rx="25" ry="7" fill="none" stroke="#2a2520" strokeWidth="1.8" />
          <text x="25" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="600" textAnchor="middle" fill="#2a2520">partsupp</text>
        </g>
      </g>

      {/* Root vascular tendrils rising to operators */}
      <g stroke="#2a2520" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M165 270 C165 240, 200 240, 220 220" />
        <path d="M335 270 C335 245, 260 245, 240 220" />
        <path d="M505 270 C505 230, 460 220, 440 190" />
      </g>

      {/* Relational Scan Nodes */}
      <g>
        {/* Index Scan Node */}
        <g transform="translate(180, 195)">
          <rect x="0" y="0" width="85" height="26" rx="5" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
          <text x="42" y="17" fontFamily="'Inter', sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle" fill="#2a2520">
            Index Scan (l_pk)
          </text>
        </g>
        {/* Seq Scan Node */}
        <g transform="translate(390, 195)">
          <rect x="0" y="0" width="85" height="26" rx="5" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
          <text x="42" y="17" fontFamily="'Inter', sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle" fill="#2a2520">
            Bitmap Scan (o_date)
          </text>
        </g>
      </g>

      {/* Trunk: Hash Join Node */}
      <g stroke="#2a2520" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M222 195 C222 165, 300 160, 310 135" />
        <path d="M432 195 C432 165, 370 160, 360 135" />
      </g>

      <g transform="translate(285, 110)">
        <rect x="0" y="0" width="105" height="30" rx="6" fill="#c84b31" stroke="#2a2520" strokeWidth="2.2" />
        <text x="52" y="19" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" fill="#faf8f3">
          Hash Join (l_orderkey)
        </text>
      </g>

      {/* Crown Canopy: Final Analytical Sort & TPC-H Query Output */}
      <line x1="337" y1="110" x2="337" y2="78" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(270, 58)">
        <polygon points="67,0 135,18 67,36 0,18" fill="#d4a843" stroke="#2a2520" strokeWidth="2" />
        <text x="67" y="22" fontFamily="'Playfair Display', Georgia, serif" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#2a2520">
          TPC-H Q10 (2.17x Speedup)
        </text>
      </g>

      {/* Handwritten draftsman margin annotations */}
      <g transform="translate(95, 80)">
        <text x="0" y="0" fontFamily="'Caveat', cursive" fontSize="13" fill="#c84b31" transform="rotate(-6)">
          PlanGCN Top-1: 38.9%
        </text>
        <text x="0" y="15" fontFamily="'Caveat', cursive" fontSize="11" fill="#4a4540" transform="rotate(-6)">
          (+9.7 pp over GBDT)
        </text>
      </g>

      <g transform="translate(480, 80)">
        <text x="0" y="0" fontFamily="'Caveat', cursive" fontSize="13" fill="#3a6ea5" transform="rotate(4)">
          0.21 ms p95 ONNX CPU
        </text>
        <text x="0" y="15" fontFamily="'Caveat', cursive" fontSize="11" fill="#4a4540" transform="rotate(4)">
          Spearman ρ = 0.74
        </text>
      </g>

      {/* Draftsman wooden ruler resting on ledge */}
      <g transform="translate(180, 350)">
        <rect x="0" y="0" width="160" height="10" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.2" />
        <line x1="20" y1="0" x2="20" y2="5" stroke="#2a2520" strokeWidth="1" />
        <line x1="40" y1="0" x2="40" y2="5" stroke="#2a2520" strokeWidth="1" />
        <line x1="60" y1="0" x2="60" y2="5" stroke="#2a2520" strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="8" stroke="#c84b31" strokeWidth="1.2" />
        <line x1="100" y1="0" x2="100" y2="5" stroke="#2a2520" strokeWidth="1" />
        <line x1="120" y1="0" x2="120" y2="5" stroke="#2a2520" strokeWidth="1" />
        <line x1="140" y1="0" x2="140" y2="5" stroke="#2a2520" strokeWidth="1" />
      </g>
    </svg>
  );
}

/**
 * 02 — THE OBSERVABILITY WALL CONSOLE & TELEMETRY RACK
 * (LLM Reliability Control Plane)
 * Industrial 19-inch equipment rack with CRT waterfall oscilloscope,
 * rotary gauges, cable bundles, WAL spool drum, and red circuit-breaker switch.
 */
export function ControlConsoleArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* 19-inch Steel Equipment Rack Outer Casing */}
      <rect x="70" y="30" width="540" height="370" rx="8" fill="#2a2520" stroke="#1c1917" strokeWidth="3" />
      {/* Front rack mounting rails with silver rack screw holes */}
      <line x1="90" y1="40" x2="90" y2="390" stroke="#4a4540" strokeWidth="3" />
      <line x1="590" y1="40" x2="590" y2="390" stroke="#4a4540" strokeWidth="3" />
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i}>
          <circle cx="90" cy={55 + i * 28} r="2.5" fill="#faf8f3" stroke="#2a2520" strokeWidth="1" />
          <circle cx="590" cy={55 + i * 28} r="2.5" fill="#faf8f3" stroke="#2a2520" strokeWidth="1" />
        </g>
      ))}

      {/* Unit 1: Top OTLP Ingestion Gateway Panel */}
      <g transform="translate(105, 45)">
        <rect x="0" y="0" width="470" height="70" rx="4" fill="#3a3530" stroke="#4a4540" strokeWidth="1.5" />
        {/* Status LEDs */}
        <circle cx="20" cy="20" r="3.5" fill="#10b981" />
        <circle cx="34" cy="20" r="3.5" fill="#38bdf8" />
        <circle cx="48" cy="20" r="3.5" fill="#c84b31" />
        <text x="65" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700" fill="#faf8f3">
          DUAL C++ / PYTHON OTLP INGESTION GATEWAY
        </text>
        {/* Analog VU meters for Ingest Rate */}
        <g transform="translate(20, 32)">
          <rect x="0" y="0" width="130" height="26" rx="3" fill="#1c1917" stroke="#4a4540" />
          <path d="M10 20 Q65 6, 120 20" fill="none" stroke="#faf8f3" strokeWidth="1" />
          <line x1="65" y1="24" x2="95" y2="10" stroke="#c84b31" strokeWidth="1.8" strokeLinecap="round" />
          <text x="10" y="12" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#94a3b8">~5 ms p99</text>
        </g>
        {/* Cooling vent louvres */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={320 + i * 15} y1="36" x2={330 + i * 15} y2="52" stroke="#2a2520" strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>

      {/* Unit 2: Central CRT Oscilloscope Waterfall Display */}
      <g transform="translate(105, 125)">
        <rect x="0" y="0" width="470" height="150" rx="4" fill="#1c1917" stroke="#4a4540" strokeWidth="1.5" />
        {/* Phosphor green CRT screen */}
        <rect x="15" y="15" width="310" height="120" rx="6" fill="#022c22" stroke="#059669" strokeWidth="2" />
        {/* Trace Waterfall lines */}
        <g stroke="#10b981" strokeWidth="1.5" strokeLinecap="round">
          {/* Span 1: rag_request */}
          <line x1="30" y1="35" x2="280" y2="35" />
          <circle cx="30" cy="35" r="2" fill="#10b981" />
          {/* Span 2: semantic_cache (0.90 threshold) */}
          <line x1="60" y1="55" x2="140" y2="55" stroke="#38bdf8" />
          {/* Span 3: vector_search */}
          <line x1="140" y1="75" x2="230" y2="75" stroke="#a855f7" />
          {/* Span 4: cross_encoder */}
          <line x1="210" y1="95" x2="270" y2="95" stroke="#f59e0b" />
          {/* Span 5: llm_generate */}
          <line x1="240" y1="115" x2="310" y2="115" stroke="#ef4444" />
        </g>
        <text x="35" y="28" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#10b981">
          TRACE #7F9A · DUCKDB WATERFALL &lt;100ms p99
        </text>

        {/* Right side of console: Controls, Rotary Knobs, Emergency Breaker */}
        <g transform="translate(345, 15)">
          <text x="0" y="14" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" fill="#faf8f3">
            FAILOVER MATRIX
          </text>
          {/* Rotary Dials */}
          <circle cx="20" cy="40" r="14" fill="#3a3530" stroke="#faf8f3" strokeWidth="1.2" />
          <line x1="20" y1="40" x2="30" y2="32" stroke="#c84b31" strokeWidth="2" strokeLinecap="round" />
          <text x="40" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#94a3b8">REDIS: 0.90</text>

          {/* PHYSICAL CIRCUIT-BREAKER SWITCH */}
          <g transform="translate(0, 68)">
            <rect x="0" y="0" width="110" height="42" rx="3" fill="#3a3530" stroke="#2a2520" />
            <rect x="4" y="4" width="102" height="34" fill="#450a0a" stroke="#dc2626" />
            {/* Warning hazard stripes */}
            <line x1="12" y1="8" x2="24" y2="34" stroke="#dc2626" strokeWidth="2" />
            <line x1="26" y1="8" x2="38" y2="34" stroke="#dc2626" strokeWidth="2" />
            <line x1="40" y1="8" x2="52" y2="34" stroke="#dc2626" strokeWidth="2" />
            {/* Red throw switch handle */}
            <rect x="65" y="10" width="30" height="22" rx="4" fill="#ef4444" stroke="#faf8f3" strokeWidth="1.5" />
            <text x="55" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="700" textAnchor="middle" fill="#faf8f3">
              30s BRK
            </text>
          </g>
        </g>
      </g>

      {/* Unit 3: Bottom WAL Storage & Compaction Drum */}
      <g transform="translate(105, 285)">
        <rect x="0" y="0" width="470" height="95" rx="4" fill="#3a3530" stroke="#4a4540" strokeWidth="1.5" />
        {/* WAL Spool cylinder */}
        <g transform="translate(30, 15)">
          <rect x="0" y="0" width="140" height="65" rx="4" fill="#1c1917" stroke="#4a4540" />
          <ellipse cx="25" cy="32" rx="18" ry="24" fill="#2a2520" stroke="#d4a843" strokeWidth="1.8" />
          <ellipse cx="25" cy="32" rx="8" ry="10" fill="#1c1917" stroke="#d4a843" strokeWidth="1.2" />
          <text x="50" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" fill="#faf8f3">
            WAL ROTATION
          </text>
          <text x="50" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#d4a843">
            64 MB · CRC-32
          </text>
        </g>
        {/* Compaction arrow to Parquet */}
        <path d="M185 48 L225 48" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="225,44 233,48 225,52" fill="#10b981" />
        <g transform="translate(245, 15)">
          <rect x="0" y="0" width="200" height="65" rx="4" fill="#1c1917" stroke="#4a4540" />
          <text x="15" y="26" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" fill="#10b981">
            TWO-PHASE ZSTD PARQUET
          </text>
          <text x="15" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#faf8f3">
            50,000 SPANS / SEC
          </text>
          <text x="15" y="56" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#94a3b8">
            54/54 Pytest Test AST Verified
          </text>
        </g>
      </g>

      {/* Hanging audit checklist clipboard on left rack frame */}
      <g transform="translate(15, 110) rotate(-4)">
        <rect x="0" y="0" width="55" height="85" rx="2" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.5" />
        <rect x="18" y="-3" width="18" height="6" rx="1" fill="#2a2520" />
        <line x1="8" y1="18" x2="46" y2="18" stroke="#c84b31" strokeWidth="1.2" />
        <line x1="8" y1="28" x2="40" y2="28" stroke="#2a2520" strokeWidth="1" />
        <line x1="8" y1="38" x2="44" y2="38" stroke="#2a2520" strokeWidth="1" />
        <line x1="8" y1="48" x2="38" y2="48" stroke="#2a2520" strokeWidth="1" />
        <text x="27" y="70" fontFamily="'Caveat', cursive" fontSize="10" textAnchor="middle" fill="#c84b31">
          fsync ack
        </text>
      </g>
    </svg>
  );
}

/**
 * 03 — THE INDUSTRIAL STREAM MANIFOLD & PNEUMATIC SORTER
 * (Fault-Tolerant ML Telemetry Pipeline)
 * High-pressure intake hopper, 12 transparent partition tubes with glowing packets,
 * valve divert to isolated DLQ reservoir (44,493 events), and persistence silos.
 */
export function PneumaticPipelineArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Heavy Industrial Steel Manifold Frame */}
      {/* Left: Go HTTP Intake Hopper */}
      <g transform="translate(40, 120)">
        {/* Hopper funnel */}
        <polygon points="0,0 80,0 60,110 20,110" fill="#f0ece3" stroke="#2a2520" strokeWidth="2.8" strokeLinejoin="round" />
        <ellipse cx="40" cy="0" rx="40" ry="12" fill="#e8e2d6" stroke="#2a2520" strokeWidth="2.5" />
        {/* Rivets around rim */}
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={10 + i * 10} cy="0" r="1.5" fill="#2a2520" />
        ))}
        {/* Incoming event stream arrows */}
        <path d="M40 -35 L40 -5" stroke="#3a6ea5" strokeWidth="3" strokeLinecap="round" />
        <polygon points="36,-5 40,2 44,-5" fill="#3a6ea5" />
        <text x="40" y="-42" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#3a6ea5">
          GO INGESTION
        </text>
        <text x="40" y="55" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          288 RPS
        </text>
        <text x="40" y="70" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">
          5.37 ms p99
        </text>
      </g>

      {/* Main High-Pressure Ingestion Pipe */}
      <g stroke="#2a2520" strokeWidth="3" fill="#e8e2d6">
        <rect x="100" y="215" width="90" height="30" rx="3" />
        {/* Pipe Flange Coupling */}
        <rect x="185" y="208" width="10" height="44" rx="2" fill="#2a2520" />
      </g>

      {/* 12-PARTITION PNEUMATIC KAFKA GLASS TUBES */}
      <g transform="translate(195, 80)">
        {/* Distribution Manifold Chamber */}
        <path d="M0 135 L60 40 L260 40 L300 135 L260 230 L60 230 Z" fill="#faf8f3" stroke="#2a2520" strokeWidth="2.8" />
        <text x="160" y="60" fontFamily="'Playfair Display', Georgia, serif" fontSize="12" fontWeight="700" textAnchor="middle" fill="#2a2520">
          KAFKA KRAFT · 12 PARTITIONS
        </text>
        <text x="160" y="74" fontFamily="'JetBrains Mono', monospace" fontSize="8" textAnchor="middle" fill="#c84b31">
          7,117 EPS SUSTAINED · 7,892 PEAK
        </text>

        {/* 12 horizontal glass delivery tubes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 84 + i * 11;
          return (
            <g key={i}>
              <line x1="20" y1={y} x2="280" y2={y} stroke="rgba(58,110,165,0.4)" strokeWidth="4" strokeLinecap="round" />
              {/* Telemetry packet bullet */}
              <circle cx={40 + ((i * 37) % 220)} cy={y} r="2.2" fill={i === 4 || i === 9 ? '#c84b31' : '#3a6ea5'} />
            </g>
          );
        })}
      </g>

      {/* Divert Valve: Clean Stream vs Dead Letter Quarantine */}
      {/* Upper Path: Healthy Persisted Database Stream */}
      <path d="M495 160 C530 160, 540 110, 570 110" fill="none" stroke="#2a2520" strokeWidth="3" />
      <g transform="translate(570, 75)">
        <rect x="0" y="0" width="85" height="70" rx="5" fill="#f0ece3" stroke="#2a2520" strokeWidth="2.2" />
        <text x="42" y="22" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          POSTGRES 16
        </text>
        <line x1="10" y1="28" x2="75" y2="28" stroke="#2a2520" strokeWidth="1" />
        <text x="42" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" textAnchor="middle" fill="#10b981">
          900,469 POST-CHAOS
        </text>
        <text x="42" y="55" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">
          0 Event Loss
        </text>
      </g>

      {/* Lower Path: Heavy Reinforced DLQ Quarantine Reservoir */}
      <path d="M495 240 C530 240, 540 310, 570 310" fill="none" stroke="#2a2520" strokeWidth="3" />
      <g transform="translate(555, 275)">
        {/* Hazard warning tank */}
        <rect x="0" y="0" width="110" height="85" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="2.5" />
        {/* Hazard warning banner */}
        <rect x="6" y="6" width="98" height="14" fill="#e11d48" rx="2" />
        <text x="55" y="16" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" textAnchor="middle" fill="#ffffff">
          ISOLATED DLQ
        </text>
        <text x="55" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="800" textAnchor="middle" fill="#e11d48">
          44,493
        </text>
        <text x="55" y="56" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">
          Malformed Events
        </text>
        <text x="55" y="70" fontFamily="'Caveat', cursive" fontSize="10" textAnchor="middle" fill="#c84b31">
          100% routed · 0 leak
        </text>
      </g>

      {/* Industrial pressure gauge with brass rim */}
      <g transform="translate(195, 300)">
        <circle cx="25" cy="25" r="22" fill="#faf8f3" stroke="#d4a843" strokeWidth="3" />
        <line x1="25" y1="25" x2="38" y2="14" stroke="#c84b31" strokeWidth="2" strokeLinecap="round" />
        <circle cx="25" cy="25" r="3" fill="#2a2520" />
        <text x="25" y="38" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" textAnchor="middle" fill="#2a2520">
          27 Sweeps
        </text>
      </g>
    </svg>
  );
}

/**
 * 04 — THE VINTAGE EXCHANGE TRADING FLOOR & MECHANICAL TICKER
 * (Tradeflow OMS & Risk Engine)
 * Split-flap mechanical board, punched ticker tape cascading with FIX 4.2 tags,
 * 7-rule atomic risk check lever, and outbox event ledger.
 */
export function TradingDeskArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Heavy Mahogony/Steel Trading Desk Platform */}
      <rect x="50" y="300" width="580" height="90" rx="4" fill="#3a3530" stroke="#2a2520" strokeWidth="3" />
      <line x1="50" y1="315" x2="630" y2="315" stroke="#faf8f3" strokeWidth="1" strokeOpacity="0.2" />

      {/* MECHANICAL SPLIT-FLAP ORDER STATE BOARD */}
      <g transform="translate(70, 45)">
        <rect x="0" y="0" width="540" height="110" rx="6" fill="#1c1917" stroke="#2a2520" strokeWidth="3" />
        <text x="270" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700" letterSpacing="0.2em" textAnchor="middle" fill="#94a3b8">
          FIX 4.2 ORDER FINITE STATE MACHINE (113 ns/op)
        </text>

        {/* 4 Split-Flap Cells */}
        <g transform="translate(20, 36)">
          {/* Cell 1: PendingNew */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="115" height="52" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="26" x2="115" y2="26" stroke="#020617" strokeWidth="1.5" />
            <text x="57" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#cbd5e1">
              PendingNew
            </text>
          </g>
          {/* Transition Arrow */}
          <path d="M118 26 L128 26" stroke="#c84b31" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cell 2: New */}
          <g transform="translate(130, 0)">
            <rect x="0" y="0" width="105" height="52" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="26" x2="105" y2="26" stroke="#020617" strokeWidth="1.5" />
            <text x="52" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" textAnchor="middle" fill="#38bdf8">
              New
            </text>
          </g>
          {/* Transition Arrow */}
          <path d="M238 26 L248 26" stroke="#c84b31" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cell 3: PartiallyFilled */}
          <g transform="translate(250, 0)">
            <rect x="0" y="0" width="125" height="52" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="26" x2="125" y2="26" stroke="#020617" strokeWidth="1.5" />
            <text x="62" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#f59e0b">
              PartiallyFilled
            </text>
          </g>
          {/* Transition Arrow */}
          <path d="M378 26 L388 26" stroke="#c84b31" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cell 4: Filled */}
          <g transform="translate(390, 0)">
            <rect x="0" y="0" width="105" height="52" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="26" x2="105" y2="26" stroke="#020617" strokeWidth="1.5" />
            <text x="52" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" textAnchor="middle" fill="#10b981">
              Filled
            </text>
          </g>
        </g>
      </g>

      {/* CASSETTE TICKER TAPE DISPENSER WITH CASCADING PERFORATED TAPE */}
      <g transform="translate(70, 175)">
        {/* Brass Teletype Dispenser Box */}
        <rect x="0" y="0" width="85" height="110" rx="4" fill="#d4a843" stroke="#2a2520" strokeWidth="2.5" />
        <rect x="10" y="15" width="65" height="18" fill="#1c1917" />
        {/* Slit where tape emerges */}
        <line x1="14" y1="24" x2="71" y2="24" stroke="#faf8f3" strokeWidth="2" />

        {/* Cascading Paper Ticker Tape with FIX Tags */}
        <g stroke="#2a2520" strokeWidth="1.5" fill="#faf8f3">
          <path d="M42 24 C45 60, 95 80, 110 120 C125 160, 240 150, 310 160" fill="none" stroke="#2a2520" strokeWidth="18" strokeLinecap="round" />
          <path d="M42 24 C45 60, 95 80, 110 120 C125 160, 240 150, 310 160" fill="none" stroke="#faf8f3" strokeWidth="15" strokeLinecap="round" />
        </g>
        {/* Printed FIX tags on ribbon */}
        <text x="135" y="112" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="600" fill="#2a2520">
          35=D | 55=AAPL | 38=1000 | 44=182.50
        </text>
        <text x="210" y="145" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="600" fill="#c84b31">
          39=2 (FILLED) | 14.38ms MEDIAN E2E
        </text>
      </g>

      {/* 7-RULE ATOMIC REDIS LUA PRE-TRADE RISK STAMP MECHANISM */}
      <g transform="translate(390, 175)">
        <rect x="0" y="0" width="220" height="115" rx="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="2.5" />
        {/* Brass Plaque */}
        <rect x="10" y="10" width="200" height="24" rx="2" fill="#d4a843" stroke="#2a2520" strokeWidth="1.2" />
        <text x="110" y="26" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="800" textAnchor="middle" fill="#1c1917">
          7-RULE RISK ENGINE (311 ns/op)
        </text>
        {/* Checklist of atomic risk rules */}
        <text x="16" y="48" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">1. Price Banding (±5%)</text>
        <text x="16" y="60" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">2. Max Notional ($1,000,000)</text>
        <text x="16" y="72" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">3. Short Borrow Validation</text>
        <text x="16" y="84" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a4540">4. Fingerprint Duplicate Check</text>
        <text x="16" y="96" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#10b981">5. 1,000 Rapid Property Tests</text>
      </g>

      {/* Hand-stamped verified red wax seal on trading slip */}
      <g transform="translate(310, 310) rotate(-6)">
        <circle cx="25" cy="25" r="22" fill="#c84b31" stroke="#2a2520" strokeWidth="2" />
        <circle cx="25" cy="25" r="18" fill="none" stroke="#faf8f3" strokeWidth="1" strokeDasharray="4 2" />
        <text x="25" y="24" fontFamily="'Playfair Display', Georgia, serif" fontSize="7.5" fontWeight="700" textAnchor="middle" fill="#faf8f3">
          ZERO LOSS
        </text>
        <text x="25" y="34" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" textAnchor="middle" fill="#faf8f3">
          2,057 ORDERS
        </text>
      </g>
    </svg>
  );
}

/**
 * 05 — THE SENIOR RESEARCHER'S OPEN FIELD LEDGER & QUANTUM EASEL
 * (Moneyball Quantitative Research Platform)
 * Oversized two-page open leather ledger with Merton jump-diffusion probability curves,
 * Gaussian bell curves, QAOA 14-qubit circuit ring, and CUDA benchmark seal.
 */
export function ResearchLedgerArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Leather Bound Journal Outer Cover */}
      <rect x="40" y="35" width="600" height="355" rx="10" fill="#4a3e35" stroke="#2a2520" strokeWidth="3.5" />
      {/* Book spine stitching groove */}
      <line x1="340" y1="35" x2="340" y2="390" stroke="#1c1917" strokeWidth="4" />

      {/* Left Page (Deckled Linen Paper) */}
      <rect x="55" y="48" width="275" height="330" rx="3" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.8" />
      {/* Right Page */}
      <rect x="350" y="48" width="275" height="330" rx="3" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.8" />

      {/* LEFT PAGE: Merton Compound Poisson Jump-Diffusion & Tail Risk */}
      <g transform="translate(70, 65)">
        <text x="0" y="16" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="700" fill="#2a2520">
          Merton Jump-Diffusion Framework
        </text>
        <text x="0" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#c84b31">
          N ~ Poisson(λΔt) · 24 Assets · 1,260 Days
        </text>

        {/* Sketched Log-Return Probability Curve with Fat Tails */}
        <g transform="translate(10, 45)">
          {/* Axis lines */}
          <line x1="0" y1="85" x2="225" y2="85" stroke="#2a2520" strokeWidth="1.5" />
          <line x1="110" y1="0" x2="110" y2="90" stroke="#2a2520" strokeWidth="1.5" />

          {/* Normal Distribution (dashed blue) vs Jump-Diffusion (solid red with heavy left tail) */}
          <path d="M10 84 Q50 82, 85 40 T110 8 T135 40 T210 84" fill="none" stroke="#3a6ea5" strokeWidth="1.4" strokeDasharray="4 3" />
          <path d="M10 70 C40 68, 80 50, 110 5 C140 50, 175 72, 215 84" fill="none" stroke="#c84b31" strokeWidth="2.2" />

          {/* 95% and 99% VaR Vertical Threshold Lines */}
          <line x1="45" y1="15" x2="45" y2="85" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="47" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#dc2626">99% VaR</text>

          <line x1="70" y1="35" x2="70" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="72" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#d97706">95% VaR</text>
        </g>

        {/* Handwritten Mathematical Formulas */}
        <g transform="translate(10, 155)">
          <text x="0" y="14" fontFamily="'Caveat', cursive" fontSize="13" fill="#2a2520">
            dS_t = μ S_t dt + σ S_t dW_t + J S_t dN_t
          </text>
          <text x="0" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">
            Rank IC: 0.0359 · ICIR: 1.521
          </text>
          <text x="0" y="46" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#4a4540">
            3-State HMM Drawdown: 13.58% → 8.59%
          </text>
        </g>
      </g>

      {/* RIGHT PAGE: 14-Qubit QAOA Combinatorial Ring & CUDA Benchmarks */}
      <g transform="translate(365, 65)">
        <text x="0" y="16" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="700" fill="#2a2520">
          QAOA &amp; PyTorch CUDA Benchmark
        </text>
        <text x="0" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#3a6ea5">
          14 Qubits · 95.49% Approximation Ratio
        </text>

        {/* Hand-Drawn 14-Qubit Quantum Entanglement Ring */}
        <g transform="translate(125, 105)">
          <circle cx="0" cy="0" r="48" fill="none" stroke="rgba(58,110,165,0.3)" strokeWidth="1.2" />
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const x = Math.cos(angle) * 48;
            const y = Math.sin(angle) * 48;
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="rgba(58,110,165,0.2)" strokeWidth="1" />
                <circle cx={x} cy={y} r="5" fill="#faf8f3" stroke="#3a6ea5" strokeWidth="1.6" />
                <text x={x} y={y + 2.5} fontFamily="'JetBrains Mono', monospace" fontSize="5" textAnchor="middle" fill="#2a2520">
                  q{i}
                </text>
              </g>
            );
          })}
        </g>

        {/* PyTorch CUDA Benchmark Seal */}
        <g transform="translate(15, 175)">
          <rect x="0" y="0" width="220" height="58" rx="4" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
          <text x="110" y="20" fontFamily="'Playfair Display', Georgia, serif" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#c84b31">
            CUDA 1M-PATH MONTE CARLO
          </text>
          <text x="110" y="36" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="800" textAnchor="middle" fill="#2a2520">
            29.26 ms (42.9x vs NumPy)
          </text>
          <text x="110" y="49" fontFamily="'Caveat', cursive" fontSize="11" textAnchor="middle" fill="#3a6ea5">
            verified GPU kernel acceleration
          </text>
        </g>
      </g>

      {/* Brass Fountain Pen resting across center gutter */}
      <g transform="translate(330, 200) rotate(12)">
        <rect x="0" y="0" width="16" height="140" rx="3" fill="#1c1917" stroke="#2a2520" strokeWidth="1.2" />
        <rect x="0" y="40" width="16" height="6" fill="#d4a843" />
        <polygon points="0,140 8,165 16,140" fill="#d4a843" stroke="#2a2520" strokeWidth="1" />
        <line x1="8" y1="140" x2="8" y2="158" stroke="#2a2520" strokeWidth="1" />
      </g>
    </svg>
  );
}

/**
 * 06 — THE ARCHITECTURAL SURVEY MAP & ISOMETRIC FLOORPLAN TABLE
 * (Warehouse Spatial Routing Engine)
 * 2.5D isometric warehouse floorplan with 3D racking aisles,
 * loading dock origin, checkout packing goal, AGV picking route, and speedup badge.
 */
export function IsometricWarehouseArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Heavy Draftsman Drafting Board */}
      <rect x="40" y="30" width="600" height="370" rx="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="3" />
      {/* Blue architectural survey grid paper */}
      <rect x="60" y="50" width="560" height="330" rx="4" fill="#faf8f3" stroke="#3a6ea5" strokeWidth="1.8" />
      {/* Grid lines */}
      <g stroke="rgba(58,110,165,0.12)" strokeWidth="1">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h-${i}`} x1="60" y1={50 + i * 22} x2="620" y2={50 + i * 22} />
        ))}
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={`v-${i}`} x1={60 + i * 23} y1="50" x2={60 + i * 23} y2="380" />
        ))}
      </g>

      {/* Header Stamp */}
      <g transform="translate(80, 68)">
        <text x="0" y="16" fontFamily="'Playfair Display', Georgia, serif" fontSize="14" fontWeight="800" fill="#2a2520">
          WAREHOUSE SPATIAL FLOORPLAN &amp; TOUR
        </text>
        <text x="0" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#3a6ea5">
          OPEN-PATH TSP · DOCK [1,1] → CHECKOUT [14,10]
        </text>
      </g>

      {/* ISOMETRIC WAREHOUSE STORAGE RACKS */}
      <g stroke="#2a2520" strokeWidth="2" strokeLinejoin="round" fill="#e8e2d6">
        {/* Rack Row 1 */}
        <g transform="translate(140, 140)">
          <polygon points="0,0 80,-25 100,-15 20,10" fill="#d4a843" fillOpacity="0.8" />
          <polygon points="0,0 20,10 20,50 0,40" fill="#b48825" />
          <polygon points="20,10 100,-15 100,25 20,50" fill="#e8e2d6" />
          <text x="45" y="28" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#2a2520">AISLE A</text>
        </g>

        {/* Rack Row 2 */}
        <g transform="translate(260, 140)">
          <polygon points="0,0 80,-25 100,-15 20,10" fill="#d4a843" fillOpacity="0.8" />
          <polygon points="0,0 20,10 20,50 0,40" fill="#b48825" />
          <polygon points="20,10 100,-15 100,25 20,50" fill="#e8e2d6" />
          <text x="45" y="28" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#2a2520">AISLE B</text>
        </g>

        {/* Rack Row 3 */}
        <g transform="translate(380, 140)">
          <polygon points="0,0 80,-25 100,-15 20,10" fill="#d4a843" fillOpacity="0.8" />
          <polygon points="0,0 20,10 20,50 0,40" fill="#b48825" />
          <polygon points="20,10 100,-15 100,25 20,50" fill="#e8e2d6" />
          <text x="45" y="28" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#2a2520">AISLE C</text>
        </g>

        {/* Rack Row 4 (Lower) */}
        <g transform="translate(200, 230)">
          <polygon points="0,0 80,-25 100,-15 20,10" fill="#d4a843" fillOpacity="0.8" />
          <polygon points="0,0 20,10 20,50 0,40" fill="#b48825" />
          <polygon points="20,10 100,-15 100,25 20,50" fill="#e8e2d6" />
          <text x="45" y="28" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#2a2520">AISLE D</text>
        </g>
      </g>

      {/* START DOCK [1, 1] STAGING BAY */}
      <g transform="translate(90, 290)">
        <rect x="0" y="0" width="75" height="50" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.2" />
        <circle cx="37" cy="20" r="10" fill="#16a34a" />
        <text x="37" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700" textAnchor="middle" fill="#ffffff">
          START
        </text>
        <text x="37" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="600" textAnchor="middle" fill="#16a34a">
          Dock [1,1]
        </text>
      </g>

      {/* FINAL CHECKOUT [14, 10] PACKING GOAL */}
      <g transform="translate(500, 110)">
        <rect x="0" y="0" width="85" height="50" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.2" />
        <circle cx="42" cy="20" r="10" fill="#dc2626" />
        <text x="42" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#ffffff">
          GOAL
        </text>
        <text x="42" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="600" textAnchor="middle" fill="#dc2626">
          Checkout [14,10]
        </text>
      </g>

      {/* OPTIMAL SERPENTINE A* + HELD-KARP PICK PATH */}
      <path
        d="M165 315 L190 280 L230 200 L250 120 L350 120 L370 200 L470 200 L490 290 L530 290 L542 160"
        fill="none"
        stroke="#c84b31"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pick Stops along path */}
      {[
        [230, 200, 'Pick #1'],
        [250, 120, 'Pick #2'],
        [370, 200, 'Pick #3'],
        [470, 200, 'Pick #4'],
      ].map(([x, y, label], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="5" fill="#faf8f3" stroke="#c84b31" strokeWidth="2" />
          <circle cx={x as number} cy={y as number} r="2" fill="#c84b31" />
          <text x={(x as number) + 8} y={(y as number) - 4} fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#2a2520">
            {label}
          </text>
        </g>
      ))}

      {/* C++ SPEEDUP VERIFIED BADGE */}
      <g transform="translate(380, 295)">
        <rect x="0" y="0" width="210" height="65" rx="5" fill="#f0ece3" stroke="#2a2520" strokeWidth="2" />
        <text x="105" y="20" fontFamily="'Playfair Display', Georgia, serif" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#2a2520">
          C++17 NATIVE SPEEDUPS
        </text>
        <text x="105" y="36" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#c84b31">
          A* 31x · Held-Karp 56.5x
        </text>
        <text x="105" y="52" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" textAnchor="middle" fill="#4a4540">
          Redis O(1) Cache: 144 RPS (-43.8% p50)
        </text>
      </g>
    </svg>
  );
}

/**
 * 07 — THE INDUSTRIAL SURVEILLANCE OBSERVATION BAY
 * (Edge Workplace Safety Computer Vision)
 * Riveted steel observation window overlooking factory floor,
 * wall-mounted PTZ surveillance camera with optical cone, worker silhouettes,
 * hazard polygon geofence, and IEEE RMKMATE 2026 medallion.
 */
export function IndustrialVisionArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 680 430" className={className} aria-hidden="true">
      {/* Heavy Riveted Steel Window Frame */}
      <rect x="35" y="30" width="610" height="370" rx="10" fill="#2a2520" stroke="#1c1917" strokeWidth="3" />
      {/* Steel Rivets around border */}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={`t-${i}`} cx={55 + i * 38} cy="42" r="2.5" fill="#faf8f3" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={`b-${i}`} cx={55 + i * 38} cy="388" r="2.5" fill="#faf8f3" />
      ))}

      {/* Inside the Glass: Factory Floor Horizon & Concrete Slabs */}
      <g>
        <rect x="55" y="55" width="570" height="320" rx="4" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
        {/* Factory floor perspective vanishing lines */}
        <line x1="55" y1="260" x2="625" y2="260" stroke="#2a2520" strokeWidth="1.8" />
        <line x1="160" y1="260" x2="80" y2="375" stroke="rgba(74,69,64,0.3)" strokeWidth="1.2" />
        <line x1="340" y1="260" x2="340" y2="375" stroke="rgba(74,69,64,0.3)" strokeWidth="1.2" />
        <line x1="500" y1="260" x2="580" y2="375" stroke="rgba(74,69,64,0.3)" strokeWidth="1.2" />

        {/* Industrial Machinery Silhouette in Background */}
        <rect x="90" y="190" width="70" height="70" fill="#e8e2d6" stroke="#2a2520" strokeWidth="1.8" />
        <line x1="125" y1="190" x2="125" y2="150" stroke="#2a2520" strokeWidth="3" />
        <circle cx="125" cy="150" r="6" fill="#c84b31" />
      </g>

      {/* WALL MOUNTED PTZ CAMERA WITH OPTICAL FOV CONE */}
      <g transform="translate(85, 75)">
        <rect x="0" y="0" width="12" height="35" fill="#2a2520" />
        <line x1="12" y1="18" x2="35" y2="18" stroke="#2a2520" strokeWidth="3.5" />
        {/* Camera body and lens */}
        <polygon points="35,6 65,12 65,36 35,30" fill="#3a3530" stroke="#2a2520" strokeWidth="2" />
        <polygon points="65,15 80,8 80,40 65,33" fill="#2a2520" stroke="#2a2520" strokeWidth="1.5" />
        <circle cx="80" cy="24" r="5" fill="#38bdf8" />

        {/* Light blue optical field-of-view cone */}
        <polygon points="80,24 450,220 220,290" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.2" strokeDasharray="5 3" />
      </g>

      {/* RESTRICTED HAZARD POLYGON GEOFENCE ON FLOOR */}
      <g>
        <polygon points="260,280 440,270 480,340 220,330" fill="rgba(225,29,72,0.14)" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="8 4" />
        {/* Warning hazard stripes */}
        <text x="350" y="310" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="800" textAnchor="middle" fill="#e11d48">
          ⚠ RESTRICTED ZONE A-4
        </text>
      </g>

      {/* WORKER SILHOUETTE & DETECTION BOUNDING BOXES */}
      <g transform="translate(360, 215)">
        {/* Hardhat */}
        <ellipse cx="20" cy="10" rx="8" ry="5" fill="#eab308" stroke="#2a2520" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="20" cy="16" r="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.5" />
        {/* Torso with High-Vis Safety Vest */}
        <path d="M10 24 L30 24 L33 60 L7 60 Z" fill="#22c55e" stroke="#2a2520" strokeWidth="1.8" />
        {/* Legs */}
        <line x1="14" y1="60" x2="12" y2="92" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="60" x2="28" y2="92" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />

        {/* YOLO Detection Bounding Box */}
        <rect x="0" y="2" width="40" height="95" fill="none" stroke="#22c55e" strokeWidth="1.8" />
        <rect x="0" y="-12" width="40" height="14" fill="#22c55e" />
        <text x="20" y="-3" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="700" textAnchor="middle" fill="#ffffff">
          Person 0.94
        </text>

        {/* Foot-point ground contact probing crosshair */}
        <circle cx="20" cy="94" r="3" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="15" y1="94" x2="25" y2="94" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="20" y1="89" x2="20" y2="99" stroke="#e11d48" strokeWidth="1.5" />
      </g>

      {/* OFFICIAL IEEE PUBLICATION MEDALLION */}
      <g transform="translate(460, 75)">
        <rect x="0" y="0" width="150" height="75" rx="5" fill="#faf8f3" stroke="#3a6ea5" strokeWidth="2" />
        <rect x="4" y="4" width="142" height="67" fill="none" stroke="#c84b31" strokeWidth="1" strokeDasharray="4 2" />
        <text x="75" y="22" fontFamily="'Playfair Display', Georgia, serif" fontSize="9" fontWeight="800" textAnchor="middle" fill="#2a2520">
          PEER-REVIEWED RESEARCH
        </text>
        <text x="75" y="36" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#3a6ea5">
          IEEE RMKMATE 2026
        </text>
        <text x="75" y="50" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">
          IEEE Xplore: 11518869
        </text>
        <text x="75" y="63" fontFamily="'Caveat', cursive" fontSize="10" textAnchor="middle" fill="#c84b31">
          Dual YOLOv11 Edge Cascade
        </text>
      </g>
    </svg>
  );
}

/**
 * Illustrated hand-drawn banner/tabs for the navigation
 */
export function StudioSignboardNavArt({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 540 50" className={className} aria-hidden="true">
      <path d="M10 25 C10 10, 530 10, 530 25 C530 40, 10 40, 10 25" fill="#faf8f3" stroke="#2a2520" strokeWidth="2.2" />
      <line x1="60" y1="4" x2="60" y2="12" stroke="#2a2520" strokeWidth="2" />
      <line x1="480" y1="4" x2="480" y2="12" stroke="#2a2520" strokeWidth="2" />
    </svg>
  );
}

/**
 * About Section: Personal illustrated study desk & portrait
 */
export function StudioDeskAboutArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 540 380" className={className} aria-hidden="true">
      {/* Wooden study table */}
      <rect x="40" y="220" width="460" height="130" rx="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="2.8" />
      <line x1="40" y1="240" x2="500" y2="240" stroke="#2a2520" strokeWidth="1.8" />

      {/* Desk Lamp on left */}
      <g transform="translate(60, 90)">
        <rect x="25" y="120" width="30" height="10" rx="3" fill="#2a2520" />
        <path d="M40 120 L40 60 L75 30" fill="none" stroke="#2a2520" strokeWidth="3" strokeLinecap="round" />
        <polygon points="65,15 95,30 85,55 55,40" fill="#d4a843" stroke="#2a2520" strokeWidth="2" />
        <polygon points="70,48 110,80 80,120 40,88" fill="rgba(212,168,67,0.15)" />
      </g>

      {/* Pinned portrait sketch on the back wall */}
      <g transform="translate(200, 40) rotate(-3)">
        <rect x="0" y="0" width="140" height="160" rx="4" fill="#faf8f3" stroke="#2a2520" strokeWidth="2.2" />
        {/* Pushpin */}
        <circle cx="70" cy="8" r="4" fill="#c84b31" stroke="#2a2520" strokeWidth="1.2" />
        {/* Head silhouette with glasses */}
        <circle cx="70" cy="65" r="30" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.8" />
        {/* Glasses */}
        <rect x="52" y="60" width="16" height="12" rx="2" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.5" />
        <rect x="72" y="60" width="16" height="12" rx="2" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.5" />
        <line x1="68" y1="66" x2="72" y2="66" stroke="#2a2520" strokeWidth="1.5" />
        {/* Smile */}
        <path d="M64 80 Q70 86, 76 80" fill="none" stroke="#c84b31" strokeWidth="1.6" strokeLinecap="round" />
        <text x="70" y="145" fontFamily="'Caveat', cursive" fontSize="13" textAnchor="middle" fill="#2a2520">
          Amriteshkumar Yadav
        </text>
      </g>

      {/* Stack of classical engineering textbooks */}
      <g transform="translate(380, 160)">
        <rect x="0" y="45" width="90" height="16" rx="2" fill="#c84b31" stroke="#2a2520" strokeWidth="1.8" />
        <text x="45" y="56" fontFamily="'JetBrains Mono', monospace" fontSize="6" textAnchor="middle" fill="#faf8f3">DISTRIBUTED SYSTEMS</text>
        <rect x="5" y="28" width="85" height="17" rx="2" fill="#3a6ea5" stroke="#2a2520" strokeWidth="1.8" />
        <text x="47" y="39" fontFamily="'JetBrains Mono', monospace" fontSize="6" textAnchor="middle" fill="#faf8f3">DESIGNING DATA APPS</text>
        <rect x="10" y="12" width="75" height="16" rx="2" fill="#2a2520" stroke="#2a2520" strokeWidth="1.8" />
        <text x="47" y="23" fontFamily="'JetBrains Mono', monospace" fontSize="6" textAnchor="middle" fill="#faf8f3">GRAPH NEURAL NETS</text>
      </g>

      {/* Coffee mug with steam */}
      <g transform="translate(140, 205)">
        <rect x="0" y="0" width="24" height="26" rx="3" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.8" />
        <path d="M24 6 C30 6, 30 20, 24 20" fill="none" stroke="#2a2520" strokeWidth="1.8" />
        <path d="M8 -6 Q12 -14, 8 -22 M16 -6 Q20 -14, 16 -22" fill="none" stroke="rgba(74,69,64,0.3)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Skills Section: Illustrated workshop toolboard
 */
export function ToolboardSkillsArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 540 280" className={className} aria-hidden="true">
      {/* Pegboard backing */}
      <rect x="20" y="20" width="500" height="240" rx="8" fill="#e8e2d6" stroke="#2a2520" strokeWidth="2.8" />
      {/* Pegboard dots */}
      <g fill="#2a2520" opacity="0.3">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 16 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={50 + c * 28} cy={50 + r * 30} r="1.5" />
          ))
        )}
      </g>

      {/* Tool 1: C++ Steel Caliper */}
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="8" height="110" rx="1" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.5" />
        <rect x="-8" y="10" width="24" height="14" rx="2" fill="#3a6ea5" stroke="#2a2520" strokeWidth="1.2" />
        <text x="4" y="140" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          C++20
        </text>
      </g>

      {/* Tool 2: Go Spanner */}
      <g transform="translate(150, 45)">
        <path d="M0 20 C-10 10, -10 -5, 8 -10 C20 -5, 20 10, 10 20 L10 100 L-2 100 Z" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.8" />
        <circle cx="5" cy="5" r="4" fill="#2a2520" />
        <text x="4" y="140" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          Go
        </text>
      </g>

      {/* Tool 3: Python Brass Compass */}
      <g transform="translate(250, 45)">
        <circle cx="10" cy="5" r="6" fill="#d4a843" stroke="#2a2520" strokeWidth="1.5" />
        <line x1="7" y1="10" x2="-6" y2="105" stroke="#2a2520" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="13" y1="10" x2="26" y2="105" stroke="#2a2520" strokeWidth="2.2" strokeLinecap="round" />
        <text x="10" y="140" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          Python
        </text>
      </g>

      {/* Tool 4: PyTorch GNN T-Square */}
      <g transform="translate(360, 45)">
        <rect x="-30" y="0" width="80" height="10" rx="2" fill="#c84b31" stroke="#2a2520" strokeWidth="1.5" />
        <rect x="6" y="10" width="8" height="95" rx="1" fill="#faf8f3" stroke="#2a2520" strokeWidth="1.5" />
        <text x="10" y="140" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          PyTorch / GNN
        </text>
      </g>

      {/* Tool 5: Kafka Streaming Meter */}
      <g transform="translate(450, 50)">
        <circle cx="18" cy="25" r="18" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
        <line x1="18" y1="25" x2="28" y2="15" stroke="#c84b31" strokeWidth="1.8" strokeLinecap="round" />
        <text x="18" y="70" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" textAnchor="middle" fill="#2a2520">
          Kafka KRaft
        </text>
      </g>

      {/* Bottom Tool Drawer Shelf */}
      <g transform="translate(40, 190)">
        <rect x="0" y="0" width="460" height="55" rx="4" fill="#faf8f3" stroke="#2a2520" strokeWidth="2" />
        <line x1="150" y1="0" x2="150" y2="55" stroke="#2a2520" strokeWidth="1.5" />
        <line x1="310" y1="0" x2="310" y2="55" stroke="#2a2520" strokeWidth="1.5" />
        {/* Brass handles */}
        <rect x="65" y="22" width="20" height="6" rx="2" fill="#d4a843" stroke="#2a2520" />
        <rect x="220" y="22" width="20" height="6" rx="2" fill="#d4a843" stroke="#2a2520" />
        <rect x="375" y="22" width="20" height="6" rx="2" fill="#d4a843" stroke="#2a2520" />
        <text x="75" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">STORAGE &amp; DB</text>
        <text x="230" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">HIGH-PERF RUNTIMES</text>
        <text x="385" y="44" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#4a4540">QUANT &amp; SCIENTIFIC</text>
      </g>
    </svg>
  );
}

/**
 * Dispatch & Contact Section: Illustrated writing bureau
 */
export function DispatchDeskContactArt({ className = 'w-full h-auto' }: ArtProps) {
  return (
    <svg viewBox="0 0 540 320" className={className} aria-hidden="true">
      {/* Writing Bureau Desk */}
      <rect x="40" y="160" width="460" height="130" rx="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="2.8" />
      <line x1="40" y1="180" x2="500" y2="180" stroke="#2a2520" strokeWidth="1.8" />

      {/* Airmail Envelope with red/blue border */}
      <g transform="translate(140, 70) rotate(-4)">
        <rect x="0" y="0" width="260" height="160" rx="4" fill="#faf8f3" stroke="#2a2520" strokeWidth="2.4" />
        {/* Diagonal envelope back flap */}
        <polyline points="0,0 130,95 260,0" fill="none" stroke="#2a2520" strokeWidth="1.8" />
        {/* Red Wax Seal */}
        <circle cx="130" cy="95" r="18" fill="#c84b31" stroke="#2a2520" strokeWidth="1.8" />
        <text x="130" y="100" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="800" textAnchor="middle" fill="#faf8f3">
          AY
        </text>
        {/* Postage Stamp in corner */}
        <rect x="215" y="15" width="32" height="38" rx="2" fill="#d4a843" stroke="#2a2520" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="231" y="38" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#2a2520">
          2026
        </text>
      </g>

      {/* Ink Bottle and Dip Quill Pen */}
      <g transform="translate(70, 160)">
        {/* Glass ink bottle */}
        <rect x="0" y="20" width="36" height="34" rx="4" fill="#2a2520" stroke="#2a2520" strokeWidth="1.5" />
        <rect x="8" y="14" width="20" height="6" fill="#f0ece3" stroke="#2a2520" strokeWidth="1.2" />
        <text x="18" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="7" textAnchor="middle" fill="#faf8f3">INK</text>
        {/* Feather Quill */}
        <path d="M18 16 C30 -20, 70 -40, 95 -60 C80 -40, 50 -20, 22 14" fill="#e8e2d6" stroke="#2a2520" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/**
 * Illustrated bicycle rider icon for navigation and buttons
 */
export function CyclistStamp({ className = 'w-5 h-5' }: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="10" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="10,28 19,28 16,18 27,18 30,28" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="18" x2="19" y2="28" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="21" cy="11" r="3.5" fill="#c84b31" />
      <line x1="21" y1="14" x2="27" y2="18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
