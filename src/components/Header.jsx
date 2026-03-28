import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, User, Shield, ChevronDown } from "lucide-react";

export default function Header({
  cartCount,
  page,
  setPage,
  cartPulse,
  currentUser,
  currentProfile,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const links = [
    ["Home", "home"],
    ["Shop", "shop"],
    ["Product", "product"],
    ["Cart", "cart"],
    ["Checkout", "checkout"],
  ];

  const isLoggedIn = !!currentUser;
  const isAdmin = currentProfile?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-4 py-4 md:px-6">
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div>
          <div className="text-2xl font-black tracking-tight text-white">
            NOKHBAT PC
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Elite hardware for serious builds
          </div>
        </div>

        <div className="hidden items-center justify-center md:flex">
          <nav className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2">
            {links.map(([label, key]) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  page === key
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.14)]"
                    : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <div className="relative" ref={accountMenuRef}>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setAccountMenuOpen((prev) => !prev);
                } else {
                  setPage("login");
                }
              }}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-lg shadow-black/20 transition hover:bg-white/[0.08]"
            >
              {isAdmin ? (
                <Shield className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}

              {isLoggedIn ? (
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    accountMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              ) : null}
            </button>

            {isLoggedIn && accountMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 rounded-2xl border border-cyan-400/20 bg-slate-900/80 p-2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,8,23,0.55)]">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      setPage("admin");
                      setAccountMenuOpen(false);
                    }}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Edit Products
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    setPage("account");
                    setAccountMenuOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Account
                </button>

                <button
                  onClick={async () => {
                    setAccountMenuOpen(false);
                    await onLogout();
                  }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setPage("cart")}
            className={`relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-lg shadow-black/20 transition hover:bg-white/[0.08] ${
              cartPulse
                ? "scale-110 shadow-[0_0_28px_rgba(34,211,238,0.22)]"
                : "scale-100"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span
              className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950 transition ${
                cartPulse ? "scale-125" : "scale-100"
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(([label, key]) => (
              <button
                key={key}
                onClick={() => {
                  setPage(key);
                  setOpen(false);
                }}
                className={`rounded-xl border px-4 py-2 text-left text-sm ${
                  page === key
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setPage("login");
                  setOpen(false);
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-slate-200"
              >
                Login
              </button>
            ) : (
              <>
                {isAdmin ? (
                  <button
                    onClick={() => {
                      setPage("admin");
                      setOpen(false);
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-slate-200"
                  >
                    Edit Products
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    setPage("account");
                    setOpen(false);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-slate-200"
                >
                  Account
                </button>

                <button
                  onClick={async () => {
                    setOpen(false);
                    await onLogout();
                  }}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-left text-sm text-red-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}