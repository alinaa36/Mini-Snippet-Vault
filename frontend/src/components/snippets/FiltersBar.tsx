"use client";

import { FiltersBarProps } from "@/lib/interfaces";

export function FiltersBar({
  tags,
  activeTag,
  onTagChange,
  sortDesc,
  onSortToggle,
}: FiltersBarProps) {
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      <Chip active={!activeTag} onClick={() => onTagChange(null)}>
        All tags
      </Chip>

      {tags.slice(0, 8).map((tag, index) => (
        <Chip
          key={`filter-tag-${tag}-${index}`}
          active={activeTag === tag}
          onClick={() => onTagChange(activeTag === tag ? null : tag)}
        >
          #{tag}
        </Chip>
      ))}

      {tags.length > 0 && (
        <>
          <div className="w-px h-5 bg-border mx-1" />
          <button
            onClick={onSortToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-2 text-muted font-mono text-[12px] hover:text-text hover:border-border-2 transition-all duration-100"
          >
            <span>{sortDesc ? "↓" : "↑"}</span>
            {sortDesc ? "Newest" : "Oldest"}
          </button>
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-3.5 py-1.5 rounded-full border text-[13px] transition-all duration-100
        ${
          active
            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
            : "border-border bg-surface-2 text-muted hover:border-border-2 hover:text-text"
        }
      `}
    >
      {children}
    </button>
  );
}
