require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

/**
 * Migration script to seed/update class content in Supabase.
 *
 * HOW TO USE:
 *   1. Make sure your .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 *      (or SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)
 *   2. The `classes` table must already have rows for class 1-6.
 *      If classes 4-6 don't exist yet, the script will INSERT them.
 *   3. Run: node scripts/migrateClassContent.js
 *
 * This script matches classes by order (ASC id) and updates `levels_data`.
 */

async function migrate() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  // Use Service Role Key (bypasses RLS) for admin operations, fallback to anon key
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key. Please check your .env file.');
    console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // ── Step 1: Fetch existing classes to get their UUIDs ──
  console.log('Fetching existing classes from Supabase...\n');
  const { data: existingClasses, error: fetchError } = await supabase
    .from('classes')
    .select('id, title')
    .order('created_at', { ascending: true });

  if (fetchError) {
    console.error('Failed to fetch classes:', fetchError.message);
    process.exit(1);
  }

  console.log(`Found ${existingClasses.length} existing class(es) in Supabase.`);
  existingClasses.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.title} (${c.id})`);
  });

  // ── Step 2: Define class content metadata ──
  const classMeta = {
    4: { title: 'Keuangan Syariah: Prinsip, Produk & Zakat', level: 'Beginner', description: 'Pelajari prinsip muamalah, produk perbankan syariah, dan zakat' },
    5: { title: 'Smart Spending Habits untuk Remaja', level: 'Beginner', description: 'Bangun kebiasaan uang yang sehat sejak dini' },
    6: { title: 'Digital Finance & Fintech', level: 'Intermediate', description: 'Bank digital, crypto, P2P lending & perlindungan konsumen' },
  };

  // ── Step 3: Insert missing classes 4-6 if needed ──
  const classNames = ['Financial Foundation', 'Investasi', 'Wealth', 'Syariah', 'Spending', 'Digital'];

  for (const [num, meta] of Object.entries(classMeta)) {
    const classNum = parseInt(num);
    // Check if this class already exists (by position)
    if (classNum <= existingClasses.length) continue;

    console.log(`\nInserting new class ${classNum}: ${meta.title}...`);
    const { data: inserted, error: insertError } = await supabase
      .from('classes')
      .insert({
        title: meta.title,
        description: meta.description,
        level: meta.level,
        chapters_count: 4,
      })
      .select('id, title')
      .single();

    if (insertError) {
      console.error(`  ✗ Failed to insert class ${classNum}:`, insertError.message);
    } else {
      console.log(`  ✓ Inserted class ${classNum}: ${inserted.title} (${inserted.id})`);
      existingClasses.push(inserted);
    }
  }

  // Re-fetch to get all UUIDs in order
  const { data: allClasses } = await supabase
    .from('classes')
    .select('id, title')
    .order('created_at', { ascending: true });

  console.log(`\nTotal classes in Supabase: ${allClasses.length}\n`);

  // ── Step 4: Load JSON data for all classes ──
  for (let i = 0; i < allClasses.length; i++) {
    const classNum = i + 1;
    const cls = allClasses[i];
    const jsonPath = path.join(__dirname, `../client/class${classNum}.json`);

    if (!fs.existsSync(jsonPath)) {
      console.warn(`⚠ class${classNum}.json not found. Skipping "${cls.title}".`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`Updating class ${classNum} "${cls.title}" (${cls.id})...`);

    const { error } = await supabase
      .from('classes')
      .update({ levels_data: data })
      .eq('id', cls.id);

    if (error) {
      console.error(`  ✗ Error: ${error.message}`);
    } else {
      console.log(`  ✓ Updated successfully (${data.length} levels, ${countQuizzes(data)} quizzes)`);
    }
  }

  console.log('\n✅ Migration complete!');
}

function countQuizzes(levels) {
  let total = 0;
  for (const level of levels) {
    if (level.finalQuiz?.questions) total += level.finalQuiz.questions.length;
    if (level.items) {
      for (const item of level.items) {
        if (item.type === 'in-lesson-quiz' && item.questions) total += item.questions.length;
        if (item.quiz?.questions) total += item.quiz.questions.length;
      }
    }
  }
  return total;
}

migrate();
