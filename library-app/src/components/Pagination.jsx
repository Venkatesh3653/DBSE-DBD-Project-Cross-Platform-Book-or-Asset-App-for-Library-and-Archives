import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="h-8 w-8 flex items-center justify-center rounded-lg border border-line dark:border-brand-700 disabled:opacity-40 hover:bg-paper-off dark:hover:bg-brand-800"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm text-ink-soft dark:text-paper-off/60 px-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="h-8 w-8 flex items-center justify-center rounded-lg border border-line dark:border-brand-700 disabled:opacity-40 hover:bg-paper-off dark:hover:bg-brand-800"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
