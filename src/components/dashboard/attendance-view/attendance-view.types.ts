import type { ReactNode } from "react";
import type { Student } from "@/types/dashboard";

export type DataTableColumn<Row> = {
  key: keyof Row | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Row) => ReactNode;
};

export type AttendanceSummary = {
  present: number;
  absent: number;
  late: number;
  total: number;
};

export type AttendanceViewData = {
  students: Student[];
  recordsLength: number;
  date: string;
  setDate: (date: string) => void;
  columns: DataTableColumn<Student>[];
  exportCSV: (rows: Student[]) => void;
  summary: AttendanceSummary;
  clearRecords: () => void;
};
