# 鳴らせ！除夜の鐘！ — main.md

## 0. プロジェクト基本情報

| 項目               | 内容                                                                                  |
|--------------------|---------------------------------------------------------------------------------------|
| アプリ名           | 鳴らせ！除夜の鐘！                                                                   |
| 英語名             | Why That Bell?                                                                        |
| ジャンル           | AI判定型カジュアル判別ゲーム（煩悩 or 無漏）                                         |
| 想定プレイ時間     | 1分〜2分（100秒制限）                                                                 |
| 開発目的           | AIハッカソン向けの、AI生成×和風エンタメMVP                                            |
| GitHub Repository  | https://github.com/miki-826/joya.git                                                            |
| デプロイ予定       | Vercel                                                                                |
| 使用技術           | Next.js / TypeScript / Tailwind CSS / OpenAI API / Supabase(任意) / LocalStorage      |
| 最優先方針         | 3時間で動くMVP・Mock Mode必須・APIキーなしで動作・45秒以内にコア体験到達              |

---

## 1. 一言コンセプト

煩悩か、無漏（むろ）か？  
AIが混ぜた“煩悩札”を見極め、鐘を鳴らせ！

---

## 2. アプリ概要

「鳴らせ！除夜の鐘！」は、ユーザーが次々に表示される“煩悩”または“無漏”の札（短文・シチュエーション）を、右（煩悩）か左（無漏）に振り分けていく判別ゲームです。  
AIは毎回、煩悩リストに数枚の“煩悩でないもの”を混ぜて出題。ユーザーは直感と知識で判別し、鐘を鳴らす（煩悩）か、鳴らさない（無漏）かを選びます。  
ゲーム終了後、正解数・失敗数・AIによる分析コメント・間違えた札の解説が表示されます。

ハッカソン向けに、APIキーやDB未設定でもMock Modeで1プレイ完結可能です。

---

## 3. コア体験

タイトル画面  
↓  
住職AIキャラがルール説明  
↓  
AIが煩悩＆無漏札リストを生成  
↓  
1枚ずつ札が表示され、ユーザーが右（煩悩）or左（無漏）に振り分け  
↓  
鐘音やエフェクトでフィードバック  
↓  
100秒経過 or 札が尽きたら結果画面  
↓  
正解数・失敗数・AIコメント・間違い解説を表示

---

## 4. MVP必須機能

| 優先度 | 内容                                 |
|--------|--------------------------------------|
| 高     | タイトル画面                        |
| 高     | 遊び方（ルール説明）画面            |
| 高     | メイン体験画面（札スワイプUI）      |
| 高     | ユーザー入力（右/左判定）           |
| 高     | AI応答またはMock判定                 |
| 高     | 結果画面                            |
| 高     | Mock Mode                           |
| 高     | LocalStorage保存                     |
| 高     | レスポンシブ対応                    |

---

## 5. 後回しにする機能

- ログイン
- ランキング
- SNS共有
- 複雑なDB
- 課金
- 管理画面
- 詳細なユーザー設定

---

## 6. 画面一覧

| 画面名           | パス例         | 内容                                                         |
|------------------|---------------|--------------------------------------------------------------|
| タイトル         | `/`           | ゲームタイトル・開始ボタン・BGM/ヘルプボタン                 |
| 遊び方           | `/howto`      | 住職AIキャラがルール説明                                     |
| メインゲーム     | `/game`       | 札スワイプUI・残り時間・鐘エフェクト                         |
| 結果             | `/result`     | 正解数・失敗数・AI分析・間違い一覧・もう一度ボタン           |

※SPAで状態切り替えでもOK

---

## 7. UIデザイン方針

- テーマ：和風・除夜の鐘・木札・書道
- キーワード：寺院、鐘、木の板、住職、札
- 見た目：木目調背景、書道風フォント、札は将棋の駒風
- UI演出：鐘音・札スライド・エフェクト
- 読みやすさ：書道フォントは太すぎず、札の文字は大きめ

---

## 8. カラーパレット

