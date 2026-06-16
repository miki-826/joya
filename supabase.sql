-- 鳴らせ！除夜の鐘！ — Supabase スキーマ（任意・加点）
-- Supabase の SQL Editor で実行する。未接続でも LocalStorage で動作する。

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz default now(),
  finished_at timestamptz,
  score integer,
  rank text,
  answers jsonb,
  mistakes jsonb,
  comment text
);

alter table game_sessions enable row level security;

-- ★ RLS有効化のみだと匿名 insert が全拒否される。匿名1プレイ用に明示許可する。
create policy "anon insert sessions" on game_sessions
  for insert to anon with check (true);
create policy "anon select sessions" on game_sessions
  for select to anon using (true);
