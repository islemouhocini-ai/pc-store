import { Star } from "lucide-react";
import { formatDZD } from "../data/storeData";

export default function ProductPage({ addToCart, item }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-8 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2 md:p-8">
        <img
          src={item.image}
          alt={item.name}
          className="h-[460px] w-full rounded-[32px] object-cover object-center"
        />
        <div className="text-left">
          <div className="inline-flex rounded-full bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
            {item.badge}
          </div>
          <h1 className="mt-5 text-4xl font-black text-white md:text-5xl">
            {item.name}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-amber-300">
            <span>{item.rating}</span>
            <Star className="h-4 w-4 fill-current" />
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">In Stock</span>
          </div>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            A premium product detail view built to feel polished, global, and
            trustworthy — perfect for showcasing high-end hardware in a clean
            modern storefront.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-end gap-4">
            <div>
              <div className="text-3xl font-black text-white">
                {formatDZD(item.price)}
              </div>
              <div className="text-base text-slate-500 line-through">
                {formatDZD(item.oldPrice)}
              </div>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 shadow-[0_14px_30px_rgba(34,211,238,0.18)]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {["Detailed Specs", "Flexible Returns", "Recommended Upgrades"].map(
          (title) => (
            <div
              key={title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-left"
            >
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Structured supporting content that makes the product page feel
                complete and globally polished.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}