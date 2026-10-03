export default function DataTable({ columns, rows, rowKey = 'id' }) {
  return (
    <div className="border border-line dark:border-brand-700 rounded-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-paper-off dark:bg-brand-900/60 text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium text-ink-soft dark:text-paper-off/60 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row[rowKey]}
                className="border-t border-line dark:border-brand-700 hover:bg-paper-off/60 dark:hover:bg-brand-700/40"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-middle whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
