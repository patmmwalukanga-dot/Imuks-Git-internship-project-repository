"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import type { AttendanceRecord, Student } from "@/types/dashboard";
import { rowActionsStyle } from "./attendance-view.styles";
import type { AttendanceSummary, AttendanceViewData, DataTableColumn } from "./attendance-view.types";

const STORAGE_KEY = "attendance-data";
const ATTENDANCE_STATUS = ["Present", "Absent", "Late"];
const ATTENDANCE_NOTES: Record<string, string[]> = {
  Present: ["On time", "Ready for class", "Participated actively"],
  Absent: ["Sick leave", "Family matter", "No show"],
  Late: ["Traffic delay", "Doctor appointment", "Arrived late"],
};

const pickNote = (status: string) => {
  const notes = ATTENDANCE_NOTES[status] || ["Attendance recorded"];
  return notes[Math.floor(Math.random() * notes.length)];
};

export function useAttendanceViewData(): AttendanceViewData {
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  useEffect(() => {
    queueMicrotask(() => {
      const sRaw = localStorage.getItem("students-data");
      try {
        const parsed = sRaw ? JSON.parse(sRaw) : null;
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

      const aRaw = localStorage.getItem(STORAGE_KEY);
      try {
        const parsed = aRaw ? JSON.parse(aRaw) : null;
        if (parsed && Array.isArray(parsed)) {
          setRecords(parsed);
        }
      } catch {
        // ignore
      }
    });
  }, []);

  useEffect(() => {
    if (!students.length || records.length) return;
    queueMicrotask(() => {
      const generated = students.map((student) => {
        const status = ATTENDANCE_STATUS[Math.floor(Math.random() * ATTENDANCE_STATUS.length)];
        return {
          id: `${today}-${String(student.id)}`,
          date: today,
          studentId: String(student.id),
          status,
          note: pickNote(status),
        };
      });
      setRecords(generated);
    });
  }, [students, records.length, today]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const mark = (studentId: string | number, status: string) => {
    const idKey = String(studentId);
    const note = pickNote(status);
    setRecords((prev) => {
      const existing = prev.find((record) => record.date === date && record.studentId === idKey);
      if (existing) {
        return prev.map((record) =>
          record === existing ? { ...record, status, note } : record,
        );
      }
      return [
        {
          id: `${Date.now()}-${idKey}`,
          date,
          studentId: idKey,
          status,
          note,
        },
        ...prev,
      ];
    });
  };

  const columns: DataTableColumn<Student>[] = [
    { key: "name", label: "Student", render: (_: unknown, row: Student) => row.name },
    { key: "studentId", label: "Student ID" },
    { key: "class", label: "Class" },
    {
      key: "status",
      label: "Status",
      render: (_: unknown, row: Student) => {
        const rec = records.find((record) => record.date === date && record.studentId === String(row.id));
        return rec ? rec.status : "â€”";
      },
    },
    {
      key: "note",
      label: "Note",
      render: (_: unknown, row: Student) => {
        const rec = records.find((record) => record.date === date && record.studentId === String(row.id));
        return rec ? rec.note : "â€”";
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Student) => createElement(
        "div",
        { style: rowActionsStyle },
        createElement("button", { className: "btn-icon", onClick: () => mark(row.id, "Present") }, "P"),
        createElement("button", { className: "btn-icon", onClick: () => mark(row.id, "Absent") }, "A"),
        createElement("button", { className: "btn-icon", onClick: () => mark(row.id, "Late") }, "L"),
      ),
    },
  ];

  const exportCSV = (rows: Student[]) => {
    if (!rows.length) {
      alert("No rows");
      return;
    }

    const body = rows
      .map((row) => {
        const rec = records.find((record) => record.studentId === String(row.id) && record.date === date);
        return `${row.name},${row.studentId},${row.class},${rec?.status ?? ""},${rec?.note ?? ""}`;
      })
      .join("\n");

    const blob = new Blob([`Name,Student ID,Class,Status,Note\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const summary = useMemo<AttendanceSummary>(() => {
    const todayRecords = records.filter((record) => record.date === date);
    const present = todayRecords.filter((record) => record.status === "Present").length;
    const absent = todayRecords.filter((record) => record.status === "Absent").length;
    const late = todayRecords.filter((record) => record.status === "Late").length;
    return { present, absent, late, total: students.length };
  }, [date, records, students.length]);

  const clearRecords = () => setRecords([]);

  return {
    students,
    recordsLength: records.length,
    date,
    setDate,
    columns,
    exportCSV,
    summary,
    clearRecords,
  };
}
