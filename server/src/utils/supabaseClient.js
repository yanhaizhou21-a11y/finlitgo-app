import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY  // ← ganti nama ini

console.log("URL:", supabaseUrl)
console.log("KEY:", supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  throw new Error("ENV SUPABASE TIDAK TERBACA")
}

export const supabase = createClient(supabaseUrl, supabaseKey)