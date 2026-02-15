import { useState } from 'react'
import { FaChartBar } from 'react-icons/fa'
import { BetForm, ResultCard, CombinationTable } from '@/components'
import { useSystemBet } from '@/hooks/useSystemBet'
import type { BetInput } from '@/types/bet.types'

function App() {
  const [betInput, setBetInput] = useState<BetInput | null>(null)
  const result = useSystemBet(betInput)

  const handleCalculate = (data: { 
    odds: number[]
    system: { requiredWins: number; totalSelections: number }
    stake: number 
  }) => {
    const betInputData: BetInput = {
      odds: data.odds,
      system: {
        requiredWins: data.system.requiredWins,
        totalSelections: data.system.totalSelections,
      },
      stake: data.stake,
    }
    setBetInput(betInputData)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            System Bet Calculator
          </h1>
          <p className="text-slate-600">
            Calculate potential winnings for your system bets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BetForm onSubmit={handleCalculate} />
          {result && <ResultCard result={result} />}
        </div>

        {result && (
          <div className="mt-6">
            <CombinationTable combinations={result.combinations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
