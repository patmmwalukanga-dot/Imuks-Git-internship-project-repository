import { TaskPrioritySelector } from "@components/task-priority-selector";

export default function TaskPrioritySelectorPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <TaskPrioritySelector />
    </main>
  );
}