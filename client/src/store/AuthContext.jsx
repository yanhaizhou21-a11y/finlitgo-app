import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, clearSupabaseBrowserSession } from '../services/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Full logout: sign out in client + wipe all Supabase auth keys in storage (refresh must stay logged out). */
  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      /* ignore */
    }
    clearSupabaseBrowserSession();
    setUser(null);
    setProfile(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
         setProfile(null);
         setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load profile from Supabase 'users' table 
  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (!error && data) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user?.id]);
  
  // Admin detection: role column or known admin email
  const isAdmin = profile?.role === 'admin' || user?.email === 'amrpendragon@gmail.com';
  
  // Profile completeness check: user account is registered in database
  const profileComplete = !!profile;

  // Function to refresh profile (e.g., after completing profile)
  const refreshProfile = async () => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, profileComplete, refreshProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
