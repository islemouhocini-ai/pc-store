import { categories } from "../data/storeData";

export default function Categories({ setPage, setSelectedCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 text-left">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Categories
        </div>
        <h2 className="mt-3 text-4xl font-black text-white">
          Shop by Category
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                setPage("shop");
              }}
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {cat.name}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}