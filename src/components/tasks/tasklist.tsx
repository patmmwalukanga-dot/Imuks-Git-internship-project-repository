"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useTaskLogic } from "./hooks";
import { taskListStyles } from "./styles";
import type { Task } from "./store";

export const TaskList = observer(function TaskList() {
  const { taskStore, handleToggle } = useTaskLogic();

  return (
    <Stack spacing={1.5}>
      <Typography component="h2" variant="h5" fontWeight={800} sx={taskListStyles.heading}>
        Tasks
      </Typography>
      {taskStore.sortedTasks.map((task: Task) => (
        <Paper key={task.id} elevation={0} sx={taskListStyles.card(task.completed)}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Checkbox
              checked={task.completed}
              onChange={(e) => handleToggle(e, task.id)}
              sx={taskListStyles.checkbox}
            />
            <Stack spacing={0.75} flex={1}>
              <Typography sx={taskListStyles.title(task.completed)}>
                {task.title}
              </Typography>
              {task.description && (
                <Typography sx={taskListStyles.description}>
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