import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ onClick }) => {
  return (
    <button 
      type="button" 
      className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-white/60 backdrop-blur-md border border-white/50 text-gray-800 rounded-full font-semibold hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
      onClick={onClick}
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
