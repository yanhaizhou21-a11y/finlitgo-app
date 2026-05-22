import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconUsers, IconBook2, IconArticle, IconSchool, IconWriting, IconChartBar, IconHistory, IconLoader2 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function AdminOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalClasses: 0, totalBlogs: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch counts in parallel
        const [usersRes, classesRes, blogsRes, recentUsersRes] = await Promise.all([
          supabase.from('users').select('id', { count: 'exact', head: true }),
          supabase.from('classes').select('id', { count: 'exact', head: true }),
          supabase.from('blogs').select('id', { count: 'exact', head: true }),
          supabase.from('users').select('full_name, email, created_at').order('created_at', { ascending: false }).limit(10),
        ]);

        setStats({
          totalUsers: usersRes.error ? 0 : (usersRes.count ?? 0),
          totalClasses: classesRes.error ? 0 : (classesRes.count ?? 0),
          totalBlogs: blogsRes.error ? 0 : (blogsRes.count ?? 0),
        });

        const activities = [];

        if (recentUsersRes.data && !recentUsersRes.error) {
          for (const u of recentUsersRes.data.slice(0, 8)) {
            const label = u.full_name || u.email || 'User';
            activities.push({
              action: 'Pendaftar / akun baru',
              detail: `${label}${u.email ? ` · ${u.email}` : ''}`,
              time: timeAgo(u.created_at),
              color: 'text-blue-400',
              sortDate: new Date(u.created_at),
            });
          }
        }

        // Sort by most recent
        activities.sort((a, b) => b.sortDate - a.sortDate);
        setRecentActivity(activities.slice(0, 6));

      } catch (err) {
        console.error('Admin dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: <IconUsers />, gradient: 'from-blue-600 to-blue-400' },
    { title: 'Total Classes', value: stats.totalClasses.toString(), icon: <IconBook2 />, gradient: 'from-violet-600 to-purple-400' },
    { title: 'Total Blogs', value: stats.totalBlogs.toString(), icon: <IconArticle />, gradient: 'from-pink-600 to-rose-400' },
  ];

  const quickActions = [
    { title: 'Manage Classes', desc: 'CRUD Classes & Quiz', icon: <IconSchool />, path: '/dashboard/manage-classes' },
    { title: 'Manage Blog', desc: 'CRUD Blog Posts', icon: <IconWriting />, path: '/dashboard/manage-blog' },
    { title: 'Financial', desc: 'Cashflow & Goals', icon: <IconChartBar />, path: '/dashboard/finance' },
    { title: 'History', desc: 'Transactions & Study Logs', icon: <IconHistory />, path: '/dashboard/history' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-600 dark:text-zinc-500">
        <IconLoader2 className="animate-spin mb-4" size={32} />
        <p className="text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <h2 className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">ADMIN DASHBOARD</h2>
        <p className="text-sm text-zinc-650 dark:text-zinc-500">Platform overview and management.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/30 transition-colors shadow-sm"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex items-center gap-3 mb-4 text-zinc-500 dark:text-zinc-400">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white`}>
                {stat.icon}
              </div>
              <span className="text-sm uppercase tracking-wide">{stat.title}</span>
            </div>
            <span className="text-3xl font-bold font-orbitron tracking-wider text-zinc-900 dark:text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-300 mb-2">Quick Actions</h3>
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-violet-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group text-left w-full shadow-sm"
            >
              <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-400 rounded-xl text-white group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-shadow">
                {action.icon}
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{action.title}</h4>
                <p className="text-xs text-zinc-650 dark:text-zinc-500">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-300 mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color.replace('text-', 'bg-')}`} />
                <div className="flex-1">
                  <p className="text-sm text-zinc-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-zinc-650 dark:text-zinc-500 mt-1">{activity.detail}</p>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-600 font-mono whitespace-nowrap">{activity.time}</span>
              </motion.div>
            )) : (
              <p className="text-sm text-zinc-650 dark:text-zinc-500 text-center py-4">No recent activity.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
