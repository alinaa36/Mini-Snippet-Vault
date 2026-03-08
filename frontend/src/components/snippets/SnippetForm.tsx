"use client";

import { useState, KeyboardEvent } from "react";
import { FormErrors, SnippetType } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, FormGroup } from "@/components/ui/FormFields";
import { TagBadge } from "@/components/ui/Badge";
import { TYPE_ACTIVE, TYPE_OPTIONS } from "@/lib/constants";
import { SnippetFormProps } from "@/lib/interfaces";

export function SnippetForm({
  initial,
  loading,
  onSubmit,
  onCancel,
  submitLabel = "Save snippet",
}: SnippetFormProps) {
  const [type, setType] = useState<SnippetType>(initial?.type ?? "link");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!content.trim()) errs.content = "Content is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit({ type, title: title.trim(), content: content.trim(), tags });
  }

  function handleTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  function addTag(raw: string) {
    const t = raw.trim().replace(/,/g, "").toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  return (
    <div>
      <FormGroup label="Type" required>
        <div className="flex gap-2">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setType(opt.value)}
              className={`
                flex-1 py-2.5 rounded-xl border-[1.5px] text-center transition-all duration-150 cursor-pointer
                ${
                  type === opt.value
                    ? TYPE_ACTIVE[opt.color]
                    : "border-border bg-surface-2 text-muted hover:border-border-2 hover:text-text"
                }
              `}
            >
              <span className="block text-[18px] mb-0.5">{opt.icon}</span>
              <span className="font-mono text-[10px] tracking-wider">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </FormGroup>

      <FormGroup label="Title" required error={errors.title}>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((p) => ({ ...p, title: "" }));
          }}
          placeholder="e.g. Deploy to production"
          error={!!errors.title}
          autoFocus
        />
      </FormGroup>

      <FormGroup label="Content" required error={errors.content}>
        <Textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setErrors((p) => ({ ...p, content: "" }));
          }}
          placeholder="Paste your link, note, or command here…"
          rows={4}
          error={!!errors.content}
        />
      </FormGroup>

      <FormGroup label="Tags" hint="Press Enter or comma to add a tag">
        <div
          onClick={() => document.getElementById("tag-input")?.focus()}
          className="
            flex flex-wrap gap-1.5 bg-surface-2 border border-border rounded-lg
            px-3 py-2 min-h-[44px] cursor-text
            focus-within:border-emerald-500/60 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.10)]
            transition-all duration-150
          "
        >
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              removable
              onRemove={() => removeTag(tag)}
            />
          ))}
          <input
            id="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            onBlur={() => tagInput && addTag(tagInput)}
            placeholder={tags.length === 0 ? "Add tag…" : ""}
            className="border-none bg-transparent outline-none text-[13.5px] text-text placeholder:text-subtle font-sans flex-1 min-w-[80px]"
          />
        </div>
      </FormGroup>

      <div className="flex justify-end gap-2.5 pt-1">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" loading={loading} onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
