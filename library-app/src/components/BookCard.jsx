import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import Badge from './Badge'

export default function BookCard({ book }) {
  const { isFavorite, toggleFavorite } = useLibrary()
  const favorite = isFavorite(book.id)
  const available = book.copiesAvailable > 0

  return (
    <div className="group rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 overflow-hidden hover:shadow-subtle transition-shadow duration-150 flex flex-col">
      <Link to={`/books/${book.id}`} className="block relative aspect-[3/4] bg-paper-off dark:bg-brand-900 overflow-hidden">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(book.id)
          }}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-paper/90 dark:bg-brand-800/90 backdrop-blur flex items-center justify-center shadow-subtle"
        >
          <Heart size={15} className={favorite ? 'fill-rose-500 text-rose-500' : 'text-ink-soft'} />
        </button>
      </Link>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <Link to={`/books/${book.id}`} className="font-medium text-sm text-ink dark:text-paper-off leading-snug line-clamp-2 hover:underline">
          {book.title}
        </Link>
        <p className="text-xs text-ink-soft dark:text-paper-off/60">{book.author}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="inline-flex items-center gap-1 text-xs text-ink-soft dark:text-paper-off/60">
            <Star size={12} className="fill-gold-500 text-gold-500" /> {book.rating}
          </span>
          <Badge tone={available ? 'success' : 'danger'}>{available ? 'Available' : 'Unavailable'}</Badge>
        </div>
      </div>
    </div>
  )
}
