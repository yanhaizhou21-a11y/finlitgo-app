import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconShieldLock, IconMail, IconArrowRight } from '@tabler/icons-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'Doctor Solking',
    username: 'snickers_123',
    email: 'snickers@example.com',
    password: '*************'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl max-auto">
      <div>
        <h2 className="text-2xl font-bold font-orbitron uppercase tracking-widest">Pengaturan</h2>
        <p className="text-sm text-zinc-500 mt-2">Manage your profile and account settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Navigation / Profile Summary */}
        <div className="md:w-64 flex flex-col gap-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4"
           >
             <div className="w-24 h-24 rounded-full border-2 border-[var(--color-accent-green)] overflow-hidden relative group">
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                 <span className="text-xs uppercase tracking-wider font-bold">Edit</span>
               </div>
               <img src="https://i.pravatar.cc/150?u=snickers" alt="Profile" className="w-full h-full object-cover" />
             </div>
             
             <div>
               <h3 className="font-bold text-lg text-white">Doctor Solking</h3>
               <p className="text-sm text-zinc-500">Free Tier</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-2 flex flex-col gap-1"
           >
             <button className="flex items-center gap-3 w-full p-3 bg-zinc-800/50 text-[var(--color-accent-green)] rounded-xl transition-colors text-left font-medium text-sm">
               <IconUser size={18} /> Profil
             </button>
             <button className="flex items-center gap-3 w-full p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/30 rounded-xl transition-colors text-left font-medium text-sm">
               <IconShieldLock size={18} /> Keamanan
             </button>
             <button className="flex items-center gap-3 w-full p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/30 rounded-xl transition-colors text-left font-medium text-sm">
               <IconMail size={18} /> Notifikasi
             </button>
           </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-8"
        >
          <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
             <h3 className="text-xl font-medium">Informasi Profil</h3>
             <button className="px-6 py-2 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-lime-400 transition-all shadow-[0_4px_14px_0_rgba(202,255,51,0.2)]">
               Save Changes
             </button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Nama Lengkap</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-green)] transition-colors focus:shadow-[0_0_10px_rgba(202,255,51,0.1)]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-green)] transition-colors focus:shadow-[0_0_10px_rgba(202,255,51,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-green)] transition-colors focus:shadow-[0_0_10px_rgba(202,255,51,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono border-b border-zinc-800 pb-2 mb-2">Password & Security</label>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-zinc-800 rounded-lg text-zinc-400">
                     <IconShieldLock size={20} />
                   </div>
                   <div>
                     <h4 className="text-sm text-white font-medium">Ubah Password</h4>
                     <p className="text-xs text-zinc-500 font-mono mt-1">Terakhir diubah 3 bulan lalu</p>
                   </div>
                 </div>
                 <button className="text-[var(--color-accent-green)] hover:text-white transition-colors">
                   <IconArrowRight />
                 </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
