import { useEffect, useState } from 'react'
import { Archive as ArchiveIcon } from 'lucide-react'
import DataTable from '../../components/DataTable'
import { getArchives } from '../../services/assetsService'

export default function AdminArchives() {
  const [archives, setArchives] = useState([])

  useEffect(() => {
    getArchives().then(setArchives)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Archives</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Institutional collections available to members.</p>
      </div>

      <DataTable
        columns={[
          {
            key: 'title', header: 'Collection',
            render: (a) => (
              <div className="flex items-center gap-2">
                <ArchiveIcon size={16} className="text-gold-500" />
                <span className="font-medium text-ink dark:text-paper-off">{a.title}</span>
              </div>
            ),
          },
          { key: 'items', header: 'Items', render: (a) => a.items.toLocaleString() },
          { key: 'range', header: 'Date range' },
          { key: 'description', header: 'Description', render: (a) => <span className="text-ink-soft dark:text-paper-off/60 line-clamp-1 max-w-xs block">{a.description}</span> },
        ]}
        rows={archives}
      />
    </div>
  )
}
