import { useState } from "react";

export default function AccountPage({ setPage, account, updateAccount }) {
  const [form, setForm] = useState({
    username: account.username || "admin",
    email: account.email || "admin@example.com",
    fullName: account.fullName || "Admin User",
    password: account.password || "admin",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !form.username.trim() ||
      !form.email.trim() ||
      !form.fullName.trim() ||
      !form.password.trim()
    ) {
      alert("Please fill in all account fields.");
      return;
    }

    updateAccount({
      username: form.username.trim(),
      email: form.email.trim(),
      fullName: form.fullName.trim(),
      password: form.password.trim(),
    });

    alert("Account updated successfully.");
    setPage("home");
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">Account Settings</h1>
          <p className="mt-2 text-sm text-slate-400">
            Update your admin account information
          </p>
        </div>

        <form onSubmit={handleSave} className="grid gap-4">
          <input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Full name"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Username"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Password"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              className="rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setPage("home")}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-semibold text-white"
            >
              Back Home
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}