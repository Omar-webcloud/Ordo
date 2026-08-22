import Link from "next/link";

import Header from "../../../components/layout/Header";

type Endpoint = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
};

const endpointGroups: Array<{ title: string; description: string; endpoints: Endpoint[] }> = [
  {
    title: "Authentication",
    description: "Create an account, exchange credentials for a token, and read the current user.",
    endpoints: [
      { method: "POST", path: "/api/v1/auth/register", description: "Create a user and return a JWT." },
      { method: "POST", path: "/api/v1/auth/login", description: "Sign in and return a JWT." },
      { method: "GET", path: "/api/v1/auth/me", description: "Return the authenticated user." },
    ],
  },
  {
    title: "Projects",
    description: "List, create, update, and remove workspaces available to the current user.",
    endpoints: [
      { method: "GET", path: "/api/v1/projects", description: "List projects the current user belongs to." },
      { method: "POST", path: "/api/v1/projects", description: "Create a project." },
      { method: "GET", path: "/api/v1/projects/:id", description: "Get a project by ID." },
      { method: "PATCH", path: "/api/v1/projects/:id", description: "Update a project you own." },
      { method: "DELETE", path: "/api/v1/projects/:id", description: "Delete a project you own." },
    ],
  },
  {
    title: "Tasks and comments",
    description: "Manage project tasks, their progress, and discussion threads.",
    endpoints: [
      { method: "GET", path: "/api/v1/projects/:id/tasks", description: "List tasks, with optional filters." },
      { method: "POST", path: "/api/v1/projects/:id/tasks", description: "Create a task in a project." },
      { method: "GET", path: "/api/v1/tasks/:id", description: "Get a task by ID." },
      { method: "PATCH", path: "/api/v1/tasks/:id", description: "Update a task." },
      { method: "DELETE", path: "/api/v1/tasks/:id", description: "Delete a task you own or created." },
      { method: "GET", path: "/api/v1/tasks/:id/comments", description: "List a task's comments." },
      { method: "POST", path: "/api/v1/tasks/:id/comments", description: "Add a comment to a task." },
      { method: "DELETE", path: "/api/v1/comments/:id", description: "Delete one of your comments." },
    ],
  },
];

const methodClasses: Record<Endpoint["method"], string> = {
  GET: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  POST: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  PATCH: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  DELETE: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Header userName="Developer" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Ordo REST API</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Build on top of your team&apos;s work.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Use the Ordo API to manage users, projects, tasks, and comments from your own tools and integrations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 font-mono text-sm text-sky-200 shadow-lg shadow-slate-950/30">
              {"https://ordo-task-manager.vercel.app/api/v1"}
            </code>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
              Open dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-14">
        <div className="space-y-6">
          {endpointGroups.map((group) => (
            <article key={group.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-sm sm:p-7">
              <h2 className="text-2xl font-bold text-white">{group.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{group.description}</p>
              <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-slate-950/35">
                {group.endpoints.map((endpoint) => (
                  <div key={`${endpoint.method}-${endpoint.path}`} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4">
                    <span className={`w-fit rounded-md border px-2 py-1 font-mono text-xs font-bold ${methodClasses[endpoint.method]}`}>
                      {endpoint.method}
                    </span>
                    <code className="break-all font-mono text-sm text-slate-100 sm:min-w-[15rem]">{endpoint.path}</code>
                    <p className="text-sm leading-6 text-slate-400">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-white">Authentication</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Protected endpoints require the access token returned by login or registration.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs leading-6 text-sky-200"><code>Authorization: Bearer &lt;token&gt;</code></pre>
          <p className="mt-5 text-xs leading-5 text-slate-400">
            Responses use a consistent envelope with <code className="text-slate-200">success</code>, <code className="text-slate-200">message</code>, and <code className="text-slate-200">data</code> fields.
          </p>
        </aside>
      </section>
    </main>
  );
}
