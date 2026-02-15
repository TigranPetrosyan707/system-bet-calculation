import type { CombinationResult } from '@/types/bet.types'

export function calculatePayoutForCombination(
  combination: number[],
  odds: number[],
  stakePerCombination: number
): number {
  let totalOdds = 1
  
  for (const index of combination) {
    if (index >= 0 && index < odds.length) {
      totalOdds *= odds[index]
    }
  }
  
  return stakePerCombination * totalOdds
}

export function calculateAllCombinations(
  combinations: number[][],
  odds: number[],
  stakePerCombination: number
): CombinationResult[] {
  return combinations.map(combination => ({
    combination,
    payout: calculatePayoutForCombination(combination, odds, stakePerCombination),
    stakePerCombination,
  }))
}

