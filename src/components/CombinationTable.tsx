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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Combinations</h2>
        <p className="text-sm text-slate-500">All possible winning combinations</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Combination
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Stake
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Payout
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {combinations.map((combo, index) => (
              <tr 
                key={index} 
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-700">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>
                      {combo.combination.map((num, i) => (
                        <span key={i}>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-100 text-blue-700 text-xs font-semibold mr-1">
                            {num + 1}
                          </span>
                          {i < combo.combination.length - 1 && <span className="mx-1 text-slate-400">+</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">
                  ${combo.stakePerCombination.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-green-700">
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
