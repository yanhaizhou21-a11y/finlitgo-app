import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ onClick }) => {
  return (
    <button 
      type="button" 
      className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-white border border-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
      onClick={onClick}
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
