import { createClient } from '@supabase/supabase-js';

// Using dynamic getter to allow env vars to be loaded when server starts
function getSupabaseUrl() { return process.env.VITE_SUPABASE_URL || ''; }
function getSupabaseKey() { return process.env.VITE_SUPABASE_ANON_KEY || ''; }

// Global client for anonymous/public operations
// We create it lazily to avoid crashing on startup if env isn't loaded yet
let _supabase = null;
export const supabase = new Proxy({}, {
    get(target, prop) {
        if (!_supabase) {
            const url = getSupabaseUrl();
            const key = getSupabaseKey();
            if (!url || !key) {
                console.error("Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env");
            }
            _supabase = createClient(url || 'http://dummy.url', key || 'dummy_key');
        }
        return _supabase[prop];
    }
});

// Client tailored for the specific request (forwards the user's JWT so RLS works correctly)
export function getSupabaseClient(req) {
  const authHeader = req?.headers?.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  const options = token ? {
    global: {
      headers: { Authorization: `Bearer ${token}` }
    }
  } : {};

  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  if (!url || !key) {
      console.error("Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env");
  }

  return createClient(url || 'http://dummy.url', key || 'dummy_key', options);
}
