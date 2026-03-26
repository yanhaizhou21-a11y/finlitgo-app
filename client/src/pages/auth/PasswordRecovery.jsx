import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function PasswordRecovery() {
  return (
    <AuthLayout backTo="/login">
      <h1 className="text-center text-[26px] font-semibold text-[#1f1f24]">Password Recovery</h1>
      <p className="mx-auto mt-1 max-w-[220px] text-center text-[11px] text-[#747480]">
        Enter the email address or phone number of the account you want to change.
      </p>

      <form className="mt-6 space-y-3">
        <input
          className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
          type="email"
          placeholder="Email address or username"
          required
        />
        <button
          className="h-9 w-full rounded-full bg-[#d5d5dc] text-[11px] font-semibold text-[#4f4f5b] transition hover:bg-[#c8c8d2]"
          type="submit"
        >
          Next
        </button>
      </form>

      <p className="mt-4 text-center text-[10px] text-[#80808b]">
        <Link to="/verify-phone" className="underline hover:text-[#4f4f5b]">
          Use phone number instead
        </Link>
      </p>
    </AuthLayout>
  );
}
