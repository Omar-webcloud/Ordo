import express from "express";

import {
  register,
  login,
  getMe,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected route
router.get("/me", authMiddleware, getMe);

export default router;