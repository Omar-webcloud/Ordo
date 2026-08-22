"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import { getStoredUser, logout } from "../../lib/auth";
import { getProjects, getProjectTasks, createProject } from "../../lib/dataService";
import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // New project modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);

      // Fetch tasks for each project
      const tasksPromises = fetchedProjects.map((p) => getProjectTasks(p._id));
      const tasksArrays = await Promise.all(tasksPromises);
      const combinedTasks = tasksArrays.flat();
      setAllTasks(combinedTasks);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(user.name);
    }
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setError("");
    setCreating(true);
    try {
      await createProject({
        name: projectName.trim(),
        description: projectDescription.trim(),
      });
      setProjectName("");
      setProjectDescription("");
      setIsModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const activeTasks = allTasks.filter((t) => t.status !== "completed");
  const completedTasks = allTasks.filter((t) => t.status === "completed");

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute top-[-15%] left-[-10%] h-[50%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[50%] w-[40%] rounded-full bg-purple-600/10 blur-[120px]" />

        <Header userName={userName} onSignOut={handleLogout} />

        {/* Content */}
        <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          {/* Page heading */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 text-slate-400">
                Welcome back, <span className="text-slate-200 font-semibold">{userName}</span>. Here is your current workspace status.
              </p>
            </div>

            <Button onClick={() => setIsModalOpen(true)} className="w-full self-start sm:w-auto">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Project
            </Button>
          </div>

          {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Projects card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/70">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Projects</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-white">{projects.length}</p>
                <p className="mt-2 text-xs text-slate-500">Active workspaces</p>
              </div>
            </div>

            {/* Active tasks card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/70">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Active Tasks</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-white">{activeTasks.length}</p>
                <p className="mt-2 text-xs text-slate-500">Pending and in-progress</p>
              </div>
            </div>

            {/* Completed card */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-slate-900/70">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Completed</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-white">{completedTasks.length}</p>
                <p className="mt-2 text-xs text-slate-500">Tasks finished</p>
              </div>
            </div>
          </div>

          {/* Projects section */}
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Your Projects</h2>
                <p className="mt-1 text-sm text-slate-500">Projects you are managing or participating in.</p>
              </div>
              <Link
                href="/dashboard/projects"
                className="flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                View all
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>

            {loading ? (
              <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              </div>
            ) : projects.length === 0 ? (
              <div className="flex min-h-[240px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/20 px-6 py-12 text-center backdrop-blur-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/50">
                  <svg className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-300">No projects yet</p>
                <p className="mt-1 text-xs text-slate-500">Create your first project to start organizing tasks.</p>
                <Button onClick={() => setIsModalOpen(true)} className="mt-6">
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Link
                    key={project._id}
                    href={`/dashboard/projects/${project._id}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/80 hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <Badge variant="blue">Project</Badge>
                      </div>
                      <p className="mt-2.5 text-sm text-slate-400 line-clamp-2">
                        {project.description || "No description provided."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                      <span>{project.members?.length || 1} member(s)</span>
                      <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">
                        Open workspace →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Create Project Modal */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Project"
        >
          <form onSubmit={handleCreateProject} className="space-y-4">
            <Input
              id="projectName"
              label="Project Name"
              placeholder="e.g. Website Redesign, Mobile App API"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />

            <div>
              <label
                htmlFor="projectDescription"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id="projectDescription"
                rows={3}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 backdrop-blur-sm transition-all focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
                placeholder="What is this project about?"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" loading={creating}>
                Create Project
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
