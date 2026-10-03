import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Archive as ArchiveIcon } from 'lucide-react'
import { getArchives } from '../services/assetsService'

export default function Archives() {
  const [archives, setArchives] = useState([])

  useEffect(() => {
    getArchives().then(setArchives)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Archives</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Historical documents, rare books, and institutional records.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {archives.map((a) => (
          <Link
            key={a.id}
            to={`/archives/${a.id}`}
            className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5 hover:shadow-subtle transition-shadow flex gap-4"
          >
            <div className="h-16 w-16 rounded-lg bg-gold-400/15 flex items-center justify-center shrink-0">
              <ArchiveIcon size={26} className="text-gold-500" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-ink dark:text-paper-off">{a.title}</h3>
              <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-1 line-clamp-2">{a.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-ink-soft dark:text-paper-off/50">
                <span>{a.items.toLocaleString()} items</span>
                <span>·</span>
                <span>{a.range}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
