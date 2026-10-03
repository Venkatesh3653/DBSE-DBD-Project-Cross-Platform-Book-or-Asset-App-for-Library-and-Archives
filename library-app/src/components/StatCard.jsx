export default function StatCard({ label, value, icon: Icon, hint, tone = 'default', className = '' }) {
  const iconTone =
    tone === 'warning'
      ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
      : tone === 'danger'
      ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
      : 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300'

  return (
    <div className={`rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5 flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-soft dark:text-paper-off/60">{label}</span>
        {Icon && (
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${iconTone}`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-ink dark:text-paper-off">{value}</div>
      {hint && <span className="text-xs text-ink-soft dark:text-paper-off/50">{hint}</span>}
    </div>
  )
}
