import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function VerifyPhone() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/create-new-password');
  };

  return (
    <AuthLayout backTo="/login">
      <h1 className="text-center text-[26px] font-semibold text-[#1f1f24]">Verify your phone number</h1>
      <p className="mx-auto mt-1 max-w-[220px] text-center text-[11px] text-[#747480]">
        We sent a verification code to +62********.
      </p>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <input
          className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
          type="text"
          placeholder="Enter verification code here"
          required
        />
        <button
          className="h-9 w-full rounded-full bg-[#d5d5dc] text-[11px] font-semibold text-[#4f4f5b] transition hover:bg-[#c8c8d2]"
          type="button"
        >
          Resend code
        </button>
        <button
          className="h-9 w-full rounded-full bg-[#d5d5dc] text-[11px] font-semibold text-[#4f4f5b] transition hover:bg-[#c8c8d2]"
          type="submit"
        >
          Verify
        </button>
      </form>

      <p className="mt-4 text-center text-[10px] text-[#80808b]">
        Did not have access to your phone?{' '}
        <Link to="/password-recovery" className="font-semibold text-[#2d2d36]">
          Click here
        </Link>
      </p>
    </AuthLayout>
  );
}
