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

const THEME_STORAGE_KEY = 'gomgom_theme_v1'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved !== null) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'light')
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
