import { useEffect, useState } from 'react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import DataTable from '../../components/DataTable'
import { getBooks } from '../../services/booksService'
import { getUsers } from '../../services/usersService'
import { getBorrowings, deriveStatus, daysRemaining, renewBook, returnBook } from '../../services/borrowingsService'
import { useToast } from '../../context/ToastContext'

const statusTone = { active: 'success', 'due-soon': 'warning', overdue: 'danger', returned: 'neutral' }
const statusLabel = { active: 'Active', 'due-soon': 'Due soon', overdue: 'Overdue', returned: 'Returned' }

export default function AdminBorrowings() {
  const { showToast } = useToast()
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [borrowings, setBorrowings] = useState([])
  const [filter, setFilter] = useState('All')

  async function refresh() {
    const [b, u, br] = await Promise.all([getBooks(), getUsers(), getBorrowings()])
    setBooks(b)
    setUsers(u)
    setBorrowings(br)
  }

  useEffect(() => {
    refresh()
  }, [])

  const rows = borrowings
    .map((r) => ({
      ...r,
      book: books.find((b) => b.id === r.bookId),
      user: users.find((u) => u.id === r.userId),
      status: deriveStatus(r),
      remaining: daysRemaining(r),
    }))
    .filter((r) => r.book && r.user)
    .filter((r) => filter === 'All' || r.status === filter)
    .sort((a) => (a.status === 'overdue' ? -1 : 1))

  async function handleRenew(id) {
    await renewBook(id)
    await refresh()
    showToast('Loan renewed.')
  }

  async function handleReturn(id) {
    await returnBook(id)
    await refresh()
    showToast('Marked as returned.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Borrowing</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Monitor circulation across the library.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'active', 'due-soon', 'overdue', 'returned'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-line dark:border-brand-600 text-ink-soft dark:text-paper-off/70 hover:bg-paper-off dark:hover:bg-brand-800'
            }`}
          >
            {f === 'All' ? 'All' : statusLabel[f]}
          </button>
        ))}
      </div>

      <DataTable
        columns={[
          { key: 'user', header: 'User', render: (r) => r.user.name },
          { key: 'book', header: 'Book', render: (r) => r.book.title },
          { key: 'borrowedDate', header: 'Borrowed date' },
          { key: 'dueDate', header: 'Due date' },
          {
            key: 'status', header: 'Status',
            render: (r) => <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge>,
          },
          {
            key: 'actions', header: 'Actions',
            render: (r) =>
              r.status === 'returned' ? (
                <span className="text-ink-soft dark:text-paper-off/40 text-sm">—</span>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleRenew(r.id)}>Renew</Button>
                  <Button size="sm" onClick={() => handleReturn(r.id)}>Mark returned</Button>
                </div>
              ),
          },
        ]}
        rows={rows}
      />
    </div>
  )
}
