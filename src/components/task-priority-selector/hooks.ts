"use client";

import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Priority, Task } from "./types";

export function useTaskPrioritySelector() {
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

  return {
    task,
    handlePriorityChange,
  };
}