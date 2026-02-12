import { alpha } from '@mui/material/styles'

export const getCardStyle = (isDarkMode: boolean) => ({
  borderRadius: 28,
  background: isDarkMode
    ? 'linear-gradient(145deg, rgba(30,41,59,0.88), rgba(15,23,42,0.78))'
    : 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(241,245,249,0.88))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.06)'}`,
  boxShadow: isDarkMode
    ? '0 12px 40px rgba(0,0,0,0.35)'
    : '0 12px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.015)',
    boxShadow: isDarkMode
      ? '0 28px 56px rgba(0,0,0,0.5)'
      : '0 28px 56px rgba(0,0,0,0.15)',
  },
})

export const getNivoTheme = (
  isDarkMode: boolean,
  textPrimary: string,
  textSecondary: string,
) => ({
  background: 'transparent',
  textColor: textPrimary,
  fontSize: 14,
  fontFamily: 'inherit',
  axis: {
    ticks: { text: { fill: textSecondary } },
  },
  grid: { line: { stroke: alpha(textPrimary, 0.07) } },
  tooltip: {
    container: {
      background: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: 20,
      boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
      padding: '16px',
    },
  },
})
