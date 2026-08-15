"use client";

import { useState } from "react";

type HeaderProps = {
  userName?: string;
};

export default function Header({
  userName = "User",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-white">
            Workspace
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              {userName.charAt(0).toUpperCase()}
            </div>

            <span className="hidden text-sm text-slate-300 sm:block">
              {userName}
            </span>
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-20 w-40 rounded-lg border border-slate-800 bg-slate-900 p-1 shadow-xl">
              <button className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}