/**
 * Streak Management Utility
 * - 1 streak per day max
 * - Streak starts when user studies a module (completes a chapter/quiz)
 * - Consecutive days = streak count
 * - Missing a day resets the streak
 * - Syncs with Supabase users table
 */

import { supabase } from '../services/supabase';

const STREAK_KEY = 'finlitgo_streak';

function getStreakData() {
  const saved = localStorage.getItem(STREAK_KEY);
  if (saved) return JSON.parse(saved);
  return { count: 0, lastStudyDate: null, history: [] };
}

function saveStreakData(data) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function getToday() {
  return new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

/**
 * Sync streak count to Supabase users table (fire-and-forget).
 */
async function syncStreakToSupabase(count) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      await supabase
        .from('users')
        .update({ streak_count: count })
        .eq('id', session.user.id);
    }
  } catch (err) {
    console.warn('Streak sync failed:', err);
  }
}

/**
 * Call this when user completes a study action (reads chapter, completes quiz).
 * Returns the updated streak count.
 */
export function recordStudyActivity() {
  const data = getStreakData();
  const today = getToday();
  const yesterday = getYesterday();

  // Already studied today — no change
  if (data.lastStudyDate === today) {
    return data.count;
  }

  // Studied yesterday — continue streak
  if (data.lastStudyDate === yesterday) {
    data.count += 1;
  } 
  // First time or missed days — start fresh
  else if (data.lastStudyDate !== today) {
    data.count = 1;
  }

  data.lastStudyDate = today;
  if (!data.history.includes(today)) {
    data.history.push(today);
  }

  // Keep only last 90 days of history
  if (data.history.length > 90) {
    data.history = data.history.slice(-90);
  }

  saveStreakData(data);

  // Sync to Supabase (fire-and-forget)
  syncStreakToSupabase(data.count);

  return data.count;
}

/**
 * Get current streak count (validates against today/yesterday).
 */
export function getCurrentStreak() {
  const data = getStreakData();
  const today = getToday();
  const yesterday = getYesterday();

  // If last study was today or yesterday, streak is valid
  if (data.lastStudyDate === today || data.lastStudyDate === yesterday) {
    return data.count;
  }

  // Streak broken — reset
  if (data.count > 0) {
    data.count = 0;
    saveStreakData(data);
    syncStreakToSupabase(0);
  }
  return 0;
}

/**
 * Check if user already studied today.
 */
export function hasStudiedToday() {
  const data = getStreakData();
  return data.lastStudyDate === getToday();
}

/**
 * Get last 7 days streak status (for weekly display).
 * Returns array of { date, active } for last 7 days.
 */
export function getWeeklyStreak() {
  const data = getStreakData();
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      active: data.history.includes(dateStr),
    });
  }
  return result;
}
