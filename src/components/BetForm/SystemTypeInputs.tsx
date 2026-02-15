import { Input } from '@/components/shared'

interface SystemTypeInputsProps {
  requiredWins: string
  totalSelections: string
  onRequiredWinsChange: (value: string) => void
  onTotalSelectionsChange: (value: string) => void
  disabled?: boolean
}

export const SystemTypeInputs = ({
  requiredWins,
  totalSelections,
  onRequiredWinsChange,
  onTotalSelectionsChange,
  disabled = false,
}: SystemTypeInputsProps) => {
  return (
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
          onChange={(e) => onRequiredWinsChange(e.target.value)}
          min="1"
          disabled={disabled}
          required
        />
        <Input
          type="number"
          label="Total Selections"
          value={totalSelections}
          onChange={(e) => onTotalSelectionsChange(e.target.value)}
          min={requiredWins ? (parseInt(requiredWins) + 1).toString() : "1"}
          disabled={disabled || !requiredWins || isNaN(parseInt(requiredWins)) || parseInt(requiredWins) < 1}
          required
        />
      </div>
    </div>
  )
}

