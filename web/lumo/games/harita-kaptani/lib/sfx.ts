/** Ses efektleri — Periyodik Kaos ile aynı yapı. */

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window as unknown as Record<string, typeof AudioContext>).AudioContext
      || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(o: { freq: number; duration: number; type?: OscillatorType; gain?: number; slideTo?: number; delay?: number }) {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + (o.delay ?? 0);
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + o.duration);
  const peak = o.gain ?? 0.18;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + o.duration + 0.05);
}

export const sfx = {
  setMuted(v: boolean) { muted = v; },
  isMuted() { return muted; },
  pick() { tone({ freq: 520, duration: 0.06, type: "triangle", gain: 0.08 }); },
  correct() {
    tone({ freq: 660, duration: 0.12, gain: 0.18 });
    tone({ freq: 990, duration: 0.18, gain: 0.15, delay: 0.08 });
  },
  wrong() { tone({ freq: 220, duration: 0.18, type: "sawtooth", gain: 0.14, slideTo: 110 }); },
  phaseComplete() {
    tone({ freq: 523, duration: 0.16, type: "triangle", gain: 0.18 });
    tone({ freq: 659, duration: 0.16, type: "triangle", gain: 0.18, delay: 0.12 });
    tone({ freq: 784, duration: 0.22, type: "triangle", gain: 0.2, delay: 0.24 });
  },
  victory() {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, duration: 0.22, type: "triangle", gain: 0.2, delay: i * 0.12 })
    );
    tone({ freq: 1568, duration: 0.4, type: "triangle", gain: 0.22, delay: 0.6 });
  },
};
