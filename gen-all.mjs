import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || !apiKey.startsWith("sk-")) {
  console.error("ERROR: valid OPENAI_API_KEY not found in env");
  process.exit(1);
}

const jobs = [
  { name: "title-bg", size: "1536x1024", prompt: "Japanese temple bell tower at night on New Year's Eve, large bronze temple bell bonsho, glowing paper lanterns, gently falling snow, distant pine forest, sumi-e ink-wash calligraphy texture, warm washi paper tones, wooden beams, serene and festive, web game title background, generous empty space in the center, no text, no logo, no watermark" },
  { name: "game-bg", size: "1536x1024", prompt: "dim interior of a zen temple bell chamber at midnight, tall wooden pillars, a hanging bronze temple bell, soft candle and lantern glow, faint incense smoke, ink-wash sumi-e texture, calm warm washi paper tone, web game play background, large empty area in the center for cards, no text, no logo, no watermark" },
  { name: "result-bg", size: "1536x1024", prompt: "a Japanese hanging scroll kakemono background with subtle gold leaf and splashes of black ink calligraphy, new year festive mood, aged washi paper, elegant sumi-e style, web game result screen background, empty space in the center, no text, no logo, no watermark" },
  { name: "monk", size: "1024x1024", prompt: "a cute friendly Japanese Buddhist head priest, shaved head, traditional kesa robe in saffron and brown, gentle warm smile, holding a wooden bell mallet, soft sumi-e ink and watercolor on washi paper style, half-body character portrait, simple plain cream background, no text, no logo, no watermark" },
  { name: "mokufuda", size: "1024x1536", prompt: "a single blank vertical wooden plaque shaped like a shogi piece / ema votive tablet, aged natural wood grain, hand-painted black sumi ink border, a small hanging cord at the top, traditional Japanese game item, centered on a plain soft background, blank surface, no text, no logo, no watermark" },
  { name: "bell", size: "1024x1024", prompt: "a large Japanese temple bell bonsho, weathered bronze with lotus motifs, black sumi-e ink-wash illustration style, single object centered, plain soft washi background, web game icon, no text, no logo, no watermark" },
  { name: "bonnou-stamp", size: "1024x1024", prompt: "a round vermilion red Japanese hanko seal stamp, rough dry-brush ink texture, bold circular mark, isolated centered on plain cream washi background, used as a UI button accent, blank inside, no text, no logo, no watermark" },
  { name: "muro-stamp", size: "1024x1024", prompt: "a round deep pine-green Japanese hanko seal stamp, calm soft-brush ink texture, circular mark, isolated centered on plain cream washi background, used as a UI button accent, blank inside, no text, no logo, no watermark" },
  { name: "howto-scroll", size: "1024x1536", prompt: "an old Japanese rolled paper scroll makimono, partially unrolled vertically with wooden rollers, aged washi paper texture, delicate sumi ink decorative border, large empty writing area in the middle, plain soft background, no text, no logo, no watermark" },
  { name: "rank-seal", size: "1024x1024", prompt: "an ornate circular Japanese award seal medallion, gold leaf and vermilion red, brush ink and gold accents, decorative rim, plain soft background, game rank badge, blank center, no text, no logo, no watermark" },
];

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

for (const j of jobs) {
  const out = `public/images/${j.name}.png`;
  if (await exists(out)) { console.log(`SKIP ${out}`); continue; }
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
