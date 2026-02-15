import { useState, useEffect } from 'react'
import { FaCalculator } from 'react-icons/fa'
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
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const totalSelectionsNum = parseInt(totalSelections)
    if (!isNaN(totalSelectionsNum) && totalSelectionsNum > 0) {
      setOdds(prevOdds => {
        const currentLength = prevOdds.length
        if (totalSelectionsNum > currentLength) {
          return [...prevOdds, ...Array(totalSelectionsNum - currentLength).fill('')]
        } else if (totalSelectionsNum < currentLength) {
          return prevOdds.slice(0, totalSelectionsNum)
        }
        return prevOdds
      })
    }
  }, [totalSelections])

  const handleOddChange = (index: number, value: string) => {
    const newOdds = [...odds]
    newOdds[index] = value
    setOdds(newOdds)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const oddsNumbers = odds.map(odd => parseFloat(odd)).filter(odd => !isNaN(odd) && odd > 0)
    const requiredWinsNum = parseInt(requiredWins)
    const totalSelectionsNum = parseInt(totalSelections)
    const stakeNum = parseFloat(stake)

    if (isNaN(requiredWinsNum) || requiredWinsNum < 1) {
      setError('Please enter a valid number of required wins (at least 1)')
      return
    }

    if (isNaN(totalSelectionsNum) || totalSelectionsNum < 1) {
      setError('Please enter a valid number of total selections (at least 1)')
      return
    }

    if (requiredWinsNum > totalSelectionsNum) {
      setError('Required wins cannot be greater than total selections')
      return
    }

    if (oddsNumbers.length === 0) {
      setError('Please enter at least one valid odd')
      return
    }

    if (oddsNumbers.length !== totalSelectionsNum) {
      setError(`Please enter exactly ${totalSelectionsNum} odds (one for each selection)`)
      return
    }

    if (isNaN(stakeNum) || stakeNum <= 0) {
      setError('Please enter a valid stake amount (greater than 0)')
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">System Bet Calculator</h2>
        <p className="text-sm text-slate-500">Enter your bet details</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            System Type
          </label>
          <p className="text-xs text-slate-500 mb-3">
            e.g., 2/3 means 2 wins from 3 selections
          </p>
          <div className="grid grid-cols-2 gap-3">
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Odds ({odds.length} {odds.length === 1 ? 'selection' : 'selections'})
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Enter odds for each selection
          </p>
          <div className="space-y-2">
            {odds.map((odd, index) => (
              <Input
                key={index}
                type="number"
                step="0.01"
                min="1"
                value={odd}
                onChange={(e) => handleOddChange(index, e.target.value)}
                placeholder={`Odd ${index + 1}`}
                required
              />
            ))}
          </div>
        </div>

        <div>
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full"
        >
          <FaCalculator className="mr-2" />
          Calculate Results
        </Button>
      </div>
    </form>
  )
}
