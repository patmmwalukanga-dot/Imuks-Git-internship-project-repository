"use client";

import { avg, groupBy } from "@/components/dashboard/dashboard-utils";
import type { DashboardData } from "@/types/dashboard";
import type { ClassPerformance, OverviewData, SubjectGrade } from "./overview.types";

export function useOverviewData(data: DashboardData): OverviewData {
  const { students, attendanceHistory } = data;
  const avgGrade = avg(students.map((student) => student.grade ?? 0));
  const avgAtt = avg(students.map((student) => student.attendance ?? 0));
  const classes = [...new Set(students.map((student) => student.class))].length;
  const atRisk = students.filter((student) => (student.attendance ?? 0) < 75);

  const byClass: ClassPerformance[] = Object.entries(groupBy(students, "class")).map(([cls, list]) => ({
    name: cls,
    grade: avg(list.map((student) => student.grade ?? 0)),
    attendance: avg(list.map((student) => student.attendance ?? 0)),
  }));

  const subjectData: SubjectGrade[] = Object.entries(groupBy(students, "subject")).map(([subject, list]) => ({
    name: subject,
    value: avg(list.map((student) => student.grade ?? 0)),
  }));

  return {
    students,
    attendanceHistory,
    avgGrade,
    avgAtt,
    classes,
    atRisk,
    byClass,
    subjectData,
  };
}
