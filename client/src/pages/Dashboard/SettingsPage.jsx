import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconBell, IconShieldLock, IconLock, IconCheck, IconX, IconChevronRight } from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabase';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [isPasswordless, setIsPasswordless] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    classReminders: true,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    loginAlerts: true,
  });

  const [privacyData, setPrivacyData] = useState({
    profileVisibility: 'private',
    showEmail: false,
    showProgress: true,
    allowPersonalization: true,
  });

  // Load profile from Firestore
  useEffect(() => {
    if (!user) return;
    
    // Detect if user is passwordless
    // Passwordless = tidak ada 'password' provider (login via email magic link, Google, GitHub, dll)
    const hasPasswordProvider = user.identities?.some(identity => identity.provider === 'password');
    setIsPasswordless(!hasPasswordProvider);
    
    // Debug log
    console.log('User identities:', user.identities);
    console.log('Has password provider:', hasPasswordProvider);
    console.log('Is passwordless:', !hasPasswordProvider);
    
    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (data) {
          setFormData({
            fullName: data.full_name || user.user_metadata?.full_name || '',
            username: data.full_name || '', // Supabase doesn't have username by default
            email: user.email || '',
          });
          if (data.avatar_url) setPhotoURL(data.avatar_url);
          // Assuming notifications, security, privacy are in JSON columns if you added them, or just skip if they aren't standard 
          // (For now, we'll keep the UI state as is to prevent crashing)
        } else {
          setFormData(prev => ({
            ...prev,
            email: user.email || '',
            fullName: user.user_metadata?.full_name || '',
          }));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      }
    };
    
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
    setError('');
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
    setSaved(false);
    setError('');
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
    setError('');
  };

  const handleSecurityToggle = (key) => {
    setSecurityData(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
    setError('');
  };

  const handlePrivacyToggle = (key) => {
    setPrivacyData(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
    setError('');
  };

  const handlePrivacyVisibilityChange = (value) => {
    setPrivacyData(prev => ({ ...prev, profileVisibility: value }));
    setSaved(false);
    setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('File harus berupa gambar.');
      return;
    }

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
      setPhotoError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    
    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (!formData.fullName.trim()) {
      setError('Nama lengkap tidak boleh kosong');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Save to Supabase 'users' table
      await supabase
        .from('users')
        .update({
          full_name: formData.fullName,
          avatar_url: photoURL
        })
        .eq('id', user.id);

      // Update auth profile
      await supabase.auth.updateUser({
        data: { full_name: formData.fullName, avatar_url: photoURL }
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (e) => {
    e?.preventDefault();
    
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          notifications: notifications,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving notifications:', err);
      setError(err.message || 'Failed to save notifications');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async (e) => {
    e?.preventDefault();

    if (!user) {
      setError('User not authenticated');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const wantsPasswordUpdate = Boolean(securityData.newPassword || securityData.confirmPassword);

      if (wantsPasswordUpdate) {
        // For passwordless users, only require new password
        if (isPasswordless) {
          if (!securityData.newPassword || !securityData.confirmPassword) {
            throw new Error('Lengkapi password baru.');
          }
          if (securityData.newPassword.length < 8) {
            throw new Error('Password minimal 8 karakter.');
          }
          if (securityData.newPassword !== securityData.confirmPassword) {
            throw new Error('Konfirmasi password tidak cocok.');
          }

          // Update password directly for passwordless users
          const { error } = await supabase.auth.updateUser({
            password: securityData.newPassword
          });
          
          if (error) throw error;
        } else {
          // For regular users, require current password verification
          if (!securityData.currentPassword) {
            throw new Error('Masukkan password saat ini untuk verifikasi.');
          }
          if (!securityData.newPassword || !securityData.confirmPassword) {
            throw new Error('Lengkapi password baru.');
          }
          if (securityData.newPassword.length < 8) {
            throw new Error('Password minimal 8 karakter.');
          }
          if (securityData.newPassword !== securityData.confirmPassword) {
            throw new Error('Konfirmasi password tidak cocok.');
          }

          // Reauthenticate with current password before updating
          const { error: reAuthError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: securityData.currentPassword
          });
          
          if (reAuthError) {
            throw new Error('Password saat ini salah.');
          }

          // Update password after successful reauthentication
          const { error } = await supabase.auth.updateUser({
            password: securityData.newPassword
          });
          
          if (error) throw error;
        }
      }

      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      const errorCode = err?.code || '';
      if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        setError('Password saat ini salah.');
      } else if (errorCode === 'auth/weak-password') {
        setError('Password baru terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.');
      } else if (errorCode === 'auth/requires-recent-login') {
        setError('Silakan login ulang dulu sebelum mengganti password.');
      } else {
        setError(err.message || 'Failed to save security settings');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSavePrivacy = async (e) => {
    e?.preventDefault();

    if (!user) {
      setError('User not authenticated');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          privacy: privacyData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving privacy settings:', err);
      setError(err.message || 'Failed to save privacy settings');
    } finally {
      setSaving(false);
    }
  };

  const displayName = formData.fullName || user?.displayName || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const accountOptions = [
    {
      id: 'profile-quick',
      tab: 'profile',
      label: 'Edit Profile',
      description: 'Update name, username, and photo',
      icon: IconUser,
      action: () => setActiveTab('profile'),
    },
    {
      id: 'notification-quick',
      tab: 'notifications',
      label: 'Notification Preferences',
      description: 'Manage email and class reminders',
      icon: IconBell,
      action: () => setActiveTab('notifications'),
    },
    {
      id: 'security',
      tab: 'security',
      label: 'Security',
      description: 'Password and account protection',
      icon: IconShieldLock,
      action: () => setActiveTab('security'),
    },
    {
      id: 'privacy',
      tab: 'privacy',
      label: 'Privacy',
      description: 'Control account visibility',
      icon: IconLock,
      action: () => setActiveTab('privacy'),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-zinc-400 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2 text-sm"
        >
          <IconX size={18} />
          {error}
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex flex-col gap-4">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center gap-4"
          >
            <input
              id="profile-photo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-2 border-violet-500/50 overflow-hidden shadow-lg shadow-violet-500/20">
                <label
                  htmlFor="profile-photo-input"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
                >
                  <span className="text-xs uppercase tracking-wider font-bold text-white">Change</span>
                </label>
                {photoURL ? (
                  <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{initial}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-white">{displayName}</h3>
              <p className="text-sm text-zinc-400">{user?.email}</p>
            </div>

            {photoError && <p className="text-xs text-red-400">{photoError}</p>}
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="px-2 pb-2 border-b border-zinc-800/70">
              <h4 className="text-sm font-semibold text-white">Account Settings</h4>
              <p className="text-xs text-zinc-500 mt-1">Quick access to account controls</p>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              {accountOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeTab === option.tab;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={option.action}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                      isActive
                        ? 'text-white bg-zinc-800/70 border border-violet-500/30'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isActive
                          ? 'border-violet-500/40 bg-violet-500/20 text-violet-300'
                          : 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                      }`}>
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{option.label}</p>
                        <p className="text-xs text-zinc-500 truncate">{option.description}</p>
                      </div>
                    </div>

                    <IconChevronRight size={16} className={isActive ? 'text-violet-300' : 'text-zinc-500'} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 md:p-8"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
                <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                {saved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <IconCheck size={18} /> Saved
                  </motion.div>
                )}
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-500 cursor-not-allowed opacity-60"
                />
                <p className="text-xs text-zinc-500">Email cannot be changed as it's linked to your Firebase account.</p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="mt-4 bg-gradient-to-r from-violet-600 to-purple-400 hover:from-violet-700 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <IconCheck size={18} /> Save Changes
                  </>
                )}
              </button>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveNotifications} className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                {saved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <IconCheck size={18} /> Saved
                  </motion.div>
                )}
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                  <p className="text-xs text-zinc-400 mt-1">Receive email notifications about your account</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailNotifications ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Course Updates */}
              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Course Updates</h4>
                  <p className="text-xs text-zinc-400 mt-1">Get notified about new course content and updates</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('courseUpdates')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.courseUpdates ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.courseUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Class Reminders */}
              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Class Reminders</h4>
                  <p className="text-xs text-zinc-400 mt-1">Receive reminders for upcoming class sessions</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('classReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.classReminders ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.classReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="mt-4 bg-gradient-to-r from-violet-600 to-purple-400 hover:from-violet-700 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <IconCheck size={18} /> Save Preferences
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handleSaveSecurity} className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
                <h3 className="text-lg font-semibold text-white">Security</h3>
                {saved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <IconCheck size={18} /> Saved
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-1">Change Password</h4>
                <p className="text-xs text-zinc-400">
                  {isPasswordless 
                    ? 'Set password untuk akun Anda. Kamu bisa login dengan email + password setelah ini.'
                    : 'Isi field di bawah kalau kamu ingin ganti password akun.'
                  }
                </p>
              </div>

              {/* Only show current password field for users with existing password */}
              {!isPasswordless && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    placeholder="Enter current password"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    placeholder="Min. 8 characters"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    placeholder="Repeat new password"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Login Alerts</h4>
                  <p className="text-xs text-zinc-400 mt-1">Terima notifikasi saat ada login dari perangkat baru.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSecurityToggle('loginAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    securityData.loginAlerts ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securityData.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-4 bg-gradient-to-r from-violet-600 to-purple-400 hover:from-violet-700 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <IconCheck size={18} /> Save Security
                  </>
                )}
              </button>
            </form>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <form onSubmit={handleSavePrivacy} className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
                <h3 className="text-lg font-semibold text-white">Privacy</h3>
                {saved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <IconCheck size={18} /> Saved
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Profile Visibility</label>
                <select
                  value={privacyData.profileVisibility}
                  onChange={(e) => handlePrivacyVisibilityChange(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                >
                  <option value="private">Private (only you)</option>
                  <option value="friends">Friends only</option>
                  <option value="public">Public</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Show Email on Profile</h4>
                  <p className="text-xs text-zinc-400 mt-1">Tampilkan email ke pengguna lain sesuai visibilitas profil.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePrivacyToggle('showEmail')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacyData.showEmail ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacyData.showEmail ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Show Learning Progress</h4>
                  <p className="text-xs text-zinc-400 mt-1">Izinkan pengguna lain melihat progress kelas kamu.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePrivacyToggle('showProgress')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacyData.showProgress ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacyData.showProgress ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">Personalized Recommendations</h4>
                  <p className="text-xs text-zinc-400 mt-1">Gunakan aktivitas akun untuk rekomendasi kelas dan konten yang relevan.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePrivacyToggle('allowPersonalization')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacyData.allowPersonalization ? 'bg-violet-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacyData.allowPersonalization ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-4 bg-gradient-to-r from-violet-600 to-purple-400 hover:from-violet-700 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <IconCheck size={18} /> Save Privacy
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
