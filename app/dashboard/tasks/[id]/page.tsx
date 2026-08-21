"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import ProtectedRoute from "../../../../components/auth/ProtectedRoute";
import {
  getTask,
  updateTask,
  deleteTask,
  getTaskComments,
  createComment,
  deleteComment,
} from "../../../../lib/dataService";
import { getStoredUser } from "../../../../lib/auth";
import type { Task, TaskStatus, TaskPriority } from "../../../../types/task";
import type { Comment } from "../../../../types/comment";
import Button from "../../../../components/ui/Button";
import Badge from "../../../../components/ui/Badge";
import Input from "../../../../components/ui/Input";

type TaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function TaskDetailPage({ params }: TaskPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const taskId = resolvedParams.id;

  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Edit task state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [savingTask, setSavingTask] = useState(false);

  const currentUser = getStoredUser();

  const loadTaskAndComments = async () => {
    try {
      setLoading(true);
      const [taskData, commentsData] = await Promise.all([
        getTask(taskId),
        getTaskComments(taskId),
      ]);
      setTask(taskData);
      setComments(commentsData);
      setEditTitle(taskData.title);
      setEditDesc(taskData.description || "");
    } catch (err) {
      console.error("Failed to load task details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTaskAndComments();
  }, [taskId]);

  const handleUpdateStatus = async (status: TaskStatus) => {
    if (!task) return;
    try {
      const updated = await updateTask(taskId, { status });
      setTask((prev) => (prev ? { ...prev, status } : null));
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const handleUpdatePriority = async (priority: TaskPriority) => {
    if (!task) return;
    try {
      await updateTask(taskId, { priority });
      setTask((prev) => (prev ? { ...prev, priority } : null));
    } catch (err) {
      console.error("Update priority error:", err);
    }
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    setSavingTask(true);
    try {
      await updateTask(taskId, {
        title: editTitle.trim(),
        description: editDesc.trim(),
      });
      setTask((prev) =>
        prev
          ? {
              ...prev,
              title: editTitle.trim(),
              description: editDesc.trim(),
            }
          : null
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Save details error:", err);
    } finally {
      setSavingTask(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      const projectId =
        typeof task?.project === "string"
          ? task.project
          : (task?.project as any)?._id;
      if (projectId) {
        router.push(`/dashboard/projects/${projectId}`);
      } else {
        router.push("/dashboard/projects");
      }
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const created = await createComment(taskId, newComment.trim());
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch (err) {
      console.error("Add comment error:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <Badge variant="green">Completed</Badge>;
      case "in_progress":
        return <Badge variant="blue">In Progress</Badge>;
      case "todo":
        return <Badge variant="yellow">To Do</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const projectId =
    typeof task?.project === "string"
      ? task.project
      : (task?.project as any)?._id;

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
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white hover:bg-slate-800/40"
              >
                Projects
              </Link>
            </nav>

            <Link
              href={projectId ? `/dashboard/projects/${projectId}` : "/dashboard/projects"}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Project
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10">
          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : !task ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <p className="text-slate-400">Task not found or has been deleted.</p>
              <Link href="/dashboard/projects" className="mt-4 inline-block text-blue-400 underline">
                Return to projects
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Task Header Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">TASK-{taskId.slice(-6)}</span>
                    {getStatusBadge(task.status)}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                        className="text-xs py-1.5 px-3"
                      >
                        Edit Details
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="text-xs py-1.5 px-3"
                      >
                        Cancel
                      </Button>
                    )}

                    <button
                      type="button"
                      onClick={handleDeleteTask}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete task"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {!isEditing ? (
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {task.title}
                    </h1>
                    <p className="mt-3 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {task.description || "No description provided for this task."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveDetails} className="space-y-4">
                    <Input
                      id="editTaskTitle"
                      label="Title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 backdrop-blur-sm transition-all focus:border-blue-500"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" loading={savingTask}>
                        Save Details
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Task Properties & Metadata */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Status selector */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Status
                  </p>
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateStatus(e.target.value as TaskStatus)}
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-blue-500"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority selector */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Priority
                  </p>
                  <select
                    value={task.priority}
                    onChange={(e) => handleUpdatePriority(e.target.value as TaskPriority)}
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Due date */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Due Date
                  </p>
                  <p className="text-sm font-medium text-slate-300 py-2">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No deadline set"}
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    Comments ({comments.length})
                  </h2>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="mb-8 space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Write a comment or update for the team..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20"
                    required
                  />
                  <div className="flex justify-end">
                    <Button type="submit" loading={submittingComment} className="text-xs px-4 py-2">
                      Post Comment
                    </Button>
                  </div>
                </form>

                {/* Comments Stream */}
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-800/80 p-8 text-center text-xs text-slate-500">
                      No comments on this task yet. Start the conversation!
                    </div>
                  ) : (
                    comments.map((comment) => {
                      const authorName =
                        typeof comment.author === "object" && comment.author?.name
                          ? comment.author.name
                          : "User";
                      const isAuthor =
                        currentUser &&
                        typeof comment.author === "object" &&
                        (comment.author as any)?.id === currentUser.id;

                      return (
                        <div
                          key={comment._id}
                          className="flex gap-3.5 rounded-xl border border-slate-800/60 bg-slate-900/30 p-4"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                            {authorName.charAt(0).toUpperCase()}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-slate-200">
                                {authorName}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-slate-500">
                                  {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                                  {new Date(comment.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {isAuthor && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="text-slate-500 hover:text-red-400 transition-colors text-xs"
                                    title="Delete comment"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            </div>

                            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}