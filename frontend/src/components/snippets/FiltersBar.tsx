"use client";

import { FiltersBarProps } from "@/lib/interfaces";

export function FiltersBar({
  tags,
  activeTag,
  onTagChange,
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
