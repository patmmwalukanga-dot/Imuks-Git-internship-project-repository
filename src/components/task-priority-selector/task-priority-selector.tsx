"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTaskPrioritySelector } from "./hooks";
import {
  chipStyles,
  containerStyles,
  previewCardStyles,
  selectStyles,
} from "./styles";

export function TaskPrioritySelector() {
  const { task, handlePriorityChange } = useTaskPrioritySelector();

  return (
    <Paper elevation={0} sx={containerStyles}>
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
            sx={selectStyles(task.priority)}
          >
            <MenuItem value="Low">Low Priority</MenuItem>
            <MenuItem value="Medium">Medium Priority</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
          </Select>
        </FormControl>

        <Paper elevation={0} sx={previewCardStyles}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Task Preview
            </Typography>

            <Typography variant="h6" fontWeight={800}>
              {task.title}
            </Typography>

            <Chip label={`${task.priority} Priority`} sx={chipStyles(task.priority)} />

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