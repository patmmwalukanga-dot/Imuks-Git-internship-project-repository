"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Priority = "Low" | "Medium" | "High";

type Task = {
  id: number;
  title: string;
  priority: Priority;
};

const priorityStyles: Record<
  Priority,
  {
    backgroundColor: string;
    color: string;
    borderColor: string;
  }
> = {
  Low: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderColor: "#2e7d32",
  },
  Medium: {
    backgroundColor: "#fff8e1",
    color: "#f57f17",
    borderColor: "#f9a825",
  },
  High: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderColor: "#d32f2f",
  },
};

export function TaskPrioritySelector() {
  const [task, setTask] = useState<Task>({
    id: 1,
    title: "Complete dashboard task",
    priority: "Low",
  });

  const handlePriorityChange = (event: SelectChangeEvent<Priority>) => {
    const selectedPriority = event.target.value as Priority;

    setTask((currentTask) => ({
      ...currentTask,
      priority: selectedPriority,
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 560,
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Task Priority Selector
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Choose a priority level for the selected task.
          </Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel id="task-priority-label">Priority</InputLabel>
          <Select
            labelId="task-priority-label"
            id="task-priority"
            value={task.priority}
            label="Priority"
            onChange={handlePriorityChange}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              "& .MuiSelect-icon": {
                color: priorityStyles[task.priority].color,
              },
            }}
          >
            <MenuItem value="Low">Low Priority</MenuItem>
            <MenuItem value="Medium">Medium Priority</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
          </Select>
        </FormControl>

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fafafa",
          }}
        >
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Task Preview
            </Typography>

            <Typography variant="h6" fontWeight={800}>
              {task.title}
            </Typography>

            <Chip
              label={`${task.priority} Priority`}
              sx={{
                width: "fit-content",
                fontWeight: 700,
                backgroundColor: priorityStyles[task.priority].backgroundColor,
                color: priorityStyles[task.priority].color,
                border: "1px solid",
                borderColor: priorityStyles[task.priority].borderColor,
              }}
            />

            <Typography color="text.secondary" fontSize={14}>
              Selected priority is saved in the task object as:{" "}
              <strong>{task.priority}</strong>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
}