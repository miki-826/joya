import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || !apiKey.startsWith("sk-")) {
  console.error("ERROR: valid OPENAI_API_KEY not found in env");
  process.exit(1);
}

// フレーム全面が木材なので背景除去は不要（bg-coverで使う）
const jobs = [
  { name: "wood-button", size: "1536x1024", prompt: "a blank weathered wooden temple plaque board filling the entire frame edge to edge, horizontal cedar wood grain, hand-carved dark sumi-painted rounded inner border frame near the edges, smooth blank center panel, flat top-down view, warm natural brown tones, soft lighting, no text, no logo, no watermark" },
  { name: "wood-panel", size: "1536x1024", prompt: "a large blank aged wooden board plank filling the entire frame edge to edge, horizontal hinoki cypress wood grain texture with a few small knots, smooth weathered surface, flat top-down view, warm natural light brown tones, even lighting, no border, no text, no logo, no watermark" },
  { name: "wood-sign", size: "1024x1536", prompt: "a tall blank wooden temple notice board kosatsu plaque filling the entire frame, vertical cedar wood grain, hand-carved dark border frame, a small triangular wooden roof shape implied at the very top edge, smooth blank center, flat front view, warm brown tones, no text, no logo, no watermark" },
];

for (const j of jobs) {
  const out = `public/images/${j.name}.png`;
  console.log(`GEN  ${out} (${j.size})`);
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-2", prompt: j.prompt, size: j.size, quality: "medium", n: 1 }),
    });
    if (!res.ok) { console.error(`FAIL ${out} ${res.status}: ${await res.text()}`); continue; }
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) { console.error(`FAIL ${out}: no image data`); continue; }
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(b64, "base64"));
    console.log(`OK   ${out}`);
  } catch (e) {
    console.error(`FAIL ${out}: ${e.message}`);
  }
}
console.log("ALL DONE");
