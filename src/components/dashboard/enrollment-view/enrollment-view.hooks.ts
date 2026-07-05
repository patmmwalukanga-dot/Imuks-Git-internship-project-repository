"use client";

import { createElement, useEffect, useState } from "react";
import type { Student } from "@/types/dashboard";
import { rowActionsStyle } from "./enrollment-view.styles";
import type { DataTableColumn, EnrollmentViewData, StudentForm } from "./enrollment-view.types";

const STORAGE_KEY = "students-data";

const defaultFields: StudentForm = {
  id: "",
  name: "",
  studentId: "",
  class: "",
  gender: "Female",
  status: "Active",
};

const normalizeStudent = (student: Partial<Student>): Student => {
  const id = student.id || String(Date.now());
  const numericId = String(id).replace(/\D/g, "") || "0";
  return {
    id,
    name: student.name || "",
    studentId: student.studentId || `STU${1000 + Number(numericId)}`,
    class: student.class || "",
    gender: student.gender || "Female",
    status: student.status || "Active",
    grade: student.grade ?? 0,
    attendance: student.attendance ?? 0,
    subject: student.subject || "",
  };
};

export function useEnrollmentViewData(): EnrollmentViewData {
  const [students, setStudents] = useState<Student[]>([]);
  const [editing, setEditing] = useState<string | number | null>(null);
  const [form, setForm] = useState<StudentForm>(defaultFields);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      try {
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed && Array.isArray(parsed) && parsed.length) {
          setStudents(parsed.map((student: Partial<Student>) => normalizeStudent(student)));
        } else if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students.map((student) => normalizeStudent(student)));
        }
      } catch {
        if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students.map((student) => normalizeStudent(student)));
        }
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const startAdd = () => {
    setEditing(null);
    setForm({ ...defaultFields, id: String(Date.now()) });
  };

  const startEdit = (student: Student) => {
    setEditing(student.id);
    setForm({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      class: student.class,
      gender: student.gender,
      status: student.status,
    });
  };

  const cancel = () => {
    setEditing(null);
    setForm(defaultFields);
  };

  const save = () => {
    if (!form.name.trim() || !form.studentId.trim() || !form.class.trim()) {
      alert("Name, Student ID and Class are required");
      return;
    }

    const newStudent: Student = normalizeStudent({ ...form });

    setStudents((prev) => {
      const exists = prev.find((student) => String(student.id) === String(form.id));
      if (exists) {
        return prev.map((student) =>
          String(student.id) === String(form.id) ? newStudent : student,
        );
      }
      return [newStudent, ...prev];
    });

    cancel();
  };

  const remove = (id: string | number) => {
    if (!confirm("Delete student?")) return;
    setStudents((prev) => prev.filter((student) => String(student.id) !== String(id)));
  };

  const columns: DataTableColumn<Student>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "studentId", label: "Student ID", sortable: true },
    { key: "class", label: "Class", sortable: true },
    { key: "gender", label: "Gender" },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Student) => createElement(
        "div",
        { style: rowActionsStyle },
        createElement(
          "button",
          { className: "btn-icon", onClick: () => startEdit(row) },
          "Edit",
        ),
        createElement(
          "button",
          { className: "btn-icon", onClick: () => remove(row.id) },
          "Delete",
        ),
      ),
    },
  ];

  const exportCSV = (rows: Student[]) => {
    if (!rows.length) {
      alert("No rows");
      return;
    }
    const headers = ["name", "studentId", "class", "gender", "status", "grade", "attendance", "subject"].join(",");
    const body = rows
      .map((row) =>
        [row.name, row.studentId, row.class, row.gender, row.status, row.grade ?? "", row.attendance ?? "", row.subject ?? ""].join(","),
      )
      .join("\n");
    const blob = new Blob([`${headers}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setStudents([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    students,
    editing,
    form,
    setForm,
    startAdd,
    cancel,
    save,
    columns,
    exportCSV,
    clearAll,
  };
}
