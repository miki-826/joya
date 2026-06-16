export type Judgement = "煩悩" | "無漏";

export type Card = {
  text: string;
  type: Judgement;
  reason?: string;
};

export type GamePhase = "title" | "howto" | "loading" | "playing" | "result";

export type Mistake = {
  text: string;
  type: Judgement;
  yours: Judgement;
  reason: string;
};

export type GameResult = {
  cards: Card[];
  answers: (Judgement | null)[];
  correct: number;
  wrong: number;
  total: number;
  score: number;
  rank: string;
  title: string;
  comment: string;
  mistakes: Mistake[];
};
