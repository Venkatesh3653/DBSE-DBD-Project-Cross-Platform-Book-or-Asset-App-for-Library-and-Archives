// Mock user directory. Mirrors the shape expected from /api/users.
export const users = [
  { id: 'u1', name: 'Aditi Rao', email: 'user@library.com', role: 'Student', booksBorrowed: 4, status: 'Active', joined: '2024-07-12' },
  { id: 'u2', name: 'Meera Nair', email: 'admin@library.com', role: 'Admin', booksBorrowed: 0, status: 'Active', joined: '2022-01-05' },
  { id: 'u3', name: 'Rohan Iyer', email: 'rohan.iyer@library.com', role: 'Student', booksBorrowed: 2, status: 'Active', joined: '2024-09-02' },
  { id: 'u4', name: 'Kavya Menon', email: 'kavya.menon@library.com', role: 'Faculty', booksBorrowed: 1, status: 'Active', joined: '2021-03-18' },
  { id: 'u5', name: 'Arjun Verma', email: 'arjun.verma@library.com', role: 'Student', booksBorrowed: 6, status: 'Suspended', joined: '2023-11-27' },
  { id: 'u6', name: 'Priya Sharma', email: 'priya.sharma@library.com', role: 'Librarian', booksBorrowed: 0, status: 'Active', joined: '2020-06-01' },
  { id: 'u7', name: 'Sanjay Gupta', email: 'sanjay.gupta@library.com', role: 'Faculty', booksBorrowed: 3, status: 'Active', joined: '2022-08-14' },
  { id: 'u8', name: 'Neha Kulkarni', email: 'neha.kulkarni@library.com', role: 'Student', booksBorrowed: 0, status: 'Active', joined: '2025-01-09' },
  { id: 'u9', name: 'Vikram Singh', email: 'vikram.singh@library.com', role: 'Student', booksBorrowed: 1, status: 'Active', joined: '2024-04-22' },
  { id: 'u10', name: 'Ishita Bose', email: 'ishita.bose@library.com', role: 'Faculty', booksBorrowed: 2, status: 'Active', joined: '2023-02-16' },
]

export const currentUserDemo = {
  user: users[0],
  admin: users[1],
}
