// src/App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { ThemeProvider } from './context/ThemeContext'
import { SnackbarProvider } from './context/SnackbarContext'
import { lightTheme } from './theme'
import AppRoutes from './routes'

export default function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}
