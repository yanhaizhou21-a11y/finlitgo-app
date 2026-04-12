const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env");
}

// Global client for anonymous/public operations
const supabase = createClient(supabaseUrl, supabaseKey);

// Client tailored for the specific request (forwards the user's JWT so RLS works correctly)
function getSupabaseClient(req) {
  const authHeader = req?.headers?.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  const options = token ? {
    global: {
      headers: { Authorization: `Bearer ${token}` }
    }
  } : {};

  return createClient(supabaseUrl, supabaseKey, options);
}

module.exports = { supabase, getSupabaseClient };
