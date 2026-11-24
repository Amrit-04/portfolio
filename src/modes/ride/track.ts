export interface Point {
  x: number;
  y: number;
}
export interface Segment {
  a: Point;
  b: Point;
}
export interface TrackSection {
  name: string;
  start: number;
  end: number;
  theme:
    | "workshop"
    | "database"
    | "mountains"
    | "bridge"
    | "warehouse"
    | "quant"
    | "factory"
    | "vision"
    | "finish";
  project?: string;
}
export interface Checkpoint {
  x: number;
  y: number;
  section: number;
  project?: string;
}
export interface Track {
  name: string;
  physics: Segment[];
  scenery: Segment[];
  sections: TrackSection[];
  checkpoints: Checkpoint[];
  stars: Point[];
  start: Point;
  finish: number;
}
export const segment = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Segment => ({ a: { x: x1, y: y1 }, b: { x: x2, y: y2 } });
function polyline(points: number[][]): Segment[] {
  return points
    .slice(1)
    .map((p, i) => segment(points[i][0], points[i][1], p[0], p[1]));
}
/** Explicit authored strokes. Disconnected strokes are REAL gaps in both render and collision. */
export function buildTrack(): Track {
  const physics = [
    ...polyline([
      [-15, 0],
      [16, 0],
      [20, 1],
      [25, 1],
      [30, 0.1],
      [36, -0.3],
      [42, 0.6],
      [48, 0.6],
      [54, -0.2],
      [59, -0.2],
      [65, 0],
      [72, 2.4],
      [77, 2.4],
      [80, 3],
    ]),
    ...polyline([
      [83, 1.8],
      [90, 0],
      [96, -0.3],
      [101, 0],
      [104, 0.8],
      [112, 0.8],
      [115, 0.5],
      [120, 0.5],
      [126, -0.4],
      [132, -0.4],
      [138, 0],
      [140, 0.5],
      [144, 0.5],
      [146, 0],
      [148, 0.8],
      [152, 0.8],
      [156, 0],
      [166, 0],
      [172, -2],
      [180, -2],
      [188, 1.5],
      [191, 0.5],
      [198, 0],
      [204, -0.5],
      [209, -0.5],
      [210, 0],
      [214, 1.5],
      [221, 1.5],
      [229, 0],
      [240, 0],
      [245, 2],
      [249, 3],
      [253, 1],
      [260, 0],
      [267, -0.5],
      [274, -0.5],
      [280, 0.2],
      [286, 0.3],
      [292, 0],
      [300, 0],
    ]),
  ];
  const definitions: [string, number, TrackSection["theme"], string?][] = [
    ["The Workshop", 0, "workshop"],
    ["Database Terrain", 32, "database", "neural-query-optimizer"],
    ["Reliability Mountains", 60, "mountains", "llm-reliability-control-plane"],
    ["Tradeflow Bridge", 96, "bridge", "tradeflow"],
    ["Warehouse Run", 128, "warehouse", "warehouse-routing-engine"],
    ["Quantitative Valley", 160, "quant", "moneyball"],
    ["Telemetry Factory", 204, "factory", "fault-tolerant-ml-telemetry"],
    ["Computer Vision Outpost", 234, "vision", "workplace-safety-vision"],
    ["Victory Runway", 269, "finish"],
  ];
  const sections = definitions.map(([name, start, theme, project], i) => ({
    name,
    start,
    end: definitions[i + 1]?.[1] ?? 286,
    theme,
    project,
  }));
  const track: Track = {
    name: "The Engineering Trail",
    physics,
    scenery: [],
    sections,
    checkpoints: [],
    stars: [],
    start: { x: 3, y: 0 },
    finish: 286,
  };
  track.checkpoints = sections.map((s, i) => ({
    x: Math.max(3, s.start + 1),
    y: heightAt(physics, Math.max(3, s.start + 1)) ?? 0,
    section: i,
    project: s.project,
  }));
  track.stars = [
    12, 24, 39, 50, 68, 77, 87, 103, 119, 135, 150, 166, 180, 196, 213, 226,
    242, 258, 274, 281,
  ].map((x) => ({ x, y: (heightAt(physics, x) ?? 0) + 1.3 }));
  return track;
}
export function heightAt(lines: Segment[], x: number): number | null {
  let h: number | null = null;
  for (const { a, b } of lines) {
    if (x >= Math.min(a.x, b.x) && x <= Math.max(a.x, b.x) && a.x !== b.x) {
      const y = a.y + ((x - a.x) * (b.y - a.y)) / (b.x - a.x);
      h = h === null ? y : Math.max(h, y);
    }
  }
  return h;
}
export function sectionAt(track: Track, x: number): number {
  return Math.max(
    0,
    track.sections.findLastIndex((s) => x >= s.start),
  );
}
