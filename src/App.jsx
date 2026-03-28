// src/App.jsx
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

// صفحات المشروع
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanel from "./pages/AdminPanel";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

// مكون التنبيهات
import Notify from "./components/Notify";

function App() {
  const [page, setPage] = useState("login"); // الصفحة الحالية
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [notifyData, setNotifyData] = useState(null); // { message, type, title }

  // مخصص لإظهار الإشعارات
  const notify = (message, type = "success", title = "") => {
    setNotifyData({ message, type, title });
    setTimeout(() => setNotifyData(null), 4000); // اختفاء تلقائي بعد 4 ثواني
  };

  // تحميل بيانات البروفايل
  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("PROFILE FETCH ERROR:", error);
        setCurrentProfile(null);
        return;
      }

      setCurrentProfile(data || null);
    } catch (err) {
      console.error("PROFILE FETCH ERROR:", err);
      setCurrentProfile(null);
    }
  };

  // تحميل الجلسة والتحقق من المستخدم
  useEffect(() => {
    const loadSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("CURRENT SESSION:", session);

        if (!session?.user) {
          setCurrentUser(null);
          setCurrentProfile(null);
          setPage("login");
          return;
        }

        setCurrentUser(session.user);
        await loadProfile(session.user.id);
        setPage("home");
      } catch (err) {
        console.error("SESSION LOAD ERROR:", err);
        setCurrentUser(null);
        setCurrentProfile(null);
        setPage("login");
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AUTH STATE CHANGE:", event, session);

      if (!session?.user) {
        setCurrentUser(null);
        setCurrentProfile(null);
        setPage("login");
        return;
      }

      setCurrentUser(session.user);
      await loadProfile(session.user.id);
      setPage("home");
    });

    return () => subscription.unsubscribe();
  }, []);

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      setCurrentProfile(null);
      setPage("login");
      notify("تم تسجيل الخروج بنجاح", "success", "Logout");
    } catch (err) {
      console.error("SIGNOUT ERROR:", err);
      notify("حدث خطأ أثناء تسجيل الخروج", "error", "Logout");
    }
  };

  // تحديد مكونات الصفحات
  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} currentUser={currentUser} />;

      case "login":
        return <LoginPage setPage={setPage} notify={notify} />;

      case "register":
        return <RegisterPage setPage={setPage} notify={notify} />;

      case "products":
        return <ProductsPage currentUser={currentUser} />;

      case "cart":
        return <CartPage currentUser={currentUser} />;

      case "checkout":
        return <CheckoutPage currentUser={currentUser} />;

      case "admin":
        if (currentProfile?.role !== "admin") {
          notify("لا تملك صلاحية الدخول", "error", "Access Denied");
          return <HomePage setPage={setPage} currentUser={currentUser} />;
        }
        return <AdminPanel currentProfile={currentProfile} />;

      default:
        return <LoginPage setPage={setPage} notify={notify} />;
    }
  };

  return (
    <div className="App bg-slate-950 min-h-screen text-white">
      {notifyData && (
        <Notify
          message={notifyData.message}
          type={notifyData.type}
          title={notifyData.title}
        />
      )}

      {currentUser && (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-end gap-4 p-4 bg-slate-900/80 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-3 py-1 font-semibold hover:bg-red-500"
          >
            Logout
          </button>
        </header>
      )}

      <main className="pt-20">{renderPage()}</main>
    </div>
  );
}

export default App;