import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconBell, IconShieldLock, IconLock, IconCheck, IconX, IconChevronRight } from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { updateProfile } from 'firebase/auth';

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

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    classReminders: true,
  });

  // Load profile from Firestore
  useEffect(() => {
    if (!user) return;
    
    const loadProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            fullName: data.fullName || user.displayName || '',
            username: data.username || '',
            email: user.email || '',
          });
          if (data.photoUrl) setPhotoURL(data.photoUrl);
          if (data.notifications) {
            setNotifications(data.notifications);
          }
        } else {
          setFormData(prev => ({
            ...prev,
            email: user.email || '',
            fullName: user.displayName || '',
          }));
          setPhotoURL(user.photoURL || '');
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
      // Save to Firestore
      await setDoc(
        doc(db, 'users', user.uid),
        {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          photoUrl: photoURL,
          notifications: notifications,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      // Update auth profile
      await updateProfile(user, {
        displayName: formData.fullName,
        photoURL: photoURL || null,
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

  const displayName = formData.fullName || user?.displayName || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const accountOptions = [
    {
      id: 'profile-quick',
      label: 'Edit Profile',
      description: 'Update name, username, and photo',
      icon: IconUser,
      action: () => setActiveTab('profile'),
    },
    {
      id: 'notification-quick',
      label: 'Notification Preferences',
      description: 'Manage email and class reminders',
      icon: IconBell,
      action: () => setActiveTab('notifications'),
    },
    {
      id: 'security',
      label: 'Security',
      description: 'Password and account protection',
      icon: IconShieldLock,
      action: null,
    },
    {
      id: 'privacy',
      label: 'Privacy',
      description: 'Control account visibility',
      icon: IconLock,
      action: null,
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
                const isInactive = !option.action;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={option.action || undefined}
                    disabled={isInactive}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                      isInactive
                        ? 'cursor-not-allowed text-zinc-500 hover:bg-zinc-800/20'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isInactive
                          ? 'border-zinc-700/60 bg-zinc-900/40 text-zinc-500'
                          : 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                      }`}>
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{option.label}</p>
                        <p className="text-xs text-zinc-500 truncate">{option.description}</p>
                      </div>
                    </div>

                    <IconChevronRight size={16} className={isInactive ? 'text-zinc-700' : 'text-zinc-500'} />
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
        </motion.div>
      </div>
    </div>
  );
}
