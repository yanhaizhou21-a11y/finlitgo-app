import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconArrowUpRight, IconBook2, IconTrendingUp, IconTrendingDown, IconCash, IconLoader2, IconDownload } from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabase';
import { fetchClasses } from '../../services/classService';

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const userId = user?.id || null;

  const [transactions, setTransactions] = useState([]);
  const [studyHistory, setStudyHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setStudyHistory([]);
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      try {
        // Fetch transactions from Supabase
        const { data: txData, error: txErr } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20);

        if (!txErr && txData) {
          setTransactions(txData.map(tx => ({
            ...tx,
            title: tx.title || tx.label || tx.description || 'Untitled',
            type: tx.type || 'expense',
            amount: Number(tx.amount || 0),
            category: tx.category || 'Lainnya',
            date: tx.date || tx.created_at?.split('T')[0] || '-',
          })));
        }

        // Fetch study progress from Supabase
        const [classesData, progressRes] = await Promise.all([
          fetchClasses(),
          supabase.from('class_progress').select('class_id, chapter_id, created_at').eq('user_id', userId),
        ]);

        const progressRows = progressRes.error ? [] : (progressRes.data || []);
        const byClass = new Map();
        const latestByClass = new Map();

        for (const row of progressRows) {
          byClass.set(row.class_id, (byClass.get(row.class_id) || 0) + 1);
          const existing = latestByClass.get(row.class_id);
          if (!existing || new Date(row.created_at) > new Date(existing)) {
            latestByClass.set(row.class_id, row.created_at);
          }
        }

        const studyCards = (classesData || []).map((cls) => {
          let totalItems = 1;
          if (cls.levels_data) {
            const parsed = typeof cls.levels_data === 'string' ? JSON.parse(cls.levels_data) : cls.levels_data;
            totalItems = parsed.reduce((acc, level) => acc + (level.items ? level.items.length : 0), 0);
          } else {
            totalItems = (cls.class_chapters || []).length || 1;
          }
          if (totalItems === 0) totalItems = 1;

          let completedCount = byClass.get(cls.id) || 0;

          // Check localStorage for additional progress
          try {
            const localKey = `finlitgo_progress_${userId}_class_${cls.id}`;
            const localData = localStorage.getItem(localKey);
            if (localData) {
              const localSet = new Set(JSON.parse(localData));
              if (localSet.size > completedCount) completedCount = localSet.size;
            }
          } catch (e) { /* ignore */ }

          const progress = Math.min(100, Math.round((completedCount / totalItems) * 100));
          const lastActivity = latestByClass.get(cls.id);

          return {
            id: cls.id,
            module: cls.title,
            progress: `${progress}%`,
            date: lastActivity ? timeAgo(lastActivity) : 'Not started',
            status: progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started',
          };
        });

        setStudyHistory(studyCards);
      } catch (err) {
        console.error('History fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  const handleExportCSV = () => {
    let csv = "";
    csv += "--- TRANSACTIONS REPORT ---\n";
    csv += "Date,Title,Type,Category,Amount\n";
    transactions.forEach(tx => {
      const row = [
        tx.date,
        `"${(tx.title || '').replace(/"/g, '""')}"`,
        tx.type,
        `"${(tx.category || '').replace(/"/g, '""')}"`,
        tx.amount
      ].join(",");
      csv += row + "\n";
    });

    csv += "\n--- STUDY PROGRESS REPORT ---\n";
    csv += "Module,Progress,Last Activity,Status\n";
    studyHistory.forEach(study => {
      const row = [
        `"${(study.module || '').replace(/"/g, '""')}"`,
        study.progress,
        study.date,
        study.status
      ].join(",");
      csv += row + "\n";
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FinLitGo_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-600 dark:text-zinc-500">
        <IconLoader2 className="animate-spin mb-4" size={32} />
        <p className="text-sm">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron uppercase tracking-widest text-violet-650 dark:text-violet-400">History Transaction and Study</h2>
          <p className="text-sm text-zinc-650 dark:text-zinc-500 mt-2">Track your cashflow and learning milestones.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-650 to-purple-500 hover:shadow-lg text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md"
        >
          <IconDownload size={18} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transactions List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white flex items-center gap-2">
              <IconArrowUpRight className="text-violet-500 dark:text-violet-400" />
              Recent Transactions
            </h3>
            <span className="text-xs text-zinc-650 dark:text-zinc-500 font-mono">{transactions.length} items</span>
          </div>
          
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {transactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-350 dark:hover:border-zinc-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'income' ? <IconTrendingUp size={20} /> : <IconTrendingDown size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-950 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{tx.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-zinc-650 dark:text-zinc-500 font-mono">{tx.date}</span>
                      <span className="text-xs text-zinc-300 dark:text-zinc-600">•</span>
                      <span className="text-xs text-violet-600 dark:text-violet-400/60">{tx.category || 'Category'}</span>
                    </div>
                  </div>
                </div>
                <div className={`font-mono font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
                </div>
              </motion.div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-zinc-650 dark:text-zinc-500">
                <IconCash size={32} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-600" />
                <p className="text-sm">No transactions yet.</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Add cashflow from the Financial page to see history here.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Study History List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white flex items-center gap-2">
              <IconBook2 className="text-violet-500 dark:text-violet-400" />
              Study Progress
            </h3>
            <a href="/class" className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-550 dark:hover:text-violet-300 transition-colors">View Classes →</a>
          </div>
          
          <div className="flex flex-col gap-4">
            {studyHistory.map((study, i) => (
              <motion.div 
                key={study.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-350 dark:hover:border-zinc-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border ${
                    study.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30' 
                      : 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30'
                  }`}>
                    {study.progress}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-zinc-950 dark:text-white">{study.module}</h4>
                    <div className="flex justify-between mt-1 text-xs">
                       <span className="text-zinc-650 dark:text-zinc-500">{study.date}</span>
                       <span className={study.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}>{study.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {studyHistory.length === 0 && (
              <div className="text-center py-8 text-zinc-650 dark:text-zinc-500">
                <IconBook2 size={32} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-600" />
                <p className="text-sm">No study progress yet.</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Start a class module to track your progress here.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
