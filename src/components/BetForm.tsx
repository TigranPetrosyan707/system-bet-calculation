import { useState } from 'react'
import { FaCalculator, FaPlus, FaTrash, FaDice, FaCoins } from 'react-icons/fa'
import { Button, Input } from '@/components/shared'
import type { SystemType } from '@/types/bet.types'

interface BetFormProps {
  onSubmit: (data: { odds: number[]; system: SystemType; stake: number }) => void
}

export const BetForm = ({ onSubmit }: BetFormProps) => {
  const [odds, setOdds] = useState<string[]>([''])
  const [requiredWins, setRequiredWins] = useState<string>('')
  const [totalSelections, setTotalSelections] = useState<string>('')
  const [stake, setStake] = useState<string>('')

  const handleAddOdd = () => {
    setOdds([...odds, ''])
  }

  const handleRemoveOdd = (index: number) => {
    if (odds.length > 1) {
      setOdds(odds.filter((_, i) => i !== index))
    }
  }

  const handleOddChange = (index: number, value: string) => {
    const newOdds = [...odds]
    newOdds[index] = value
    setOdds(newOdds)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const oddsNumbers = odds.map(odd => parseFloat(odd)).filter(odd => !isNaN(odd) && odd > 0)
    const requiredWinsNum = parseInt(requiredWins)
    const totalSelectionsNum = parseInt(totalSelections)
    const stakeNum = parseFloat(stake)

    if (oddsNumbers.length === 0 || isNaN(requiredWinsNum) || isNaN(totalSelectionsNum) || isNaN(stakeNum)) {
      return
    }

    if (requiredWinsNum > totalSelectionsNum || requiredWinsNum < 1 || totalSelectionsNum < 1) {
      return
    }

    if (oddsNumbers.length !== totalSelectionsNum) {
      return
    }

    onSubmit({
      odds: oddsNumbers,
      system: {
        requiredWins: requiredWinsNum,
        totalSelections: totalSelectionsNum,
      },
      stake: stakeNum,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl">
          <FaCalculator className="text-blue-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Bet Calculator</h2>
          <p className="text-sm text-gray-500">Enter your bet details</p>
        </div>
      </div>
      
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <FaDice className="text-blue-600" />
          <label className="block text-sm font-semibold text-gray-700">
            System Type
          </label>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          e.g., 2/3 means 2 wins from 3 selections
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Required Wins"
            value={requiredWins}
            onChange={(e) => setRequiredWins(e.target.value)}
            min="1"
            required
          />
          <Input
            type="number"
            label="Total Selections"
            value={totalSelections}
            onChange={(e) => setTotalSelections(e.target.value)}
            min="1"
            required
          />
        </div>
      </div>

      <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <FaDice className="text-purple-600" />
            <label className="block text-sm font-semibold text-gray-700">
              Odds
            </label>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddOdd}
            className="flex items-center gap-2"
          >
            <FaPlus className="text-xs" />
            Add Odd
          </Button>
        </div>
        <div className="space-y-3">
          {odds.map((odd, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  value={odd}
                  onChange={(e) => handleOddChange(index, e.target.value)}
                  placeholder={`Odd ${index + 1}`}
                  required
                />
              </div>
              {odds.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveOdd(index)}
                  className="px-3"
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <FaCoins className="text-green-600" />
          <Input
            type="number"
            step="0.01"
            min="0.01"
            label="Total Stake"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="w-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
      >
        <FaCalculator />
        Calculate Results
      </Button>
    </form>
  )
}
