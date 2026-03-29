import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CompleteProfile from './CompleteProfile';

const AuthContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // views: 'signin', 'signup', 'completeProfile'
  const [view, setView] = useState(location.pathname === '/register' ? 'signup' : 'signin');

  useEffect(() => {
    if (view !== 'completeProfile') {
      setView(location.pathname === '/register' ? 'signup' : 'signin');
    }
  }, [location.pathname, view]);

  const toggleAuth = () => setView(view === 'signin' ? 'signup' : 'signin');

  const handleAuthSuccess = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().username && userSnap.data().dateOfBirth) {
        // User profile is already complete
        navigate('/');
      } else {
        // Needs profile completion
        setView('completeProfile');
      }
    } catch (error) {
       console.error("Error fetching user data:", error);
       alert("Firestore Error: Be sure you created a Firestore DB in your Firebase Console! Error: " + error.message);
       setView('completeProfile');
    }
  };

  const handleProfileComplete = () => {
    navigate('/');
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
