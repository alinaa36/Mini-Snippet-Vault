"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-[580px]",
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${maxWidth} bg-surface border border-border-2 rounded-2xl shadow-2xl animate-modal`}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <h2 className="font-display text-[18px] font-bold text-text tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-border bg-surface-2 text-muted hover:text-text hover:bg-border transition-all flex items-center justify-center text-[15px]"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
