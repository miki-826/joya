import { NextResponse } from "next/server";
import type { Card, Judgement } from "@/types/game";
import { HAS_KEY, MOCK_COMMENTS } from "@/lib/mock";
import { judge } from "@/lib/score";
import { generateComment } from "@/lib/openai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    cards?: Card[];
    answers?: (Judgement | null)[];
  };
  const cards = Array.isArray(body.cards) ? body.cards : [];
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (cards.length === 0) {
    return NextResponse.json({ error: "no cards" }, { status: 400 });
  }

  const result = judge(cards, answers);
  const fallback =
    MOCK_COMMENTS[result.wrong % MOCK_COMMENTS.length];

  let comment = fallback;
  if (HAS_KEY) {
    try {
      comment = await generateComment(
        result.correct,
        result.wrong,
        result.mistakes.map((m) => m.text)
      );
    } catch {
      comment = fallback;
    }
  }

  return NextResponse.json({ ...result, comment });
}
