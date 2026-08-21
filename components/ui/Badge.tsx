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
    "border border-slate-700/60 bg-slate-800/50 text-slate-300",
  blue:
    "border border-blue-500/30 bg-blue-500/10 text-blue-400",
  green:
    "border border-green-500/30 bg-green-500/10 text-green-400",
  yellow:
    "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  red:
    "border border-red-500/30 bg-red-500/10 text-red-400",
};

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
}