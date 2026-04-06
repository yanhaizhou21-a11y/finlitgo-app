import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import InputField from './InputField';
import GoogleButton from './GoogleButton';

const SignIn = ({ onToggle, onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      onSuccess(userCredential.user);
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
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      onSuccess(userCredential.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0, x: -20, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, x: 0, position: 'relative', width: '100%' }}
      exit={{ opacity: 0, x: 20, position: 'absolute', width: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex flex-col w-full px-2"
    >
      <h2 className="text-4xl font-serif text-black mb-2 text-center md:text-left">Welcome Back</h2>
      <p className="text-sm text-gray-500 font-light mb-8 text-center md:text-left font-space">Enter your email and password to access your account</p>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-1 w-full">
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between w-full mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
              Remember me
            </label>
            <a href="#" className="text-sm text-gray-600 hover:text-black font-medium transition-colors font-space" onClick={(e) => e.preventDefault()}>Forgot Password</a>
          </div>
        </div>
        
        <button type="submit" disabled={loading} className="mt-4 w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 border border-transparent disabled:opacity-50 disabled:hover:-translate-y-0">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="flex items-center my-6 text-gray-500 text-sm">
        <div className="flex-1 border-b border-gray-200 mr-3"></div>
        or
        <div className="flex-1 border-b border-gray-200 ml-3"></div>
      </div>
      
      <GoogleButton onClick={handleGoogleLogin} disabled={loading} />

      <div className="text-center mt-6 text-sm text-gray-500">
        Don't have an account?{' '}
        <button type="button" className="text-black font-semibold hover:underline bg-transparent border-none p-0" onClick={onToggle} disabled={loading}>
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default SignIn;
