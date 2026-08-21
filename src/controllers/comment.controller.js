import * as commentService from "../services/comment.service.js";

/**
 * Add a comment to a task
 */
export const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(
      req.params.taskId,
      req.body.content,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get comments for a task
 */
export const getTaskComments = async (req, res, next) => {
  try {
    const comments = await commentService.getTaskComments(
      req.params.taskId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: {
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
