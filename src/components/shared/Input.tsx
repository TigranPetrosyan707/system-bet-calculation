import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-dark-text mb-1.5 transition-colors duration-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md
            bg-white dark:bg-dark-surfaceLight
            text-slate-900 dark:text-dark-text
            placeholder:text-slate-400 dark:placeholder:text-dark-textMuted
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400
            disabled:bg-slate-100 dark:disabled:bg-dark-surface disabled:cursor-not-allowed disabled:text-slate-500 dark:disabled:text-dark-textMuted
            transition-colors duration-300
            ${error ? 'border-red-500 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-600' : 'border-slate-300 dark:border-dark-border hover:border-slate-400 dark:hover:border-dark-surfaceLight'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 transition-colors duration-300">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
