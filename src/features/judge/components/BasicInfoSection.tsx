// src/routes/Judge/components/BasicInfoSection.tsx
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  problem: string
  solution: string
}

export default function BasicInfoSection({ problem, solution }: Props) {
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
          1
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          기본 정보
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: theme.problemPanelBg,
            border: `1px solid ${theme.problemPanelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WarningAmberIcon sx={{ color: '#f59e0b', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.problemLabelColor, fontSize: '0.875rem' }}>
              문제점 도출
            </Typography>
          </Box>
          <Typography sx={{ lineHeight: 1.8, color: theme.textBody, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
            {problem}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LightbulbIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.solutionLabelColor, fontSize: '0.875rem' }}>
              해결 대안
            </Typography>
          </Box>
          <Typography sx={{ lineHeight: 1.8, color: theme.textBody, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
            {solution}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
