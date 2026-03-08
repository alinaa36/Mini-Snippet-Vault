"use client";

import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useSnippet } from "@/hooks/useSnippets";
import { useToast } from "@/hooks/useToast";
import { SnippetDetail } from "@/components/snippets/SnippetDetail";
import { SnippetForm } from "@/components/snippets/SnippetForm";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ToastList } from "@/components/ui/ToastList";
import { ErrorState } from "@/components/ui/States";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { SnippetFormData } from "@/types";
import { Button } from "@/components/ui/Button";

export default function SnippetPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { snippet, loading, error, refetch } = useSnippet(id);
  const { toasts, toast, remove } = useToast();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = useCallback(
    async (data: SnippetFormData) => {
      setIsSubmitting(true);
      try {
        await api.snippets.update(id, data);
        toast("Snippet updated successfully", "success");
        setActiveModal(null);
        await refetch();
      } catch (e) {
        toast(e instanceof Error ? e.message : "Error updating", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, refetch, toast],
  );

  const handleDelete = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await api.snippets.delete(id);
      toast("Snippet deleted", "success");
      router.push("/");
    } catch (e) {
      toast("Failed to delete snippet", "error");
      setIsSubmitting(false);
    }
  }, [id, router, toast]);

  return (
    <div className="min-h-screen bg-bg font-sans flex flex-col selection:bg-emerald-500/30">
      <header className="px-8 py-5 border-b border-border bg-surface/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="text-muted hover:text-emerald-400 gap-2 transition-all font-mono text-[13px] tracking-tight"
          >
            <span className="text-[18px]">←</span> Back to Vault
          </Button>

          <div className="flex items-center gap-3">
            <div className="font-mono text-[10px] text-subtle uppercase tracking-[2px]">
              Status: <span className="text-emerald-500">Synced</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl">
          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <div className="bg-surface border border-border rounded-2xl p-10 text-center">
              <ErrorState message={error} onRetry={() => router.push("/")} />
            </div>
          ) : snippet ? (
            <div className="animate-fade-in">
              <SnippetDetail
                snippet={snippet}
                onEdit={() => setActiveModal("edit")}
                onDelete={() => setActiveModal("delete")}
              />
            </div>
          ) : null}
        </div>
      </main>

      <Modal
        open={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        title="Edit Snippet"
      >
        {snippet && (
          <SnippetForm
            initial={snippet}
            loading={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setActiveModal(null)}
            submitLabel="Update changes"
          />
        )}
      </Modal>

      <ConfirmDialog
        open={activeModal === "delete"}
        loading={isSubmitting}
        onConfirm={handleDelete}
        onCancel={() => setActiveModal(null)}
        description="Are you sure? This action will permanently remove the snippet."
      />

      <ToastList toasts={toasts} onRemove={remove} />
    </div>
  );
}
