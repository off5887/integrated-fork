// src/features/mileage/components/MileageStatsCards.tsx
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import type { MileageSummary } from '@/api/types/mileage'
import { MONTHLY_STAT_CONFIGS, STAT_CARD_CONFIGS } from '../config/statsConfig'

interface Props {
  summary: MileageSummary | undefined
}

export default function MileageStatsCards({ summary }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)

  const mainCards = STAT_CARD_CONFIGS.map((cfg) => ({
    ...cfg,
    value: summary?.[cfg.key] ?? 0,
    color: t[cfg.colorKey],
  }))

  const monthlyItems = MONTHLY_STAT_CONFIGS.map((cfg) => ({
    ...cfg,
    value: summary?.[cfg.key] ?? 0,
    color: t[cfg.colorKey],
  }))

  return (
    <Box sx={{ mb: 5 }}>
      {/* ── 보유 현황 메인 카드 3개 ── */}
      <Grid container spacing={2.5} sx={{ mb: 2 }}>
        {mainCards.map((card) => (
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
              {/* 아이콘 + 라벨 */}
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
                {card.getSub(card.value)}
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

      {/* ── 이달 현황 배너 ── */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2.5,
          bgcolor: t.statsBannerBg,
          border: `1px solid ${t.statCardBorder}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* 헤더 레이블 */}
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: t.textSecondary,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            mr: 1,
          }}
        >
          📅 이달 현황
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ borderColor: t.statCardBorder, mx: 0.5 }} />

        {/* 월간 항목 2개 */}
        {monthlyItems.map((item, idx) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {idx > 0 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: t.statCardBorder, mx: 2 }}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* 아이콘 */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: `${item.color}14`,
                  border: `1px solid ${item.color}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: t.textSecondary, display: 'block', lineHeight: 1.2 }}>
                  {item.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: item.color,
                    }}
                  >
                    {item.value.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: t.textSecondary }}>
                    {item.unit}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: t.textSecondary, fontSize: '0.7rem' }}>
                  {item.getSub(item.value)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
