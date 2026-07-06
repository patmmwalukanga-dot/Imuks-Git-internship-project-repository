import type { ReactNode } from "react";
import type { Student } from "@/types/dashboard";

export type DataTableColumn<Row> = {
  key: keyof Row | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Row) => ReactNode;
};

export type GradesViewData = {
  students: Student[];
  subject: string;
  setSubject: (subject: string) => void;
  subjects: string[];
  columns: DataTableColumn<Student>[];
  exportCSV: (rows: Student[]) => void;
  avgGrade: number;
  topGrade: number;
  lowestGrade: number;
  handleUpload: () => void;
};
