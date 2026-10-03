export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-line dark:border-brand-700 rounded-card">
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-paper-off dark:bg-brand-800 flex items-center justify-center mb-4">
          <Icon size={22} className="text-ink-soft dark:text-paper-off/60" />
        </div>
      )}
      <p className="font-medium text-ink dark:text-paper-off">{title}</p>
      {message && <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-1 max-w-sm">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
