import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  noFocusRing?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  noFocusRing = false,
  ...props
}: ButtonProps) => {
  const baseStyles = `font-medium rounded-md transition-colors duration-300 focus:outline-none ${noFocusRing ? '' : 'focus:ring-2 focus:ring-offset-2'} disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center`
  
  const variantStyles = {
    primary: `bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 ${noFocusRing ? '' : 'focus:ring-blue-500 dark:focus:ring-blue-400'}`,
    secondary: `bg-slate-200 dark:bg-dark-surfaceLight text-slate-900 dark:text-dark-text hover:bg-slate-300 dark:hover:bg-dark-surface ${noFocusRing ? '' : 'focus:ring-slate-500 dark:focus:ring-slate-400'}`,
    danger: `bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 ${noFocusRing ? '' : 'focus:ring-red-500 dark:focus:ring-red-400'}`,
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
