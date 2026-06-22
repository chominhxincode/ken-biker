import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Export checker
export const hasSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl === '' || supabaseAnonKey === '') return false;
  if (supabaseUrl.includes('your-') || supabaseAnonKey.includes('your-')) return false;
  return true;
};

// Singleton instance
export const supabase = hasSupabaseConfig()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
