import mongoose from "mongoose";

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a task inside a project
 */
export const createTask = async (
  projectId,
  taskData,
  userId
) => {
  const project = await Project.findOne({
    _id: projectId,
    members: userId,
  });

  if (!project) {
    throw new ApiError(
      404,
      "Project not found or you are not a member"
    );
  }

  const task = await Task.create({
    ...taskData,
    project: projectId,
    createdBy: userId,
  });

  return task;
};

/**
 * Get all tasks belonging to a project
 */
export const getProjectTasks = async (
  projectId,
  userId
) => {
  const project = await Project.findOne({
    _id: projectId,
    members: userId,
  });

  if (!project) {
    throw new ApiError(
      404,
      "Project not found or you are not a member"
    );
  }

  const tasks = await Task.find({
    project: projectId,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return tasks;
};

/**
 * Get a single task
 */
export const getTaskById = async (
  taskId,
  userId
) => {
  const task = await Task.findById(taskId)
    .populate("project", "name owner members")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isMember = task.project.members.some(
    (memberId) => memberId.toString() === userId.toString()
  );

  if (!isMember) {
    throw new ApiError(
      403,
      "You do not have access to this task"
    );
  }

  return task;
};

/**
 * Update a task
 */
export const updateTask = async (
  taskId,
  taskData,
  userId
) => {
  const task = await Task.findById(taskId).populate(
    "project",
    "owner members"
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isMember = task.project.members.some(
    (memberId) => memberId.toString() === userId.toString()
  );

  if (!isMember) {
    throw new ApiError(
      403,
      "You do not have access to this task"
    );
  }

  const allowedFields = [
    "title",
    "description",
    "assignedTo",
    "status",
    "priority",
    "dueDate",
  ];

  for (const field of allowedFields) {
    if (taskData[field] !== undefined) {
      task[field] = taskData[field];
    }
  }

  await task.save();

  return task;
};

/**
 * Delete a task
 */
export const deleteTask = async (
  taskId,
  userId
) => {
  const task = await Task.findById(taskId).populate(
    "project",
    "owner members"
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isOwner =
    task.project.owner.toString() === userId.toString();

  const isCreator =
    task.createdBy.toString() === userId.toString();

  if (!isOwner && !isCreator) {
    throw new ApiError(
      403,
      "Only the project owner or task creator can delete this task"
    );
  }

  await Task.findByIdAndDelete(taskId);
};