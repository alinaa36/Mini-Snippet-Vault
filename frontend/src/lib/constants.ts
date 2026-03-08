import { SnippetType } from "@/types";

export const NAV_ITEMS = [
  { id: null, label: "All Snippets", icon: "◈", iconColor: "" },
  { id: "link", label: "Links", icon: "⬡", iconColor: "#fbbf24" },
  { id: "note", label: "Notes", icon: "◉", iconColor: "#34d399" },
  { id: "command", label: "Commands", icon: "▸", iconColor: "#6ee7b7" },
];

export const TYPE_OPTIONS: {
  value: SnippetType;
  icon: string;
  label: string;
  color: string;
}[] = [
  { value: "link", icon: "⬡", label: "link", color: "amber" },
  { value: "note", icon: "◉", label: "note", color: "emerald" },
  { value: "command", icon: "▸", label: "command", color: "green" },
];

export const TYPE_ACTIVE: Record<string, string> = {
  amber: "border-amber-500/60 bg-amber-500/10 text-amber-400",
  emerald: "border-emerald-500/60 bg-emerald-500/10 text-emerald-400",
  green: "border-green-400/60 bg-green-400/10 text-green-300",
};
