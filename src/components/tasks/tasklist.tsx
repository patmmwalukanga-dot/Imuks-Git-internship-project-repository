"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useTaskLogic } from "./hooks";

export const TaskList = observer(function TaskList() {
  const { taskStore, handleToggle } = useTaskLogic();

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
            backgroundColor: task.completed ? "#dee2b1" : "#ffffff",
            border: "1px solid #dee2b1",
            borderRadius: 3,
            p: 2.5,
            transition: "all 0.2s ease",
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
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.title}
              </Typography>
              {task.description && (
                <Typography
                  sx={{
                    color: "#01381e",
                    fontSize: "0.95rem",
                    opacity: 0.7,
                  }}
                >
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