| 用途           | HEX        |
|----------------|------------|
| 背景           | #F7F3E9    |
| パネル背景     | #F5E0B7    |
| メイン文字     | #2D1B00    |
| サブ文字       | #6B4F1D    |
| アクセント     | #C19A6B    |
| 警告色         | #E4572E    |
| 成功色         | #4CB944    |
| 境界線         | #BFA77A    |
| ボタン背景     | #E6C48B    |
| ボタンHover    | #D9B77C    |

---

## 9. 主要UI文言

```text
タイトル: 鳴らせ！除夜の鐘！
サブコピー: AI住職が出す煩悩札、君は見抜けるか？
ゲーム開始: ゲームを始める
遊び方: 遊び方
もう一度: もう一度遊ぶ
ヘルプ: ？
BGM: BGM
右スワイプ: 煩悩
左スワイプ: 無漏
結果: 結果発表
```

---

## 10. 遊び方テキスト

```text
AI住職が煩悩と無漏（煩悩でないもの）を混ぜた札を出します。
札を見て、煩悩だと思ったら右に、無漏だと思ったら左にスワイプ！
鐘の音とともに、どれだけ見抜けるか挑戦しよう！
```

---

## 11. ゲーム画面レイアウト

### PC

```
+------------------------------------------------------+
| [タイトル][BGM][ヘルプ]                             |
|                                                      |
|        [住職AIイラスト]                              |
|                                                      |
|    ┌───────────────┐                                 |
|    │   札の内容（大きな文字） │                      |
|    └───────────────┘                                 |
|                                                      |
|   ← 無漏          残り時間: 99秒         煩悩 →     |
|                                                      |
| [スワイプ/ボタンUI]                                  |
+------------------------------------------------------+
```

### スマホ

```
+--------------------------+
| [タイトル] [BGM] [？]    |
|                          |
|  [住職AI]                |
|  ┌────────────┐         |
|  │ 札の内容   │          |
|  └────────────┘         |
| ←無漏      残り:99秒   煩悩→ |
| [スワイプ/ボタン]         |
+--------------------------+
```

---

## 12. 結果画面レイアウト

- 正解数
- 失敗数
- AI分析コメント
- 間違えた札の一覧（ページ分割可）
- 間違えた札の解説
- 今回の一言（AIからの知識）
- もう一度遊ぶボタン

---

## 13. 評価・スコア・ランク設計

- 正解数（煩悩/無漏の判定正答数）
- 失敗数
- スコア（正解数×10点）
- ランク（正答率でS/A/B/C/D）
    - S: 95%以上
    - A: 85%以上
    - B: 70%以上
    - C: 50%以上
    - D: それ未満
- AI称号（例：「煩悩マスター」「無漏見習い」など）

---

## 14. Mock Mode要件

**Mock Modeに切り替える条件：**
- OPENAI_API_KEY未設定
- Supabase未設定
- APIエラー/画像生成失敗
- JSON parse失敗
- Vercel本番で環境変数未設定

**Mock Modeでやること：**
- 固定の煩悩/無漏札リストを表示
- 判定も固定ロジック
- 結果画面まで進行
- LocalStorageに履歴保存
- 画像/BGM未生成時はプレースホルダ

---

## 15. Mock正解データ

```json
{
  "id": "mock-session-001",
  "title": "鳴らせ！除夜の鐘！",
  "cards": [
    { "text": "他人の成功を羨ましく思う", "type": "煩悩" },
    { "text": "困っている人を助ける", "type": "無漏" },
    { "text": "美味しいものを食べたいと願う", "type": "煩悩" },
    { "text": "自分の利益のために嘘をつく", "type": "煩悩" },
    { "text": "友人に親切にする", "type": "無漏" }
  ],
  "answer": ["煩悩", "無漏", "煩悩", "煩悩", "無漏"],
  "explanation": [
    "他人の成功を羨むのは煩悩です。",
    "困っている人を助けるのは無漏です。",
    "食欲も煩悩の一つです。",
    "自己中心的な嘘は煩悩です。",
    "無償の親切は無漏です。"
  ]
}
```

---

## 16. Mock判定ロジック

- ユーザーの選択がMockデータのtypeと一致すれば正解
- 正解数をカウント
- 正答率でランク算出

---

## 17. OpenAI API使用箇所

| 用途           | 内容                             |
|----------------|----------------------------------|
| 札リスト生成   | 煩悩/無漏の短文をランダム生成    |
| 解説生成       | 各札の意味や解説                 |
| AIコメント     | 結果画面での分析・一言           |

