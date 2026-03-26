import { useState } from 'react';
import AuthLayout from './AuthLayout';

export default function CreateNewPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout backTo="/verify-phone">
      <h1 className="text-center text-[26px] font-semibold text-[#1f1f24]">Create a new password</h1>

      <form className="mt-8 space-y-4">
        <div>
          <input
            className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-end text-[11px] font-medium text-[#8b8b96]">
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[#9a9aa6] hover:text-[#777784]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <path d="M12 5.5c4.7 0 7.94 4.5 7.94 4.5s-3.24 4.5-7.94 4.5S4.06 10 4.06 10 7.3 5.5 12 5.5Zm0 1.5A3 3 0 1 0 12 13a3 3 0 0 0 0-6Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <path d="M2.1 3.5 1 4.6l4.2 4.2A10.56 10.56 0 0 0 1.5 12s3.8 6 10.5 6c2.19 0 4.1-.64 5.7-1.6l4.2 4.2 1.1-1.1L2.1 3.5Zm9.9 4A4.5 4.5 0 0 1 16.5 12c0 .95-.3 1.83-.8 2.56l-1.2-1.2c.3-.4.5-.87.5-1.36A2.99 2.99 0 0 0 12 9c-.5 0-.97.2-1.37.5L9.4 8.3c.74-.5 1.64-.8 2.6-.8Zm0-3.5C5.3 4 1.5 10 1.5 10s1.36 2.15 3.7 3.9l1.16-1.16A8.47 8.47 0 0 1 4.06 10 8.86 8.86 0 0 1 12 5.5c4.7 0 7.94 4.5 7.94 4.5a14.5 14.5 0 0 1-2.1 2.61L19 13.77A16.1 16.1 0 0 0 22.5 10S18.7 4 12 4Z" />
                </svg>
              )}
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            className="h-9 w-full rounded-md border border-[#e3e3ea] bg-white px-3 text-[11px] text-[#1f1f24] outline-none placeholder:text-[#9a9aa6] focus:border-[#8b79ff]"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            required
          />
        </div>

        <button
          className="mt-2 h-9 w-full rounded-full bg-[#bdbdc4] text-[11px] font-semibold text-[#f1f1f5] transition hover:bg-[#adadb6]"
          type="submit"
        >
          Done
        </button>
      </form>
    </AuthLayout>
  );
}
