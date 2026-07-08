"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/dashboard/common/data-table";
import type { AttendanceRecord, Student } from "@/types/dashboard";
import {
  attendanceLayoutStyle,
  formColumnStyle,
  historyNoteStyle,
  rowActionsStyle,
  sidebarColumnStyle,
  summaryCardStyle,
  summaryCardsStyle,
  summaryGridStyle,
  summaryLabelStyle,
  summaryValueStyle,
  toolbarActionsStyle,
  toolbarRowStyle,
} from "./attendance-view.styles";

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

export default function AttendanceView() {
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

  const columns = [
    { key: "name", label: "Student", render: (_: unknown, row: Student) => row.name },
    { key: "studentId", label: "Student ID" },
    { key: "class", label: "Class" },
    {
      key: "status",
      label: "Status",
      render: (_: unknown, row: Student) => {
        const rec = records.find((record) => record.date === date && record.studentId === String(row.id));
        return rec ? rec.status : "—";
      },
    },
    {
      key: "note",
      label: "Note",
      render: (_: unknown, row: Student) => {
        const rec = records.find((record) => record.date === date && record.studentId === String(row.id));
        return rec ? rec.note : "—";
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Student) => (
        <div style={rowActionsStyle}>
          <button className="btn-icon" onClick={() => mark(row.id, "Present")}>P</button>
          <button className="btn-icon" onClick={() => mark(row.id, "Absent")}>A</button>
          <button className="btn-icon" onClick={() => mark(row.id, "Late")}>L</button>
        </div>
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

  const summary = useMemo(() => {
    const todayRecords = records.filter((record) => record.date === date);
    const present = todayRecords.filter((record) => record.status === "Present").length;
    const absent = todayRecords.filter((record) => record.status === "Absent").length;
    const late = todayRecords.filter((record) => record.status === "Late").length;
    return { present, absent, late, total: students.length };
  }, [date, records, students.length]);

  return (
    <div className="fade-up">
      <div style={attendanceLayoutStyle}>
        <div style={formColumnStyle}>
          <div className="card">
            <div className="card-title">Mark Attendance</div>
            <div style={toolbarRowStyle}>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <div style={toolbarActionsStyle}>
                <button className="btn-icon" onClick={() => exportCSV(students)}>
                  Export
                </button>
                <button className="btn-icon" onClick={() => setRecords([])}>
                  Clear
                </button>
              </div>
            </div>
            <div style={summaryGridStyle}>
              <div style={summaryCardsStyle}>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Present</div>
                  <div style={summaryValueStyle}>{summary.present}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Absent</div>
                  <div style={summaryValueStyle}>{summary.absent}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Late</div>
                  <div style={summaryValueStyle}>{summary.late}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Total</div>
                  <div style={summaryValueStyle}>{summary.total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={sidebarColumnStyle}>
          <div className="card">
            <div className="card-title">Attendance History</div>
            <div style={historyNoteStyle}>
              Recent records: {records.length}
            </div>
          </div>
        </div>
      </div>

      <DataTable title={`Attendance — ${date}`} columns={columns} data={students} onExport={exportCSV} />
    </div>
  );
}


