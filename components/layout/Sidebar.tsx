"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: "▣",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 md:flex md:min-h-screen md:flex-col">
      <div className="border-b border-slate-800 p-6">
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-white"
        >
          Ordo
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                active
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 hover:bg-slate-900 hover:text-white">
          Sign out
        </button>
      </div>
    </aside>
  );
}