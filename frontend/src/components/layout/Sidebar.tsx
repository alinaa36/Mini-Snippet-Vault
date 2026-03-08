"use client";

import { SidebarProps } from "@/lib/interfaces";
import { SnippetType } from "@/types";
import { NAV_ITEMS } from "@/lib/constants";

interface ExtendedSidebarProps extends SidebarProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function Sidebar({
  tags,
  activeType,
  activeTag,
  onTypeChange,
  onTagChange,
  isOpen,
  onClose,
}: ExtendedSidebarProps) {
  return (
    <>
      <aside
        className={`
          w-[240px] min-h-screen bg-surface border-r border-border flex flex-col fixed top-0 left-0 z-50 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="px-5 py-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[15px] text-white font-bold shadow-[0_0_12px_rgba(52,211,153,0.4)]">
              ⌗
            </div>
            <div className="font-display text-[19px] font-bold text-text leading-tight tracking-tight">
              Vault
            </div>
          </div>

          <button
            onClick={() => onClose(false)}
            className="p-1.5 rounded-md text-subtle hover:bg-surface2 hover:text-text transition-colors"
          >
            <span className="text-xl">«</span>
          </button>
        </div>

        <div className="p-3 border-b border-border">
          <div className="font-mono text-[10px] font-medium tracking-[1.5px] uppercase text-subtle px-2 mb-2">
            Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeType;
            return (
              <button
                key={String(item.id)}
                onClick={() => onTypeChange(item.id as SnippetType | null)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] transition-all duration-100 mb-0.5 text-left
                  ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-muted hover:bg-surface2 hover:text-text"
                  }
                `}
              >
                <span
                  style={{
                    color: item.iconColor || (isActive ? "#34d399" : "#8a8278"),
                  }}
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>

        {tags.length > 0 && (
          <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
            <div className="font-mono text-[10px] font-medium tracking-[1.5px] uppercase text-subtle px-2 mb-2">
              Tags
            </div>
            {tags.slice(0, 12).map((tag, index) => (
              <button
                key={`side-tag-${tag}-${index}`}
                onClick={() => onTagChange(activeTag === tag ? null : tag)}
                className={`
                  w-full flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-all duration-100 mb-0.5 text-left
                  ${
                    activeTag === tag
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-muted hover:bg-surface2 hover:text-text"
                  }
                `}
              >
                <span className="text-emerald-500/50 font-mono text-[11px]">
                  #
                </span>
                <span className="truncate">{tag}</span>
              </button>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
