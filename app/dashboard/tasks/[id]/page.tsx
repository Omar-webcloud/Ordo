import Link from "next/link";

type TaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskPage({
  params,
}: TaskPageProps) {
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
      <main className="relative z-10 mx-auto w-full max-w-4xl px-6 py-10 sm:py-12">
        {/* Task header */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Task · {id}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Task Details
              </h1>
              <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">
                Task description will appear here once the task has been configured with details.
              </p>
            </div>

            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400 backdrop-blur-sm">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Todo
            </span>
          </div>
        </div>

        {/* Meta cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Priority</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-yellow-400" />
              <p className="font-semibold text-slate-200">Medium</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Assigned To</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-xs text-slate-400">
                ?
              </div>
              <p className="font-semibold text-slate-400">Unassigned</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Due Date</p>
            <div className="mt-3 flex items-center gap-2">
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p className="font-semibold text-slate-400">No deadline</p>
            </div>
          </div>
        </div>

        {/* Comments panel */}
        <div className="mt-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-1 text-base font-semibold text-slate-200">Comments</h2>
          <p className="mb-6 text-xs text-slate-500">Activity and discussion about this task.</p>

          <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-slate-700/60 py-8 text-center">
            <div>
              <svg className="mx-auto h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              <p className="mt-3 text-sm text-slate-500">No comments yet</p>
              <p className="mt-1 text-xs text-slate-600">Be the first to leave a comment.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}