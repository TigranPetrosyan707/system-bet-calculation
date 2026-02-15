import { FaDollarSign, FaWallet, FaTrophy, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { SystemBetResult } from '@/types/bet.types'

interface ResultCardProps {
  result: SystemBetResult
}

export const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Results</h2>
        <p className="text-sm text-slate-500">Your bet analysis</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-slate-600 text-sm" />
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Combinations</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{result.totalCombinations}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-blue-600 text-sm" />
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Per Combination</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            ${result.stakePerCombination.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <FaWallet className="text-slate-600 text-sm" />
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Total Stake</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${result.totalStake.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-blue-600 text-sm" />
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total Payout</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            ${result.totalPayout.toFixed(2)}
          </p>
        </div>
        
        <div className={`col-span-2 p-4 rounded-md border-2 ${
          result.profit >= 0 
            ? 'bg-green-50 border-green-300' 
            : 'bg-red-50 border-red-300'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {result.profit >= 0 ? (
              <FaArrowUp className="text-green-600 text-sm" />
            ) : (
              <FaArrowDown className="text-red-600 text-sm" />
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
