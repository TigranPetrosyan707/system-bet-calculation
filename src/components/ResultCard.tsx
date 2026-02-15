import { FaDollarSign, FaWallet, FaTrophy, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { SystemBetResult } from '@/types/bet.types'

interface ResultCardProps {
  result: SystemBetResult
}

export const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-1 transition-colors duration-300">Results</h2>
        <p className="text-sm text-slate-500 dark:text-dark-textSecondary transition-colors duration-300">Your bet analysis</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-dark-surfaceLight p-4 rounded-md border border-slate-200 dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-slate-600 dark:text-dark-textSecondary text-sm transition-colors duration-300" />
            <p className="text-xs font-medium text-slate-600 dark:text-dark-textSecondary uppercase tracking-wide transition-colors duration-300">Combinations</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-dark-text transition-colors duration-300">{result.totalCombinations}</p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-blue-600 dark:text-blue-400 text-sm transition-colors duration-300" />
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide transition-colors duration-300">Per Combination</p>
          </div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 transition-colors duration-300">
            ${result.stakePerCombination.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-dark-surfaceLight p-4 rounded-md border border-slate-200 dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FaWallet className="text-slate-600 dark:text-dark-textSecondary text-sm transition-colors duration-300" />
            <p className="text-xs font-medium text-slate-600 dark:text-dark-textSecondary uppercase tracking-wide transition-colors duration-300">Total Stake</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-dark-text transition-colors duration-300">
            ${result.totalStake.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-blue-600 dark:text-blue-400 text-sm transition-colors duration-300" />
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide transition-colors duration-300">Total Payout</p>
          </div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 transition-colors duration-300">
            ${result.totalPayout.toFixed(2)}
          </p>
        </div>
        
        <div className={`col-span-2 p-4 rounded-md border-2 transition-colors duration-300 ${
          result.profit >= 0 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {result.profit >= 0 ? (
              <FaArrowUp className="text-green-600 dark:text-green-400 text-sm transition-colors duration-300" />
            ) : (
              <FaArrowDown className="text-red-600 dark:text-red-400 text-sm transition-colors duration-300" />
            )}
            <p className={`text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
              result.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              Profit/Loss
            </p>
          </div>
          <p className={`text-3xl font-bold transition-colors duration-300 ${
            result.profit >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
          }`}>
            {result.profit >= 0 ? '+' : ''}${result.profit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
