import { useMemo, useState } from "react";

const emptyForm = {
  name: "",
  category: "gpu",
  badge: "New Arrival",
  price: "",
  oldPrice: "",
  rating: "4.8",
  image: "",
  specs: "",
  short: "",
};

const categoryOptions = [
  { value: "cpu", label: "Processors" },
  { value: "gpu", label: "Graphics Cards" },
  { value: "ram", label: "Memory" },
  { value: "storage", label: "Storage" },
];

export default function AdminPage({
  setPage,
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  notify,
  askConfirm,
}) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEditing = !!editingId;

  const sortedProducts = useMemo(() => products || [], [products]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "gpu",
      badge: product.badge || "",
      price: String(product.price ?? ""),
      oldPrice: String(product.oldPrice ?? product.old_price ?? ""),
      rating: String(product.rating ?? "4.8"),
      image: product.image || "",
      specs: Array.isArray(product.specs) ? product.specs.join(", ") : "",
      short: product.short || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.price.trim() ||
      !form.image.trim() ||
      !form.short.trim()
    ) {
      notify("Please fill in all required product fields.", "error", "Missing data");
      return;
    }

    const payload = {
      id: editingId || undefined,
      name: form.name.trim(),
      category: form.category.trim(),
      badge: form.badge.trim(),
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || form.price),
      rating: Number(form.rating || 4.8),
      image: form.image.trim(),
      specs: form.specs
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      short: form.short.trim(),
    };

    try {
      setSaving(true);

      if (isEditing) {
        await updateProduct(payload);
      } else {
        await addProduct(payload);
      }

      resetForm();
    } catch (err) {
      console.error("ADMIN SAVE ERROR:", err);
      notify("Something went wrong while saving the product.", "error", "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = await askConfirm({
      title: "Delete product?",
      message: `This will permanently remove "${name}" from your store.`,
      confirmText: "Delete",
      cancelText: "Keep it",
      danger: true,
    });

    if (!confirmed) return;

    await deleteProduct(id);
  };

  const categoryLabel = (value) =>
    categoryOptions.find((item) => item.value === value)?.label || value;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
          <div className="mb-6">
            <h1 className="text-4xl font-black text-white">
              {isEditing ? "Edit Product" : "Admin Panel"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {isEditing
                ? "Update product details"
                : "Add a new product to your store"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Product name"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
            >
              {categoryOptions.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="bg-slate-950 text-white"
                >
                  {item.label}
                </option>
              ))}
            </select>

            <input
              value={form.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="Badge"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Price"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              value={form.oldPrice}
              onChange={(e) => handleChange("oldPrice", e.target.value)}
              placeholder="Old price"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              step="0.1"
              value={form.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              placeholder="Rating"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="Image URL or /images/example.png"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              value={form.specs}
              onChange={(e) => handleChange("specs", e.target.value)}
              placeholder="Tags / Specs separated by commas"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <textarea
              value={form.short}
              onChange={(e) => handleChange("short", e.target.value)}
              placeholder="Short description"
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <div className="grid grid-cols-3 gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-cyan-400 px-5 py-4 text-base font-black text-slate-950 transition disabled:opacity-60"
              >
                {saving
                  ? isEditing
                    ? "Saving..."
                    : "Adding..."
                  : isEditing
                  ? "Save Changes"
                  : "Add Product"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setPage("home")}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                Back Home
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
          <div className="mb-6">
            <h2 className="text-4xl font-black text-white">Manage Products</h2>
            <p className="mt-2 text-sm text-slate-400">
              Edit or delete existing products
            </p>
          </div>

          <div className="space-y-4">
            {sortedProducts.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/10 p-8 text-center text-slate-400">
                No products found yet.
              </div>
            ) : (
              sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/40 p-4 md:grid-cols-[90px_1fr_auto] md:items-start"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-full rounded-2xl object-cover"
                  />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-black text-white">
                        {product.name}
                      </h3>

                      {product.badge ? (
                        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {product.short}
                    </p>

                    {Array.isArray(product.specs) && product.specs.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.specs.slice(0, 4).map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-3 text-sm text-slate-400">
                      {categoryLabel(product.category)} •{" "}
                      {new Intl.NumberFormat("en-US").format(product.price)} DZD
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => startEdit(product)}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-6 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/18"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}