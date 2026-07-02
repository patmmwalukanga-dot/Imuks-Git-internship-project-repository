// src/app/page.tsx
import Register from '../components/register/register'; // Ensure this matches actual folder casing

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