import { SnippetType } from "@/types";
import { TYPE_CONFIG } from "@/lib/utils";

interface BadgeProps {
  type: SnippetType;
  size?: "sm" | "md";
}

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
}

export function TypeBadge({ type, size = "md" }: BadgeProps) {
  const { label, icon } = TYPE_CONFIG[type];
  const sizeClass =
    size === "sm" ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1";

  const colorClass = {
    link: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    note: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    command: "bg-green-500/10 text-green-300 border border-green-500/20",
  }[type];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-mono font-medium ${sizeClass} ${colorClass}`}
    >
      <span>{icon}</span> {label}
    </span>
  );
}

export function TagBadge({
  tag,
  active,
  onClick,
  removable,
  onRemove,
}: TagBadgeProps) {
  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-md
        font-mono text-[10.5px] border transition-all duration-100
        ${onClick ? "cursor-pointer" : ""}
        ${
          active
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-surface-2 text-muted border-border hover:text-text hover:border-border-2"
        }
      `}
    >
      {tag}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </span>
  );
}
