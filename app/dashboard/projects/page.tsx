import Link from "next/link";

import Button from "../../../components/ui/Button";

export default function ProjectsPage() {
  return (
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
            Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Projects
            </h1>
            <p className="mt-2 text-slate-400">
              Manage your projects and team workspaces.
            </p>
          </div>

          <Button className="w-full sm:w-auto">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Project
          </Button>
        </div>

        {/* Empty state */}
        <div className="flex min-h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/20 px-6 py-16 text-center backdrop-blur-sm">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/50">
            <svg className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-200">No projects yet</h2>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Create your first project to start managing tasks and collaborating with your team.
          </p>
          <Button className="mt-8">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create First Project
          </Button>
        </div>
      </main>
    </div>
  );
}