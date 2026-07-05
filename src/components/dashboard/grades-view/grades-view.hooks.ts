"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import type { Student } from "@/types/dashboard";
import {
  gradeCellStyle,
  gradeInputStyle,
  gradeValueStyle,
} from "./grades-view.styles";
import type { DataTableColumn, GradesViewData } from "./grades-view.types";

const STORAGE_KEY = "students-data";

export function useGradesViewData(): GradesViewData {
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState("Mathematics");
  const [grades, setGrades] = useState<Record<string, number>>({});

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      try {
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed && Array.isArray(parsed) && parsed.length) {
          setStudents(parsed);
        } else if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students);
        }
      } catch {
        if (window.__MOCK_DATA__?.students) {
          setStudents(window.__MOCK_DATA__.students);
        }
      }
    });
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setGrades((prev) => {
        const next = { ...prev };
        students.forEach((student) => {
          const id = String(student.id);
          if (next[id] == null) {
            next[id] = student.grade ?? 0;
          }
        });
        return next;
      });
    });
  }, [students]);

  const subjects = useMemo(
    () => [...new Set(students.map((student) => student.subject || subject))],
    [students, subject],
  );

  const saveGrade = (id: string, value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric < 0 || numeric > 100) {
      alert("Enter 0-100");
      return;
    }
    setGrades((prev) => ({ ...prev, [id]: numeric }));
  };

  const columns: DataTableColumn<Student>[] = [
    { key: "name", label: "Student" },
    { key: "class", label: "Class" },
    { key: "subject", label: "Subject" },
    {
      key: "grade",
      label: "Grade",
      render: (_: unknown, row: Student) => {
        const id = String(row.id);
        return createElement(
          "div",
          { style: gradeCellStyle },
          createElement("input", {
            style: gradeInputStyle,
            defaultValue: grades[id] ?? row.grade ?? 0,
            onBlur: (event) => saveGrade(id, event.target.value),
          }),
          createElement(
            "div",
            { style: gradeValueStyle },
            `${grades[id] ?? row.grade ?? 0}%`,
          ),
        );
      },
    },
  ];

  const exportCSV = (rows: Student[]) => {
    if (!rows.length) {
      alert("No rows");
      return;
    }

    const body = rows
      .map((row) => {
        const id = String(row.id);
        return `${row.name},${row.class},${row.subject ?? ""},${grades[id] ?? row.grade ?? ""}`;
      })
      .join("\n");

    const blob = new Blob([`Name,Class,Subject,Grade\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grades.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const avgGrade = useMemo(() => {
    const values = students.map((student) => grades[String(student.id)] ?? student.grade ?? 0);
    if (!values.length) return 0;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }, [grades, students]);

  const topGrade = Math.max(...Object.values(grades).length ? Object.values(grades) : [0]);
  const lowestGrade = Math.min(...Object.values(grades).length ? Object.values(grades) : [0]);

  const handleUpload = () => alert("Bulk upload not implemented");

  return {
    students,
    subject,
    setSubject,
    subjects,
    columns,
    exportCSV,
    avgGrade,
    topGrade,
    lowestGrade,
    handleUpload,
  };
}
