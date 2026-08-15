import express from "express";

import {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// Project task routes
router.post("/projects/:projectId/tasks", createTask);
router.get("/projects/:projectId/tasks", getProjectTasks);

// Individual task routes
router.get("/tasks/:id", getTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;