import { NavLink, Link } from 'react-router-dom'
import {
  LayoutGrid,
  BookOpen,
  Users,
  FileStack,
  Archive,
  RefreshCcw,
  BarChart3,
  Settings,
  BookMarked,
  ArrowLeftRight,
} from 'lucide-react'
import Avatar from './Avatar'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/admin/books', label: 'Books', icon: BookOpen },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/assets', label: 'Digital Assets', icon: FileStack },
  { to: '/admin/archives', label: 'Archives', icon: Archive },
  { to: '/admin/borrowings', label: 'Borrowing', icon: RefreshCcw },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar({ onNavigate }) {
  const { currentUser } = useAuth()

  return (
    <div className="flex flex-col h-full bg-brand-900 text-paper-off border-r border-brand-700">
      <div className="flex items-center gap-2 px-5 h-16 shrink-0 border-b border-brand-700">
        <div className="h-8 w-8 rounded-lg bg-gold-500 flex items-center justify-center">
          <BookMarked size={16} className="text-brand-900" />
        </div>
        <span className="font-serif font-semibold text-lg">Stackwell</span>
        <span className="ml-auto text-[10px] tracking-wide bg-brand-700 px-2 py-0.5 rounded-full text-paper-off/70">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-gold-500/15 text-gold-400 font-medium' : 'text-paper-off/70 hover:bg-brand-800'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-brand-700 space-y-3">
        <Link to="/dashboard" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-paper-off/70 hover:bg-brand-800">
          <ArrowLeftRight size={16} />
          Switch to user view
        </Link>
        <div className="flex items-center gap-3 px-2">
          <Avatar name={currentUser?.name || 'Admin'} size={34} />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-paper-off/50">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
