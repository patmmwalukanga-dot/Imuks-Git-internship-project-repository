import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../common/navbar/navbar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setIsDark(true);
    const handleDarkModeChange = (e) => setIsDark(e.detail);
    window.addEventListener("darkModeChange", handleDarkModeChange);
    return () => window.removeEventListener("darkModeChange", handleDarkModeChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDark.toString());
    window.dispatchEvent(new CustomEvent("darkModeChange", { detail: isDark }));
  }, [isDark]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Students", path: "/admin/users", icon: "👥" },
    { name: "Analytics", path: "/admin/analytics", icon: "📈" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  const darkColors = {
    bg: "#000000",
    nav: "#000000",
    navText: "#Dee2b1",
    header: "#000000",
    text: "#ffffff",
    card: "#1a1a1a",
    border: "#333333",
  };

  const lightColors = {
    bg: "#Dee2b1",
    nav: "#01381e",
    navText: "#Dee2b1",
    header: "#01381e",
    text: "#01381e",
    card: "#ffffff",
    border: "#01381e",
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: colors.bg,
        transition: "background-color 0.3s",
      }}
    >
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        handleLogout={handleLogout}
        router={router}
        colors={colors}
        navItems={navItems}
        currentTime={currentTime}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            backgroundColor: colors.header,
            padding: "1rem 2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "background-color 0.3s",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.25rem",
                color: isDark ? "#ffffff" : "#Dee2b1",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {navItems.find((i) => i.path === router.pathname)?.name || "Tracker"}
            </h1>
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.8rem",
                color: isDark ? "#Dee2b1" : "#Dee2b1",
                opacity: 0.8,
              }}
            >
              {currentTime}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: 0,
                  color: isDark ? "#ffffff" : "#Dee2b1",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Welcome back, Teacher
              </p>
              <p
                style={{
                  margin: 0,
                  color: isDark ? "#Dee2b1" : "#Dee2b1",
                  fontSize: "0.75rem",
                  opacity: 0.7,
                }}
              >
                Staff
              </p>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: isDark ? "#01381e" : "#Dee2b1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "#Dee2b1" : "#01381e",
                fontSize: "1.1rem",
                fontWeight: "bold",
                border: `2px solid ${isDark ? "#Dee2b1" : "#01381e"}`,
              }}
            >
              A
            </div>
          </div>
        </header>
        <main
          style={{ padding: "2rem", flex: 1, backgroundColor: colors.bg }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
