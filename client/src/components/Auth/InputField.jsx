import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputField = ({ label, type = 'text', name, placeholder, value, onChange, required = true }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-2 relative text-left w-full">
      {label && <label className="text-sm font-medium text-gray-700/80" htmlFor={name}>{label}</label>}
      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0ea5a4]/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none p-1"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
