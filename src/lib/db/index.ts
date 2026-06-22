import { hasSupabaseConfig } from './supabase-client';
import { supabaseDbClient } from './supabase-db-client';
import { localStorageClient } from './local-storage-client';

// Detect whether we should use Supabase Mode or Demo Mode (LocalStorage fallback)
export const isSupabaseMode = hasSupabaseConfig();
export const isSupabaseConfigured = isSupabaseMode;

console.log("[DB MODE]", isSupabaseConfigured ? "SUPABASE" : "DEMO");
console.log("[SUPABASE URL EXISTS]", !!process.env.NEXT_PUBLIC_SUPABASE_URL);

export const db = isSupabaseMode ? supabaseDbClient : localStorageClient;
export default db;
export * from './types';
