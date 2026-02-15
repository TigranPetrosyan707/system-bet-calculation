export interface BetFormData {
  requiredWins: string
  totalSelections: string
  odds: string[]
  stake: string
}

export const validateBetForm = (data: BetFormData): string | null => {
  const requiredWinsNum = parseInt(data.requiredWins)
  const totalSelectionsNum = parseInt(data.totalSelections)
  const stakeNum = parseFloat(data.stake)

  if (isNaN(requiredWinsNum) || requiredWinsNum < 1) {
    return 'Please enter a valid number of required wins (at least 1)'
  }

  if (isNaN(totalSelectionsNum) || totalSelectionsNum < 1) {
    return 'Please enter a valid number of total selections (at least 1)'
  }

  if (requiredWinsNum > totalSelectionsNum) {
    return 'Required wins cannot be greater than total selections'
  }

  const oddsNumbers = data.odds.map(odd => parseFloat(odd)).filter(odd => !isNaN(odd) && odd > 0)
  
  if (oddsNumbers.length === 0) {
    return 'Please enter at least one valid odd'
  }

  if (oddsNumbers.length !== totalSelectionsNum) {
    return `Please enter exactly ${totalSelectionsNum} odds (one for each selection)`
  }

  if (isNaN(stakeNum) || stakeNum <= 0) {
    return 'Please enter a valid stake amount (greater than 0)'
  }

  return null
}

export const isSystemTypeValid = (requiredWins: string, totalSelections: string): boolean => {
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

export const areAllOddsFilled = (odds: string[], totalSelections: string): boolean => {
  const totalSelectionsNum = parseInt(totalSelections)
  if (isNaN(totalSelectionsNum) || totalSelectionsNum <= 0) return false
  return odds.length === totalSelectionsNum && 
         odds.every(odd => odd.trim() !== '' && !isNaN(parseFloat(odd)) && parseFloat(odd) > 0)
}

export const isFormValid = (data: BetFormData): boolean => {
  return validateBetForm(data) === null
}

