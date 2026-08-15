"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex border-b border-slate-800 bg-slate-950 md:hidden">
      {navigation.map((item) => {
        const active =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 px-4 py-3 text-center text-sm ${
              active
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-slate-400"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}