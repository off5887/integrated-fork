// src/routes/Judge/components/ExecutionPlanSection.tsx
import DescriptionIcon from '@mui/icons-material/Description'
import { Box, Typography } from '@mui/material'

interface Props {
  executionPlan: string
  isDarkMode: boolean
}

export default function ExecutionPlanSection({ executionPlan, isDarkMode }: Props) {
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
          4
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          실행 계획
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3, borderRadius: 2.5,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.09)'}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <DescriptionIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca' }}>
            실행 단계
          </Typography>
        </Box>
        <Typography
          sx={{
            lineHeight: 1.9,
            fontSize: '0.9rem',
            color: textBody,
            whiteSpace: 'pre-line',
          }}
        >
          {executionPlan}
        </Typography>
      </Box>
    </Box>
  )
}
