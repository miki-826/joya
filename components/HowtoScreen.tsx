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
    body: "煩悩だと思えば右（鐘を鳴らす）、無漏だと思えば左へ。スワイプかボタンで判定。",
  },
  {
    n: "三",
    title: "百秒で見抜け",
    body: "制限は100秒。札が尽きるか時間切れで結果へ。正答率でランクと称号が決まります。",
  },
];

export function HowtoScreen({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center px-5 py-8">
      <div className="absolute inset-0 -z-10 washi-tex" />

      <div className="flex w-full max-w-2xl items-center justify-between">
        <button
          onClick={onBack}
          className="font-mincho text-ink-sub hover:text-ink"
        >
          ← 戻る
        </button>
        <h2 className="font-brush text-3xl text-ink">遊び方</h2>
        <span className="w-12" />
      </div>

      <div className="mt-6 grid w-full max-w-2xl gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
        {/* 住職と巻物 */}
        <div className="relative mx-auto w-40 sm:w-44">
          <div className="float-y">
            <SafeImage
              src="/images/monk.png"
              alt="AI住職"
              width={320}
              height={320}
              className="h-auto w-full mix-blend-multiply"
              fallback={
                <div className="grid aspect-square w-full place-items-center rounded-full border-4 border-ink/50 bg-panel text-6xl">
                  🧑‍🦲
                </div>
              }
            />
          </div>
          <p className="font-brush mt-2 text-center text-ink-sub">AI住職</p>
        </div>

        {/* 巻物に書かれた手順 */}
        <div className="relative">
          <SafeImage
            src="/images/howto-scroll.png"
            alt=""
            fill
            className="absolute inset-0 -z-10 object-fill opacity-30"
            fallback={null}
          />
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
        </div>
      </div>

      <div className="mt-8">
        <SumiButton onClick={onStart}>いざ、鐘つき</SumiButton>
      </div>
    </div>
  );
}
