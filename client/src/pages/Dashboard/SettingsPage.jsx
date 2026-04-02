import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconShieldLock, IconMail, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { updateProfile } from 'firebase/auth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photoError, setPhotoError] = useState('');

  // Load profile from Firestore
  useEffect(() => {
    if (!user) return;
    setFormData(prev => ({
      ...prev,
      email: user.email || '',
      fullName: user.displayName || '',
    }));
    setPhotoURL(user.photoURL || '');

    const loadProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            fullName: data.fullName || data.username || user.displayName || '',
            username: data.username || '',
            email: user.email || '',
          });
          if (data.photoUrl) setPhotoURL(data.photoUrl);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('File harus berupa gambar.');
      return;
    }

    // Keep profile photo payload lightweight for Firestore doc size limits.
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Ukuran gambar maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setPhotoURL(result);
      setPhotoError('');
      setSaved(false);
    };
    reader.onerror = () => {
      setPhotoError('Gagal membaca file gambar. Coba lagi.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        photoUrl: photoURL,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      await updateProfile(user, {
        displayName: formData.fullName || formData.username || user.displayName || '',
        photoURL: photoURL || null,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
    setSaving(false);
  };

  const displayName = formData.fullName || formData.username || user?.displayName || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-orbitron uppercase tracking-widest">Pengaturan</h2>
        <p className="text-sm text-zinc-500 mt-2">Manage your profile and account settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Profile Summary */}
        <div className="md:w-64 flex flex-col gap-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4"
           >
             <input
               id="profile-photo-input"
               type="file"
               accept="image/*"
               className="hidden"
               onChange={handlePhotoChange}
             />
             <div className="w-24 h-24 rounded-full border-2 border-violet-500/50 overflow-hidden relative group shadow-[0_0_20px_rgba(124,58,237,0.2)]">
               <label htmlFor="profile-photo-input" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                 <span className="text-xs uppercase tracking-wider font-bold">Edit</span>
               </label>
               {photoURL ? (
                 <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center">
                   <span className="text-3xl font-bold text-white">{initial}</span>
                 </div>
               )}
             </div>

             <div>
               <h3 className="font-bold text-lg text-white">{displayName}</h3>
               <p className="text-sm text-zinc-500">{user?.email}</p>
               <p className="text-xs text-zinc-600 mt-1">Klik avatar untuk ganti foto.</p>
               {photoError && <p className="text-xs text-red-400 mt-2">{photoError}</p>}
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-2 flex flex-col gap-1"
           >
             <button className="flex items-center gap-3 w-full p-3 bg-zinc-800/50 text-violet-400 rounded-xl transition-colors text-left font-medium text-sm">
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
             <button 
               onClick={handleSave}
               disabled={saving}
               className={`px-6 py-2 font-bold uppercase tracking-wider text-sm rounded-lg transition-all flex items-center gap-2 ${
                 saved 
                   ? 'bg-green-500 text-white' 
                   : 'bg-gradient-to-r from-violet-600 to-purple-400 text-white hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.3)]'
               }`}
             >
               {saving ? (
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
               ) : saved ? (
                 <><IconCheck size={16} /> Saved</>
               ) : (
                 'Save Changes'
               )}
             </button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Nama Lengkap</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors focus:shadow-[0_0_10px_rgba(124,58,237,0.1)]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors focus:shadow-[0_0_10px_rgba(124,58,237,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-500 focus:outline-none cursor-not-allowed"
              />
              <span className="text-xs text-zinc-600">Email tidak bisa diubah karena terhubung dengan akun Firebase.</span>
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
                     <p className="text-xs text-zinc-500 font-mono mt-1">Managed by Firebase Auth</p>
                   </div>
                 </div>
                 <button className="text-violet-400 hover:text-white transition-colors">
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
