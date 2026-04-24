// src/App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router'

import { ThemeProvider } from './context/ThemeContext'
import { SnackbarProvider } from './context/SnackbarContext'
import { ReactQueryProvider } from './api/ReactQueryProvider'
import { lightTheme } from './theme'
import { router } from './routes'

export default function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <ReactQueryProvider>
            <RouterProvider router={router} />
          </ReactQueryProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}
