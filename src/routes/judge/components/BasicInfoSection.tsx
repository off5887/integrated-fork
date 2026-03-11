// src/routes/Judge/components/BasicInfoSection.tsx
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Typography } from '@mui/material'

interface Props {
  problem: string
  solution: string
  isDarkMode: boolean
}

export default function BasicInfoSection({ problem, solution, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textBody = isDarkMode ? '#cbd5e1' : '#334155'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          1
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          기본 정보
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(245,158,11,0.05)' : 'rgba(245,158,11,0.04)',
            border: `1px solid ${isDarkMode ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.12)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WarningAmberIcon sx={{ color: '#f59e0b', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#fde68a' : '#92400e', fontSize: '0.875rem' }}>
              문제점 도출
            </Typography>
          </Box>
          <Typography sx={{ lineHeight: 1.8, color: textBody, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
            {problem}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.1)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LightbulbIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#c7d2fe' : '#4338ca', fontSize: '0.875rem' }}>
              해결 대안
            </Typography>
          </Box>
          <Typography sx={{ lineHeight: 1.8, color: textBody, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
            {solution}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
