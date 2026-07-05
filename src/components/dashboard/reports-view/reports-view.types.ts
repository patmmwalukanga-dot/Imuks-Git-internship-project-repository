import type { RefObject } from "react";
import type { Theme } from "@/hooks/theme";

export type ReportsViewProps = {
  theme: Theme;
};

export type ClassSummary = {
  name: string;
  count: number;
  avg: number;
};

export type AttendanceClassSummary = {
  name: string;
  total: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  present: number;
  absent: number;
  late: number;
  avg: number;
};

export type StatusTotals = {
  present: number;
  absent: number;
  late: number;
  total: number;
};

export type AttendanceTrendPoint = {
  date: string;
  statusRate: number;
  index: number;
};

export type ReportsData = {
  reportsRef: RefObject<HTMLDivElement | null>;
  byClass: ClassSummary[];
  attendanceByClass: AttendanceClassSummary[];
  attendanceTrend: AttendanceTrendPoint[];
  statusTotals: StatusTotals;
  exportCSV: (rows: Record<string, unknown>[], name: string) => void;
  exportPDF: () => Promise<void>;
};
