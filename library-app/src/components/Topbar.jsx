import { Search, Bell, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuth } from '../context/AuthContext'
import { notificationsSeed } from '../data/misc'

export default function Topbar({ onOpenSearch, onOpenMenu, title }) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const unread = notificationsSeed.filter((n) => !n.read).length

  return (
    <header className="h-16 shrink-0 border-b border-line dark:border-brand-700 bg-paper/95 dark:bg-brand-800/95 backdrop-blur sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6">
      <button
        onClick={onOpenMenu}
        className="lg:hidden p-2 -ml-2 text-ink-soft dark:text-paper-off/70"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {title && <h1 className="hidden sm:block font-serif text-lg font-semibold text-ink dark:text-paper-off shrink-0">{title}</h1>}

      <button
        onClick={onOpenSearch}
        className="flex-1 max-w-md ml-auto flex items-center gap-2 px-3 py-2 rounded-lg border border-line dark:border-brand-700 text-ink-soft dark:text-paper-off/50 hover:border-brand-300 dark:hover:border-brand-500 transition-colors"
      >
        <Search size={15} />
        <span className="text-sm flex-1 text-left hidden sm:inline">Search books, assets, archives…</span>
        <span className="text-sm sm:hidden">Search</span>
        <kbd className="hidden sm:inline text-xs border border-line dark:border-brand-600 rounded px-1.5 py-0.5">Ctrl K</kbd>
      </button>

      <button
        onClick={() => navigate('/notifications')}
        aria-label="Notifications"
        className="relative p-2 rounded-lg text-ink-soft dark:text-paper-off/70 hover:bg-paper-off dark:hover:bg-brand-700"
      >
        <Bell size={19} />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        )}
      </button>

      <Link to="/settings" aria-label="Profile settings">
        <Avatar name={currentUser?.name || 'Guest'} size={34} />
      </Link>
    </header>
  )
}
