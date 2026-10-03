import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { X } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'
import Topbar from '../components/Topbar'
import CommandPalette from '../components/CommandPalette'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { currentUser, isAdmin } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!currentUser) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return (
    <div className="h-screen flex bg-paper-off dark:bg-brand-900 text-ink dark:text-paper-off">
      <aside className="hidden lg:block w-64 shrink-0">
        <AdminSidebar />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">
            <div className="relative h-full">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-3 z-10 p-1.5 rounded-lg bg-brand-800"
                aria-label="Close menu"
              >
                <X size={16} className="text-paper-off" />
              </button>
              <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenSearch={() => setSearchOpen(true)} onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
