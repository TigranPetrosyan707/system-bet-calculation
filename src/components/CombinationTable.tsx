import { FaList, FaCheckCircle } from 'react-icons/fa'
import type { CombinationResult } from '@/types/bet.types'

interface CombinationTableProps {
  combinations: CombinationResult[]
}

export const CombinationTable = ({ combinations }: CombinationTableProps) => {
  if (combinations.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-1 transition-colors duration-300">Combinations</h2>
        <p className="text-sm text-slate-500 dark:text-dark-textSecondary transition-colors duration-300">All possible winning combinations</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-dark-surfaceLight border-b border-slate-200 dark:border-dark-border transition-colors duration-300">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-dark-text uppercase tracking-wide transition-colors duration-300">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-dark-text uppercase tracking-wide transition-colors duration-300">
                Combination
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-dark-text uppercase tracking-wide transition-colors duration-300">
                Stake
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-dark-text uppercase tracking-wide transition-colors duration-300">
                Payout
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-dark-border">
            {combinations.map((combo, index) => (
              <tr 
                key={index} 
                className="hover:bg-slate-50 dark:hover:bg-dark-surfaceLight transition-colors duration-300"
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-dark-text transition-colors duration-300">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-dark-text transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 dark:text-green-400 text-xs transition-colors duration-300" />
                    <span>
                      {combo.combination.map((num, i) => (
                        <span key={i}>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold mr-1 transition-colors duration-300">
                            {num + 1}
                          </span>
                          {i < combo.combination.length - 1 && <span className="mx-1 text-slate-400 dark:text-dark-textMuted transition-colors duration-300">+</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-dark-text transition-colors duration-300">
                  ${combo.stakePerCombination.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-green-700 dark:text-green-400 transition-colors duration-300">
                  ${combo.payout.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
