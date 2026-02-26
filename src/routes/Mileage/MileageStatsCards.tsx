// src/routes/MileageStatsCards.tsx
import {
  alpha,
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  totalFish: number
  thisMonthFish: number
  thisMonthExchanged: number
}

export default function MileageStatsCards({
  totalFish,
  thisMonthFish,
  thisMonthExchanged,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const isMobile = useMediaQuery('(max-width:600px)')

  const cards = [
    {
      emoji: '🐟',
      title: '내가 잡은 생선',
      value: totalFish,
      color: isDarkMode ? '#c7d2fe' : '#6366f1',
      bgAlpha: '#6366f1',
    },
    {
      emoji: '🌱',
      title: '이달에 잡은 생선',
      value: thisMonthFish,
      color: isDarkMode ? '#a7f3d0' : '#10b981',
      bgAlpha: '#10b981',
    },
    {
      emoji: '💰',
      title: '이달에 바꾼 생선',
      value: thisMonthExchanged,
      color: isDarkMode ? '#fef08a' : '#ca8a04',
      bgAlpha: '#eab308',
    },
  ]

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 3}
      sx={{
        mb: isMobile ? 5 : 7,
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}
    >
      {cards.map((card, i) => (
        <Grid
          item
          xs={12}
          sm={4}
          key={i}
          sx={{
            // 모바일에서 너비 완전 통일 & 중앙 정렬
            maxWidth: isMobile ? 360 : 'none',
            flexBasis: isMobile ? '100%' : 'auto',
            flexGrow: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card
            elevation={isDarkMode ? 4 : 2}
            sx={{
              p: isMobile ? 2.5 : 4,
              borderRadius: 3,
              bgcolor: isDarkMode
                ? 'rgba(30,41,59,0.96)'
                : 'rgba(255,255,255,0.98)',
              border: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.30)' : 'rgba(148,163,184,0.25)'}`,
              transition: 'all 0.25s ease',
              width: '100%', // ← 핵심: width 100% 강제
              maxWidth: isMobile ? 360 : '100%', // ← 모바일 최대 너비 고정
              mx: 'auto',
              boxShadow: isDarkMode
                ? '0 6px 20px rgba(0,0,0,0.35)'
                : '0 4px 16px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDarkMode
                  ? '0 12px 32px rgba(99,102,241,0.25)'
                  : '0 12px 32px rgba(79,70,229,0.15)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: isMobile ? 1.5 : 2.5,
                gap: isMobile ? 1.5 : 2,
              }}
            >
              <Box
                sx={{
                  width: isMobile ? 44 : 52,
                  height: isMobile ? 44 : 52,
                  borderRadius: '50%',
                  bgcolor: alpha(card.bgAlpha, isDarkMode ? 0.22 : 0.14),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography variant={isMobile ? 'h5' : 'h4'}>
                  {card.emoji}
                </Typography>
              </Box>

              <Typography
                variant={isMobile ? 'subtitle1' : 'h6'}
                fontWeight={700}
                sx={{ color: isDarkMode ? '#f1f5f9' : '#0f172a' }}
              >
                {card.title}
              </Typography>
            </Box>

            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              fontWeight={800}
              sx={{
                color: card.color,
                lineHeight: 1.1,
                mt: isMobile ? 0.5 : 1,
                textAlign: 'center',
              }}
            >
              {card.value.toLocaleString()}
              <Typography
                component="span"
                variant={isMobile ? 'h6' : 'h5'}
                sx={{
                  ml: 1,
                  color: isDarkMode ? '#cbd5e1' : '#475569',
                  fontWeight: 500,
                }}
              >
                마리
              </Typography>
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

