export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: number;
  title: string;
  priority: Priority;
};