import { useState, useEffect } from 'react'
import type { SystemType } from '@/types/bet.types'
import { validateBetForm, isSystemTypeValid, areAllOddsFilled, isFormValid, type BetFormData } from '@/utils/betFormValidation'

interface UseBetFormProps {
  onSubmit: (data: { odds: number[]; system: SystemType; stake: number }) => void
  isLoading?: boolean
}

export const useBetForm = ({ onSubmit, isLoading = false }: UseBetFormProps) => {
  const [formData, setFormData] = useState<BetFormData>({
    requiredWins: '',
    totalSelections: '',
    odds: [''],
    stake: '',
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const requiredWinsNum = parseInt(formData.requiredWins)
    if (!isNaN(requiredWinsNum) && requiredWinsNum > 0) {
      const minTotalSelections = requiredWinsNum + 1
      setFormData(prev => ({
        ...prev,
        totalSelections: prev.totalSelections === '' || 
          parseInt(prev.totalSelections) < minTotalSelections 
          ? minTotalSelections.toString() 
          : prev.totalSelections
      }))
    } else {
      setFormData(prev => ({ ...prev, totalSelections: '' }))
    }
  }, [formData.requiredWins])

  useEffect(() => {
    const totalSelectionsNum = parseInt(formData.totalSelections)
    if (!isNaN(totalSelectionsNum) && totalSelectionsNum > 0) {
      setFormData(prev => {
        const currentLength = prev.odds.length
        if (totalSelectionsNum > currentLength) {
          return {
            ...prev,
            odds: [...prev.odds, ...Array(totalSelectionsNum - currentLength).fill('')]
          }
        } else if (totalSelectionsNum < currentLength) {
          return {
            ...prev,
            odds: prev.odds.slice(0, totalSelectionsNum)
          }
        }
        return prev
      })
    }
  }, [formData.totalSelections])

  const updateField = (field: keyof BetFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTotalSelectionsChange = (value: string) => {
    const requiredWinsNum = parseInt(formData.requiredWins)
    const minTotalSelections = !isNaN(requiredWinsNum) && requiredWinsNum > 0 ? requiredWinsNum + 1 : 1
    
    if (value === '') {
      updateField('totalSelections', '')
      return
    }

    const newValue = parseInt(value)
    if (!isNaN(newValue)) {
      updateField('totalSelections', newValue < minTotalSelections ? minTotalSelections.toString() : value)
    } else {
      updateField('totalSelections', value)
    }
  }

  const handleOddChange = (index: number, value: string) => {
    const newOdds = [...formData.odds]
    newOdds[index] = value
    updateField('odds', newOdds)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const validationError = validateBetForm(formData)
    if (validationError) {
      setError(validationError)
      return
    }

    const oddsNumbers = formData.odds.map(odd => parseFloat(odd)).filter(odd => !isNaN(odd) && odd > 0)
    
    onSubmit({
      odds: oddsNumbers,
      system: {
        requiredWins: parseInt(formData.requiredWins),
        totalSelections: parseInt(formData.totalSelections),
      },
      stake: parseFloat(formData.stake),
    })
  }

  const areOddsEnabled = () => isSystemTypeValid(formData.requiredWins, formData.totalSelections)
  const isStakeEnabled = () => areOddsEnabled() && areAllOddsFilled(formData.odds, formData.totalSelections)
  const isValid = () => isFormValid(formData)

  return {
    formData,
    error,
    handleSubmit,
    updateField,
    handleTotalSelectionsChange,
    handleOddChange,
    areOddsEnabled,
    isStakeEnabled,
    isValid,
    isLoading,
  }
}

