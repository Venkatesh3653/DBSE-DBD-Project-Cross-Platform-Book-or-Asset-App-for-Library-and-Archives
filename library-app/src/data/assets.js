// Mock digital assets. Mirrors the shape expected from /api/assets.
export const digitalAssets = [
  { id: 'a1', name: 'Operating Systems Notes.pdf', type: 'pdf', size: '2.4 MB', owner: 'Kavya Menon', uploaded: '2026-02-11', tags: ['Notes', 'Computer Science'] },
  { id: 'a2', name: 'Research Paper – AI Ethics.pdf', type: 'pdf', size: '1.1 MB', owner: 'Sanjay Gupta', uploaded: '2026-01-28', tags: ['Research', 'AI'] },
  { id: 'a3', name: 'Library Annual Report.pdf', type: 'pdf', size: '3.8 MB', owner: 'Priya Sharma', uploaded: '2025-12-30', tags: ['Report', 'Administration'] },
  { id: 'a4', name: 'Computer Networks Presentation.pptx', type: 'pptx', size: '6.2 MB', owner: 'Kavya Menon', uploaded: '2026-03-02', tags: ['Slides', 'Computer Science'] },
  { id: 'a5', name: 'Thesis Draft – Renewable Energy.docx', type: 'docx', size: '890 KB', owner: 'Ishita Bose', uploaded: '2026-02-19', tags: ['Thesis'] },
  { id: 'a6', name: 'Campus Archive Photographs.zip', type: 'image', size: '48 MB', owner: 'Priya Sharma', uploaded: '2025-11-14', tags: ['Photos', 'Archive'] },
  { id: 'a7', name: 'Database Systems Lecture Notes.pdf', type: 'pdf', size: '1.9 MB', owner: 'Sanjay Gupta', uploaded: '2026-01-05', tags: ['Notes'] },
  { id: 'a8', name: 'Financial Accounting Workbook.xlsx', type: 'xlsx', size: '540 KB', owner: 'Meera Nair', uploaded: '2025-10-22', tags: ['Business'] },
  { id: 'a9', name: 'Machine Learning Cheat Sheet.pdf', type: 'pdf', size: '760 KB', owner: 'Rohan Iyer', uploaded: '2026-03-08', tags: ['Notes', 'AI'] },
  { id: 'a10', name: 'University Convocation Recording.mp4', type: 'video', size: '210 MB', owner: 'Priya Sharma', uploaded: '2025-09-30', tags: ['Media', 'Archive'] },
]

// Mock archival collections. Mirrors the shape expected from /api/archives.
export const archives = [
  { id: 'ar1', title: 'University Historical Archive', description: 'Founding documents, correspondence, and administrative records tracing the university\u2019s growth.', items: 1850, range: '1950–2025' },
  { id: 'ar2', title: 'Rare Books Collection', description: 'First editions and limited prints preserved for research and exhibition.', items: 320, range: '1750–1950' },
  { id: 'ar3', title: 'Photographic Archive', description: 'Campus life, events, and construction photographed across seven decades.', items: 4200, range: '1955–2024' },
  { id: 'ar4', title: 'Research Archives', description: 'Published and unpublished faculty research papers, theses, and datasets.', items: 980, range: '1990–2026' },
  { id: 'ar5', title: 'Manuscripts & Personal Papers', description: 'Handwritten manuscripts and personal papers donated by alumni and faculty.', items: 145, range: '1880–1970' },
]
