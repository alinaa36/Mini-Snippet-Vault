"use client";

import { Toast } from "@/hooks/useToast";

const ICONS = { success: "✓", error: "✕", info: "◈" };

interface ToastListProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastList({ toasts, onRemove }: ToastListProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onRemove(t.id)}
          className="flex items-center gap-2.5 bg-surface-2 border border-border-2 rounded-xl px-4 py-3 text-[14px] text-text shadow-2xl min-w-[220px] cursor-pointer animate-toast"
        >
          <span
            className={
              t.type === "success"
                ? "text-emerald-400"
                : t.type === "error"
                  ? "text-red-400"
                  : "text-green-300"
            }
          >
            {ICONS[t.type]}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
