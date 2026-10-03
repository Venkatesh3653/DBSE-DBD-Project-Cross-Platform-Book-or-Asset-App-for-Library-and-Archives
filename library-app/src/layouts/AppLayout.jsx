import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import MobileNav from '../components/MobileNav'
import CommandPalette from '../components/CommandPalette'
import { useAuth } from '../context/AuthContext'

export default function AppLayout() {
  const { currentUser } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!currentUser) return <Navigate to="/login" replace />

  return (
    <div className="h-screen flex bg-paper-off dark:bg-brand-900 text-ink dark:text-paper-off">
      <aside className="hidden lg:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">
            <div className="relative h-full">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-3 z-10 p-1.5 rounded-lg bg-paper-off dark:bg-brand-700"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
              <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenSearch={() => setSearchOpen(true)} onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
