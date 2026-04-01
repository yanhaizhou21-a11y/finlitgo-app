import React from 'react';
import { motion } from 'framer-motion';
import { IconUsers, IconBook2, IconArticle, IconSchool, IconWriting, IconChartBar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function AdminOverview() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '1,247', icon: <IconUsers />, gradient: 'from-blue-600 to-blue-400' },
    { title: 'Total Classes', value: '12', icon: <IconBook2 />, gradient: 'from-violet-600 to-purple-400' },
    { title: 'Total Blogs', value: '24', icon: <IconArticle />, gradient: 'from-pink-600 to-rose-400' },
  ];

  const quickActions = [
    { title: 'Manage Classes', desc: 'CRUD Classes & Quiz', icon: <IconSchool />, path: '/dashboard/manage-classes' },
    { title: 'Manage Blog', desc: 'CRUD Blog Posts', icon: <IconWriting />, path: '/dashboard/manage-blog' },
    { title: 'Financial', desc: 'Cashflow & Goals', icon: <IconChartBar />, path: '/dashboard/finance' },
  ];

  // Recent activity mock
  const recentActivity = [
    { action: 'New user registered', detail: 'john@example.com', time: '5 min ago', color: 'text-blue-400' },
    { action: 'Class completed', detail: 'Money Management Basics by user_42', time: '1 hour ago', color: 'text-green-400' },
    { action: 'New blog published', detail: 'The 50/30/20 Rule Explained', time: '3 hours ago', color: 'text-violet-400' },
    { action: 'Quiz submitted', detail: 'Investing Quiz by user_108', time: '5 hours ago', color: 'text-orange-400' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <h2 className="text-xl text-zinc-400 font-medium">ADMIN DASHBOARD</h2>
        <p className="text-sm text-zinc-500">Platform overview and management.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/30 transition-colors"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex items-center gap-3 mb-4 text-zinc-400">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white`}>
                {stat.icon}
              </div>
              <span className="text-sm uppercase tracking-wide">{stat.title}</span>
            </div>
            <span className="text-3xl font-bold font-orbitron tracking-wider text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-lg font-medium text-zinc-300 mb-2">Quick Actions</h3>
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-4 p-4 bg-[#1E1E1E] border border-zinc-800 rounded-xl hover:border-violet-500/30 hover:bg-zinc-900 transition-all group text-left w-full"
            >
              <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-400 rounded-xl text-white group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-shadow">
                {action.icon}
              </div>
              <div>
                <h4 className="font-medium text-white group-hover:text-violet-300 transition-colors">{action.title}</h4>
                <p className="text-xs text-zinc-500">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-medium text-zinc-300 mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color.replace('text-', 'bg-')}`} />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-zinc-500 mt-1">{activity.detail}</p>
                </div>
                <span className="text-xs text-zinc-600 font-mono whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
