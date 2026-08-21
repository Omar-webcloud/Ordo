import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-widest text-slate-400"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full rounded-xl border bg-slate-900/50 px-4 py-3.5 text-sm text-slate-100
          placeholder:text-slate-600 backdrop-blur-sm
          transition-all duration-200
          border-slate-700/60
          focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-900/80
          hover:border-slate-600/80
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}