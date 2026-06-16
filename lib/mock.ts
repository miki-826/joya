import type { Card } from "@/types/game";

export const HAS_KEY =
  !!process.env.OPENAI_API_KEY &&
  process.env.OPENAI_API_KEY.startsWith("sk-");

const BONNOU: Card[] = [
  { text: "他人の成功を羨ましく思う", type: "煩悩", reason: "嫉妬は心を曇らせる煩悩の一つです。" },
  { text: "もっと美味しいものを食べたいと願う", type: "煩悩", reason: "飽くなき食欲（貪り）は代表的な煩悩です。" },
  { text: "自分の利益のために嘘をつく", type: "煩悩", reason: "自己中心的な欺きは煩悩から生じます。" },
  { text: "勝った相手を見下して優越感に浸る", type: "煩悩", reason: "慢心（おごり）は煩悩に数えられます。" },
  { text: "気に入らない相手に腹を立て続ける", type: "煩悩", reason: "怒り（瞋恚）は三毒の一つです。" },
  { text: "他人より良い暮らしを見せびらかしたい", type: "煩悩", reason: "見栄や執着は煩悩に根ざします。" },
  { text: "失敗を人のせいにして責める", type: "煩悩", reason: "責任転嫁は怒りと我執の煩悩です。" },
  { text: "なくしたお金が惜しくて眠れない", type: "煩悩", reason: "物への執着（慳貪）は煩悩です。" },
  { text: "若さや美しさをいつまでも保ちたいと焦る", type: "煩悩", reason: "若さへの執着も煩悩の一つです。" },
  { text: "他人の不幸をひそかに喜ぶ", type: "煩悩", reason: "他者の不幸を喜ぶ心は煩悩です。" },
  { text: "欲しい物をどうしても手に入れたいと執着する", type: "煩悩", reason: "渇愛（強い欲望）は煩悩の根本です。" },
  { text: "自分だけ得をしようと抜け駆けする", type: "煩悩", reason: "我利我欲は煩悩から生まれます。" },
];

const MURO: Card[] = [
  { text: "困っている人にそっと手を差し伸べる", type: "無漏", reason: "見返りを求めぬ慈悲は無漏の心です。" },
  { text: "友人の幸せを心から喜ぶ", type: "無漏", reason: "他者の幸福を喜ぶ（喜）は清らかな心です。" },
  { text: "静かに座って呼吸を整える", type: "無漏", reason: "心を鎮める行いは煩悩を離れた状態です。" },
  { text: "見返りを求めず席を譲る", type: "無漏", reason: "無償の親切は無漏の善行です。" },
  { text: "相手の過ちを穏やかに許す", type: "無漏", reason: "怒りを手放す赦しは無漏の心です。" },
  { text: "今あるものに感謝する", type: "無漏", reason: "足るを知る心は煩悩を離れます。" },
  { text: "迷っている人の話を黙って聴く", type: "無漏", reason: "思いやりの傾聴は慈悲の実践です。" },
  { text: "落ちているゴミを拾って片付ける", type: "無漏", reason: "見返りのない善行は無漏です。" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildMockCards(): Card[] {
  const b = shuffle(BONNOU).slice(0, 8);
  const m = shuffle(MURO).slice(0, 4);
  return shuffle([...b, ...m]);
}

export const MOCK_COMMENTS = [
  "煩悩の渦をよく見抜いた。心の鐘は澄んで響いておる。",
  "迷いも修行のうち。次はもっと深く心を見つめてみよ。",
  "見事な眼力。其方の心は既に静かなり。",
];
