"use client";

import { formatDate } from "@/lib/utils";
import { TypeBadge, TagBadge } from "@/components/ui/Badge";
import { SnippetCardProps, SnippetListItemProps } from "@/lib/interfaces";

export function SnippetCard({
  snippet,
  activeTag,
  onOpen,
  onEdit,
  onDelete,
  onTagClick,
}: SnippetCardProps) {
  const isCommand = snippet.type === "command";
  const preview =
    snippet.content.length > 120
      ? snippet.content.slice(0, 120) + "…"
      : snippet.content;

  return (
    <article
      onClick={() => onOpen(snippet._id)}
      className="
        group relative bg-surface border border-border rounded-2xl p-5 cursor-pointer
        transition-all duration-200 hover:-translate-y-0.5 hover:border-border-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h3 className="font-display text-[15.5px] font-semibold text-text leading-snug tracking-tight line-clamp-2">
          {snippet.title}
        </h3>
        <TypeBadge type={snippet.type} size="sm" />
      </div>

      <div
        className={`text-[13px] leading-relaxed mb-3.5 line-clamp-2 ${
          isCommand
            ? "font-mono bg-surface-2 border border-border rounded-lg px-3 py-2 text-green-300"
            : "text-muted"
        }`}
      >
        {preview}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 min-w-0">
          {snippet.tags.length > 0 ? (
            snippet.tags.slice(0, 3).map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                active={tag === activeTag}
                onClick={() => {
                  onTagClick(tag);
                }}
              />
            ))
          ) : (
            <span className="font-mono text-[10px] text-subtle">no tags</span>
          )}
          {snippet.tags.length > 3 && (
            <span className="font-mono text-[10px] text-subtle">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-mono text-[10px] text-subtle">
            {formatDate(snippet.createdAt)}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <ActionBtn
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(snippet._id);
              }}
            >
              ✎
            </ActionBtn>
            <ActionBtn
              title="Delete"
              danger
              onClick={(e) => {
                e.stopPropagation();
                onDelete(snippet._id);
              }}
            >
              ✕
            </ActionBtn>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SnippetListItem({
  snippet,
  onOpen,
  onEdit,
  onDelete,
}: SnippetListItemProps) {
  const dotColor = {
    link: "bg-amber-400",
    note: "bg-emerald-400",
    command: "bg-green-300",
  }[snippet.type];

  return (
    <div
      onClick={() => onOpen(snippet._id)}
      className="
        group flex items-center gap-3.5 bg-surface border border-border rounded-xl px-5 py-3.5
        cursor-pointer transition-all duration-150 hover:border-border-2 hover:bg-surface-2
      "
    >
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
      <span className="font-display text-[14px] font-semibold text-text flex-[1.5] truncate">
        {snippet.title}
      </span>
      <span className="text-[13px] text-muted flex-[2] truncate hidden sm:block">
        {snippet.content.replace(/\n/g, " ").slice(0, 80)}
      </span>
      <div className="flex gap-1 flex-shrink-0">
        {snippet.tags.slice(0, 2).map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>
      <span className="font-mono text-[10px] text-subtle flex-shrink-0 hidden md:block">
        {formatDate(snippet.createdAt)}
      </span>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <ActionBtn
          title="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(snippet._id);
          }}
        >
          ✎
        </ActionBtn>
        <ActionBtn
          title="Delete"
          danger
          onClick={(e) => {
            e.stopPropagation();
            onDelete(snippet._id);
          }}
        >
          ✕
        </ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  title,
  danger,
  onClick,
}: {
  children: string;
  title: string;
  danger?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        w-[30px] h-[30px] rounded-lg border text-[13px] flex items-center justify-center transition-all duration-100
        ${
          danger
            ? "border-border bg-surface-2 text-muted hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10"
            : "border-border bg-surface-2 text-muted hover:text-text hover:border-border-2"
        }
      `}
    >
      {children}
    </button>
  );
}
