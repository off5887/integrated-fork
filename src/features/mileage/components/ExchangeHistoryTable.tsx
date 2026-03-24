// src/routes/Mileage/ExchangeHistoryTable.tsx
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HourglassEmptyIcon     from '@mui/icons-material/HourglassEmpty'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import SwapHorizIcon          from '@mui/icons-material/SwapHoriz'
import { Box, Button, Card, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import type { ExchangeItem } from '@/api/types/mileage'

interface Props {
  data: ExchangeItem[]
  onWithdraw?: (id: number) => void
}

type StatusFilter = '전체' | '신청중' | '완료' | '반려'
const STATUS_FILTERS: StatusFilter[] = ['전체', '신청중', '완료', '반려']

// ── 상태 메타 ────────────────────────────────────────────────────────────────

const STATUS_META = {
  전체:   { icon: SwapHorizIcon,           color: '',         activeBg: '', activeBorder: '', activeText: '' },
  신청중: { icon: HourglassEmptyIcon,      color: '#f59e0b',  activeBg: 'rgba(245,158,11,0.12)',  activeBorder: 'rgba(245,158,11,0.45)',  activeText: '#f59e0b' },
  완료:   { icon: CheckCircleOutlineIcon,  color: '#10b981',  activeBg: 'rgba(16,185,129,0.12)',  activeBorder: 'rgba(16,185,129,0.45)',  activeText: '#10b981' },
  반려:   { icon: RemoveCircleOutlineIcon, color: '#ef4444',  activeBg: 'rgba(239,68,68,0.12)',   activeBorder: 'rgba(239,68,68,0.45)',   activeText: '#ef4444' },
} as const

// ── StatusBadge ───────────────────────────────────────────────────────────────

interface BadgeStyle { color: string; bg: string; border: string }

function StatusBadge({ status, style }: { status: string; style: BadgeStyle }) {
  const meta = STATUS_META[status as StatusFilter]
  const Icon = meta?.icon ?? HourglassEmptyIcon
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.6,
        px: 1.25, py: 0.4,
        borderRadius: '999px',
        bgcolor: style.bg,
        border: `1px solid ${style.border}`,
        boxShadow: `0 0 0 2px ${style.border}22`,
      }}
    >
      <Icon sx={{ fontSize: '0.75rem', color: style.color, flexShrink: 0 }} />
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: style.color, lineHeight: 1 }}>
        {status}
      </Typography>
    </Box>
  )
}

// ── HEAD_COLS ─────────────────────────────────────────────────────────────────

const HEAD_COLS = ['번호', '신청일', '신청 마일리지', '현금 환산', '상태', '']

// ── ExchangeHistoryTable ──────────────────────────────────────────────────────

