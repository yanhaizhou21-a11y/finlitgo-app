import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconWallet, IconTrendingUp, IconTrendingDown, IconPlus, IconTarget, IconTrash, IconX, IconCash, IconLoader2, IconRobot, IconChartBar, IconChartPie } from '@tabler/icons-react';

import { supabase } from '../../services/supabase';
import { useAuth } from '../../store/AuthContext';

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

const INCOME_CATEGORIES = ['Gaji/Paycheck', 'Return Investasi', 'Freelance', 'Lainnya'];
const EXPENSE_CATEGORIES = ['Makanan/Eats', 'Hiburan/Entertainment', 'Transport', 'Belanja', 'Utilitas', 'Lainnya'];

const PRESET_IMAGES = [
  { name: '💰 Emergency Fund', url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80' },
  { name: '💻 Workspace / Gadget', url: 'https://images.unsplash.com/photo-1496181130204-7552cc14f1d0?w=500&q=80' },
  { name: '✈️ Travel / Vacation', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
  { name: '🏠 Dream House', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80' },
];

const MAX_INT32 = 2147483647;

function normalizeTransaction(tx) {
  return {
    ...tx,
    title: tx.title ?? tx.label ?? tx.description ?? 'Untitled',
    type: tx.type ?? tx.transaction_type ?? 'expense',
    amount: Number(tx.amount ?? 0),
    category: tx.category ?? tx.tx_category ?? 'Lainnya',
    date: tx.date ?? tx.transaction_date ?? tx.created_at?.split('T')[0] ?? '-',
  };
}

export default function FinancialPage() {
  const { user } = useAuth();
  const userId = user?.id || null;
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [pockets, setPockets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCashflowModal, setShowCashflowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showPocketModal, setShowPocketModal] = useState(false);
  const [showFundGoalModal, setShowFundGoalModal] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [txForm, setTxForm] = useState({ title: '', type: 'expense', amount: '', category: 'Makanan/Eats', date: new Date().toISOString().split('T')[0] });
  const [goalForm, setGoalForm] = useState({ name: '', target: '', image: '' });
  const [pocketForm, setPocketForm] = useState({ name: '', amount: '' });
  const [fundGoalTargetId, setFundGoalTargetId] = useState(null);
  const [fundGoalForm, setFundGoalForm] = useState({ pocketId: '', amount: '' });

  const fetchFinancialData = useCallback(async () => {
    if (!userId) {
      setTransactions([]);
      setGoals([]);
      setPockets([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [txRes, goalsRes, pocketsRes] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('goals').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
        supabase.from('pockets').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
      ]);

      if (txRes.error) throw txRes.error;
      if (goalsRes.error) throw goalsRes.error;
      if (pocketsRes.error) throw pocketsRes.error;

      const nextTx = (txRes.data || []).map(normalizeTransaction);
      const nextGoals = goalsRes.data || [];
      const nextPockets = pocketsRes.data || [];

      setTransactions(nextTx);
      setGoals(nextGoals);
      setPockets(nextPockets);

    } catch (err) {
      console.error('Error fetching financial data:', err);
      setTransactions([]);
      setGoals([]);
      setPockets([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch data from Supabase
  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const accountStats = [
    { title: 'Main Balance', amount: formatRupiah(balance), icon: <IconWallet />, color: 'text-zinc-900 dark:text-white', gradient: 'from-violet-600 to-purple-400' },
    { title: 'Total Income', amount: formatRupiah(totalIncome), icon: <IconTrendingUp />, color: 'text-emerald-600 dark:text-green-400', gradient: 'from-green-600 to-emerald-400' },
    { title: 'Total Expenses', amount: '-' + formatRupiah(totalExpense), icon: <IconTrendingDown />, color: 'text-rose-600 dark:text-red-400', gradient: 'from-red-600 to-rose-400' }
  ];

  // 50/30/20 Budget Calculations
  const needsCategories = ['Makanan/Eats', 'Transport', 'Utilitas', 'Makan'];
  const wantsCategories = ['Hiburan/Entertainment', 'Belanja', 'Hiburan'];

  const actualNeeds = transactions
    .filter(t => t.type === 'expense' && needsCategories.includes(t.category))
    .reduce((s, t) => s + t.amount, 0);

  const actualWants = transactions
    .filter(t => t.type === 'expense' && wantsCategories.includes(t.category))
    .reduce((s, t) => s + t.amount, 0);

  const actualSavings = Math.max(0, balance); // leftover balance acts as savings

  const totalBudgetBasis = totalIncome > 0 ? totalIncome : 5000000; // baseline if 0
  const recNeeds = totalBudgetBasis * 0.5;
  const recWants = totalBudgetBasis * 0.3;
  const recSavings = totalBudgetBasis * 0.2;

  const getGoalImage = (goal) => {
    if (goal.image) return goal.image;
    // Check localStorage fallback
    const localImages = JSON.parse(localStorage.getItem(`finlitgo_goal_images_${userId}`) || '{}');
    return localImages[goal.id] || null;
  };

  const addTransaction = async () => {
    if (!txForm.title.trim() || !txForm.amount || !userId) return;
    const amount = Number.parseInt(txForm.amount, 10);
    if (!Number.isFinite(amount) || amount <= 0) {
      alert('Amount harus berupa angka lebih dari 0.');
      return;
    }
    if (amount > MAX_INT32) {
      alert('Amount terlalu besar. Maksimum yang didukung saat ini: 2.147.483.647');
      return;
    }

    const { error } = await supabase.from('transactions').insert({
      user_id: userId,
      title: txForm.title,
      type: txForm.type,
      amount,
      category: txForm.category,
      date: txForm.date,
    });
    if (error) {
      console.error('Failed to add transaction:', error);
      return;
    }

    await fetchFinancialData();
    setShowCashflowModal(false);
    setTxForm({ title: '', type: 'expense', amount: '', category: 'Makanan/Eats', date: new Date().toISOString().split('T')[0] });
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id).eq('user_id', userId);
    if (error) console.error(error);
    await fetchFinancialData();
    setDeleteConfirm(null);
  };

  const addGoal = async () => {
    if (!goalForm.name.trim() || !goalForm.target || !userId) return;
    const target = parseInt(goalForm.target);
    const image = goalForm.image || null;

    let newGoal = { user_id: userId, name: goalForm.name, target, current: 0, image };
    let { data, error } = await supabase.from('goals').insert(newGoal).select();

    if (error) {
      console.warn('Failed to insert goal with image column, retrying without image:', error);
      // Fallback to inserting without the image field
      const fallbackGoal = { user_id: userId, name: goalForm.name, target, current: 0 };
      const fallbackRes = await supabase.from('goals').insert(fallbackGoal).select();
      if (fallbackRes.error) {
        console.error('Failed to add goal entirely:', fallbackRes.error);
        return;
      }
      data = fallbackRes.data;
      // Store the image locally in localStorage
      if (image && data && data[0]) {
        const localImages = JSON.parse(localStorage.getItem(`finlitgo_goal_images_${userId}`) || '{}');
        localImages[data[0].id] = image;
        localStorage.setItem(`finlitgo_goal_images_${userId}`, JSON.stringify(localImages));
      }
    }

    await fetchFinancialData();
    setShowGoalModal(false);
    setGoalForm({ name: '', target: '', image: '' });
  };

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id).eq('user_id', userId);
    if (!error) {
      await fetchFinancialData();
      return;
    }
    console.error(error);
  };

  const addPocket = async () => {
    if (!pocketForm.name.trim() || !pocketForm.amount || !userId) return;
    const amount = parseInt(pocketForm.amount);
    if (amount > balance) {
      alert("Insufficient Main Balance to create this pocket!");
      return;
    }

    // Create pocket via Supabase
    const newPocket = { user_id: userId, name: pocketForm.name, balance: amount };
    const { error: pocketError } = await supabase.from('pockets').insert(newPocket);
    if (pocketError) {
      console.error('Failed to create pocket:', pocketError);
      return;
    }

    // Create deducting transaction as an expense
    const { error: txWriteError } = await supabase.from('transactions').insert({
      user_id: userId,
      title: `Transfer to ${pocketForm.name}`,
      type: 'expense',
      amount,
      category: 'Lainnya',
      date: new Date().toISOString().split('T')[0],
    });
    if (txWriteError) console.warn('Failed to create transfer transaction:', txWriteError);

    await fetchFinancialData();

    setShowPocketModal(false);
    setPocketForm({ name: '', amount: '' });
  };

  const deletePocket = async (id, balanceAmount) => {
    const { error } = await supabase.from('pockets').delete().eq('id', id).eq('user_id', userId);
    if (!error) {
      // Return money to main balance
      await supabase.from('transactions').insert({
        user_id: userId,
        title: 'Return from closed pocket',
        type: 'income',
        amount: balanceAmount,
        category: 'Lainnya',
        date: new Date().toISOString().split('T')[0],
      });
      await fetchFinancialData();
      return;
    }
    console.error(error);
  };

  const fundGoal = async () => {
    if (!fundGoalForm.pocketId || !fundGoalForm.amount || !userId) return;
    const amount = parseInt(fundGoalForm.amount);
    const selectedPocket = pockets.find(p => p.id.toString() === fundGoalForm.pocketId);

    if (!selectedPocket || selectedPocket.balance < amount) {
      alert("Insufficient funds in the selected pocket!");
      return;
    }

    // Attempt DB updates sequentially 
    const { error: pError } = await supabase.from('pockets').update({ balance: selectedPocket.balance - amount }).eq('id', selectedPocket.id);
    if (pError) {
      console.error(pError);
      return;
    }

    const targetGoal = goals.find(g => g.id === fundGoalTargetId);
    const { error: gError } = await supabase.from('goals').update({ current: targetGoal.current + amount }).eq('id', targetGoal.id);
    if (gError) {
      console.error(gError);
      return;
    }

    await fetchFinancialData();

    setShowFundGoalModal(false);
    setFundGoalForm({ pocketId: '', amount: '' });
    setFundGoalTargetId(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
        <IconLoader2 className="animate-spin mb-4 text-violet-500" size={32} />
        <p className="text-sm font-space">Syncing dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-zinc-900 dark:text-white">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-orbitron text-zinc-900 dark:text-white">Financial Dashboard</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Detailed breakdown of your finances.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => setShowGoalModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white font-semibold text-sm rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700">
              <IconTarget size={18} className="text-violet-500" /> Add Goal
            </button>
            <button onClick={() => setShowCashflowModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5">
              <IconCash size={18} /> Add Cashflow
            </button>
          </div>
        </div>

        {/* AI Analyze Quick-Action Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest mr-1">
            <IconRobot size={14} className="text-violet-500 dark:text-violet-400" />
            <span>AI Analyze:</span>
          </div>
          {[
            { label: 'Cash Flow', intent: 'analyze_cashflow', icon: <IconChartBar size={14} />, color: 'text-violet-600 dark:text-green-400 border-zinc-200 dark:border-green-500/30 hover:bg-zinc-50 dark:hover:bg-green-500/10' },
            { label: 'Expenses', intent: 'analyze_expenses', icon: <IconChartPie size={14} />, color: 'text-violet-600 dark:text-orange-400 border-zinc-200 dark:border-orange-500/30 hover:bg-zinc-50 dark:hover:bg-orange-500/10' },
            { label: 'Revenue', intent: 'analyze_revenue', icon: <IconTrendingUp size={14} />, color: 'text-violet-600 dark:text-blue-400 border-zinc-200 dark:border-blue-500/30 hover:bg-zinc-50 dark:hover:bg-blue-500/10' },
            { label: 'Budget', intent: 'analyze_budget', icon: <IconWallet size={14} />, color: 'text-violet-600 dark:text-cyan-400 border-zinc-200 dark:border-cyan-500/30 hover:bg-zinc-50 dark:hover:bg-cyan-500/10' },
          ].map(btn => (
            <button
              key={btn.intent}
              onClick={() => navigate(`/ai-assist?intent=${btn.intent}`)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white dark:bg-zinc-900 text-xs font-semibold transition-all hover:-translate-y-0.5 ${btn.color}`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/20 transition-colors shadow-sm"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-xl pointer-events-none`} />
            <div className={`p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl ${stat.color} w-min mb-4 border border-zinc-100 dark:border-zinc-800`}>
              {stat.icon}
            </div>
            <span className="text-sm uppercase tracking-wide text-zinc-400 dark:text-zinc-500 block mb-1">{stat.title}</span>
            <span className={`text-3xl font-bold font-mono tracking-wider ${stat.color}`}>{stat.amount}</span>
          </motion.div>
        ))}
      </div>

      {/* 50/30/20 Budget Rule Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-orbitron">Aturan Keuangan 50/30/20</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Metode alokasi pendapatan bulanan kamu berdasarkan kategori pengeluaran.</p>
          </div>
          <div className="px-3 py-1 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-semibold rounded-lg border border-violet-100 dark:border-violet-800/40">
            {totalIncome > 0 ? 'Dihitung dari Pendapatan Riil' : 'Pendapatan Acuan: Rp 5.000.000'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Needs (50%) */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Kebutuhan (Needs)</span>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">50%</span>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-3 font-mono">Makanan, Transport, Utilitas</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Aktual:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{formatRupiah(actualNeeds)}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Rekomendasi:</span>
                <span className="font-bold text-zinc-600 dark:text-zinc-400">{formatRupiah(recNeeds)}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${actualNeeds > recNeeds ? 'bg-red-500' : 'bg-violet-500'}`} style={{ width: `${Math.min((actualNeeds / recNeeds) * 100, 100)}%` }} />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right mt-1">
                {actualNeeds > recNeeds ? '⚠️ Melebihi budget!' : `${Math.round((actualNeeds / recNeeds) * 100)}% terpakai`}
              </p>
            </div>
          </div>

          {/* Wants (30%) */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Keinginan (Wants)</span>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">30%</span>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-3 font-mono">Hiburan, Belanja</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Aktual:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{formatRupiah(actualWants)}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Rekomendasi:</span>
                <span className="font-bold text-zinc-600 dark:text-zinc-400">{formatRupiah(recWants)}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${actualWants > recWants ? 'bg-red-500' : 'bg-violet-500'}`} style={{ width: `${Math.min((actualWants / recWants) * 100, 100)}%` }} />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right mt-1">
                {actualWants > recWants ? '⚠️ Melebihi budget!' : `${Math.round((actualWants / recWants) * 100)}% terpakai`}
              </p>
            </div>
          </div>

          {/* Savings (20%) */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Tabungan (Savings)</span>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">20%</span>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-3 font-mono">Sisa saldo simpanan & Pockets</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Aktual:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{formatRupiah(actualSavings)}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Target Rekomendasi:</span>
                <span className="font-bold text-zinc-600 dark:text-zinc-400">{formatRupiah(recSavings)}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((actualSavings / recSavings) * 100, 100)}%` }} />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right mt-1">
                {actualSavings >= recSavings ? '🎉 Target tercapai!' : `${Math.round((actualSavings / recSavings) * 100)}% tercapai`}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pockets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">My Pockets</h3>
            <button onClick={() => setShowPocketModal(true)} className="p-1 px-2.5 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors flex items-center gap-1 font-semibold">
              <IconPlus size={14} /> New
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {pockets.map((pocket) => (
              <div key={pocket.id} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/80 p-3 rounded-xl group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-100 dark:border-violet-800/30">
                    <IconWallet size={16} />
                  </div>
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">{pocket.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono text-violet-600 dark:text-violet-300">{formatRupiah(pocket.balance)}</span>
                  <button onClick={() => deletePocket(pocket.id, pocket.balance)} className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all" title="Delete Pocket & Return Funds">
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
            {pockets.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4">No separated pockets. Main balance rules all.</p>
            )}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Active Targets</h3>
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/80 p-4 rounded-xl group relative overflow-hidden">
                {getGoalImage(goal) && (
                  <div className="w-full h-28 rounded-lg overflow-hidden mb-3 border border-zinc-200 dark:border-zinc-700">
                    <img src={getGoalImage(goal)} alt={goal.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">{goal.name}</span>
                  <button onClick={() => deleteGoal(goal.id)} className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all">
                    <IconTrash size={14} />
                  </button>
                </div>
                <span className="text-violet-600 dark:text-violet-400 text-sm font-bold font-mono">{formatRupiah(goal.current)} / {formatRupiah(goal.target)}</span>
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{Math.round((goal.current / goal.target) * 100)}% achieved</span>
                  {goal.current < goal.target && pockets.length > 0 && (
                    <button onClick={() => { setFundGoalTargetId(goal.id); setShowFundGoalModal(true); }} className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-white transition-colors bg-violet-500/10 hover:bg-violet-600 px-2 py-1 rounded">
                      + Fund
                    </button>
                  )}
                </div>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4">No goals set. Add one to start tracking.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Transaction History</h3>
          <span className="text-xs text-zinc-500 font-mono">{transactions.length} transactions</span>
        </div>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-600 dark:text-green-500' : 'bg-red-500/10 text-red-600 dark:text-red-500'}`}>
                  {tx.type === 'income' ? <IconTrendingUp size={18} /> : <IconTrendingDown size={18} />}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">{tx.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{tx.date}</span>
                    <span className="text-xs text-zinc-300 dark:text-zinc-600">•</span>
                    <span className="text-xs text-violet-600 dark:text-violet-400/80 font-medium">{tx.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono font-bold text-sm ${tx.type === 'income' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatRupiah(tx.amount)}
                </span>
                <button onClick={() => setDeleteConfirm(tx.id)} className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 transition-all">
                  <IconTrash size={14} />
                </button>
              </div>
            </motion.div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              <IconCash size={32} className="mx-auto mb-3 text-zinc-300 dark:text-zinc-600" />
              <p className="text-sm">No transactions yet. Click "Add Cashflow" to start tracking.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Delete Transaction Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Delete Transaction?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-xl transition-colors text-sm font-semibold border border-zinc-200 dark:border-zinc-700">Cancel</button>
                <button onClick={() => deleteTransaction(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors text-sm font-semibold">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Cashflow Modal */}
      <AnimatePresence>
        {showCashflowModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCashflowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Add Cashflow</h3>
                <button onClick={() => setShowCashflowModal(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Type Toggle */}
                <div className="flex bg-zinc-50 dark:bg-zinc-900 rounded-xl p-1 border border-zinc-200 dark:border-zinc-700">
                  <button onClick={() => setTxForm(f => ({ ...f, type: 'income', category: INCOME_CATEGORIES[0] }))} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${txForm.type === 'income' ? 'bg-emerald-500/10 text-emerald-600 dark:bg-green-500/20 dark:text-green-400 border border-emerald-200 dark:border-green-500/30' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}>
                    Income
                  </button>
                  <button onClick={() => setTxForm(f => ({ ...f, type: 'expense', category: EXPENSE_CATEGORIES[0] }))} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${txForm.type === 'expense' ? 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}>
                    Expense
                  </button>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Label *</label>
                  <input value={txForm.title} onChange={e => setTxForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Salary, Makan siang..." />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Amount (Rp) *</label>
                  <input type="number" value={txForm.amount} onChange={e => setTxForm(f => ({ ...f, amount: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="100000" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Category</label>
                    <select value={txForm.category} onChange={e => setTxForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors cursor-pointer">
                      {txForm.type === 'income'
                        ? INCOME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                        : EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Date</label>
                    <input type="date" value={txForm.date} onChange={e => setTxForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                </div>

                <button onClick={addTransaction} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  Add Transaction
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGoalModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Add Financial Goal</h3>
                <button onClick={() => setShowGoalModal(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Goal Name *</label>
                  <input value={goalForm.name} onChange={e => setGoalForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Emergency Fund, Laptop Baru" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Target Amount (Rp) *</label>
                  <input type="number" value={goalForm.target} onChange={e => setGoalForm(f => ({ ...f, target: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="10000000" />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block font-semibold">Motivation Cover Image (Optional)</label>

                  {/* Preset selections */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => setGoalForm(f => ({ ...f, image: preset.url }))}
                        className={`flex flex-col items-center p-2 rounded-lg border text-xs transition-all ${goalForm.image === preset.url
                            ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300 font-bold'
                            : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                          }`}
                      >
                        <div className="w-full h-12 rounded overflow-hidden mb-1.5 border border-zinc-200 dark:border-zinc-800">
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        </div>
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  <input value={goalForm.image} onChange={e => setGoalForm(f => ({ ...f, image: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="Or paste custom image URL..." />
                </div>

                <button onClick={addGoal} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  Add Goal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Pocket Modal */}
      <AnimatePresence>
        {showPocketModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPocketModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Create New Pocket</h3>
                <button onClick={() => setShowPocketModal(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"><IconX size={20} /></button>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Transfer money from your Main Balance into a dedicated pocket.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Pocket Name *</label>
                  <input value={pocketForm.name} onChange={e => setPocketForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Tabungan Dana Darurat" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Initial Transfer Amount (Rp) *</label>
                  <input type="number" value={pocketForm.amount} onChange={e => setPocketForm(f => ({ ...f, amount: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="100000" />
                </div>
                <button onClick={addPocket} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  Create & Transfer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fund Goal Modal */}
      <AnimatePresence>
        {showFundGoalModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowFundGoalModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Fund Goal</h3>
                <button onClick={() => setShowFundGoalModal(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"><IconX size={20} /></button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Select Pocket</label>
                  <div className="relative">
                    <select value={fundGoalForm.pocketId} onChange={e => setFundGoalForm(f => ({ ...f, pocketId: e.target.value }))} className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors cursor-pointer">
                      <option value="" disabled>-- Choose a pocket --</option>
                      {pockets.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (Available: Rp{p.balance})</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-500">▼</div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block font-semibold">Amount to Fund (Rp)</label>
                  <input type="number" value={fundGoalForm.amount} onChange={e => setFundGoalForm(f => ({ ...f, amount: e.target.value }))} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="50000" />
                </div>
                <button onClick={fundGoal} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  Confirm Funding
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
