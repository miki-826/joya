import type { Card, Judgement, GameResult, Mistake } from "@/types/game";

export function rankOf(rate: number): { rank: string; title: string } {
  if (rate >= 0.95) return { rank: "S", title: "煩悩を断つ大悟者" };
  if (rate >= 0.85) return { rank: "A", title: "煩悩マスター" };
  if (rate >= 0.7) return { rank: "B", title: "心眼の修行僧" };
  if (rate >= 0.5) return { rank: "C", title: "無漏見習い" };
  return { rank: "D", title: "煩悩まみれの俗人" };
}

export function judge(
  cards: Card[],
  answers: (Judgement | null)[]
): Omit<GameResult, "comment"> {
  const total = cards.length;
  let correct = 0;
  const mistakes: Mistake[] = [];
  cards.forEach((card, i) => {
    const a = answers[i];
    if (a === card.type) {
      correct++;
    } else if (a !== null && a !== undefined) {
      mistakes.push({
        text: card.text,
        type: card.type,
        yours: a,
        reason: card.reason ?? `これは${card.type}です。`,
      });
    } else {
      mistakes.push({
        text: card.text,
        type: card.type,
        yours: card.type === "煩悩" ? "無漏" : "煩悩",
        reason: card.reason ?? `これは${card.type}です（未回答）。`,
      });
    }
  });
  const wrong = total - correct;
  const rate = total > 0 ? correct / total : 0;
  const { rank, title } = rankOf(rate);
  return {
    cards,
    answers,
    correct,
    wrong,
    total,
    score: correct * 10,
    rank,
    title,
    mistakes,
  };
}
