import type { DashboardData } from "@/types/dashboard";

export const GITHUB_DATA_URL: string | null = null;

export const MOCK_DATA: DashboardData = {
  school: "Lusaka Academy",
  term: "Term 2 — 2026",
  lastUpdated: new Date().toISOString(),
  students: [
    { id: 1, name: "Amara Phiri", studentId: "STU1001", class: "Grade 10A", gender: "Female", status: "Active", grade: 87, attendance: 95, subject: "Mathematics" },
    { id: 2, name: "Chanda Mwale", studentId: "STU1002", class: "Grade 10A", gender: "Male", status: "Active", grade: 72, attendance: 80, subject: "Mathematics" },
    { id: 3, name: "David Tembo", studentId: "STU1003", class: "Grade 10B", gender: "Male", status: "Active", grade: 91, attendance: 98, subject: "Science" },
    { id: 4, name: "Esther Banda", studentId: "STU1004", class: "Grade 10B", gender: "Female", status: "Active", grade: 65, attendance: 70, subject: "Science" },
    { id: 5, name: "Felix Lungu", studentId: "STU1005", class: "Grade 11A", gender: "Male", status: "Active", grade: 78, attendance: 88, subject: "English" },
    { id: 6, name: "Grace Zulu", studentId: "STU1006", class: "Grade 11A", gender: "Female", status: "Active", grade: 94, attendance: 97, subject: "English" },
    { id: 7, name: "Henry Mutale", studentId: "STU1007", class: "Grade 11B", gender: "Male", status: "Inactive", grade: 55, attendance: 60, subject: "History" },
    { id: 8, name: "Irene Moonga", studentId: "STU1008", class: "Grade 11B", gender: "Female", status: "Active", grade: 83, attendance: 92, subject: "History" },
    { id: 9, name: "James Kabwe", studentId: "STU1009", class: "Grade 12A", gender: "Male", status: "Active", grade: 90, attendance: 96, subject: "Physics" },
    { id: 10, name: "Kunda Nkonde", studentId: "STU1010", class: "Grade 12A", gender: "Female", status: "Active", grade: 76, attendance: 84, subject: "Physics" },
    { id: 11, name: "Liya Musonda", studentId: "STU1011", class: "Grade 12B", gender: "Female", status: "Active", grade: 88, attendance: 91, subject: "Chemistry" },
    { id: 12, name: "Moses Siame", studentId: "STU1012", class: "Grade 12B", gender: "Male", status: "Inactive", grade: 62, attendance: 75, subject: "Chemistry" },
  ],
  attendanceHistory: [
    { month: "Jan", rate: 92, target: 90 },
    { month: "Feb", rate: 88, target: 90 },
    { month: "Mar", rate: 94, target: 90 },
    { month: "Apr", rate: 90, target: 90 },
    { month: "May", rate: 87, target: 90 },
    { month: "Jun", rate: 93, target: 90 },
  ],
  gradeDistribution: [
    { range: "90-100", count: 3, label: "Distinction" },
    { range: "80-89", count: 4, label: "Merit" },
    { range: "70-79", count: 3, label: "Credit" },
    { range: "60-69", count: 2, label: "Pass" },
    { range: "0-59", count: 0, label: "Fail" },
  ],
};

export const PAGES = [
  { id: "overview", label: "Overview" },
  { id: "enrollment", label: "Enrollment" },
  { id: "grades", label: "Grades" },
  { id: "attendance", label: "Attendance" },
  { id: "reports", label: "Reports" },
];
