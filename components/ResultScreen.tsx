"use client";
import type { GameResult } from "@/types/game";
import { SafeImage, SumiButton } from "./ui";

const RANK_COLOR: Record<string, string> = {
  S: "#e4572e",
  A: "#c1820b",
  B: "#4cb944",
  C: "#6b4f1d",
  D: "#8a8a8a",
};

export function ResultScreen({
  result,
  onReplay,
  onTitle,
}: {
  result: GameResult;
  onReplay: () => void;
  onTitle: () => void;
}) {
  const rate =
    result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  const color = RANK_COLOR[result.rank] ?? "#6b4f1d";

  return (
    <div className="relative min-h-dvh px-4 py-8">
      <div className="absolute inset-0 -z-20 washi-tex" />
      <SafeImage
        src="/images/result-bg.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-10 object-cover opacity-40"
        fallback={null}
      />
      <div className="absolute inset-0 -z-10 bg-washi/55" />

      <div className="mx-auto max-w-xl">
        <h2 className="font-brush text-center text-4xl text-ink">結果発表</h2>
        <div className="mx-auto mt-2 h-[2px] w-32 bg-ink/50" />

        {/* ランク印 */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="relative grid h-32 w-32 place-items-center">
            <SafeImage
              src="/images/rank-seal.png"
              alt=""
              fill
              className="object-contain mix-blend-multiply"
              fallback={
                <span
                  className="absolute inset-0 rounded-full border-[6px]"
                  style={{ borderColor: color, background: `${color}18` }}
                />
              }
            />
            <span
              className="font-brush relative text-6xl font-bold"
              style={{ color }}
            >
              {result.rank}
            </span>
          </div>
          <div>
            <p className="font-brush text-2xl text-ink">{result.title}</p>
            <p className="font-mincho mt-1 text-sm text-ink-sub">
              正答率 {rate}% ／ スコア {result.score}点
            </p>
          </div>
        </div>

        {/* 集計 */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-md border-2 border-muro/60 bg-panel/80 p-4 text-center">
            <p className="font-mincho text-xs text-ink-sub">見抜いた数</p>
            <p className="font-brush text-4xl text-muro">{result.correct}</p>
          </div>
          <div className="rounded-md border-2 border-bonnou/60 bg-panel/80 p-4 text-center">
            <p className="font-mincho text-xs text-ink-sub">惑わされた数</p>
            <p className="font-brush text-4xl text-bonnou">{result.wrong}</p>
          </div>
        </div>

        {/* AI住職コメント */}
        <div className="mt-5 flex gap-3 rounded-md border-2 border-border bg-panel/85 p-4 shadow-sm">
          <SafeImage
            src="/images/monk.png"
            alt="AI住職"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 object-contain mix-blend-multiply"
            fallback={<span className="text-4xl">🧑‍🦲</span>}
          />
          <div>
            <p className="font-brush text-sm text-ink-sub">住職の一言</p>
            <p className="font-mincho leading-relaxed text-ink">
              「{result.comment}」
            </p>
          </div>
        </div>

        {/* 間違えた札 */}
        {result.mistakes.length > 0 && (
          <div className="mt-5">
            <p className="font-brush mb-2 text-lg text-ink">
              惑わされた札の解説
            </p>
            <ul className="space-y-2">
              {result.mistakes.map((m, i) => (
                <li
                  key={i}
                  className="rounded-md border border-border/70 bg-washi/80 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mincho text-ink">{m.text}</span>
                    <span
                      className="font-brush shrink-0 rounded px-2 py-0.5 text-sm text-washi"
                      style={{
                        background:
                          m.type === "煩悩" ? "var(--bonnou)" : "var(--muro)",
                      }}
                    >
                      正解：{m.type}
                    </span>
                  </div>
                  <p className="font-mincho mt-1 text-xs text-ink-sub">
                    {m.reason}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.mistakes.length === 0 && (
          <p className="font-brush mt-5 text-center text-xl text-muro">
            一枚も惑わされず。煩悩を断つ眼力、見事なり。
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          <SumiButton onClick={onReplay}>もう一度、鐘をつく</SumiButton>
          <SumiButton variant="ghost" onClick={onTitle}>
            山門へ戻る
          </SumiButton>
        </div>
      </div>
    </div>
  );
}
