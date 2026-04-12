import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';
import InputField from './InputField';
import GoogleButton from './GoogleButton';
import { getClientBaseUrl } from '../../services/authservice';

const SignUp = ({ onToggle, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                full_name: formData.name,
            }
        }
      });
      if (error) throw error;

      // When email confirmations are enabled, Supabase returns a user with no identities if the email already exists
      if (data?.user?.identities?.length === 0) {
        throw new Error('Email already registered. Please sign in instead.');
      }

      // Check if email confirmation is required (session is null)
      if (!data.session) {
        setIsSuccess(true);
      } else {
        onSuccess(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getClientBaseUrl()}/dashboard`
        }
      });
      if (error) throw error;
      // Note: signInWithOAuth redirects, so this won't synchronously call onSuccess.
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        key="signup-success"
        initial={{ opacity: 0, scale: 0.95, position: 'absolute', width: '100%' }}
        animate={{ opacity: 1, scale: 1, position: 'relative', width: '100%' }}
        exit={{ opacity: 0, scale: 0.95, position: 'absolute', width: '100%' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex flex-col w-full px-2 items-center text-center mt-8"
      >
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif text-black mb-4">Check your email</h2>
        <p className="text-sm text-gray-500 font-light mb-8 max-w-sm font-space">
          We've sent a verification link to <span className="font-medium text-black">{formData.email}</span>. 
          Please click the link to confirm your account before signing in.
        </p>
        
        <button 
          onClick={onToggle}
          className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md"
        >
          Proceed to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: 20, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, x: 0, position: 'relative', width: '100%' }}
      exit={{ opacity: 0, x: -20, position: 'absolute', width: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col w-full px-2"
    >
      <h2 className="text-4xl font-serif text-black mb-2 text-center md:text-left">Create Account</h2>
      <p className="text-sm text-gray-500 font-light mb-8 text-center md:text-left font-space">Sign up to get started.</p>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <button type="submit" disabled={loading} className="mt-2 w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 border border-transparent disabled:opacity-50 disabled:hover:-translate-y-0">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center my-6 text-gray-500 text-sm">
        <div className="flex-1 border-b border-gray-200 mr-3"></div>
        or
        <div className="flex-1 border-b border-gray-200 ml-3"></div>
      </div>
      
      <GoogleButton onClick={handleGoogleLogin} disabled={loading} />

      <div className="text-center mt-6 text-sm text-gray-500">
        Already have an account?{' '}
        <button type="button" className="text-black font-semibold hover:underline bg-transparent border-none p-0" onClick={onToggle} disabled={loading}>
          Sign In
        </button>
      </div>
    </motion.div>
  );
};

export default SignUp;
