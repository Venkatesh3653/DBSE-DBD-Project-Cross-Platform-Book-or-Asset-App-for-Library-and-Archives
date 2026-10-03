import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookMarked } from 'lucide-react'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Signup() {
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'Student' })
  const [error, setError] = useState('')

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    signup(form)
    showToast('Account created. Welcome to Stackwell.')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-off dark:bg-brand-900 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-9 w-9 rounded-lg bg-brand-500 flex items-center justify-center">
            <BookMarked size={18} className="text-white" />
          </div>
          <span className="font-serif font-semibold text-xl text-ink dark:text-paper-off">Stackwell</span>
        </div>

        <div className="bg-paper dark:bg-brand-800 border border-line dark:border-brand-700 rounded-card p-6 shadow-subtle">
          <h1 className="font-serif text-2xl font-semibold text-ink dark:text-paper-off">Create your account</h1>
          <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-1 mb-6">Join your library's digital catalogue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full name" id="name" value={form.name} onChange={(v) => update('name', v)} placeholder="Jordan Rivera" />
            <Field label="Email" id="email" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="you@library.com" />

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">
                Role
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off focus:border-brand-400"
              >
                <option>Student</option>
                <option>Faculty</option>
                <option>Librarian</option>
              </select>
            </div>

            <Field label="Password" id="password" type="password" value={form.password} onChange={(v) => update('password', v)} placeholder="••••••••" />
            <Field label="Confirm password" id="confirm" type="password" value={form.confirm} onChange={(v) => update('confirm', v)} placeholder="••••••••" />

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <Button type="submit" className="w-full" size="lg">
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-ink-soft dark:text-paper-off/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 dark:text-brand-300 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/50 focus:border-brand-400"
      />
    </div>
  )
}
