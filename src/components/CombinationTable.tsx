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
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 rounded-xl">
          <FaList className="text-indigo-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Combinations</h2>
          <p className="text-sm text-gray-500">All possible winning combinations</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
              <th className="border border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                #
              </th>
              <th className="border border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                Combination
              </th>
              <th className="border border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                Stake
              </th>
              <th className="border border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                Payout
              </th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combo, index) => (
              <tr 
                key={index} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors border-b border-gray-100"
              >
                <td className="border border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                  {index + 1}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span className="font-medium">
                      {combo.combination.map((num, i) => (
                        <span key={i}>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-1">
                            {num + 1}
                          </span>
                          {i < combo.combination.length - 1 && <span className="mx-1 text-gray-400">+</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                </td>
                <td className="border border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700">
                  ${combo.stakePerCombination.toFixed(2)}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-sm font-bold text-green-700">
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
