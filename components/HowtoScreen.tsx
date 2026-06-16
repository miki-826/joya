"use client";
import { SafeImage, SumiButton } from "./ui";

const STEPS = [
  {
    n: "一",
    title: "AI住職が札を出す",
    body: "煩悩（欲・執着・怒り）と、無漏（無私・善行）の札が混ざって次々に現れます。",
  },
  {
    n: "二",
    title: "右か左に振り分ける",
    body: "煩悩だと思えば右（鐘を鳴らす）、無漏だと思えば左へ。スワイプかボタンで判定します。",
  },
  {
    n: "三",
    title: "百秒で見抜け",
    body: "制限は100秒。札が尽きるか時間切れで結果へ。判定するたびに鐘が鳴り、◯✕が表示されます。",
  },
];

const BONNOU_EX = ["他人の成功を羨む", "もっと欲しいと執着する", "怒りを引きずる"];
const MURO_EX = ["困った人を助ける", "見返りなく席を譲る", "今に感謝する"];
const RANKS = [
  { r: "S", d: "正答率95%以上", c: "var(--bonnou)" },
  { r: "A", d: "85%以上", c: "#c1820b" },
  { r: "B", d: "70%以上", c: "var(--muro)" },
  { r: "C", d: "50%以上", c: "var(--ink-sub)" },
  { r: "D", d: "それ未満", c: "#8a8a8a" },
];

export function HowtoScreen({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div className="relative min-h-dvh px-5 py-8">
      <div className="absolute inset-0 -z-10 washi-tex" />

      <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <button
          onClick={onBack}
          className="font-mincho text-ink-sub hover:text-ink"
        >
          ← 戻る
        </button>
        <h2 className="font-brush text-3xl text-ink">遊び方</h2>
        <span className="w-12" />
      </div>

      <div className="mx-auto mt-5 max-w-2xl space-y-5">
        {/* 導入：住職 + 一言 */}
        <div className="flex items-center gap-4 rounded-lg border-2 border-border/70 bg-panel/85 p-4 shadow-sm">
          <div className="float-y w-24 shrink-0 sm:w-28">
            <SafeImage
              src="/images/monk.png"
              alt="AI住職"
              width={320}
              height={320}
              className="h-auto w-full drop-shadow-[2px_4px_6px_rgba(45,27,0,0.3)]"
              fallback={<div className="text-6xl">🧑‍🦲</div>}
            />
          </div>
          <p className="font-mincho leading-relaxed text-ink">
            よう来たな。わしが出す札には
            <span className="font-bold text-bonnou">煩悩</span>と
            <span className="font-bold text-muro">無漏</span>が
            混ざっておる。心の眼で見抜いて、鐘を鳴らしてみせよ。
          </p>
        </div>

        {/* 手順 */}
        <ol className="space-y-3">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="flex gap-3 rounded-md border-2 border-border/70 bg-panel/85 p-3 shadow-sm"
            >
              <span className="font-brush grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-xl text-washi">
                {s.n}
              </span>
              <div>
                <p className="font-brush text-xl text-ink">{s.title}</p>
                <p className="font-mincho text-sm leading-relaxed text-ink-sub">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* 振り分けの向き */}
        <div className="rounded-lg border-2 border-border/70 bg-washi/80 p-4">
          <p className="font-brush mb-3 text-center text-lg text-ink">
            札の振り分けかた
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 rounded-md border-2 border-muro/60 bg-muro/10 p-3 text-center">
              <p className="font-brush text-2xl text-muro">← 無漏</p>
              <p className="font-mincho text-xs text-ink-sub">
                左へ・鐘を鳴らさない
              </p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center">
              <SafeImage
                src="/images/mokufuda.png"
                alt="札"
                width={56}
                height={84}
                className="h-full w-auto object-contain"
                fallback={<span className="text-2xl">🪧</span>}
              />
            </div>
            <div className="flex-1 rounded-md border-2 border-bonnou/60 bg-bonnou/10 p-3 text-center">
              <p className="font-brush text-2xl text-bonnou">煩悩 →</p>
              <p className="font-mincho text-xs text-ink-sub">
                右へ・鐘を鳴らす
              </p>
            </div>
          </div>
          <p className="font-mincho mt-3 text-center text-xs text-ink-sub">
            ※札を左右にドラッグしてもOK
          </p>
        </div>

        {/* 札の見分け方（例） */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-bonnou/50 bg-panel/80 p-3">
            <p className="font-brush text-lg text-bonnou">これは「煩悩」</p>
            <p className="font-mincho mb-2 text-xs text-ink-sub">
              欲・執着・怒り・嫉妬など
            </p>
            <ul className="space-y-1">
              {BONNOU_EX.map((t) => (
                <li
                  key={t}
                  className="font-mincho rounded bg-bonnou/10 px-2 py-1 text-sm text-ink"
                >
                  「{t}」
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-2 border-muro/50 bg-panel/80 p-3">
            <p className="font-brush text-lg text-muro">これは「無漏」</p>
            <p className="font-mincho mb-2 text-xs text-ink-sub">
              無私・善行・感謝など
            </p>
            <ul className="space-y-1">
              {MURO_EX.map((t) => (
                <li
                  key={t}
                  className="font-mincho rounded bg-muro/10 px-2 py-1 text-sm text-ink"
                >
                  「{t}」
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ランク */}
        <div className="rounded-lg border-2 border-border/70 bg-washi/80 p-4">
          <p className="font-brush mb-3 text-center text-lg text-ink">
            正答率でランクが決まる
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {RANKS.map((x) => (
              <div
                key={x.r}
                className="flex items-center gap-2 rounded-full border-2 bg-panel/70 px-3 py-1"
                style={{ borderColor: x.c }}
              >
                <span
                  className="font-brush text-xl font-bold"
                  style={{ color: x.c }}
                >
                  {x.r}
                </span>
                <span className="font-mincho text-xs text-ink-sub">{x.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center pb-4">
        <SumiButton onClick={onStart}>いざ、鐘つき</SumiButton>
      </div>
    </div>
  );
}
