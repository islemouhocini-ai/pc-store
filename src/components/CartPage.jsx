import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage({ cart, setCart, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const increase = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  const decrease = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-black text-white">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-400">
                Your cart is currently empty
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/40 p-4 md:grid-cols-[110px_1fr_auto] md:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-full rounded-2xl object-cover"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <div className="mt-2 text-sm text-slate-400">{item.price.toLocaleString()} DZD</div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => increase(item.id)}
                      className="rounded-xl border border-white/10 bg-white/5 p-2"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-white">{item.qty}</span>
                    <button
                      onClick={() => decrease(item.id)}
                      className="rounded-xl border border-white/10 bg-white/5 p-2"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="h-fit rounded-[32px] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-black text-white">Order Summary</h3>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>{total.toLocaleString()} DZD</span>
              <span>Subtotal</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{total > 0 ? 1200 : 0} DZD</span>
              <span>Shipping</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between text-base font-bold text-white">
              <span>{total > 0 ? total + 1200 : 0} DZD</span>
              <span>Total</span>
            </div>
          </div>
          <button
            onClick={() => setPage("checkout")}
            className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}