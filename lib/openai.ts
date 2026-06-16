import type { Card } from "@/types/game";

const KEY = process.env.OPENAI_API_KEY;
const MODEL = "gpt-4o-mini";

async function chatJSON(system: string, user: string): Promise<unknown> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

export async function generateCards(): Promise<Card[]> {
  const system =
    "あなたは仏教の煩悩と無漏（煩悩でないもの）の短いシチュエーション文を作る出題者です。出力は必ずJSONのみ。Markdownや説明文は禁止。";
  const user = `煩悩（人間の欲望・執着・怒り・嫉妬などに基づく行動や感情）を8枚、無漏（無私・善行・欲望に基づかない静かな行動）を4枚、合計12枚を作ってください。
各札は日本語20文字以内の一文、reasonは40文字以内の理由。シャッフルして混ぜて出力。

{
  "cards": [
    { "text": "...", "type": "煩悩", "reason": "..." },
    { "text": "...", "type": "無漏", "reason": "..." }
  ]
}`;
  const obj = (await chatJSON(system, user)) as { cards?: Card[] };
  const cards = (obj.cards ?? []).filter(
    (c) => c && c.text && (c.type === "煩悩" || c.type === "無漏")
  );
  if (cards.length < 6) throw new Error("not enough cards");
  return cards.slice(0, 12);
}

export async function generateComment(
  correct: number,
  wrong: number,
  mistakeTexts: string[]
): Promise<string> {
  const system =
    "あなたは大晦日に鐘をつく住職です。プレイヤーへ短い分析コメントを述べます。出力は必ずJSONのみ。";
  const user = `正解数:${correct} 失敗数:${wrong} 間違えた札:${JSON.stringify(
    mistakeTexts
  )}
住職らしい少し古風な口調で、40文字以内の一文コメントを作ってください。
{ "comment": "..." }`;
  const obj = (await chatJSON(system, user)) as { comment?: string };
  if (!obj.comment) throw new Error("no comment");
  return obj.comment;
}
