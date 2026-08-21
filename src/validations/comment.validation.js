import { z } from "zod";

export const createCommentSchema = z.object({
  params: z.object({
    taskId: z.string().min(1, "Task ID is required"),
  }),
  body: z.object({
    content: z
      .string({ required_error: "Comment content is required" })
      .trim()
      .min(1, "Comment cannot be empty")
      .max(2000, "Comment cannot exceed 2000 characters"),
  }),
});

export const commentParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Comment ID is required"),
  }),
});

export const taskCommentsParamSchema = z.object({
  params: z.object({
    taskId: z.string().min(1, "Task ID is required"),
  }),
});
