export default function RegisterPage({ setPage }) {
  return (
    <section className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Register a new account
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950">
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => setPage("login")}
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}