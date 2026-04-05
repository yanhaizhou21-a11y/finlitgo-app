import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IconLayoutDashboard, 
  IconChartBar, 
  IconHistory, 
  IconSettings, 
  IconLogout,
  IconSchool
} from '@tabler/icons-react';
import logoUrl from '../../assets/logo.svg';
import { useAuth } from '../../store/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const AnimatedNavItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink 
      to={to}
      end
      className={({ isActive }) => 
        `relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-all duration-300 group ${
          isActive 
            ? 'bg-gradient-to-br from-violet-600 to-purple-400 text-white shadow-lg shadow-violet-500/30' 
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
        }`
      }
      title={label}
    >
      <Icon size={24} stroke={1.5} />
      {/* Tooltip */}
      <span className="absolute left-16 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {label}
      </span>
    </NavLink>
  );
};

export default function Sidebar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const photoURL = profile?.photoUrl || user?.photoURL || `https://i.pravatar.cc/150?u=${user?.email}`;

  return (
    <motion.aside 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-20 min-h-screen bg-[var(--color-primary-dark)] flex flex-col items-center py-6 border-r border-zinc-800 shrink-0 sticky top-0"
    >
      {/* Logo → Landing Page */}
      <div 
        className="mb-10 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-zinc-900 border border-violet-500/30 cursor-pointer hover:border-violet-400 transition-colors hover:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
        onClick={() => navigate('/')}
        title="Go to Home"
      >
        <img src={logoUrl} alt="FinLitGo" className="w-10 h-10 object-contain" />
      </div>

      <nav className="flex-1 flex flex-col items-center gap-2 w-full">
        <AnimatedNavItem to="/dashboard" icon={IconLayoutDashboard} label="Dashboard" />
        <AnimatedNavItem to="/dashboard/finance" icon={IconChartBar} label="Financial" />
        <AnimatedNavItem to="/dashboard/history" icon={IconHistory} label="History" />
        <AnimatedNavItem to="/dashboard/classes" icon={IconSchool} label="My Classes" />
      </nav>

      <div className="mt-auto w-full flex flex-col items-center gap-2">
        <AnimatedNavItem to="/dashboard/settings" icon={IconSettings} label="Settings" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <IconLogout size={22} stroke={1.5} />
          <span className="absolute left-16 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Logout
          </span>
        </button>

        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full border-2 border-zinc-700 overflow-hidden hover:border-violet-400 transition-colors mt-1 group cursor-pointer" onClick={() => navigate('/dashboard/settings')}>
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.aside>
  );
}
