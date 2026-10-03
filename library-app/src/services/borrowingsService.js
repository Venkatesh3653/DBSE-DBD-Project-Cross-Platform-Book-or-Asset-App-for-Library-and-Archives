import { borrowingsSeed } from '../data/borrowings'
import { loadState, saveState } from '../utils/storage'
import { adjustAvailability } from './booksService'

const STORE_KEY = 'stackwell.borrowings'
const LOAN_DAYS = 21
const RENEW_DAYS = 14

function readAll() {
  return loadState(STORE_KEY, borrowingsSeed)
}
function writeAll(list) {
  saveState(STORE_KEY, list)
}

function daysBetween(dateStr) {
  const due = new Date(dateStr)
  const now = new Date('2026-09-12')
  return Math.ceil((due - now) / (1000 * 60 * 60 * 24))
}

// Derives a live status (active / due-soon / overdue / returned) from dueDate.
export function deriveStatus(record) {
  if (record.status === 'returned') return 'returned'
  const remaining = daysBetween(record.dueDate)
  if (remaining < 0) return 'overdue'
  if (remaining <= 3) return 'due-soon'
  return 'active'
}

export function daysRemaining(record) {
  return daysBetween(record.dueDate)
}

// GET /api/borrowings
export async function getBorrowings() {
  return readAll()
}

// GET /api/borrowings?userId=
export async function getBorrowingsByUser(userId) {
  return readAll().filter((r) => r.userId === userId)
}

// POST /api/borrowings  { bookId, userId }
export async function borrowBook(bookId, userId) {
  const list = readAll()
  const borrowedDate = new Date('2026-09-12')
  const dueDate = new Date(borrowedDate)
  dueDate.setDate(dueDate.getDate() + LOAN_DAYS)

  const record = {
    id: `br${Date.now()}`,
    userId,
    bookId,
    borrowedDate: borrowedDate.toISOString().slice(0, 10),
    dueDate: dueDate.toISOString().slice(0, 10),
    status: 'active',
  }
  writeAll([record, ...list])
  await adjustAvailability(bookId, -1)
  return record
}

// PUT /api/borrowings/:id/return
export async function returnBook(id) {
  const list = readAll()
  const record = list.find((r) => r.id === id)
  const updated = list.map((r) => (r.id === id ? { ...r, status: 'returned' } : r))
  writeAll(updated)
  if (record) await adjustAvailability(record.bookId, 1)
  return updated.find((r) => r.id === id)
}

// PUT /api/borrowings/:id/renew
export async function renewBook(id) {
  const list = readAll()
  const updated = list.map((r) => {
    if (r.id !== id) return r
    const newDue = new Date(r.dueDate)
    newDue.setDate(newDue.getDate() + RENEW_DAYS)
    return { ...r, dueDate: newDue.toISOString().slice(0, 10), status: 'active' }
  })
  writeAll(updated)
  return updated.find((r) => r.id === id)
}
