"use client";
import { useEffect, useRef, useState } from "react";

export function Bgm() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [vol, setVol] = useState(0.4);

  useEffect(() => {
    const start = () => {
      const a = ref.current;
      if (!a) return;
      a.volume = vol;
      a.play()
        .then(() => {
          setOn(true);
          setReady(true);
        })
        .catch(() => setReady(true));
      window.removeEventListener("pointerdown", start);
    };
    window.addEventListener("pointerdown", start);
    return () => window.removeEventListener("pointerdown", start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.volume = vol;
  }, [vol]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.play().then(() => setOn(true)).catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full border-2 border-ink/60 bg-panel/90 px-2.5 py-1 shadow-sm">
      <button
        onClick={toggle}
        aria-label={on ? "BGMを止める" : "BGMを鳴らす"}
        className="font-brush flex items-center gap-1 text-sm text-ink"
      >
        <span className="text-base">{on ? "🔔" : "🔕"}</span>
        <span className="tracking-wider">{ready ? "BGM" : "♪"}</span>
      </button>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="音量設定"
        className="text-ink-sub hover:text-ink"
        title="音量"
      >
        ▾
      </button>

      {open && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={vol}
          onChange={(e) => {
            const v = Number(e.target.value);
            setVol(v);
            if (v > 0 && !on) toggle();
          }}
          aria-label="BGM音量"
          className="h-1.5 w-24 cursor-pointer accent-bonnou"
        />
      )}

      <audio ref={ref} src="/audio/bgm.mp3" loop preload="auto" />
    </div>
  );
}
