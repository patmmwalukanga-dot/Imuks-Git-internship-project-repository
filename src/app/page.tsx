import { DashboardOverview } from "@features/dashboard/components/dashboard-overview";
import { AppShell } from "@layouts/app-shell";

//Importing tasks
import { TaskList } from "@/components/tasks";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardOverview />
      <TaskList />
    </AppShell>
    
  );
}
