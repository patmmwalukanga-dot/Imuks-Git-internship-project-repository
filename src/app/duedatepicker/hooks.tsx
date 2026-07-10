import { type FormEvent, useState } from "react";
import { DUE_DATE_PICKER_MESSAGES } from "./constants";
import type { TaskItem } from "./types";

const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (value: string): string => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const useDueDatePicker = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todayString = getTodayString();

    if (!title.trim()) {
      setErrorMessage(DUE_DATE_PICKER_MESSAGES.emptyTitle);
      return;
    }

    if (!dueDate) {
      setErrorMessage(DUE_DATE_PICKER_MESSAGES.missingDate);
      return;
    }

    if (dueDate < todayString) {
      setErrorMessage(DUE_DATE_PICKER_MESSAGES.pastDate);
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

  return {
    title,
    setTitle,
    dueDate,
    setDueDate,
    tasks,
    errorMessage,
    handleAddTask,
  } as const;
};
