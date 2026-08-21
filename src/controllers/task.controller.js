import * as taskService from "../services/task.service.js";

/**
 * Create a task inside a project
 */
export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(
      req.params.projectId,
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks belonging to a project
 */
export const getProjectTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getProjectTasks(
      req.params.projectId,
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single task
 */
export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 */
export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};