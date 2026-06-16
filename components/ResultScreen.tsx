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
              className="object-contain drop-shadow-[1px_2px_4px_rgba(45,27,0,0.3)]"
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
          <div className="rounded-md border-2 border-muro/70 bg-muro/10 p-4 text-center">
            <p className="font-mincho text-sm text-ink-sub">
              <span className="text-muro">◯</span> 正解（見抜いた）
            </p>
            <p className="font-brush mt-1 text-4xl text-muro">
              {result.correct}
              <span className="text-xl"> / {result.total}</span>
            </p>
          </div>
          <div className="rounded-md border-2 border-bonnou/70 bg-bonnou/10 p-4 text-center">
            <p className="font-mincho text-sm text-ink-sub">
              <span className="text-bonnou">✕</span> 不正解（惑わされた）
            </p>
            <p className="font-brush mt-1 text-4xl text-bonnou">
              {result.wrong}
              <span className="text-xl"> / {result.total}</span>
            </p>
          </div>
        </div>

        {/* AI住職コメント */}
        <div className="mt-5 flex gap-3 rounded-md border-2 border-border bg-panel/85 p-4 shadow-sm">
          <SafeImage
            src="/images/monk.png"
            alt="AI住職"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 object-contain"
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
          <div className="mt-6">
            <p className="font-brush mb-1 text-xl text-ink">
              ✕ ここを間違えた（{result.mistakes.length}枚）
            </p>
            <p className="font-mincho mb-3 text-xs text-ink-sub">
              あなたの判定と、正しい判定を見比べてみよう。
            </p>
            <ul className="space-y-3">
              {result.mistakes.map((m, i) => (
                <li
                  key={i}
                  className="overflow-hidden rounded-lg border-2 border-bonnou/50 bg-washi/85 shadow-sm"
                >
                  <p className="font-brush border-b border-border/60 bg-panel/70 px-3 py-2 text-lg text-ink">
                    「{m.text}」
                  </p>
                  <div className="flex items-stretch divide-x divide-border/60 text-center">
                    <div className="flex-1 p-2">
                      <p className="font-mincho text-[11px] text-ink-sub">
                        あなたの判定
                      </p>
                      <p className="font-brush text-lg text-bonnou">
                        ✕ {m.yours}
                      </p>
                    </div>
                    <div className="flex items-center px-2 font-brush text-ink-sub">
                      →
                    </div>
                    <div className="flex-1 p-2">
                      <p className="font-mincho text-[11px] text-ink-sub">
                        正しくは
                      </p>
                      <p className="font-brush text-lg text-muro">
                        ◯ {m.type}
                      </p>
                    </div>
                  </div>
                  <p className="font-mincho border-t border-border/60 px-3 py-2 text-xs leading-relaxed text-ink-sub">
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
