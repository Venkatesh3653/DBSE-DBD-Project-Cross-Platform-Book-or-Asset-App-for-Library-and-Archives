import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Library as LibraryIcon } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { getBooks } from '../services/booksService'
import { getBorrowingsByUser, deriveStatus, daysRemaining, returnBook, renewBook } from '../services/borrowingsService'
import { useAuth } from '../context/AuthContext'
import { useLibrary } from '../context/LibraryContext'
import { useToast } from '../context/ToastContext'

const TABS = ['All', 'Currently Reading', 'Borrowed', 'Favorites', 'Completed', 'Saved']

export default function MyLibrary() {
  const { currentUser } = useAuth()
  const { favorites, toggleFavorite } = useLibrary()
  const { showToast } = useToast()
  const [books, setBooks] = useState([])
  const [borrowings, setBorrowings] = useState([])
  const [tab, setTab] = useState('All')

  async function refresh() {
    const [b, br] = await Promise.all([getBooks(), getBorrowingsByUser(currentUser.id)])
    setBooks(b)
    setBorrowings(br)
  }

  useEffect(() => {
    refresh()
  }, [currentUser.id])

  const bookById = (id) => books.find((b) => b.id === id)

  const activeLoans = borrowings.filter((r) => deriveStatus(r) !== 'returned')
  const completedLoans = borrowings.filter((r) => deriveStatus(r) === 'returned')
  const favoriteBooks = books.filter((b) => favorites.includes(b.id))

  let entries = []
  if (tab === 'All') {
    entries = [
      ...activeLoans.map((r) => ({ kind: 'loan', record: r, book: bookById(r.bookId) })),
      ...favoriteBooks
        .filter((b) => !activeLoans.some((r) => r.bookId === b.id))
        .map((b) => ({ kind: 'favorite', book: b })),
    ]
  } else if (tab === 'Currently Reading' || tab === 'Borrowed') {
    entries = activeLoans.map((r) => ({ kind: 'loan', record: r, book: bookById(r.bookId) }))
  } else if (tab === 'Favorites' || tab === 'Saved') {
    entries = favoriteBooks.map((b) => ({ kind: 'favorite', book: b }))
  } else if (tab === 'Completed') {
    entries = completedLoans.map((r) => ({ kind: 'completed', record: r, book: bookById(r.bookId) }))
  }

  async function handleReturn(recordId, title) {
    await returnBook(recordId)
    await refresh()
    showToast(`"${title}" returned. Thanks!`)
  }

  async function handleRenew(recordId, title) {
    await renewBook(recordId)
    await refresh()
    showToast(`"${title}" renewed for 14 more days.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">My library</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Everything you're reading, borrowing, and saving.</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line dark:border-brand-700 pb-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              tab === t
                ? 'bg-brand-500 text-white'
                : 'text-ink-soft dark:text-paper-off/70 hover:bg-paper-off dark:hover:bg-brand-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {entries.length === 0 ? (
        <EmptyState
          icon={LibraryIcon}
          title="Nothing here yet"
          message="Books you borrow or favorite will show up in this tab."
          action={
            <Link to="/discover">
              <Button size="sm">Discover books</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => {
            const book = entry.book
            if (!book) return null
            const remaining = entry.record ? daysRemaining(entry.record) : null
            const status = entry.record ? deriveStatus(entry.record) : null

            return (
              <div
                key={`${entry.kind}-${book.id}-${entry.record?.id || ''}`}
                className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <img src={book.cover} alt="" className="w-14 h-20 object-cover rounded-md shrink-0" />
                <div className="flex-1 min-w-0">
                  <Link to={`/books/${book.id}`} className="font-medium text-ink dark:text-paper-off hover:underline">
                    {book.title}
                  </Link>
                  <p className="text-sm text-ink-soft dark:text-paper-off/60">{book.author}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {status && (
                      <Badge tone={status === 'overdue' ? 'danger' : status === 'due-soon' ? 'warning' : 'success'}>
                        {status === 'overdue' ? 'Overdue' : status === 'due-soon' ? 'Due soon' : 'Active'}
                      </Badge>
                    )}
                    {entry.kind === 'completed' && <Badge tone="neutral">Returned</Badge>}
                    {entry.record && (
                      <span className="text-xs text-ink-soft dark:text-paper-off/50">
                        Due {entry.record.dueDate} · {remaining >= 0 ? `${remaining}d left` : `${Math.abs(remaining)}d overdue`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {entry.kind === 'favorite' && (
                    <Button variant="ghost" size="sm" icon={Heart} onClick={() => toggleFavorite(book.id)}>
                      Remove
                    </Button>
                  )}
                  {entry.kind === 'loan' && (
                    <>
                      <Button variant="secondary" size="sm" onClick={() => handleRenew(entry.record.id, book.title)}>
                        Renew
                      </Button>
                      <Button size="sm" onClick={() => handleReturn(entry.record.id, book.title)}>
                        Return
                      </Button>
                    </>
                  )}
                  {entry.kind === 'loan' && (
                    <Link to={`/reader/${book.id}`}>
                      <Button variant="ghost" size="sm">Continue</Button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
