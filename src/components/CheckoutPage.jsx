import { useEffect, useRef, useState } from "react";
import { CreditCard, Check, ChevronDown } from "lucide-react";

export default function CheckoutPage() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const paymentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentRef.current && !paymentRef.current.contains(event.target)) {
        setPaymentOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paymentOptions = [
    "Cash on delivery",
    "Credit card",
    "Bank transfer",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3 text-cyan-300">
            <CreditCard className="h-5 w-5" />
            <span className="font-bold">Checkout</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Full name"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Phone number"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 md:col-span-2"
              placeholder="Email address"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 md:col-span-2"
              placeholder="Full address"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="State / Province"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="City"
            />

            <div className="relative md:col-span-2" ref={paymentRef}>
              <button
                type="button"
                onClick={() => setPaymentOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-2xl border border-cyan-400/20 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.08)]"
              >
                <span>{paymentMethod}</span>
                <ChevronDown
                  className={`h-4 w-4 text-cyan-300 transition ${
                    paymentOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {paymentOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,8,23,0.55)]">
                  {paymentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(option);
                        setPaymentOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        paymentMethod === option
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span>{option}</span>
                      {paymentMethod === option ? (
                        <Check className="h-4 w-4" />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950">
            Place Order
          </button>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-left">
          <h3 className="text-xl font-black text-white">Design Notes</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>• This checkout page is a frontend demo layout.</li>
            <li>• It can be connected later to a backend and database.</li>
            <li>• Coupons, shipping methods, and user accounts can be added later.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}