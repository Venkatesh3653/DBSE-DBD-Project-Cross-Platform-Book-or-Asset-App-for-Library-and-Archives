import { useEffect, useMemo, useState } from 'react'
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  Presentation,
  Grid3x3,
  List,
  Search,
  Download,
  Heart,
  Share2,
  MoreVertical,
  Upload,
  FileStack,
} from 'lucide-react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'
import { getAssets, addAsset } from '../services/assetsService'
import { useToast } from '../context/ToastContext'

const typeIcon = {
  pdf: FileText,
  pptx: Presentation,
  docx: FileText,
  xlsx: FileSpreadsheet,
  image: FileImage,
  video: FileVideo,
}

export default function Assets() {
  const { showToast } = useToast()
  const [assets, setAssets] = useState([])
  const [view, setView] = useState('grid')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sort, setSort] = useState('newest')
  const [favorites, setFavorites] = useState([])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'pdf', size: '1.0 MB' })

  function refresh() {
    getAssets().then(setAssets)
  }

  useEffect(refresh, [])

  const filtered = useMemo(() => {
    let list = [...assets]
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((a) => a.name.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)))
    if (typeFilter !== 'All') list = list.filter((a) => a.type === typeFilter)
    if (sort === 'newest') list.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded))
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [assets, query, typeFilter, sort])

  function toggleFav(id) {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }

  async function handleUpload(e) {
    e.preventDefault()
    await addAsset({ name: form.name, type: form.type, size: form.size, owner: 'You', tags: [] })
    refresh()
    setUploadOpen(false)
    setForm({ name: '', type: 'pdf', size: '1.0 MB' })
    showToast('File uploaded successfully.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Digital assets</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Notes, papers, presentations, and reports in one place.</p>
        </div>
        <Button icon={Upload} onClick={() => setUploadOpen(true)}>Upload file</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft dark:text-paper-off/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files and tags…"
            className="w-full rounded-lg border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 pl-9 pr-3 py-2 text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/50"
          />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-lg border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 px-2.5 py-2 text-sm text-ink dark:text-paper-off">
          {['All', 'pdf', 'docx', 'pptx', 'xlsx', 'image', 'video'].map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All types' : t.toUpperCase()}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 px-2.5 py-2 text-sm text-ink dark:text-paper-off">
          <option value="newest">Newest</option>
          <option value="name">Name</option>
        </select>
        <div className="flex border border-line dark:border-brand-600 rounded-lg overflow-hidden">
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300' : 'text-ink-soft dark:text-paper-off/60'}`} aria-label="Grid view">
            <Grid3x3 size={16} />
          </button>
          <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300' : 'text-ink-soft dark:text-paper-off/60'}`} aria-label="List view">
            <List size={16} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileStack} title="No digital assets found" message="Try a different search, or upload a new file." />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((a) => {
            const Icon = typeIcon[a.type] || FileText
            const fav = favorites.includes(a.id)
            return (
              <div key={a.id} className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-4 flex flex-col gap-3">
                <div className="h-24 rounded-lg bg-paper-off dark:bg-brand-900 flex items-center justify-center">
                  <Icon size={30} className="text-brand-500 dark:text-brand-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper-off line-clamp-2">{a.name}</p>
                  <p className="text-xs text-ink-soft dark:text-paper-off/50 mt-1">{a.size} · {a.uploaded}</p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <IconBtn label="Download" icon={Download} onClick={() => showToast(`Downloading ${a.name}`)} />
                  <IconBtn label={fav ? 'Unfavorite' : 'Favorite'} icon={Heart} active={fav} onClick={() => toggleFav(a.id)} />
                  <IconBtn label="Share" icon={Share2} onClick={() => showToast('Link copied to clipboard.')} />
                  <IconBtn label="More options" icon={MoreVertical} onClick={() => {}} className="ml-auto" />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="border border-line dark:border-brand-700 rounded-card divide-y divide-line dark:divide-brand-700 overflow-hidden">
          {filtered.map((a) => {
            const Icon = typeIcon[a.type] || FileText
            const fav = favorites.includes(a.id)
            return (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-paper-off/60 dark:hover:bg-brand-700/40">
                <Icon size={18} className="text-brand-500 dark:text-brand-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink dark:text-paper-off truncate">{a.name}</p>
                  <p className="text-xs text-ink-soft dark:text-paper-off/50">{a.owner} · {a.size} · {a.uploaded}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <IconBtn label="Download" icon={Download} onClick={() => showToast(`Downloading ${a.name}`)} />
                  <IconBtn label={fav ? 'Unfavorite' : 'Favorite'} icon={Heart} active={fav} onClick={() => toggleFav(a.id)} />
                  <IconBtn label="Share" icon={Share2} onClick={() => showToast('Link copied to clipboard.')} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload file">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">File name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Thermodynamics Notes.pdf"
              className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off">
                {['pdf', 'docx', 'pptx', 'xlsx', 'image', 'video'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Size</label>
              <input value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off" />
            </div>
          </div>
          <p className="text-xs text-ink-soft dark:text-paper-off/50">This is a prototype — no file actually leaves your device.</p>
          <Button type="submit" className="w-full">Upload</Button>
        </form>
      </Modal>
    </div>
  )
}

function IconBtn({ icon: Icon, label, onClick, active, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-1.5 rounded-md hover:bg-paper-off dark:hover:bg-brand-700 ${active ? 'text-rose-500' : 'text-ink-soft dark:text-paper-off/60'} ${className}`}
    >
      <Icon size={15} className={active ? 'fill-rose-500' : ''} />
    </button>
  )
}
