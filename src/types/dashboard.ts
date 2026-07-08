export type Student = {
  id: string | number;
  name: string;
  studentId: string;
  class: string;
  gender: string;
  status: string;
  grade?: number;
  attendance?: number;
  subject?: string;
};

export type AttendanceRecord = {
  id: string;
  date: string;
  studentId: string;
  status: string;
  note: string;
};

export type DashboardData = {
  school: string;
  term: string;
  lastUpdated: string;
  students: Student[];
  attendanceHistory: { month: string; rate: number; target: number }[];
  gradeDistribution: { range: string; count: number; label: string }[];
};

export type TooltipPayload = {
  color?: string;
  name?: string | number;
  value?: string | number;
};

declare global {
  interface Window {
    __MOCK_DATA__?: DashboardData;
  }
}


