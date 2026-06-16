import { NextResponse } from "next/server";
import { HAS_KEY, buildMockCards } from "@/lib/mock";
import { generateCards } from "@/lib/openai";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!HAS_KEY) {
    return NextResponse.json({ cards: buildMockCards(), mode: "mock" });
  }
  try {
    const cards = await generateCards();
    return NextResponse.json({ cards, mode: "ai" });
  } catch {
    return NextResponse.json({ cards: buildMockCards(), mode: "mock" });
  }
}
