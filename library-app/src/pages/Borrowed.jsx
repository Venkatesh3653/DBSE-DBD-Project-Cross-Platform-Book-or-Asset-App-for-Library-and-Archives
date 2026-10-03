import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import DataTable from '../components/DataTable'
import { getBooks } from '../services/booksService'
import { getBorrowingsByUser, deriveStatus, daysRemaining, returnBook, renewBook } from '../services/borrowingsService'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const statusTone = { active: 'success', 'due-soon': 'warning', overdue: 'danger', returned: 'neutral' }
const statusLabel = { active: 'Active', 'due-soon': 'Due soon', overdue: 'Overdue', returned: 'Returned' }

export default function Borrowed() {
  const { currentUser } = useAuth()
  const { showToast } = useToast()
  const [books, setBooks] = useState([])
  const [borrowings, setBorrowings] = useState([])

  async function refresh() {
    const [b, br] = await Promise.all([getBooks(), getBorrowingsByUser(currentUser.id)])
    setBooks(b)
    setBorrowings(br)
  }

  useEffect(() => {
    refresh()
  }, [currentUser.id])

  const bookById = (id) => books.find((b) => b.id === id)
  const rows = borrowings
    .map((r) => ({ ...r, book: bookById(r.bookId), status: deriveStatus(r), remaining: daysRemaining(r) }))
    .filter((r) => r.book)
    .sort((a, b) => (a.status === 'overdue' ? -1 : 1))

  async function handleReturn(id, title) {
    await returnBook(id)
    await refresh()
    showToast(`"${title}" returned. Thanks!`)
  }

  async function handleRenew(id, title) {
    await renewBook(id)
    await refresh()
    showToast(`"${title}" renewed for 14 more days.`)
  }

  if (rows.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Borrowed books</h1>
        <EmptyState icon={Clock} title="No borrowed books" message="Books you borrow will appear here with their due dates." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Borrowed books</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Track due dates and renew before they lapse.</p>
      </div>

      <DataTable
        columns={[
          {
            key: 'book',
            header: 'Book',
            render: (row) => (
              <Link to={`/books/${row.book.id}`} className="flex items-center gap-3 hover:underline">
                <img src={row.book.cover} alt="" className="w-8 h-11 object-cover rounded" />
                <span className="font-medium text-ink dark:text-paper-off">{row.book.title}</span>
              </Link>
            ),
          },
          { key: 'borrowedDate', header: 'Borrowed date' },
          { key: 'dueDate', header: 'Due date' },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <Badge tone={row.status === 'overdue' ? 'danger' : statusTone[row.status]}>{statusLabel[row.status]}</Badge>
            ),
          },
          {
            key: 'remaining',
            header: 'Days remaining',
            render: (row) =>
              row.status === 'returned' ? (
                '—'
              ) : row.remaining >= 0 ? (
                `${row.remaining} days`
              ) : (
                <span className="text-rose-600 font-medium">{Math.abs(row.remaining)} days overdue</span>
              ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) =>
              row.status === 'returned' ? (
                <span className="text-ink-soft dark:text-paper-off/40 text-sm">—</span>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleRenew(row.id, row.book.title)}>
                    Renew
                  </Button>
                  <Button size="sm" onClick={() => handleReturn(row.id, row.book.title)}>
                    Return
                  </Button>
                </div>
              ),
          },
        ]}
        rows={rows}
      />
    </div>
  )
}
