"use client";

import { useState, useEffect } from "react";
import { stopPersisting } from "mobx-persist-store";
import { TaskStore } from "./store";
import { fireConfetti } from "./confetti";

export const useTaskLogic = () => {
  const [taskStore] = useState(() => new TaskStore());

  useEffect(() => {
    return () => {
      stopPersisting(taskStore);
    };
  }, [taskStore]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const isChecked = e.target.checked;
    taskStore.toggleComplete(taskId);

    if (isChecked) {
      const rect = e.target.getBoundingClientRect();
      fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return { taskStore, handleToggle };
};