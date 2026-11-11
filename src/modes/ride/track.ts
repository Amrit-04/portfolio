// THE ENGINEERING TRACK — hand-laid terrain, themed sections, project checkpoints.

export interface Seg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
  { id: 'workshop', num: '00', name: 'THE WORKSHOP', startX: -700, endX: 1250, projectId: 'workshop' },
  { id: 'db', num: '01', name: 'DATABASE TERRAIN', startX: 1250, endX: 3400, projectId: 'neural-query-optimizer' },
  { id: 'reliability', num: '02', name: 'RELIABILITY MOUNTAINS', startX: 3400, endX: 5600, projectId: 'llm-reliability-control-plane' },
  { id: 'tradeflow', num: '03', name: 'TRADEFLOW BRIDGE', startX: 5600, endX: 7050, projectId: 'tradeflow' },
  { id: 'warehouse', num: '04', name: 'WAREHOUSE RUN', startX: 7050, endX: 8750, projectId: 'warehouse-routing-engine' },
  { id: 'quant', num: '05', name: 'QUANTITATIVE VALLEY', startX: 8750, endX: 10750, projectId: 'moneyball' },
  { id: 'telemetry', num: '06', name: 'TELEMETRY FACTORY', startX: 10750, endX: 12100, projectId: 'fault-tolerant-ml-telemetry' },
  { id: 'safety', num: '07', name: 'SAFETY OUTPOST', startX: 12100, endX: 14200, projectId: 'workplace-safety-vision' },
  { id: 'finish', num: '08', name: 'END OF TRACK', startX: 14200, endX: 15800 },
];

function groundYAt(pts: [number, number][], x: number): number {
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i - 1];
    const [x2, y2] = pts[i];
    if (x >= x1 && x <= x2) {
      const t = (x - x1) / Math.max(1, x2 - x1);
      return y1 + (y2 - y1) * t;
    }
  }
  return pts[pts.length - 1][1];
}

