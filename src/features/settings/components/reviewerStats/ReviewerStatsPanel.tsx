// src/features/settings/components/reviewerStats/ReviewerStatsPanel.tsx
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import SpeedIcon from '@mui/icons-material/Speed'
import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { reviewerTeamStatsData } from '@/api/mock/judge'
import type { ReviewerTeamStats } from '@/api/types/judge'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'

type IdeaTypeFilter = 'all' | 'idea' | 'complete'

interface DerivedStats {
  pending: number
  completed: number
  total: number
  rate: number
  avgDays: number
}

function deriveStats(row: ReviewerTeamStats, filter: IdeaTypeFilter): DerivedStats {
  if (filter === 'idea') {
    return {
      pending: row.ideaPending,
      completed: row.ideaCompleted,
      total: row.ideaTotal,
      rate: row.ideaRate,
      avgDays: row.ideaAvgDays,
    }
  }
  if (filter === 'complete') {
    return {
      pending: row.completePending,
      completed: row.completeCompleted,
      total: row.completeTotal,
      rate: row.completeRate,
      avgDays: row.completeAvgDays,
    }
  }
  const pending = row.ideaPending + row.completePending
  const completed = row.ideaCompleted + row.completeCompleted
  const total = row.ideaTotal + row.completeTotal
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0
  const avgDays =
    total > 0
      ? Math.round(
          ((row.ideaAvgDays * row.ideaTotal + row.completeAvgDays * row.completeTotal) / total) * 10,
        ) / 10
      : 0
  return { pending, completed, total, rate, avgDays }
}

function rateColor(rate: number, st: { activeChipColor: string; inactiveChipColor: string }) {
  if (rate >= 80) return st.activeChipColor
  if (rate >= 50) return '#f59e0b'
  return st.inactiveChipColor
}

