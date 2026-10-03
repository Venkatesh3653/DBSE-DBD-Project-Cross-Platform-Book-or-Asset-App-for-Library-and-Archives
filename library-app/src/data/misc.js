export const reviewsByBook = {
  b1: [
    { id: 'r1', user: 'Rohan Iyer', rating: 5, comment: 'Changed how I plan my week. The 1% better idea is simple but sticks with you.' },
    { id: 'r2', user: 'Neha Kulkarni', rating: 4, comment: 'Practical and well organized, though a few chapters repeat the same point.' },
  ],
  b2: [
    { id: 'r3', user: 'Sanjay Gupta', rating: 5, comment: 'Required reading before any serious codebase work. The naming chapter alone is worth it.' },
  ],
  b6: [
    { id: 'r4', user: 'Ishita Bose', rating: 5, comment: 'Dense in the best way. The world-building rewards a slow read.' },
    { id: 'r5', user: 'Vikram Singh', rating: 5, comment: 'One of the few books that lives up to its reputation.' },
  ],
}

export const notificationsSeed = [
  { id: 'n1', title: 'Due soon', message: 'Your book "Atomic Habits" is due in 2 days.', time: '2h ago', read: false },
  { id: 'n2', title: 'New resources', message: 'New Computer Science resources have been added to Digital Assets.', time: '5h ago', read: false },
  { id: 'n3', title: 'Book available', message: 'Your requested book "Clean Code" is now available.', time: '1d ago', read: false },
  { id: 'n4', title: 'Archive updated', message: 'The Photographic Archive collection was updated with 42 new items.', time: '2d ago', read: true },
  { id: 'n5', title: 'Overdue notice', message: 'Your book "Thinking, Fast and Slow" is overdue. Please return or renew it.', time: '3d ago', read: true },
]
