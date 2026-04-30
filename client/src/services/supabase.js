import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log("URL:", supabaseUrl)
console.log("KEY:", supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  console.error("ENV ERROR:", import.meta.env)
  throw new Error("Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.")
}

export const supabase = createClient(supabaseUrl, supabaseKey)