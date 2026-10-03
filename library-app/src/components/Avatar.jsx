const palette = ['bg-brand-500', 'bg-gold-500', 'bg-emerald-600', 'bg-rose-500', 'bg-indigo-500']

function colorFor(name = '') {
  const idx = name.charCodeAt(0) % palette.length
  return palette[idx] || palette[0]
}

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, size = 36, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-medium shrink-0 ${colorFor(name)} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
