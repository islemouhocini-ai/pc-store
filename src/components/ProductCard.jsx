import { useState } from "react";
import { Star, Check } from "lucide-react";
import { formatDZD } from "../data/storeData";

export default function ProductCard({ item, addToCart, onView }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <div className="flex h-full min-h-[620px] flex-col rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-cyan-400/30">
      <img
        src={item.image}
        alt={item.name}
        className="mb-4 h-48 w-full rounded-3xl object-cover object-center"
      />

      <div className="mb-3 flex items-center justify-between gap-2 text-xs">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 font-medium text-cyan-300">
          {item.badge}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-amber-300">
          <Star className="h-3.5 w-3.5 fill-current" /> {item.rating}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white">{item.name}</h3>
      <p className="mt-2 min-h-[96px] text-sm leading-7 text-slate-400">
        {item.short}
      </p>

      <div className="mt-3 flex h-[76px] flex-wrap content-start gap-2 overflow-hidden">
        {item.specs.slice(0, 3).map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-4">
          <div className="text-xl font-black text-white">
            {formatDZD(item.price)}
          </div>
          <div className="text-sm text-slate-500 line-through">
            {formatDZD(item.oldPrice)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onView?.(item)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.08]"
          >
            View
          </button>

          <button
            onClick={handleAdd}
            className={`w-full rounded-2xl px-4 py-3 text-sm font-bold transition ${
              added
                ? "bg-emerald-400 text-slate-950 shadow-[0_12px_26px_rgba(52,211,153,0.24)] scale-[1.02]"
                : "bg-cyan-400 text-slate-950 shadow-[0_10px_26px_rgba(34,211,238,0.18)] hover:opacity-95"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {added ? <Check className="h-4 w-4" /> : null}
              {added ? "Added" : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}