import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { loadState, saveState } from '../utils/storage'
import { useAuth } from './AuthContext'

const LibraryContext = createContext(null)
const FAVORITES_KEY = 'stackwell.favorites'

export function LibraryProvider({ children }) {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState(() => loadState(FAVORITES_KEY, []))

  useEffect(() => {
    saveState(FAVORITES_KEY, favorites)
  }, [favorites])

  const toggleFavorite = useCallback((bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    )
  }, [])

  const isFavorite = useCallback((bookId) => favorites.includes(bookId), [favorites])

  return (
    <LibraryContext.Provider value={{ favorites, toggleFavorite, isFavorite, currentUserId: currentUser?.id }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  return useContext(LibraryContext)
}
