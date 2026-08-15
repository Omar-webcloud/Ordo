import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ordo
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Welcome back
            </span>

            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900">
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Overview of your projects and tasks.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Projects</p>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Active Tasks</p>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Projects</h2>

            <Link
              href="/dashboard/projects"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-slate-700 p-10 text-center">
            <p className="text-slate-400">
              You don't have any projects yet.
            </p>

            <Link
              href="/dashboard/projects"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-500"
            >
              Create Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}