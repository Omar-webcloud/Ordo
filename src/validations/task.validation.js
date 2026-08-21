import { z } from "zod";

export const createTaskSchema = z.object({
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
  body: z.object({
    title: z
      .string({ required_error: "Task title is required" })
      .trim()
      .min(1, "Task title cannot be empty")
      .max(150, "Task title cannot exceed 150 characters"),
    description: z
      .string()
      .trim()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional()
      .default(""),
    assignedTo: z.string().nullable().optional(),
    status: z
      .enum(["todo", "in_progress", "completed"])
      .optional()
      .default("todo"),
    priority: z
      .enum(["low", "medium", "high"])
      .optional()
      .default("medium"),
    dueDate: z.string().nullable().optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Task title cannot be empty")
      .max(150, "Task title cannot exceed 150 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional(),
    assignedTo: z.string().nullable().optional(),
    status: z.enum(["todo", "in_progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().nullable().optional(),
  }),
});

export const taskParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
});

export const projectTasksParamSchema = z.object({
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
  query: z
    .object({
      status: z.enum(["todo", "in_progress", "completed"]).optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
      assignedTo: z.string().optional(),
      search: z.string().optional(),
      page: z.string().optional(),
      limit: z.string().optional(),
    })
    .optional(),
});