---

## 18. API設計

### 1. POST `/api/game/start`
- **Request:** `{ "mode": "ai" | "mock" }`
- **Response:** `{ "cards": [ { "text": string, "type": "煩悩"|"無漏" } ] }`
- **注意:** Mock時は固定データ返却

### 2. POST `/api/game/answer`
- **Request:** `{ "sessionId": string, "answers": string[] }`
- **Response:** `{ "score": number, "rank": string, "mistakes": [ { "text": string, "type": string, "explanation": string } ], "comment": string }`
- **注意:** Mock時はローカル判定

---

## 19. OpenAI用プロンプト

### 札生成プロンプト
```
あなたは煩悩と無漏（煩悩でないもの）の短いシチュエーション文を生成するAIです。
煩悩: 人間の欲望や執着を表す行動や感情
無漏: 無私・善行・欲望に基づかない行動
煩悩5枚、無漏2枚を混ぜて、以下のJSON形式で出力してください。
出力は必ずJSONのみ。Markdownは禁止。

{
  "cards": [
    { "text": "...", "type": "煩悩" },
    { "text": "...", "type": "無漏" },
    ...
  ]
}
```

### 解説生成プロンプト
```
以下の札について、それぞれ煩悩か無漏かを判定し、簡単な理由をJSONで出力してください。
出力は必ずJSONのみ。Markdownは禁止。

{
  "explanations": [
    { "text": "...", "type": "...", "reason": "..." }
  ]
}
```

### 結果コメント生成プロンプト
```
ユーザーの正解数、失敗数、間違えた札リストをもとに、短い分析コメントを日本語で1文生成してください。
出力は必ずJSONのみ。Markdownは禁止。

{ "comment": "..." }
```

---

## 20. Supabase設計

Supabaseは任意。接続時のみ記録。

```sql
create table game_sessions (
  id uuid primary key default uuid_generate_v4(),
  started_at timestamp default now(),
  finished_at timestamp,
  score integer,
  rank text,
  answers jsonb,
  mistakes jsonb,
  comment text
);
```

---

## 21. LocalStorage設計

```json
{
  "lastSession": {
    "cards": [ { "text": "...", "type": "..." } ],
    "answers": [ "煩悩", "無漏", ... ],
    "score": 40,
    "rank": "A",
    "mistakes": [ { "text": "...", "type": "...", "explanation": "..." } ],
    "comment": "..."
  }
}
```

---

## 22. 状態管理

```ts
type GamePhase =
  | "title"
  | "howto"
  | "loading"
  | "playing"
  | "result";

type Card = {
  text: string;
  type: "煩悩" | "無漏";
};

type GameState = {
  phase: GamePhase;
  cards: Card[];
  currentIndex: number;
  answers: ("煩悩" | "無漏" | null)[];
  startTime: number;
  endTime: number;
  score: number;
  rank: string;
  mistakes: Card[];
  comment: string;
};
```

---

## 23. 画像生成指定

| 用途                 | 保存先                     | サイズ      | 形式   | 優先度 | プロンプト                                                                                   |
|----------------------|----------------------------|-------------|--------|--------|---------------------------------------------------------------------------------------------|
| タイトル背景         | public/images/title-bg.png | 1200x800    | png    | 高     | "Japanese temple at night, big bell, festive, wood texture, web game background, no text, no logo" |
| ゲーム背景           | public/images/game-bg.png  | 1200x800    | png    | 高     | "Zen temple, wooden interior, calm, web game background, no text, no logo"                  |
| 結果背景             | public/images/result-bg.png| 1200x800    | png    | 中     | "Japanese calligraphy scroll, festive, web game background, no text, no logo"               |
| 住職AIキャラ         | public/images/monk.png     | 512x512     | png    | 高     | "Cute Japanese Buddhist monk, cartoon, smiling, web game character, no text, no logo"       |
| 札（木札イメージ）   | public/images/card.png     | 300x400     | png    | 高     | "Wooden plaque, shogi piece style, blank, web game item, no text, no logo"                  |
| 鐘エフェクト         | public/images/bell.png     | 128x128     | png    | 中     | "Japanese temple bell, icon, web game effect, no text, no logo"                             |

