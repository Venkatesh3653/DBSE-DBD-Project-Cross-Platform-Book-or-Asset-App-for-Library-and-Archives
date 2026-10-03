const styles = {
  neutral: 'bg-line/60 text-ink-soft dark:bg-brand-700 dark:text-paper-off/80',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  danger: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-200',
  gold: 'bg-gold-400/15 text-gold-600 dark:text-gold-400',
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone] || styles.neutral} ${className}`}
    >
      {children}
    </span>
  )
}
