import { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from './InputField';
import GoogleButton from './GoogleButton';

const SignIn = ({ onToggle }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with', formData);
  };

  const handleGoogleLogin = () => {
    alert('Logged in with Google');
  };

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0, x: -20, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, x: 0, position: 'relative', width: '100%' }}
      exit={{ opacity: 0, x: 20, position: 'absolute', width: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col w-full"
    >
      <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
      <p className="text-sm text-gray-300 font-light mb-8">Please enter your details to sign in.</p>

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
          <a href="#" className="text-right text-sm text-[#0ea5a4] hover:text-[#0c8f8e] hover:underline mt-1" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>
        
        <button type="submit" className="mt-2 w-full py-3.5 px-4 bg-[#0ea5a4] hover:bg-[#0c8f8e] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_8px_16px_rgba(14,165,164,0.3)] hover:-translate-y-0.5 border border-transparent">
          Sign In
        </button>
      </form>

      <div className="flex items-center my-6 text-gray-300 text-sm">
        <div className="flex-1 border-b border-white/20 mr-3"></div>
        or
        <div className="flex-1 border-b border-white/20 ml-3"></div>
      </div>
      
      <GoogleButton onClick={handleGoogleLogin} />

      <div className="text-center mt-6 text-sm text-gray-300">
        Don't have an account?{' '}
        <button className="text-[#0ea5a4] font-semibold hover:underline bg-transparent border-none p-0" onClick={onToggle}>
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default SignIn;
