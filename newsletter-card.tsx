export function NewsletterCard() {
  return (
    <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-8">
      <h3 className="text-2xl font-semibold text-white">Get AI news without the noise</h3>
      <p className="mt-3 max-w-2xl text-slate-300">
        Use this block as your newsletter or Beehiiv/ConvertKit embed later. For now, it is ready for wiring.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
        />
        <button className="rounded-xl bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
          Subscribe
        </button>
      </div>
    </div>
  );
}
