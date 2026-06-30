"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Theme } from "@/hooks/theme";
import type { AttendanceRecord, Student } from "@/types/dashboard";
import {
  breakdownCardStyle,
  breakdownGridStyle,
  breakdownLabelStyle,
  breakdownValueStyle,
  exportRowStyle,
  reportsLayoutStyle,
  secondaryCardStyle,
} from "./reports-view.styles";

const STUD_KEY = "students-data";
const ATT_KEY = "attendance-data";

export default function ReportsView({ theme }: { theme: Theme }) {
  const reportsRef = useRef<HTMLDivElement | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const sRaw = localStorage.getItem(STUD_KEY);
      try {
        const parsed = sRaw ? JSON.parse(sRaw) : null;
        if (parsed && Array.isArray(parsed)) {
          setStudents(parsed);
        } else if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students);
        }
      } catch {
        if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students);
        }
      }

      const aRaw = localStorage.getItem(ATT_KEY);
      try {
        const parsed = aRaw ? JSON.parse(aRaw) : null;
        if (parsed && Array.isArray(parsed)) {
          setAttendance(parsed);
        }
      } catch {
        // ignore
      }
    });
  }, []);

  const byClass = useMemo(() => {
    const map: Record<string, { name: string; count: number; totalGrade: number }> = {};
    students.forEach((student) => {
      const key = student.class || "Unknown";
      if (!map[key]) {
        map[key] = { name: key, count: 0, totalGrade: 0 };
      }
      map[key].count += 1;
      map[key].totalGrade += student.grade ?? 0;
    });
    return Object.values(map).map((entry) => ({
      name: entry.name,
      count: entry.count,
      avg: entry.count ? Math.round(entry.totalGrade / entry.count) : 0,
    }));
  }, [students]);

  const attendanceByClass = useMemo(() => {
    const grouped: Record<string, {
      className: string;
      total: number;
      present: number;
      absent: number;
      late: number;
    }> = {};

    students.forEach((student) => {
      grouped[student.class] = grouped[student.class] || {
        className: student.class,
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
      };
    });

    attendance.forEach((record) => {
      const student = students.find((item) => String(item.id) === String(record.studentId));
      if (!student) return;
      const bucket = grouped[student.class];
      if (!bucket) return;
      bucket.total += 1;
      if (record.status === "Present") bucket.present += 1;
      else if (record.status === "Absent") bucket.absent += 1;
      else if (record.status === "Late") bucket.late += 1;
    });

    return Object.values(grouped).map((bucket) => ({
      name: bucket.className,
      total: bucket.total || students.filter((student) => student.class === bucket.className).length,
      presentRate: bucket.total ? Math.round((bucket.present / bucket.total) * 100) : 0,
      absentRate: bucket.total ? Math.round((bucket.absent / bucket.total) * 100) : 0,
      lateRate: bucket.total ? Math.round((bucket.late / bucket.total) * 100) : 0,
      present: bucket.present,
      absent: bucket.absent,
      late: bucket.late,
      avg: Math.round(
        students.filter((student) => student.class === bucket.className)
          .reduce((sum, student) => sum + (student.grade ?? 0), 0) /
          (students.filter((student) => student.class === bucket.className).length || 1),
      ),
    }));
  }, [attendance, students]);

  const exportCSV = (rows: Record<string, unknown>[], name: string) => {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]).join(",");
    const body = rows.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([`${headers}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusTotals = useMemo(() => {
    const totals = { present: 0, absent: 0, late: 0, total: 0 };
    attendance.forEach((record) => {
      totals.total += 1;
      if (record.status === "Present") totals.present += 1;
      else if (record.status === "Absent") totals.absent += 1;
      else if (record.status === "Late") totals.late += 1;
    });
    return totals;
  }, [attendance]);

  const exportPDF = async () => {
    if (!reportsRef.current) return;
    const canvas = await html2canvas(reportsRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidthMM = pageWidth - margin * 2;
    const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width;
    if (imgHeightMM <= pageHeight - margin * 2) {
      pdf.addImage(imgData, "PNG", margin, margin, imgWidthMM, imgHeightMM);
    } else {
      const scale = (pageHeight - margin * 2) / imgHeightMM;
      const finalWidth = imgWidthMM * scale;
      const finalHeight = imgHeightMM * scale;
      const x = (pageWidth - finalWidth) / 2;
      pdf.addImage(imgData, "PNG", x, margin, finalWidth, finalHeight);
    }
    pdf.save("reports.pdf");
  };

  return (
    <div className="fade-up" ref={reportsRef}>
      <div style={reportsLayoutStyle}>
        <div>
          <div className="card">
            <div className="card-title">Students per Class</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byClass}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={theme.accent} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={secondaryCardStyle}>
            <div className="card-title">Average Grade by Class</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byClass}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avg" fill={theme.sky} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">Attendance Rates</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={attendanceByClass} dataKey="presentRate" nameKey="name" outerRadius={70} label>
                  {attendanceByClass.map((_, index) => (
                    <Cell key={index} fill={theme.chart[index % theme.chart.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: unknown) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={exportRowStyle}>
              <button className="btn-icon" onClick={() => exportCSV(byClass, "students-per-class")}>
                ↓ CSV
              </button>
              <button className="btn-icon" onClick={exportPDF}>
                PDF
              </button>
            </div>
          </div>

          <div className="card" style={secondaryCardStyle}>
            <div className="card-title">Attendance Breakdown</div>
            <div style={breakdownGridStyle}>
              <div className="card" style={breakdownCardStyle(theme)}>
                <div style={breakdownLabelStyle(theme)}>Present</div>
                <div style={breakdownValueStyle}>{statusTotals.present}</div>
              </div>
              <div className="card" style={breakdownCardStyle(theme)}>
                <div style={breakdownLabelStyle(theme)}>Absent</div>
                <div style={breakdownValueStyle}>{statusTotals.absent}</div>
              </div>
              <div className="card" style={breakdownCardStyle(theme)}>
                <div style={breakdownLabelStyle(theme)}>Late</div>
                <div style={breakdownValueStyle}>{statusTotals.late}</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart
                data={attendance.slice(-6).map((record, index) => ({
                  date: record.date,
                  statusRate: record.status === "Present" ? 100 : 0,
                  index,
                }))}
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.accent} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={theme.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: unknown) => `${value}%`} />
                <Area type="monotone" dataKey="statusRate" stroke={theme.accent} fillOpacity={1} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Summary Table</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Students</th>
                <th>Avg Grade</th>
                <th>Present %</th>
                <th>Absent %</th>
                <th>Late %</th>
              </tr>
            </thead>
            <tbody>
              {attendanceByClass.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.total}</td>
                  <td>{row.avg}%</td>
                  <td>{row.presentRate}%</td>
                  <td>{row.absentRate}%</td>
                  <td>{row.lateRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


