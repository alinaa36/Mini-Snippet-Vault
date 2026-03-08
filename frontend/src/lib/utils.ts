import { SnippetType } from '@/types';

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60)     return 'just now';
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

export function formatDateFull(iso: string): string {
  return new Date(iso).toLocaleDateString('en', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const TYPE_CONFIG: Record<SnippetType, { label: string; icon: string; color: string }> = {
  link:    { label: 'link',    icon: '⬡', color: 'amber' },
  note:    { label: 'note',    icon: '◉', color: 'green' },
  command: { label: 'command', icon: '▸', color: 'accent' },
};

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}