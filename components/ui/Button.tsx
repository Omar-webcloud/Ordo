"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:bg-blue-500 hover:shadow-[0_0_28px_-5px_rgba(59,130,246,0.6)] hover:-translate-y-px",
  secondary:
    "border border-slate-700/60 bg-slate-800/40 text-slate-200 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 hover:text-white",
  danger:
    "bg-red-600/90 text-white shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)] hover:bg-red-500 hover:shadow-[0_0_28px_-5px_rgba(239,68,68,0.6)] hover:-translate-y-px",
  ghost:
    "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}