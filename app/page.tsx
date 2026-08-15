import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm leading-none text-slate-400">
            Production-style Task Management
          </span>

          {/* Heading */}
          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Manage your work with{" "}
            <span className="text-blue-500">Ordo.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            A minimal task management platform for organizing projects,
            assigning tasks, tracking progress, and collaborating with your
            team.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/register"
              className="flex h-12 min-w-36 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium transition hover:bg-blue-500"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="flex h-12 min-w-36 items-center justify-center rounded-lg border border-slate-700 px-6 text-sm font-medium transition hover:bg-slate-900"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}