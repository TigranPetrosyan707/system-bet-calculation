import { type ReactNode } from 'react'
import { cn } from '@/utils'

interface TableColumn<T> {
  key: string
  header: string
  render?: (item: T, index: number) => ReactNode
  className?: string
  headerClassName?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  className?: string
  rowClassName?: (item: T, index: number) => string
}

export function Table<T extends Record<string, any>>({ 
  columns, 
  data, 
  className,
  rowClassName 
}: TableProps<T>) {
  if (data.length === 0) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full', className)}>
        <thead>
          <tr className="bg-slate-50 dark:bg-dark-surfaceLight border-b border-slate-200 dark:border-dark-border transition-colors duration-300">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-dark-text uppercase tracking-wide transition-colors duration-300',
                  column.headerClassName
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-dark-border">
          {data.map((item, index) => (
            <tr
              key={index}
              className={cn(
                'hover:bg-slate-50 dark:hover:bg-dark-surfaceLight transition-colors duration-300',
                rowClassName?.(item, index)
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-sm text-slate-700 dark:text-dark-text transition-colors duration-300',
                    column.className
                  )}
                >
                  {column.render ? column.render(item, index) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

