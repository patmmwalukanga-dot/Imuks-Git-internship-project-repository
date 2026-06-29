"use client";

import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { DashboardOverview } from "@features/dashboard/components/dashboard-overview";
import { AppShell } from "@layouts/app-shell";
import { AppButton } from "@components/ui/button";
import { DueDate } from "../components/datepicker/due_date";

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

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <AppShell>
      <Stack spacing={4}>
        <DashboardOverview />

        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={700}>
              Create Task
            </Typography>
            <Stack component="form" spacing={3} onSubmit={handleAddTask}>
              <TextField
                label="Task title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
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
              <AppButton type="submit">Add task</AppButton>
            </Stack>
          </Stack>
        </Paper>

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
            <Typography variant="h5" fontWeight={700}>
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
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Typography fontWeight={700}>{task.title}</Typography>
                      <Typography color="text.secondary">
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
