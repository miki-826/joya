"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Card, Judgement } from "@/types/game";
import { SafeImage, Hanko } from "./ui";
import { playBell, playCorrect, playWrong, playTap } from "@/lib/sound";

const TOTAL_TIME = 100;
const SWIPE_THRESHOLD = 90;

/** 文字数に応じて木札内に収まるフォントサイズを返す */
function cardFontSize(len: number): string {
  if (len <= 7) return "1.5rem";
  if (len <= 11) return "1.2rem";
  if (len <= 15) return "1.05rem";
  if (len <= 20) return "0.92rem";
  return "0.82rem";
}

export function GameScreen({
  cards,
  mode,
  onFinish,
}: {
  cards: Card[];
  mode: "ai" | "mock";
  onFinish: (answers: (Judgement | null)[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(TOTAL_TIME);
  const [exit, setExit] = useState<null | Judgement>(null);
  const [flash, setFlash] = useState<null | "ok" | "ng">(null);
  const [ringing, setRinging] = useState(false);
  const [drag, setDrag] = useState(0);
  const answers = useRef<(Judgement | null)[]>([]);
  const locked = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);

  const finish = useCallback(() => {
    const full: (Judgement | null)[] = cards.map(
      (_, i) => answers.current[i] ?? null
    );
    onFinish(full);
  }, [cards, onFinish]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [finish]);

  const choose = useCallback(
    (choice: Judgement) => {
      if (locked.current) return;
      locked.current = true;
      const card = cards[idx];
      answers.current[idx] = choice;
      const ok = choice === card.type;

      playTap();
      if (choice === "煩悩") {
        setRinging(true);
        playBell();
        setTimeout(() => setRinging(false), 700);
      }
      setTimeout(() => (ok ? playCorrect() : playWrong()), 120);

      setFlash(ok ? "ok" : "ng");
      setExit(choice);

      setTimeout(() => {
        setFlash(null);
        setExit(null);
        setDrag(0);
        locked.current = false;
        if (idx + 1 >= cards.length) {
          finish();
        } else {
          setIdx((i) => i + 1);
        }
      }, 330);
    },
    [cards, idx, finish]
  );

  // ドラッグ操作
  const onDown = (e: React.PointerEvent) => {
    if (locked.current) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current || locked.current) return;
    setDrag(e.clientX - startX.current);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (drag > SWIPE_THRESHOLD) choose("煩悩");
    else if (drag < -SWIPE_THRESHOLD) choose("無漏");
    else setDrag(0);
  };

  const card = cards[idx];
  const remain = cards.length - idx;
  const tilt = Math.max(-14, Math.min(14, drag / 8));
  const lean =
    drag > 30 ? "煩悩" : drag < -30 ? "無漏" : null;

  return (
    <div className="relative flex min-h-dvh flex-col px-4 py-3">
      <div className="absolute inset-0 -z-20 washi-tex" />
      <SafeImage
        src="/images/game-bg.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-10 object-cover opacity-50"
        fallback={
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#3a2c18] to-[#caa86d] opacity-50" />
        }
      />
      <div className="absolute inset-0 -z-10 bg-washi/40" />

      {/* ヘッダー: 梁 */}
      <header className="flex items-center justify-between rounded-md border-b-4 border-ink/70 bg-[#5a4326]/85 px-4 py-2 text-washi shadow">
        <span className="font-brush text-lg tracking-wider">除夜の鐘</span>
        <span className="font-mincho text-xs">
          {mode === "ai" ? "AI住職 出題中" : "Mock出題"}
        </span>
        <span className="font-mincho text-sm">残り札 {remain}</span>
      </header>

      {/* 線香タイマー */}
      <div className="mt-3 flex items-center gap-2">
        <span className="font-mincho text-xs text-ink-sub">残</span>
        <div className="relative h-3 flex-1 overflow-hidden rounded-full border border-ink/40 bg-panel">
          <div
            className="h-full rounded-full transition-[width] duration-1000 ease-linear"
            style={{
              width: `${(time / TOTAL_TIME) * 100}%`,
              background:
                time <= 15
                  ? "linear-gradient(90deg,#e4572e,#ff8a5b)"
                  : "linear-gradient(90deg,#6b4f1d,#c19a6b)",
            }}
          />
        </div>
        <span
          className={`font-brush w-14 text-right text-2xl ${
            time <= 15 ? "text-bonnou" : "text-ink"
          }`}
        >
          {time}
          <span className="text-sm">秒</span>
        </span>
      </div>

      {/* 住職 + 鐘 */}
      <div className="mt-2 flex items-end justify-between px-1">
        <div className="flex items-center gap-2">
          <SafeImage
            src="/images/monk.png"
            alt="AI住職"
            width={96}
            height={96}
            className="h-20 w-20 object-contain drop-shadow-[1px_2px_3px_rgba(45,27,0,0.35)]"
            fallback={<span className="text-5xl">🧑‍🦲</span>}
          />
          <p className="font-brush max-w-[9rem] text-sm text-ink">
            さあ、見極めよ
          </p>
        </div>
        <div className="relative">
          <div className={ringing ? "bell-ring" : ""}>
            <SafeImage
              src="/images/bell.png"
              alt="鐘"
              width={88}
              height={88}
              className="h-20 w-20 object-contain drop-shadow-[1px_2px_3px_rgba(45,27,0,0.35)]"
              fallback={<span className="text-5xl">🔔</span>}
            />
          </div>
          {ringing && (
            <span className="ring-pulse pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/50" />
          )}
        </div>
      </div>

      {/* 木札 */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* 振り分け方向の目印 */}
        <span
          className={`font-brush absolute left-2 top-1/2 -translate-y-1/2 text-3xl transition ${
            lean === "無漏" ? "scale-125 text-muro" : "text-muro/30"
          }`}
        >
          無漏
        </span>
        <span
          className={`font-brush absolute right-2 top-1/2 -translate-y-1/2 text-3xl transition ${
            lean === "煩悩" ? "scale-125 text-bonnou" : "text-bonnou/30"
          }`}
        >
          煩悩
        </span>

        <div
          key={idx}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative touch-none select-none ${
            exit === "煩悩"
              ? "swipe-right"
              : exit === "無漏"
                ? "swipe-left"
                : "fuda-in"
          }`}
          style={
            exit
              ? undefined
              : {
                  transform: `translateX(${drag}px) rotate(${tilt}deg)`,
                  transition: dragging.current ? "none" : "transform 0.2s",
                  cursor: "grab",
                }
          }
        >
          <div className="relative h-[360px] w-[250px] sm:h-[400px] sm:w-[280px]">
            <SafeImage
              src="/images/mokufuda.png"
              alt=""
              fill
              className="object-contain drop-shadow-[4px_8px_10px_rgba(45,27,0,0.4)]"
              fallback={
                <div className="absolute inset-0 rounded-[14px] border-4 border-ink/60 bg-gradient-to-b from-[#e8cf9a] to-[#d4b878] shadow-inner" />
              }
            />
            {/* 木札の本体(尖った上部を避けた中央)に文字を必ず収める */}
            <div className="absolute left-1/2 top-[55%] flex w-[55%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <p
                className="font-brush text-center leading-snug text-ink"
                style={{ fontSize: cardFontSize(card.text.length) }}
              >
                {card.text}
              </p>
            </div>
          </div>

          {/* 判定フラッシュ */}
          {flash && (
            <span
              className={`stamp-in font-brush pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl ${
                flash === "ok" ? "text-muro" : "text-bonnou"
              }`}
            >
              {flash === "ok" ? "◯" : "✕"}
            </span>
          )}
        </div>
      </div>

      {/* 振り分けボタン */}
      <div className="mt-1 flex items-center justify-around pb-2">
        <Hanko
          label="無漏"
          img="/images/muro-stamp.png"
          color="var(--muro)"
          hint="← 左・鳴らさない"
          onClick={() => choose("無漏")}
          active={lean === "無漏"}
        />
        <p className="font-mincho hidden text-center text-xs text-ink-sub sm:block">
          札を左右に
          <br />
          スワイプ
        </p>
        <Hanko
          label="煩悩"
          img="/images/bonnou-stamp.png"
          color="var(--bonnou)"
          hint="右・鐘を鳴らす →"
          onClick={() => choose("煩悩")}
          active={lean === "煩悩"}
        />
      </div>
    </div>
  );
}
