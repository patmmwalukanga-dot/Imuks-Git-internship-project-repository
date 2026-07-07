import { DashboardOverview } from "@features/dashboard/components/dashboard-overview";
import { AppShell } from "@layouts/app-shell";

//Importing tasks
import { TaskList } from "@/components/tasks";
import Register from "@/components/register/regster";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardOverview />
      <TaskList />
      <Register />
    </AppShell>
  );
}