export function buildTrack(): Track {
  const pts: [number, number][] = [];
  const add = (x: number, y: number) => pts.push([x, y]);

  // 00 — THE WORKSHOP: long flat runway to learn the bike
  add(-700, 300);
  add(1250, 300);

  // 01 — DATABASE TERRAIN: rolling hills, plateau, dips
  add(1450, 220);
  add(1650, 300);
  add(1800, 300);
  add(2000, 240);
  add(2350, 240); // checkpoint plateau
  add(2550, 330);
  add(2750, 205);
  add(2950, 300);
  add(3400, 300);

  // 02 — RELIABILITY MOUNTAINS: big peaks & a survivable spike pit
  add(3450, 160);
  add(3560, 160);
  add(3700, 300);
  add(3820, 420); // pit bottom
  add(3980, 300);
  add(4150, 180);
  add(4300, 300);
  add(4400, 240);
  add(4700, 240); // checkpoint plateau
  add(4850, 340);
  add(5100, 165);
  add(5300, 320);
  add(5600, 320);

  // 03 — TRADEFLOW BRIDGE: arched deck over a gorge (side walls let you ride out)
  add(5750, 300);
  add(6000, 268);
  add(6300, 258);
  add(6600, 268);
  add(6900, 300);
  add(7050, 360);
  add(7250, 360);

  // 04 — WAREHOUSE RUN: shelf bumps to hop
  add(7350, 360);
  add(7420, 318);
  add(7490, 360);
  add(7600, 360);
  add(7670, 312);
  add(7740, 360);
  add(7850, 360);
  add(7925, 302);
  add(8000, 360);
  add(8150, 360);
  add(8300, 360);
  add(8450, 296);
  add(8600, 360);
  add(8750, 360);

  // 05 — QUANTITATIVE VALLEY: deep drawdowns (naturally)
  add(8950, 300);
  add(9150, 470);
  add(9420, 470);
  add(9650, 325);
  add(9850, 470);
  add(10120, 470);
  add(10360, 335);
  add(10550, 360);
  add(10750, 360);

  // 06 — TELEMETRY FACTORY: stepped platforms
  add(10850, 360);
  add(10850, 428);
  add(11050, 428);
  add(11050, 494);
  add(11250, 494);
  add(11250, 558);
  add(11500, 558);
  add(11700, 558);
  add(11900, 478);
  add(12100, 478);

  // 07 — SAFETY OUTPOST: gentle camera-tower hills
  add(12400, 478);
  add(12650, 438);
  add(12900, 478);
  add(13150, 438);
  add(13400, 478);
  add(13600, 478);
  add(13800, 418);
  add(14200, 418);

  // 08 — END OF TRACK: victory runway
  add(15800, 418);

  const segments: Seg[] = [];
  for (let i = 1; i < pts.length; i++) {
    segments.push({ x1: pts[i - 1][0], y1: pts[i - 1][1], x2: pts[i][0], y2: pts[i][1] });
  }

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

  const cps: { x: number; projectId: string; label: string }[] = [
    { x: 420, projectId: 'workshop', label: 'THE WORKSHOP' },
    { x: 2170, projectId: 'neural-query-optimizer', label: 'DB TERRAIN' },
    { x: 4550, projectId: 'llm-reliability-control-plane', label: 'RELIABILITY MTS' },
    { x: 6300, projectId: 'tradeflow', label: 'TRADEFLOW BRIDGE' },
    { x: 8150, projectId: 'warehouse-routing-engine', label: 'WAREHOUSE RUN' },
    { x: 9280, projectId: 'moneyball', label: 'QUANT VALLEY' },
    { x: 11400, projectId: 'fault-tolerant-ml-telemetry', label: 'TELEMETRY FACTORY' },
    { x: 12760, projectId: 'workplace-safety-vision', label: 'SAFETY OUTPOST' },
    { x: 14900, projectId: 'finish', label: 'END OF TRACK' },
  ];
  const checkpoints: Checkpoint[] = cps.map((c) => ({
    x: c.x,
    y: groundYAt(pts, c.x),
    projectId: c.projectId,
    label: c.label,
  }));

  const g = (x: number) => groundYAt(pts, x);
  const decorations: Decoration[] = [
    { kind: 'sign', x: 180, y: g(180), text: 'WELCOME TO THE TRACK' },
    { kind: 'workbench', x: 900, y: g(900) },
    { kind: 'sign', x: 1160, y: g(1160), text: 'SEC 01 →' },
    { kind: 'db', x: 1620, y: g(1620) },
    { kind: 'db', x: 2900, y: g(2900) },
    { kind: 'sign', x: 3350, y: g(3350), text: 'SEC 02 →' },
    { kind: 'tower', x: 3505, y: g(3505) },
    { kind: 'breaker', x: 4430, y: g(4430) },
    { kind: 'tower', x: 5100, y: g(5100) },
    { kind: 'sign', x: 5560, y: g(5560), text: 'SEC 03 →' },
    { kind: 'bridge', x: 5750, y: g(5750), w: 1150 },
    { kind: 'sign', x: 7020, y: g(7020), text: 'SEC 04 →' },
    { kind: 'shelf', x: 7420, y: g(7420) },
    { kind: 'shelf', x: 7670, y: g(7670) },
    { kind: 'shelf', x: 7925, y: g(7925) },
    { kind: 'sign', x: 8720, y: g(8720), text: 'SEC 05 →' },
    { kind: 'chart', x: 9700, y: g(9700) },
    { kind: 'chart', x: 10200, y: g(10200) },
    { kind: 'sign', x: 10700, y: g(10700), text: 'SEC 06 →' },
    { kind: 'pipes', x: 10960, y: g(10960) },
    { kind: 'pipes', x: 11580, y: g(11580) },
    { kind: 'sign', x: 12080, y: g(12080), text: 'SEC 07 →' },
    { kind: 'camera', x: 12460, y: g(12460) },
    { kind: 'camera', x: 13320, y: g(13320) },
    { kind: 'flag', x: 15250, y: g(15250) },
    { kind: 'banner', x: 14900, y: g(14900), text: 'END OF TRACK' },
  ];

  return {
    segments,
    buckets,
    checkpoints,
    decorations,
    sections,
    length: 15400,
    startX: 120,
    startY: g(120) - 70,
    killY: 760,
  };
}
