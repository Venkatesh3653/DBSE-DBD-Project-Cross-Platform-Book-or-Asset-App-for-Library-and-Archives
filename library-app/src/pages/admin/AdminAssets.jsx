import { useEffect, useState } from 'react'
import { FileText, FileSpreadsheet, FileImage, FileVideo, Presentation, Trash2, Plus } from 'lucide-react'
import DataTable from '../../components/DataTable'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { getAssets, addAsset, deleteAsset } from '../../services/assetsService'
import { useToast } from '../../context/ToastContext'

const typeIcon = { pdf: FileText, pptx: Presentation, docx: FileText, xlsx: FileSpreadsheet, image: FileImage, video: FileVideo }

export default function AdminAssets() {
  const { showToast } = useToast()
  const [assets, setAssets] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'pdf', size: '1.0 MB', owner: 'Admin' })
  const [deleteTarget, setDeleteTarget] = useState(null)

  function refresh() {
    getAssets().then(setAssets)
  }
  useEffect(refresh, [])

  async function handleAdd(e) {
    e.preventDefault()
    await addAsset({ ...form, tags: [] })
    showToast('Digital asset added.')
    setModalOpen(false)
    setForm({ name: '', type: 'pdf', size: '1.0 MB', owner: 'Admin' })
    refresh()
  }

  async function confirmDelete() {
    await deleteAsset(deleteTarget.id)
    showToast('Asset deleted.')
    setDeleteTarget(null)
    refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Digital assets</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Manage uploaded files across the library.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>Add asset</Button>
      </div>

      <DataTable
        columns={[
          {
            key: 'name', header: 'File',
            render: (a) => {
              const Icon = typeIcon[a.type] || FileText
              return (
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-brand-500 dark:text-brand-300" />
                  <span className="font-medium text-ink dark:text-paper-off">{a.name}</span>
                </div>
              )
            },
          },
          { key: 'owner', header: 'Owner' },
          { key: 'size', header: 'Size' },
          { key: 'uploaded', header: 'Uploaded' },
          {
            key: 'actions', header: 'Actions',
            render: (a) => (
              <button onClick={() => setDeleteTarget(a)} aria-label="Delete asset" className="p-1.5 rounded-md hover:bg-paper-off dark:hover:bg-brand-700 text-rose-600">
                <Trash2 size={15} />
              </button>
            ),
          },
        ]}
        rows={assets}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add digital asset">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">File name</label>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off">
                {Object.keys(typeIcon).map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Size</label>
              <input value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off" />
            </div>
          </div>
          <Button type="submit" className="w-full">Add asset</Button>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete asset" size="sm">
        <p className="text-sm text-ink-soft dark:text-paper-off/70">Delete "{deleteTarget?.name}"?</p>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
