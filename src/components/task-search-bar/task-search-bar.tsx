"use client";

import { useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type TaskStatus = "Pending" | "Completed";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Prepare the final proposal document for review.",
    status: "Pending",
  },
  {
    id: 2,
    title: "Submit assignment",
    description: "Upload the assignment before the deadline.",
    status: "Completed",
  },
  {
    id: 3,
    title: "Review dashboard design",
    description: "Check the dashboard layout and suggest improvements.",
    status: "Pending",
  },
];

export function TaskSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 720,
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
            Task Search Bar
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Search and filter task cards in real time.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            fullWidth
            label="Search tasks"
            placeholder="Search by title, description, or status..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearSearch}
            disabled={!searchTerm}
            sx={{
              minWidth: 120,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Clear
          </Button>
        </Stack>

        <Stack spacing={1.5}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Paper
                key={task.id}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      {task.title}
                    </Typography>

                    <Chip
                      label={task.status}
                      color={task.status === "Completed" ? "success" : "warning"}
                      sx={{
                        width: "fit-content",
                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Typography color="text.secondary">
                    {task.description}
                  </Typography>
                </Stack>
              </Paper>
            ))
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography fontWeight={700}>No tasks found</Typography>
              <Typography color="text.secondary" fontSize={14}>
                Try a different search term or clear the search.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}