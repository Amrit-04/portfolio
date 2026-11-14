// Hybrid WebAudio & Tactile Audio Kit — muted by default, unlocked on user gesture.

class Sfx {
  private ctx: AudioContext | null = null;
  muted = true;
  private audioCache = new Map<string, HTMLAudioElement>();

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

  private playFile(path: string, volume = 0.3) {
    if (this.muted || typeof window === 'undefined') return;
    try {
      let audio = this.audioCache.get(path);
      if (!audio) {
        audio = new Audio(path);
        this.audioCache.set(path, audio);
      }
      audio.volume = volume;
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    } catch {
      // fallback gracefully if audio playback is prevented
    }
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

  // Tactile Inspiration SFX
  click() {
    const idx = Math.floor(Math.random() * 4) + 1;
    this.playFile(`/portfolio/audio/jim-sfx-click-${idx}.m4a`, 0.25);
    this.blip(520, 0.03, 'square', 0.015);
  }

  navWork() {
    this.playFile('/portfolio/audio/nav-sfx-work.m4a', 0.3);
    this.playFile('/portfolio/audio/nav-sfx-work-swoosh.m4a', 0.2);
    this.blip(440, 0.04, 'triangle', 0.02);
  }

  navAbout() {
    this.playFile('/portfolio/audio/nav-sfx-about.m4a', 0.3);
    this.blip(480, 0.04, 'triangle', 0.02);
  }

  navLinks() {
    this.playFile('/portfolio/audio/nav-sfx-links.m4a', 0.3);
    this.blip(520, 0.04, 'triangle', 0.02);
  }

  openProject() {
    this.playFile('/portfolio/audio/work-sfx-videogames.m4a', 0.35);
    this.blip(587, 0.06, 'triangle', 0.03);
  }

  land(intensity = 1) {
    this.blip(140 + 60 * intensity, 0.08, 'triangle', 0.05 * intensity, -60);
  }

  checkpoint() {
    this.playFile('/portfolio/audio/work-sfx-activations.m4a', 0.3);
    this.blip(660, 0.09, 'square', 0.035);
    setTimeout(() => this.blip(880, 0.14, 'square', 0.035), 90);
  }

  crash() {
    this.blip(110, 0.28, 'sawtooth', 0.06, -70);
  }

  finish() {
    this.playFile('/portfolio/audio/work-sfx-playground.m4a', 0.4);
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.blip(f, 0.16, 'square', 0.03), i * 110));
  }
}

export const sfx = new Sfx();
