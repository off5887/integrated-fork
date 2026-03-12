// src/routes/MileageStatsCards.tsx
import { Box, Grid, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

interface Props {
  totalFish: number
  thisMonthFish: number
  thisMonthExchanged: number
}

const CARDS = (totalFish: number, thisMonthFish: number, thisMonthExchanged: number) => [
  {
    label: '내가 잡은 생선',
    value: totalFish,
    unit: '마리',
    icon: '🐟',
    color: '#6366f1',
    sub: `현금 환산 ≈ ${(totalFish * 100).toLocaleString()}원`,
  },
  {
    label: '이달에 잡은 생선',
    value: thisMonthFish,
    unit: '마리',
    icon: '🌱',
    color: '#10b981',
    sub: '이번 달 누적 획득량',
  },
  {
    label: '이달에 바꾼 생선',
    value: thisMonthExchanged,
    unit: '마리',
    icon: '💰',
    color: '#f59e0b',
    sub: `현금 환산 ≈ ${(thisMonthExchanged * 100).toLocaleString()}원`,
  },
]

export default function MileageStatsCards({ totalFish, thisMonthFish, thisMonthExchanged }: Props) {
  const { isDarkMode } = useThemeMode()
  const cards = CARDS(totalFish, thisMonthFish, thisMonthExchanged)

  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.92)' : 'rgba(255,255,255,0.97)'
  const cardBorder = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(226,232,240,0.8)'

  return (
    <Grid container spacing={2.5} sx={{ mb: 5 }}>
      {cards.map((card, i) => (
        <Grid key={i} size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${cardBorder}`,
              boxShadow: isDarkMode
                ? '0 2px 16px rgba(0,0,0,0.3)'
                : '0 2px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDarkMode
                  ? `0 8px 24px rgba(0,0,0,0.4)`
                  : `0 8px 24px rgba(0,0,0,0.08)`,
              },
            }}
          >
            {/* 상단: 아이콘 + 라벨 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: `${card.color}18`,
                  border: `1px solid ${card.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: textSecondary, letterSpacing: '0.01em' }}
              >
                {card.label}
              </Typography>
            </Box>

            {/* 수치 */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.75 }}>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: card.color,
                }}
              >
                {card.value.toLocaleString()}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ color: textSecondary }}>
                {card.unit}
              </Typography>
            </Box>

            {/* 서브텍스트 */}
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {card.sub}
            </Typography>

            {/* 하단 컬러 바 */}
            <Box
              sx={{
                mt: 2.5,
                height: 3,
                borderRadius: '999px',
                background: `linear-gradient(90deg, ${card.color}, ${card.color}60)`,
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
