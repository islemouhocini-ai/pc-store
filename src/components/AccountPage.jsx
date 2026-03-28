import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AccountPage({
  setPage,
  currentUser,
  currentProfile,
  setCurrentProfile,
  notify,
}) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(currentProfile?.full_name || "");
  const [email, setEmail] = useState(
    currentProfile?.email || currentUser?.email || ""
  );

  const handleSave = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!currentUser) {
      notify("No logged in user found.", "error", "Account error");
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      notify("Please fill in all fields.", "error", "Missing data");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          email: email.trim(),
        })
        .eq("id", currentUser.id);

      if (error) {
        notify(error.message, "error", "Update failed");
        return;
      }

      setCurrentProfile((prev) => ({
        ...(prev || {}),
        full_name: fullName.trim(),
        email: email.trim(),
      }));

      notify("Account updated successfully.", "success", "Saved");
      setPage("home");
    } catch (err) {
      console.error("ACCOUNT UPDATE ERROR:", err);
      notify(
        "Something went wrong while updating account.",
        "error",
        "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">Account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your account information
          </p>
        </div>

        <form onSubmit={handleSave} className="grid gap-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
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