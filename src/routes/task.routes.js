import express from "express";

import {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createTaskSchema,
  updateTaskSchema,
  taskParamSchema,
  projectTasksParamSchema,
} from "../validations/task.validation.js";

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// Project task routes
router.post(
  "/projects/:projectId/tasks",
  validate(createTaskSchema),
  createTask
);
router.get(
  "/projects/:projectId/tasks",
  validate(projectTasksParamSchema),
  getProjectTasks
);

// Individual task routes
router.get("/tasks/:id", validate(taskParamSchema), getTask);
router.patch("/tasks/:id", validate(updateTaskSchema), updateTask);
router.delete("/tasks/:id", validate(taskParamSchema), deleteTask);

export default router;