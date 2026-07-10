"use client";

import Stack from "@mui/material/Stack";
import { DashboardOverview } from "@features/dashboard/components/dashboard-overview";
import { AppShell } from "@layouts/app-shell";
import { AppButton } from "@components/ui/button";
import { TaskList } from "@/components/tasks";

export default function HomePage() {
  return (
    <AppShell>
      <Stack spacing={4}>
        {/* Render the default project overview */}
        <DashboardOverview />

        {/* Render the team's newly added Task List */}
        <TaskList />

        {/* Your Custom Navigation Portal with brand colors */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <a href="/duedatepicker" style={{ textDecoration: 'none' }}>
            <AppButton 
              size="large" 
              variant="contained"
              sx={{
                backgroundColor: "#01381e", // Your brand deep green
                color: "#Dee2b1",           // Your brand cream text
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(1, 56, 30, 0.2)",
                "&:hover": {
                  backgroundColor: "#012a16", // Slightly darker green on hover
                  boxShadow: "0px 6px 16px rgba(1, 56, 30, 0.3)",
                }
              }}
            >
              Go to Due Date Picker →
            </AppButton>
          </a>
        </Stack>
      </Stack>
    </AppShell>
  );
}