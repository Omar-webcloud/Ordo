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
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Ordo
          </Link>

          <Link
            href="/dashboard/projects"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Projects
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm text-slate-500">
            Project ID: {id}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Project
          </h1>

          <p className="mt-2 text-slate-400">
            Manage tasks and team members for this project.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tasks</h2>

          <Button>+ New Task</Button>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-slate-700 p-12 text-center">
          <p className="text-slate-400">
            No tasks in this project yet.
          </p>
        </div>
      </section>
    </main>
  );
}