---

## 24. BGM・音声素材

- BGM: `public/audio/bgm.mp3`（1分〜100秒の和風BGM、なければ無音）
- 鐘音: `public/audio/bell.mp3`
- 正解: `public/audio/correct.mp3`
- 不正解: `public/audio/wrong.mp3`

---

## 25. 動画素材

- 動画は任意。なければ結果画面のみ表示。
- 配置例: `public/video/correct.mp4`, `public/video/wrong.mp4`

---

## 26. エラー処理

| ケース                 | 処理内容                                              |
|------------------------|------------------------------------------------------|
| OpenAI APIキーなし     | Mock Modeで固定データ                                |
| OpenAI API失敗         | Mock Modeに自動切替                                  |
| Supabase未接続         | LocalStorage保存にフォールバック                      |
| 画像未生成             | CSS背景/プレースホルダ画像で代用                     |
| BGMなし                | 無音で進行                                           |
| 動画なし               | 結果画面のみ表示                                     |
| JSON parse失敗         | Mock Modeで進行                                      |

---

## 27. セキュリティ要件

- OPENAI_API_KEYはサーバー側のみ
- クライアントにAPIキーを渡さない
- .env*をGitに含めない
- Supabase service_roleキーをクライアントで使わない
- 正解情報を不要なタイミングでフロントに返さない
- 入力文字数制限を行う

---

## 28. 環境変数

未設定でもMock Modeで動作

```env
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 29. package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "gen:image": "node gen-image.mjs"
  }
}
```

---

## 30. ディレクトリ構成

```
/app
  /components
  /api
    /game
      start.ts
      answer.ts
  /images
    title-bg.png
    game-bg.png
    result-bg.png
    monk.png
    card.png
    bell.png
  /audio
    bgm.mp3
    bell.mp3
    correct.mp3
    wrong.mp3
  /video
    correct.mp4
    wrong.mp4
/public
  /images
  /audio
  /video
/gen-image.mjs
/types
  game.ts
```

---

## 31. 実装時の重要ルール

- まずMock Modeで完成させる
- APIキーなしでビルド成功させる
- Supabaseなしで1プレイ完結させる
- 画像がなくてもUIが壊れない
- npm run build を最優先
- 45秒以内にゲーム開始
- 正解情報をフロントに不要に持たせない

---

## 32. 3時間ハッカソン想定の開発順

```
0:00〜0:30
- ディレクトリ/型/Mockデータ設計
- タイトル・遊び方・ゲーム画面の骨組み

0:30〜1:00
- 札スワイプUI・Mock判定ロジック
- 結果画面（Mockデータ）

1:00〜1:30
- LocalStorage保存
- レスポンシブ調整
- 画像・BGMプレースホルダ

1:30〜2:00
- APIルート（/api/game/start, /answer）Mock対応
- OpenAIプロンプト設計

2:00〜2:30
- 画像生成（gen-image.mjs）
- サウンド・鐘エフェクト

2:30〜3:00
- エラー処理・Mock Mode自動切替
- 発表用デモ調整・最終テスト
```

---

## 33. 発表用説明文

「鳴らせ！除夜の鐘！」は、AIが生成した“煩悩”と“無漏”の札を、ユーザーが直感で振り分ける和風判別ゲームです。  
AIは毎回違う札を用意し、ユーザーは鐘を鳴らしながら判定。  
結果画面ではAIによる分析や解説も楽しめます。  
APIキーやDB未設定でもMock Modeで必ず動作し、Vercelデプロイも安心です！

---

## 34. 受け入れ条件

- [ ] npm run build が成功する
- [ ] APIキーなしで動く
- [ ] 札の判定（右/左）ができる
- [ ] 結果表示できる
- [ ] スマホで崩れない
- [ ] GitHubにpushできる
- [ ] Vercelで表示できる
- [ ] 45秒以内にコア体験へ入れる

---

## 35. 最終ゴール

審査員がURLを開くと、和風のタイトル画面からすぐにゲームを開始でき、AIまたはMockの“煩悩札”を右左に振り分け、鐘音やエフェクトとともに判定。  
100秒後に正解数・失敗数・AIコメント・解説が表示される、1プレイ完結のWebアプリ体験ができること。

---