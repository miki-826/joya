"use client";

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

/** 除夜の鐘らしい余韻のある一撞き */
export function playBell() {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const master = c.createGain();
  master.connect(c.destination);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.5, now + 0.01);
  master.gain.exponentialRampToValueAtTime(0.0008, now + 3.2);

  const partials = [
    { f: 110, g: 1 },
    { f: 220, g: 0.6 },
    { f: 327, g: 0.4 },
    { f: 436, g: 0.25 },
    { f: 712, g: 0.15 },
  ];
  for (const p of partials) {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = p.f;
    g.gain.value = p.g;
    o.connect(g);
    g.connect(master);
    o.start(now);
    o.stop(now + 3.4);
  }
}

function tone(freq: number, dur: number, type: OscillatorType, vol = 0.3) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(now);
  o.stop(now + dur + 0.05);
}

export function playCorrect() {
  tone(660, 0.16, "triangle", 0.25);
  setTimeout(() => tone(990, 0.22, "triangle", 0.22), 90);
}

export function playWrong() {
  tone(180, 0.35, "sawtooth", 0.18);
}

/** 木札を置く乾いた音 */
export function playTap() {
  tone(440, 0.05, "square", 0.08);
}
