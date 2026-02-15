import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Button } from './shared'

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      size="md"
      noFocusRing
      className="fixed top-4 right-4 p-3 rounded-full shadow-md hover:shadow-lg z-50"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <FaSun className="text-yellow-500 text-xl transition-colors duration-300" />
      ) : (
        <FaMoon className="text-slate-700 dark:text-dark-text text-xl transition-colors duration-300" />
      )}
    </Button>
  )
}

