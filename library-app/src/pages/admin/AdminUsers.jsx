import { useEffect, useMemo, useState } from 'react'
import Avatar from '../../components/Avatar'
import Badge from '../../components/Badge'
import DataTable from '../../components/DataTable'
import Button from '../../components/Button'
import { getUsers, updateUser } from '../../services/usersService'
import { useToast } from '../../context/ToastContext'

const roles = ['All', 'Student', 'Faculty', 'Librarian', 'Admin']

export default function AdminUsers() {
  const { showToast } = useToast()
  const [users, setUsers] = useState([])
  const [roleFilter, setRoleFilter] = useState('All')

  function refresh() {
    getUsers().then(setUsers)
  }

  useEffect(refresh, [])

  const filtered = useMemo(
    () => (roleFilter === 'All' ? users : users.filter((u) => u.role === roleFilter)),
    [users, roleFilter]
  )

  async function toggleStatus(user) {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active'
    await updateUser(user.id, { status: newStatus })
    showToast(`${user.name} is now ${newStatus.toLowerCase()}.`)
    refresh()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink dark:text-paper-off">Users</h1>
        <p className="text-ink-soft dark:text-paper-off/60 mt-1">Manage member accounts and access.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              roleFilter === r
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-line dark:border-brand-600 text-ink-soft dark:text-paper-off/70 hover:bg-paper-off dark:hover:bg-brand-800'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <DataTable
        columns={[
          {
            key: 'name', header: 'Name',
            render: (u) => (
              <div className="flex items-center gap-3">
                <Avatar name={u.name} size={30} />
                <span className="font-medium text-ink dark:text-paper-off">{u.name}</span>
              </div>
            ),
          },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
          { key: 'booksBorrowed', header: 'Books borrowed' },
          {
            key: 'status', header: 'Status',
            render: (u) => <Badge tone={u.status === 'Active' ? 'success' : 'danger'}>{u.status}</Badge>,
          },
          { key: 'joined', header: 'Joined' },
          {
            key: 'actions', header: 'Actions',
            render: (u) => (
              <Button size="sm" variant={u.status === 'Active' ? 'danger' : 'secondary'} onClick={() => toggleStatus(u)}>
                {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </Button>
            ),
          },
        ]}
        rows={filtered}
      />
    </div>
  )
}
