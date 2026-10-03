import { NavLink } from 'react-router-dom'
import { Home, Compass, Library, Bell, User } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/my-library', label: 'Library', icon: Library },
  { to: '/notifications', label: 'Alerts', icon: Bell },
  { to: '/settings', label: 'Profile', icon: User },
]

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-paper/95 dark:bg-brand-800/95 backdrop-blur border-t border-line dark:border-brand-700 flex items-stretch pb-[env(safe-area-inset-bottom)]">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs ${
              isActive ? 'text-brand-500 dark:text-brand-300' : 'text-ink-soft dark:text-paper-off/50'
            }`
          }
        >
          <Icon size={19} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
