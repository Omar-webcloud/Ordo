const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  statusCode?: number;
};

// Import user type for type safety
import type { User } from "../types/user";

class ApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const request = async <T>(
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
      result.statusCode || response.status
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
    projects: import("../types/project").Project[];
  }>("/projects");
};

export const getProject = async (projectId: string) => {
  return request<{
    project: import("../types/project").Project;
  }>(`/projects/${projectId}`);
};

export const createProject = async (data: {
  name: string;
  description?: string;
}) => {
  return request<{
    project: import("../types/project").Project;
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
    project: import("../types/project").Project;
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
    assignedTo?: string;
    status?: import("../types/task").TaskStatus;
    priority?: import("../types/task").TaskPriority;
    dueDate?: string | null;
  }
) => {
  return request<{
    task: import("../types/task").Task;
  }>(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getProjectTasks = async (projectId: string) => {
  return request<{
    tasks: import("../types/task").Task[];
  }>(`/projects/${projectId}/tasks`);
};

export const getTask = async (taskId: string) => {
  return request<{
    task: import("../types/task").Task;
  }>(`/tasks/${taskId}`);
};

export const updateTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    assignedTo?: string | null;
    status?: import("../types/task").TaskStatus;
    priority?: import("../types/task").TaskPriority;
    dueDate?: string | null;
  }
) => {
  return request<{
    task: import("../types/task").Task;
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

export { ApiError };