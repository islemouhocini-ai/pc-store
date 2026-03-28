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
import { productsData } from "./data/storeData";
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
  const [page, setPage] = useState(() => getPageFromPath(window.location.pathname));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(productsData[0]);
  const [heroQuery, setHeroQuery] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("fakeAdminLoggedIn") === "true"
  );

  const [account, setAccount] = useState(() => {
    const saved = localStorage.getItem("fakeAdminAccount");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          username: "admin",
          email: "admin@example.com",
          fullName: "Admin User",
          password: "admin",
        };
      }
    }

    return {
      username: "admin",
      email: "admin@example.com",
      fullName: "Admin User",
      password: "admin",
    };
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("storeProducts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return productsData;
      }
    }
    return productsData;
  });

  const [cart, setCart] = useState([
    { ...productsData[2], qty: 1 },
    { ...productsData[3], qty: 1 },
  ]);

  useEffect(() => {
    localStorage.setItem("storeProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("fakeAdminAccount", JSON.stringify(account));
  }, [account]);

  useEffect(() => {
    if ((page === "admin" || page === "account") && !isAdminLoggedIn) {
      setPage("login");
      window.history.replaceState({}, "", "/login");
      return;
    }

    const desiredPath = `/${page}`;
    if (window.location.pathname !== desiredPath) {
      window.history.pushState({}, "", desiredPath);
    }
  }, [page, isAdminLoggedIn]);

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromPath(window.location.pathname);

      if ((nextPage === "admin" || nextPage === "account") && !isAdminLoggedIn) {
        setPage("login");
        window.history.replaceState({}, "", "/login");
        return;
      }

      setPage(nextPage);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isAdminLoggedIn]);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/") {
      window.history.replaceState({}, "", "/home");
      setPage("home");
      return;
    }

    const currentPage = getPageFromPath(path);

    if ((currentPage === "admin" || currentPage === "account") && !isAdminLoggedIn) {
      window.history.replaceState({}, "", "/login");
      setPage("login");
      return;
    }

    setPage(currentPage);
  }, [isAdminLoggedIn]);

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
  };

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
    setSelectedProduct(product);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );

    if (selectedProduct?.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));

    if (selectedProduct?.id === id) {
      const fallback =
        products.find((item) => item.id !== id) || productsData[0];
      setSelectedProduct(fallback);
    }
  };

  const updateAccount = (newAccount) => {
    setAccount(newAccount);
  };

  const onAdminLogin = () => {
    localStorage.setItem("fakeAdminLoggedIn", "true");
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("fakeAdminLoggedIn");
    setIsAdminLoggedIn(false);
    setPage("home");
    window.history.replaceState({}, "", "/home");
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
      <Header
        cartCount={cartCount}
        page={page}
        setPage={setPage}
        cartPulse={cartPulse}
        isAdminLoggedIn={isAdminLoggedIn}
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

      {page === "product" && (
        <ProductPage addToCart={addToCart} item={selectedProduct} />
      )}

      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} setPage={setPage} />
      )}

      {page === "checkout" && <CheckoutPage />}

      {page === "login" && (
        <LoginPage
          setPage={setPage}
          onAdminLogin={onAdminLogin}
          account={account}
        />
      )}

      {page === "register" && <RegisterPage setPage={setPage} />}

      {page === "admin" && isAdminLoggedIn && (
        <AdminPage
          setPage={setPage}
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
        />
      )}

      {page === "account" && isAdminLoggedIn && (
        <AccountPage
          setPage={setPage}
          account={account}
          updateAccount={updateAccount}
        />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}