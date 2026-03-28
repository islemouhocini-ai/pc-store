import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage({ setPage, onUserLogin, notify }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!emailOrUsername.trim() || !password.trim()) {
      notify("Please fill in all fields.", "error", "Missing data");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("LOGIN ERROR:", error);
        notify(error.message, "error", "Login failed");
        return;
      }

      if (!data?.user) {
        notify("Login failed.", "error", "Login failed");
        return;
      }

      await onUserLogin(data.user);
      notify("Signed in successfully.", "success", "Welcome back");
      setPage("home");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      notify(
        "Something went wrong while signing in.",
        "error",
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Email address"
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
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
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