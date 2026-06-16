"use client";
import { SafeImage, SumiButton } from "./ui";

export function TitleScreen({
  onStart,
  onHowto,
}: {
  onStart: () => void;
  onHowto: () => void;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
      {/* 背景 */}
      <div className="absolute inset-0 -z-20 washi-tex" />
      <SafeImage
        src="/images/title-bg.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-10 object-cover"
        fallback={
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2a1c0c] via-[#5a4326] to-[#caa86d]" />
        }
      />
      {/* 中央のみ和紙スクリムで文字を読みやすく、四隅の絵は残す */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(247,243,233,0.72)_0%,rgba(247,243,233,0.30)_45%,rgba(247,243,233,0)_72%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-washi/80 to-transparent" />

      {/* 扁額タイトル */}
      <div className="relative mb-2 text-center">
        <p className="font-mincho mb-4 text-base tracking-[0.4em] text-ink-sub">
          ─ 大晦日、鐘楼の刻 ─
        </p>
        <h1 className="font-brush text-5xl leading-tight text-ink drop-shadow-[2px_2px_0_rgba(247,243,233,0.7)] sm:text-7xl">
          鳴らせ！
          <br />
          除夜の鐘！
        </h1>
        <div className="mx-auto mt-5 h-[3px] w-40 bg-ink/60" />
        <p className="font-mincho mt-5 text-lg text-ink sm:text-xl">
          AI住職が出す煩悩札、君は見抜けるか？
        </p>
      </div>

      {/* ボタン群 */}
      <div className="relative mt-10 flex flex-col items-center gap-4">
        <SumiButton onClick={onStart}>鐘をつきに行く</SumiButton>
        <SumiButton variant="ghost" onClick={onHowto}>
          遊び方を聞く
        </SumiButton>
      </div>

      <p className="font-mincho absolute bottom-4 text-xs text-ink-sub/80">
        煩悩は右へ・無漏は左へ。百八つ、いや百秒の勝負。
      </p>
    </div>
  );
}
