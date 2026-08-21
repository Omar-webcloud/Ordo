"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}