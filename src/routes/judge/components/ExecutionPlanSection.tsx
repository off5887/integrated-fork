// src/routes/Judge/components/ExecutionPlanSection.tsx
import DescriptionIcon from '@mui/icons-material/Description'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  executionPlan: string
}

export default function ExecutionPlanSection({ executionPlan }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

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
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          실행 계획
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3, borderRadius: 2.5,
          bgcolor: theme.panelBg,
          border: `1px solid ${theme.panelBorder}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <DescriptionIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: theme.solutionLabelColor }}>
            실행 단계
          </Typography>
        </Box>
        <Typography
          sx={{
            lineHeight: 1.9,
            fontSize: '0.9rem',
            color: theme.textBody,
            whiteSpace: 'pre-line',
          }}
        >
          {executionPlan}
        </Typography>
      </Box>
    </Box>
  )
}
