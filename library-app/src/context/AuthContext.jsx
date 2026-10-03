import { createContext, useContext, useEffect, useState } from 'react'
import { users } from '../data/users'
import { loadState, saveState } from '../utils/storage'

const AuthContext = createContext(null)
const STORE_KEY = 'stackwell.session'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadState(STORE_KEY, null))

  useEffect(() => {
    saveState(STORE_KEY, currentUser)
  }, [currentUser])

  // Simulated login. Any password is accepted for the prototype; the two
  // demo accounts map to the seeded student and admin records.
  function login(email) {
    const match =
      users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
      (email.toLowerCase().includes('admin')
        ? users.find((u) => u.role === 'Admin')
        : users.find((u) => u.id === 'u1'))
    setCurrentUser(match)
    return match
  }

  function signup({ name, email, role }) {
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      role: role || 'Student',
      booksBorrowed: 0,
      status: 'Active',
      joined: new Date().toISOString().slice(0, 10),
    }
    setCurrentUser(newUser)
    return newUser
  }

  function logout() {
    setCurrentUser(null)
  }

  const isAdmin = currentUser?.role === 'Admin'

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
