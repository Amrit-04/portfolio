import {
  World,
  Vec2,
  Circle,
  Box,
  Polygon,
  Edge,
  WheelJoint,
  RevoluteJoint,
} from "planck";
import type { Body, Joint } from "planck";
import type { Track, Point } from "./track";
export const STEP = 1 / 120;
export const WHEEL_RADIUS = 0.46;
export interface EngineInput {
  accel: boolean;
  brake: boolean;
  leanB: boolean;
  leanF: boolean;
}
export const emptyInput = (): EngineInput => ({
  accel: false,
  brake: false,
  leanB: false,
  leanF: false,
});
export interface Pose {
  x: number;
  y: number;
  angle: number;
}
export interface Part {
  body: Body;
  kind: "wheel" | "frame" | "head" | "limb" | "hand" | "foot";
  length?: number;
  radius?: number;
  rear?: boolean;
  previous: Pose;
}
const pose = (body: Body): Pose => ({
  x: body.getPosition().x,
  y: body.getPosition().y,
  angle: body.getAngle(),
});
export class BikePhysics {
  world: World;
  parts: Part[] = [];
  chassis!: Body;
  rear!: Body;
  front!: Body;
  head!: Body;
  torso!: Body;
  rearJoint!: WheelJoint;
  frontJoint!: WheelJoint;
  hipJoint!: RevoluteJoint;
  crank!: Body;
  crankJoint!: RevoluteJoint;
  joints: RevoluteJoint[] = [];
  attachments: Joint[] = [];
  crashed = false;
  pendingCrash = false;
  airborneTime = 0;
  maxAirborneTime = 0;
  contacts = 0;
  steps = 0;
  constructor(
    public track: Track,
    start: Point = track.start,
  ) {
    this.world = new World({ gravity: Vec2(0, -16), allowSleep: false });
    const ground = this.world.createBody({ userData: "terrain" });
    for (const s of track.physics)
      ground.createFixture(new Edge(Vec2(s.a.x, s.a.y), Vec2(s.b.x, s.b.y)), {
        friction: 1.15,
        restitution: 0,
      });
    this.spawn(start);
    this.world.on("begin-contact", (contact) => {
      const a = contact.getFixtureA().getBody(),
        b = contact.getFixtureB().getBody();
      const other = a === ground ? b : b === ground ? a : null;
      if (!other) return;
      if (other === this.head || other === this.torso) this.pendingCrash = true;
    });
  }
  private body(
    kind: Part["kind"],
    p: Point,
    shape: Circle | Box | Polygon,
    density: number,
    angle = 0,
    length?: number,
    radius?: number,
  ): Body {
    const b = this.world.createDynamicBody({
      position: Vec2(p.x, p.y),
      angle,
      bullet: true,
      linearDamping: 0.035,
      angularDamping: kind === "wheel" ? 0.012 : 0.12,
      userData: kind,
    });
    b.createFixture(shape, {
      density,
      friction: kind === "wheel" ? 1.3 : 0.5,
      restitution: 0,
      filterGroupIndex: -1,
    });
    this.parts.push({ body: b, kind, length, radius, previous: pose(b) });
    return b;
  }
  private limb(a: Point, b: Point, density = 0.6): Body {
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    return this.body(
      "limb",
      { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      new Box(len / 2, 0.055),
      density,
      Math.atan2(b.y - a.y, b.x - a.x),
      len,
    );
  }
  private joint(
    a: Body,
    b: Body,
    p: Point,
    attachment = false,
    range = 0.7,
  ): RevoluteJoint {
    const j = new RevoluteJoint(
      {
        enableLimit: true,
        lowerAngle: -range,
        upperAngle: range,
        enableMotor: true,
        maxMotorTorque: 4,
        motorSpeed: 0,
      },
      a,
      b,
      Vec2(p.x, p.y),
    );
    this.world.createJoint(j);
    if (attachment) this.attachments.push(j);
    else this.joints.push(j);
    return j;
  }
  private spawn(start: Point) {
    const p = (x: number, y: number) => ({ x: start.x + x, y: start.y + y });
    this.chassis = this.body(
      "frame",
      p(0, 0.88),
      new Polygon([
        Vec2(-1.05, -0.35),
        Vec2(1.05, -0.35),
        Vec2(0.65, 0.5),
        Vec2(-0.5, 0.4),
      ]),
      4.5,
    );
    this.rear = this.body(
      "wheel",
      p(-1.05, 0.49),
      new Circle(WHEEL_RADIUS),
      2.3,
      0,
      undefined,
      WHEEL_RADIUS,
    );
    this.parts[this.parts.length - 1].rear = true;
    this.front = this.body(
      "wheel",
      p(1.05, 0.49),
      new Circle(WHEEL_RADIUS),
      2.3,
      0,
      undefined,
      WHEEL_RADIUS,
    );
    this.rearJoint = new WheelJoint(
      {
        frequencyHz: 10,
        dampingRatio: 0.9,
        enableMotor: true,
        maxMotorTorque: 0,
      },
      this.chassis,
      this.rear,
      this.rear.getPosition(),
      Vec2(0, 1),
    );
    this.frontJoint = new WheelJoint(
      {
        frequencyHz: 10,
        dampingRatio: 0.9,
        enableMotor: true,
        maxMotorTorque: 0,
      },
      this.chassis,
      this.front,
      this.front.getPosition(),
      Vec2(0, 1),
    );
    this.world.createJoint(this.rearJoint);
    this.world.createJoint(this.frontJoint);
    const hip = p(-0.42, 1.43),
      shoulder = p(0.02, 2.12),
      neck = p(0.09, 2.23);
    this.torso = this.limb(hip, shoulder, 2.8);
    this.torso.setUserData("torso");
    this.head = this.body(
      "head",
      p(0.12, 2.43),
      new Circle(0.205),
      1.2,
      0,
      undefined,
      0.205,
    );
    this.joint(this.torso, this.head, neck, false, 0.4);
    this.hipJoint = this.joint(this.chassis, this.torso, hip, true, 0.38);
    this.crank = this.body("hand", p(0.03, 0.76), new Circle(0.08), 0.3);
    this.crankJoint = new RevoluteJoint(
      { enableMotor: true, maxMotorTorque: 1.5, motorSpeed: 0 },
      this.chassis,
      this.crank,
      Vec2(start.x + 0.03, start.y + 0.76),
    );
    this.world.createJoint(this.crankJoint);
    for (const side of [-1, 1]) {
      const elbow = p(0.48 + side * 0.05, 1.78),
        hand = p(0.77, 1.55),
        knee = p(0.38 + side * 0.08, 1.07),
        foot = p(0.03 + side * 0.19, 0.76);
      const upper = this.limb(shoulder, elbow),
        lower = this.limb(elbow, hand);
      this.joint(this.torso, upper, shoulder);
      this.joint(upper, lower, elbow);
      const palm = this.body(
        "hand",
        hand,
        new Circle(0.06),
        0.4,
        0,
        undefined,
        0.06,
      );
      this.joint(lower, palm, hand);
      this.joint(this.chassis, palm, hand, true, 0.6);
      const thigh = this.limb(hip, knee, 0.9),
        shin = this.limb(knee, foot, 0.8);
      this.joint(this.torso, thigh, hip);
      this.joint(thigh, shin, knee);
      const shoe = this.body("foot", foot, new Box(0.14, 0.06), 0.6, 0, 0.28);
      this.joint(shin, shoe, foot);
      this.joint(this.crank, shoe, foot, true, Math.PI);
    }
  }
  step(input: EngineInput = emptyInput()) {
    for (const part of this.parts) part.previous = pose(part.body);
    if (!this.crashed) {
      this.rearJoint.setMotorSpeed(input.brake ? 0 : input.accel ? -30 : 0);
      this.rearJoint.setMaxMotorTorque(input.brake ? 22 : input.accel ? 16 : 0);
      this.frontJoint.setMotorSpeed(0);
      this.frontJoint.setMaxMotorTorque(input.brake ? 16 : 0);
      this.crankJoint.setMotorSpeed(
        input.accel && !input.brake
          ? -Math.min(9, Math.abs(this.rear.getAngularVelocity()) * 0.3)
          : 0,
      );
      const lean = Number(input.leanB) - Number(input.leanF);
      // Bounded angular control; drivetrain alone supplies forward traction.
      if (lean)
        this.chassis.applyTorque(lean * (this.grounded ? 26 : 17), true);
      this.hipJoint.setMotorSpeed(
        lean * 1.8 - this.hipJoint.getJointAngle() * 7,
      );
      this.hipJoint.setMaxMotorTorque(8);
      for (const j of this.joints) j.setMotorSpeed(-j.getJointAngle() * 6);
    }
    this.world.step(STEP, 12, 6);
    this.steps++;
    this.contacts = 0;
    for (const w of [this.rear, this.front]) {
      for (let c = w.getContactList(); c; c = c.next) {
        if (c.contact.isTouching()) this.contacts++;
      }
    }
    if (this.grounded) this.airborneTime = 0;
    else {
      this.airborneTime += STEP;
      this.maxAirborneTime = Math.max(this.maxAirborneTime, this.airborneTime);
    }
    if (
      (this.pendingCrash || this.chassis.getPosition().y < -12) &&
      !this.crashed
    )
      this.crash();
  }
  get grounded() {
    return this.contacts > 0;
  }
  get position() {
    return this.chassis.getPosition();
  }
  get speed() {
    return this.chassis.getLinearVelocity().length();
  }
  crash() {
    if (this.crashed) return;
    this.crashed = true;
    this.crankJoint.setMaxMotorTorque(0);
    this.rearJoint.setMaxMotorTorque(0);
    this.frontJoint.setMaxMotorTorque(0);
    for (const j of this.attachments) this.world.destroyJoint(j);
    this.attachments = [];
    for (const j of this.joints) {
      j.enableMotor(false);
      j.enableLimit(false);
    }
  }
  interpolated(part: Part, alpha: number): Pose {
    const now = pose(part.body),
      p = part.previous;
    return {
      x: p.x + (now.x - p.x) * alpha,
      y: p.y + (now.y - p.y) * alpha,
      angle: p.angle + (now.angle - p.angle) * alpha,
    };
  }
  snapshot() {
    return {
      x: this.position.x,
      y: this.position.y,
      speed: this.speed,
      angle: this.chassis.getAngle(),
      grounded: this.grounded,
      crashed: this.crashed,
      bodies: this.world.getBodyCount(),
      joints: this.world.getJointCount(),
      rearSpin: this.rear.getAngle(),
      frontSpin: this.front.getAngle(),
      steps: this.steps,
      maxAirborneTime: this.maxAirborneTime,
    };
  }
}
