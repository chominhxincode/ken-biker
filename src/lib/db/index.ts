import { hasSupabaseConfig } from './supabase-client';
import { supabaseDbClient } from './supabase-db-client';
import { localStorageClient } from './local-storage-client';

// Detect whether we should use Supabase Mode or Demo Mode (LocalStorage fallback)
export const isSupabaseMode = hasSupabaseConfig();

console.log(`[Database Client] Initialized in ${isSupabaseMode ? 'SUPABASE' : 'DEMO (LocalStorage)'} Mode.`);

export const db = isSupabaseMode ? supabaseDbClient : localStorageClient;
export default db;
export * from './types';
