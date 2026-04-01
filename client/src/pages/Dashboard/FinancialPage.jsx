import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconWallet, IconTrendingUp, IconTrendingDown, IconPlus, IconTarget, IconTrash, IconX, IconCash } from '@tabler/icons-react';

const TX_KEY = 'finlitgo_transactions';
const GOALS_KEY = 'finlitgo_goals';

function getInitialTransactions() {
  const saved = localStorage.getItem(TX_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'Salary Drop', type: 'income', amount: 2000000, category: 'Gaji', date: '2026-03-31', icon: 'bank' },
    { id: 2, title: 'Investment Advance', type: 'expense', amount: 500000, category: 'Investasi', date: '2026-03-30', icon: 'invest' },
    { id: 3, title: 'Makan Siang', type: 'expense', amount: 50000, category: 'Makan', date: '2026-03-30', icon: 'food' },
  ];
}

function getInitialGoals() {
  const saved = localStorage.getItem(GOALS_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, name: 'Emergency Fund', current: 5200000, target: 10000000 },
    { id: 2, name: 'New Laptop', current: 12000000, target: 20000000 },
  ];
}

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

const CATEGORIES = ['Gaji', 'Freelance', 'Investasi', 'Makan', 'Transport', 'Belanja', 'Hiburan', 'Utilitas', 'Lainnya'];

export default function FinancialPage() {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [goals, setGoals] = useState(getInitialGoals);
  const [showCashflowModal, setShowCashflowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [txForm, setTxForm] = useState({ title: '', type: 'expense', amount: '', category: 'Lainnya', date: new Date().toISOString().split('T')[0] });
  const [goalForm, setGoalForm] = useState({ name: '', target: '' });

  useEffect(() => { localStorage.setItem(TX_KEY, JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); }, [goals]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const accountStats = [
    { title: 'Main Balance', amount: formatRupiah(balance), icon: <IconWallet />, color: 'text-white', gradient: 'from-violet-600 to-purple-400' },
    { title: 'Total Income', amount: formatRupiah(totalIncome), icon: <IconTrendingUp />, color: 'text-green-400', gradient: 'from-green-600 to-emerald-400' },
    { title: 'Total Expenses', amount: '-' + formatRupiah(totalExpense), icon: <IconTrendingDown />, color: 'text-red-400', gradient: 'from-red-600 to-rose-400' }
  ];

  const addTransaction = () => {
    if (!txForm.title.trim() || !txForm.amount) return;
    const newTx = { ...txForm, id: Date.now(), amount: parseInt(txForm.amount) };
    setTransactions(prev => [newTx, ...prev]);
    setShowCashflowModal(false);
    setTxForm({ title: '', type: 'expense', amount: '', category: 'Lainnya', date: new Date().toISOString().split('T')[0] });
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
  };

  const addGoal = () => {
    if (!goalForm.name.trim() || !goalForm.target) return;
    setGoals(prev => [...prev, { id: Date.now(), name: goalForm.name, current: 0, target: parseInt(goalForm.target) }]);
    setShowGoalModal(false);
    setGoalForm({ name: '', target: '' });
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Financial Dashboard</h2>
          <p className="text-sm text-zinc-500 mt-1">Detailed breakdown of your finances.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowGoalModal(true)} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white font-medium text-sm rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700">
            <IconTarget size={18} /> Add Goal
          </button>
          <button onClick={() => setShowCashflowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5">
            <IconCash size={18} /> Add Cashflow
          </button>
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
            className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/20 transition-colors"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-xl pointer-events-none`} />
            <div className={`p-3 bg-zinc-900 rounded-xl ${stat.color} w-min mb-4`}>
              {stat.icon}
            </div>
            <span className="text-sm uppercase tracking-wide text-zinc-400 block mb-1">{stat.title}</span>
            <span className="text-3xl font-bold font-mono tracking-wider text-white">{stat.amount}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-zinc-300">Transaction History</h3>
            <span className="text-xs text-zinc-500 font-mono">{transactions.length} transactions</span>
          </div>
          
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
            {transactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'income' ? <IconTrendingUp size={18} /> : <IconTrendingDown size={18} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">{tx.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-zinc-500 font-mono">{tx.date}</span>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-violet-400/60">{tx.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold text-sm ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatRupiah(tx.amount)}
                  </span>
                  <button onClick={() => setDeleteConfirm(tx.id)} className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all">
                    <IconTrash size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-zinc-500">
                <IconCash size={32} className="mx-auto mb-3 text-zinc-600" />
                <p className="text-sm">No transactions yet. Click "Add Cashflow" to start tracking.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-medium text-zinc-300 mb-6">Active Targets</h3>
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl group">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm text-white">{goal.name}</span>
                  <button onClick={() => deleteGoal(goal.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-all">
                    <IconTrash size={14} />
                  </button>
                </div>
                <span className="text-violet-400 text-sm font-mono">{formatRupiah(goal.current)} / {formatRupiah(goal.target)}</span>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-full" style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }} />
                </div>
                <span className="text-xs text-zinc-500 mt-1 block">{Math.round((goal.current / goal.target) * 100)}% achieved</span>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4">No goals set. Add one to start tracking.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete Transaction Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white mb-2">Delete Transaction?</h3>
              <p className="text-sm text-zinc-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors text-sm font-medium">Cancel</button>
                <button onClick={() => deleteTransaction(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-colors text-sm font-medium">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Cashflow Modal */}
      <AnimatePresence>
        {showCashflowModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCashflowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Add Cashflow</h3>
                <button onClick={() => setShowCashflowModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Type Toggle */}
                <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-700">
                  <button onClick={() => setTxForm(f => ({...f, type: 'income'}))} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${txForm.type === 'income' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-zinc-400 hover:text-white'}`}>
                    Income
                  </button>
                  <button onClick={() => setTxForm(f => ({...f, type: 'expense'}))} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${txForm.type === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-zinc-400 hover:text-white'}`}>
                    Expense
                  </button>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Label *</label>
                  <input value={txForm.title} onChange={e => setTxForm(f => ({...f, title: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Salary, Makan siang..." />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Amount (Rp) *</label>
                  <input type="number" value={txForm.amount} onChange={e => setTxForm(f => ({...f, amount: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="100000" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Category</label>
                    <select value={txForm.category} onChange={e => setTxForm(f => ({...f, category: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Date</label>
                    <input type="date" value={txForm.date} onChange={e => setTxForm(f => ({...f, date: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" />
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
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Add Financial Goal</h3>
                <button onClick={() => setShowGoalModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Goal Name *</label>
                  <input value={goalForm.name} onChange={e => setGoalForm(f => ({...f, name: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Emergency Fund, Laptop Baru" />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Target Amount (Rp) *</label>
                  <input type="number" value={goalForm.target} onChange={e => setGoalForm(f => ({...f, target: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors font-mono" placeholder="10000000" />
                </div>
                <button onClick={addGoal} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  Add Goal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
