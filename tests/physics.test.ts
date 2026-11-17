import { describe, it, expect } from "vitest";
import { BikePhysics, STEP, emptyInput } from "../src/modes/ride/physics";
import { buildTrack, segment, heightAt } from "../src/modes/ride/track";
import { TrackEditor, validateTrack } from "../src/modes/ride/editor";
const flat = () => ({
  ...buildTrack(),
  physics: [segment(-200, 0, 600, 0)],
  stars: [],
  checkpoints: [],
});
describe("physical bicycle", () => {
  it("rests on independent wheels with a fully jointed rider", () => {
    const b = new BikePhysics(flat());
    for (let i = 0; i < 600; i++) b.step();
    console.log("rest", b.snapshot());
    expect(b.crashed).toBe(false);
    expect(b.grounded).toBe(true);
    expect(b.position.y).toBeGreaterThan(0.6);
    expect(b.world.getBodyCount()).toBeGreaterThan(15);
    expect(b.world.getJointCount()).toBeGreaterThan(15);
  });
  it("accelerates through wheel motors and brakes through traction", () => {
    const b = new BikePhysics(flat());
    for (let i = 0; i < 600; i++) b.step({ ...emptyInput(), accel: true });
    console.log("drive", b.snapshot());
    const before = b.speed;
    expect(b.position.x).toBeGreaterThan(15);
    expect(b.rear.getAngle()).toBeLessThan(-10);
    expect(b.crashed).toBe(false);
    for (let i = 0; i < 240; i++) b.step({ ...emptyInput(), brake: true });
    expect(b.speed).toBeLessThan(before * 0.35);
  });
  it("has no horizontal propulsion without contact", () => {
    const b = new BikePhysics({ ...flat(), physics: [] }, { x: 3, y: 30 });
    for (let i = 0; i < 90; i++) b.step({ ...emptyInput(), accel: true });
    expect(Math.abs(b.position.x - 3)).toBeLessThan(0.3);
    expect(Math.abs(b.rear.getAngle())).toBeGreaterThan(0.2);
  });
  it("releases attachment joints on crash and preserves ragdoll joints", () => {
    const b = new BikePhysics(flat());
    const count = b.world.getJointCount();
    b.crash();
    expect(b.crashed).toBe(true);
    expect(b.attachments.length).toBe(0);
    expect(b.world.getJointCount()).toBeLessThan(count);
    expect(b.world.getJointCount()).toBeGreaterThan(8);
    for (let i = 0; i < 100; i++) b.step();
    expect(Number.isFinite(b.head.getPosition().y)).toBe(true);
  });
  it("authored gaps have no invisible collision surface", () => {
    const t = buildTrack();
    for (const x of [81.5, 113.5, 189.5, 251])
      expect(heightAt(t.physics, x)).toBeNull();
    expect(t.sections).toHaveLength(9);
  });
  it("full course can be completed using only recorded physical inputs", () => {
    const t = buildTrack(),
      b = new BikePhysics(t);
    let steps = 0;
    const jumps: number[] = [];
    let wasGround = false;
    for (; steps < 120 * 100; steps++) {
      const angle = b.chassis.getAngle(),
        angular = b.chassis.getAngularVelocity();
      // A feedback rider, using exactly the same four controls exposed to users.
      const target = b.grounded ? 0 : 0.02;
      const control = (angle - target) * 2 + angular * 0.7;
      b.step({
        accel: true,
        brake: false,
        leanB: control < -0.15,
        leanF: control > 0.15,
      });
      if (wasGround && !b.grounded) jumps.push(b.position.x);
      wasGround = b.grounded;
      if (b.crashed || b.position.x > t.finish) break;
    }
    console.log(
      "course",
      b.snapshot(),
      "seconds",
      steps * STEP,
      "jumps",
      jumps,
    );
    expect(b.crashed).toBe(false);
    expect(b.position.x).toBeGreaterThan(t.finish);
    expect(b.maxAirborneTime).toBeGreaterThan(0.2);
  });
});
describe("isolated editor", () => {
  it("restores erased lines and clear through undo/redo", () => {
    const e = new TrackEditor();
    e.add("scenery", segment(1, 3, 4, 3));
    const saved = e.export();
    e.erase(2, 3);
    expect(e.document.scenery).toHaveLength(0);
    e.undo();
    expect(e.export()).toBe(saved);
    e.redo();
    expect(e.document.scenery).toHaveLength(0);
    e.clear();
    expect(e.document.physics).toHaveLength(0);
    e.undo();
    expect(e.document.physics).toHaveLength(1);
  });
  it("round trips JSON and keeps tests and default trail isolated", () => {
    const original = JSON.stringify(buildTrack()),
      e = new TrackEditor();
    e.add("physics", segment(20, 0, 25, 3));
    const imported = new TrackEditor();
    imported.import(e.export());
    expect(imported.document).toEqual(e.document);
    const t = e.toTrack();
    t.physics[0].a.x = 100;
    expect(e.document.physics[0].a.x).toBe(-5);
    expect(JSON.stringify(buildTrack())).toBe(original);
  });
  it("rejects invalid and oversized imports without changing draft", () => {
    const e = new TrackEditor(),
      before = e.export();
    expect(() => e.import("{bad")).toThrow();
    expect(e.export()).toBe(before);
    expect(() => e.add("physics", segment(0, 0, Infinity, 1))).toThrow();
    expect(() => e.add("scenery", segment(0, 0, 2001, 1))).toThrow();
    expect(e.export()).toBe(before);
    expect(() =>
      validateTrack({
        version: 1,
        name: "x",
        physics: [segment(1, 0, Infinity, 2)],
        scenery: [],
      }),
    ).toThrow();
    expect(() =>
      validateTrack({
        version: 1,
        name: "x",
        physics: Array(2001).fill(segment(0, 0, 1, 0)),
        scenery: [],
      }),
    ).toThrow();
  });
});
