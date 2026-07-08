export type AttendanceStatus = "present" | "absent" | "late";

export type AttendanceTab = "mark" | "history";

export interface Employee {
  id: string;
  name: string;
  position: string;
  shift: string;
  avatar?: string;
}

export interface AttendanceRecord {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
  timeLogged?: string;
}

export interface DailyRollCall {
  date: string;
  records: AttendanceRecord[];
  submitted: boolean;
}

export interface StatusCounts {
  total: number;
  present: number;
  absent: number;
  late: number;
}

export interface BadgeConfig {
  bg: string;
  color: string;
  dot: string;
  label: string;
}

export interface StatCardData {
  label: string;
  value: number;
  icon: string;
  bg: string;
  color: string;
}

export const ATTENDANCE_STATUSES: AttendanceStatus[] = ["present", "absent", "late"];

export const DEFAULT_EMPLOYEES: Employee[] = [
  { id: "GS-0042", name: "Alex Thompson", position: "Lead Security Officer", shift: "Morning (06:00 - 14:00)" },
  { id: "GS-0089", name: "Sarah Jenkins", position: "Surveillance Tech", shift: "Morning (06:00 - 14:00)" },
  { id: "GS-0123", name: "Marcus Reed", position: "Operations Supervisor", shift: "Morning (06:00 - 14:00)" },
  { id: "GS-0201", name: "Diana Osei", position: "Security Guard", shift: "Morning (06:00 - 14:00)" },
  { id: "GS-0315", name: "James Mwale", position: "CCTV Operator", shift: "Morning (06:00 - 14:00)" },
];

export const STORAGE_KEY = "greenshield_attendance";

export const RECORDS_PER_PAGE = 5;
