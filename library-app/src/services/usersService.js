import { users as seedUsers } from '../data/users'
import { loadState, saveState } from '../utils/storage'

const STORE_KEY = 'stackwell.users'

function readAll() {
  return loadState(STORE_KEY, seedUsers)
}
function writeAll(list) {
  saveState(STORE_KEY, list)
}

// GET /api/users
export async function getUsers() {
  return readAll()
}

// GET /api/users/:id
export async function getUserById(id) {
  return readAll().find((u) => u.id === id) || null
}

// PUT /api/users/:id
export async function updateUser(id, changes) {
  const list = readAll()
  const updated = list.map((u) => (u.id === id ? { ...u, ...changes } : u))
  writeAll(updated)
  return updated.find((u) => u.id === id)
}

// POST /api/users
export async function addUser(user) {
  const list = readAll()
  const newUser = { ...user, id: `u${Date.now()}`, booksBorrowed: 0, status: 'Active', joined: new Date().toISOString().slice(0, 10) }
  writeAll([newUser, ...list])
  return newUser
}
