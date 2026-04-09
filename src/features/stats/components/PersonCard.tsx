// src/features/stats/components/PersonCard.tsx
import type { PersonStatsRow } from '@/api/types/stats'
import { usePageColors } from '@/theme/pageColors'
import { Box, Chip, Paper, Typography } from '@mui/material'
import { COLS, type ColDef } from './personStatsConfig'

// ── StatCell ──────────────────────────────────────────────────────────────────

export function StatCell({ col, value }: { col: ColDef; value: number }) {
  const { textSecondary } = usePageColors()
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: textSecondary, display: 'block', mb: 0.2 }}
      >
        {col.label}
      </Typography>
      <Typography variant="body2" fontWeight={700} sx={{ color: col.color }}>
        {col.key === 'expectedAmount' ? value.toLocaleString() : value}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: textSecondary, ml: 0.3 }}
        >
          {col.unit}
        </Typography>
      </Typography>
    </Box>
  )
}

// ── PersonCard ────────────────────────────────────────────────────────────────

export default function PersonCard({
  row,
  borderColor,
  textPrimary,
  textSecondary,
  cardBg,
  headerBg,
}: {
  row: PersonStatsRow
  borderColor: string
  textPrimary: string
  textSecondary: string
  cardBg: string
  headerBg: string
}) {
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
      {/* 헤더 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'rgba(99,102,241,0.12)',
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {row.name.slice(0, 1)}
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ color: textPrimary, lineHeight: 1.2 }}
            >
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {row.department}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={row.position}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.7rem',
            fontWeight: 600,
            bgcolor: 'rgba(99,102,241,0.07)',
            color: '#6366f1',
            border: '1px solid rgba(99,102,241,0.18)',
          }}
        />
      </Box>

      {/* 스탯 그리드 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1.5,
        }}
      >
        {COLS.map((col) => (
          <StatCell key={col.key} col={col} value={row[col.key]} />
        ))}
      </Box>
    </Paper>
  )
}
