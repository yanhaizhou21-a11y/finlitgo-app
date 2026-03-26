import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  return (
    <AuthLayout backTo="/">
      <h1 className="text-center text-[28px] font-semibold text-[#1f1f24]">Log in</h1>
      <p className="mt-1 text-center text-[11px] text-[#747480]">
        No account?{' '}
        <Link to="/register" className="font-semibold text-[#2d2d36] underline">
          Sign up
        </Link>
      </p>

      <form className="mt-5 space-y-3">
        <input
          className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
          type="email"
          placeholder="Email address or username"
          required
        />
        <input
          className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
          type="password"
          placeholder="Password"
          required
        />

        <div className="flex items-center justify-between text-[10px] text-[#777784]">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" className="h-3 w-3" />
            Remember me
          </label>
          <Link to="/password-recovery" className="hover:text-[#1f1f24]">
            Forgot password?
          </Link>
        </div>

        <button
          className="h-9 w-full rounded-full bg-[#d5d5dc] text-[11px] font-semibold text-[#4f4f5b] transition hover:bg-[#c8c8d2]"
          type="submit"
        >
          Log in
        </button>
      </form>

      <div className="my-3 text-center text-[10px] text-[#8a8a96]">OR</div>

      <div className="space-y-2">
        <button className="h-8 w-full rounded-full border border-[#dedee6] bg-white text-[10px] text-[#4e4e59] transition hover:bg-[#f7f7fb]" type="button">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.24 1.25-.96 2.3-2.04 3l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.5 0-.72-.06-1.4-.2-2.06H12Z" />
              <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.44l-3.3-2.56c-.92.62-2.1.99-3.33.99-2.56 0-4.73-1.72-5.5-4.03l-3.4 2.62A9.99 9.99 0 0 0 12 22Z" />
              <path fill="#4A90E2" d="M6.5 13.96a5.98 5.98 0 0 1 0-3.92L3.1 7.42a9.99 9.99 0 0 0 0 9.16l3.4-2.62Z" />
              <path fill="#FBBC05" d="M12 5.96c1.47 0 2.8.5 3.84 1.47l2.88-2.88C16.97 2.92 14.7 2 12 2a9.99 9.99 0 0 0-8.9 5.42l3.4 2.62c.77-2.31 2.94-4.08 5.5-4.08Z" />
            </svg>
            Continue with Google
          </span>
        </button>
        <button className="h-8 w-full rounded-full border border-[#dedee6] bg-white text-[10px] text-[#4e4e59] transition hover:bg-[#f7f7fb]" type="button">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#1877F2]" aria-hidden="true">
              <path d="M13.5 21.5v-8h2.7l.4-3h-3.1V8.6c0-.87.24-1.46 1.5-1.46h1.7V4.46c-.3-.04-1.33-.12-2.54-.12-2.51 0-4.23 1.53-4.23 4.34v1.82H7v3h2.87v8h3.63Z" />
            </svg>
            Continue with Facebook
          </span>
        </button>
        <button className="h-8 w-full rounded-full border border-[#dedee6] bg-white text-[10px] text-[#4e4e59] transition hover:bg-[#f7f7fb]" type="button">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#111111]" aria-hidden="true">
              <path d="M16.24 12.31c.02 2.33 2.05 3.11 2.07 3.12-.02.06-.32 1.08-1.05 2.15-.63.92-1.28 1.83-2.31 1.85-1.01.02-1.34-.6-2.5-.6s-1.53.58-2.48.62c-.99.04-1.75-.99-2.39-1.9-1.3-1.87-2.3-5.29-.96-7.63.66-1.16 1.84-1.89 3.12-1.91.98-.02 1.9.66 2.5.66.6 0 1.72-.82 2.9-.7.49.02 1.88.2 2.77 1.5-.07.04-1.66.97-1.65 2.84Zm-1.98-7.62c.53-.64.88-1.53.78-2.42-.77.03-1.7.51-2.25 1.15-.49.57-.92 1.48-.8 2.35.86.07 1.74-.43 2.27-1.08Z" />
            </svg>
            Continue with Apple
          </span>
        </button>
      </div>

    </AuthLayout>
  );
}
