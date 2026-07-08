"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  AttendanceRecord,
  AttendanceStatus,
  AttendanceTab,
  DailyRollCall,
  StatCardData,
  StatusCounts,
} from "./types";
import {
  DEFAULT_EMPLOYEES,
  RECORDS_PER_PAGE,
  STORAGE_KEY,
} from "./types";

export function loadAllRecords(): DailyRollCall[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAllRecords(records: DailyRollCall[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getOrCreateRollCall(date: string): DailyRollCall {
  const all = loadAllRecords();
  const existing = all.find((r) => r.date === date);
  if (existing) return existing;

  return {
    date,
    submitted: false,
    records: DEFAULT_EMPLOYEES.map((emp) => ({
      employeeId: emp.id,
      date,
      status: "present",
      timeLogged: undefined,
    })),
  };
}

export function upsertRollCall(rollCall: DailyRollCall): void {
  const all = loadAllRecords();
  const idx = all.findIndex((r) => r.date === rollCall.date);
  if (idx >= 0) {
    all[idx] = rollCall;
  } else {
    all.unshift(rollCall);
  }
  saveAllRecords(all);
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function now12h(): string {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function countByStatus(records: AttendanceRecord[]): StatusCounts {
  return {
    total: records.length,
    present: records.filter((r) => r.status === "present").length,
    absent: records.filter((r) => r.status === "absent").length,
    late: records.filter((r) => r.status === "late").length,
  };
}

export function getEmployeeInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarColorIndex(name: string, paletteLength: number): number {
  return name.charCodeAt(0) % paletteLength;
}

export function filterRecordsBySearch(
  records: AttendanceRecord[],
  search: string
): AttendanceRecord[] {
  if (!search) return records;

  const query = search.toLowerCase();
  return records.filter((rec) => {
    const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId);
    if (!emp) return false;

    return (
      emp.name.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query)
    );
  });
}

export function buildStatCards(stats: StatusCounts, darkMode: boolean): StatCardData[] {
  return [
    {
      label: "Total Crew",
      value: stats.total,
      icon: "👥",
      bg: darkMode ? "rgba(255,255,255,0.1)" : "#eaf4ee",
      color: darkMode ? "#fff" : "#1a3a22",
    },
    { label: "Present", value: stats.present, icon: "✓", bg: "#ecfdf5", color: "#047857" },
    { label: "Absent", value: stats.absent, icon: "✕", bg: "#fef2f2", color: "#dc2626" },
    { label: "Late", value: stats.late, icon: "⏱", bg: "#fffbeb", color: "#d97706" },
  ];
}

export function exportRollCallCSV(rollCall: DailyRollCall): void {
  const rows = [["Employee ID", "Name", "Position", "Shift", "Status", "Time Logged", "Date"]];

  rollCall.records.forEach((rec) => {
    const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId);
    if (!emp) return;

    rows.push([
      emp.id,
      emp.name,
      emp.position,
      emp.shift,
      rec.status,
      rec.timeLogged || "",
      rec.date,
    ]);
  });

  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `roll-call-${rollCall.date}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function useAttendancePage() {
  const [tab, setTab] = useState<AttendanceTab>("mark");
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [rollCall, setRollCall] = useState<DailyRollCall | null>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<DailyRollCall[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadRollCall = useCallback(() => {
    setRollCall(getOrCreateRollCall(selectedDate));
    setPage(1);
  }, [selectedDate]);

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reload roll call when date changes
  loadRollCall();
}, [loadRollCall]);

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reload history when tab changes
  setHistory(loadAllRecords());
}, [tab]);

  const updateStatus = useCallback(
    (employeeId: string, status: AttendanceStatus) => {
      setRollCall((current) => {
        if (!current || current.submitted) return current;

        return {
          ...current,
          records: current.records.map((record) =>
            record.employeeId === employeeId
              ? {
                  ...record,
                  status,
                  timeLogged:
                    status === "present" || status === "late" ? now12h() : undefined,
                }
              : record
          ),
        };
      });
    },
    []
  );

  const bulkMarkPresent = useCallback(() => {
    setRollCall((current) => {
      if (!current || current.submitted) return current;

      const timeLogged = now12h();
      return {
        ...current,
        records: current.records.map((record) => ({
          ...record,
          status: "present" as const,
          timeLogged,
        })),
      };
    });
  }, []);

  const handleSubmitRollCall = useCallback(async () => {
    if (!rollCall) return;

    const missing = rollCall.records.filter((record) => !record.status);
    if (missing.length > 0) {
      showToast("Please mark all employees before submitting.");
      return;
    }

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const final: DailyRollCall = { ...rollCall, submitted: true };
    upsertRollCall(final);
    setRollCall(final);
    setSaving(false);
    showToast("Roll call submitted successfully!");
  }, [rollCall, showToast]);

  const handleExportCSV = useCallback(() => {
    if (!rollCall) return;
    exportRollCallCSV(rollCall);
  }, [rollCall]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setSelectedDate(value);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => !current);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage((current) => Math.max(1, current - 1));
  }, []);

  const goToNextPage = useCallback(
    (totalPages: number) => {
      setPage((current) => Math.min(totalPages, current + 1));
    },
    []
  );

  const goToPage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const filteredRecords = useMemo(
    () => filterRecordsBySearch(rollCall?.records ?? [], search),
    [rollCall, search]
  );

  const totalPages = Math.ceil(filteredRecords.length / RECORDS_PER_PAGE);

  const paginatedRecords = useMemo(
    () =>
      filteredRecords.slice(
        (page - 1) * RECORDS_PER_PAGE,
        page * RECORDS_PER_PAGE
      ),
    [filteredRecords, page]
  );

  const stats = useMemo(
    () => (rollCall ? countByStatus(rollCall.records) : { total: 0, present: 0, absent: 0, late: 0 }),
    [rollCall]
  );

  const statCards = useMemo(
    () => buildStatCards(stats, darkMode),
    [stats, darkMode]
  );

  return {
    tab,
    setTab,
    selectedDate,
    rollCall,
    search,
    saving,
    toast,
    page,
    history,
    darkMode,
    filteredRecords,
    paginatedRecords,
    totalPages,
    statCards,
    loadRollCall,
    updateStatus,
    bulkMarkPresent,
    handleSubmit: handleSubmitRollCall,
    handleExportCSV,
    handleSearchChange,
    handleDateChange,
    toggleDarkMode,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  };
}
