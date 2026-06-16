import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const HAS_SUPABASE = !!(url && key);
export const supabase = HAS_SUPABASE ? createClient(url!, key!) : null;
