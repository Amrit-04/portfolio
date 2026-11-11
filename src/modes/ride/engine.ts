// Verlet bicycle physics with a fixed 120 Hz timestep.
// Two independently-constrained wheels, a chassis node and a rider head node.
// Head touches terrain = ragdoll crash → respawn at last checkpoint.

import { Track, buildTrack, Checkpoint } from './track';
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
}

const STEP = 1 / 120;
const GRAVITY = 0.155;
const WHEEL_R = 13;
const HEAD_R = 8;
const MAX_SPEED = 6.4;

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  track: Track;
  private cb: EngineCallbacks;
  private raf = 0;
  private accumulator = 0;
  private lastTime = 0;
  private dpr = 1;
  private running = false;
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
  private grounded = false;

  // camera
  camX = 120;
  camY = 200;
  zoom = 1.05;

  // progress
  visited = new Set<string>();
  activeCheckpoint: Checkpoint | null = null;
  respawnCp: Checkpoint | null = null;
  particles: Particle[] = [];
  speed = 0;

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
    this.head = { x, y: y - 60, ox: x, oy: y - 60 };
    this.crashed = false;
    this.crashTimer = 0;
    this.camX = x;
    this.camY = y - 40;
    this.particles = [];
  }

  respawn(manual = false) {
    const cp = this.respawnCp ?? { x: this.track.startX, y: this.track.startY, projectId: 'workshop', label: 'THE WORKSHOP' };
    this.placeAt(cp.x, cp.y - 6);
    if (manual) sfx.click();
    this.cb.onRespawn();
  }

  private nearSegs(x: number) {
    const BUCKET = 96;
    const b = Math.floor(x / BUCKET);
    const out = [];
    for (let i = b - 1; i <= b + 1; i++) {
      const arr = this.track.buckets.get(i);
      if (arr) out.push(...arr);
    }
    return out;
  }

  private collide(p: Point, r: number, isHead: boolean): { grounded: boolean; impact: number } {
    let grounded = false;
    let impact = 0;
    for (const s of this.nearSegs(p.x)) {
      const dx = s.x2 - s.x1;
      const dy = s.y2 - s.y1;
      const l2 = dx * dx + dy * dy;
      if (l2 === 0) continue;
      let t = ((p.x - s.x1) * dx + (p.y - s.y1) * dy) / l2;
      t = Math.max(0, Math.min(1, t));
      const px = s.x1 + t * dx;
      const py = s.y1 + t * dy;
      const dist = Math.hypot(p.x - px, p.y - py);
      if (dist < r) {
        if (isHead) {
          this.crashed = true;
          this.crashTimer = 1.4;
          this.cb.onCrash();
          sfx.crash();
          return { grounded, impact };
        }
        const nx = (p.x - px) / (dist || 1);
        const ny = (p.y - py) / (dist || 1);
        p.x = px + nx * r;
        p.y = py + ny * r;
        // kill outward velocity, damp tangential (rolling friction)
        const vx = p.x - p.ox;
        const vy = p.y - p.oy;
        const vDotN = vx * nx + vy * ny;
        if (vDotN < 0) impact = Math.max(impact, -vDotN);
        const tx = -ny;
        const ty = nx;
        let vDotT = vx * tx + vy * ty;
        vDotT *= 0.995;
        p.ox = p.x - (tx * vDotT + nx * Math.max(0, vDotN) * 0.4);
        p.oy = p.y - (ty * vDotT + ny * Math.max(0, vDotN) * 0.4);
        grounded = true;
      }
    }
    return { grounded, impact };
  }

  private step() {
    const pts = [this.w1, this.w2, this.frame, this.head];

    if (this.crashed) {
      this.crashTimer -= STEP;
      if (this.crashTimer <= 0) this.respawn();
    } else {
      // controls
      if (this.input.accel) {
        const boost = this.grounded ? 0.05 : 0.022;
        for (const p of pts) {
          const vx = p.x - p.ox;
          if (vx < MAX_SPEED) {
            const share = p === this.frame || p === this.head ? 0.85 : 1;
            p.ox -= boost * share;
          }
        }
      }
      if (this.input.brake) {
        for (const w of [this.w1, this.w2, this.frame, this.head]) {
          const vx = w.x - w.ox;
          w.ox = w.x - vx * 0.86;
        }
        const vx = this.w1.x - this.w1.ox;
        if (vx < 0.3) this.w1.ox += 0.01;
      }
      const lean = (this.input.leanF ? 1 : 0) - (this.input.leanB ? 1 : 0);
      if (lean !== 0) {
        // angular impulse about the chassis centroid
        const cx = (this.w1.x + this.w2.x + this.frame.x + this.head.x) / 4;
        const cy = (this.w1.y + this.w2.y + this.frame.y + this.head.y) / 4;
        const k = lean * 0.02;
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

    // landing effects
    if (!grounded) {
      this.airTime += STEP;
      this.wasAir = true;
    } else {
      if (this.wasAir && this.airTime > 0.25 && impact > 1.6 && !this.crashed) {
        sfx.land(Math.min(1, impact / 5));
        for (let i = 0; i < 8; i++) {
          this.particles.push({
            x: this.frame.x + (Math.random() - 0.5) * 30,
            y: this.frame.y + 22,
            vx: (Math.random() - 0.5) * 1.6,
            vy: -Math.random() * 1.4,
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

    // particles
    for (const pt of this.particles) {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.06;
      pt.life -= STEP;
    }
    this.particles = this.particles.filter((p) => p.life > 0);

    // checkpoints
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

    // progress + section
    const pct = Math.max(0, Math.min(100, ((this.frame.x + 700) / (this.track.length + 700)) * 100));
    this.cb.onProgress(pct, Math.max(0, Math.round(this.frame.x / 10)));
    const sec = this.track.sections.find((s) => this.frame.x >= s.startX && this.frame.x < s.endX);
    if (sec) this.cb.onSection(sec.name, sec.num);

    // camera
    const targetZoom = Math.max(0.78, Math.min(1.05, 1.05 - this.speed * 0.028));
    this.zoom += (targetZoom - this.zoom) * 0.04;
    const lookX = this.frame.x + (this.w2.x - this.w1.x) * 2 + (this.frame.x - this.frame.ox) * 60;
    const lookY = this.frame.y - 46;
    this.camX += (lookX - this.camX) * 0.055;
    this.camY += (lookY - this.camY) * 0.05;
  }

  private loop = (time: number) => {
    if (this.destroyed) return;
    if (this.running) {
      let dt = (time - this.lastTime) / 1000;
      this.lastTime = time;
      if (dt > 0.1) dt = 0.1;
      this.accumulator += dt;
      while (this.accumulator >= STEP) {
        this.step();
        this.accumulator -= STEP;
      }
      drawWorld(this.ctx, this);
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  worldToScreen(x: number, y: number): [number, number] {
    const cw = this.canvas.clientWidth;
    const ch = this.canvas.clientHeight;
    const scale = (ch / 760) * this.zoom * this.dpr;
    return [(x - this.camX) * scale + cw * this.dpr * 0.38, (y - this.camY) * scale + ch * this.dpr * 0.5];
  }
}
