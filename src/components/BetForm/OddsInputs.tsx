import { Input } from '@/components/shared'

interface OddsInputsProps {
  odds: string[]
  onOddChange: (index: number, value: string) => void
  disabled?: boolean
}

export const OddsInputs = ({ odds, onOddChange, disabled = false }: OddsInputsProps) => {
  return (
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
            onChange={(e) => onOddChange(index, e.target.value)}
            placeholder={`Odd ${index + 1}`}
            disabled={disabled}
            required
          />
        ))}
      </div>
    </div>
  )
}

