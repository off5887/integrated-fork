// src/routes/tf/components/TFIdeaCard.tsx
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Button, Chip, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getTFTheme } from '@/theme/tfTheme'
import { Idea } from '@/api/types/mercenary'

interface Props {
  idea: Idea
  onApply: (id: number) => void
}

export default function TFIdeaCard({ idea, onApply }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const tf = getTFTheme(isDarkMode)

  const isUrgent = idea.remainingDays <= 7

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: colors.shadowSmall,
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: tf.cardHoverShadow,
          borderColor: colors.accentBorder,
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: tf.headerGradient }} />

      <Box
        sx={{
          flex: 1, display: 'flex', flexDirection: 'column',
          p: { xs: 2.5, md: 3 },
          gap: 2.5,
        }}
      >
        {/* 상단 - 분야 + 보상 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
          <Chip
            label={idea.field}
            size="small"
            sx={{
              bgcolor: colors.accentBg,
              color: colors.accentColor,
              border: `1px solid ${colors.accentBorder}`,
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.01em',
            }}
          />

          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                background: tf.rewardGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
                fontSize: '1.2rem',
              }}
            >
              +{idea.reward.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, justifyContent: 'flex-end', mt: 0.3 }}>
              <EmojiEventsIcon sx={{ fontSize: '0.75rem', color: colors.textSecondary }} />
              <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.7rem' }}>
                마일리지
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 제목 */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            color: colors.textPrimary,
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            letterSpacing: '-0.01em',
          }}
        >
          {idea.title}
        </Typography>

        {/* 설명 */}
        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            lineHeight: 1.65,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.85rem',
          }}
        >
          {idea.desc}
        </Typography>

        {/* 하단 */}
        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
            pt: 2,
            borderTop: `1px solid ${colors.borderColor}`,
          }}
        >
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: '0.85rem !important' }} />}
            label={`${idea.remainingDays}일 남음`}
            size="small"
            sx={{
              bgcolor: isUrgent ? tf.urgentBgStrong : 'transparent',
              color: isUrgent ? tf.urgentColor : colors.textSecondary,
              border: `1px solid ${isUrgent ? tf.urgentBorderStrong : colors.borderColor}`,
              fontWeight: isUrgent ? 700 : 500,
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />

          <Button
            variant="contained"
            size="small"
            onClick={() => onApply(idea.id)}
            sx={{
              borderRadius: 9999,
              px: 2.5,
              py: 0.85,
              fontWeight: 700,
              fontSize: '0.82rem',
              bgcolor: tf.primaryBtnBg,
              color: tf.primaryBtnColor,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: tf.primaryBtnHoverBg,
                boxShadow: tf.primaryBtnHoverShadow,
              },
              transition: 'all 0.2s ease',
            }}
          >
            지원하기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
