// 生成済みPNGの「外側の無地背景」を端からの塗りつぶしで透過化する。
// 被写体内部の明るい部分（顔・雪・ハイライト）は端と繋がらないため保持される。
import { readFile, writeFile } from "node:fs/promises";
import { PNG } from "pngjs";

// 引数: [target] [TOL] [TOL2]
// 例) 全件: node remove-bg.mjs
//     住職のみ慎重に: node remove-bg.mjs monk 26 52
const [, , argTarget, argTol, argTol2] = process.argv;
const TARGETS = argTarget
  ? [argTarget]
  : ["monk", "mokufuda", "bell", "bonnou-stamp", "muro-stamp", "rank-seal"];
const TOL = argTol ? Number(argTol) : 58; // ここ未満は完全に背景
const TOL2 = argTol2 ? Number(argTol2) : 125; // ここ以上は被写体。間はフェザー

function dist(d, i, r, g, b) {
  const dr = d[i] - r,
    dg = d[i + 1] - g,
    db = d[i + 2] - b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function processOne(name) {
  const path = `public/images/${name}.png`;
  const png = PNG.sync.read(await readFile(path));
  const { width: w, height: h, data: d } = png;

  // 背景基準色 = 四隅10x10の平均
  let rs = 0,
    gs = 0,
    bs = 0,
    cnt = 0;
  const corners = [
    [0, 0],
    [w - 10, 0],
    [0, h - 10],
    [w - 10, h - 10],
  ];
  for (const [cx, cy] of corners) {
    for (let y = cy; y < cy + 10; y++)
      for (let x = cx; x < cx + 10; x++) {
        const i = (y * w + x) * 4;
        rs += d[i];
        gs += d[i + 1];
        bs += d[i + 2];
        cnt++;
      }
  }
  const r = rs / cnt,
    g = gs / cnt,
    b = bs / cnt;

  // 端から幅優先で背景領域を塗りつぶす
  const visited = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (visited[p]) return;
    visited[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    const i = p * 4;
    const dd = dist(d, i, r, g, b);
    if (dd >= TOL2) continue; // 被写体に到達したので伝播しない
    if (dd < TOL) {
      d[i + 3] = 0;
    } else {
      d[i + 3] = Math.round(((dd - TOL) / (TOL2 - TOL)) * 255);
    }
    cleared++;
    const x = p % w,
      y = (p - x) / w;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  await writeFile(path, PNG.sync.write(png));
  console.log(`OK   ${path} — cleared ${cleared}px (bg≈${r | 0},${g | 0},${b | 0})`);
}

for (const t of TARGETS) {
  try {
    await processOne(t);
  } catch (e) {
    console.error(`FAIL ${t}: ${e.message}`);
  }
}
console.log("ALL DONE");
