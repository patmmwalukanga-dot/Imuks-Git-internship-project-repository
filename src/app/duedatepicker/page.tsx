"use client";

import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { AppShell } from "@layouts/app-shell";
import { AppButton } from "@components/ui/button";
import { DueDate } from "../../components/datepicker/due_date";
import { DUE_DATE_PICKER_COLORS } from "./constants";
import { formatDisplayDate, useDueDatePicker } from "./hooks";

function DueDatePickerWorkspace() {
  const {
    title,
    setTitle,
    dueDate,
    setDueDate,
    tasks,
    errorMessage,
    handleAddTask,
  } = useDueDatePicker();

  return (
    <AppShell>
      <Stack spacing={4}>
        {/* Create Task Form */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: DUE_DATE_PICKER_COLORS.primary,
            borderRadius: 2,
            p: 3,
            backgroundColor: DUE_DATE_PICKER_COLORS.panelBackground,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={700} sx={{ color: DUE_DATE_PICKER_COLORS.primary }}>
              Create Task
            </Typography>
            <Stack component="form" spacing={3} onSubmit={handleAddTask}>
              <TextField
                label="Task title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: DUE_DATE_PICKER_COLORS.primary,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: DUE_DATE_PICKER_COLORS.primary,
                  },
                }}
              />
              <DueDate
                label="Due date"
                onDateChange={(dateValue) => setDueDate(dateValue)}
              />
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <AppButton 
                type="submit"
                sx={{
                  backgroundColor: DUE_DATE_PICKER_COLORS.primary,
                  color: DUE_DATE_PICKER_COLORS.accent,
                  "&:hover": {
                    backgroundColor: "#012a16",
                  }
                }}
              >
                Add task
              </AppButton>
            </Stack>
          </Stack>
        </Paper>

        {/* Task List Panel */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700} sx={{ color: DUE_DATE_PICKER_COLORS.primary }}>
              Task list
            </Typography>
            {tasks.length === 0 ? (
              <Typography color="text.secondary">
                No tasks created yet. Add a task and select a due date.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {tasks.map((task) => (
                  <Paper
                    key={task.id}
                    elevation={0}
                    sx={{
                      border: "1px solid",
                      borderColor: DUE_DATE_PICKER_COLORS.accent,
                      borderRadius: 2,
                      p: 2,
                      backgroundColor: DUE_DATE_PICKER_COLORS.taskCardBackground,
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Typography fontWeight={700} sx={{ color: DUE_DATE_PICKER_COLORS.primary }}>
                        {task.title}
                      </Typography>
                      <Typography color="text.secondary" variant="body2" fontWeight={500}>
                        Due date: {formatDisplayDate(task.dueDate)}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
    </AppShell>
  );
}

// Completely bypasses server-side compilation to avoid linting/hydration conflicts entirely
export default dynamic(() => Promise.resolve(DueDatePickerWorkspace), {
  ssr: false,
  loading: () => (
    <AppShell>
      <Typography variant="body1" color="text.secondary">Loading...</Typography>
    </AppShell>
  ),
});