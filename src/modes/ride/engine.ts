// Verlet bicycle physics with a fixed 120 Hz timestep.
// Two independently-constrained wheels, a chassis node and a rider head node.
// Head touches terrain = ragdoll crash → respawn at last checkpoint.
// Enhanced Free Rider HD physics: Scenery lines, collectible stars, and track editor integration.

import { Track, buildTrack, Checkpoint, Seg, SceneryLine } from './track';
import { drawWorld } from './render';
import { sfx } from '../../lib/sound';

export interface EngineInput {
  accel: boolean;
  brake: boolean;
  leanB: boolean;
  leanF: boolean;
}

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color?: string;
}

export interface EngineCallbacks {
  onSection: (name: string, num: string) => void;
  onProgress: (pct: number, meters: number) => void;
  onCheckpoint: (cp: Checkpoint) => void;
  onCheckpointLeave: () => void;
  onCrash: () => void;
  onRespawn: () => void;
  onFinish: () => void;
  requestPause: () => void;
  onStarCollect?: (collectedCount: number, totalStars: number) => void;
}

const STEP = 1 / 120;
const GRAVITY = 0.16;
const WHEEL_R = 14;
const HEAD_R = 9;
const MAX_SPEED = 6.8;

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  track: Track;
  private cb: EngineCallbacks;
  private raf = 0;
  private accumulator = 0;
  private lastTime = 0;
  dpr = 1;
  running = false;
  private destroyed = false;

  input: EngineInput = { accel: false, brake: false, leanB: false, leanF: false };

  // bike state
  w1: Point; // rear wheel
  w2: Point; // front wheel
  frame: Point;
  head: Point;
  wheelSpin = 0;
  crashed = false;
  crashTimer = 0;
  airTime = 0;
  wasAir = false;
  grounded = false;

  // camera
  camX = 0;
  camY = 140;
  zoom = 1.25;

  // progress & gameplay
  visited = new Set<string>();
  activeCheckpoint: Checkpoint | null = null;
  respawnCp: Checkpoint | null = null;
  particles: Particle[] = [];
  speed = 0;
  collectedStarsCount = 0;

  // editor state (if active)
  editorActive = false;
  editorTool: 'physics' | 'scenery' | 'line' | 'eraser' = 'physics';
  editorDraftLine: { x1: number; y1: number; x2: number; y2: number } | null = null;
  customHistory: Array<{ type: 'physics' | 'scenery'; item: Seg | SceneryLine }> = [];

  private onVis = () => {
    if (document.hidden && this.running) this.cb.requestPause();
  };

  constructor(canvas: HTMLCanvasElement, cb: EngineCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.track = buildTrack();
    this.cb = cb;
    this.w1 = { x: 0, y: 0, ox: 0, oy: 0 };
    this.w2 = { x: 0, y: 0, ox: 0, oy: 0 };
    this.frame = { x: 0, y: 0, ox: 0, oy: 0 };
    this.head = { x: 0, y: 0, ox: 0, oy: 0 };
    this.placeAt(this.track.startX, this.track.startY);
    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.onVis);
    this.running = true;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  destroy() {
    this.destroyed = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.onVis);
  }

  pause() {
    this.running = false;
  }

  resume() {
    if (this.destroyed) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
  };

  placeAt(x: number, y: number) {
    this.w1 = { x: x - 22, y: y - 14, ox: x - 22, oy: y - 14 };
    this.w2 = { x: x + 22, y: y - 14, ox: x + 22, oy: y - 14 };
    this.frame = { x, y: y - 36, ox: x, oy: y - 36 };
    this.head = { x, y: y - 62, ox: x, oy: y - 62 };
    this.crashed = false;
    this.crashTimer = 0;
    this.camX = x;
    this.camY = y;
    this.input = { accel: false, brake: false, leanB: false, leanF: false };
  }

  respawn(fullReset = false) {
    if (fullReset || !this.respawnCp) {
      this.placeAt(this.track.startX, this.track.startY);
    } else {
      this.placeAt(this.respawnCp.x, this.respawnCp.y - 70);
    }
    this.cb.onRespawn();
  }

  // =========================================================================
  // TRACK EDITOR METHODS
  // =========================================================================
  addCustomSegment(seg: Seg) {
    this.track.segments.push(seg);
    this.customHistory.push({ type: 'physics', item: seg });
    const BUCKET = 96;
    const b0 = Math.floor(Math.min(seg.x1, seg.x2) / BUCKET);
    const b1 = Math.floor(Math.max(seg.x1, seg.x2) / BUCKET);
    for (let b = b0; b <= b1; b++) {
      if (!this.track.buckets.has(b)) this.track.buckets.set(b, []);
      this.track.buckets.get(b)!.push(seg);
    }
  }

  addCustomScenery(line: SceneryLine) {
    this.track.scenery.push(line);
    this.customHistory.push({ type: 'scenery', item: line });
  }

  undo() {
    const last = this.customHistory.pop();
    if (!last) return;
    if (last.type === 'physics') {
      const idx = this.track.segments.indexOf(last.item as Seg);
      if (idx !== -1) {
        this.track.segments.splice(idx, 1);
        this.rebuildBuckets();
      }
    } else {
      const idx = this.track.scenery.indexOf(last.item as SceneryLine);
      if (idx !== -1) {
        this.track.scenery.splice(idx, 1);
      }
    }
  }

  private rebuildBuckets() {
    const buckets = new Map<number, Seg[]>();
    const BUCKET = 96;
    for (const s of this.track.segments) {
      const b0 = Math.floor(Math.min(s.x1, s.x2) / BUCKET);
      const b1 = Math.floor(Math.max(s.x1, s.x2) / BUCKET);
      for (let b = b0; b <= b1; b++) {
        if (!buckets.has(b)) buckets.set(b, []);
        buckets.get(b)!.push(s);
      }
    }
    this.track.buckets = buckets;
  }

  eraseAt(worldX: number, worldY: number, radius = 28) {
    // Filter out physics segments near click
    const prevCount = this.track.segments.length;
    this.track.segments = this.track.segments.filter((s) => {
      const midX = (s.x1 + s.x2) / 2;
      const midY = (s.y1 + s.y2) / 2;
      return Math.hypot(worldX - midX, worldY - midY) > radius;
    });

    if (this.track.segments.length !== prevCount) {
      this.rebuildBuckets();
    }

    // Filter out scenery lines near click
    this.track.scenery = this.track.scenery.filter((s) => {
      const midX = (s.x1 + s.x2) / 2;
      const midY = (s.y1 + s.y2) / 2;
      return Math.hypot(worldX - midX, worldY - midY) > radius;
    });
  }

  clearCustomTrack() {
    this.track = buildTrack();
    this.customHistory = [];
    this.placeAt(this.track.startX, this.track.startY);
  }

  // =========================================================================
  // PHYSICS COLLISION & SIMULATION
  // =========================================================================
  private collide(p: Point, radius: number, isHead: boolean): { grounded: boolean; impact: number } {
    let grounded = false;
    let impact = 0;
    const BUCKET = 96;
    const b0 = Math.floor((p.x - radius) / BUCKET);
    const b1 = Math.floor((p.x + radius) / BUCKET);

    for (let b = b0; b <= b1; b++) {
      const segs = this.track.buckets.get(b);
      if (!segs) continue;
      for (const s of segs) {
        const dx = s.x2 - s.x1;
        const dy = s.y2 - s.y1;
        const len2 = dx * dx + dy * dy || 0.0001;
        let t = ((p.x - s.x1) * dx + (p.y - s.y1) * dy) / len2;
        if (t < 0) t = 0;
        else if (t > 1) t = 1;
        const cx = s.x1 + t * dx;
        const cy = s.y1 + t * dy;
        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist < radius) {
          if (isHead && !this.crashed) {
            this.crashed = true;
            this.crashTimer = 1.0;
            this.cb.onCrash();
            sfx.crash();
            return { grounded: true, impact: 10 };
          }
          const overlap = radius - dist;
          const nx = dist === 0 ? 0 : (p.x - cx) / dist;
          const ny = dist === 0 ? -1 : (p.y - cy) / dist;
          p.x += nx * overlap;
          p.y += ny * overlap;

          // surface friction
          const vx = p.x - p.ox;
          const vy = p.y - p.oy;
          const dot = vx * nx + vy * ny;
          const imp = Math.abs(dot);
          impact = Math.max(impact, imp);
          p.ox += dot * nx * 1.5;
          p.oy += dot * ny * 1.5;
          grounded = true;
        }
      }
    }
    return { grounded, impact };
  }

  private step() {
    if (this.crashed) {
      this.crashTimer -= STEP;
      if (this.crashTimer <= 0) {
        this.respawn(false);
      }
    }

    const pts = [this.w1, this.w2, this.frame, this.head];

    // apply inputs when not crashed
    if (!this.crashed) {
      if (this.input.accel) {
        // rear wheel drive torque along chassis forward vector
        const dx = this.w2.x - this.w1.x;
        const dy = this.w2.y - this.w1.y;
        const d = Math.hypot(dx, dy) || 1;
        const fx = (dx / d) * 0.16;
        const fy = (dy / d) * 0.16;
        this.w1.ox -= fx;
        this.w1.oy -= fy;
        this.frame.ox -= fx * 0.5;
        this.frame.oy -= fy * 0.5;
      }
      if (this.input.brake) {
        // rear wheel braking
        const vx = this.w1.x - this.w1.ox;
        const vy = this.w1.y - this.w1.oy;
        this.w1.ox += vx * 0.22;
        this.w1.oy += vy * 0.22;
      }
      const lean = (this.input.leanF ? 1 : 0) - (this.input.leanB ? 1 : 0);
      if (lean !== 0) {
        // angular impulse about the chassis centroid
        const cx = (this.w1.x + this.w2.x + this.frame.x + this.head.x) / 4;
        const cy = (this.w1.y + this.w2.y + this.frame.y + this.head.y) / 4;
        const k = lean * 0.022;
        for (const p of pts) {
          const rx = p.x - cx;
          const ry = p.y - cy;
          p.ox += ry * k;
          p.oy -= rx * k;
        }
      }
    }

    // integrate (verlet)
    for (const p of pts) {
      const vx = (p.x - p.ox) * 0.998;
      const vy = (p.y - p.oy) * 0.998 + GRAVITY;
      p.ox = p.x;
      p.oy = p.y;
      p.x += vx;
      p.y += vy;
    }

    // constraints
    const satisfy = (a: Point, b: Point, len: number) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const diff = (dist - len) / dist;
      const hx = (dx * diff) / 2;
      const hy = (dy * diff) / 2;
      a.x += hx;
      a.y += hy;
      b.x -= hx;
      b.y -= hy;
    };

    let grounded = false;
    let impact = 0;
    for (let i = 0; i < 6; i++) {
      satisfy(this.w1, this.w2, 44);
      satisfy(this.w1, this.frame, 31);
      satisfy(this.w2, this.frame, 31);
      satisfy(this.frame, this.head, 26);

      const r1 = this.collide(this.w1, WHEEL_R, false);
      const r2 = this.collide(this.w2, WHEEL_R, false);
      this.collide(this.frame, 6, false);
      if (i === 0) {
        this.collide(this.head, HEAD_R, true);
      }
      grounded = grounded || r1.grounded || r2.grounded;
      impact = Math.max(impact, r1.impact, r2.impact);
    }
    this.grounded = grounded;

    // landing audio & dust particles
    if (!grounded) {
      this.airTime += STEP;
      this.wasAir = true;
    } else {
      if (this.wasAir && this.airTime > 0.22 && impact > 1.4 && !this.crashed) {
        sfx.land(Math.min(1, impact / 5));
        for (let i = 0; i < 8; i++) {
          this.particles.push({
            x: this.frame.x + (Math.random() - 0.5) * 30,
            y: this.frame.y + 22,
            vx: (Math.random() - 0.5) * 1.8,
            vy: -Math.random() * 1.5,
            life: 0.5 + Math.random() * 0.3,
          });
        }
      }
      this.wasAir = false;
      this.airTime = 0;
    }

    // kill plane
    if (this.frame.y > this.track.killY && !this.crashed) {
      this.crashed = true;
      this.crashTimer = 1.0;
      this.cb.onCrash();
      sfx.crash();
    }

    // wheel spin
    const vx = this.w2.x - this.w2.ox;
    this.wheelSpin += vx / WHEEL_R;
    this.speed = Math.abs(vx) * 120;

    // particles update
    for (const pt of this.particles) {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.06;
      pt.life -= STEP;
    }
    this.particles = this.particles.filter((p) => p.life > 0);

    // COLLECTIBLE STARS DETECTION
    for (const star of this.track.stars) {
      if (!star.collected) {
        const d = Math.hypot(this.frame.x - star.x, this.frame.y - star.y);
        if (d < 36) {
          star.collected = true;
          this.collectedStarsCount++;
          sfx.checkpoint();
          for (let i = 0; i < 8; i++) {
            this.particles.push({
              x: star.x,
              y: star.y,
              vx: (Math.random() - 0.5) * 2.8,
              vy: (Math.random() - 0.5) * 2.8,
              life: 0.6,
              color: '#d4a843',
            });
          }
          this.cb.onStarCollect?.(this.collectedStarsCount, this.track.stars.length);
        }
      }
    }

    // CHECKPOINT DETECTION
    let nearest: Checkpoint | null = null;
    let nd = Infinity;
    for (const cp of this.track.checkpoints) {
      const d = Math.hypot(this.frame.x - cp.x, this.frame.y - cp.y);
      if (d < 85 && d < nd) {
        nearest = cp;
        nd = d;
      }
    }
    if (nearest && nearest !== this.activeCheckpoint) {
      this.activeCheckpoint = nearest;
      this.respawnCp = nearest;
      if (!this.visited.has(nearest.projectId)) {
        this.visited.add(nearest.projectId);
        if (nearest.projectId === 'finish') {
          sfx.finish();
          this.cb.onFinish();
        } else {
          sfx.checkpoint();
        }
      }
      this.cb.onCheckpoint(nearest);
    } else if (!nearest && this.activeCheckpoint) {
      this.activeCheckpoint = null;
      this.cb.onCheckpointLeave();
    }

    // progress + section update
    const pct = Math.max(0, Math.min(100, (this.frame.x / this.track.length) * 100));
    this.cb.onProgress(pct, Math.max(0, Math.round(this.frame.x / 10)));
    const sec = this.track.sections.find((s) => this.frame.x >= s.startX && this.frame.x < s.endX);
    if (sec) this.cb.onSection(sec.name, sec.num);

    // camera tracking with forward velocity look-ahead
    const targetZoom = Math.max(1.05, Math.min(1.35, 1.35 - (this.speed / 100) * 0.15));
    this.zoom += (targetZoom - this.zoom) * 0.04;
    const lookX = this.frame.x + (this.w2.x - this.w1.x) * 2.2 + (this.frame.x - this.frame.ox) * 55;
    const lookY = this.frame.y - 42;
    this.camX += (lookX - this.camX) * 0.06;
    this.camY += (lookY - this.camY) * 0.055;
  }

  private loop = (time: number) => {
    if (this.destroyed) return;
    if (this.running && !this.editorActive) {
      let dt = (time - this.lastTime) / 1000;
      this.lastTime = time;
      if (dt > 0.1) dt = 0.1;
      this.accumulator += dt;
      while (this.accumulator >= STEP) {
        this.step();
        this.accumulator -= STEP;
      }
    } else {
      this.lastTime = time;
    }
    drawWorld(this.ctx, this);
    this.raf = requestAnimationFrame(this.loop);
  };

  screenToWorld(screenX: number, screenY: number): [number, number] {
    const cw = this.canvas.clientWidth;
    const ch = this.canvas.clientHeight;
    const scale = (ch / 760) * this.zoom;
    const worldX = (screenX - cw * 0.38) / scale + this.camX;
    const worldY = (screenY - ch * 0.5) / scale + this.camY;
    return [worldX, worldY];
  }

  worldToScreen(x: number, y: number): [number, number] {
    const cw = this.canvas.clientWidth;
    const ch = this.canvas.clientHeight;
    const scale = (ch / 760) * this.zoom * this.dpr;
    return [(x - this.camX) * scale + cw * this.dpr * 0.38, (y - this.camY) * scale + ch * this.dpr * 0.5];
  }
}
