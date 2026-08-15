import type { User } from "./user";
import type { Project } from "./project";

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export type Task = {
  _id: string;
  title: string;
  description: string;
  project: Project | string;
  assignedTo: User | string | null;
  createdBy: User | string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};