// THE ENGINEERING TRACK — Handcrafted terrain, Free Rider HD physics & scenery lines,
// project checkpoints, and collectible stars.

export interface Seg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface SceneryLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dashed?: boolean;
}

export interface Star {
  id: string;
  x: number;
  y: number;
  collected?: boolean;
}

export interface Checkpoint {
  x: number;
  y: number;
  projectId: string;
  label: string;
}

export interface Decoration {
  kind:
    | 'workbench'
    | 'db'
    | 'tower'
    | 'breaker'
    | 'bridge'
    | 'shelf'
    | 'chart'
    | 'pipes'
    | 'camera'
    | 'flag'
    | 'sign'
    | 'banner';
  x: number;
  y: number;
  w?: number;
  text?: string;
}

export interface TrackSection {
  id: string;
  num: string;
  name: string;
  startX: number;
  endX: number;
  projectId?: string;
}

export interface Track {
  segments: Seg[];
  scenery: SceneryLine[];
  stars: Star[];
  buckets: Map<number, Seg[]>;
  checkpoints: Checkpoint[];
  decorations: Decoration[];
  sections: TrackSection[];
  length: number;
  startX: number;
  startY: number;
  killY: number;
}

const sections: TrackSection[] = [
  { id: 'workshop', num: '00', name: 'THE LAUNCH & WORKSHOP', startX: -200, endX: 1250, projectId: 'workshop' },
  { id: 'db', num: '01', name: 'DATABASE TERRAIN', startX: 1250, endX: 3400, projectId: 'neural-query-optimizer' },
  { id: 'reliability', num: '02', name: 'RELIABILITY MOUNTAINS', startX: 3400, endX: 5600, projectId: 'llm-reliability-control-plane' },
  { id: 'tradeflow', num: '03', name: 'TRADEFLOW BRIDGE', startX: 5600, endX: 7050, projectId: 'tradeflow' },
  { id: 'warehouse', num: '04', name: 'WAREHOUSE RUN', startX: 7050, endX: 8750, projectId: 'warehouse-routing-engine' },
  { id: 'quant', num: '05', name: 'QUANTITATIVE VALLEY', startX: 8750, endX: 10750, projectId: 'moneyball' },
  { id: 'telemetry', num: '06', name: 'TELEMETRY FACTORY', startX: 10750, endX: 12100, projectId: 'fault-tolerant-ml-telemetry' },
  { id: 'safety', num: '07', name: 'SAFETY OUTPOST', startX: 12100, endX: 14200, projectId: 'workplace-safety-vision' },
  { id: 'finish', num: '08', name: 'VICTORY RUNWAY', startX: 14200, endX: 16200 },
];

