// src/routes/Judge/components/ExecutionPlanSection.tsx
import DescriptionIcon from '@mui/icons-material/Description'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  executionPlan: string
  expectedOutcome?: string
}

export default function ExecutionPlanSection({ executionPlan, expectedOutcome }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: theme.sectionNumBg, color: theme.sectionNumColor,
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 실행 내용 */}
        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <DescriptionIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: theme.solutionLabelColor }}>
              실행 내용
            </Typography>
          </Box>
          <Typography
            sx={{ lineHeight: 1.9, fontSize: '0.9rem', color: theme.textBody, whiteSpace: 'pre-line' }}
          >
            {executionPlan}
          </Typography>
        </Box>

        {/* 기대 성과 */}
        {expectedOutcome && (
          <Box
            sx={{
              p: 3, borderRadius: 2.5,
              bgcolor: isDarkMode ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.05)',
              border: `1px solid ${isDarkMode ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.25)'}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <EmojiObjectsIcon sx={{ color: '#10b981', fontSize: '1.1rem' }} />
              <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
                기대 성과
              </Typography>
            </Box>
            <Typography
              sx={{ lineHeight: 1.9, fontSize: '0.9rem', color: theme.textBody, whiteSpace: 'pre-line' }}
            >
              {expectedOutcome}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
