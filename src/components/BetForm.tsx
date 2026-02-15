import { useState, useEffect } from 'react'
import { FaCalculator } from 'react-icons/fa'
import { Button, Input } from '@/components/shared'
import { LoadingSpinner } from './LoadingSpinner'
import type { SystemType } from '@/types/bet.types'

interface BetFormProps {
  onSubmit: (data: { odds: number[]; system: SystemType; stake: number }) => void
  isLoading?: boolean
}

export const BetForm = ({ onSubmit, isLoading = false }: BetFormProps) => {
  const [odds, setOdds] = useState<string[]>([''])
  const [requiredWins, setRequiredWins] = useState<string>('')
  const [totalSelections, setTotalSelections] = useState<string>('')
  const [stake, setStake] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const requiredWinsNum = parseInt(requiredWins)
    if (!isNaN(requiredWinsNum) && requiredWinsNum > 0) {
      const minTotalSelections = requiredWinsNum + 1
      setTotalSelections(prev => {
        const currentTotalSelections = parseInt(prev)
        if (prev === '' || isNaN(currentTotalSelections) || currentTotalSelections < minTotalSelections) {
          return minTotalSelections.toString()
        }
        return prev
      })
    } else {
      setTotalSelections('')
    }
  }, [requiredWins])

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

  const handleTotalSelectionsChange = (value: string) => {
    const requiredWinsNum = parseInt(requiredWins)
    const minTotalSelections = !isNaN(requiredWinsNum) && requiredWinsNum > 0 ? requiredWinsNum + 1 : 1
    
    if (value === '') {
      setTotalSelections('')
      return
    }

    const newValue = parseInt(value)
    if (!isNaN(newValue)) {
      if (newValue < minTotalSelections) {
        setTotalSelections(minTotalSelections.toString())
      } else {
        setTotalSelections(value)
      }
    } else {
      setTotalSelections(value)
    }
  }

  const areOddsEnabled = () => {
    const requiredWinsNum = parseInt(requiredWins)
    const totalSelectionsNum = parseInt(totalSelections)
    return (
      !isNaN(requiredWinsNum) && 
      requiredWinsNum > 0 && 
      !isNaN(totalSelectionsNum) && 
      totalSelectionsNum > 0 &&
      totalSelectionsNum > requiredWinsNum
    )
  }

  const isStakeEnabled = () => {
    if (!areOddsEnabled()) return false
    const totalSelectionsNum = parseInt(totalSelections)
    if (isNaN(totalSelectionsNum) || totalSelectionsNum <= 0) return false
    if (odds.length !== totalSelectionsNum) return false
    return odds.every(odd => {
      const oddNum = parseFloat(odd)
      return odd.trim() !== '' && !isNaN(oddNum) && oddNum > 0
    })
  }

  const isFormValid = () => {
    const requiredWinsNum = parseInt(requiredWins)
    const totalSelectionsNum = parseInt(totalSelections)
    const stakeNum = parseFloat(stake)

    if (isNaN(requiredWinsNum) || requiredWinsNum < 1) return false
    if (isNaN(totalSelectionsNum) || totalSelectionsNum < 1) return false
    if (totalSelectionsNum <= requiredWinsNum) return false

    if (odds.length !== totalSelectionsNum) return false
    const allOddsValid = odds.every(odd => {
      const oddNum = parseFloat(odd)
      return odd.trim() !== '' && !isNaN(oddNum) && oddNum > 0
    })
    if (!allOddsValid) return false

    if (isNaN(stakeNum) || stakeNum <= 0) return false

    return true
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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-1 transition-colors duration-300">System Bet Calculator</h2>
        <p className="text-sm text-slate-500 dark:text-dark-textSecondary transition-colors duration-300">Enter your bet details</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-dark-text mb-3 transition-colors duration-300">
            System Type
          </label>
          <p className="text-xs text-slate-500 dark:text-dark-textMuted mb-3 transition-colors duration-300">
            e.g., 2/3 means 2 wins from 3 selections
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Required Wins"
              value={requiredWins}
              onChange={(e) => setRequiredWins(e.target.value)}
              min="1"
              disabled={isLoading}
              required
            />
            <Input
              type="number"
              label="Total Selections"
              value={totalSelections}
              onChange={(e) => handleTotalSelectionsChange(e.target.value)}
              min={requiredWins ? (parseInt(requiredWins) + 1).toString() : "1"}
              disabled={isLoading || !requiredWins || isNaN(parseInt(requiredWins)) || parseInt(requiredWins) < 1}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-dark-text mb-3 transition-colors duration-300">
            Odds ({odds.length} {odds.length === 1 ? 'selection' : 'selections'})
          </label>
          <p className="text-xs text-slate-500 dark:text-dark-textMuted mb-3 transition-colors duration-300">
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
                disabled={isLoading || !areOddsEnabled()}
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
            disabled={isLoading || !isStakeEnabled()}
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 transition-colors duration-300">
            <p className="text-red-700 dark:text-red-400 text-sm transition-colors duration-300">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Calculating...
            </>
          ) : (
            <>
              <FaCalculator className="mr-2" />
              Calculate Results
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
