import Link from "next/link";

import Button from "../../../../components/ui/Button";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { id } = await params;

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
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white hover:bg-slate-800/40"
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
            Projects
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Project · {id}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Project
          </h1>
          <p className="mt-2 text-slate-400">
            Manage tasks and team members for this project.
          </p>
        </div>

        {/* Tasks header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
            <p className="mt-1 text-sm text-slate-500">All tasks within this project.</p>
          </div>

          <Button className="w-full sm:w-auto">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Task
          </Button>
        </div>

        {/* Empty state */}
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/20 px-6 py-12 text-center backdrop-blur-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/50">
            <svg className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-300">No tasks yet</p>
          <p className="mt-1 text-xs text-slate-500">Create the first task to start tracking progress.</p>
          <Button className="mt-6">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Task
          </Button>
        </div>
      </main>
    </div>
  );
}