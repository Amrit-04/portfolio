import { BikePhysics, STEP, emptyInput } from "./physics";
import { buildTrack, sectionAt } from "./track";
import type { Track, Segment, Point } from "./track";
import { TrackEditor } from "./editor";
import { drawWorld } from "./render";
import { sfx } from "../../lib/sound";
export type GameStatus =
  | "ready"
  | "running"
  | "paused"
  | "crashed"
  | "checkpoint"
  | "finished"
  | "editor";
export interface GameView {
  status: GameStatus;
  speed: number;
  progress: number;
  section: number;
  sectionName: string;
  checkpoint: number;
  stars: number;
  totalStars: number;
  seconds: number;
  crashes: number;
  custom: boolean;
  canUndo: boolean;
  canRedo: boolean;
  lines: number;
  scenery: number;
}
export class GameEngine {
  track: Track = buildTrack();
  bike = new BikePhysics(this.track);
  input = emptyInput();
  status: GameStatus = "ready";
  editor = new TrackEditor();
  custom = false;
  checkpoint = 0;
  visited = new Set<number>([0]);
  stars = new Set<number>();
  seconds = 0;
  crashes = 0;
  camX = 3;
  camY = 0;
  zoom = 42;
  editorTool: "physics" | "scenery" | "eraser" = "physics";
  draft: Segment | null = null;
  private raf = 0;
  private previousTime = 0;
  private accumulator = 0;
  private lastEmit = 0;
  private disposed = false;
  private crashElapsed = 0;
  private ctx: CanvasRenderingContext2D;
  private observer: ResizeObserver | null = null;
  constructor(
    public canvas: HTMLCanvasElement,
    private update: (s: GameView) => void,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D is unavailable.");
    this.ctx = ctx;
    this.resize();
    if (typeof ResizeObserver !== "undefined") {
      this.observer = new ResizeObserver(this.resize);
      this.observer.observe(canvas);
    }
    window.addEventListener("resize", this.resize);
    this.raf = requestAnimationFrame(this.loop);
    this.emit();
  }
  resize = () => {
    const r = this.canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    if (this.status !== "editor") this.zoom = r.width < 600 ? 32 : 46;
  };
  private loop = (time: number) => {
    if (this.disposed) return;
    const delta = this.previousTime
      ? Math.min((time - this.previousTime) / 1000, 0.1)
      : 0;
    this.previousTime = time;
    if (this.status === "running" || this.status === "crashed") {
      this.accumulator += delta;
      while (this.accumulator >= STEP) {
        if (this.status === "running") this.seconds += STEP;
        this.bike.step(this.status === "running" ? this.input : emptyInput());
        this.accumulator -= STEP;
        if (this.status === "running") this.progress();
        if (this.status === "crashed") this.crashElapsed += STEP;
        if (this.status !== "running" && this.status !== "crashed") {
          this.accumulator = 0;
          break;
        }
      }
      const follow = 1 - Math.exp(-delta * 5.5),
        speed = this.bike.chassis.getLinearVelocity().x;
      this.camX +=
        (this.bike.position.x +
          Math.min(Math.max(speed * 0.17, 0), 2.5) -
          this.camX) *
        follow;
      this.camY += (this.bike.position.y - 0.85 - this.camY) * follow;
    } else this.accumulator = 0;
    drawWorld(this.ctx, this, this.accumulator / STEP, time);
    if (time - this.lastEmit > 100) {
      this.lastEmit = time;
      this.emit();
    }
    this.raf = requestAnimationFrame(this.loop);
  };
  private progress() {
    if (this.bike.crashed) {
      this.status = "crashed";
      this.crashes++;
      this.crashElapsed = 0;
      this.clearInput();
      sfx.crash();
      this.emit();
      return;
    }
    for (let i = 0; i < this.track.stars.length; i++) {
      if (this.stars.has(i)) continue;
      const s = this.track.stars[i];
      if (
        this.bike.parts.some(
          (p) =>
            Math.hypot(
              p.body.getPosition().x - s.x,
              p.body.getPosition().y - s.y,
            ) < 0.78,
        )
      ) {
        this.stars.add(i);
        sfx.star();
      }
    }
    if (this.bike.position.x >= this.track.finish) {
      this.status = "finished";
      this.clearInput();
      sfx.finish();
      this.emit();
      return;
    }
    for (let i = 1; i < this.track.checkpoints.length; i++) {
      const cp = this.track.checkpoints[i];
      if (
        !this.visited.has(i) &&
        this.bike.position.x >= cp.x &&
        this.bike.position.x < cp.x + 4 &&
        Math.abs(this.bike.position.y - cp.y) < 4
      ) {
        this.visited.add(i);
        this.checkpoint = i;
        if (cp.project) {
          this.status = "checkpoint";
          this.clearInput();
          sfx.checkpoint();
          this.emit();
          break;
        }
      }
    }
  }
  clearInput() {
    this.input = emptyInput();
  }
  play() {
    if (this.status === "crashed") {
      this.respawn();
      return;
    }
    this.status = "running";
    this.previousTime = 0;
    this.accumulator = 0;
    this.clearInput();
    this.emit();
  }
  pause() {
    if (this.status === "running") {
      this.status = "paused";
      this.clearInput();
      this.emit();
    }
  }
  togglePause() {
    if (this.status === "running") this.pause();
    else if (this.status === "paused") this.play();
  }
  respawn(full = false) {
    if (full) {
      this.checkpoint = 0;
      this.visited = new Set([0]);
      this.stars.clear();
      this.seconds = 0;
      this.crashes = 0;
    }
    const p =
      full || this.custom
        ? this.track.start
        : (this.track.checkpoints[this.checkpoint] ?? this.track.start);
    this.bike = new BikePhysics(this.track, p);
    this.camX = p.x;
    this.camY = p.y;
    // The replacement is intact; leave the crashed state before play's retry guard.
    this.status = "ready";
    this.play();
  }
  openEditor() {
    this.status = "editor";
    this.clearInput();
    this.draft = null;
    this.camX = 3;
    this.camY = 0;
    this.zoom = this.canvas.clientWidth < 600 ? 23 : 35;
    this.emit();
  }
  testRide() {
    const track = this.editor.toTrack();
    this.track = track;
    this.custom = true;
    this.bike = new BikePhysics(track);
    this.checkpoint = 0;
    this.stars.clear();
    this.seconds = 0;
    this.crashes = 0;
    this.camX = track.start.x;
    this.camY = track.start.y;
    this.play();
  }
  returnTrail() {
    this.track = buildTrack();
    this.custom = false;
    this.checkpoint = 0;
    this.visited = new Set([0]);
    this.stars.clear();
    this.seconds = 0;
    this.crashes = 0;
    this.bike = new BikePhysics(this.track);
    this.camX = 3;
    this.camY = 0;
    this.status = "ready";
    this.clearInput();
    this.resize();
    this.emit();
  }
  screenToWorld(clientX: number, clientY: number): Point {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: (clientX - r.left - r.width * 0.32) / this.zoom + this.camX,
      y: -(clientY - r.top - r.height * 0.62) / this.zoom + this.camY,
    };
  }
  emit() {
    this.canvas.dataset.telemetry = JSON.stringify({
      ...this.inspect(),
      angular: this.bike.chassis.getAngularVelocity(),
    });
    this.update(this.view());
  }
  view(): GameView {
    const section = sectionAt(this.track, this.bike.position.x);
    return {
      status: this.status,
      speed: this.bike.speed * 3.6,
      progress: Math.max(
        0,
        Math.min(
          100,
          ((this.bike.position.x - this.track.start.x) /
            (this.track.finish - this.track.start.x)) *
            100,
        ),
      ),
      section,
      sectionName: this.track.sections[section].name,
      checkpoint: this.checkpoint,
      stars: this.stars.size,
      totalStars: this.track.stars.length,
      seconds: this.seconds,
      crashes: this.crashes,
      custom: this.custom,
      canUndo: this.editor.canUndo,
      canRedo: this.editor.canRedo,
      lines: this.editor.document.physics.length,
      scenery: this.editor.document.scenery.length,
    };
  }
  inspect() {
    return {
      ...this.view(),
      ...this.bike.snapshot(),
      input: { ...this.input },
      collected: [...this.stars],
    };
  }
  dispose() {
    this.disposed = true;
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    this.clearInput();
  }
}
