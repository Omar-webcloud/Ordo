import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400">
          Production-style Task Management
        </span>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Manage your work with{" "}
          <span className="text-blue-500">Ordo.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          A minimal task management platform for organizing projects,
          assigning tasks, tracking progress, and collaborating with your team.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium transition hover:bg-slate-900"
          >
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}