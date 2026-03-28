import { useState } from "react";

export default function LoginPage({ setPage, onAdminLogin, account }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === account.username && password === account.password) {
      onAdminLogin();
      setPage("admin");
      return;
    }

    alert("Wrong credentials.");
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access the admin panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setPage("register")}
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Create one
          </button>
        </div>
      </div>
    </section>
  );
}