function RateBar({ value, color }: { value: number; color: string }) {
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

// ── 모바일 카드 ──────────────────────────────────────────────────────────────

interface MobileCardProps {
  row: ReviewerTeamStats & { derived: DerivedStats }
  borderColor: string
  textPrimary: string
  textSecondary: string
  cardBg: string
  st: ReturnType<typeof getSettingsTheme>
}

function MobileCard({ row, borderColor, textPrimary, textSecondary, cardBg, st }: MobileCardProps) {
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

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export default function ReviewerStatsPanel() {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, cardBg } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

  const [filter, setFilter] = useState<IdeaTypeFilter>('all')

  const rows = useMemo(
    () => reviewerTeamStatsData.map((r) => ({ ...r, derived: deriveStats(r, filter) })),
    [filter],
  )

  const totals = useMemo(() => {
    const pending = rows.reduce((s, r) => s + r.derived.pending, 0)
    const completed = rows.reduce((s, r) => s + r.derived.completed, 0)
    const total = rows.reduce((s, r) => s + r.derived.total, 0)
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0
    const avgDays =
      total > 0
        ? Math.round(
            (rows.reduce((s, r) => s + r.derived.avgDays * r.derived.total, 0) / total) * 10,
          ) / 10
        : 0
    return { pending, completed, total, rate, avgDays }
  }, [rows])

  const summaryCards = [
    { label: '전체 심사대기', value: totals.pending, unit: '건', icon: <HourglassEmptyIcon sx={{ fontSize: '1.2rem' }} />, color: '#f59e0b' },
    { label: '전체 심사완료', value: totals.completed, unit: '건', icon: <AssignmentTurnedInIcon sx={{ fontSize: '1.2rem' }} />, color: st.activeChipColor },
    { label: '평균 심사율', value: totals.rate, unit: '%', icon: <SpeedIcon sx={{ fontSize: '1.2rem' }} />, color: st.primaryColor },
    { label: '평균 심사일', value: totals.avgDays, unit: '일', icon: <QueryBuilderIcon sx={{ fontSize: '1.2rem' }} />, color: '#8b5cf6' },
  ]

  const pendingChipSx = (count: number) => ({
    bgcolor: count > 0 ? 'rgba(245,158,11,0.1)' : st.chipBg,
    color: count > 0 ? '#f59e0b' : textSecondary,
    fontWeight: 700, fontSize: '0.75rem', height: 22,
    border: count > 0 ? '1px solid rgba(245,158,11,0.25)' : `1px solid ${borderColor}`,
  })

  return (
    <Box>
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          mb: 3, pb: 3, borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: st.primaryColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <PeopleAltIcon sx={{ fontSize: '0.9rem' }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: textPrimary, lineHeight: 1.3 }}>
            심사자 현황
          </Typography>
          <Typography variant="caption" sx={{ color: textSecondary }}>
            팀별 심사대기 · 완료 · 심사율 · 평균 심사일
          </Typography>
        </Box>
      </Box>

      {/* 요약 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, sm: 2 },
          mb: 3,
        }}
      >
        {summaryCards.map((card) => (
          <Paper
            key={card.label}
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: 2,
              border: `1px solid ${borderColor}`,
              bgcolor: cardBg,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 }, borderRadius: 2,
                bgcolor: `${card.color}18`, color: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: textSecondary, display: 'block', whiteSpace: 'nowrap' }}>
                {card.label}
              </Typography>
              <Typography
                fontWeight={800}
                sx={{ color: card.color, lineHeight: 1.2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                {card.value}
                <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>
                  {card.unit}
                </Typography>
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* 아이디어 유형 필터 */}
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={filter}
          onChange={(_, v: IdeaTypeFilter) => setFilter(v)}
          variant={isMobile ? 'fullWidth' : 'standard'}
          sx={{
            minHeight: 38,
            bgcolor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
            '& .MuiTabs-indicator': { bgcolor: st.primaryColor, height: 2, borderRadius: 1 },
            '& .MuiTab-root': {
              minHeight: 38, py: 0,
              fontWeight: 600,
              fontSize: { xs: '0.78rem', sm: '0.82rem' },
              textTransform: 'none',
              color: textSecondary,
              '&.Mui-selected': { color: st.primaryColor },
            },
          }}
        >
          <Tab label="전체" value="all" />
          <Tab label="상상 아이디어" value="idea" />
          <Tab label="실행완료" value="complete" />
        </Tabs>
      </Box>

      {/* 모바일: 카드 목록 */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {rows.map((row) => (
            <MobileCard
              key={row.id}
              row={row}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              cardBg={cardBg}
              st={st}
            />
          ))}

          {/* 모바일 합계 카드 */}
          <Paper
            elevation={0}
            sx={{
              border: `2px solid ${borderColor}`,
              borderRadius: 2,
              bgcolor: st.accordionTeamBg,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ px: 2, py: 1.2, borderBottom: `1px solid ${borderColor}` }}>
              <Typography variant="body2" fontWeight={800} sx={{ color: textPrimary }}>
                합계 / 평균
              </Typography>
            </Box>
            <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5, mb: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.3 }}>심사대기</Typography>
                  <Chip label={totals.pending} size="small" sx={pendingChipSx(totals.pending)} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.3 }}>심사완료</Typography>
                  <Chip
                    label={totals.completed}
                    size="small"
                    sx={{ bgcolor: st.activeChipBg, color: st.activeChipColor, fontWeight: 700, fontSize: '0.78rem', height: 22, border: `1px solid ${st.activeChipBorder}` }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.3 }}>전체</Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
                    {totals.total}<Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>건</Typography>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.3 }}>평균 심사일</Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
                    {totals.avgDays}<Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>일</Typography>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 0.5 }}>심사율</Typography>
                <RateBar value={totals.rate} color={rateColor(totals.rate, st)} />
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        /* 데스크톱: 테이블 */
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: `1px solid ${borderColor}`, borderRadius: 2, bgcolor: cardBg }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: st.accordionTeamBg }}>
                {['팀명', '심사자', '심사대기', '심사완료', '전체', '심사율', '평균 심사일'].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      color: textSecondary, fontWeight: 700, fontSize: '0.75rem',
                      py: 1.5, borderBottom: `1px solid ${borderColor}`, whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                const d = row.derived
                const color = rateColor(d.rate, st)
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      bgcolor: idx % 2 === 0 ? 'transparent' : st.memberRowBg,
                      '&:hover': { bgcolor: st.memberRowHoverBg },
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
                        {row.department}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <Box
                          sx={{
                            width: 26, height: 26, borderRadius: '50%',
                            bgcolor: st.avatarBg, color: st.primaryColor,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                          }}
                        >
                          {row.reviewerName.slice(0, 1)}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={600} sx={{ color: textPrimary, lineHeight: 1.2 }}>
                            {row.reviewerName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: textSecondary }}>
                            {row.reviewerPosition}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Chip label={d.pending} size="small" sx={pendingChipSx(d.pending)} />
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Chip
                        label={d.completed}
                        size="small"
                        sx={{ bgcolor: st.activeChipBg, color: st.activeChipColor, fontWeight: 700, fontSize: '0.75rem', height: 22, border: `1px solid ${st.activeChipBorder}` }}
                      />
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: textSecondary }}>
                        {d.total}건
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5, minWidth: 130 }}>
                      <RateBar value={d.rate} color={color} />
                    </TableCell>

                    <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, py: 1.5 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: textPrimary }}>
                        {d.avgDays}
                        <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>일</Typography>
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}

              {/* 합계 행 */}
              <TableRow sx={{ bgcolor: st.accordionTeamBg }}>
                <TableCell colSpan={2} sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={800} sx={{ color: textPrimary }}>합계 / 평균</Typography>
                </TableCell>
                <TableCell sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}>
                  <Chip label={totals.pending} size="small" sx={pendingChipSx(totals.pending)} />
                </TableCell>
                <TableCell sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}>
                  <Chip
                    label={totals.completed}
                    size="small"
                    sx={{ bgcolor: st.activeChipBg, color: st.activeChipColor, fontWeight: 800, fontSize: '0.75rem', height: 22, border: `1px solid ${st.activeChipBorder}` }}
                  />
                </TableCell>
                <TableCell sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ color: textSecondary }}>{totals.total}건</Typography>
                </TableCell>
                <TableCell sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5, minWidth: 130 }}>
                  <RateBar value={totals.rate} color={rateColor(totals.rate, st)} />
                </TableCell>
                <TableCell sx={{ borderTop: `2px solid ${borderColor}`, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
                    {totals.avgDays}
                    <Typography component="span" variant="caption" sx={{ color: textSecondary, ml: 0.3 }}>일</Typography>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
