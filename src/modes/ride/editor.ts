import { segment } from "./track";
import type { Segment, Track } from "./track";
export interface TrackDocument {
  version: 1;
  name: string;
  physics: Segment[];
  scenery: Segment[];
}
const clone = <T>(x: T): T => structuredClone(x);
export function validateTrack(value: unknown): TrackDocument {
  if (!value || typeof value !== "object")
    throw new Error("Expected a track JSON object.");
  const d = value as Record<string, unknown>;
  if (d.version !== 1 || typeof d.name !== "string" || d.name.length > 100)
    throw new Error(
      "Track needs version 1 and a name of at most 100 characters.",
    );
  for (const kind of ["physics", "scenery"]) {
    const lines = d[kind];
    if (!Array.isArray(lines) || lines.length > 2000)
      throw new Error("Each layer must contain at most 2,000 segments.");
    for (const line of lines) {
      if (!line || typeof line !== "object")
        throw new Error("Invalid line segment.");
      for (const p of [line.a, line.b])
        if (
          !p ||
          !Number.isFinite(p.x) ||
          !Number.isFinite(p.y) ||
          Math.abs(p.x) > 2000 ||
          Math.abs(p.y) > 2000
        )
          throw new Error(
            "Coordinates must be finite and within ±2,000 metres.",
          );
      if (Math.hypot(line.a.x - line.b.x, line.a.y - line.b.y) < 0.05)
        throw new Error("Line segments must be at least 0.05 metres long.");
    }
  }
  if (!(d.physics as Segment[]).length)
    throw new Error("Add at least one physics line before importing a track.");
  return {
    version: 1,
    name: d.name,
    physics: clone(d.physics as Segment[]),
    scenery: clone(d.scenery as Segment[]),
  };
}
export class TrackEditor {
  document: TrackDocument = {
    version: 1,
    name: "My paper trail",
    physics: [segment(-5, 0, 20, 0)],
    scenery: [],
  };
  private undoStack: TrackDocument[] = [];
  private redoStack: TrackDocument[] = [];
  private change(next: TrackDocument) {
    this.undoStack.push(clone(this.document));
    if (this.undoStack.length > 100) this.undoStack.shift();
    this.redoStack = [];
    this.document = clone(next);
  }
  add(kind: "physics" | "scenery", line: Segment) {
    for (const p of [line.a, line.b]) {
      if (
        !Number.isFinite(p.x) ||
        !Number.isFinite(p.y) ||
        Math.abs(p.x) > 2000 ||
        Math.abs(p.y) > 2000
      )
        throw new Error("Coordinates must be finite and within ±2,000 metres.");
    }
    if (Math.hypot(line.b.x - line.a.x, line.b.y - line.a.y) < 0.05) return;
    const d = clone(this.document);
    if (d[kind].length >= 2000) throw new Error("Layer limit: 2,000 lines.");
    d[kind].push(clone(line));
    this.change(d);
  }
  erase(x: number, y: number, radius = 0.8) {
    const d = clone(this.document);
    let best: {
      kind: "physics" | "scenery";
      i: number;
      distance: number;
    } | null = null;
    for (const kind of ["physics", "scenery"] as const)
      d[kind].forEach((s, i) => {
        const dx = s.b.x - s.a.x,
          dy = s.b.y - s.a.y;
        const t = Math.max(
          0,
          Math.min(
            1,
            ((x - s.a.x) * dx + (y - s.a.y) * dy) / (dx * dx + dy * dy),
          ),
        );
        const distance = Math.hypot(x - s.a.x - t * dx, y - s.a.y - t * dy);
        if (distance < radius && (!best || distance < best.distance))
          best = { kind, i, distance };
      });
    if (best) {
      const hit = best as { kind: "physics" | "scenery"; i: number };
      d[hit.kind].splice(hit.i, 1);
      this.change(d);
    }
  }
  undo() {
    const d = this.undoStack.pop();
    if (d) {
      this.redoStack.push(clone(this.document));
      this.document = d;
    }
  }
  redo() {
    const d = this.redoStack.pop();
    if (d) {
      this.undoStack.push(clone(this.document));
      this.document = d;
    }
  }
  get canUndo() {
    return this.undoStack.length > 0;
  }
  get canRedo() {
    return this.redoStack.length > 0;
  }
  clear() {
    this.change({ ...this.document, physics: [], scenery: [] });
  }
  import(text: string) {
    this.change(validateTrack(JSON.parse(text)));
  }
  export() {
    return JSON.stringify(this.document, null, 2);
  }
  toTrack(): Track {
    if (!this.document.physics.length)
      throw new Error("Draw a physics starting platform first.");
    const d = clone(this.document),
      first = d.physics[0];
    const left = first.a.x < first.b.x ? first.a : first.b;
    return {
      name: d.name,
      physics: d.physics,
      scenery: d.scenery,
      sections: [
        {
          name: "Your paper trail",
          start: -2000,
          end: 2000,
          theme: "workshop",
        },
      ],
      checkpoints: [],
      stars: [],
      start: {
        x: left.x + Math.min(3, Math.abs(first.b.x - first.a.x) / 2),
        y: Math.max(first.a.y, first.b.y) + 0.1,
      },
      finish: Math.max(...d.physics.flatMap((s) => [s.a.x, s.b.x])) - 0.5,
    };
  }
}
