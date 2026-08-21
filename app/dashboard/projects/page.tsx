"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import { getProjects, createProject, deleteProject, updateProject } from "../../../lib/dataService";
import type { Project } from "../../../types/project";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Badge from "../../../components/ui/Badge";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [updating, setUpdating] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;

    setCreating(true);
    try {
      await createProject({
        name: createName.trim(),
        description: createDesc.trim(),
      });
      setCreateName("");
      setCreateDesc("");
      setIsCreateOpen(false);
      await loadProjects();
    } catch (err) {
      console.error("Create project error:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editName.trim()) return;

    setUpdating(true);
    try {
      await updateProject(editingProject._id, {
        name: editName.trim(),
        description: editDesc.trim(),
      });
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      console.error("Update project error:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this project and its tasks?")) return;

    setDeletingId(id);
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      console.error("Delete project error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingProject(project);
    setEditName(project.name);
    setEditDesc(project.description || "");
  };

  const filteredProjects = projects.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  });

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
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Projects
              </h1>
              <p className="mt-2 text-slate-400">
                Manage your team workspaces, assign tasks, and track deliverables.
              </p>
            </div>

            <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Project
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-md">
            <Input
              id="searchProjects"
              placeholder="Search projects by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/20 px-6 py-12 text-center backdrop-blur-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/50">
                <svg className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-slate-200">
                {search ? "No matching projects found" : "No projects yet"}
              </h2>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {search
                  ? "Try searching for a different keyword or create a new project."
                  : "Create your first project to start organizing tasks and collaborating with your team."}
              </p>
              <Button onClick={() => setIsCreateOpen(true)} className="mt-6">
                Create Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/dashboard/projects/${project._id}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h2>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => openEdit(project, e)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                          title="Edit project"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(project._id, e)}
                          disabled={deletingId === project._id}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          title="Delete project"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.description || "No description provided for this project."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      {project.members?.length || 1} member(s)
                    </span>
                    <span className="font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
                      View Tasks →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Create Project Modal */}
        <Modal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Project"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              id="newProjectName"
              label="Project Name"
              placeholder="e.g. Mobile Application V2"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              required
            />

            <div>
              <label
                htmlFor="newProjectDesc"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id="newProjectDesc"
                rows={3}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 backdrop-blur-sm transition-all focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
                placeholder="What are the goals of this project?"
                value={createDesc}
                onChange={(e) => setCreateDesc(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" loading={creating}>
                Create Project
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Project Modal */}
        <Modal
          open={Boolean(editingProject)}
          onClose={() => setEditingProject(null)}
          title="Edit Project"
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              id="editProjectName"
              label="Project Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />

            <div>
              <label
                htmlFor="editProjectDesc"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2"
              >
                Description
              </label>
              <textarea
                id="editProjectDesc"
                rows={3}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 backdrop-blur-sm transition-all focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditingProject(null)}
              >
                Cancel
              </Button>
              <Button type="submit" loading={updating}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}