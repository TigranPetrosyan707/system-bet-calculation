import { FaChartLine, FaDollarSign, FaWallet, FaTrophy, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { SystemBetResult } from '@/types/bet.types'

interface ResultCardProps {
  result: SystemBetResult
}

export const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-xl">
          <FaChartLine className="text-green-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Results</h2>
          <p className="text-sm text-gray-500">Your bet analysis</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-gray-600" />
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Combinations</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">{result.totalCombinations}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-blue-600" />
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Per Combination</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">
            ${result.stakePerCombination.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <FaWallet className="text-purple-600" />
            <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Total Stake</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">
            ${result.totalStake.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-indigo-600" />
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Total Payout</p>
          </div>
          <p className="text-3xl font-bold text-indigo-700">
            ${result.totalPayout.toFixed(2)}
          </p>
        </div>
        
        <div className={`p-5 rounded-xl border-2 hover:shadow-md transition-shadow ${
          result.profit >= 0 
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
            : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {result.profit >= 0 ? (
              <FaArrowUp className="text-green-600" />
            ) : (
              <FaArrowDown className="text-red-600" />
            )}
            <p className={`text-xs font-medium uppercase tracking-wide ${
              result.profit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              Profit/Loss
            </p>
          </div>
          <p className={`text-3xl font-bold ${
            result.profit >= 0 ? 'text-green-700' : 'text-red-700'
          }`}>
            {result.profit >= 0 ? '+' : ''}${result.profit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
