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

  if (
    clean === "home" ||
    clean === "shop" ||
    clean === "product" ||
    clean === "cart" ||
    clean === "checkout" ||
    clean === "login" ||
    clean === "register" ||
    clean === "admin" ||
    clean === "account"
  ) {
    return clean;
  }

  return "home";
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

function ShopPage({
  addToCart,
  selectedCategory,
  setSelectedCategory,
  setPage,
  setSelectedProduct,
  heroQuery,
  products,
}) {
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

  useEffect(() => {
    setQuery(heroQuery || "");
  }, [heroQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((option) => option.value === selectedCategory) || options[0];

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.short.toLowerCase().includes(q);

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
              <ChevronDown
                className={`h-4 w-4 text-cyan-300 transition ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,8,23,0.55)]">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(option.value);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      selectedCategory === option.value
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {selectedCategory === option.value ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            addToCart={addToCart}
            onView={(product) => {
              setSelectedProduct(product);
              setPage("product");
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState(() =>
    getPageFromPath(window.location.pathname)
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [heroQuery, setHeroQuery] = useState("");
  const [cartPulse, setCartPulse] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
    title: "",
  });

  const [confirmState, setConfirmState] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    danger: false,
    resolver: null,
  });

  const isAdmin = currentProfile?.role === "admin";
  const isLoggedIn = !!currentUser;

  const notify = (message, type = "success", title = "") => {
    setToast({
      show: true,
      message,
      type,
      title,
    });

    window.clearTimeout(window.__toastTimeout);
    window.__toastTimeout = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3400);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const askConfirm = ({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
  }) =>
    new Promise((resolve) => {
      setConfirmState({
        open: true,
        title,
        message,
        confirmText,
        cancelText,
        danger,
        resolver: resolve,
      });
    });

  const handleConfirm = () => {
    confirmState.resolver?.(true);
    setConfirmState((prev) => ({ ...prev, open: false, resolver: null }));
  };

  const handleCancelConfirm = () => {
    confirmState.resolver?.(false);
    setConfirmState((prev) => ({ ...prev, open: false, resolver: null }));
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("PRODUCT FETCH ERROR:", error);
        notify("Could not refresh products right now.", "error", "Network issue");
        return;
      }

      const loadedProducts = (data || []).map(normalizeProduct);
      console.log("FETCHED PRODUCTS:", loadedProducts);

      setProducts(loadedProducts);

      if (loadedProducts.length > 0) {
        setSelectedProduct((prev) => {
          if (!prev) return loadedProducts[0];
          const stillExists = loadedProducts.find((p) => p.id === prev.id);
          return stillExists || loadedProducts[0];
        });
      } else {
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error("PRODUCT FETCH ERROR:", err);
      notify("Could not refresh products right now.", "error", "Network issue");
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setCurrentUser(null);
          setCurrentProfile(null);
          return;
        }

        setCurrentUser(session.user);

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("PROFILE FETCH ERROR:", error);
          setCurrentProfile(null);
        } else {
          setCurrentProfile(profile || null);
        }
      } catch (err) {
        console.error("SESSION LOAD ERROR:", err);
        setCurrentUser(null);
        setCurrentProfile(null);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (!session?.user) {
          setCurrentUser(null);
          setCurrentProfile(null);
          return;
        }

        setCurrentUser(session.user);

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("PROFILE FETCH ERROR:", error);
          setCurrentProfile(null);
        } else {
          setCurrentProfile(profile || null);
        }
      } catch (err) {
        console.error("AUTH STATE ERROR:", err);
        setCurrentUser(null);
        setCurrentProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleVisible = () => {
      if (document.visibilityState === "visible") {
        fetchProducts();
      }
    };

    const handleOnline = () => {
      fetchProducts();
    };

    document.addEventListener("visibilitychange", handleVisible);
    window.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisible);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (page === "admin" && !isAdmin) {
      setPage("login");
      window.history.replaceState({}, "", "/login");
      return;
    }

    if (page === "account" && !isLoggedIn) {
      setPage("login");
      window.history.replaceState({}, "", "/login");
      return;
    }

    const desiredPath = `/${page}`;
    if (window.location.pathname !== desiredPath) {
      window.history.pushState({}, "", desiredPath);
    }
  }, [page, isAdmin, isLoggedIn]);

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromPath(window.location.pathname);

      if (nextPage === "admin" && !isAdmin) {
        setPage("login");
        window.history.replaceState({}, "", "/login");
        return;
      }

      if (nextPage === "account" && !isLoggedIn) {
        setPage("login");
        window.history.replaceState({}, "", "/login");
        return;
      }

      setPage(nextPage);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isAdmin, isLoggedIn]);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/") {
      window.history.replaceState({}, "", "/home");
      setPage("home");
      return;
    }

    const currentPageFromPath = getPageFromPath(path);

    if (currentPageFromPath === "admin" && !isAdmin) {
      window.history.replaceState({}, "", "/login");
      setPage("login");
      return;
    }

    if (currentPageFromPath === "account" && !isLoggedIn) {
      window.history.replaceState({}, "", "/login");
      setPage("login");
      return;
    }

    setPage(currentPageFromPath);
  }, [isAdmin, isLoggedIn]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 650);
    notify("Product added to cart.", "success", "Cart updated");
  };

  const addProduct = async (product) => {
    try {
      const payload = {
        name: product.name,
        category: product.category,
        price: Number(product.price),
        old_price: Number(product.oldPrice || product.price),
        rating: Number(product.rating || 0),
        badge: product.badge || "",
        short: product.short || "",
        image: product.image || "",
        specs: Array.isArray(product.specs) ? product.specs : [],
      };

      const { data, error } = await supabase
        .from("products")
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error("ADD PRODUCT ERROR:", error);
        notify(error.message, "error", "Add failed");
        return;
      }

      const normalized = normalizeProduct(data);
      setProducts((prev) => [normalized, ...prev]);
      setSelectedProduct(normalized);

      await fetchProducts();
      notify("Product added successfully.", "success", "Saved");
    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err);
      notify("Failed to add product.", "error", "Add failed");
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const payload = {
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: Number(updatedProduct.price),
        old_price: Number(updatedProduct.oldPrice || updatedProduct.price),
        rating: Number(updatedProduct.rating || 0),
        badge: updatedProduct.badge || "",
        short: updatedProduct.short || "",
        image: updatedProduct.image || "",
        specs: Array.isArray(updatedProduct.specs)
          ? updatedProduct.specs
          : [],
      };

      const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", updatedProduct.id)
        .select()
        .single();

      if (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        notify(error.message, "error", "Update failed");
        return;
      }

      const normalized = normalizeProduct(data);

      setProducts((prev) =>
        prev.map((item) => (item.id === normalized.id ? normalized : item))
      );

      if (selectedProduct?.id === normalized.id) {
        setSelectedProduct(normalized);
      }

      await fetchProducts();
      notify("Product updated successfully.", "success", "Updated");
    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err);
      notify("Failed to update product.", "error", "Update failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        console.error("DELETE PRODUCT ERROR:", error);
        notify(error.message, "error", "Delete failed");
        return;
      }

      setProducts((prev) => prev.filter((item) => item.id !== id));
      setCart((prev) => prev.filter((item) => item.id !== id));

      if (selectedProduct?.id === id) {
        const remaining = products.filter((item) => item.id !== id);
        setSelectedProduct(remaining[0] || null);
      }

      await fetchProducts();
      notify("Product deleted successfully.", "success", "Deleted");
    } catch (err) {
      console.error("DELETE PRODUCT ERROR:", err);
      notify("Failed to delete product.", "error", "Delete failed");
    }
  };

  const onUserLogin = async (user) => {
    try {
      setCurrentUser(user);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("PROFILE LOAD ERROR:", error);
        setCurrentProfile(null);
        return;
      }

      setCurrentProfile(profile || null);
    } catch (err) {
      console.error("onUserLogin ERROR:", err);
      setCurrentProfile(null);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("LOGOUT ERROR:", error);
        notify(error.message, "error", "Logout failed");
        return;
      }

      setCurrentUser(null);
      setCurrentProfile(null);
      setPage("home");
      window.history.replaceState({}, "", "/home");
      notify("You have been signed out.", "success", "Signed out");
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
      notify("Logout failed.", "error", "Logout failed");
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      className="min-h-screen bg-[#050816] text-white antialiased"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <Toast toast={toast} onClose={closeToast} />

      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        danger={confirmState.danger}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
      />

      <Header
        cartCount={cartCount}
        page={page}
        setPage={setPage}
        cartPulse={cartPulse}
        currentUser={currentUser}
        currentProfile={currentProfile}
        onLogout={handleLogout}
      />

      {page === "home" && (
        <>
          <Hero setPage={setPage} setHeroQuery={setHeroQuery} />
          <Services />
          <Categories
            setPage={setPage}
            setSelectedCategory={setSelectedCategory}
          />
          <Featured
            addToCart={addToCart}
            setPage={setPage}
            setSelectedProduct={setSelectedProduct}
            products={products}
          />
        </>
      )}

      {page === "shop" && (
        <ShopPage
          addToCart={addToCart}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          heroQuery={heroQuery}
          products={products}
        />
      )}

      {page === "product" && selectedProduct && (
        <ProductPage addToCart={addToCart} item={selectedProduct} />
      )}

      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} setPage={setPage} />
      )}

      {page === "checkout" && <CheckoutPage />}

      {page === "login" && (
        <LoginPage
          setPage={setPage}
          onUserLogin={onUserLogin}
          notify={notify}
        />
      )}

      {page === "register" && (
        <RegisterPage setPage={setPage} notify={notify} />
      )}

      {page === "admin" && isAdmin && (
        <AdminPage
          setPage={setPage}
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          notify={notify}
          askConfirm={askConfirm}
        />
      )}

      {page === "account" && isLoggedIn && (
        <AccountPage
          setPage={setPage}
          currentUser={currentUser}
          currentProfile={currentProfile}
          setCurrentProfile={setCurrentProfile}
          notify={notify}
        />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}