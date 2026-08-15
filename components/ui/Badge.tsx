import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-slate-800 text-slate-300",
  blue:
    "bg-blue-500/10 text-blue-400",
  green:
    "bg-green-500/10 text-green-400",
  yellow:
    "bg-yellow-500/10 text-yellow-400",
  red:
    "bg-red-500/10 text-red-400",
};

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}