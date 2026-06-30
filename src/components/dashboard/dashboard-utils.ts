import type { Theme } from "@/hooks/theme";

export const avg = (arr: number[]) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

export const gradeInfo = (s: number, theme: Theme) => {
  if (s >= 90) return { letter: "A", color: theme.emerald, label: "Distinction" };
  if (s >= 80) return { letter: "B", color: theme.accent, label: "Merit" };
  if (s >= 70) return { letter: "C", color: theme.sky, label: "Credit" };
  if (s >= 60) return { letter: "D", color: theme.amber, label: "Pass" };
  return { letter: "F", color: theme.rose, label: "Fail" };
};

export const groupBy = <T extends Record<string, unknown>>(arr: T[], key: keyof T) =>
  arr.reduce((acc, item) => {
    const groupKey = String(item[key] ?? "");
    (acc[groupKey] = acc[groupKey] || []).push(item);
    return acc;
  }, {} as Record<string, T[]>);

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-ZM", { dateStyle: "medium", timeStyle: "short" });

export const createGlobalStyles = (theme: Theme) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  html, body, #__next {
    height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: ${theme.bg};
    color: ${theme.text};
    font-size: 14px;
    line-height: 1.5;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  .layout { display: flex; height: 100vh; overflow: hidden; }

  .sidebar {
    width: 260px; min-width: 260px;
    background: ${theme.sidebar};
    border-right: 1px solid ${theme.accent}33;
    display: flex; flex-direction: column;
    overflow-y: auto;
    z-index: 10;
  }

  .sidebar-logo {
    padding: 24px;
    border-bottom: 1px solid ${theme.accent}33;
  }

  .sidebar-logo-mark {
    width: 40px; height: 40px; border-radius: 12px;
    background: ${theme.accent};
    display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 20px; font-weight: 800; color: #fff;
    margin-bottom: 14px;
    box-shadow: 0 4px 12px ${theme.accent}40;
  }

  .sidebar-school {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px; font-weight: 700;
    color: ${theme.sidebarText};
  }

  .sidebar-term {
    font-size: 12px;
    color: ${theme.sidebarText}88;
    margin-top: 4px;
  }

  .sidebar-section { padding: 20px 12px 8px; }
  .sidebar-section-label {
    font-size: 11px; font-weight: 700;
    color: ${theme.sidebarText}77;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 12px; margin-bottom: 8px;
  }

  .nav-btn {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 11px 12px;
    border-radius: 10px; border: none;
    background: transparent;
    color: ${theme.sidebarText}99;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer; text-align: left;
    margin-bottom: 4px;
  }

  .nav-btn:hover {
    background: ${theme.accent}33;
    color: ${theme.sidebarText};
  }

  .nav-btn.active {
    background: ${theme.accent}22;
    color: ${theme.sidebarText};
    font-weight: 600;
  }

  .nav-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px 12px;
    border-top: 1px solid ${theme.accent}33;
  }

  .status-pill {
    display: flex; align-items: center; gap: 10px;
    padding: 12px;
    border-radius: 10px;
    background: ${theme.accent}22;
    font-size: 12px;
    color: ${theme.sidebarText};
  }

  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${theme.accent};
    box-shadow: 0 0 8px ${theme.accent};
    flex-shrink: 0;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .topbar {
    height: 70px; min-height: 70px;
    padding: 0 32px;
    border-bottom: 1px solid ${theme.border};
    display: flex; align-items: center; justify-content: space-between;
    background: ${theme.surface};
  }

  .topbar-left { display: flex; flex-direction: column; justify-content: center; }
  .topbar-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 20px; font-weight: 700;
    color: ${theme.text};
  }
  .topbar-sub { font-size: 12px; color: ${theme.muted}; margin-top: 2px; }
  .topbar-actions { display: flex; align-items: center; gap: 12px; }

  .btn-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: ${theme.surfaceHi};
    border: 1px solid ${theme.border};
    color: ${theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-icon:hover {
    background: ${theme.accent};
    color: #fff;
    border-color: ${theme.accent};
  }

  .btn-primary {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px;
    background: ${theme.accent}; border: none;
    color: #fff; font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: all 0.15s;
    box-shadow: 0 4px 12px ${theme.accent}40;
  }

  .btn-primary:hover { background: ${theme.accentHi}; }

  .content { flex: 1; overflow-y: auto; padding: 32px; }

  .card {
    background: ${theme.surface};
    border: 1px solid ${theme.border};
    border-radius: 16px;
    padding: 24px;
    transition: all 0.2s;
  }

  .card:hover { border-color: ${theme.accent}55; }

  .card-title {
    font-size: 12px; font-weight: 700;
    color: ${theme.muted};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .table-wrap { overflow-x: auto; }

  .table-wrap table { width: 100%; border-collapse: collapse; }
  .table-wrap th,
  .table-wrap td { padding: 10px 12px; }
  .table-wrap thead th { text-align: left; font-size: 12px; color: ${theme.muted}; text-transform: uppercase; letter-spacing: 0.05em; }
  .table-wrap tbody tr { border-top: 1px solid ${theme.border}; }

  .fade-up { animation: fadeUp 0.35s ease forwards; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .recharts-tooltip-wrapper .recharts-default-tooltip {
    background: ${theme.surface} !important;
    border: 1px solid ${theme.border} !important;
    border-radius: 10px !important;
    font-size: 12px !important;
    color: ${theme.text} !important;
    box-shadow: 0 4px 12px ${theme.bg}44 !important;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 1100px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 640px) {
    .stat-grid { grid-template-columns: 1fr; }
  }

  .stat-card {
    position: relative;
    background: ${theme.surface};
    border: 1px solid ${theme.border};
    border-radius: 16px;
    padding: 20px;
    overflow: hidden;
  }

  .stat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: ${theme.text};
    margin-bottom: 14px;
  }

  .stat-label {
    font-size: 12px; font-weight: 600;
    color: ${theme.muted};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .stat-value {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px; font-weight: 800;
    color: ${theme.text};
    margin-bottom: 4px;
  }

  .stat-sub {
    font-size: 12px;
    color: ${theme.muted};
    margin-bottom: 10px;
  }

  .trend-badge {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700;
  }

  .chart-grid-3 {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 900px) {
    .chart-grid-3 { grid-template-columns: 1fr; }
  }

  .alert {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 16px 18px;
    border-radius: 12px;
    border: 1px solid;
    margin-bottom: 24px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;



