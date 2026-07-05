import type { ReactNode } from "react";
import type { Student } from "@/types/dashboard";

export type StudentForm = Omit<Student, "grade" | "attendance" | "subject">;

export type DataTableColumn<Row> = {
  key: keyof Row | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Row) => ReactNode;
};

export type EnrollmentViewData = {
  students: Student[];
  editing: string | number | null;
  form: StudentForm;
  setForm: (form: StudentForm) => void;
  startAdd: () => void;
  cancel: () => void;
  save: () => void;
  columns: DataTableColumn<Student>[];
  exportCSV: (rows: Student[]) => void;
  clearAll: () => void;
};
