import { supabase } from './supabase';

export async function fetchClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select('*, class_chapters(*), class_quizzes(*)')
    .order('id', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function fetchClassById(id) {
  const { data, error } = await supabase
    .from('classes')
    .select('*, class_chapters(*), class_quizzes(*)')
    .eq('id', id)
    .single();
  if (error) throw error;

  if (data?.levels_data) {
    data.parsedLevels = typeof data.levels_data === 'string' ? JSON.parse(data.levels_data) : data.levels_data;
  }

  return data;
}

export async function createClass(payload) {
  const { data, error } = await supabase.from('classes').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateClass(id, payload) {
  const { data, error } = await supabase
    .from('classes')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteClass(id) {
  const { error } = await supabase.from('classes').delete().eq('id', id);
  if (error) throw error;
}

export async function createChapter(payload) {
  const { data, error } = await supabase.from('class_chapters').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateChapter(id, payload) {
  const { data, error } = await supabase.from('class_chapters').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteChapter(id) {
  const { error } = await supabase.from('class_chapters').delete().eq('id', id);
  if (error) throw error;
}

export async function createQuiz(payload) {
  const { data, error } = await supabase.from('class_quizzes').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateQuiz(id, payload) {
  const { data, error } = await supabase.from('class_quizzes').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteQuiz(id) {
  const { error } = await supabase.from('class_quizzes').delete().eq('id', id);
  if (error) throw error;
}

export async function submitQuizResult({ userId, classId, score, total }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;

  const { error: insertError } = await supabase.from('quiz_results').insert({
    user_id: userId,
    class_id: classId,
    score,
    total,
    percentage,
    passed,
  });
  if (insertError) throw insertError;

  // Points: 300 if score ≥ KKM (70) and every class_chapters row has progress (or no chapters row → legacy).
  // Otherwise: round(percentage × 3).
  let points = 0;
  if (score > 0) {
    const [{ data: chRows }, { data: progRows }] = await Promise.all([
      supabase.from('class_chapters').select('id').eq('class_id', classId),
      supabase.from('class_progress').select('chapter_id').eq('user_id', userId).eq('class_id', classId),
    ]);
    const need = chRows?.length ?? 0;
    const doneIds = new Set((progRows || []).map((r) => String(r.chapter_id)));
    const allChaptersDone =
      need === 0 ? true : chRows.every((ch) => doneIds.has(String(ch.id)));

    if (percentage >= 70 && allChaptersDone) points = 300;
    else points = Math.round(percentage * 3);

    const { error: rpcError } = await supabase.rpc('add_quiz_points', {
      p_user_id: userId,
      p_points: points,
    });
    if (rpcError) console.warn('Failed to add points:', rpcError);
  }

  return { percentage, passed, pointsAwarded: points };
}

export async function fetchUserQuizResults(userId) {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*, classes(title)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function markChapterComplete({ userId, classId, chapterId }) {
  const { error } = await supabase
    .from('class_progress')
    .upsert({ user_id: userId, class_id: classId, chapter_id: chapterId }, { onConflict: 'user_id,chapter_id' });
  if (error) throw error;
}

export async function fetchClassProgress(userId, classId) {
  const { data, error } = await supabase
    .from('class_progress')
    .select('chapter_id')
    .eq('user_id', userId)
    .eq('class_id', classId);
  if (error) throw error;
  return new Set((data || []).map((row) => row.chapter_id));
}
