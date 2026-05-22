require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// To run this script, we need the exported CLASS_LEVELS.
// Since classContent.js uses ES modules (export const), we will read it differently
// or simply use an import if we set type: module. But since this is a simple script,
// we'll run it as a commonjs script using a dynamic import or babel.
// The easiest way is to use a dynamic import.

async function migrate() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key. Please check your .env file.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Dynamically import the ES module
    const classContentPath = path.join(__dirname, '../client/src/data/classContent.js');
    // For Windows, we might need a file:// URL
    const fileUrl = 'file:///' + classContentPath.replace(/\\/g, '/');
    const { CLASS_LEVELS } = await import(fileUrl);

    console.log('Successfully loaded CLASS_LEVELS.');

    for (const classId of [1, 2, 3]) {
      const levelsData = CLASS_LEVELS[classId];
      if (!levelsData) {
        console.warn(`No data found for class ${classId}. Skipping.`);
        continue;
      }

      console.log(`Updating class ${classId}...`);

      const { data, error } = await supabase
        .from('classes')
        .update({ levels_data: levelsData })
        .eq('id', classId);

      if (error) {
        console.error(`Error updating class ${classId}:`, error.message);
      } else {
        console.log(`Successfully updated class ${classId}.`);
      }
    }

    console.log('Migration complete.');
  } catch (err) {
    console.error('Failed during migration:', err);
  }
}

migrate();
