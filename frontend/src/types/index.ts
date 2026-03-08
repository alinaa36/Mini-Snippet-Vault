export type SnippetType = "link" | "note" | "command";
export type ViewMode = "grid" | "list";
export type FormErrors = Partial<Record<keyof SnippetFormData, string>>;

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetsResponse {
  data: Snippet[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface SnippetFormData {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
