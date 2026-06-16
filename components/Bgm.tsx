"use client";
import { useEffect, useRef, useState } from "react";

export function Bgm() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      const a = ref.current;
      if (!a) return;
      a.volume = 0.4;
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
  }, []);

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
    <>
      <audio ref={ref} src="/audio/bgm.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label="BGM切り替え"
        className="font-brush flex items-center gap-1.5 rounded-full border-2 border-ink/60 bg-panel/80 px-3 py-1 text-sm text-ink shadow-sm transition hover:bg-panel"
      >
        <span className="text-base">{on ? "🔔" : "🔕"}</span>
        <span className="tracking-wider">{ready ? "BGM" : "♪"}</span>
      </button>
    </>
  );
}
