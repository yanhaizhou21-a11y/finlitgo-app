require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

/**
 * Migration script to seed/update class content in Supabase.
 *
 * HOW TO USE:
 *   1. Make sure your .env has SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   2. First, INSERT the new classes (4, 5, 6) manually in Supabase dashboard
 *      (Table Editor → classes → Add row with title/description/level)
 *   3. Then run: node scripts/migrateClassContent.js
 *
 * This script updates the `levels_data` column for each class.
 * Classes 1-3: Uses data from classContent.js (via dynamic import)
 * Classes 4-6: Uses data from JSON files (class4.json, class5.json, class6.json)
 */

async function migrate() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key. Please check your .env file.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // ── Classes 1-3: Load from classContent.js (ES module) ──
    console.log('Loading classes 1-3 from classContent.js...');
    const classContentPath = path.join(__dirname, '../client/src/data/classContent.js');
    const fileUrl = 'file:///' + classContentPath.replace(/\\/g, '/');

    try {
      const { CLASS_LEVELS } = await import(fileUrl);
      console.log('Successfully loaded CLASS_LEVELS from classContent.js.');

      for (const classId of [1, 2, 3]) {
        const levelsData = CLASS_LEVELS[classId];
        if (!levelsData) {
          console.warn(`No data found for class ${classId}. Skipping.`);
          continue;
        }

        console.log(`Updating class ${classId}...`);
        const { error } = await supabase
          .from('classes')
          .update({ levels_data: levelsData })
          .eq('id', classId);

        if (error) {
          console.error(`Error updating class ${classId}:`, error.message);
        } else {
          console.log(`✓ Class ${classId} updated successfully.`);
        }
      }
    } catch (importErr) {
      console.warn('Could not import classContent.js (ES module issue). Trying JSON fallback...');
      console.warn('Error:', importErr.message);

      // Fallback: Try loading from JSON files for classes 1-3
      for (const classId of [1, 2, 3]) {
        const jsonPath = path.join(__dirname, `../client/class${classId}.json`);
        if (fs.existsSync(jsonPath)) {
          const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          console.log(`Updating class ${classId} from JSON...`);
          const { error } = await supabase
            .from('classes')
            .update({ levels_data: data })
            .eq('id', classId);

          if (error) {
            console.error(`Error updating class ${classId}:`, error.message);
          } else {
            console.log(`✓ Class ${classId} updated from JSON.`);
          }
        } else {
          console.warn(`No JSON file for class ${classId}. Skipping.`);
        }
      }
    }

    // ── Classes 4-6: Load from JSON files directly ──
    console.log('\nLoading classes 4-6 from JSON files...');
    for (const classId of [4, 5, 6]) {
      const jsonPath = path.join(__dirname, `../client/class${classId}.json`);
      if (!fs.existsSync(jsonPath)) {
        console.warn(`class${classId}.json not found. Skipping.`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      console.log(`Updating class ${classId}...`);

      const { error } = await supabase
        .from('classes')
        .update({ levels_data: data })
        .eq('id', classId);

      if (error) {
        console.error(`Error updating class ${classId}:`, error.message);
        console.log('  → If class does not exist yet, insert it first in Supabase dashboard.');
      } else {
        console.log(`✓ Class ${classId} updated successfully.`);
      }
    }

    console.log('\n✅ Migration complete.');
  } catch (err) {
    console.error('Failed during migration:', err);
  }
}

migrate();
