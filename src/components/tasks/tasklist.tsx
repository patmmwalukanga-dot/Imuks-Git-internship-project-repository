"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { observer } from "mobx-react-lite";
import { TaskStore } from "./store";
import { fireConfetti } from "./confetti";

export const TaskList = observer(function TaskList() {
  const [taskStore] = useState(() => new TaskStore());

  const handleToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const willBeCompleted = e.target.checked;
    taskStore.toggleComplete(taskId);

    if (willBeCompleted) {
      const rect = e.target.getBoundingClientRect();
      fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <Stack spacing={1.5}>
      <Typography component="h2" variant="h5" fontWeight={800} sx={{ color: "#01381e" }}>
        Tasks
      </Typography>
      {taskStore.sortedTasks.map((task) => (
        <Paper
          key={task.id}
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #eef0e2",
            borderRadius: 3,
            p: 2.5,
            opacity: task.completed ? 0.6 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Checkbox
              checked={task.completed}
              onChange={(e) => handleToggle(e, task.id)}
              sx={{
                mt: 0.25,
                color: "#01381e",
                "&.Mui-checked": { color: "#01381e" },
              }}
            />
            <Stack spacing={0.75} flex={1}>
              <Typography
                sx={{
                  color: "#01381e",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </Typography>
              {task.description && (
                <Typography sx={{ color: "#dee2b1", fontSize: "0.95rem" }}>
                  {task.description}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
});