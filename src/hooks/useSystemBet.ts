import { useMemo } from 'react'
import { generateCombinations } from '@/utils/generateCombinations'
import { calculateAllCombinations } from '@/utils/calculatePayout'
import type { SystemBetResult, BetInput } from '@/types/bet.types'

export function useSystemBet(input: BetInput | null): SystemBetResult | null {
  return useMemo(() => {
    if (!input) {
      return null
    }

    const { odds, system, stake } = input

    if (odds.length !== system.totalSelections) {
      return null
    }

    if (system.requiredWins > system.totalSelections || system.requiredWins < 1) {
      return null
    }

    if (stake <= 0) {
      return null
    }

    const combinations = generateCombinations(system.totalSelections, system.requiredWins)
    const totalCombinations = combinations.length

    if (totalCombinations === 0) {
      return null
    }

    const stakePerCombination = stake / totalCombinations
    const combinationResults = calculateAllCombinations(combinations, odds, stakePerCombination)

    const totalPayout = combinationResults.reduce((sum, combo) => sum + combo.payout, 0)
    const profit = totalPayout - stake

    return {
      totalCombinations,
      stakePerCombination,
      combinations: combinationResults,
      totalPayout,
      totalStake: stake,
      profit,
    }
  }, [input])
}

