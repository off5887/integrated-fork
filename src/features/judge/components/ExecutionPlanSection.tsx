// src/routes/Judge/components/ExecutionPlanSection.tsx
import DescriptionIcon from '@mui/icons-material/Description'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import { Box, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  executionPlan: string
  expectedOutcome?: string
}

export default function ExecutionPlanSection({ executionPlan, expectedOutcome }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

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
          {executionPlan ? (
            <Typography
              sx={{ lineHeight: 1.9, fontSize: '0.9rem', color: theme.textBody, whiteSpace: 'pre-line' }}
            >
              {executionPlan}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: theme.textBody, opacity: 0.45, fontStyle: 'italic' }}>
              실행 계획이 등록되지 않았습니다
            </Typography>
          )}
        </Box>

        {/* 기대 성과 */}
        {expectedOutcome && (
          <Box
            sx={{
              p: 3, borderRadius: 2.5,
              bgcolor: theme.outcomeBoxBg,
              border: `1px solid ${theme.outcomeBoxBorder}`,
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
