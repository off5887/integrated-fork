// src/routes/Judge/components/BasicInfoSection.tsx
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Chip, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import { CATEGORIES } from '@/api/mock/idea'

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]))

interface Props {
  ideaType?: 'idea' | 'complete'
  categories?: string[]
  problem: string
  solution: string
}

export default function BasicInfoSection({ ideaType, categories, problem, solution }: Props) {
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
          1
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          기본 정보
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 상상 구분 + 카테고리 */}
        {(ideaType || (categories && categories.length > 0)) && (
          <Box
            sx={{
              p: 2, borderRadius: 2.5,
              bgcolor: theme.panelBg,
              border: `1px solid ${theme.panelBorder}`,
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5,
            }}
          >
            {/* 상상 구분 뱃지 */}
            {ideaType && (
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  px: 1.25, py: 0.5, borderRadius: 1.5,
                  bgcolor: ideaType === 'idea'
                    ? 'rgba(99,102,241,0.1)'
                    : 'rgba(16,185,129,0.1)',
                  border: `1px solid ${ideaType === 'idea' ? 'rgba(99,102,241,0.3)' : 'rgba(16,185,129,0.3)'}`,
                }}
              >
                <Typography sx={{ fontSize: '0.85rem', lineHeight: 1 }}>
                  {ideaType === 'idea' ? '💡' : '✅'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.78rem', fontWeight: 700,
                    color: ideaType === 'idea' ? '#6366f1' : '#10b981',
                  }}
                >
                  {ideaType === 'idea' ? '아이디어' : '실행완료'}
                </Typography>
              </Box>
            )}

            {/* 카테고리 칩 */}
            {categories && categories.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {categories.map((catId) => {
                  const cat = CATEGORY_MAP.get(catId)
                  return (
                    <Chip
                      key={catId}
                      label={cat ? `${cat.emoji} ${catId}` : catId}
                      size="small"
                      sx={{
                        bgcolor: cat ? cat.bg : 'transparent',
                        color: cat ? cat.color : colors.textSecondary,
                        border: `1px solid ${cat ? cat.border : colors.textSecondary}`,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        height: 22,
                      }}
                    />
                  )
                })}
              </Box>
            )}
          </Box>
        )}

        {/* 문제점 도출 */}
        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: theme.problemPanelBg,
            border: `1px solid ${theme.problemPanelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WarningAmberIcon sx={{ color: theme.warningIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.problemLabelColor, fontSize: '0.875rem' }}>
              문제점 도출
            </Typography>
          </Box>
          <Typography sx={{ lineHeight: 1.8, color: theme.textBody, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
            {problem}
          </Typography>
        </Box>

        {/* 해결 대안 */}
        <Box
          sx={{
            p: 3, borderRadius: 2.5,
            bgcolor: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LightbulbIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
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
