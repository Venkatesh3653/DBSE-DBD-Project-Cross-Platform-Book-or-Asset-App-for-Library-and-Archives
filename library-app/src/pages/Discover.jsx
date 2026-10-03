import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ScanLine } from 'lucide-react'
import BookCard from '../components/BookCard'
import LoadingGrid from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'
import Pagination from '../components/Pagination'
import ScanBookModal from '../components/ScanBookModal'
import Button from '../components/Button'
import { getBooks } from '../services/booksService'
import { categories } from '../data/books'

const PAGE_SIZE = 8

export default function Discover() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [sort, setSort] = useState('relevance')
  const [page, setPage] = useState(1)
  const [scanOpen, setScanOpen] = useState(false)

  useEffect(() => {
    getBooks().then((b) => {
      setBooks(b)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let list = [...books]
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.isbn.includes(q) ||
          b.category.toLowerCase().includes(q)
      )
    }
    if (category !== 'All') list = list.filter((b) => b.category === category)
    if (availability === 'Available') list = list.filter((b) => b.copiesAvailable > 0)
    if (availability === 'Unavailable') list = list.filter((b) => b.copiesAvailable === 0)

    if (sort === 'newest') list.sort((a, b) => b.year - a.year)
    else if (sort === 'popular') list.sort((a, b) => b.copiesTotal - b.copiesTotal + (b.rating - a.rating))
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)

    return list
  }, [books, query, category, availability, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => setPage(1), [query, category, availability, sort])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Find your next book</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Search the full catalogue by title, author, ISBN, or topic.</p>
        </div>
        <Button variant="secondary" icon={ScanLine} onClick={() => setScanOpen(true)}>Scan book</Button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft dark:text-paper-off/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors, ISBN, topics…"
          className="w-full rounded-card border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 pl-11 pr-4 py-3.5 text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/50 focus:border-brand-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect label="Category" value={category} onChange={setCategory} options={['All', ...categories]} />
        <FilterSelect label="Availability" value={availability} onChange={setAvailability} options={['All', 'Available', 'Unavailable']} />
        <div className="flex items-center gap-2 ml-auto">
          <SlidersHorizontal size={14} className="text-ink-soft dark:text-paper-off/50" />
          <FilterSelect
            label="Sort"
            value={sort}
            onChange={setSort}
            options={['relevance', 'newest', 'popular', 'rating']}
            display={{ relevance: 'Relevance', newest: 'Newest', popular: 'Most popular', rating: 'Highest rated' }}
          />
        </div>
      </div>

      <p className="text-sm text-ink-soft dark:text-paper-off/60">{filtered.length} results</p>

      {loading ? (
        <LoadingGrid count={8} />
      ) : pageItems.length === 0 ? (
        <EmptyState icon={Search} title="No books found" message="Try a different search term or clear your filters." />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {books[0] && (
        <ScanBookModal open={scanOpen} onClose={() => setScanOpen(false)} resultBook={books[0]} />
      )}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, display }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-ink-soft dark:text-paper-off/60 hidden sm:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 px-2.5 py-1.5 text-ink dark:text-paper-off"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {display?.[opt] || opt}
          </option>
        ))}
      </select>
    </label>
  )
}
