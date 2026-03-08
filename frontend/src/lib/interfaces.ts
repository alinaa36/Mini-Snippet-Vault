import { Snippet, SnippetFormData, SnippetType, ViewMode } from "@/types";

export interface SidebarProps {
  tags: string[];
  activeType: SnippetType | null;
  activeTag: string | null;
  onTypeChange: (type: SnippetType | null) => void;
  onTagChange: (tag: string | null) => void;
}

export interface TopbarProps {
  searchValue: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewChange: (v: ViewMode) => void;
  onNewSnippet: () => void;
}

export interface FiltersBarProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  sortDesc: boolean;
  onSortToggle: () => void;
}

export interface SnippetCardProps {
  snippet: Snippet;
  activeTag: string | null;
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export interface SnippetListItemProps {
  snippet: Snippet;
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface SnippetDetailProps {
  snippet: Snippet;
  onEdit: () => void;
  onDelete: () => void;
}

export interface SnippetFormProps {
  initial?: Partial<SnippetFormData>;
  loading?: boolean;
  onSubmit: (data: SnippetFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export interface GetSnippetsParams {
  q?: string;
  tag?: string;
  type?: string;
  page?: number;
  limit?: number;
}
