import express from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
  projectParamSchema,
} from "../validations/project.validation.js";

const router = express.Router();

// All project routes require authentication
router.use(authMiddleware);

// Project CRUD
router.post("/", validate(createProjectSchema), createProject);
router.get("/", getProjects);
router.get("/:id", validate(projectParamSchema), getProject);
router.patch("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", validate(projectParamSchema), deleteProject);

export default router;