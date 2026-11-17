import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../src/modes/ride/render", () => ({ drawWorld: vi.fn() }));
vi.mock("../src/lib/sound", () => ({
  sfx: { crash: vi.fn(), star: vi.fn(), finish: vi.fn(), checkpoint: vi.fn() },
}));
import { GameEngine } from "../src/modes/ride/engine";
let callback: FrameRequestCallback, time: number, e: GameEngine;
const frame = (dt = 1000 / 60) => {
  time += dt;
  callback(time);
};
beforeEach(() => {
  time = 100;
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    callback = fn;
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal("devicePixelRatio", 1);
  vi.stubGlobal("window", {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  const canvas = {
    getContext: () => ({}),
    getBoundingClientRect: () => ({ width: 1000, height: 700 }),
    dataset: {},
    clientWidth: 1000,
    clientHeight: 700,
  } as unknown as HTMLCanvasElement;
  e = new GameEngine(canvas, () => {});
});
afterEach(() => {
  e.dispose();
  vi.unstubAllGlobals();
});
describe("fixed-step game lifecycle", () => {
  it("runs 120 physical steps per second independent of render rate and clamps stalls", () => {
    e.play();
    frame();
    for (let i = 0; i < 60; i++) frame();
    expect(e.bike.steps).toBeGreaterThanOrEqual(119);
    expect(e.bike.steps).toBeLessThanOrEqual(120);
    const before = e.bike.steps;
    frame(5000);
    expect(e.bike.steps - before).toBeLessThanOrEqual(12);
    expect(e.seconds).toBeLessThan(1.11);
  });
  it("pauses clock and input and restarts without a stale accumulator", () => {
    e.play();
    e.input.accel = true;
    for (let i = 0; i < 90; i++) frame();
    e.pause();
    const steps = e.bike.steps,
      seconds = e.seconds;
    for (let i = 0; i < 90; i++) frame();
    expect(e.bike.steps).toBe(steps);
    expect(e.seconds).toBe(seconds);
    expect(e.input.accel).toBe(false);
    e.play();
    frame(30000);
    expect(e.bike.steps).toBe(steps);
    e.respawn(true);
    expect(e.bike.position.x).toBe(3);
    expect(e.seconds).toBe(0);
    expect(e.stars.size).toBe(0);
  });
  it("collects physical stars, stops at notebook checkpoint and respawns at that flag", () => {
    e.play();
    for (let i = 0; i < 600 && e.status === "running"; i++) {
      const b = e.bike,
        c = b.chassis.getAngle() * 2 + b.chassis.getAngularVelocity() * 0.7;
      e.input = {
        accel: true,
        brake: false,
        leanB: c < -0.15,
        leanF: c > 0.15,
      };
      frame();
    }
    expect(e.status).toBe("checkpoint");
    expect(e.checkpoint).toBe(1);
    expect(e.stars.size).toBeGreaterThan(0);
    const starCount = e.stars.size;
    e.respawn();
    expect(e.bike.position.x).toBe(e.track.checkpoints[1].x);
    expect(e.stars.size).toBe(starCount);
    expect(e.input.accel).toBe(false);
  });
  it("editor tests use separate physics and default world can be restored", () => {
    const original = JSON.stringify(e.track);
    e.openEditor();
    e.editor.clear();
    expect(() => e.testRide()).toThrow();
    e.editor.undo();
    e.testRide();
    expect(e.custom).toBe(true);
    expect(e.track.physics).not.toBe(e.editor.document.physics);
    e.returnTrail();
    expect(e.custom).toBe(false);
    expect(JSON.stringify(e.track)).toBe(original);
    expect(e.status).toBe("ready");
  });
  it("rebuilds a crashed rider once and retains checkpoint rewards", () => {
    e.play();
    e.bike.crash();
    frame();
    frame();
    expect(e.status).toBe("crashed");
    e.stars.add(0);
    e.input.accel = true;
    e.respawn();
    expect(e.status).toBe("running");
    expect(e.bike.snapshot().joints).toBe(21);
    expect(e.bike.crashed).toBe(false);
    expect(e.stars.size).toBe(1);
    expect(e.crashes).toBe(1);
    expect(e.input.accel).toBe(false);
  });
  it("cleans up listeners, animation and held inputs", () => {
    e.play();
    e.input.accel = true;
    e.dispose();
    expect(e.input.accel).toBe(false);
    expect(cancelAnimationFrame).toHaveBeenCalled();
    expect(window.removeEventListener).toHaveBeenCalledWith("resize", e.resize);
  });
});
