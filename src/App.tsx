import { useState } from 'react'
import { FaChartBar } from 'react-icons/fa'
import { BetForm, ResultCard, CombinationTable } from '@/components'
import type { SystemBetResult } from '@/types/bet.types'

function App() {
  const [result, setResult] = useState<SystemBetResult | null>(null)

  const handleCalculate = (data: { odds: number[]; system: { requiredWins: number; totalSelections: number }; stake: number }) => {
    console.log('Calculate with:', data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <FaChartBar className="text-white text-4xl" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            System Bet Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calculate potential winnings for your system bets with precision and ease
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BetForm onSubmit={handleCalculate} />
          {result && <ResultCard result={result} />}
        </div>

        {result && (
          <div className="mt-8">
            <CombinationTable combinations={result.combinations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
