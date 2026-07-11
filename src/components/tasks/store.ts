import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { DEFAULT_TASKS, TASK_STORE_NAME } from "./constants";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export class TaskStore {
  tasks: Task[] = DEFAULT_TASKS.map((t) => ({ ...t }));

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: TASK_STORE_NAME,
      properties: ["tasks"],
      storage:
        typeof window !== "undefined" ? window.localStorage : undefined,
    });
  }

  get sortedTasks() {
    return [...this.tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }

  toggleComplete = (id: string) => {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  reset = () => {
    this.tasks = [];
  };
}