import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur">
        <div className="text-2xl font-extrabold tracking-tight">FINLITGO</div>
        <nav className="flex items-center gap-6 text-sm font-medium text-white/90">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Class</a>
          <a href="#" className="hover:text-white">AI assist</a>
        </nav>
        <div className="flex gap-2">
          <Link to="/login" className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold hover:bg-white/10">Log In</Link>
          <Link to="/register" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2d1d8b] hover:bg-[#f2f2ff]">Sign Up</Link>
        </div>
      </header>

      <section className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur shadow-2xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">Manage Money In The Most Fun Way</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">Belajar literasi finansial sambil nge-track pemasukan, target, dan quiz seru — khusus Gen Z.</p>
          <div className="mt-7">
            <Link to="/register" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#2d1d8b] shadow-lg hover:bg-slate-100">Click now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
