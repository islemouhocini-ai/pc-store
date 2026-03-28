import { useMemo, useState } from "react";

const emptyForm = {
  id: null,
  name: "",
  category: "gpu",
  price: "",
  oldPrice: "",
  rating: "4.8",
  badge: "New Arrival",
  specs: "",
  short: "",
  image: "",
};

export default function AdminPage({ setPage, products, addProduct, updateProduct, deleteProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => b.id - a.id);
  }, [products]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
  };

  const buildProductFromForm = () => {
    const trimmedName = form.name.trim();
    const trimmedShort = form.short.trim();
    const trimmedImage = form.image.trim();

    if (!trimmedName || !trimmedShort || !trimmedImage || !form.price) {
      alert("Please fill in name, price, short description, and image.");
      return null;
    }

    return {
      id: form.id ?? Date.now(),
      name: trimmedName,
      category: form.category,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || form.price),
      rating: Number(form.rating || 4.8),
      badge: form.badge.trim() || "New Arrival",
      specs: form.specs
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 6),
      short: trimmedShort,
      image: trimmedImage,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = buildProductFromForm();
    if (!product) return;

    if (isEditing) {
      updateProduct(product);
      alert("Product updated successfully.");
    } else {
      addProduct(product);
      alert("Product added successfully.");
    }

    resetForm();
    setPage("shop");
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: String(product.price),
      oldPrice: String(product.oldPrice),
      rating: String(product.rating),
      badge: product.badge,
      specs: product.specs.join(", "),
      short: product.short,
      image: product.image,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    deleteProduct(id);
    if (form.id === id) resetForm();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl h-fit">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-white">
              {isEditing ? "Edit Product" : "Admin Panel"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {isEditing ? "Update product details" : "Add a new product to your store"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Product name"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="cpu">Processors</option>
              <option value="gpu">Graphics Cards</option>
              <option value="ram">Memory</option>
              <option value="storage">Storage</option>
            </select>

            <input
              value={form.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="Badge"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Price"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              value={form.oldPrice}
              onChange={(e) => handleChange("oldPrice", e.target.value)}
              placeholder="Old price"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              placeholder="Rating"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="Image URL or /images/example.png"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <input
              value={form.specs}
              onChange={(e) => handleChange("specs", e.target.value)}
              placeholder="Tags / Specs separated by commas"
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <textarea
              value={form.short}
              onChange={(e) => handleChange("short", e.target.value)}
              placeholder="Short description"
              rows={4}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="submit"
                className="rounded-2xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950"
              >
                {isEditing ? "Save Changes" : "Add Product"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-semibold text-white"
              >
                Reset
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

        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white">Manage Products</h2>
            <p className="mt-2 text-sm text-slate-400">
              Edit or delete existing products
            </p>
          </div>

          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="grid gap-4 rounded-[24px] border border-white/10 bg-slate-950/40 p-4 md:grid-cols-[90px_1fr_auto]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-full rounded-2xl object-cover"
                />

                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                      {product.badge}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    {product.short}
                  </div>

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

                  <div className="mt-3 text-sm text-slate-300">
                    {product.category.toUpperCase()} • {product.price.toLocaleString()} DZD
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {sortedProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}