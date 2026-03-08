"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ViewMode } from "@/types";
import { TopbarProps } from "@/lib/interfaces";

export function Topbar({
  searchValue,
  onSearchChange,
  viewMode,
  onViewChange,
  onNewSnippet,
}: TopbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center px-7 gap-4 sticky top-0 z-40">
      <div className="flex-1 max-w-[480px] relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-[14px] pointer-events-none">
          ⌕
        </span>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search snippets…"
          className="w-full bg-surface2 border border-border rounded-lg text-text font-sans text-[14px] pl-10 pr-14 py-2.5 outline-none transition-all duration-150 placeholder:text-subtle focus:border-emerald-500/50 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-border2 text-muted font-mono text-[10px] px-1.5 py-0.5 rounded pointer-events-none">
          ⌘K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        <div className="flex bg-surface2 border border-border rounded-lg p-0.5 gap-0.5">
          {(["grid", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              title={`${v} view`}
              className={
                viewMode === v
                  ? "w-8 h-8 rounded-md text-[13px] transition-all duration-100 bg-surface text-text"
                  : "w-8 h-8 rounded-md text-[13px] transition-all duration-100 text-muted hover:text-text"
              }
            >
              {v === "grid" ? "⊞" : "☰"}
            </button>
          ))}
        </div>

        <Button variant="primary" onClick={onNewSnippet}>
          <span className="text-[16px] leading-none">+</span> New Snippet
        </Button>
      </div>
    </header>
  );
}
