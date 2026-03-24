import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthContainer = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/register');

  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
  }, [location.pathname]);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="w-full relative flex flex-col items-center mt-8 lg:mt-0">
      <AnimatePresence mode="wait" initial={false}>
        {isLogin ? (
          <SignIn key="signin" onToggle={toggleAuth} />
        ) : (
          <SignUp key="signup" onToggle={toggleAuth} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthContainer;
