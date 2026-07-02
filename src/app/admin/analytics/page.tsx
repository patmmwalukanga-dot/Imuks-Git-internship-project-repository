"use client";

import { AdminLayout } from "@components/dashboard/layout/admin-layout";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

export default function AnalyticsPage() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleDarkModeChange = (e: Event) => setIsDark((e as CustomEvent).detail);
    window.addEventListener("darkModeChange", handleDarkModeChange);
    return () => window.removeEventListener("darkModeChange", handleDarkModeChange);
  }, []);

  const visitorData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Performance",
        data: [75, 68, 82, 79, 85, 72, 88],
        backgroundColor: "rgba(78, 205, 196, 0.6)",
        borderColor: "rgba(78, 205, 196, 1)",
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Trend",
        data: [72, 78, 81, 85],
        backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7cd", "#1a535c"],
      },
    ],
  };

  const trafficData = {
    labels: ["Math", "Science", "English", "History", "Arts"],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: ["#00d4ff", "#ff6b6b", "#4ecdc4", "#ffd166", "#1a535c"],
      },
    ],
  };

  const metrics = [
    { label: "Avg Score", value: "78.5", change: "+4%" },
    { label: "Pass Rate", value: "87.2%", change: "+2%" },
    { label: "Avg Attendance", value: "94%", change: "+1%" },
    { label: "Completion Rate", value: "82%", change: "+5%" },
  ];

  const cardBg = isDark ? "#1a1a1a" : "#fff";
  const cardText = isDark ? "#ffffff" : "#01381e";
  const pageBg = isDark ? "#000000" : "#Dee2b1";

  return (
    <AdminLayout>
      <div style={{ backgroundColor: pageBg, minHeight: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ backgroundColor: cardBg, padding: "1.25rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: `1px solid ${isDark ? "#1a4d2e" : "#01381e"}` }}>
              <h4 style={{ margin: 0, color: isDark ? "#Dee2b1" : "#01381e", fontSize: "0.85rem" }}>{m.label}</h4>
              <p style={{ fontSize: "1.75rem", fontWeight: "bold", margin: "0.5rem 0", color: cardText }}>{m.value}</p>
              <span style={{ color: "#28a745", fontSize: "0.8rem" }}>{m.change} from last month</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: cardBg, padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: `1px solid ${isDark ? "#1a4d2e" : "#01381e"}` }}>
            <h3 style={{ margin: "0 0 1rem 0", color: cardText }}>Monthly Performance</h3>
            <Bar data={visitorData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div style={{ backgroundColor: cardBg, padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: `1px solid ${isDark ? "#1a4d2e" : "#01381e"}` }}>
            <h3 style={{ margin: "0 0 1rem 0", color: cardText }}>Subject Distribution</h3>
            <Pie data={trafficData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
          </div>
        </div>

        <div style={{ backgroundColor: cardBg, padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: `1px solid ${isDark ? "#1a4d2e" : "#01381e"}` }}>
          <h3 style={{ margin: "0 0 1rem 0", color: cardText }}>Grade Trends</h3>
          <Line data={revenueData} options={{ responsive: true, plugins: { legend: { display: false } }, elements: { line: { tension: 0.4 } } }} />
        </div>
      </div>
    </AdminLayout>
  );
}