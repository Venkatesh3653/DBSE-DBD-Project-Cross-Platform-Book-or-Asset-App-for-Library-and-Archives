import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookMarked, Eye, EyeOff } from 'lucide-react'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    const user = login(email)
    showToast(`Welcome back, ${user.name.split(' ')[0]}.`)
    navigate(user.role === 'Admin' ? '/admin' : '/dashboard')
  }

  function quickLogin(demoEmail) {
    setEmail(demoEmail)
    setPassword('demo1234')
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
          <h1 className="font-serif text-2xl font-semibold text-ink dark:text-paper-off">Welcome back</h1>
          <p className="text-sm text-ink-soft dark:text-paper-off/60 mt-1 mb-6">Log in to continue to your library.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@library.com"
                className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/50 focus:border-brand-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink dark:text-paper-off mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-line dark:border-brand-600 bg-transparent px-3 py-2.5 pr-10 text-sm text-ink dark:text-paper-off placeholder:text-ink-soft/50 focus:border-brand-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft dark:text-paper-off/50"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft dark:text-paper-off/60">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-line"
                />
                Remember me
              </label>
              <button type="button" className="text-brand-500 dark:text-brand-300 font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Log in
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-line dark:bg-brand-700 flex-1" />
            <span className="text-xs text-ink-soft dark:text-paper-off/50">or</span>
            <div className="h-px bg-line dark:bg-brand-700 flex-1" />
          </div>

          <Button variant="secondary" className="w-full" size="lg">
            Continue with Google
          </Button>

          <p className="text-center text-sm text-ink-soft dark:text-paper-off/60 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-500 dark:text-brand-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-5 bg-paper dark:bg-brand-800 border border-line dark:border-brand-700 rounded-card p-4 text-sm">
          <p className="text-ink-soft dark:text-paper-off/60 mb-2">Demo accounts — any password works</p>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => quickLogin('user@library.com')} className="text-left text-brand-500 dark:text-brand-300 hover:underline">
              user@library.com <span className="text-ink-soft dark:text-paper-off/50">— student view</span>
            </button>
            <button onClick={() => quickLogin('admin@library.com')} className="text-left text-brand-500 dark:text-brand-300 hover:underline">
              admin@library.com <span className="text-ink-soft dark:text-paper-off/50">— admin view</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
