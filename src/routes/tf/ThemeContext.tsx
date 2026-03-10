import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createContext, ReactNode, useContext, useState } from 'react'
import { getTheme } from './theme'

type ThemeContextType = {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: 'dark',
})

export const useThemeMode = () => useContext(ThemeContext)

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const toggleColorMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  const theme = getTheme(mode)

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
