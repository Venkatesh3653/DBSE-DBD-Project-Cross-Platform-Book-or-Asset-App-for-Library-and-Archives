import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  function dismiss(id) {
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[min(360px,90vw)]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast-in flex items-start gap-3 rounded-card border border-line bg-paper dark:bg-brand-800 dark:border-brand-600 shadow-subtle px-4 py-3"
          >
            {toast.type === 'error' ? (
              <Info size={18} className="mt-0.5 text-gold-500 shrink-0" />
            ) : (
              <CheckCircle2 size={18} className="mt-0.5 text-brand-500 dark:text-brand-300 shrink-0" />
            )}
            <p className="text-sm text-ink dark:text-paper-off flex-1">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-ink-soft dark:text-paper-off/60 hover:text-ink dark:hover:text-paper-off"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
