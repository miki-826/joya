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

/** 墨書き風プライマリボタン */
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
  const base =
    "relative font-brush tracking-widest transition-all duration-150 active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40";
  const styles =
    variant === "primary"
      ? "bg-[var(--btn)] hover:bg-[var(--btnh)] text-ink border-[3px] border-ink/80 shadow-[3px_3px_0_0_rgba(45,27,0,0.55)] hover:shadow-[4px_5px_0_0_rgba(45,27,0,0.55)] px-9 py-3 text-2xl"
      : "bg-transparent text-ink-sub border-2 border-ink-sub/50 hover:border-ink-sub hover:text-ink px-6 py-2 text-lg";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
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
      <span className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
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
        <span
          className="font-brush relative text-3xl font-bold sm:text-4xl"
          style={{ color }}
        >
          {label}
        </span>
      </span>
      {hint && (
        <span className="font-mincho text-xs text-ink-sub">{hint}</span>
      )}
    </button>
  );
}
