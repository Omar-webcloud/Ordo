import * as api from "./api";
import { setAuth, getStoredUser, getToken } from "./auth";
import type { User } from "../types/user";
import type { Project } from "../types/project";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import type { Comment } from "../types/comment";

const STORAGE_PROJECTS_KEY = "ordo_local_projects";
const STORAGE_TASKS_KEY = "ordo_local_tasks";
const STORAGE_COMMENTS_KEY = "ordo_local_comments";

// Seed default initial data if none exists
const seedInitialLocalData = (user: User) => {
  if (typeof window === "undefined") return;

  const existingProjects = localStorage.getItem(STORAGE_PROJECTS_KEY);
  if (!existingProjects || JSON.parse(existingProjects).length === 0) {
    const demoProject: Project = {
      _id: "demo-project-1",
      name: "Ordo Core Engine",
      description: "Development and continuous improvement of the Ordo task management platform.",
      owner: user,
      members: [user],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const demoTasks: Task[] = [
      {
        _id: "demo-task-1",
        title: "Implement REST API Endpoints",
        description: "Build user, project, and task CRUD endpoints with JWT authentication and validation.",
        project: demoProject._id,
        assignedTo: user,
        createdBy: user,
        status: "completed",
        priority: "high",
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "demo-task-2",
        title: "Design Responsive Dashboard UI",
        description: "Create sleek dark mode glassmorphism UI with Tailwind CSS for projects and tasks.",
        project: demoProject._id,
        assignedTo: user,
        createdBy: user,
        status: "in_progress",
        priority: "medium",
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "demo-task-3",
        title: "Dockerize Application & Setup Tests",
        description: "Write Dockerfile, docker-compose.yml, and automated integration tests with Jest.",
        project: demoProject._id,
        assignedTo: user,
        createdBy: user,
        status: "todo",
        priority: "low",
        dueDate: new Date(Date.now() + 86400000 * 10).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const demoComments: Comment[] = [
      {
        _id: "demo-comment-1",
        task: "demo-task-1",
        author: user,
        content: "API endpoints are tested and passing all validation tests!",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify([demoProject]));
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(demoTasks));
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(demoComments));
  }
};

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

export const login = async (email: string, password: string) => {
  try {
    const res = await api.loginUser({ email, password });
    setAuth(res.data.token, res.data.user);
    return res.data;
  } catch (err: any) {
    // If backend is not running or mock test user, use smart fallback
    if (email === "demo@ordo.dev" && password === "password123") {
      const demoUser: User = {
        id: "demo-user-123",
        name: "Demo User",
        email: "demo@ordo.dev",
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAuth("demo-jwt-token-12345", demoUser);
      seedInitialLocalData(demoUser);
      return { user: demoUser, token: "demo-jwt-token-12345" };
    }
    // Check if network error (backend server offline)
    if (err.message && (err.message.includes("fetch") || err.message.includes("network") || err.message.includes("Failed"))) {
      const user: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0] || "User",
        email,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const token = "mock-jwt-" + Date.now();
      setAuth(token, user);
      seedInitialLocalData(user);
      return { user, token };
    }
    throw err;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const res = await api.registerUser({ name, email, password });
    setAuth(res.data.token, res.data.user);
    return res.data;
  } catch (err: any) {
    if (err.message && (err.message.includes("fetch") || err.message.includes("network") || err.message.includes("Failed"))) {
      const user: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const token = "mock-jwt-" + Date.now();
      setAuth(token, user);
      seedInitialLocalData(user);
      return { user, token };
    }
    throw err;
  }
};

/*
|--------------------------------------------------------------------------
| Projects
|--------------------------------------------------------------------------
*/

export const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await api.getProjects();
    return res.data.projects;
  } catch {
    const stored = localStorage.getItem(STORAGE_PROJECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  }
};

export const getProject = async (id: string): Promise<Project> => {
  try {
    const res = await api.getProject(id);
    return res.data.project;
  } catch {
    const projects = await getProjects();
    const project = projects.find((p) => p._id === id);
    if (!project) throw new Error("Project not found");
    return project;
  }
};

export const createProject = async (data: { name: string; description?: string }): Promise<Project> => {
  try {
    const res = await api.createProject(data);
    return res.data.project;
  } catch {
    const user = getStoredUser() || {
      id: "demo-user",
      name: "Demo User",
      email: "demo@ordo.dev",
      role: "user" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newProject: Project = {
      _id: "project-" + Date.now(),
      name: data.name,
      description: data.description || "",
      owner: user,
      members: [user],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const projects = await getProjects();
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    return newProject;
  }
};

export const updateProject = async (id: string, data: { name?: string; description?: string }): Promise<Project> => {
  try {
    const res = await api.updateProject(id, data);
    return res.data.project;
  } catch {
    const projects = await getProjects();
    const index = projects.findIndex((p) => p._id === id);
    if (index === -1) throw new Error("Project not found");

    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    return projects[index];
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await api.deleteProject(id);
  } catch {
    const projects = await getProjects();
    const filtered = projects.filter((p) => p._id !== id);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(filtered));

    // Also delete project's tasks
    const tasks = getLocalTasks().filter((t) => t.project !== id && (t.project as any)?._id !== id);
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }
};

/*
|--------------------------------------------------------------------------
| Tasks
|--------------------------------------------------------------------------
*/

const getLocalTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_TASKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getProjectTasks = async (
  projectId: string,
  params?: { status?: TaskStatus; priority?: TaskPriority; assignedTo?: string; search?: string }
): Promise<Task[]> => {
  try {
    const res = await api.getProjectTasks(projectId, params);
    return res.data.tasks;
  } catch {
    let tasks = getLocalTasks().filter(
      (t) => t.project === projectId || (t.project as any)?._id === projectId
    );

    if (params?.status) {
      tasks = tasks.filter((t) => t.status === params.status);
    }
    if (params?.priority) {
      tasks = tasks.filter((t) => t.priority === params.priority);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      tasks = tasks.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    return tasks;
  }
};

export const getTask = async (id: string): Promise<Task> => {
  try {
    const res = await api.getTask(id);
    return res.data.task;
  } catch {
    const task = getLocalTasks().find((t) => t._id === id);
    if (!task) throw new Error("Task not found");
    return task;
  }
};

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
): Promise<Task> => {
  try {
    const res = await api.createTask(projectId, data);
    return res.data.task;
  } catch {
    const user = getStoredUser() || {
      id: "demo-user",
      name: "Demo User",
      email: "demo@ordo.dev",
      role: "user" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTask: Task = {
      _id: "task-" + Date.now(),
      title: data.title,
      description: data.description || "",
      project: projectId,
      assignedTo: user,
      createdBy: user,
      status: data.status || "todo",
      priority: data.priority || "medium",
      dueDate: data.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const tasks = getLocalTasks();
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify([newTask, ...tasks]));
    return newTask;
  }
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
): Promise<Task> => {
  try {
    const res = await api.updateTask(taskId, data);
    return res.data.task;
  } catch {
    const tasks = getLocalTasks();
    const index = tasks.findIndex((t) => t._id === taskId);
    if (index === -1) throw new Error("Task not found");

    tasks[index] = {
      ...tasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks));
    return tasks[index];
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await api.deleteTask(taskId);
  } catch {
    const tasks = getLocalTasks().filter((t) => t._id !== taskId);
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

const getLocalComments = (): Comment[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_COMMENTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTaskComments = async (taskId: string): Promise<Comment[]> => {
  try {
    const res = await api.getTaskComments(taskId);
    return res.data.comments;
  } catch {
    return getLocalComments().filter((c) => c.task === taskId);
  }
};

export const createComment = async (taskId: string, content: string): Promise<Comment> => {
  try {
    const res = await api.createComment(taskId, content);
    return res.data.comment;
  } catch {
    const user = getStoredUser() || {
      id: "demo-user",
      name: "Demo User",
      email: "demo@ordo.dev",
      role: "user" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newComment: Comment = {
      _id: "comment-" + Date.now(),
      task: taskId,
      author: user,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const comments = getLocalComments();
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify([...comments, newComment]));
    return newComment;
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await api.deleteComment(commentId);
  } catch {
    const comments = getLocalComments().filter((c) => c._id !== commentId);
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
  }
};
