import type { User } from "../types/user";
import type { Project } from "../types/project";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import type { Comment } from "../types/comment";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  statusCode?: number;
  errors?: Array<{ field: string; message: string }>;
};

export class ApiError extends Error {
  statusCode?: number;
  errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    statusCode?: number,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("ordo_token")
      : null;

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let result: ApiResponse<T> | ApiErrorResponse;

  try {
    result = await response.json();
  } catch {
    throw new ApiError(
      "The server returned an invalid response",
      response.status
    );
  }

  if (!response.ok || !result.success) {
    throw new ApiError(
      result.message || "Something went wrong",
      result.statusCode || response.status,
      (result as ApiErrorResponse).errors
    );
  }

  return result as ApiResponse<T>;
};

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return request<{
    user: User;
    token: string;
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return request<{
    user: User;
    token: string;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCurrentUser = async () => {
  return request<{
    user: User;
  }>("/auth/me");
};

/*
|--------------------------------------------------------------------------
| Projects
|--------------------------------------------------------------------------
*/

export const getProjects = async () => {
  return request<{
    projects: Project[];
  }>("/projects");
};

export const getProject = async (projectId: string) => {
  return request<{
    project: Project;
  }>(`/projects/${projectId}`);
};

export const createProject = async (data: {
  name: string;
  description?: string;
}) => {
  return request<{
    project: Project;
  }>("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProject = async (
  projectId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  return request<{
    project: Project;
  }>(`/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteProject = async (projectId: string) => {
  return request<null>(`/projects/${projectId}`, {
    method: "DELETE",
  });
};

/*
|--------------------------------------------------------------------------
| Tasks
|--------------------------------------------------------------------------
*/

export const createTask = async (
  projectId: string,
  data: {
    title: string;
    description?: string;
    assignedTo?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string | null;
  }
) => {
  return request<{
    task: Task;
  }>(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getProjectTasks = async (
  projectId: string,
  params?: {
    status?: TaskStatus;
    priority?: TaskPriority;
    assignedTo?: string;
    search?: string;
  }
) => {
  const query = new URLSearchParams();
  if (params?.status) query.append("status", params.status);
  if (params?.priority) query.append("priority", params.priority);
  if (params?.assignedTo) query.append("assignedTo", params.assignedTo);
  if (params?.search) query.append("search", params.search);

  const queryString = query.toString();
  const endpoint = `/projects/${projectId}/tasks${
    queryString ? `?${queryString}` : ""
  }`;

  return request<{
    tasks: Task[];
  }>(endpoint);
};

export const getTask = async (taskId: string) => {
  return request<{
    task: Task;
  }>(`/tasks/${taskId}`);
};

export const updateTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    assignedTo?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string | null;
  }
) => {
  return request<{
    task: Task;
  }>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (taskId: string) => {
  return request<null>(`/tasks/${taskId}`, {
    method: "DELETE",
  });
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

export const getTaskComments = async (taskId: string) => {
  return request<{
    comments: Comment[];
  }>(`/tasks/${taskId}/comments`);
};

export const createComment = async (taskId: string, content: string) => {
  return request<{
    comment: Comment;
  }>(`/tasks/${taskId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const deleteComment = async (commentId: string) => {
  return request<null>(`/comments/${commentId}`, {
    method: "DELETE",
  });
};