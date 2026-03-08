"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SnippetType, SnippetFormData, Snippet } from "@/types";
import { api } from "@/lib/api";
import { useSnippets, useTags } from "@/hooks/useSnippets";
import { useToast } from "@/hooks/useToast";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { SnippetForm } from "@/components/snippets/SnippetForm";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { ToastList } from "@/components/ui/ToastList";
import { FiltersBar } from "@/components/snippets/FiltersBar";
import {
  SnippetCard,
  SnippetListItem,
} from "@/components/snippets/SnippetCard";

const PER_PAGE = 9;

export default function HomePage() {
  const router = useRouter();
  const { toasts, toast, remove } = useToast();

  const [searchQ, setSearchQ] = useState("");
  const [activeType, setActiveType] = useState<SnippetType | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortDesc, setSortDesc] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingSnippet, setEditing] = useState<Snippet | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryParams = useMemo(
    () => ({
      q: searchQ,
      tag: activeTag ?? "",
      type: activeType ?? "",
      page,
      limit: PER_PAGE,
    }),
    [searchQ, activeTag, activeType, page],
  );

  const { data, loading, error, refetch } = useSnippets(queryParams);
  const { tags } = useTags();

  const handleTypeChange = useCallback((type: SnippetType | null) => {
    setActiveType(type);
    setPage(1);
  }, []);

  const handleTagChange = useCallback((tag: string | null) => {
    setActiveTag(tag);
    setPage(1);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQ(q);
    setPage(1);
  }, []);

  const closeModal = () => {
    setModalMode(null);
    setEditing(null);
  };

  const handleSubmit = async (formData: SnippetFormData) => {
    setIsSubmitting(true);
    try {
      if (modalMode === "edit" && editingSnippet) {
        await api.snippets.update(editingSnippet._id, formData);
        toast("Snippet updated successfully", "success");
      } else {
        await api.snippets.create(formData);
        toast("New snippet vault secured", "success");
      }
      closeModal();
      refetch();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Action failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setIsSubmitting(true);
    try {
      await api.snippets.delete(deleteTargetId);
      toast("Snippet removed from vault", "success");
      setDeleteTargetId(null);
      refetch();
    } catch {
      toast("Failed to delete snippet", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const snippets = data?.data ?? [];
  const isEmpty = !loading && !error && snippets.length === 0;

  return (
    <div className="flex min-h-screen bg-bg selection:bg-emerald-500/20">
      <Sidebar
        tags={tags}
        activeType={activeType}
        activeTag={activeTag}
        onTypeChange={handleTypeChange}
        onTagChange={handleTagChange}
      />

      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Topbar
          searchValue={searchQ}
          onSearchChange={handleSearch}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onNewSnippet={() => setModalMode("create")}
        />

        <main className="flex-1 px-8 py-8">
          <header className="mb-8">
            <h1 className="font-display text-3xl font-bold text-text tracking-tight uppercase">
              {activeType
                ? `${activeType}s`
                : activeTag
                  ? `#${activeTag}`
                  : "All Snippets"}
            </h1>
            <p className="text-sm text-muted mt-1 font-mono">
              {searchQ
                ? `Search results for: ${searchQ}`
                : "Your personal knowledge vault"}
            </p>
          </header>

          <FiltersBar
            tags={tags}
            activeTag={activeTag}
            onTagChange={handleTagChange}
            sortDesc={sortDesc}
            onSortToggle={() => {
              setSortDesc(!sortDesc);
              setPage(1);
            }}
          />

          {loading && <SkeletonGrid />}

          {error && !loading && (
            <ErrorState message={error} onRetry={refetch} />
          )}

          {isEmpty && (
            <EmptyState
              title={
                searchQ || activeTag ? "No matches found" : "Vault is empty"
              }
              description="Adjust your search or add a new snippet to get started."
              action={
                !searchQ && !activeTag
                  ? {
                      label: "+ Add Snippet",
                      onClick: () => setModalMode("create"),
                    }
                  : undefined
              }
            />
          )}

          {!loading && !error && snippets.length > 0 && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "flex flex-col gap-3"
                }
              >
                {snippets.map((s) => {
                  const Component =
                    viewMode === "grid" ? SnippetCard : SnippetListItem;
                  return (
                    <Component
                      key={s._id}
                      snippet={s}
                      activeTag={activeTag}
                      onOpen={(id) => router.push(`/snippets/${id}`)}
                      onEdit={() => {
                        setEditing(s);
                        setModalMode("edit");
                      }}
                      onDelete={(id) => setDeleteTargetId(id)}
                      onTagClick={handleTagChange}
                    />
                  );
                })}
              </div>

              <Pagination
                currentPage={page}
                totalPages={data?.pages ?? 1}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>

      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit Snippet" : "Vault New Snippet"}
      >
        <SnippetForm
          initial={editingSnippet ?? undefined}
          loading={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={
            modalMode === "edit" ? "Update Snippet" : "Secure Snippet"
          }
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTargetId}
        loading={isSubmitting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
        description="Are you sure you want to purge this snippet from your vault?"
      />

      <ToastList toasts={toasts} onRemove={remove} />
    </div>
  );
}
