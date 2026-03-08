"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Snippet, SnippetsResponse } from "@/types";
import { GetSnippetsParams } from "@/lib/interfaces";

export function useSnippets(params: GetSnippetsParams) {
  const [data, setData] = useState<SnippetsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.snippets.getAll(params);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.snippets
      .getTags()
      .then(setTags)
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading };
}

export function useSnippet(id: string) {
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSnippet = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const result = await api.snippets.getById(id);
      setSnippet(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  return { snippet, loading, error, refetch: fetchSnippet };
}
