import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#60a5fa' : '#2563eb' },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: { primary: mode === 'dark' ? '#e2e8f0' : '#0f172a' },
    },
    typography: {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border:
              mode === 'dark'
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(0,0,0,0.06)',
            boxShadow:
              mode === 'dark'
                ? '0 4px 6px -1px rgba(0,0,0,0.3)'
                : '0 4px 6px -1px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow:
                mode === 'dark'
                  ? '0 20px 25px -5px rgba(0,0,0,0.4), 0 10px 10px -5px rgba(96,165,250,0.15)'
                  : '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(37,99,235,0.1)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
      },
    },
  })
