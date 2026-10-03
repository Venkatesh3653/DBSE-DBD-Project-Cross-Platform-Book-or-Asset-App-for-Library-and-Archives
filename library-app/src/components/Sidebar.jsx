import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Compass,
  Library,
  BookOpen,
  FileStack,
  Archive,
  Clock,
  Bell,
  Settings,
  Moon,
  Sun,
  BookMarked,
} from 'lucide-react'
import Avatar from './Avatar'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/my-library', label: 'My Library', icon: Library },
  { to: '/books', label: 'Books', icon: BookOpen },
  { to: '/assets', label: 'Digital Assets', icon: FileStack },
  { to: '/archives', label: 'Archives', icon: Archive },
  { to: '/borrowed', label: 'Borrowed', icon: Clock },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ onNavigate }) {
  const { currentUser } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col h-full bg-paper dark:bg-brand-800 border-r border-line dark:border-brand-700">
      <div className="flex items-center gap-2 px-5 h-16 shrink-0 border-b border-line dark:border-brand-700">
        <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <BookMarked size={16} className="text-white" />
        </div>
        <span className="font-serif font-semibold text-lg text-ink dark:text-paper-off">Stackwell</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-600 font-medium dark:bg-brand-500/15 dark:text-brand-200'
                  : 'text-ink-soft hover:bg-paper-off dark:text-paper-off/70 dark:hover:bg-brand-700/60'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-line dark:border-brand-700 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar name={currentUser?.name || 'Guest'} size={34} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink dark:text-paper-off truncate">{currentUser?.name}</p>
            <p className="text-xs text-ink-soft dark:text-paper-off/50">{currentUser?.role}</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-soft hover:bg-paper-off dark:text-paper-off/70 dark:hover:bg-brand-700/60"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </div>
  )
}
