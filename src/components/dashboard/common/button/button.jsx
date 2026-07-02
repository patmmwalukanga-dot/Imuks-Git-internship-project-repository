export default function Button({
  children,
  onClick,
  variant = "primary",
  style = {},
  ...props
}) {
  const baseStyle = {
    padding: "0.75rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
  };

  const variants = {
    primary: { backgroundColor: "#01381e", color: "#Dee2b1" },
    danger: { backgroundColor: "#dc3545", color: "white" },
    secondary: { backgroundColor: "#6c757d", color: "white" },
    success: { backgroundColor: "#28a745", color: "white" },
    warning: { backgroundColor: "#ffc107", color: "#000" },
    outline: { backgroundColor: "transparent", border: "1px solid #01381e", color: "#01381e" },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
