"use client";

import { useState } from "react";

type HeaderProps = {
  userName?: string;
  onSignOut?: () => void;
};

export default function Header({
  userName = "User",
  onSignOut,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* Workspace */}
        <div>
          <h1 className="text-lg font-semibold leading-none text-white">
            Workspace
          </h1>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 items-center gap-3 rounded-lg px-2.5 transition hover:bg-slate-900"
            aria-expanded={open}
            aria-haspopup="menu"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-medium leading-none text-white">
              {initial}
            </div>

            {/* Name */}
            <span className="hidden text-sm font-medium leading-none text-slate-300 sm:block">
              {userName}
            </span>

            {/* Chevron */}
            <svg
              className={`hidden h-4 w-4 text-slate-500 transition-transform sm:block ${
                open ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-1 shadow-xl"
              role="menu"
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSignOut?.();
                }}
                className="flex h-10 w-full items-center rounded-md px-3 text-left text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}