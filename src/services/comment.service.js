import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new comment on a task
 */
export const createComment = async (taskId, content, userId) => {
  const task = await Task.findById(taskId).populate("project", "members");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isMember = task.project.members.some(
    (memberId) => memberId.toString() === userId.toString()
  );

  if (!isMember) {
    throw new ApiError(403, "You do not have access to comment on this task");
  }

  const comment = await Comment.create({
    task: taskId,
    author: userId,
    content,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "author",
    "name email"
  );

  return populatedComment;
};

/**
 * Get all comments for a task
 */
export const getTaskComments = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("project", "members");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isMember = task.project.members.some(
    (memberId) => memberId.toString() === userId.toString()
  );

  if (!isMember) {
    throw new ApiError(403, "You do not have access to view this task's comments");
  }

  const comments = await Comment.find({ task: taskId })
    .populate("author", "name email")
    .sort({ createdAt: 1 });

  return comments;
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own comments");
  }

  await Comment.findByIdAndDelete(commentId);
};
