# 鳴らせ！除夜の鐘！ — Why That Bell?

煩悩か、無漏（むろ）か？ AIが混ぜた“煩悩札”を見極め、鐘を鳴らせ！
大晦日の鐘楼を舞台にした、和風書道テイストのAI判別ゲームです。

次々に現れる木札（煩悩 or 無漏）を、右（煩悩＝鐘を鳴らす）か左（無漏）に
スワイプ／ボタンで振り分け、100秒で正答数を競います。結果画面では
AI住職が分析コメントと間違えた札の解説を授けてくれます。

## 特徴

- **APIキー・DBが無くても1プレイ完結**（Mock Mode + LocalStorage フォールバック）
- `OPENAI_API_KEY` があれば、札・解説・住職コメントを **AIが毎回生成**
- 効果音（除夜の鐘・正解・不正解）は WebAudio で合成（音源ファイル不要）
- 全画面がAI生成の和風書道テイスト画像（背景・住職・木札・朱印・ランク印）

## 技術スタック

Next.js (App Router) / TypeScript / Tailwind CSS v4 / OpenAI API（任意）/ Supabase（任意）/ LocalStorage

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
```

> 日本語を含むパスでは Turbopack が panic するため、`dev`/`build` は `--webpack` で実行しています。

### 環境変数（すべて任意・未設定でも動作）

`.env.example` を参照。`OPENAI_API_KEY` はサーバー側のみで使用し、クライアントには渡しません。

| 変数 | 用途 | 未設定時 |
|---|---|---|
| `OPENAI_API_KEY` | 札生成・解説・住職コメント | 固定札のMock出題 |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | スコア履歴の保存 | LocalStorageに保存 |

### 画像の再生成（任意・課金注意）

```bash
node gen-all.mjs   # OPENAI_API_KEY を使い public/images/ に10枚生成（既存はスキップ）
```

## デプロイ（Vercel）

1. このリポジトリを Vercel で Import（Next.js 自動検出）。
2. 必要なら Environment Variables に `OPENAI_API_KEY` / `NEXT_PUBLIC_SUPABASE_*` を設定。
3. Supabase を使う場合は `supabase.sql` を SQL Editor で実行（RLSポリシー込み）。

## 遊び方

1. AI住職が煩悩（欲・執着・怒り）と無漏（無私・善行）の札を混ぜて出題。
2. 煩悩だと思えば右、無漏だと思えば左へ振り分け。
3. 100秒で勝負。正答率でランク（S/A/B/C/D）と称号が決定。
