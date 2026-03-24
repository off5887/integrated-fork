// src/routes/MileageStatsCards.tsx
import { Box, Grid, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import { STAT_CARD_CONFIGS } from '../config/statsConfig'

interface Props {
  totalFish: number
  thisMonthFish: number
  thisMonthExchanged: number
}

export default function MileageStatsCards({ totalFish, thisMonthFish, thisMonthExchanged }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)

  const values = [totalFish, thisMonthFish, thisMonthExchanged]
  const cards = STAT_CARD_CONFIGS.map((cfg, i) => ({
    ...cfg,
    value: values[i],
    color: t[cfg.colorKey],
    sub:   cfg.getSub(values[i]),
  }))

  return (
    <Grid container spacing={2.5} sx={{ mb: 5 }}>
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: t.statCardBg,
              border: `1px solid ${t.statCardBorder}`,
              boxShadow: t.statCardShadow,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: t.statCardHoverShadow,
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
                sx={{ color: t.textSecondary, letterSpacing: '0.01em' }}
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
              <Typography variant="body2" fontWeight={600} sx={{ color: t.textSecondary }}>
                {card.unit}
              </Typography>
            </Box>

            {/* 서브텍스트 */}
            <Typography variant="caption" sx={{ color: t.textSecondary }}>
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
