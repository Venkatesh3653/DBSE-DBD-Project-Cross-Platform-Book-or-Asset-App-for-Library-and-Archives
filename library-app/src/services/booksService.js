// Service layer for books.
// Every function here currently reads/writes an in-memory + localStorage-backed
// copy of the mock data. When a real backend is ready, swap the body of each
// function for a fetch() call to the matching REST endpoint (shown in comments)
// and leave every calling component untouched.

import { books as seedBooks } from '../data/books'
import { loadState, saveState } from '../utils/storage'

const STORE_KEY = 'stackwell.books'

function readAll() {
  return loadState(STORE_KEY, seedBooks)
}

function writeAll(list) {
  saveState(STORE_KEY, list)
}

// GET /api/books
export async function getBooks() {
  return readAll()
}

// GET /api/books/:id
export async function getBookById(id) {
  return readAll().find((b) => b.id === id) || null
}

// POST /api/books
export async function addBook(book) {
  const list = readAll()
  const newBook = {
    ...book,
    id: `b${Date.now()}`,
    copiesAvailable: Number(book.copiesTotal) || 1,
    rating: 0,
  }
  const updated = [newBook, ...list]
  writeAll(updated)
  return newBook
}

// PUT /api/books/:id
export async function updateBook(id, changes) {
  const list = readAll()
  const updated = list.map((b) => (b.id === id ? { ...b, ...changes } : b))
  writeAll(updated)
  return updated.find((b) => b.id === id)
}

// DELETE /api/books/:id
export async function deleteBook(id) {
  const list = readAll()
  writeAll(list.filter((b) => b.id !== id))
  return { success: true }
}

// Adjust available copies when a book is borrowed or returned.
export async function adjustAvailability(id, delta) {
  const list = readAll()
  const updated = list.map((b) =>
    b.id === id
      ? { ...b, copiesAvailable: Math.max(0, Math.min(b.copiesTotal, b.copiesAvailable + delta)) }
      : b
  )
  writeAll(updated)
  return updated.find((b) => b.id === id)
}
