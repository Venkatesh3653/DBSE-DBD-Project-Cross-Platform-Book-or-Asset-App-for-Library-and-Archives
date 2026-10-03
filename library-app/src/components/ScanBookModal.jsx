import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import Button from './Button'

export default function ScanBookModal({ open, onClose, resultBook }) {
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    if (!open) {
      setScanning(true)
      return
    }
    const t = setTimeout(() => setScanning(false), 2200)
    return () => clearTimeout(t)
  }, [open])

  return (
    <Modal open={open} onClose={onClose} title="Scan book" size="sm">
      {scanning ? (
        <div className="flex flex-col items-center py-6">
          <div className="relative h-48 w-40 rounded-lg border-2 border-dashed border-brand-300 dark:border-brand-500 overflow-hidden bg-paper-off dark:bg-brand-900">
            <div className="absolute left-0 right-0 h-0.5 bg-brand-500 animate-scan-line" />
          </div>
          <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-4 text-center">
            Point your camera at the book QR/barcode.
          </p>
        </div>
      ) : (
        <div className="py-2 text-center space-y-3">
          <img src={resultBook.cover} alt="" className="w-24 mx-auto rounded-md" />
          <p className="font-medium text-ink dark:text-paper-off">{resultBook.title}</p>
          <p className="text-sm text-ink-soft dark:text-paper-off/60">{resultBook.author}</p>
          <Link to={`/books/${resultBook.id}`} onClick={onClose}>
            <Button className="mt-2">View book</Button>
          </Link>
        </div>
      )}
    </Modal>
  )
}
