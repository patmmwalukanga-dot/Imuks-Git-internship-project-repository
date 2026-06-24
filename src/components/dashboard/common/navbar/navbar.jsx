import Link from "next/link";

export default function Navbar({
  isDark,
  setIsDark,
  handleLogout,
  router,
  colors,
  navItems,
  currentTime,
}) {
  return (
    <nav
      style={{
        width: "240px",
        backgroundColor: colors.nav,
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${colors.border}`,
        transition: "background-color 0.3s",
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: isDark ? colors.text : "#Dee2b1",
            fontSize: "1.5rem",
            margin: 0,
          }}
        >
          Student Tracker
        </h2>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.25rem",
          }}
          title="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            color: colors.navText,
          }}
          title="Logout"
        >
          Logout
        </button>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "0.5rem",
            textDecoration: "none",
            color:
              router.pathname === item.path
                ? isDark
                  ? colors.text
                  : "#Dee2b1"
                : colors.navText,
            backgroundColor:
              router.pathname === item.path
                ? "rgba(222, 226, 177, 0.1)"
                : "transparent",
          }}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
