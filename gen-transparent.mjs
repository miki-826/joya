import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || !apiKey.startsWith("sk-")) {
  console.error("ERROR: valid OPENAI_API_KEY not found in env");
  process.exit(1);
}

// 前景素材のみ透過背景で再生成（背景画像は対象外）
const jobs = [
  { name: "monk", size: "1024x1024", prompt: "a cute friendly Japanese Buddhist head priest, shaved head, saffron and brown kesa robe, gentle warm smile, holding a wooden bell mallet, soft sumi-e ink and watercolor illustration, half-body character, isolated subject on a fully transparent background, no background, no scenery, no floor shadow, no text, no logo, no watermark" },
  { name: "mokufuda", size: "1024x1536", prompt: "a single blank vertical wooden ema votive plaque shaped like a shogi piece, aged natural wood grain, hand-painted black sumi ink border, a small hanging cord at the top, blank wood surface, isolated subject on a fully transparent background, no background, no floor, no shadow, no text, no logo, no watermark" },
  { name: "bell", size: "1024x1024", prompt: "a large Japanese temple bell bonsho, weathered bronze with lotus motifs, black sumi-e ink-wash illustration, single object, isolated subject on a fully transparent background, no background, no shadow, no text, no logo, no watermark" },
  { name: "bonnou-stamp", size: "1024x1024", prompt: "a round vermilion red Japanese hanko seal ink stamp, rough dry-brush circular ink mark, isolated subject on a fully transparent background, no background, blank inside, no text, no logo, no watermark" },
  { name: "muro-stamp", size: "1024x1024", prompt: "a round deep pine-green Japanese hanko seal ink stamp, soft-brush circular ink mark, isolated subject on a fully transparent background, no background, blank inside, no text, no logo, no watermark" },
  { name: "rank-seal", size: "1024x1024", prompt: "an ornate circular Japanese award seal medallion, gold leaf and vermilion red, brush ink and gold accents, decorative rim, isolated subject on a fully transparent background, no background, blank center, no text, no logo, no watermark" },
];

for (const j of jobs) {
  const out = `public/images/${j.name}.png`;
  console.log(`GEN  ${out} (${j.size}, transparent)`);
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: j.prompt,
        size: j.size,
        quality: "medium",
        background: "transparent",
        n: 1,
      }),
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
