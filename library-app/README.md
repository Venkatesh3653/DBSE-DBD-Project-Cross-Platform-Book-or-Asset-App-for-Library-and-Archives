# Stackwell — Cross-Platform Book & Asset Management (Frontend Prototype)

A frontend prototype for a college project: a modern library and archive management platform for both
library users and administrators. Built with React, Vite, Tailwind CSS, React Router, and Lucide icons.
No backend yet — all data is mocked and persisted to `localStorage` so the demo survives a page refresh.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Demo accounts

Login with any password — authentication is simulated for the prototype.

- **Student view:** user@library.com
- **Admin view:** admin@library.com

You can also sign up as a new user from `/signup`.

## Project structure

```
src/
├── components/     Reusable UI: Sidebar, Topbar, BookCard, DataTable, Modal, Badge, etc.
├── layouts/        AppLayout (user shell) and AdminLayout (admin shell)
├── pages/          One file per route; admin/ holds the admin-only pages
├── data/           Mock data (books, users, assets, archives, borrowings, reviews, notifications)
├── services/       Data-access functions (getBooks, borrowBook, addBook, etc.) — see below
├── context/        Auth, Theme (dark mode), Toast, Library (favorites) React contexts
└── utils/          Small helpers (localStorage read/write)
```

## Backend-ready design

UI components never touch mock data directly — they call functions in `src/services/*.js`,
for example:

```js
getBooks()       // GET /api/books
getBookById(id)  // GET /api/books/:id
addBook(book)    // POST /api/books
updateBook(id, changes) // PUT /api/books/:id
deleteBook(id)   // DELETE /api/books/:id
borrowBook(bookId, userId) // POST /api/borrowings
returnBook(id)   // PUT /api/borrowings/:id/return
renewBook(id)    // PUT /api/borrowings/:id/renew
```

Right now each function reads/writes a local, `localStorage`-backed copy of the mock data. When a
real backend is ready, replace the body of each function with a `fetch()` call to the matching
endpoint (shown in a comment above every function) — no changes are needed in any page or component.

## Implemented features

- Landing page, login, and signup (simulated auth, demo accounts, role-based routing)
- User dashboard: quick stats, continue reading, AI picks, recommended books
- Discover page: search, category/availability filters, sorting, pagination, simulated QR/barcode scan
- Book details: full metadata, borrow/return, favorites, reviews, related books
- My Library: tabs for all/currently reading/borrowed/favorites/completed/saved
- Borrowed books table with due dates, renew, and return
- Digital Assets: grid/list view, search, filters, simulated upload
- Archives: collection browsing and a detail page per collection
- Notifications center with unread indicators and dismiss
- Settings: profile fields, dark mode toggle, notification preferences, logout
- Simulated online reader with page navigation, zoom, bookmark, and table of contents
- Admin dashboard: overview stats, books CRUD, user management (suspend/reactivate),
  digital assets CRUD, archives listing, borrowing management (renew/mark returned),
  and a reports page with bar/line/donut charts
- Global command-palette search (Ctrl/Cmd + K) across books, assets, archives, and users
- Dark mode with `localStorage` persistence
- Toast notifications for key actions
- Empty states, loading skeletons, and responsive layout (desktop sidebar, mobile bottom nav)

## Packages used

All dependencies are already listed in `package.json`:
`react`, `react-dom`, `react-router-dom`, `lucide-react`, `recharts`, plus Tailwind CSS and its
PostCSS/Autoprefixer tooling as dev dependencies. Running `npm install` pulls in everything needed.

## Notes for the demo

Suggested flow: Landing → Login (use a demo account) → Dashboard → Discover → search/scan a book →
Book Details → Borrow → My Library → Digital Assets → Archives → switch to admin (log in as
admin@library.com) → Admin Overview → Books management → Reports.
