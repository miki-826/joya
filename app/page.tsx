"use client";
import { useCallback, useState } from "react";
import type { Card, Judgement, GameResult, GamePhase } from "@/types/game";
import { buildMockCards, MOCK_COMMENTS } from "@/lib/mock";
import { judge } from "@/lib/score";
import { saveResult } from "@/lib/store";
import { Bgm } from "@/components/Bgm";
import { TitleScreen } from "@/components/TitleScreen";
import { HowtoScreen } from "@/components/HowtoScreen";
import { GameScreen } from "@/components/GameScreen";
import { ResultScreen } from "@/components/ResultScreen";

const LOADING_MSGS = [
  "鐘楼に灯をともしています…",
  "AI住職が煩悩札を選んでいます…",
  "墨を磨り、札をしたためています…",
];

export default function Page() {
  const [phase, setPhase] = useState<GamePhase>("title");
  const [cards, setCards] = useState<Card[]>([]);
  const [mode, setMode] = useState<"ai" | "mock">("mock");
  const [result, setResult] = useState<GameResult | null>(null);
  const [loadMsg, setLoadMsg] = useState(LOADING_MSGS[0]);

  const startGame = useCallback(async () => {
    setPhase("loading");
    let i = 0;
    const spin = setInterval(() => {
      i = (i + 1) % LOADING_MSGS.length;
      setLoadMsg(LOADING_MSGS[i]);
    }, 800);
    try {
      const res = await fetch("/api/game/start", { method: "POST" });
      const data = (await res.json()) as { cards: Card[]; mode: "ai" | "mock" };
      const c = data.cards?.length ? data.cards : buildMockCards();
      setCards(c);
      setMode(data.mode ?? "mock");
    } catch {
      setCards(buildMockCards());
      setMode("mock");
    } finally {
      clearInterval(spin);
      setPhase("playing");
    }
  }, []);

  const finishGame = useCallback(
    async (answers: (Judgement | null)[]) => {
      setPhase("loading");
      setLoadMsg("住職が判定しています…");
      const local = judge(cards, answers);
      const fallbackComment =
        MOCK_COMMENTS[local.wrong % MOCK_COMMENTS.length];
      let final: GameResult = { ...local, comment: fallbackComment };
      try {
        const res = await fetch("/api/game/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cards, answers }),
        });
        if (res.ok) {
          const data = (await res.json()) as GameResult;
          final = { ...local, comment: data.comment ?? fallbackComment };
        }
      } catch {
        /* ローカル判定で続行 */
      }
      setResult(final);
      void saveResult(final);
      setPhase("result");
    },
    [cards]
  );

  return (
    <main className="relative">
      {phase !== "loading" && (
        <div className="fixed right-3 top-3 z-50">
          <Bgm />
        </div>
      )}

      {phase === "title" && (
        <TitleScreen onStart={startGame} onHowto={() => setPhase("howto")} />
      )}

      {phase === "howto" && (
        <HowtoScreen onStart={startGame} onBack={() => setPhase("title")} />
      )}

      {phase === "loading" && (
        <div className="washi-tex flex min-h-dvh flex-col items-center justify-center gap-6 px-6">
          <div className="float-y text-6xl">🔔</div>
          <p className="font-brush animate-pulse text-2xl text-ink">
            {loadMsg}
          </p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-panel">
            <div className="h-full w-1/2 animate-[floatY_1.2s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      )}

      {phase === "playing" && cards.length > 0 && (
        <GameScreen cards={cards} mode={mode} onFinish={finishGame} />
      )}

      {phase === "result" && result && (
        <ResultScreen
          result={result}
          onReplay={startGame}
          onTitle={() => setPhase("title")}
        />
      )}
    </main>
  );
}
