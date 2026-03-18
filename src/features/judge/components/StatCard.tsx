import { Box, Typography } from '@mui/material'
import { type ReactNode } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getJudgeTheme } from '@/theme/judgeTheme'

export interface StatCardProps {
  label: string
  count: number
  color: string
  bg: string
  border: string
  icon: ReactNode
  active: boolean
  onClick: () => void
}

export default function StatCard({ label, count, color, bg, border, icon, active, onClick }: StatCardProps) {
  const { isDarkMode } = useThemeMode()
  const theme = getJudgeTheme(isDarkMode)

  return (
    <Box
      onClick={onClick}
      sx={{
        flex: '1 1 120px',
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2.5,
        border: `1px solid ${active ? border : theme.statCardInactiveBorder}`,
        bgcolor: active ? bg : theme.statCardInactiveBg,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        transition: 'all 0.15s ease',
        '&:hover': {
          bgcolor: bg,
          borderColor: border,
        },
        boxShadow: active ? theme.statCardActiveShadow : 'none',
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: bg,
          border: `1px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontWeight: 800,
            color,
            lineHeight: 1,
            mb: 0.25,
          }}
        >
          {count}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.72rem',
            color: active ? color : theme.statCardLabelColor,
            fontWeight: active ? 700 : 500,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )
}
