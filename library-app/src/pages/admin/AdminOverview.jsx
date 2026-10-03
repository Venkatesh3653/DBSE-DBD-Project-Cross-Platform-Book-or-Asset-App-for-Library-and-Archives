import { useEffect, useState } from 'react'
import { BookOpen, Users, RefreshCcw, AlertTriangle, FileStack, Archive as ArchiveIcon } from 'lucide-react'
import StatCard from '../../components/StatCard'
import { getBooks } from '../../services/booksService'
import { getUsers } from '../../services/usersService'
import { getBorrowings, deriveStatus } from '../../services/borrowingsService'
import { getAssets, getArchives } from '../../services/assetsService'

export default function AdminOverview() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([getBooks(), getUsers(), getBorrowings(), getAssets(), getArchives()]).then(
      ([books, users, borrowings, assets, archives]) => {
        setStats({
          totalBooks: books.length,
          totalUsers: users.length,
          borrowed: borrowings.filter((r) => deriveStatus(r) !== 'returned').length,
          overdue: borrowings.filter((r) => deriveStatus(r) === 'overdue').length,
          assets: assets.length,
          archiveItems: archives.reduce((sum, a) => sum + a.items, 0),
        })
      }
    )
  }, [])

  if (!stats) return <div className="skeleton h-64 rounded-card" />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Overview</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">A snapshot of the whole library system.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total books" value={stats.totalBooks} icon={BookOpen} />
        <StatCard label="Total users" value={stats.totalUsers} icon={Users} />
        <StatCard label="Books borrowed" value={stats.borrowed} icon={RefreshCcw} />
        <StatCard label="Overdue books" value={stats.overdue} icon={AlertTriangle} tone={stats.overdue ? 'danger' : 'default'} />
        <StatCard label="Digital assets" value={stats.assets} icon={FileStack} />
        <StatCard label="Archive items" value={stats.archiveItems.toLocaleString()} icon={ArchiveIcon} />
      </div>
    </div>
  )
}
