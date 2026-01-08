interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-charcoal/10 ${className}`}
    />
  );
}

export function ThesisCardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border border-charcoal/10 bg-white p-6">
      <Skeleton className="aspect-[16/9] w-full rounded-md" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