export function buildTrack(): Track {
  const pts: [number, number][] = [];
  const add = (x: number, y: number) => pts.push([x, y]);

  // =========================================================================
  // 00 — THE LAUNCH & WORKSHOP: Dynamic opening with hill, jump, and stars!
  // =========================================================================
  add(-200, 150);
  add(0, 150);     // Starting elevated wooden launch platform
  add(120, 210);   // Downhill slope giving immediate speed
  add(240, 280);   // Valley dip
  add(360, 230);   // Launch kicker lip
  // Jump gap over ravine (x: 360 to 460)
  add(460, 250);   // Landing transition
  add(580, 290);   // Smooth flat rollout into the workshop gate
  add(800, 290);
  add(1050, 290);
  add(1250, 290);

  // =========================================================================
  // 01 — DATABASE TERRAIN: Rolling query plan hills and speed plateaus
  // =========================================================================
  add(1420, 210);  // HashJoin hill
  add(1600, 290);
  add(1800, 290);
  add(1980, 220);  // IndexScan peak
  add(2350, 220);  // Checkpoint plateau
  add(2550, 310);
  add(2750, 190);  // High analytical crest
  add(2950, 290);
  add(3400, 290);

  // =========================================================================
  // 02 — RELIABILITY MOUNTAINS: Transmission peaks & survivable drop
  // =========================================================================
  add(3520, 150);  // Steep climb to primary peak
  add(3640, 150);
  add(3780, 290);
  add(3900, 390);  // Safe curved valley bottom
  add(4060, 290);
  add(4220, 170);  // Secondary crest
  add(4380, 280);
  add(4500, 230);
  add(4750, 230);  // Checkpoint plateau
  add(4900, 320);
  add(5150, 160);
  add(5350, 310);
  add(5600, 310);

  // =========================================================================
  // 03 — TRADEFLOW BRIDGE: Arched suspension bridge over gorge
  // =========================================================================
  add(5750, 290);
  add(6000, 250);  // Gentle bridge arch
  add(6300, 240);  // Mid-bridge crest
  add(6600, 250);
  add(6900, 290);
  add(7050, 340);
  add(7250, 340);

  // =========================================================================
  // 04 — WAREHOUSE RUN: Stepped shelf hops and picking aisles
  // =========================================================================
  add(7350, 340);
  add(7430, 295);  // Shelf hop 1
  add(7500, 340);
  add(7600, 340);
  add(7680, 290);  // Shelf hop 2
  add(7760, 340);
  add(7880, 340);
  add(7960, 280);  // Shelf hop 3
  add(8040, 340);
  add(8200, 340);
  add(8350, 340);
  add(8500, 275);  // High picking ramp
  add(8650, 340);
  add(8750, 340);

  // =========================================================================
  // 05 — QUANTITATIVE VALLEY: Merton Jump curve drops & fat tails
  // =========================================================================
  add(8950, 280);
  add(9150, 440);  // Deep drawdown drop
  add(9450, 440);  // Tail floor
  add(9680, 305);  // Rebound curve
  add(9880, 440);  // Second regime switch
  add(10150, 440);
  add(10380, 315);
  add(10580, 340);
  add(10750, 340);

  // =========================================================================
  // 06 — TELEMETRY FACTORY: Stepped partition conveyors
  // =========================================================================
  add(10850, 340);
  add(10850, 400); // Step 1
  add(11050, 400);
  add(11050, 465); // Step 2
  add(11250, 465);
  add(11250, 530); // Step 3
  add(11500, 530);
  add(11720, 530);
  add(11920, 450);
  add(12100, 450);

  // =========================================================================
  // 07 — SAFETY OUTPOST: Crane gantry jumps & radar crests
  // =========================================================================
  add(12400, 450);
  add(12650, 395);
  add(12900, 450);
  add(13180, 395);
  add(13420, 450);
  add(13650, 450);
  add(13850, 390);
  add(14200, 390);

  // =========================================================================
  // 08 — VICTORY RUNWAY: Smooth sprint to finish banner
  // =========================================================================
  add(16200, 390);

  // Convert points to physics line segments
  const segments: Seg[] = [];
  for (let i = 1; i < pts.length; i++) {
    segments.push({
      x1: pts[i - 1][0],
      y1: pts[i - 1][1],
      x2: pts[i][0],
      y2: pts[i][1],
    });
  }

  // Also add suspension bridge floor planks across ravine jump
  segments.push({ x1: 360, y1: 290, x2: 460, y2: 290 });

  // Spatial Buckets for fast $O(1)$ collision lookup
  const buckets = new Map<number, Seg[]>();
  const BUCKET = 96;
  for (const s of segments) {
    const b0 = Math.floor(Math.min(s.x1, s.x2) / BUCKET);
    const b1 = Math.floor(Math.max(s.x1, s.x2) / BUCKET);
    for (let b = b0; b <= b1; b++) {
      if (!buckets.has(b)) buckets.set(b, []);
      buckets.get(b)!.push(s);
    }
  }

  // =========================================================================
  // DECORATIVE SCENERY LINES (Free Rider HD background art — non-colliding)
  // =========================================================================
  const scenery: SceneryLine[] = [];
  const addScenery = (x1: number, y1: number, x2: number, y2: number, color = 'rgba(74,69,64,0.3)', width = 1.4, dashed = false) => {
    scenery.push({ x1, y1, x2, y2, color, width, dashed });
  };

  // Launch area wooden trestle support struts
  addScenery(-100, 150, -100, 300, 'rgba(74,69,64,0.35)', 2);
  addScenery(0, 150, 0, 300, 'rgba(74,69,64,0.35)', 2);
  addScenery(-100, 180, 0, 260, 'rgba(74,69,64,0.25)', 1.2);
  addScenery(0, 180, -100, 260, 'rgba(74,69,64,0.25)', 1.2);

  // Background Mountain Range (Far parallax lines)
  addScenery(-200, 80, 200, 20, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(200, 20, 600, 90, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(600, 90, 1100, 10, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(1100, 10, 1600, 100, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(1600, 100, 2200, 15, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(2200, 15, 2900, 110, 'rgba(74,69,64,0.18)', 1.2);
  addScenery(2900, 110, 3600, 0, 'rgba(74,69,64,0.18)', 1.2);

  // Suspension bridge suspension cables across Tradeflow gorge
  addScenery(5750, 180, 6300, 235, '#3a6ea5', 1.6);
  addScenery(6300, 235, 6900, 180, '#3a6ea5', 1.6);
  for (let bx = 5850; bx < 6850; bx += 80) {
    addScenery(bx, 210, bx, 260, 'rgba(58,110,165,0.4)', 1);
  }

  // =========================================================================
  // COLLECTIBLE GOLDEN STARS (20 Stars across the track)
  // =========================================================================
  const stars: Star[] = [
    { id: 'star-0', x: 200, y: 220 },
    { id: 'star-1', x: 410, y: 190 }, // In mid-air over the opening jump!
    { id: 'star-2', x: 500, y: 210 },
    { id: 'star-3', x: 1420, y: 160 }, // Peak of HashJoin hill
    { id: 'star-4', x: 1980, y: 170 },
    { id: 'star-5', x: 2750, y: 140 }, // High analytical crest
    { id: 'star-6', x: 3580, y: 100 }, // Reliability primary peak
    { id: 'star-7', x: 3900, y: 340 }, // Pit safe line
    { id: 'star-8', x: 4220, y: 120 },
    { id: 'star-9', x: 5150, y: 110 },
    { id: 'star-10', x: 6300, y: 190 }, // Mid-air over Tradeflow bridge
    { id: 'star-11', x: 7430, y: 250 }, // Warehouse shelf hop 1
    { id: 'star-12', x: 7680, y: 240 }, // Warehouse shelf hop 2
    { id: 'star-13', x: 7960, y: 230 }, // Warehouse shelf hop 3
    { id: 'star-14', x: 8500, y: 220 }, // High warehouse picking ramp
    { id: 'star-15', x: 9680, y: 250 }, // Quant rebound peak
    { id: 'star-16', x: 10380, y: 260 },
    { id: 'star-17', x: 11500, y: 480 }, // Telemetry factory conveyor
    { id: 'star-18', x: 12650, y: 340 }, // Safety outpost crane jump
    { id: 'star-19', x: 13850, y: 330 }, // Final radar crest
  ];

  // Project Checkpoints
  const cps: { x: number; y: number; projectId: string; label: string }[] = [
    { x: 650, y: 290, projectId: 'workshop', label: 'THE WORKSHOP' },
    { x: 2350, y: 220, projectId: 'neural-query-optimizer', label: 'DB TERRAIN' },
    { x: 4750, y: 230, projectId: 'llm-reliability-control-plane', label: 'RELIABILITY MTS' },
    { x: 6300, y: 240, projectId: 'tradeflow', label: 'TRADEFLOW BRIDGE' },
    { x: 8200, y: 340, projectId: 'warehouse-routing-engine', label: 'WAREHOUSE RUN' },
    { x: 9450, y: 440, projectId: 'moneyball', label: 'QUANT VALLEY' },
    { x: 11500, y: 530, projectId: 'fault-tolerant-ml-telemetry', label: 'TELEMETRY FACTORY' },
    { x: 13650, y: 450, projectId: 'workplace-safety-vision', label: 'SAFETY OUTPOST' },
    { x: 15400, y: 390, projectId: 'finish', label: 'VICTORY RUNWAY' },
  ];

  const checkpoints: Checkpoint[] = cps.map((c) => ({
    x: c.x,
    y: c.y,
    projectId: c.projectId,
    label: c.label,
  }));

  const decorations: Decoration[] = [
    { kind: 'sign', x: 180, y: 260, text: 'LAUNCH RAMP →' },
    { kind: 'workbench', x: 950, y: 290 },
    { kind: 'sign', x: 1200, y: 290, text: 'SEC 01: DATABASE →' },
    { kind: 'db', x: 1620, y: 290 },
    { kind: 'db', x: 2950, y: 290 },
    { kind: 'sign', x: 3380, y: 290, text: 'SEC 02: RELIABILITY →' },
    { kind: 'tower', x: 3580, y: 150 },
    { kind: 'breaker', x: 4500, y: 230 },
    { kind: 'tower', x: 5150, y: 160 },
    { kind: 'sign', x: 5580, y: 310, text: 'SEC 03: TRADEFLOW →' },
    { kind: 'bridge', x: 5750, y: 290, w: 1150 },
    { kind: 'sign', x: 7040, y: 340, text: 'SEC 04: WAREHOUSE →' },
    { kind: 'shelf', x: 7430, y: 295 },
    { kind: 'shelf', x: 7680, y: 290 },
    { kind: 'shelf', x: 7960, y: 280 },
    { kind: 'sign', x: 8740, y: 340, text: 'SEC 05: QUANT VALLEY →' },
    { kind: 'chart', x: 9450, y: 440 },
    { kind: 'chart', x: 10150, y: 440 },
    { kind: 'sign', x: 10740, y: 340, text: 'SEC 06: TELEMETRY →' },
    { kind: 'pipes', x: 11050, y: 400 },
    { kind: 'pipes', x: 11500, y: 530 },
    { kind: 'sign', x: 12080, y: 450, text: 'SEC 07: SAFETY →' },
    { kind: 'camera', x: 12650, y: 395 },
    { kind: 'camera', x: 13420, y: 450 },
    { kind: 'flag', x: 15400, y: 390 },
    { kind: 'banner', x: 15200, y: 390, text: 'END OF TRACK — CONGRATULATIONS' },
  ];

  return {
    segments,
    scenery,
    stars,
    buckets,
    checkpoints,
    decorations,
    sections,
    length: 15800,
    startX: 0,
    startY: 100, // Drops right onto launch platform at y=150
    killY: 760,
  };
}
