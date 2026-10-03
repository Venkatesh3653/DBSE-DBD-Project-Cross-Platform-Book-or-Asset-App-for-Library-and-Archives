import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { getBooks, addBook, updateBook, deleteBook } from '../../services/booksService'
import { categories } from '../../data/books'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'

const emptyForm = {
  title: '', author: '', isbn: '', category: categories[0], publisher: '', year: '',
  copiesTotal: 1, description: '', cover: '', location: '',
}

export default function AdminBooks() {
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)

  function refresh() {
    getBooks().then(setBooks)
  }

  useEffect(refresh, [])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(book) {
    setEditing(book)
    setForm({ ...book })
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      await updateBook(editing.id, { ...form, year: Number(form.year), copiesTotal: Number(form.copiesTotal) })
      showToast('Book updated.')
    } else {
      await addBook({
        ...form,
        year: Number(form.year),
        copiesTotal: Number(form.copiesTotal),
        cover: form.cover || 'https://covers.openlibrary.org/b/id/240727-L.jpg',
      })
      showToast('Book added to your library.')
    }
    setModalOpen(false)
    refresh()
  }

  async function confirmDelete() {
    await deleteBook(deleteTarget.id)
    showToast('Book deleted.')
    setDeleteTarget(null)
    refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Books</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Manage the catalogue — add, edit, or remove titles.</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add book</Button>
      </div>

      <DataTable
        columns={[
          {
            key: 'title', header: 'Book',
            render: (b) => (
              <div className="flex items-center gap-3">
                <img src={b.cover} alt="" className="w-8 h-11 object-cover rounded" />
                <span className="font-medium text-ink dark:text-paper-off">{b.title}</span>
              </div>
            ),
          },
          { key: 'isbn', header: 'ISBN' },
          { key: 'author', header: 'Author' },
          { key: 'category', header: 'Category' },
          { key: 'copiesTotal', header: 'Copies' },
          { key: 'copiesAvailable', header: 'Available' },
          {
            key: 'status', header: 'Status',
            render: (b) => <Badge tone={b.copiesAvailable > 0 ? 'success' : 'danger'}>{b.copiesAvailable > 0 ? 'Available' : 'Out'}</Badge>,
          },
          { key: 'year', header: 'Added' },
          {
            key: 'actions', header: 'Actions',
            render: (b) => (
              <div className="flex items-center gap-1">
                <IconAction icon={Eye} label="View" onClick={() => navigate(`/books/${b.id}`)} />
                <IconAction icon={Pencil} label="Edit" onClick={() => openEdit(b)} />
                <IconAction icon={Trash2} label="Delete" tone="danger" onClick={() => setDeleteTarget(b)} />
              </div>
            ),
          },
        ]}
        rows={books}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit book' : 'Add book'} size="lg">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <TextField label="Book title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
          <TextField label="Author" value={form.author} onChange={(v) => setForm((f) => ({ ...f, author: v }))} required />
          <TextField label="ISBN" value={form.isbn} onChange={(v) => setForm((f) => ({ ...f, isbn: v }))} required />
          <div>
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <TextField label="Publisher" value={form.publisher} onChange={(v) => setForm((f) => ({ ...f, publisher: v }))} />
          <TextField label="Publication year" type="number" value={form.year} onChange={(v) => setForm((f) => ({ ...f, year: v }))} />
          <TextField label="Number of copies" type="number" value={form.copiesTotal} onChange={(v) => setForm((f) => ({ ...f, copiesTotal: v }))} required />
          <TextField label="Location" value={form.location} onChange={(v) => setForm((f) => ({ ...f, location: v }))} />
          <TextField label="Cover image URL" value={form.cover} onChange={(v) => setForm((f) => ({ ...f, cover: v }))} className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save changes' : 'Add book'}</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete book" size="sm">
        <p className="text-sm text-ink-soft dark:text-paper-off/70">
          Delete "{deleteTarget?.title}"? This can't be undone in the prototype.
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}

function TextField({ label, value, onChange, type = 'text', required, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off"
      />
    </div>
  )
}

function IconAction({ icon: Icon, label, onClick, tone }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-1.5 rounded-md hover:bg-paper-off dark:hover:bg-brand-700 ${tone === 'danger' ? 'text-rose-600' : 'text-ink-soft dark:text-paper-off/60'}`}
    >
      <Icon size={15} />
    </button>
  )
}
