import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon = '⌗', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-[72px] h-[72px] rounded-2xl bg-surface-2 border border-dashed border-border-2 flex items-center justify-center text-[28px] text-muted mb-5">
        {icon}
      </div>
      <h3 className="font-display text-[20px] font-semibold text-text mb-2">{title}</h3>
      <p className="text-[14px] text-muted mb-6 max-w-[260px] leading-relaxed">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Failed to load data.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-[72px] h-[72px] rounded-2xl bg-red-500/10 border border-dashed border-red-500/30 flex items-center justify-center text-[28px] text-red-400 mb-5">
        ⚠
      </div>
      <h3 className="font-display text-[20px] font-semibold text-text mb-2">Something went wrong</h3>
      <p className="text-[14px] text-muted mb-6 max-w-[260px]">{message}</p>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>↺ Try again</Button>
      )}
    </div>
  );
}