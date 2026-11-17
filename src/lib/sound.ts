/** Original synthesized feedback. No third-party recordings; off by default. */
class Sfx {
  private ctx: AudioContext | null = null;
  muted = true;
  setMuted(m: boolean) {
    this.muted = m;
    if (!m && typeof window !== "undefined") {
      this.ctx ??= new AudioContext();
      void this.ctx.resume();
    }
  }
  private blip(
    f: number,
    d = 0.08,
    type: OscillatorType = "triangle",
    v = 0.035,
  ) {
    if (this.muted || !this.ctx) return;
    const c = this.ctx,
      o = c.createOscillator(),
      g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, c.currentTime);
    g.gain.setValueAtTime(v, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + d);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + d);
  }
  click() {
    this.blip(520, 0.03);
  }
  navWork() {
    this.click();
  }
  navAbout() {
    this.click();
  }
  navLinks() {
    this.click();
  }
  openProject() {
    this.blip(587);
  }
  land(i = 1) {
    this.blip(130 + Math.min(i, 3) * 40, 0.08, "triangle", 0.025);
  }
  checkpoint() {
    this.blip(880, 0.2);
  }
  star() {
    this.blip(1046, 0.11);
  }
  crash() {
    this.blip(90, 0.22, "sawtooth", 0.025);
  }
  finish() {
    [523, 659, 784, 1046].forEach((f, i) =>
      setTimeout(() => this.blip(f, 0.16), i * 110),
    );
  }
}
export const sfx = new Sfx();
