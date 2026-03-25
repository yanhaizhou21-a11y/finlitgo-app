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
          className="w-full px-4 py-3 border border-gray-100 bg-[#F9FAFB] rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-300 placeholder-gray-400"
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
