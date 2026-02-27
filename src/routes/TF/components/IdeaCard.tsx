// src/routes/idea/components/IdeaCard.tsx
import { AccessTime, EmojiEvents } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext' // ← 다크모드 훅 (기존 사용 중)

interface Props {
  idea: Idea
  onApply: (id: number) => void
}

export default function IdeaCard({ idea, onApply }: Props) {
  const { isDarkMode } = useThemeMode() // ← 다크모드 상태 가져오기

  // 다크/라이트별 색상 세트 (더 세련되게 조정)
  const colors = {
    cardBg: isDarkMode ? 'rgba(30,41,59,0.85)' : 'rgba(255,255,255,0.97)',
    border: isDarkMode ? 'rgba(148,163,184,0.30)' : 'rgba(148,163,184,0.28)',
    textPrimary: isDarkMode ? '#f1f5f9' : '#0f172a',
    textSecondary: isDarkMode ? '#cbd5e1' : '#475569',
    chipBg: isDarkMode ? '#334155' : '#e2e8f0',
    rewardText: isDarkMode ? '#c084fc' : '#7c3aed', // 보라 계열로 세련되게
    hoverShadow: isDarkMode
      ? '0 20px 35px -8px rgba(0,0,0,0.6), 0 10px 15px -5px rgba(99,102,241,0.35)'
      : '0 20px 35px -8px rgba(0,0,0,0.15), 0 10px 15px -5px rgba(79,70,229,0.25)',
    hoverBg: isDarkMode ? 'rgba(51,65,85,0.15)' : 'rgba(241,245,249,0.7)',
  }

  return (
    <Card
      sx={{
        width: { xs: '340px', sm: '360px', md: '600px' },
        maxWidth: '100%',
        minWidth: '280px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.cardBg,
        border: '1px solid',
        borderColor: colors.border,
        borderRadius: 3,
        overflow: 'hidden',
        mx: 'auto',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: 'none',
        backdropFilter: 'blur(12px)', // 글래스모피즘 효과 추가

        '&:hover': {
          transform: 'translateY(-12px)',
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
          gap: { xs: 1.5, sm: 2.5, md: 3 },
        }}
      >
        {/* 상단 - 분야 + 보상 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            label={idea.field}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: '#ffffff',
              fontWeight: 600,
              borderRadius: '12px',
            }}
          />

          <Box sx={{ textAlign: 'right', minWidth: 'fit-content' }}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                color: colors.rewardText,
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
            mb: 2,
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
            pt: 1.5,
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
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            지원하기
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
