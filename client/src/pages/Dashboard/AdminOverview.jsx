import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IconUsers, IconBook2, IconArticle, IconSchool, IconWriting, IconChartBar, IconHistory, IconLoader2, IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import gsap from 'gsap';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

/* ── helpers ─────────────────────────────────────── */
function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function groupByMonth(users) {
  const map = {};
  const now = new Date();
  // Pre-fill last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString('default', { month: 'short' });
    map[key] = 0;
  }
  for (const u of users) {
    const d = new Date(u.created_at);
    const key = d.toLocaleString('default', { month: 'short' });
    if (key in map) map[key]++;
  }
  return Object.entries(map).map(([month, users]) => ({ month, users }));
}

/* ── Animated counter ────────────────────────────── */
function AnimatedNumber({ value, prefix = '' }) {
  const ref = useRef(null);
  const obj = useRef({ val: 0 });

  useEffect(() => {
    gsap.to(obj.current, {
      val: value,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(obj.current.val).toLocaleString();
        }
      },
    });
  }, [value, prefix]);

  return <span ref={ref}>{prefix}0</span>;
}

/* ── Chart theme ─────────────────────────────────── */
const CHART_COLORS = ['#7C3AED', '#A78BFA', '#3B82F6', '#22C55E', '#F59E0B', '#EF4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ── Main component ──────────────────────────────── */
export default function AdminOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalClasses: 0, totalBlogs: 0 });
  const [userGrowth, setUserGrowth] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const chartRefs = useRef([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [usersRes, classesRes, blogsRes, recentUsersRes, allUsersRes] = await Promise.all([
          supabase.from('users').select('id', { count: 'exact', head: true }),
          supabase.from('classes').select('id', { count: 'exact', head: true }),
          supabase.from('blogs').select('id', { count: 'exact', head: true }),
          supabase.from('users').select('full_name, email, created_at').order('created_at', { ascending: false }).limit(10),
          supabase.from('users').select('created_at').order('created_at', { ascending: true }),
        ]);

        const totalUsers = usersRes.error ? 0 : (usersRes.count ?? 0);
        const totalClasses = classesRes.error ? 0 : (classesRes.count ?? 0);
        const totalBlogs = blogsRes.error ? 0 : (blogsRes.count ?? 0);

        setStats({ totalUsers, totalClasses, totalBlogs });

        // Chart data
        const allUsers = allUsersRes.data || [];
        setUserGrowth(groupByMonth(allUsers));

        setContentData([
          { name: 'Users', value: totalUsers, fill: '#7C3AED' },
          { name: 'Classes', value: totalClasses, fill: '#3B82F6' },
          { name: 'Blogs', value: totalBlogs, fill: '#22C55E' },
        ]);

        setPieData([
          { name: 'Users', value: totalUsers },
          { name: 'Classes', value: totalClasses },
          { name: 'Blogs', value: totalBlogs },
        ]);

        // Activity
        const activities = [];
        if (recentUsersRes.data && !recentUsersRes.error) {
          for (const u of recentUsersRes.data.slice(0, 8)) {
            const label = u.full_name || u.email || 'User';
            activities.push({
              action: 'New account',
              detail: `${label}${u.email ? ` · ${u.email}` : ''}`,
              time: timeAgo(u.created_at),
              sortDate: new Date(u.created_at),
            });
          }
        }
        activities.sort((a, b) => b.sortDate - a.sortDate);
        setRecentActivity(activities.slice(0, 5));
      } catch (err) {
        console.error('Admin dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // GSAP entrance for chart cards
  useEffect(() => {
    if (loading) return;
    chartRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    });
  }, [loading]);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <IconUsers size={20} />, color: '#7C3AED', gradient: 'from-violet-600 to-purple-400' },
    { title: 'Total Classes', value: stats.totalClasses, icon: <IconBook2 size={20} />, color: '#3B82F6', gradient: 'from-blue-600 to-blue-400' },
    { title: 'Total Blogs', value: stats.totalBlogs, icon: <IconArticle size={20} />, color: '#22C55E', gradient: 'from-green-600 to-green-400' },
  ];

  const quickActions = [
    { title: 'Manage Classes', desc: 'CRUD Classes & Quiz', icon: <IconSchool size={20} />, path: '/dashboard/manage-classes' },
    { title: 'Manage Blog', desc: 'CRUD Blog Posts', icon: <IconWriting size={20} />, path: '/dashboard/manage-blog' },
    { title: 'Financial', desc: 'Cashflow & Goals', icon: <IconChartBar size={20} />, path: '/dashboard/finance' },
    { title: 'History', desc: 'Transactions & Logs', icon: <IconHistory size={20} />, path: '/dashboard/history' },
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
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">ADMIN DASHBOARD</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">Platform overview and analytics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-violet-500/30 transition-all shadow-sm"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`} />
            <div className="flex items-center gap-3 mb-3 text-zinc-500 dark:text-zinc-400">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white`}>
                {stat.icon}
              </div>
              <span className="text-xs uppercase tracking-wider font-medium">{stat.title}</span>
            </div>
            <span className="text-3xl font-bold font-orbitron tracking-wider text-zinc-900 dark:text-white">
              <AnimatedNumber value={stat.value} />
            </span>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1: User Growth + Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* User Growth Area Chart */}
        <div
          ref={(el) => (chartRefs.current[0] = el)}
          className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
        >
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wide">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={userGrowth} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#7C3AED"
                strokeWidth={2.5}
                fill="url(#userGradient)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Content Pie Chart */}
        <div
          ref={(el) => (chartRefs.current[1] = el)}
          className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
        >
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wide">Content Split</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Bar Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar Chart */}
        <div
          ref={(el) => (chartRefs.current[2] = el)}
          className="lg:col-span-1 bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
        >
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wide">Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={contentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                {contentData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div
          ref={(el) => (chartRefs.current[3] = el)}
          className="lg:col-span-2 flex flex-col gap-3"
        >
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 + 0.3 }}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-3 p-4 bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-violet-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group text-left shadow-sm"
              >
                <div className="p-2.5 bg-gradient-to-br from-violet-600 to-purple-400 rounded-xl text-white group-hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-shadow shrink-0">
                  {action.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors truncate">{action.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 truncate">{action.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        ref={(el) => (chartRefs.current[4] = el)}
        className="bg-white dark:bg-[#1E1E1E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
      >
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wide">Recent Activity</h3>
        <div className="flex flex-col gap-3">
          {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.5 }}
              className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 truncate">{activity.detail}</p>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-600 font-mono whitespace-nowrap">{activity.time}</span>
            </motion.div>
          )) : (
            <p className="text-sm text-zinc-500 text-center py-4">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}
