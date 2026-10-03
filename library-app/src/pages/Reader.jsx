import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Bookmark, List, X } from 'lucide-react'
import { getBookById } from '../services/booksService'

const TOTAL_PAGES = 24

export default function Reader() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [tocOpen, setTocOpen] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    getBookById(id).then(setBook)
  }, [id])

  if (!book) return null

  const progress = Math.round((page / TOTAL_PAGES) * 100)

  return (
    <div className="fixed inset-0 z-40 bg-ink dark:bg-brand-900 flex flex-col text-paper-off">
      <div className="h-14 shrink-0 flex items-center gap-3 px-4 border-b border-white/10">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-md hover:bg-white/10" aria-label="Close reader">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium truncate">{book.title}</span>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setTocOpen((v) => !v)} className="p-2 rounded-md hover:bg-white/10" aria-label="Table of contents">
            <List size={16} />
          </button>
          <button onClick={() => setBookmarked((v) => !v)} className="p-2 rounded-md hover:bg-white/10" aria-label="Bookmark this page">
            <Bookmark size={16} className={bookmarked ? 'fill-gold-400 text-gold-400' : ''} />
          </button>
          <button onClick={() => setZoom((z) => Math.max(60, z - 10))} className="p-2 rounded-md hover:bg-white/10" aria-label="Zoom out">
            <ZoomOut size={16} />
          </button>
          <span className="text-xs w-10 text-center">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(160, z + 10))} className="p-2 rounded-md hover:bg-white/10" aria-label="Zoom in">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => document.documentElement.requestFullscreen?.()} className="p-2 rounded-md hover:bg-white/10" aria-label="Fullscreen">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {tocOpen && (
          <div className="w-56 shrink-0 border-r border-white/10 p-4 overflow-y-auto hidden sm:block">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Contents</p>
              <button onClick={() => setTocOpen(false)} aria-label="Close contents"><X size={14} /></button>
            </div>
            <ul className="space-y-1 text-sm text-paper-off/70">
              {['Introduction', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Conclusion'].map((c, i) => (
                <li key={c}>
                  <button onClick={() => setPage(i * 4 + 1)} className="hover:text-paper-off w-full text-left py-1">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <div
            className="bg-white text-ink shadow-2xl rounded-sm w-full max-w-xl aspect-[3/4] flex flex-col items-center justify-center p-10 text-center transition-transform"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <p className="font-serif text-lg font-semibold mb-3">{book.title}</p>
            <p className="text-sm text-ink-soft leading-relaxed max-w-sm">
              This is a simulated reading page for the prototype. In the connected product, this area renders the
              actual document content for page {page}.
            </p>
            <p className="text-xs text-ink-soft/60 mt-6">Page {page} of {TOTAL_PAGES}</p>
          </div>
        </div>
      </div>

      <div className="h-16 shrink-0 border-t border-white/10 flex items-center gap-4 px-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 rounded-md hover:bg-white/10 disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div className="h-full bg-gold-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="text-xs text-paper-off/70 w-24 text-right">{page} / {TOTAL_PAGES}</span>
        <button
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={page === TOTAL_PAGES}
          className="p-2 rounded-md hover:bg-white/10 disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
