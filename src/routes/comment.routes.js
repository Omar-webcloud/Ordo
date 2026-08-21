import express from "express";

import {
  createComment,
  getTaskComments,
  deleteComment,
} from "../controllers/comment.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createCommentSchema,
  taskCommentsParamSchema,
  commentParamSchema,
} from "../validations/comment.validation.js";

const router = express.Router();

// All comment routes require authentication
router.use(authMiddleware);

// Task comments
router.post(
  "/tasks/:taskId/comments",
  validate(createCommentSchema),
  createComment
);
router.get(
  "/tasks/:taskId/comments",
  validate(taskCommentsParamSchema),
  getTaskComments
);

// Individual comment routes
router.delete("/comments/:id", validate(commentParamSchema), deleteComment);

export default router;