export default function ExchangeHistoryTable({ data, onWithdraw }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')

  const statusMap: Record<string, BadgeStyle> = {
    완료:   { color: t.statusSuccessColor, bg: t.statusSuccessBg, border: t.statusSuccessBorder },
    신청중: { color: t.statusWarningColor, bg: t.statusWarningBg, border: t.statusWarningBorder },
    반려:   { color: t.statusErrorColor,   bg: t.statusErrorBg,   border: t.statusErrorBorder   },
  }

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = { 전체: data.length, 신청중: 0, 완료: 0, 반려: 0 }
    data.forEach((i) => { if (i.status in c) c[i.status as StatusFilter]++ })
    return c
  }, [data])

  const filtered = useMemo(() => {
    return data.filter((item) => {
      if (statusFilter !== '전체' && item.status !== statusFilter) return false
      if (startDate && item.requestDate < startDate) return false
      if (endDate   && item.requestDate > endDate)   return false
      return true
    })
  }, [data, statusFilter, startDate, endDate])

  const hasFilter = statusFilter !== '전체' || startDate !== '' || endDate !== ''

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: t.inputBg,
      fontSize: '0.82rem',
      '& fieldset': { borderColor: t.borderColorStrict },
      '&:hover fieldset': { borderColor: t.primaryColor },
      '&.Mui-focused fieldset': { borderColor: t.primaryColor, borderWidth: 2 },
    },
    '& .MuiInputBase-input': { color: t.textPrimary, WebkitTextFillColor: t.textPrimary, py: '7.5px' },
    '& .MuiInputLabel-root': { color: t.textSecondary, fontSize: '0.82rem', '&.Mui-focused': { color: t.primaryColor } },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      opacity: isDarkMode ? 0.55 : 0.35,
      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none',
      cursor: 'pointer',
    },
  }

  return (
    <Box>
      {/* ── 필터 카드 ── */}
      <Box
        sx={{
          mb: 2.5,
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${t.borderColorStrict}`,
          bgcolor: isDarkMode ? 'rgba(15,23,42,0.6)' : '#fff',
          boxShadow: isDarkMode
            ? '0 2px 12px rgba(0,0,0,0.25)'
            : '0 1px 8px rgba(99,102,241,0.06)',
        }}
      >
        {/* 상단 그라디언트 스트립 */}
        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          {/* 상태 필터 버튼 그룹 */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.75,
              mb: 1.75,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {STATUS_FILTERS.map((sf) => {
              const active = statusFilter === sf
              const meta   = STATUS_META[sf]
              const Icon   = meta.icon
              return (
                <Box
                  key={sf}
                  component="button"
                  onClick={() => setStatusFilter(sf)}
                  sx={{
                    flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', gap: 0.6,
                    px: 1.5, py: 0.6,
                    borderRadius: '999px',
                    border: `1.5px solid ${active
                      ? (sf === '전체' ? t.primaryColor : meta.activeBorder)
                      : t.borderColorStrict}`,
                    bgcolor: active
                      ? (sf === '전체'
                          ? (isDarkMode ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.1)')
                          : meta.activeBg)
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    '&:hover': {
                      bgcolor: active
                        ? undefined
                        : (isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                    },
                  }}
                >
                  <Icon sx={{
                    fontSize: '0.85rem',
                    color: active
                      ? (sf === '전체' ? t.primaryColor : meta.activeText)
                      : t.textSecondary,
                    flexShrink: 0,
                  }} />
                  <Typography sx={{
                    fontSize: '0.78rem',
                    fontWeight: active ? 700 : 500,
                    color: active
                      ? (sf === '전체' ? t.primaryColor : meta.activeText)
                      : t.textSecondary,
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                  }}>
                    {sf}
                  </Typography>
                  {/* 건수 뱃지 */}
                  <Box sx={{
                    minWidth: 18, height: 18,
                    borderRadius: '999px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    px: 0.5,
                    bgcolor: active
                      ? (sf === '전체' ? t.primaryColor : meta.color)
                      : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'),
                  }}>
                    <Typography sx={{
                      fontSize: '0.62rem', fontWeight: 800, lineHeight: 1,
                      color: active ? '#fff' : t.textSecondary,
                    }}>
                      {counts[sf]}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>

          {/* 날짜 범위 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: t.textSecondary, whiteSpace: 'nowrap', flexShrink: 0 }}>
              기간
            </Typography>
            <TextField
              size="small" type="date" value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ ...inputSx, flex: 1, minWidth: 130 }}
            />
            <Box sx={{ width: 12, height: 1.5, bgcolor: t.borderColorStrict, flexShrink: 0, borderRadius: 1 }} />
            <TextField
              size="small" type="date" value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ ...inputSx, flex: 1, minWidth: 130 }}
            />
            {hasFilter && (
              <Button
                size="small" variant="text"
                onClick={() => { setStatusFilter('전체'); setStartDate(''); setEndDate('') }}
                sx={{
                  fontSize: '0.72rem', fontWeight: 600, color: t.textSecondary,
                  textTransform: 'none', px: 1, borderRadius: 1.5, flexShrink: 0,
                  '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' },
                }}
              >
                초기화
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* ── 테이블 ── */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3, overflow: 'hidden',
          bgcolor: t.cardBg,
          border: `1px solid ${t.borderColor}`,
          boxShadow: t.cardShadowLarge,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: t.headBg }}>
              {HEAD_COLS.map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    color: t.textSecondary, fontWeight: 600,
                    fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em',
                    borderBottom: `1px solid ${t.borderColor}`, py: 1.75,
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  transition: 'background-color 0.15s',
                  '&:hover': { bgcolor: t.rowHoverBg },
                  '& .MuiTableCell-root': {
                    borderBottom: `1px solid ${t.borderColor}`,
                    color: t.textPrimary, py: 1.5, fontSize: '0.875rem',
                  },
                  '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ color: t.textSecondary, fontWeight: 500, fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    #{String(item.id).padStart(3, '0')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: t.textPrimary }}>{item.requestDate}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: t.primaryColor }}>
                      {item.amount.toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 500, color: t.textSecondary }}>마리</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={700} sx={{ color: t.cashAmountColor }}>
                    {item.cashAmount.toLocaleString()}
                    <Box component="span" sx={{ fontWeight: 500, color: t.textSecondary, ml: 0.25, fontSize: '0.78rem' }}>원</Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} style={statusMap[item.status] ?? statusMap['신청중']} />
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {item.status === '신청중' && onWithdraw && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onWithdraw(item.id)}
                      sx={{
                        fontSize: '0.72rem', fontWeight: 600, borderRadius: '999px',
                        py: 0.3, px: 1.5, minWidth: 0,
                        color: t.statusErrorColor, borderColor: t.statusErrorBorder,
                        '&:hover': { bgcolor: t.statusErrorBg, borderColor: t.statusErrorColor },
                      }}
                    >
                      회수
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 8, border: 'none' }}>
                  <SwapHorizIcon sx={{ fontSize: '2rem', color: t.textSecondary, opacity: 0.25, mb: 1, display: 'block', mx: 'auto' }} />
                  <Typography variant="body2" sx={{ color: t.textSecondary }}>
                    {hasFilter ? '검색 결과가 없습니다' : '환전 신청 내역이 없습니다'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
