import Project from "../models/Project.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new project
 */
export const createProject = async (projectData, userId) => {
  const { name, description } = projectData;

  const project = await Project.create({
    name,
    description,
    owner: userId,
    members: [userId],
  });

  return project;
};

/**
 * Get all projects the authenticated user belongs to
 */
export const getProjects = async (userId) => {
  const projects = await Project.find({
    members: userId,
  })
    .populate("owner", "name email")
    .populate("members", "name email")
    .sort({ createdAt: -1 });

  return projects;
};

/**
 * Get a single project
 */
export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    members: userId,
  })
    .populate("owner", "name email")
    .populate("members", "name email");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

/**
 * Update a project
 */
export const updateProject = async (
  projectId,
  projectData,
  userId
) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new ApiError(
      404,
      "Project not found or you are not the project owner"
    );
  }

  const allowedFields = ["name", "description"];

  for (const field of allowedFields) {
    if (projectData[field] !== undefined) {
      project[field] = projectData[field];
    }
  }

  await project.save();

  return project;
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new ApiError(
      404,
      "Project not found or you are not the project owner"
    );
  }

  await Project.findByIdAndDelete(projectId);
};