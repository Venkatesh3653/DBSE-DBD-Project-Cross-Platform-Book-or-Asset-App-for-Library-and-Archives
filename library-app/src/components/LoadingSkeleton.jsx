export function CardSkeleton() {
  return (
    <div className="rounded-card border border-line dark:border-brand-700 p-4 space-y-3">
      <div className="skeleton h-40 rounded-lg w-full" />
      <div className="skeleton h-4 rounded w-3/4" />
      <div className="skeleton h-3 rounded w-1/2" />
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 rounded w-1/3" />
        <div className="skeleton h-3 rounded w-1/4" />
      </div>
    </div>
  )
}

export default function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
