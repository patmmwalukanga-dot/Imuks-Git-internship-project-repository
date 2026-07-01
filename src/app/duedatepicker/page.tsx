"use client";

import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { AppShell } from "@layouts/app-shell";
import { AppButton } from "@components/ui/button";
import { DueDate } from "../../components/datepicker/due_date";

interface TaskItem {
  id: number;
  title: string;
  dueDate: string;
}

const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (value: string) => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function DueDatePickerPage() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Solves ESLint linting violations by deferring state changes past the rendering tick
  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
    });
  }, []);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todayString = getTodayString();

    if (!title.trim()) {
      setErrorMessage("Please enter a task title.");
      return;
    }

    if (!dueDate) {
      setErrorMessage("Please select a due date.");
      return;
    }

    if (dueDate < todayString) {
      setErrorMessage("Due date cannot be in the past.");
      return;
    }

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: title.trim(),
        dueDate,
      },
    ]);

    setTitle("");
    setDueDate("");
    setErrorMessage("");
  };

  if (!isMounted) {
    return (
      <AppShell>
        <Typography variant="body1" color="text.secondary">Loading...</Typography>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Stack spacing={4}>
        {/* Create Task Form */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "#01381e", // Custom deep green border
            borderRadius: 2,
            p: 3,
            backgroundColor: "#Dee2b115", // 15% opacity of your cream color for a soft tint
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#01381e" }}>
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
                    borderColor: "#01381e", // Changes active outline to deep green
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#01381e", // Changes active label to deep green
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
              
              {/* Custom Branded Button */}
              <AppButton 
                type="submit"
                sx={{
                  backgroundColor: "#01381e",
                  color: "#Dee2b1", // Cream text on dark green background
                  "&:hover": {
                    backgroundColor: "#012a16", // Slightly darker green on hover
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
            <Typography variant="h5" fontWeight={700} sx={{ color: "#01381e" }}>
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
                      borderColor: "#Dee2b1", // Soft cream accent border for each item
                      borderRadius: 2,
                      p: 2,
                      backgroundColor: "#Dee2b130", // Light cream background fill
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Typography fontWeight={700} sx={{ color: "#01381e" }}>
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