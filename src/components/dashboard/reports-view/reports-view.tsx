"use client";

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
import {
  breakdownCardStyle,
  breakdownGridStyle,
  breakdownLabelStyle,
  breakdownValueStyle,
  exportRowStyle,
  reportsLayoutStyle,
  secondaryCardStyle,
} from "./reports-view.styles";
import { useReportsData } from "./reports-view.hooks";
import type { ReportsViewProps } from "./reports-view.types";

export default function ReportsView({ theme }: ReportsViewProps) {
  const {
    reportsRef,
    byClass,
    attendanceByClass,
    attendanceTrend,
    statusTotals,
    exportCSV,
    exportPDF,
  } = useReportsData();

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
              <AreaChart data={attendanceTrend}>
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


