import ProductCard from "./ProductCard";
import { ChevronLeft } from "lucide-react";

export default function Featured({
  addToCart,
  setPage,
  setSelectedProduct,
  products,
}) {
  const featuredItems = (products || []).slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="text-left">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Trending Now
          </div>
          <h2 className="mt-3 text-4xl font-black text-white">
            The hottest deals right now.
          </h2>
        </div>

        <button
          onClick={() => setPage("shop")}
          className="inline-flex items-center gap-2 self-end rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.08]"
        >
          View More <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {featuredItems.map((item, index) => (
          <div key={item.id} className="relative">
            <div className="absolute left-3 top-3 z-10 rounded-lg border border-violet-300/20 bg-violet-400/15 px-2 py-1 text-xs font-bold text-violet-100 backdrop-blur-xl shadow-[0_8px_24px_rgba(139,92,246,0.18)]">
              -{12 + index * 3}%
            </div>

            <ProductCard
              item={{
                ...item,
                oldPrice: item.oldPrice ?? item.old_price,
              }}
              addToCart={addToCart}
              onView={(product) => {
                setSelectedProduct(product);
                setPage("product");
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-r from-indigo-300 via-slate-700 to-slate-900 px-8 py-10 shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-white/80">
              Samsung
            </div>
            <h3 className="mt-3 text-4xl font-black text-white">
              Galaxy S26 Ultra
            </h3>
            <p className="mt-2 max-w-xl text-base leading-7 text-slate-200">
              A premium promotional banner section styled for a major campaign,
              adapted to your dark premium storefront.
            </p>
          </div>

          <button className="rounded-2xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-xl hover:opacity-95">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}