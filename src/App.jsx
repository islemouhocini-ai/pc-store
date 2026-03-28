import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminPage from "./components/AdminPage";
import AccountPage from "./components/AccountPage";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import { supabase } from "./lib/supabase";
import { Search, Check, ChevronDown } from "lucide-react";

function getPageFromPath(pathname) {
  const clean = pathname.replace("/", "").trim();
  const pages = ["home", "shop", "product", "cart", "checkout", "login", "register", "admin", "account"];
  return pages.includes(clean) ? clean : "home";
}

function normalizeProduct(item) {
  return {
    ...item,
    oldPrice: item.oldPrice ?? item.old_price ?? item.price ?? 0,
    specs: Array.isArray(item.specs) ? item.specs : [],
    rating: Number(item.rating ?? 0),
    price: Number(item.price ?? 0),
  };
}

function ShopPage({ addToCart, selectedCategory, setSelectedCategory, setPage, setSelectedProduct, heroQuery, products }) {
  const [query, setQuery] = useState(heroQuery || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "all", label: "All Categories" },
    { value: "cpu", label: "Processors" },
    { value: "gpu", label: "Graphics Cards" },
    { value: "ram", label: "Memory" },
    { value: "storage", label: "Storage" },
  ];

  useEffect(() => setQuery(heroQuery || ""), [heroQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === selectedCategory) || options[0];

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || item.name.toLowerCase().includes(q) || item.short.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, query, selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, GPUs, processors..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-xl placeholder:text-slate-400"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl border border-cyan-400/20 bg-slate-900/60 px-4 py-3 text-sm font-medium text-white outline-none backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.08)]"
            >
              <span>{selectedOption.label}</span>
              <ChevronDown className={`h-4 w-4 text-cyan-300 transition ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,8,23,0.55)]">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => { setSelectedCategory(option.value); setDropdownOpen(false); }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${selectedCategory === option.value ? "bg-cyan-400/10 text-cyan-300" : "text-slate-200 hover:bg-white/[0.05] hover:text-white"}`}
                  >
                    <span>{option.label}</span>
                    {selectedCategory === option.value && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} addToCart={addToCart} onView={(product) => { setSelectedProduct(product); setPage("product"); }} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState(() => getPageFromPath(window.location.pathname));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [heroQuery, setHeroQuery] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success", title: "" });
  const [confirmState, setConfirmState] = useState({ open: false, title: "", message: "", confirmText: "Confirm", cancelText: "Cancel", danger: false, resolver: null });

  const isAdmin = currentProfile?.role === "admin";
  const isLoggedIn = !!currentUser;

  const notify = (message, type = "success", title = "") => {
    setToast({ show: true, message, type, title });
    window.clearTimeout(window.__toastTimeout);
    window.__toastTimeout = window.setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3400);
  };

  const closeToast = () => setToast((prev) => ({ ...prev, show: false }));

  // ----------- Products ------------------
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) return notify("Could not load products.", "error");
      setProducts((data || []).map(normalizeProduct));
    } catch (err) { notify("Error fetching products.", "error"); }
  };

  // ----------- Session -------------------
  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) await loadUser(session.user.id);
      fetchProducts();
    };
    initSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setCurrentUser(null); setCurrentProfile(null); return;
      }
      loadUser(session.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const loadUser = async (userId) => {
    try {
      setCurrentUser({ id: userId });
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (!error) setCurrentProfile(profile || null);
    } catch (err) { setCurrentProfile(null); }
  };

  // ----------- Logout --------------------
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null); setCurrentProfile(null); setPage("home");
      notify("Signed out successfully", "success");
    } catch (err) { notify("Logout failed.", "error"); }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#050816] text-white antialiased">
      <Toast toast={toast} onClose={closeToast} />
      <ConfirmDialog {...confirmState} onConfirm={() => confirmState.resolver?.(true)} onCancel={() => confirmState.resolver?.(false)} />
      <Header cartCount={cartCount} page={page} setPage={setPage} cartPulse={cartPulse} currentUser={currentUser} currentProfile={currentProfile} onLogout={handleLogout} />

      {page === "home" && <>
        <Hero setPage={setPage} setHeroQuery={setHeroQuery} />
        <Services />
        <Categories setPage={setPage} setSelectedCategory={setSelectedCategory} />
        <Featured addToCart={() => {}} setPage={setPage} setSelectedProduct={() => {}} products={products} />
      </>}

      {page === "shop" && <ShopPage addToCart={() => {}} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setPage={setPage} setSelectedProduct={setSelectedProduct} heroQuery={heroQuery} products={products} />}
      {page === "product" && selectedProduct && <ProductPage addToCart={() => {}} item={selectedProduct} />}
      {page === "cart" && <CartPage cart={cart} setCart={setCart} setPage={setPage} />}
      {page === "checkout" && <CheckoutPage />}
      {page === "login" && <LoginPage setPage={setPage} notify={notify} />}
      {page === "register" && <RegisterPage setPage={setPage} notify={notify} />}
      {page === "admin" && isAdmin && <AdminPage setPage={setPage} products={products} addProduct={() => {}} updateProduct={() => {}} deleteProduct={() => {}} notify={notify} askConfirm={() => {}} />}
      {page === "account" && isLoggedIn && <AccountPage setPage={setPage} currentUser={currentUser} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} notify={notify} />}
      <Footer setPage={setPage} />
    </div>
  );
}