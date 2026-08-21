import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Project name is required" })
      .trim()
      .min(1, "Project name cannot be empty")
      .max(100, "Project name cannot exceed 100 characters"),
    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional()
      .default(""),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Project ID is required"),
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Project name cannot be empty")
      .max(100, "Project name cannot exceed 100 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
  }),
});

export const projectParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Project ID is required"),
  }),
});
