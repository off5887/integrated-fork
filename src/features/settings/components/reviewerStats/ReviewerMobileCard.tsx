// src/features/settings/components/reviewerStats/ReviewerMobileCard.tsx
import { Box, Chip, LinearProgress, Paper, Typography } from '@mui/material'
import type { ReviewerTeamStats } from '@/api/types/judge'
import { getSettingsTheme } from '@/theme/settingsTheme'

export interface DerivedStats {
  pending: number
  completed: number
  total: number
  rate: number
  avgDays: number
}

// ── 심사율 색상 ───────────────────────────────────────────────────────────────

export function rateColor(rate: number, st: { activeChipColor: string; inactiveChipColor: string }) {
  if (rate >= 80) return st.activeChipColor
  if (rate >= 50) return '#f59e0b'
  return st.inactiveChipColor
}

// ── 심사율 바 ─────────────────────────────────────────────────────────────────

export function RateBar({ value, color }: { value: number; color: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          bgcolor: 'rgba(99,102,241,0.1)',
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
        }}
      />
      <Typography variant="caption" fontWeight={700} sx={{ color, minWidth: 32, textAlign: 'right' }}>
        {value}%
      </Typography>
    </Box>
  )
}

// ── 모바일 카드 ───────────────────────────────────────────────────────────────

interface MobileCardProps {
  row: ReviewerTeamStats & { derived: DerivedStats }
  borderColor: string
  textPrimary: string
  textSecondary: string
  cardBg: string
  st: ReturnType<typeof getSettingsTheme>
}

export default function ReviewerMobileCard({ row, borderColor, textPrimary, textSecondary, cardBg, st }: MobileCardProps) {
  const d = row.derived
  const color = rateColor(d.rate, st)

  const statItems = [
    {
      label: '심사대기',
      node: (
        <Chip
          label={d.pending}
          size="small"
          sx={{
            bgcolor: d.pending > 0 ? 'rgba(245,158,11,0.1)' : st.chipBg,
            color: d.pending > 0 ? '#f59e0b' : textSecondary,
            fontWeight: 700, fontSize: '0.78rem', height: 22,
            border: d.pending > 0 ? '1px solid rgba(245,158,11,0.25)' : `1px solid ${borderColor}`,
          }}
        />
      ),
    },
    {
      label: '심사완료',
      node: (
        <Chip
          label={d.completed}
          size="small"
          sx={{
            bgcolor: st.activeChipBg, color: st.activeChipColor,
            fontWeight: 700, fontSize: '0.78rem', height: 22,
            border: `1px solid ${st.activeChipBorder}`,
          }}
        />
      ),
    },
    {
      label: '전체',
      node: (
        <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
          {d.total}
          <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>건</Typography>
        </Typography>
      ),
    },
    {
      label: '평균 심사일',
      node: (
        <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
          {d.avgDays}
          <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>일</Typography>
        </Typography>
      ),
    },
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        bgcolor: cardBg,
        overflow: 'hidden',
      }}
    >
      {/* 카드 헤더 */}
      <Box
        sx={{
          px: 2, py: 1.5,
          bgcolor: st.accordionTeamBg,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 30, height: 30, borderRadius: '50%',
              bgcolor: st.avatarBg, color: st.primaryColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
            }}
          >
            {row.reviewerName.slice(0, 1)}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.2 }}>
              {row.reviewerName}
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {row.reviewerPosition}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={row.department}
          size="small"
          sx={{
            bgcolor: st.chipBg,
            color: st.primaryColor,
            fontWeight: 700,
            fontSize: '0.72rem',
            height: 22,
            border: `1px solid ${st.avatarBorder}`,
          }}
        />
      </Box>

      {/* 통계 그리드 */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1.5,
            mb: 1.5,
          }}
        >
          {statItems.map((item) => (
            <Box key={item.label}>
              <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.3 }}>
                {item.label}
              </Typography>
              {item.node}
            </Box>
          ))}
        </Box>

        {/* 심사율 바 */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: textSecondary }}>심사율</Typography>
          </Box>
          <RateBar value={d.rate} color={color} />
        </Box>
      </Box>
    </Paper>
  )
}
