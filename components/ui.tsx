"use client";
import Image from "next/image";
import { useState } from "react";

/** 画像が無くても崩れないラッパー（読み込み失敗時は子のフォールバックを表示） */
export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  fallback,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
}) {
  const [err, setErr] = useState(false);
  if (err) return <>{fallback ?? null}</>;
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setErr(true)}
      unoptimized
    />
  );
}

/** 本物の木の板（wood-button.png）を背景にした木札ボタン */
export function SumiButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const big = variant === "primary";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-grid place-items-center overflow-hidden rounded-md shadow-[3px_5px_8px_rgba(45,27,0,0.45)] transition-all duration-150 hover:brightness-105 active:translate-y-0.5 active:shadow-[2px_2px_5px_rgba(45,27,0,0.45)] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50 ${
        big ? "min-w-[15rem] px-10 py-4" : "min-w-[11rem] px-7 py-3"
      } ${className}`}
    >
      <SafeImage
        src="/images/wood-button.png"
        alt=""
        fill
        className="object-fill"
        fallback={
          <span className="absolute inset-0 border-[3px] border-[#3b2a16] bg-[#9c6b3f]" />
        }
      />
      <span
        className={`font-brush relative z-10 tracking-widest text-[#f8f1e0] [text-shadow:0_2px_3px_rgba(0,0,0,0.75)] ${
          big ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
        }`}
      >
        {children}
      </span>
    </button>
  );
}

/** 本物の木の板（wood-panel.png）を背景にしたパネル。お寺の高札風。 */
export function WoodPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border-[3px] border-[#3b2a16] shadow-[2px_4px_8px_rgba(45,27,0,0.3)] ${className}`}
    >
      <SafeImage
        src="/images/wood-panel.png"
        alt=""
        fill
        className="object-cover"
        fallback={<span className="absolute inset-0 bg-[#cda876]" />}
      />
      <span className="absolute inset-0 bg-[#3b2a16]/[0.04]" />
      <div className="relative">{children}</div>
    </div>
  );
}

/** 朱印風の丸ボタン枠（背景に印影画像、上に墨文字） */
export function Hanko({
  label,
  img,
  color,
  onClick,
  active,
  hint,
}: {
  label: string;
  img: string;
  color: string;
  onClick?: () => void;
  active?: boolean;
  hint?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1 transition-transform duration-150 active:scale-95 ${
        active ? "scale-105" : ""
      }`}
    >
      <span className="relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32">
        <SafeImage
          src={img}
          alt={label}
          fill
          className="object-contain drop-shadow-[1px_2px_2px_rgba(45,27,0,0.25)]"
          fallback={
            <span
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: color, background: `${color}22` }}
            />
          }
        />
        {/* 2文字を縦に積んで円の内側にきっちり収める */}
        <span className="relative flex h-[52%] w-[52%] flex-col items-center justify-center">
          {label.split("").map((ch, i) => (
            <span
              key={i}
              className="font-brush font-bold leading-[0.92] text-ink drop-shadow-[0_1px_0_rgba(247,243,233,0.6)]"
              style={{ fontSize: "clamp(1.1rem, 6vw, 1.6rem)" }}
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
      {hint && (
        <span className="font-mincho text-xs text-ink-sub">{hint}</span>
      )}
    </button>
  );
}
