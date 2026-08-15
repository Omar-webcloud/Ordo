"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import {
  getStoredUser,
  logout,
} from "../../lib/auth";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = getStoredUser();

    if (user) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen w-full bg-slate-950 text-white">
        {/* Header */}
        <header className="w-full border-b border-slate-800">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              Ordo
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-400 sm:block">
                Welcome, {userName}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 min-w-[80px] items-center justify-center rounded-lg border border-slate-700 px-4 text-sm font-medium leading-none transition hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Centered Content */}
        <div className="flex w-full justify-center">
          <section className="w-full max-w-6xl px-6 py-10 sm:py-12">
            {/* Page heading */}
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Dashboard
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Overview of your projects and tasks.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="text-sm text-slate-400">
                  Projects
                </p>

                <p className="mt-3 text-3xl font-bold leading-none">
                  0
                </p>
              </div>

              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="text-sm text-slate-400">
                  Active Tasks
                </p>

                <p className="mt-3 text-3xl font-bold leading-none">
                  0
                </p>
              </div>

              <div className="flex min-h-[140px] flex-col justify-center rounded-xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="text-sm text-slate-400">
                  Completed
                </p>

                <p className="mt-3 text-3xl font-bold leading-none">
                  0
                </p>
              </div>
            </div>

            {/* Projects */}
            <section className="mt-12">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold leading-tight">
                    Your Projects
                  </h2>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Projects you're currently working on.
                  </p>
                </div>

                <Link
                  href="/dashboard/projects"
                  className="shrink-0 pb-0.5 text-sm font-medium text-blue-500 transition hover:text-blue-400"
                >
                  View all
                </Link>
              </div>

              {/* Empty state */}
              <div className="mt-6 flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 px-6 py-10 text-center">
                <p className="text-sm leading-5 text-slate-400">
                  You don't have any projects yet.
                </p>

                <Link
                  href="/dashboard/projects"
                  className="mt-5 flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium leading-none transition hover:bg-blue-500"
                >
                  Create Project
                </Link>
              </div>
            </section>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}