import { useState } from 'react'
import { Download } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import Button from '../../components/Button'
import { useToast } from '../../context/ToastContext'

const monthlyBorrowing = [
  { month: 'Apr', borrows: 62 },
  { month: 'May', borrows: 74 },
  { month: 'Jun', borrows: 58 },
  { month: 'Jul', borrows: 81 },
  { month: 'Aug', borrows: 96 },
  { month: 'Sep', borrows: 70 },
]

const mostBorrowed = [
  { title: 'Atomic Habits', count: 34 },
  { title: 'Dune', count: 29 },
  { title: 'Clean Code', count: 25 },
  { title: 'Sapiens', count: 22 },
  { title: 'Zero to One', count: 18 },
]

const categoryShare = [
  { name: 'Computer Science', value: 32 },
  { name: 'Fiction', value: 22 },
  { name: 'Psychology', value: 18 },
  { name: 'Business', value: 14 },
  { name: 'Science', value: 9 },
  { name: 'History', value: 5 },
]

const activeUsersTrend = [
  { month: 'Apr', users: 210 },
  { month: 'May', users: 236 },
  { month: 'Jun', users: 221 },
  { month: 'Jul', users: 258 },
  { month: 'Aug', users: 289 },
  { month: 'Sep', users: 274 },
]

const COLORS = ['#2B4570', '#5A79B3', '#A9843A', '#C99A46', '#8CA2CF', '#4A5551']

export default function AdminReports() {
  const { showToast } = useToast()
  const [range, setRange] = useState('Last 6 months')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Reports & analytics</h1>
          <p className="text-ink-soft dark:text-paper-off/60 mt-1">Circulation and usage trends across the library.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-lg border border-line dark:border-brand-600 bg-paper dark:bg-brand-800 px-3 py-2 text-sm text-ink dark:text-paper-off">
            {['Last 7 days', 'Last 30 days', 'Last 6 months', 'This year'].map((r) => <option key={r}>{r}</option>)}
          </select>
          <Button icon={Download} variant="secondary" onClick={() => showToast('Report downloaded.')}>Download report</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <ChartCard title="Monthly borrowing">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyBorrowing}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="borrows" fill="#2B4570" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active users">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={activeUsersTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#A9843A" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Most borrowed books">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mostBorrowed} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DC" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="title" type="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#5A79B3" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Popular categories">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {categoryShare.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-card border border-line dark:border-brand-700 bg-paper dark:bg-brand-800 p-5">
      <h3 className="font-medium text-ink dark:text-paper-off mb-2">{title}</h3>
      {children}
    </div>
  )
}
