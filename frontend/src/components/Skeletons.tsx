export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border bg-card p-6">
      <div className="h-40 rounded-2xl bg-muted" />
      <div className="mt-4 h-4 w-1/2 rounded bg-muted" />
      <div className="mt-2 h-6 w-3/4 rounded bg-muted" />
      <div className="mt-4 h-3 w-full rounded bg-muted" />
      <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}
