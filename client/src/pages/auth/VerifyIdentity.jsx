import { Link } from 'react-router-dom'

export default function VerifyIdentity() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
      <Link to="/login" className="mb-4 inline-block text-sm text-white/80 hover:text-white">← Back</Link>
      <h1 className="text-3xl font-bold text-white">Verify your identity</h1>
      <p className="mt-2 text-sm text-white/80">Enter verification details to continue.</p>
      <form className="mt-5 space-y-3">
        <input className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-violet-300" type="text" placeholder="Government ID number" required />
        <input className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-violet-300" type="text" placeholder="Birth date" required />
        <button className="w-full rounded-xl bg-white px-3 py-2 font-bold text-[#2d1d8b] hover:bg-slate-100" type="submit">Send code</button>
      </form>
      <p className="mt-3 text-sm text-white/80">Code sent to your email/phone.</p>
    </div>
  )
}
