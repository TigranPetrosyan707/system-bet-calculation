import { FaCalculator } from 'react-icons/fa'
import { Button, Input, LoadingSpinner } from '@/components/shared'
import { useBetForm } from '@/hooks/useBetForm'
import { SystemTypeInputs } from './SystemTypeInputs'
import { OddsInputs } from './OddsInputs'
import type { SystemType } from '@/types/bet.types'

interface BetFormProps {
  onSubmit: (data: { odds: number[]; system: SystemType; stake: number }) => void
  isLoading?: boolean
}

export const BetForm = ({ onSubmit, isLoading = false }: BetFormProps) => {
  const {
    formData,
    error,
    handleSubmit,
    updateField,
    handleTotalSelectionsChange,
    handleOddChange,
    areOddsEnabled,
    isStakeEnabled,
    isValid,
  } = useBetForm({ onSubmit, isLoading })

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-slate-200 dark:border-dark-border transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-1 transition-colors duration-300">
          System Bet Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-dark-textSecondary transition-colors duration-300">
          Enter your bet details
        </p>
      </div>
      
      <div className="space-y-5">
        <SystemTypeInputs
          requiredWins={formData.requiredWins}
          totalSelections={formData.totalSelections}
          onRequiredWinsChange={(value) => updateField('requiredWins', value)}
          onTotalSelectionsChange={handleTotalSelectionsChange}
          disabled={isLoading}
        />

        {areOddsEnabled() && (
          <OddsInputs
            odds={formData.odds}
            onOddChange={handleOddChange}
            disabled={isLoading}
          />
        )}

        {isStakeEnabled() && (
          <div>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              label="Total Stake"
              value={formData.stake}
              onChange={(e) => updateField('stake', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        )}

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
          disabled={!isValid() || isLoading}
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

