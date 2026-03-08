"use client";

import { useState } from "react";
import { formatDateFull } from "@/lib/utils";
import { TypeBadge, TagBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SnippetDetailProps } from "@/lib/interfaces";

export function SnippetDetail({
  snippet,
  onEdit,
  onDelete,
}: SnippetDetailProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(snippet.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <article className="w-full bg-surface border border-border-2 rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-10 pt-10 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="space-y-4">
            <TypeBadge type={snippet.type} />
            <h1 className="font-display text-[32px] font-bold text-text leading-tight tracking-tight">
              {snippet.title}
            </h1>
          </div>

          <div className="flex gap-2.5 shrink-0">
            <Button
              size="sm"
              onClick={onEdit}
              className="border-border text-muted hover:text-text hover:bg-surface-2"
            >
              ✎ Edit
            </Button>
            <Button
              className="bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-200"
              size="sm"
              onClick={onDelete}
            >
              ✕ Delete
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
            {snippet.tags.length === 0 && (
              <span className="font-mono text-[11px] text-subtle">no tags</span>
            )}
          </div>
          <div className="text-subtle font-mono text-[12px] uppercase tracking-wider">
            {formatDateFull(snippet.createdAt)}
          </div>
        </div>
      </div>

      <div className="p-10">
        {snippet.type === "command" ? (
          <div className="relative group">
            <div className="absolute -inset-1 bg-emerald-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-surface-2 border border-border rounded-xl p-8">
              <button
                onClick={copyToClipboard}
                className={`absolute top-4 right-4 font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-all 
                  ${copied ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-border text-muted border-transparent hover:text-text hover:border-border-2"}`}
              >
                {copied ? "COPIED!" : "COPY"}
              </button>
              <pre className="font-mono text-[15px] text-emerald-400/90 leading-relaxed whitespace-pre-wrap break-all pr-12">
                <span className="text-emerald-800 mr-3 select-none">$</span>
                {snippet.content}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-[17px] text-text leading-[1.8] whitespace-pre-wrap font-sans opacity-90">
            {snippet.content}
          </div>
        )}

        {snippet.updatedAt !== snippet.createdAt && (
          <div className="mt-12 pt-8 border-t border-border flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></span>
            <span className="text-[11px] font-mono text-subtle uppercase tracking-[1px]">
              Last modified: {formatDateFull(snippet.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
