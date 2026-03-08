export function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="h-4 w-[55%] rounded-md bg-surface-2 animate-shimmer" />
        <div className="h-5 w-14 rounded-md bg-surface-2 animate-shimmer" />
      </div>
      <div className="h-3 w-[90%] rounded-md bg-surface-2 animate-shimmer" />
      <div className="h-3 w-[70%] rounded-md bg-surface-2 animate-shimmer" />
      <div className="flex gap-2 pt-1">
        <div className="h-4 w-12 rounded-md bg-surface-2 animate-shimmer" />
        <div className="h-4 w-16 rounded-md bg-surface-2 animate-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
