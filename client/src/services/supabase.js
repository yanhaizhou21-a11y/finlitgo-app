import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("ENV:", import.meta.env); // 🔥 penting
console.log("URL:", supabaseUrl);
console.log("KEY:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);