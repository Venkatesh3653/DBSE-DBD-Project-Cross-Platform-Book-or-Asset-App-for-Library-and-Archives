import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Archive as ArchiveIcon, FileText } from 'lucide-react'
import Button from '../components/Button'
import { getArchiveById } from '../services/assetsService'
import { useToast } from '../context/ToastContext'

const sampleItems = ['Founding Charter, 1962', 'Board Meeting Minutes, Vol. 4', 'Campus Blueprint, East Wing', 'Correspondence — Dean\u2019s Office', 'Annual Convocation Program']

export default function ArchiveDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [archive, setArchive] = useState(null)

  useEffect(() => {
    getArchiveById(id).then(setArchive)
  }, [id])

  if (!archive) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-soft dark:text-paper-off/60">Collection not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/archives')} className="flex items-center gap-1 text-sm text-ink-soft dark:text-paper-off/60 hover:text-ink dark:hover:text-paper-off">
        <ChevronLeft size={15} /> Back to Archives
      </button>

      <div className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-6 flex gap-5">
        <div className="h-20 w-20 rounded-lg bg-gold-400/15 flex items-center justify-center shrink-0">
          <ArchiveIcon size={32} className="text-gold-500" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink dark:text-paper-off">{archive.title}</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1 max-w-xl">{archive.description}</p>
          <div className="flex gap-4 mt-3 text-sm text-ink-soft dark:text-paper-off/60">
            <span>{archive.items.toLocaleString()} items</span>
            <span>{archive.range}</span>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-semibold text-ink dark:text-paper-off mb-3">Featured items</h2>
        <div className="border border-line dark:border-brand-700 rounded-card divide-y divide-line dark:divide-brand-700 overflow-hidden">
          {sampleItems.map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-3">
              <FileText size={16} className="text-brand-500 dark:text-brand-300 shrink-0" />
              <span className="text-sm text-ink dark:text-paper-off flex-1">{item}</span>
              <Button size="sm" variant="ghost" onClick={() => showToast('Opening archival record…')}>
                View
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
