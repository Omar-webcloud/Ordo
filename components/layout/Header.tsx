"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  userName?: string;
  onSignOut?: () => void;
  backHref?: string;
  backLabel?: string;
};

const navLinks = [
  { label: "Dashboard", href: "/dashboard", isActive: (pathname: string) => pathname === "/dashboard" },
  {
    label: "Projects",
    href: "/dashboard/projects",
    isActive: (pathname: string) =>
      pathname.startsWith("/dashboard/projects") || pathname.startsWith("/dashboard/tasks"),
  },
  { label: "API Docs", href: "/api/docs", isActive: (pathname: string) => pathname === "/api/docs" },
];

export default function Header({
  userName = "User",
  onSignOut,
  backHref,
  backLabel,
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-400 to-indigo-500"
        >
          Ordo.
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const isActive = link.isActive(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white sm:flex"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {backLabel || "Back"}
            </Link>
          )}

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:flex">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white">
              {initial}
            </div>
            <span className="max-w-[120px] truncate text-sm font-medium text-slate-300">{userName}</span>
          </div>

          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              className="hidden h-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              Sign out
            </button>
          )}

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white sm:hidden">
            {initial}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-slate-950/95 px-4 pb-4 pt-2 backdrop-blur-xl sm:hidden">
          <nav className="mb-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = link.isActive(pathname);
              return (
                <Link
                  key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
            })}
            {backHref && (
              <Link
              href={backHref}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {backLabel || "Back"}
            </Link>
          )}
          </nav>
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white">
                {initial}
              </div>
              <span className="text-sm font-medium text-slate-300">{userName}</span>
            </div>
            {onSignOut && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onSignOut();
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
