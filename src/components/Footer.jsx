export default function Footer({ setPage }) {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[#050816]/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-left md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-lg font-black text-white">NOKHBAT PC</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            A premium storefront for performance hardware, designed with a clean
            international style and ready to scale into a full e-commerce
            experience.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Quick Links:
          </h4>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <button
              onClick={() => setPage("home")}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]"
            >
              Home
            </button>
            <button
              onClick={() => setPage("shop")}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]"
            >
              Shop
            </button>
            <button
              onClick={() => setPage("cart")}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]"
            >
              Cart
            </button>
            <button
              onClick={() => setPage("checkout")}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]"
            >
              Checkout
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Support:
          </h4>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]">
              Warranty
            </button>
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]">
              Shipping
            </button>
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]">
              FAQ
            </button>
            <button
              onClick={() => setPage("checkout")}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 hover:bg-white/[0.08]"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}