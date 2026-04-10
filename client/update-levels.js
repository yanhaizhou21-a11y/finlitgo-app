import { createClient } from '@supabase/supabase-js';
import { CLASS_META } from './src/data/classContent.js';

const supabaseUrl = 'https://yirspbddrvnpdtvstxms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcnNwYmRkcnZucGR0dnN0eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MjY1ODAsImV4cCI6MjA5MTAwMjU4MH0.vvQwao66vZ3TYM41pCWrK2LUTSRuwujq1H17hmexi-Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLevels() {
  console.log('Memulai proses update kolom levels_data di tabel classes...');
  
  for (const [key, classData] of Object.entries(CLASS_META)) {
    const { id, levels } = classData;

    console.log(`Mengupdate kelas ID ${id}...`);
    
    // Kita gunakan .update() agar tidak merusak kolom lain (seperti thumbnail_url dll)
    const { data, error } = await supabase
      .from('classes')
      .update({ levels_data: levels })
      .eq('id', id);

    if (error) {
      console.error(`❌ Gagal mengupdate kelas ${id}:`, error.message);
    } else {
      console.log(`✅ Berhasil mengupdate kelas ${id}!`);
    }
  }
  console.log('Proses update selesai!');
}

updateLevels();
