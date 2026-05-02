import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconSchool } from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabase';
import { fetchClasses } from '../../services/classService';

export default function ClassProgressPage() {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) {
        setCourseProgress([]);
        setLoading(false);
        return;
      }

      try {
        const [classes, progressRes] = await Promise.all([
          fetchClasses(),
          supabase.from('class_progress').select('class_id, chapter_id').eq('user_id', user.id),
        ]);

        const progressRows = progressRes.error ? [] : (progressRes.data || []);

        // Also check localStorage for local progress
        const byClass = new Map();
        for (const row of progressRows) {
          byClass.set(row.class_id, (byClass.get(row.class_id) || 0) + 1);
        }

        const formattedProgress = (classes || []).map((cls) => {
          let totalItems = 1;
          if (cls.levels_data) {
            const parsed = typeof cls.levels_data === 'string' ? JSON.parse(cls.levels_data) : cls.levels_data;
            totalItems = parsed.reduce((acc, level) => acc + (level.items ? level.items.length : 0), 0);
          } else {
            totalItems = (cls.class_chapters || []).length || 1;
          }
          if (totalItems === 0) totalItems = 1;

          let completedCount = byClass.get(cls.id) || 0;

          // Merge local storage progress for this class if any
          try {
            const localKey = `finlitgo_progress_${user.id}_class_${cls.id}`;
            const localData = localStorage.getItem(localKey);
            if (localData) {
              const localSet = new Set(JSON.parse(localData));
              // Don't double count if we have local items but they aren't in DB yet
              // Assuming total local progress > DB progress
              if (localSet.size > completedCount) {
                completedCount = localSet.size;
              }
            }
          } catch(e) {
            console.error("Error reading local progress", e);
          }

          const progressPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));

          let status = 'Not Started';
          if (progressPercent === 100) status = 'Completed';
          else if (progressPercent > 0) status = 'In Progress';

          return {
            id: cls.id,
            title: cls.title,
            lesson: cls.category || 'General',
            status,
            progress: progressPercent,
            completedLessons: completedCount,
            lessons: totalItems,
          };
        });

        // Tampilkan hanya yang sudah dimulai atau semua kelas?
        // Lebih baik tampilkan kelas yang progress > 0
        setCourseProgress(formattedProgress.filter(c => c.progress > 0));
      } catch (err) {
        console.error('Failed to fetch class progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user?.id]);

  if (loading) {
    return <div className="text-zinc-400 text-center py-10">Loading progress...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">My Progress</h2>
        <p className="text-sm text-zinc-400">Your learning process and achievement.</p>
      </div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
      >
        <span className="text-lg">ℹ️</span>
        <span>This dashboard shows your real-time learning progress.</span>
      </motion.div>

      {/* Modules Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
              📚 Class Modules
            </h3>
            <p className="text-xs text-zinc-400">Your progress through each module in this class.</p>
          </div>
          <span className="text-xs text-zinc-500">Last updated: Apr 5, 2026</span>
        </div>

        <div className="space-y-4">
          {courseProgress.map((module, i) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.1 }}
              className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg hover:border-zinc-700 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">{module.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1">{module.lesson}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                  module.status === 'Completed' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
                    : module.status === 'In Progress'
                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                    : 'bg-zinc-700/20 text-zinc-400 border border-zinc-700/50'
                }`}>
                  {module.status === 'Completed' ? '✓ Completed' : module.status === 'In Progress' ? '◌ In Progress' : '◯ Not Started'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 + 0.2 }}
                      className={`h-full rounded-full ${
                        module.progress === 100 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                          : module.progress === 0
                          ? 'bg-zinc-700'
                          : 'bg-gradient-to-r from-violet-600 to-purple-400'
                      }`}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-white whitespace-nowrap">{module.progress}%</span>
              </div>
              
              <div className="flex gap-2 mt-3 text-xs text-zinc-500">
                <span>📖 {module.completedLessons}/{module.lessons} lessons</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Classes Teaser */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-violet-600/10 to-purple-600/10 border border-violet-500/30 rounded-2xl p-6 text-center"
      >
        <IconSchool size={32} className="mx-auto text-violet-400 mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Ready to explore more classes?</h3>
        <p className="text-sm text-zinc-300 mb-4">Discover new courses and expand your knowledge.</p>
        <a 
          href="/class" 
          className="inline-block px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
        >
          Browse Available Classes
        </a>
      </motion.div>
    </div>
  );
}
