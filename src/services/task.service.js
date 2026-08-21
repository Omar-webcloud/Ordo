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

  return await Task.findById(task._id)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");
};

/**
 * Get all tasks belonging to a project with filtering & search support
 */
export const getProjectTasks = async (
  projectId,
  userId,
  query = {}
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

  const filter = { project: projectId };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.priority) {
    filter.priority = query.priority;
  }

  if (query.assignedTo) {
    filter.assignedTo = query.assignedTo;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(query.limit) || 50));
  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .skip(query.page ? skip : 0)
    .limit(query.limit ? limit : 0);

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

  return await Task.findById(taskId)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");
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