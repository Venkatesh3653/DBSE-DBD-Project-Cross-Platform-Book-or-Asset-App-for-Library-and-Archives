import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Heart, FileStack, Sparkles, ChevronRight } from 'lucide-react'
import StatCard from '../components/StatCard'
import BookCard from '../components/BookCard'
import { CardSkeleton } from '../components/LoadingSkeleton'
import { useAuth } from '../context/AuthContext'
import { useLibrary } from '../context/LibraryContext'
import { getBooks } from '../services/booksService'
import { getBorrowingsByUser, deriveStatus } from '../services/borrowingsService'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { favorites } = useLibrary()
  const [books, setBooks] = useState([])
  const [borrowings, setBorrowings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    Promise.all([getBooks(), getBorrowingsByUser(currentUser.id)]).then(([b, br]) => {
      if (!mounted) return
      setBooks(b)
      setBorrowings(br)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [currentUser.id])

  const bookById = (id) => books.find((b) => b.id === id)
  const active = borrowings.filter((r) => deriveStatus(r) !== 'returned')
  const dueSoon = active.filter((r) => ['due-soon', 'overdue'].includes(deriveStatus(r)))
  const continueReading = active.slice(0, 3).map((r) => ({
    ...r,
    book: bookById(r.bookId),
    progress: [68, 34, 82][active.indexOf(r) % 3],
  }))

  const recommended = books.slice(3, 9)
  const aiPicks = books.slice(6, 10)

  const firstName = currentUser.name.split(' ')[0]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">
          Good morning, {firstName}
        </h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Discover, organize and access your library.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Borrowed" value={active.length} icon={BookOpen} />
        <StatCard label="Due soon" value={dueSoon.length} icon={Clock} tone={dueSoon.length ? 'warning' : 'default'} />
        <StatCard label="Saved" value={favorites.length} icon={Heart} />
        <StatCard label="Digital assets" value={8} icon={FileStack} />
        <StatCard label="Reading progress" value="68%" icon={Sparkles} className="col-span-2 lg:col-span-1" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-ink dark:text-paper-off">Continue reading</h2>
          <Link to="/my-library" className="text-sm text-brand-500 dark:text-brand-300 flex items-center gap-0.5 hover:underline">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : continueReading.length === 0 ? (
          <p className="text-sm text-ink-soft dark:text-paper-off/60 border border-dashed border-line dark:border-brand-700 rounded-card py-8 text-center">
            You're not currently reading anything. Borrow a book to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {continueReading.map(
              (r) =>
                r.book && (
                  <div key={r.id} className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-4 flex gap-3">
                    <img src={r.book.cover} alt="" className="w-16 h-24 object-cover rounded-md shrink-0" />
                    <div className="flex-1 min-w-0 flex flex-col">
                      <p className="font-medium text-sm text-ink dark:text-paper-off truncate">{r.book.title}</p>
                      <p className="text-xs text-ink-soft dark:text-paper-off/60">{r.book.author}</p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-ink-soft dark:text-paper-off/60 mb-1">
                          <span>{r.progress}% complete</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-line dark:bg-brand-700 overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${r.progress}%` }} />
                        </div>
                        <Link
                          to={`/reader/${r.book.id}`}
                          className="text-xs font-medium text-brand-500 dark:text-brand-300 mt-2 inline-block hover:underline"
                        >
                          Continue reading
                        </Link>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-gold-500" />
          <h2 className="font-semibold text-ink dark:text-paper-off">AI picks for you</h2>
        </div>
        <p className="text-xs text-ink-soft dark:text-paper-off/50 mb-3">Based on your recent reading</p>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiPicks.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-ink dark:text-paper-off">Recommended for you</h2>
          </div>
          <Link to="/discover" className="text-sm text-brand-500 dark:text-brand-300 flex items-center gap-0.5 hover:underline">
            Discover more <ChevronRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommended.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </div>
  )
}
