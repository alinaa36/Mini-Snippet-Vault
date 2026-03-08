"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (Math.abs(i - currentPage) === 2) {
      pages.push("...");
    }
  }

  const btn = (
    label: string | number,
    page: number,
    active = false,
    disabled = false,
  ) => (
    <button
      key={`${label}-${page}`}
      onClick={() => !disabled && onPageChange(page)}
      disabled={disabled}
      className={`
        w-9 h-9 rounded-lg border font-mono text-[13px] flex items-center justify-center transition-all duration-100
        disabled:opacity-30 disabled:cursor-not-allowed
        ${
          active
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "bg-surface-2 border-border text-muted hover:border-border-2 hover:text-text"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {btn("‹", currentPage - 1, false, currentPage === 1)}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-9 h-9 flex items-center justify-center text-subtle text-[13px]"
          >
            …
          </span>
        ) : (
          btn(p, p as number, p === currentPage)
        ),
      )}
      {btn("›", currentPage + 1, false, currentPage === totalPages)}
    </div>
  );
}
