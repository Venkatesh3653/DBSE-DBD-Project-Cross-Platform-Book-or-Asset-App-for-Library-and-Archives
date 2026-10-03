import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-ink/40 dark:bg-black/60 p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`animate-fade-in w-full ${widths[size]} bg-paper dark:bg-brand-800 rounded-card border border-line dark:border-brand-600 shadow-subtle my-8`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line dark:border-brand-700">
          <h2 className="font-semibold text-ink dark:text-paper-off">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-ink-soft hover:text-ink dark:text-paper-off/60 dark:hover:text-paper-off p-1 rounded-md hover:bg-paper-off dark:hover:bg-brand-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
