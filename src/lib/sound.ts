// Tiny WebAudio SFX kit — muted by default, unlocked on first user gesture.

class Sfx {
  private ctx: AudioContext | null = null;
  muted = true;

  private ensure(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  setMuted(m: boolean) {
    this.muted = m;
  }

  private blip(freq: number, dur: number, type: OscillatorType, vol: number, slide = 0) {
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), ctx.currentTime + dur);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  }

  land(intensity = 1) {
    this.blip(140 + 60 * intensity, 0.08, 'triangle', 0.05 * intensity, -60);
  }
  checkpoint() {
    this.blip(660, 0.09, 'square', 0.035);
    setTimeout(() => this.blip(880, 0.14, 'square', 0.035), 90);
  }
  crash() {
    this.blip(110, 0.28, 'sawtooth', 0.06, -70);
  }
  click() {
    this.blip(520, 0.04, 'square', 0.02);
  }
  finish() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.blip(f, 0.16, 'square', 0.03), i * 110));
  }
}

export const sfx = new Sfx();
