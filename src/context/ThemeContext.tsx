// src/context/ThemeContext.tsx (추천 최종 버전)
import { darkTheme, lightTheme } from '@/theme'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gomgom_theme_v1')
    if (saved !== null) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('gomgom_theme_v1', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('gomgom_theme_v1', 'light')
    }
  }, [isDarkMode])

  const muiTheme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme: () => setIsDarkMode((p) => !p) }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useThemeMode must be used within ThemeProvider')
  return context
}
