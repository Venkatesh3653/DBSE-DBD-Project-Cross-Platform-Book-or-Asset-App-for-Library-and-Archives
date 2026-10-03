import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, Share2, Star, BookOpen, ChevronLeft } from 'lucide-react'
import Button from '../components/Button'
import Badge from '../components/Badge'
import BookCard from '../components/BookCard'
import { getBookById, getBooks } from '../services/booksService'
import { borrowBook, getBorrowingsByUser } from '../services/borrowingsService'
import { reviewsByBook } from '../data/misc'
import { useLibrary } from '../context/LibraryContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { isFavorite, toggleFavorite } = useLibrary()
  const { showToast } = useToast()
  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    Promise.all([getBookById(id), getBooks(), getBorrowingsByUser(currentUser.id)]).then(([b, all, borrowings]) => {
      if (!mounted) return
      setBook(b)
      setRelated(all.filter((x) => x.id !== id && x.category === b?.category).slice(0, 4))
      setAlreadyBorrowed(borrowings.some((r) => r.bookId === id && r.status !== 'returned'))
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [id, currentUser.id])

  async function handleBorrow() {
    if (!book || book.copiesAvailable <= 0) return
    await borrowBook(book.id, currentUser.id)
    setBook((b) => ({ ...b, copiesAvailable: b.copiesAvailable - 1 }))
    setAlreadyBorrowed(true)
    showToast(`"${book.title}" borrowed successfully.`)
  }

  if (loading) {
    return <div className="skeleton h-96 rounded-card" />
  }

  if (!book) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-soft dark:text-paper-off/60">Book not found.</p>
        <button onClick={() => navigate('/discover')} className="text-brand-500 dark:text-brand-300 mt-2 hover:underline">
          Back to Discover
        </button>
      </div>
    )
  }

  const favorite = isFavorite(book.id)
  const reviews = reviewsByBook[book.id] || []

  return (
    <div className="space-y-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-ink-soft dark:text-paper-off/60 hover:text-ink dark:hover:text-paper-off">
        <ChevronLeft size={15} /> Back
      </button>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <img src={book.cover} alt={`Cover of ${book.title}`} className="w-full max-w-[240px] rounded-card border border-line dark:border-brand-700 object-cover aspect-[3/4]" />

        <div className="space-y-4">
          <div>
            <Badge tone="brand">{book.category}</Badge>
            <h1 className="font-serif text-3xl font-semibold text-ink dark:text-paper-off mt-2">{book.title}</h1>
            <p className="text-ink-soft dark:text-paper-off/60 mt-1">{book.author}</p>
            <div className="flex items-center gap-1.5 mt-2 text-sm text-ink-soft dark:text-paper-off/60">
              <Star size={14} className="fill-gold-500 text-gold-500" /> {book.rating} rating
            </div>
          </div>

          <p className="text-sm text-ink-soft dark:text-paper-off/70 max-w-xl leading-relaxed">{book.description}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={handleBorrow} disabled={book.copiesAvailable <= 0 || alreadyBorrowed}>
              {alreadyBorrowed ? 'Already borrowed' : book.copiesAvailable > 0 ? 'Borrow book' : 'Unavailable'}
            </Button>
            <Link to={`/reader/${book.id}`}>
              <Button variant="secondary" icon={BookOpen}>Read online</Button>
            </Link>
            <Button variant="secondary" icon={Heart} onClick={() => toggleFavorite(book.id)} className={favorite ? 'text-rose-500 border-rose-200' : ''}>
              {favorite ? 'Favorited' : 'Add to favorites'}
            </Button>
            <Button
              variant="ghost"
              icon={Share2}
              onClick={() => showToast('Link copied to clipboard.')}
            >
              Share
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-line dark:border-brand-700 text-sm">
            <Info label="Available copies" value={`${book.copiesAvailable} of ${book.copiesTotal}`} />
            <Info label="Location" value={book.location} />
            <Info label="Format" value={book.format} />
            <Info label="Publisher" value={book.publisher} />
            <Info label="Published" value={book.year} />
            <Info label="ISBN" value={book.isbn} />
            <Info label="Pages" value={book.pages} />
            <Info label="Language" value={book.language} />
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-semibold text-ink dark:text-paper-off mb-3">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-ink-soft dark:text-paper-off/60">No reviews yet for this book.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-card border border-line dark:border-brand-700 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink dark:text-paper-off">{r.user}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-soft dark:text-paper-off/60">
                    <Star size={12} className="fill-gold-500 text-gold-500" /> {r.rating}
                  </span>
                </div>
                <p className="text-sm text-ink-soft dark:text-paper-off/70">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-semibold text-ink dark:text-paper-off mb-3">Related books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-ink-soft dark:text-paper-off/50 text-xs">{label}</p>
      <p className="text-ink dark:text-paper-off font-medium">{value}</p>
    </div>
  )
}
