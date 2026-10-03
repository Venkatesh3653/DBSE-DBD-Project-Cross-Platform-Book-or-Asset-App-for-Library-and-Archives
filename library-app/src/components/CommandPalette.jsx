import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BookOpen, FileText, Archive as ArchiveIcon, Users } from 'lucide-react'
import { books } from '../data/books'
import { digitalAssets, archives } from '../data/assets'
import { users } from '../data/users'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return {
      books: books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)).slice(0, 4),
      assets: digitalAssets.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 3),
      archives: archives.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 3),
      users: users.filter((u) => u.name.toLowerCase().includes(q)).slice(0, 3),
    }
  }, [query])

  if (!open) return null

  function go(path) {
    navigate(path)
    onClose()
  }

  const hasResults =
    results && (results.books.length || results.assets.length || results.archives.length || results.users.length)

  return (
    <div
      className="fixed inset-0 z-[70] bg-ink/40 dark:bg-black/60 flex items-start justify-center pt-24 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="animate-fade-in w-full max-w-xl bg-paper dark:bg-brand-800 rounded-card border border-line dark:border-brand-600 shadow-subtle overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line dark:border-brand-700">
          <Search size={18} className="text-ink-soft dark:text-paper-off/50" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, authors, assets, archives, users…"
            className="flex-1 bg-transparent outline-none text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/60"
          />
          <kbd className="text-xs text-ink-soft dark:text-paper-off/50 border border-line dark:border-brand-600 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {!query && (
            <p className="px-4 py-6 text-sm text-ink-soft dark:text-paper-off/50 text-center">
              Start typing to search across the library.
            </p>
          )}

          {query && !hasResults && (
            <p className="px-4 py-6 text-sm text-ink-soft dark:text-paper-off/50 text-center">
              No results for "{query}".
            </p>
          )}

          {results?.books.length > 0 && (
            <ResultGroup label="Books" icon={BookOpen}>
              {results.books.map((b) => (
                <ResultItem key={b.id} title={b.title} subtitle={b.author} onClick={() => go(`/books/${b.id}`)} />
              ))}
            </ResultGroup>
          )}

          {results?.assets.length > 0 && (
            <ResultGroup label="Digital assets" icon={FileText}>
              {results.assets.map((a) => (
                <ResultItem key={a.id} title={a.name} subtitle={a.owner} onClick={() => go('/assets')} />
              ))}
            </ResultGroup>
          )}

          {results?.archives.length > 0 && (
            <ResultGroup label="Archives" icon={ArchiveIcon}>
              {results.archives.map((a) => (
                <ResultItem key={a.id} title={a.title} subtitle={`${a.items} items`} onClick={() => go(`/archives/${a.id}`)} />
              ))}
            </ResultGroup>
          )}

          {results?.users.length > 0 && (
            <ResultGroup label="Users" icon={Users}>
              {results.users.map((u) => (
                <ResultItem key={u.id} title={u.name} subtitle={u.role} onClick={() => go('/admin/users')} />
              ))}
            </ResultGroup>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultGroup({ label, icon: Icon, children }) {
  return (
    <div className="px-2 py-1">
      <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-ink-soft dark:text-paper-off/50">
        <Icon size={12} /> {label}
      </div>
      {children}
    </div>
  )
}

function ResultItem({ title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-2 rounded-lg hover:bg-paper-off dark:hover:bg-brand-700 flex items-center justify-between"
    >
      <span className="text-sm text-ink dark:text-paper-off">{title}</span>
      <span className="text-xs text-ink-soft dark:text-paper-off/50">{subtitle}</span>
    </button>
  )
}
