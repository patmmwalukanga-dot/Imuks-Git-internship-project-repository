"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Calendar, TrendingUp, Users } from "lucide-react";
import CustomTooltip from "@/components/dashboard/common/custom-tooltip";
import StatCard from "@/components/dashboard/common/stat-card";
import { gradeInfo } from "@/components/dashboard/dashboard-utils";
import {
  alertBodyStyle,
  alertBoxStyle,
  alertIconWrapStyle,
  alertTitleStyle,
} from "./overview.styles";
import { useOverviewData } from "./overview.hooks";
import type { OverviewProps } from "./overview.types";

export default function Overview({ data, theme }: OverviewProps) {
  const {
    students,
    attendanceHistory,
    avgGrade,
    avgAtt,
    classes,
    atRisk,
    byClass,
    subjectData,
  } = useOverviewData(data);

  return (
    <div className="fade-up">
      <div className="stat-grid">
        <StatCard
          label="Total Students"
          value={students.length}
          sub={`${classes} active classes`}
          icon={<Users size={24} color={theme.accent} />}
          accentColor={theme.accent}
          trend={4}
          theme={theme}
        />
        <StatCard
          label="Average Grade"
          value={`${avgGrade}%`}
          sub={`School-wide · ${gradeInfo(avgGrade, theme).label}`}
          icon={<TrendingUp size={24} color={theme.emerald} />}
          accentColor={theme.emerald}
          trend={2}
          theme={theme}
        />
        <StatCard
          label="Avg Attendance"
          value={`${avgAtt}%`}
          sub="Current term rate"
          icon={<Calendar size={24} color={theme.sky} />}
          accentColor={theme.sky}
          trend={-1}
          theme={theme}
        />
        <StatCard
          label="At-Risk Students"
          value={atRisk.length}
          sub="Below 75% attendance"
          icon={<AlertTriangle size={24} color={theme.rose} />}
          accentColor={theme.rose}
          theme={theme}
        />
      </div>

      {atRisk.length > 0 && (
        <div className="alert" style={alertBoxStyle(theme)}>
          <div style={alertIconWrapStyle}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={alertTitleStyle}>
              {atRisk.length} student{atRisk.length > 1 ? "s" : ""} require attention
            </div>
            <div style={alertBodyStyle}>
              {atRisk.map((student) => student.name).join(", ")} — below 75% attendance threshold
            </div>
          </div>
        </div>
      )}

      <div className="chart-grid-3">
        <div className="card">
          <div className="card-title">Grade &amp; Attendance by Class</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byClass} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: theme.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: theme.muted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip unit="%" theme={theme} />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: theme.muted, paddingTop: 16 }} />
              <Bar dataKey="grade" name="Grade" fill={theme.accent} radius={[6, 6, 0, 0]} />
              <Bar dataKey="attendance" name="Attendance" fill={theme.sky} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Grade Distribution</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {subjectData.map((_, index) => (
                  <Cell key={index} fill={theme.chart[index % theme.chart.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip unit="%" theme={theme} />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: theme.muted, paddingTop: 16 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Attendance Trend — Monthly</div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={attendanceHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.sky} stopOpacity={0.25} />
                <stop offset="95%" stopColor={theme.sky} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.accent} stopOpacity={0.1} />
                <stop offset="95%" stopColor={theme.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: theme.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[70, 100]} tick={{ fill: theme.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip unit="%" theme={theme} />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: theme.muted, paddingTop: 16 }} />
            <Area type="monotone" dataKey="rate" name="Attendance" stroke={theme.sky} strokeWidth={2.5} fill="url(#attGrad)" dot={{ r: 4, fill: theme.sky, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="target" name="Target" stroke={theme.accent} strokeWidth={1.5} fill="url(#targetGrad)" strokeDasharray="5 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


