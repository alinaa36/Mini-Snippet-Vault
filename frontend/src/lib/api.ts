import { Snippet, SnippetFormData, SnippetsResponse } from "@/types";
import { GetSnippetsParams } from "./interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message ?? "Request failed");
  }
  return res.json();
}

export const api = {
  snippets: {
    getAll: (params: GetSnippetsParams = {}): Promise<SnippetsResponse> => {
      const query = new URLSearchParams();
      if (params.q) query.set("q", params.q);
      if (params.tag) query.set("tag", params.tag);
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));
      return request<SnippetsResponse>(`/snippets?${query}`);
    },

    getById: (id: string): Promise<Snippet> =>
      request<Snippet>(`/snippets/${id}`),

    getTags: (): Promise<string[]> => request(`/snippets/tags`),

    create: (data: SnippetFormData): Promise<Snippet> =>
      request<Snippet>("/snippets", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<SnippetFormData>): Promise<Snippet> =>
      request<Snippet>(`/snippets/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    delete: (id: string): Promise<void> =>
      request<void>(`/snippets/${id}`, { method: "DELETE" }),
  },
};
