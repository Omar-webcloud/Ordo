import Link from "next/link";

import Button from "../../../components/ui/Button";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ordo
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="mt-2 text-slate-400">
              Manage your projects and team workspaces.
            </p>
          </div>

          <Button>+ New Project</Button>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-12 text-center">
          <h2 className="text-lg font-semibold">No projects yet</h2>

          <p className="mt-2 text-sm text-slate-400">
            Create your first project to start managing tasks.
          </p>
        </div>
      </section>
    </main>
  );
}