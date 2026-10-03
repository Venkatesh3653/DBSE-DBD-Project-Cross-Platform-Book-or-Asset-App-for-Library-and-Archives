import { Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import MyLibrary from './pages/MyLibrary'
import Borrowed from './pages/Borrowed'
import Assets from './pages/Assets'
import Archives from './pages/Archives'
import ArchiveDetails from './pages/ArchiveDetails'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Reader from './pages/Reader'

import AdminLayout from './layouts/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'
import AdminBooks from './pages/admin/AdminBooks'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAssets from './pages/admin/AdminAssets'
import AdminArchives from './pages/admin/AdminArchives'
import AdminBorrowings from './pages/admin/AdminBorrowings'
import AdminReports from './pages/admin/AdminReports'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reader/:id" element={<Reader />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/borrowed" element={<Borrowed />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/archives/:id" element={<ArchiveDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="assets" element={<AdminAssets />} />
        <Route path="archives" element={<AdminArchives />} />
        <Route path="borrowings" element={<AdminBorrowings />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
