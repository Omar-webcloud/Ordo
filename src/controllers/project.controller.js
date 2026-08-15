import * as projectService from "../services/project.service.js";

/**
 * Create a new project
 */
export const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all projects belonging to the authenticated user
 */
export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user.id);

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: {
        projects,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single project
 */
export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a project
 */
export const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};