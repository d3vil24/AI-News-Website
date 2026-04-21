import { createClient } from "@supabase/supabase-js";
import { env, assertServerEnv } from "@/lib/env";

export function getSupabaseAdmin() {
  assertServerEnv();

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}