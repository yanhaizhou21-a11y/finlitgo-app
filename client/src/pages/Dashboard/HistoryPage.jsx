import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowUpRight, IconArrowDownLeft, IconBook2, IconBuildingBank, IconTrendingUp, IconCurrencyBitcoin } from '@tabler/icons-react';

export default function HistoryPage() {
  const transactions = [
    { id: 1, title: 'Salary Drop', type: 'income', amount: '+ Rp 2.000.000', icon: <IconBuildingBank />, date: 'Today, 09:00 AM' },
    { id: 2, title: 'Investment Advance', type: 'expense', amount: '- Rp 500.000', icon: <IconTrendingUp />, date: 'Yesterday, 14:30 PM' },
    { id: 3, title: 'Investment Crypto', type: 'expense', amount: '- Rp 200.000', icon: <IconCurrencyBitcoin />, date: 'Yesterday, 16:00 PM' },
  ];

  const studyHistory = [
    { id: 1, module: 'Money Management Basics', progress: '100%', date: 'Today, 10:00 AM', status: 'Completed' },
    { id: 2, module: 'Investing for Beginners', progress: '45%', date: 'Yesterday, 20:00 PM', status: 'In Progress' }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold font-orbitron uppercase tracking-widest text-violet-400">History Transaction and Study</h2>
        <p className="text-sm text-zinc-500 mt-2">Track your cashflow and learning milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transactions List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <IconArrowUpRight className="text-violet-400" />
              Recent Transactions
            </h3>
            <button className="text-xs text-zinc-400 hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {transactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-violet-300 transition-colors">{tx.title}</h4>
                    <span className="text-xs text-zinc-500 font-mono">{tx.date}</span>
                  </div>
                </div>
                <div className={`font-mono font-bold ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Study History List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <IconBook2 className="text-violet-400" />
              Study Progress
            </h3>
            <button className="text-xs text-zinc-400 hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {studyHistory.map((study, i) => (
              <motion.div 
                key={study.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-full flex items-center justify-center font-bold text-sm">
                    {study.progress}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{study.module}</h4>
                    <div className="flex justify-between mt-1 text-xs">
                       <span className="text-zinc-500">{study.date}</span>
                       <span className={study.status === 'Completed' ? 'text-green-500' : 'text-orange-500'}>{study.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
