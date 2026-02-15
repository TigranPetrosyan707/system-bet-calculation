import { FaCheckCircle } from 'react-icons/fa'
import { Table } from './shared'
import { cn } from '@/utils'
import type { CombinationResult } from '@/types/bet.types'

interface CombinationTableProps {
  combinations: CombinationResult[]
}

export const CombinationTable = ({ combinations }: CombinationTableProps) => {
  const columns = [
    {
      key: 'index',
      header: '#',
      className: 'font-medium',
      render: (_: CombinationResult, index: number) => index + 1,
    },
    {
      key: 'combination',
      header: 'Combination',
      render: (combo: CombinationResult) => (
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500 dark:text-green-400 text-xs transition-colors duration-300" />
          <span>
            {combo.combination.map((num, i) => (
              <span key={i}>
                <span className={cn(
                  'inline-flex items-center justify-center w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold mr-1 transition-colors duration-300'
                )}>
                  {num + 1}
                </span>
                {i < combo.combination.length - 1 && (
                  <span className="mx-1 text-slate-400 dark:text-dark-textMuted transition-colors duration-300">+</span>
                )}
              </span>
            ))}
          </span>
        </div>
      ),
    },
    {
      key: 'stake',
      header: 'Stake',
      className: 'font-medium',
      render: (combo: CombinationResult) => `$${combo.stakePerCombination.toFixed(2)}`,
    },
    {
      key: 'payout',
      header: 'Payout',
      className: 'font-bold text-green-700 dark:text-green-400',
      render: (combo: CombinationResult) => `$${combo.payout.toFixed(2)}`,
    },
  ]

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-1 transition-colors duration-300">
          Combinations
        </h2>
        <p className="text-sm text-slate-500 dark:text-dark-textSecondary transition-colors duration-300">
          All possible winning combinations
        </p>
      </div>
      
      <Table columns={columns} data={combinations} />
    </div>
  )
}
