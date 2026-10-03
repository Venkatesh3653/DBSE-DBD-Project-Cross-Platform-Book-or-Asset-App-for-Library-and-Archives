// Mock borrowing records. Mirrors the shape expected from /api/borrowings.
// status is derived at runtime from dueDate, but a stored value is kept for records already returned.
export const borrowingsSeed = [
  { id: 'br1', userId: 'u1', bookId: 'b1', borrowedDate: '2026-08-20', dueDate: '2026-09-15', status: 'active' },
  { id: 'br2', userId: 'u1', bookId: 'b6', borrowedDate: '2026-08-28', dueDate: '2026-09-13', status: 'active' },
  { id: 'br3', userId: 'u1', bookId: 'b7', borrowedDate: '2026-08-01', dueDate: '2026-08-29', status: 'overdue' },
  { id: 'br4', userId: 'u1', bookId: 'b3', borrowedDate: '2026-07-10', dueDate: '2026-08-05', status: 'returned' },
  { id: 'br5', userId: 'u3', bookId: 'b4', borrowedDate: '2026-09-01', dueDate: '2026-09-22', status: 'active' },
  { id: 'br6', userId: 'u4', bookId: 'b5', borrowedDate: '2026-08-15', dueDate: '2026-09-10', status: 'active' },
  { id: 'br7', userId: 'u5', bookId: 'b2', borrowedDate: '2026-07-20', dueDate: '2026-08-17', status: 'overdue' },
  { id: 'br8', userId: 'u5', bookId: 'b8', borrowedDate: '2026-07-25', dueDate: '2026-08-22', status: 'overdue' },
  { id: 'br9', userId: 'u7', bookId: 'b13', borrowedDate: '2026-08-30', dueDate: '2026-09-27', status: 'active' },
  { id: 'br10', userId: 'u9', bookId: 'b12', borrowedDate: '2026-06-15', dueDate: '2026-07-13', status: 'returned' },
]
