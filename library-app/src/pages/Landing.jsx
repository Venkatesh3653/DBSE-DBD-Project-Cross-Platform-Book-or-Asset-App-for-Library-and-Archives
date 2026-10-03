import { Link } from 'react-router-dom'
import { BookMarked, Library, FileStack, Archive, Compass, Globe2, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Library,
    title: 'Unified library management',
    text: 'Track physical books, holds, and returns from one dashboard instead of juggling separate registers.',
  },
  {
    icon: FileStack,
    title: 'Digital asset management',
    text: 'Store notes, research papers, and presentations alongside the books they relate to.',
  },
  {
    icon: Compass,
    title: 'Smart discovery',
    text: 'Search by title, author, ISBN, or topic, and filter results down to exactly what you need.',
  },
  {
    icon: Archive,
    title: 'Archive management',
    text: 'Give historical documents, manuscripts, and photographs a proper home with searchable records.',
  },
  {
    icon: Globe2,
    title: 'Cross-platform access',
    text: 'The same catalogue works on a library desk, a tablet at the reading room, or a phone on the way in.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper dark:bg-brand-900 text-ink dark:text-paper-off">
      <header className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <BookMarked size={16} className="text-white" />
          </div>
          <span className="font-serif font-semibold text-lg">Stackwell</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-ink-soft dark:text-paper-off/70 hover:text-ink dark:hover:text-paper-off">
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600"
          >
            Get started
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-brand-500 dark:text-brand-300 mb-4">
            Cross-Platform Book & Asset Management
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight font-semibold">
            Your library. Smarter. Simpler. Connected.
          </h1>
          <p className="mt-5 text-ink-soft dark:text-paper-off/70 text-lg max-w-md">
            Discover books, manage digital assets, and explore archives from one modern platform built for
            libraries and archives.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-brand-600"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-line dark:border-brand-600 px-5 py-3 rounded-lg font-medium hover:bg-paper-off dark:hover:bg-brand-800"
            >
              Explore library
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-card border border-line dark:border-brand-700 bg-paper-off dark:bg-brand-800 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Good morning, Aditi</span>
              <span className="text-xs text-ink-soft dark:text-paper-off/50">Sep 12</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ['Borrowed', '4'],
                ['Due soon', '2'],
                ['Saved', '12'],
                ['Digital assets', '8'],
              ].map(([label, val]) => (
                <div key={label} className="rounded-lg border border-line dark:border-brand-700 bg-paper dark:bg-brand-900 p-3">
                  <p className="text-xs text-ink-soft dark:text-paper-off/50">{label}</p>
                  <p className="text-xl font-semibold mt-1">{val}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-line dark:border-brand-700 bg-paper dark:bg-brand-900 p-3">
              <p className="text-xs text-ink-soft dark:text-paper-off/50 mb-2">Continue reading</p>
              <p className="text-sm font-medium">Atomic Habits</p>
              <div className="h-1.5 rounded-full bg-line dark:bg-brand-700 mt-2 overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-card border border-line dark:border-brand-700 p-5">
              <div className="h-9 w-9 rounded-lg bg-brand-50 dark:bg-brand-500/15 flex items-center justify-center mb-3">
                <Icon size={17} className="text-brand-500 dark:text-brand-300" />
              </div>
              <h3 className="font-medium mb-1.5">{title}</h3>
              <p className="text-sm text-ink-soft dark:text-paper-off/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line dark:border-brand-700 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-soft dark:text-paper-off/50">
          <span>© 2026 Stackwell. A college project prototype.</span>
          <span>Built for libraries and archives.</span>
        </div>
      </footer>
    </div>
  )
}
