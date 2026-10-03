import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import LoadingGrid from '../components/LoadingSkeleton'
import { getBooks } from '../services/booksService'
import { categories } from '../data/books'

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    getBooks().then((b) => {
      setBooks(b)
      setLoading(false)
    })
  }, [])

  const shown = activeCategory === 'All' ? books : books.filter((b) => b.category === activeCategory)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Books</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Browse the full physical and digital collection.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === c
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-line dark:border-brand-600 text-ink-soft dark:text-paper-off/70 hover:bg-paper-off dark:hover:bg-brand-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingGrid count={12} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {shown.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </div>
  )
}
