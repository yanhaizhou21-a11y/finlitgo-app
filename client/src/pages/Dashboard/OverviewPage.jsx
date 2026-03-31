import React from 'react';
import { motion } from 'framer-motion';
import { IconWallet, IconTrendingUp, IconTrendingDown, IconFlame } from '@tabler/icons-react';

export default function OverviewPage({ isAdminView = false }) {
  // Mock Data
  const stats = [
    { title: 'Total Balance', amount: 'Rp 12.000.000', icon: <IconWallet />, color: 'text-white' },
    { title: 'Total Income', amount: 'Rp 20.000.000', icon: <IconTrendingUp />, color: 'text-green-400' },
    { title: 'Total Expenses', amount: 'Rp 8.000.000', icon: <IconTrendingDown />, color: 'text-red-400' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl text-zinc-400 font-medium">GOOD MORNING {isAdminView ? 'ADMIN' : 'SNICKERS'}</h2>
          <p className="text-sm text-zinc-500">Here's your financial and study progress overview.</p>
        </div>
        {!isAdminView && (
          <div className="flex bg-[#1E1E1E] px-4 py-2 rounded-xl items-center gap-3 border border-zinc-800 shadow-lg">
            <IconFlame size={28} className="text-orange-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-lg font-bold font-orbitron">32</span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Day Streak</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 flex items-start justify-between relative overflow-hidden group hover:border-[var(--color-accent-green)] transition-colors"
          >
            <div className={`p-3 bg-zinc-900 rounded-xl ${stat.color} absolute -right-4 -top-4 opacity-10 scale-[3] pointer-events-none`}>
              {stat.icon}
            </div>
            
            <div className="flex flex-col gap-2 relative z-10 w-full">
              <div className="flex items-center gap-3 mb-2 text-zinc-400">
                <div className={`p-2 rounded-lg bg-zinc-900 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-sm uppercase tracking-wide">{stat.title}</span>
              </div>
              <span className="text-3xl font-bold font-orbitron tracking-wider">{stat.amount}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left Column (Chart/Progress area) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 h-80 flex flex-col"
          >
            <h3 className="text-lg font-medium text-zinc-300 mb-4">Expense Analysis</h3>
            <div className="flex-1 border-b border-l border-zinc-700 flex items-end justify-between px-4 pb-2 pt-10">
              {/* Mock Bar Chart */}
              {[40, 70, 30, 90, 60, 20, 50].map((h, i) => (
                <div key={i} className="w-12 bg-white rounded-t-sm hover:bg-[var(--color-accent-green)] transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-zinc-800 text-xs px-2 py-1 rounded transition-opacity">
                    ${h}0
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4 mt-2 text-xs text-zinc-500 font-mono">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          {/* Mini Study Progress */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6"
          >
             <h3 className="text-lg font-medium text-zinc-300 mb-4">Latest Study Module</h3>
             <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-xl border border-zinc-800">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-[var(--color-accent-green)]/20 rounded-full flex items-center justify-center border border-[var(--color-accent-green)]">
                   <IconFlame className="text-[var(--color-accent-green)]" />
                 </div>
                 <div>
                   <h4 className="font-bold text-white">Money Management Basics</h4>
                   <p className="text-sm text-zinc-400">Chapter 4: Investing 101</p>
                 </div>
               </div>
               <button className="px-6 py-2 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-lime-400 transition-colors">
                 Continue
               </button>
             </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 flex-1"
          >
            <h3 className="text-lg font-medium text-zinc-300 mb-6">Recent Goals</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Emergency Fund', progress: 85, color: 'bg-green-500' },
                { name: 'Dream Vacation', progress: 45, color: 'bg-blue-500' },
                { name: 'New Laptop', progress: 20, color: 'bg-[var(--color-accent-green)]' }
              ].map((goal, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">{goal.name}</span>
                    <span className="font-mono text-zinc-500">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${goal.color}`} style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700 font-medium text-sm">
              View All Goals
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
