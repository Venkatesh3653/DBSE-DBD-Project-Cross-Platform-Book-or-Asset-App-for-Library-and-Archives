import { useState } from 'react'
import { Moon, Sun, LogOut } from 'lucide-react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState(currentUser?.name || '')
  const [email, setEmail] = useState(currentUser?.email || '')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyDue, setNotifyDue] = useState(true)

  function handleSave(e) {
    e.preventDefault()
    showToast('Settings updated.')
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Settings</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Manage your profile, appearance, and notifications.</p>
      </div>

      <section className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5">
        <div className="flex items-center gap-4 mb-5">
          <Avatar name={currentUser?.name} size={56} />
          <div>
            <p className="font-medium text-ink dark:text-paper-off">{currentUser?.name}</p>
            <p className="text-sm text-ink-soft dark:text-paper-off/60">{currentUser?.role}</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off" />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </section>

      <section className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5">
        <h2 className="font-medium text-ink dark:text-paper-off mb-4">Appearance</h2>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between rounded-lg border border-line dark:border-brand-600 px-4 py-3"
        >
          <span className="flex items-center gap-2 text-sm text-ink dark:text-paper-off">
            {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'light' ? 'Light mode' : 'Dark mode'}
          </span>
          <span className="text-xs text-brand-500 dark:text-brand-300 font-medium">Switch</span>
        </button>
      </section>

      <section className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5 space-y-3">
        <h2 className="font-medium text-ink dark:text-paper-off mb-1">Notifications</h2>
        <Toggle label="Email notifications" checked={notifyEmail} onChange={setNotifyEmail} />
        <Toggle label="Due date reminders" checked={notifyDue} onChange={setNotifyDue} />
      </section>

      <Button variant="danger" icon={LogOut} onClick={handleLogout}>
        Log out
      </Button>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer">
      <span className="text-sm text-ink dark:text-paper-off">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full relative transition-colors ${checked ? 'bg-brand-500' : 'bg-line dark:bg-brand-700'}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </label>
  )
}
