import { Link } from 'react-router-dom';

export default function AuthLayout({ backTo = '/login', children }) {
  return (
    <section className="min-h-screen w-full bg-[radial-gradient(circle_at_50%_0%,#7c5cff_0%,#5229b8_28%,#24124e_62%,#080612_100%)] px-4 py-10 md:py-16 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Link
          to={backTo}
          state={{ noTransition: true }}
          className="mb-3 inline-flex items-center rounded-full bg-black/25 px-4 py-1 text-[11px] font-medium text-white/90 transition hover:bg-black/35"
        >
          &lt; Back
        </Link>

        <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#a698ff]/50 to-transparent" />
          <div className="relative">{children}</div>
        </div>
      </div>
    </section>
  );
}
