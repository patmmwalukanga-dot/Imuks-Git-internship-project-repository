import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export class TaskStore {
  tasks: Task[] = [
    {
      id: "1",
      title: "Set up project repo",
      description: "Initialize the repository, install dependencies, and configure linting.",
      completed: false,
    },
    {
      id: "2",
      title: "Build task list UI",
      description: "Create the task card layout with checkbox, title, and description.",
      completed: false,
    },
    {
      id: "3",
      title: "Connect to API",
      description: "Wire up the task list to fetch and persist data from the backend.",
      completed: false,
    },
  ];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "TaskStore",
      properties: ["tasks"],
      storage:
        typeof window !== "undefined" ? window.localStorage : undefined,
    });
  }

  // Completed tasks always sort to the bottom; relative order is preserved.
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