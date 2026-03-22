import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
      <Link to="/" className="mb-4 inline-block text-sm text-white/80 hover:text-white">← Back</Link>
      <h1 className="text-3xl font-bold text-white">Log in</h1>
      <p className="mt-2 text-sm text-white/80">Enter your email and password to access your account.</p>
      <form className="mt-5 space-y-3">
        <input className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-violet-300" type="email" placeholder="Email" required />
        <input className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-violet-300" type="password" placeholder="Password" required />
        <button className="w-full rounded-xl bg-white px-3 py-2 font-bold text-[#2d1d8b] hover:bg-slate-100" type="submit">Log in</button>
      </form>
      <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
        <Link className="hover:text-white" to="/password-recovery">Forgot password?</Link>
        <span>No account? <Link className="text-white font-bold" to="/register">Create an account</Link></span>
      </div>
    </div>
  )
}
