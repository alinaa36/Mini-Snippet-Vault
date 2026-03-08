"use client";

import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = "Delete snippet?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-surface border border-border-2 rounded-2xl p-7 max-w-[340px] w-[90%] text-center animate-modal">
        <div className="text-[32px] mb-3">🗑</div>
        <h3 className="font-display text-[17px] font-bold text-text mb-2">
          {title}
        </h3>
        <p className="text-[13.5px] text-muted mb-6">{description}</p>
        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            className="flex-1 justify-center"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1 justify-center"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
