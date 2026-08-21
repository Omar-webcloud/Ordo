"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

import ProtectedRoute from "../../../../components/auth/ProtectedRoute";
import {
  getProject,
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../../../lib/dataService";
import type { Project } from "../../../../types/project";
import type { Task, TaskStatus, TaskPriority } from "../../../../types/task";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import Input from "../../../../components/ui/Input";
import Badge from "../../../../components/ui/Badge";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Create Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("medium");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("todo");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [creatingTask, setCreatingTask] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projData, tasksData] = await Promise.all([
        getProject(projectId),
        getProjectTasks(projectId),
      ]);
      setProject(projData);
      setTasks(tasksData);
    } catch (err) {
      console.error("Failed to load project details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setCreatingTask(true);
    try {
      await createTask(projectId, {
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        priority: taskPriority,
        status: taskStatus,
        dueDate: taskDueDate || null,
      });

      setTaskTitle("");
      setTaskDescription("");
      setTaskPriority("medium");
      setTaskStatus("todo");
      setTaskDueDate("");
      setIsTaskModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Create task error:", err);
    } finally {
      setCreatingTask(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Update task status error:", err);
    }
  };

  const handleDeleteTask = async (taskId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  const getPriorityBadgeVariant = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterPriority !== "all" && task.priority !== filterPriority) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: { status: TaskStatus; label: string; count: number; color: string }[] = [
    {
      status: "todo",
      label: "To Do",
      count: filteredTasks.filter((t) => t.status === "todo").length,
      color: "bg-slate-500",
    },
    {
      status: "in_progress",
      label: "In Progress",
      count: filteredTasks.filter((t) => t.status === "in_progress").length,
      color: "bg-blue-500",
    },
    {
      status: "completed",
      label: "Completed",
      count: filteredTasks.filter((t) => t.status === "completed").length,
      color: "bg-green-500",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute top-[-15%] left-[-10%] h-[50%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[50%] w-[40%] rounded-full bg-purple-600/10 blur-[120px]" />

        {/* Header */}
        <header className="relative z-10 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
            >
              Ordo.
            </Link>

            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white hover:bg-slate-800/40"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/projects"
                className="rounded-lg px-3 py-2 text-sm font-medium text-white bg-slate-800/60"
              >
                Projects
              </Link>
            </nav>

            <Link
              href="/dashboard/projects"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Projects
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10">
          {/* Project Details Banner */}
          <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="blue">Project Workspace</Badge>
                  <span className="text-xs text-slate-500 font-mono">ID: {projectId.slice(-6)}</span>
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {project?.name || (loading ? "Loading..." : "Project")}
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-400 leading-relaxed">
                  {project?.description || "No description provided for this project."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={() => setIsTaskModalOpen(true)}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Task
                </Button>
              </div>
            </div>

            {/* Filter and Search Toolbar */}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-3.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300 focus:border-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div className="text-xs text-slate-400">
                Showing <span className="font-semibold text-slate-200">{filteredTasks.length}</span> of{" "}
                <span className="font-semibold text-slate-200">{tasks.length}</span> total tasks
              </div>
            </div>
          </div>

          {/* Kanban / Task Columns */}
          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {columns.map((col) => {
                const columnTasks = filteredTasks.filter((t) => t.status === col.status);

                return (
                  <div
                    key={col.status}
                    className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 backdrop-blur-sm"
                  >
                    {/* Column Header */}
                    <div className="mb-4 flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                        <h2 className="font-semibold text-sm text-slate-200">{col.label}</h2>
                      </div>
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Task List */}
                    <div className="flex flex-1 flex-col gap-3 min-h-[150px]">
                      {columnTasks.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-800/60 p-6 text-center text-xs text-slate-500">
                          No tasks in this stage
                        </div>
                      ) : (
                        columnTasks.map((task) => (
                          <Link
                            key={task._id}
                            href={`/dashboard/tasks/${task._id}`}
                            className="group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 transition-all hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                  {task.title}
                                </h3>

                                <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                  {task.priority}
                                </Badge>
                              </div>

                              {task.description && (
                                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                  {task.description}
                                </p>
                              )}
                            </div>

                            {/* Task Footer & Actions */}
                            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-500">
                              <div className="flex items-center gap-2">
                                {task.dueDate && (
                                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                {/* Quick Move Button */}
                                {col.status !== "todo" && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleStatusChange(task._id, "todo", e)}
                                    className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    title="Move to To Do"
                                  >
                                    To Do
                                  </button>
                                )}
                                {col.status !== "in_progress" && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleStatusChange(task._id, "in_progress", e)}
                                    className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-blue-900/50 text-blue-300 hover:bg-blue-800/60"
                                    title="Move to In Progress"
                                  >
                                    Progress
                                  </button>
                                )}
                                {col.status !== "completed" && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleStatusChange(task._id, "completed", e)}
                                    className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-green-900/50 text-green-300 hover:bg-green-800/60"
                                    title="Move to Completed"
                                  >
                                    Done
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteTask(task._id, e)}
                                  className="rounded p-1 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                  title="Delete task"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Create Task Modal */}
        <Modal
          open={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          title="Add New Task"
        >
          <form onSubmit={handleCreateTask} className="space-y-4">
            <Input
              id="taskTitle"
              label="Task Title"
              placeholder="e.g. Implement user profile endpoint"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />

            <div>
              <label
                htmlFor="taskDesc"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2"
              >
                Description
              </label>
              <textarea
                id="taskDesc"
                rows={3}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 backdrop-blur-sm transition-all focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Detailed task instructions or acceptance criteria..."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Status
                </label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus:border-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Priority
                </label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" loading={creatingTask}>
                Create Task
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}