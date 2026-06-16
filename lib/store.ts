"use client";
import type { GameResult } from "@/types/game";
import { HAS_SUPABASE, supabase } from "./supabase";

const LS_KEY = "joya:lastSession";

export async function saveResult(result: GameResult): Promise<void> {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(result));
  } catch {
    /* ignore quota */
  }
  if (HAS_SUPABASE && supabase) {
    try {
      await supabase.from("game_sessions").insert({
        score: result.score,
        rank: result.rank,
        answers: result.answers,
        mistakes: result.mistakes,
        comment: result.comment,
        finished_at: new Date().toISOString(),
      });
    } catch {
      /* フォールバック: LocalStorage は保存済み */
    }
  }
}

export function loadLastResult(): GameResult | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as GameResult) : null;
  } catch {
    return null;
  }
}
