// src/routes/idea/components/IdeaCard.tsx
import { AccessTime, EmojiEvents } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext' // ← 다크모드 훅 (기존 사용 중)

interface Props {
  idea: Idea
  onApply: (id: number) => void
}

export default function IdeaCard({ idea, onApply }: Props) {
  const { isDarkMode } = useThemeMode()

  // 2026 트렌드 반영: Liquid Glass + elevated neutrals + indigo/teal premium
  const colors = {
    cardBg: isDarkMode ? 'rgba(30, 41, 59, 0.88)' : 'rgba(251, 251, 254, 0.94)', // warm off-white + 미세 teal tint

    border: isDarkMode
      ? 'rgba(148, 163, 184, 0.42)'
      : 'rgba(226, 232, 240, 0.88)', // soft slate border

    textPrimary: isDarkMode ? '#f1f5f9' : '#111827', // modern slate-900
    textSecondary: isDarkMode ? '#cbd5e1' : '#64748b', // slate-500

    chipBg: isDarkMode ? '#334155' : 'rgba(241, 245, 249, 0.80)',

    // 보상: indigo 기반 soft gradient (2026 premium 느낌 최고)
    rewardGradient: isDarkMode
      ? 'linear-gradient(90deg, #c4b5fd, #a78bfa)'
      : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    // 대안 teal (Transformative Teal 느낌): 'linear-gradient(90deg, #0ea5e9, #38bdf8)'

    hoverShadow: isDarkMode
      ? '0 20px 40px -10px rgba(0,0,0,0.55), 0 10px 20px -5px rgba(99,102,241,0.45)'
      : '0 24px 48px -12px rgba(0,0,0,0.10), 0 12px 24px -6px rgba(99,102,241,0.18)',

    hoverBg: isDarkMode ? 'rgba(51,65,85,0.20)' : 'rgba(241,245,249,0.50)',
  }

  return (
    <Card
      sx={{
        width: { xs: '360px', sm: '360px', md: '600px' },
        maxWidth: '100%',
        minWidth: '280px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.cardBg,
        border: '1px solid',
        borderColor: colors.border,
        borderRadius: 4, // 조금 더 부드럽게 4로
        overflow: 'hidden',
        mx: 'auto',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: 'none',
        backdropFilter: 'blur(16px)', // Liquid Glass 느낌 ↑ blur 강화
        WebkitBackdropFilter: 'blur(16px)',

        '&:hover': {
          transform: 'translateY(-14px)',
          boxShadow: colors.hoverShadow,
          bgcolor: colors.hoverBg,
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, sm: 3, md: 4 },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {/* 상단 - 분야 + 보상 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            label={idea.field}
            size="small"
            sx={{
              bgcolor: isDarkMode ? '#4f46e5' : '#6366f1', // indigo-600 / 500
              color: '#ffffff',
              fontWeight: 600,
              borderRadius: '14px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          />

          <Box sx={{ textAlign: 'right', minWidth: 'fit-content' }}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                background: colors.rewardGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              +{idea.reward.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.textSecondary,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: 'flex-end',
                mt: 0.5,
              }}
            >
              <EmojiEvents fontSize="small" /> 보상
            </Typography>
          </Box>
        </Box>

        {/* 제목 */}
        <Typography
          variant="h6"
          component="h3"
          fontWeight={700}
          sx={{
            color: colors.textPrimary,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {idea.title}
        </Typography>

        {/* 설명 */}
        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            flexGrow: 1,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: { xs: 4, sm: 5, md: 6 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 3,
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
            flexWrap: 'wrap',
            gap: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: colors.border,
          }}
        >
          <Chip
            icon={<AccessTime fontSize="small" />}
            label={`${idea.remainingDays}일 남음`}
            size="small"
            variant="outlined"
            sx={{
              color: colors.textSecondary,
              borderColor: colors.border,
              fontWeight: 500,
              borderRadius: '12px',
            }}
          />

          <Button
            variant="contained"
            size="medium"
            onClick={() => onApply(idea.id)}
            sx={{
              borderRadius: 9999,
              px: { xs: 4, sm: 5 },
              minWidth: { xs: 110, sm: 130 },
              fontWeight: 600,
              bgcolor: isDarkMode ? '#4f46e5' : '#6366f1', // indigo
              color: '#fff',
              '&:hover': {
                bgcolor: isDarkMode ? '#4338ca' : '#4f46e5',
                transform: 'scale(1.06)',
                boxShadow: '0 12px 32px rgba(79,70,229,0.35)',
              },
              transition: 'all 0.35s ease',
            }}
          >
            지원하기
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
