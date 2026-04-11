import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../services/supabase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CompleteProfile from './CompleteProfile';
import { useAuth } from '../../store/AuthContext';

const ADMIN_EMAIL = 'amrpendragon@gmail.com';

const AuthContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profileComplete, isAdmin, loading: authLoading, refreshProfile } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const forceView = searchParams.get('view'); // e.g. ?view=complete
  
  // views: 'signin', 'signup', 'completeProfile'
  const [view, setView] = useState(() => {
    if (forceView === 'complete') return 'completeProfile';
    return location.pathname === '/register' ? 'signup' : 'signin';
  });

  // Handle returning users who are already logged in
  useEffect(() => {
    if (authLoading) return;
    
    // If user is logged in and lands on auth page
    if (user) {
      if ((forceView === 'complete' && !isAdmin) || (!profileComplete && !isAdmin)) {
        // Need to complete profile
        setView('completeProfile');
      } else {
        // Profile already complete, redirect to dashboard
        navigate(redirectTo, { replace: true });
      }
    }
  }, [user, profileComplete, isAdmin, authLoading, forceView, redirectTo, navigate]);

  useEffect(() => {
    if (view !== 'completeProfile') {
      setView(location.pathname === '/register' ? 'signup' : 'signin');
    }
  }, [location.pathname]);

  const toggleAuth = () => {
    const nextPath = view === 'signin' ? '/register' : '/login';
    navigate(`${nextPath}?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
  };

  const handleAuthSuccess = async (authUser) => {
    try {
      if (!authUser?.id) {
        navigate(redirectTo);
        return;
      }

      // Wait a moment for Supabase trigger to create profile row
      await new Promise(r => setTimeout(r, 500));
      
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        // Don't block login on profile read issues; fall back to role/email logic below.
        console.warn('Profile fetch warning after auth:', error.message);
      }

      // Check if user is registered in the database
      const hasRequiredProfile = !!userProfile;
      const isAdminByEmail = authUser?.email?.toLowerCase() === ADMIN_EMAIL;

      if (hasRequiredProfile || isAdminByEmail) {
        navigate(redirectTo);
      } else {
        setView('completeProfile');
      }
    } catch (error) {
       console.error("Auth success logic error:", error);
       setView('completeProfile');
    }
  };

  const handleProfileComplete = async () => {
    // Refresh the profile in AuthContext so profileComplete flag updates
    await refreshProfile();
    navigate(redirectTo);
  };

  return (
    <div className="w-full relative flex flex-col items-center mt-8 lg:mt-0">
      <AnimatePresence mode="wait" initial={false}>
        {view === 'signin' && (
          <SignIn key="signin" onToggle={toggleAuth} onSuccess={handleAuthSuccess} />
        )}
        {view === 'signup' && (
          <SignUp key="signup" onToggle={toggleAuth} onSuccess={handleAuthSuccess} />
        )}
        {view === 'completeProfile' && (
          <CompleteProfile key="completeProfile" onComplete={handleProfileComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthContainer;
