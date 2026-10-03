import { useState } from 'react'
import { Bell, BellOff, BookOpen, FileStack, Archive as ArchiveIcon, Clock } from 'lucide-react'
import { notificationsSeed } from '../data/misc'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'

const iconFor = {
  'Due soon': Clock,
  'New resources': FileStack,
  'Book available': BookOpen,
  'Archive updated': ArchiveIcon,
  'Overdue notice': Clock,
}

export default function Notifications() {
  const [items, setItems] = useState(notificationsSeed)

  function markAllRead() {
    setItems((list) => list.map((n) => ({ ...n, read: true })))
  }

  function dismiss(id) {
    setItems((list) => list.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Notifications</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Updates on due dates, holds, and new resources.</p>
        </div>
        {items.some((n) => !n.read) && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>Mark all as read</Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={BellOff} title="No notifications" message="You're all caught up." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const Icon = iconFor[n.title] || Bell
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-card border p-4 ${
                  n.read
                    ? 'border-line dark:border-brand-700 bg-paper dark:bg-brand-800'
                    : 'border-brand-200 dark:border-brand-500/40 bg-brand-50/50 dark:bg-brand-500/10'
                }`}
              >
                <div className="h-9 w-9 rounded-lg bg-paper-off dark:bg-brand-900 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-brand-500 dark:text-brand-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink dark:text-paper-off">{n.title}</p>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
                  </div>
                  <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-0.5">{n.message}</p>
                  <p className="text-xs text-ink-soft dark:text-paper-off/40 mt-1">{n.time}</p>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  className="text-xs text-ink-soft dark:text-paper-off/50 hover:text-ink dark:hover:text-paper-off shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
