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
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ordo
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm text-slate-500">
          Task ID: {id}
        </p>

        <div className="mt-3 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">
              Task Details
            </h1>

            <p className="mt-3 text-slate-400">
              Task description will appear here.
            </p>
          </div>

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
            Todo
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">Priority</p>
            <p className="mt-2 font-medium">Medium</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">Assigned To</p>
            <p className="mt-2 font-medium">Unassigned</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">Due Date</p>
            <p className="mt-2 font-medium">No deadline</p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">Comments</h2>

          <p className="mt-4 text-sm text-slate-500">
            No comments yet.
          </p>
        </div>
      </section>
    </main>
  );
}