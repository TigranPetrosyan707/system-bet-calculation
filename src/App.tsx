import { useState } from 'react'
import { BetForm, ResultCard, CombinationTable, ThemeToggle } from '@/components'
import { LoadingSpinner } from '@/components/shared'
import { useSystemBet } from '@/hooks/useSystemBet'
import type { BetInput } from '@/types/bet.types'
import logo from '@/assets/logo.jpg'

function App() {
  const [betInput, setBetInput] = useState<BetInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const result = useSystemBet(betInput)

  const handleCalculate = (data: { 
    odds: number[]
    system: { requiredWins: number; totalSelections: number }
    stake: number 
  }) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const betInputData: BetInput = {
        odds: data.odds,
        system: {
          requiredWins: data.system.requiredWins,
          totalSelections: data.system.totalSelections,
        },
        stake: data.stake,
      }
      setBetInput(betInputData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg py-8 transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="System Bet Calculator Logo" 
              className="h-20 w-auto rounded-lg transition-opacity duration-300"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-dark-text mb-2 transition-colors duration-300">
            System Bet Calculator
          </h1>
          <p className="text-slate-600 dark:text-dark-textSecondary transition-colors duration-300">
            Calculate potential winnings for your system bets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BetForm onSubmit={handleCalculate} isLoading={isLoading} />
          {isLoading ? (
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300 flex items-center justify-center min-h-[400px]">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            result && <ResultCard result={result} />
          )}
        </div>

        {!isLoading && result && (
          <div className="mt-6">
            <CombinationTable combinations={result.combinations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
