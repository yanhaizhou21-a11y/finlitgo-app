import React from 'react';
import { motion } from 'framer-motion';
import { IconWallet, IconTrendingUp, IconTrendingDown, IconTarget } from '@tabler/icons-react';

export default function FinancialPage() {
  const accountStats = [
    { title: 'Main Balance', amount: 'Rp 12.000.000', icon: <IconWallet />, color: 'text-white' },
    { title: 'Total Income', amount: 'Rp 20.000.000', icon: <IconTrendingUp />, color: 'text-[var(--color-accent-green)]' },
    { title: 'Total Expenses', amount: '-Rp 8.000.000', icon: <IconTrendingDown />, color: 'text-red-400' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Financial Dashboard</h2>
          <p className="text-sm text-zinc-500 mt-1">Detailed breakdown of your finances.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-lime-400 transition-colors">
          <IconTarget size={18} /> Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors"
          >
            <div className={`p-3 bg-zinc-900 rounded-xl ${stat.color} w-min mb-4`}>
              {stat.icon}
            </div>
            <span className="text-sm uppercase tracking-wide text-zinc-400 block mb-1">{stat.title}</span>
            <span className="text-3xl font-bold font-mono tracking-wider text-white">{stat.amount}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-zinc-300">Cash Flow</h3>
            <select className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-md px-3 py-1 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 border-b border-l border-zinc-700 flex items-end justify-between px-4 pb-2 pt-10">
            {/* Mock Chart displaying income vs expense */}
             {[
               {in: 80, out: 30}, {in: 60, out: 20}, {in: 90, out: 50}, 
               {in: 40, out: 40}, {in: 70, out: 60}, {in: 100, out: 20}
             ].map((data, i) => (
                <div key={i} className="flex gap-1 h-full items-end pb-1 w-10">
                  <div className="w-4 bg-[var(--color-accent-green)] rounded-t-sm" style={{ height: `${data.in}%` }} />
                  <div className="w-4 bg-red-400 rounded-t-sm" style={{ height: `${data.out}%` }} />
                </div>
             ))}
          </div>
          <div className="flex justify-between px-4 mt-2 text-xs text-zinc-500 font-mono">
            <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span>
          </div>
        </motion.div>

        {/* Goals area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-medium text-zinc-300 mb-6">Active Targets</h3>
          <div className="flex flex-col gap-6">
             {/* Emergency Fund */}
             <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
               <div className="flex justify-between mb-2">
                 <span className="font-medium text-sm">Emergency Fund</span>
                 <span className="text-[var(--color-accent-green)] text-sm font-mono">Rp 5.2M / 10M</span>
               </div>
               <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--color-accent-green)] w-[52%]"></div>
               </div>
             </div>
             {/* New Laptop */}
             <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
               <div className="flex justify-between mb-2">
                 <span className="font-medium text-sm">New Laptop</span>
                 <span className="text-blue-400 text-sm font-mono">Rp 12M / 20M</span>
               </div>
               <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-400 w-[60%]"></div>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
