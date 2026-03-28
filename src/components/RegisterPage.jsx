import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage({ setPage, notify }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      notify("Please fill in all fields.", "error", "Missing data");
      return;
    }

    if (password !== confirmPassword) {
      notify("Passwords do not match.", "error", "Invalid input");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        notify(error.message, "error", "Registration failed");
        return;
      }

      if (!data.user) {
        notify("User was not created.", "error", "Registration failed");
        return;
      }

      notify(
        "Account created successfully. You can now sign in.",
        "success",
        "Account created"
      );
      setPage("login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      notify(
        "Something went wrong during sign up.",
        "error",
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Register a real user account
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

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