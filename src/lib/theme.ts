export const lightTheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  surfaceHi: "#f1f5f9",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
  sidebar: "#155e4d",
  sidebarText: "#ffffff",
  accent: "#10b981",
  accentHi: "#059669",
  amber: "#f59e0b",
  rose: "#ef4444",
  emerald: "#10b981",
  sky: "#0ea5e9",
  chart: ["#10b981", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
};

export const darkTheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  surfaceHi: "#334155",
  border: "#475569",
  text: "#f1f5f9",
  muted: "#94a3b8",
  sidebar: "#1a3a34",
  sidebarText: "#f1f5f9",
  accent: "#10b981",
  accentHi: "#34d399",
  amber: "#fbbf24",
  rose: "#f87171",
  emerald: "#10b981",
  sky: "#38bdf8",
  chart: ["#10b981", "#38bdf8", "#fbbf24", "#f87171", "#a78bfa", "#f472b6"],
};

export type Theme = typeof lightTheme;
