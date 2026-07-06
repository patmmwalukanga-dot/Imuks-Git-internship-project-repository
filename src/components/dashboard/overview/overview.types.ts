import type { Theme } from "@/hooks/theme";
import type { DashboardData, Student } from "@/types/dashboard";

export type OverviewProps = {
  data: DashboardData;
  theme: Theme;
};

export type ClassPerformance = {
  name: string;
  grade: number;
  attendance: number;
};

export type SubjectGrade = {
  name: string;
  value: number;
};

export type OverviewData = {
  students: Student[];
  attendanceHistory: DashboardData["attendanceHistory"];
  avgGrade: number;
  avgAtt: number;
  classes: number;
  atRisk: Student[];
  byClass: ClassPerformance[];
  subjectData: SubjectGrade[];
};
