"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Moon, RefreshCw, Sun } from "lucide-react";
import AttendanceView from "@/components/dashboard/attendance-view";
import EnrollmentView from "@/components/dashboard/enrollment-view";
import GradesView from "@/components/dashboard/grades-view";
import Overview from "@/components/dashboard/overview";
import ReportsView from "@/components/dashboard/reports-view";
import { GITHUB_DATA_URL, MOCK_DATA, PAGES } from "@/constants/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { createGlobalStyles, fmtDate } from "@/components/dashboard/dashboard-utils";
import type { DashboardData } from "@/types/dashboard";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState("overview");
  const { isDark, theme, toggleTheme } = useTheme();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (GITHUB_DATA_URL) {
        const res = await fetch(GITHUB_DATA_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as DashboardData;
        setData(json);
        window.__MOCK_DATA__ = json;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(MOCK_DATA);
        window.__MOCK_DATA__ = MOCK_DATA;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(loadData);
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  const currentPage = PAGES.find((item) => item.id === page);

  const exportCSV = (rows: Record<string, unknown>[], filename: string) => {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]).join(",");
    const body = rows.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([`${headers}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{createGlobalStyles(theme)}</style>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark">LA</div>
            <div className="sidebar-school">{data?.school ?? "Student Tracker"}</div>
            <div className="sidebar-term">{data?.term ?? "Loading…"}</div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Navigation</div>
            {PAGES.map((item) => (
              <button
                key={item.id}
                className={`nav-btn ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <div className="nav-icon">
                  {item.id === "overview" && "◈"}
                  {item.id === "enrollment" && "◉"}
                  {item.id === "grades" && "◆"}
                  {item.id === "attendance" && "◇"}
                  {item.id === "reports" && "▤"}
                </div>
                {item.label}
              </button>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="status-pill">
              <div className="status-dot" />
              <div>
                <div style={{ fontSize: 12, color: theme.sidebarText, fontWeight: 500 }}>Live Data</div>
                <div style={{ fontSize: 10, marginTop: 1, opacity: 0.8 }}>Refreshes every 60s</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="topbar-title">{currentPage?.label}</div>
              <div className="topbar-sub">{data?.lastUpdated ? `Updated ${fmtDate(data.lastUpdated)}` : "Loading data…"}</div>
            </div>
            <div className="topbar-actions">
              <button className="btn-icon" onClick={toggleTheme} title={isDark ? "Light mode" : "Dark mode"}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="btn-icon" onClick={loadData} title="Refresh data">
                <RefreshCw size={20} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
              </button>
              <button className="btn-primary" onClick={() => exportCSV(data?.students ?? [], "students-export.csv")}>
                <Download size={16} />
                Export All
              </button>
            </div>
          </div>

          <div className="content">
            {loading && !data ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16, color: theme.muted }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderWidth: 3,
                    borderStyle: "solid",
                    borderRightColor: theme.border,
                    borderBottomColor: theme.border,
                    borderLeftColor: theme.border,
                    borderTopColor: theme.accent,
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <div style={{ fontSize: 14 }}>Loading dashboard…</div>
              </div>
            ) : error ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 12 }}>
                <div style={{ fontSize: 32 }}>⚠️</div>
                <div style={{ color: theme.rose, fontWeight: 600 }}>Failed to load data</div>
                <div style={{ fontSize: 12, color: theme.muted }}>{error}</div>
                <button className="btn-primary" onClick={loadData}>Try Again</button>
              </div>
            ) : (
              <>
                {page === "overview" && data && <Overview data={data} theme={theme} />}
                {page === "enrollment" && <EnrollmentView />}
                {page === "grades" && <GradesView />}
                {page === "attendance" && <AttendanceView />}
                {page === "reports" && <ReportsView theme={theme} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


