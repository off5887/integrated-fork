// src/features/settings/components/exchangeRequests/ExchangeRequestsManagement.tsx
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useSnackbar } from '@/context/SnackbarContext'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { adminExchangeData } from '@/api/mock/mileage'
import type { AdminExchangeItem } from '@/api/types/mileage'
import UserMileageDrawer from './UserMileageDrawer'

type StatusFilter = '전체' | '신청중' | '완료' | '반려'

const STATUS_MAP = {
  신청중: { label: '신청중', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  완료:   { label: '완료',   color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  반려:   { label: '반려',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)' },
}

const STATUS_FILTERS: StatusFilter[] = ['전체', '신청중', '완료', '반려']

export default function ExchangeRequestsManagement() {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])
  const { showSnackbar } = useSnackbar()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))

  const [items, setItems] = useState<AdminExchangeItem[]>(adminExchangeData)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [confirmMode, setConfirmMode] = useState<'single-approve' | 'single-reject' | 'bulk-approve' | 'bulk-reject' | null>(null)
  const [confirmTarget, setConfirmTarget] = useState<AdminExchangeItem | null>(null)
  const [drawerUser, setDrawerUser] = useState<AdminExchangeItem | null>(null)

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter !== '전체' && item.status !== statusFilter) return false
      if (searchTerm) {
        const q = searchTerm.toLowerCase()
        if (!item.name.includes(searchTerm) && !item.department.toLowerCase().includes(q) && !item.employeeNumber.toLowerCase().includes(q)) return false
      }
      if (startDate && item.requestDate < startDate) return false
      if (endDate && item.requestDate > endDate) return false
      return true
    })
  }, [items, statusFilter, searchTerm, startDate, endDate])

  const counts = useMemo(() => {
    const c = { 전체: items.length, 신청중: 0, 완료: 0, 반려: 0 }
    items.forEach((i) => { c[i.status] = (c[i.status] ?? 0) + 1 })
    return c
  }, [items])

  const selectedPendingIds = useMemo(
    () => filtered.filter((i) => selectedIds.has(i.id) && i.status === '신청중').map((i) => i.id),
    [filtered, selectedIds],
  )

  const pendingInView = filtered.filter((i) => i.status === '신청중')
  const allPendingSelected = pendingInView.length > 0 && pendingInView.every((i) => selectedIds.has(i.id))
  const somePendingSelected = pendingInView.some((i) => selectedIds.has(i.id))

  const handleToggleAll = () => {
    if (allPendingSelected) {
      setSelectedIds((prev) => { const next = new Set(prev); pendingInView.forEach((i) => next.delete(i.id)); return next })
    } else {
      setSelectedIds((prev) => { const next = new Set(prev); pendingInView.forEach((i) => next.add(i.id)); return next })
    }
  }

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const handleSingleApprove = (item: AdminExchangeItem) => { setConfirmTarget(item); setConfirmMode('single-approve') }
  const handleSingleReject  = (item: AdminExchangeItem) => { setConfirmTarget(item); setConfirmMode('single-reject') }
  const handleBulkApprove = () => setConfirmMode('bulk-approve')
  const handleBulkReject  = () => setConfirmMode('bulk-reject')

  const handleConfirm = () => {
    if (confirmMode === 'single-approve' && confirmTarget) {
      setItems((prev) => prev.map((i) => i.id === confirmTarget.id ? { ...i, status: '완료' as const } : i))
      setSelectedIds((prev) => { const next = new Set(prev); next.delete(confirmTarget.id); return next })
      showSnackbar(`${confirmTarget.name}님의 현금 전환 신청이 지급 완료 처리되었습니다.`, 'success')
    } else if (confirmMode === 'single-reject' && confirmTarget) {
      setItems((prev) => prev.map((i) => i.id === confirmTarget.id ? { ...i, status: '반려' as const } : i))
      setSelectedIds((prev) => { const next = new Set(prev); next.delete(confirmTarget.id); return next })
      showSnackbar(`${confirmTarget.name}님의 현금 전환 신청이 반려 처리되었습니다.`, 'error')
    } else if (confirmMode === 'bulk-approve') {
      const ids = new Set(selectedPendingIds)
      setItems((prev) => prev.map((i) => ids.has(i.id) ? { ...i, status: '완료' as const } : i))
      setSelectedIds((prev) => { const next = new Set(prev); ids.forEach((id) => next.delete(id)); return next })
      showSnackbar(`${ids.size}건의 현금 전환 신청이 일괄 지급 완료 처리되었습니다.`, 'success')
    } else if (confirmMode === 'bulk-reject') {
      const ids = new Set(selectedPendingIds)
      setItems((prev) => prev.map((i) => ids.has(i.id) ? { ...i, status: '반려' as const } : i))
      setSelectedIds((prev) => { const next = new Set(prev); ids.forEach((id) => next.delete(id)); return next })
      showSnackbar(`${ids.size}건의 현금 전환 신청이 일괄 반려 처리되었습니다.`, 'error')
    }
    setConfirmMode(null)
    setConfirmTarget(null)
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2, bgcolor: colors.cardBg, fontSize: '0.875rem',
      '& fieldset': { borderColor: colors.borderColor },
      '&:hover fieldset': { borderColor: colors.accentColor },
      '&.Mui-focused fieldset': { borderColor: colors.accentColor },
    },
    '& .MuiInputBase-input': { color: colors.textPrimary, WebkitTextFillColor: colors.textPrimary },
    '& .MuiInputLabel-root': { color: colors.textSecondary, '&.Mui-focused': { color: colors.accentColor } },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      opacity: isDarkMode ? 0.6 : 0.4,
      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none',
      cursor: 'pointer',
    },
  }

  const isApproveMode = confirmMode === 'single-approve' || confirmMode === 'bulk-approve'
  const confirmMessage =
    confirmMode === 'single-approve'
      ? `${confirmTarget?.name ?? ''}님의 ${confirmTarget?.cashAmount.toLocaleString() ?? 0}원 현금 전환을 지급 완료 처리합니다.\n승인 후에는 취소할 수 없습니다.`
      : confirmMode === 'single-reject'
        ? `${confirmTarget?.name ?? ''}님의 현금 전환 신청을 반려 처리합니다.\n반려 후에는 취소할 수 없습니다.`
        : confirmMode === 'bulk-approve'
          ? `선택한 ${selectedPendingIds.length}건을 일괄 지급 완료 처리합니다.\n승인 후에는 취소할 수 없습니다.`
          : `선택한 ${selectedPendingIds.length}건을 일괄 반려 처리합니다.\n반려 후에는 취소할 수 없습니다.`

  const chipColor = (sf: StatusFilter, active: boolean) => {
    if (!active) return sf === '신청중' && counts['신청중'] > 0 ? '#f59e0b' : colors.textSecondary
    return sf === '신청중' ? '#f59e0b' : sf === '완료' ? '#10b981' : sf === '반려' ? '#ef4444' : colors.textPrimary
  }

  return (
    <Box>
      {/* ── 필터 영역 ── */}
      <Box
        sx={{
          mb: 2.5, p: { xs: 1.5, sm: 2 },
          borderRadius: 2.5,
          bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        {/* 상태 칩 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, overflowX: 'auto', flexShrink: 0, pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
          {STATUS_FILTERS.map((sf) => {
            const active = statusFilter === sf
            return (
              <Chip
                key={sf}
                label={`${sf} ${counts[sf] ?? 0}건`}
                onClick={() => { setStatusFilter(sf); setSelectedIds(new Set()) }}
                sx={{
                  fontWeight: active ? 700 : 600, fontSize: '0.8rem', height: 30, flexShrink: 0,
                  cursor: 'pointer',
                  bgcolor: active
                    ? sf === '신청중' ? 'rgba(245,158,11,0.15)' : sf === '완료' ? 'rgba(16,185,129,0.15)'
                      : sf === '반려' ? 'rgba(239,68,68,0.15)' : isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
                    : 'transparent',
                  color: chipColor(sf, active),
                  border: `1px solid ${active
                    ? sf === '신청중' ? 'rgba(245,158,11,0.4)' : sf === '완료' ? 'rgba(16,185,129,0.4)'
                      : sf === '반려' ? 'rgba(239,68,68,0.4)' : colors.accentColor
                    : sf === '신청중' && counts['신청중'] > 0 ? 'rgba(245,158,11,0.3)' : colors.borderColor}`,
                }}
              />
            )
          })}
        </Box>

        {/* 검색 + 날짜 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.25, sm: 1 }, flexWrap: 'wrap' }}>
          <TextField
            size="small" placeholder="이름, 부서, 사원번호 검색" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '1rem', color: colors.textSecondary }} /></InputAdornment> } }}
            sx={{ ...inputSx, flex: { xs: 'none', sm: '1 1 200px' } }}
          />
          <Box sx={{ display: 'flex', gap: 0.75, flex: { xs: '1 1 auto', sm: '0 0 auto' } }}>
            <TextField size="small" type="date" label="시작일" value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ ...inputSx, width: { xs: '100%', sm: 150 }, flex: { xs: 1, sm: 'none' } }}
            />
            <TextField size="small" type="date" label="종료일" value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ ...inputSx, width: { xs: '100%', sm: 150 }, flex: { xs: 1, sm: 'none' } }}
            />
          </Box>
          {(startDate || endDate || searchTerm) && (
            <Button size="small" variant="text"
              onClick={() => { setSearchTerm(''); setStartDate(''); setEndDate('') }}
              sx={{ fontSize: '0.78rem', color: colors.textSecondary, textTransform: 'none', px: 1, alignSelf: 'center' }}
            >
              초기화
            </Button>
          )}
        </Box>
      </Box>

      {/* ── 일괄 처리 바 ── */}
      {selectedPendingIds.length > 0 && (
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 },
          flexWrap: 'wrap', px: 2, py: 1.5, mb: 2, borderRadius: 2,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.25)'}`,
        }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: colors.accentColor, flex: 1, minWidth: 120 }}>
            신청중 {selectedPendingIds.length}건 선택됨
          </Typography>
          <Button size="small" variant="contained"
            startIcon={<CheckCircleIcon sx={{ fontSize: '0.9rem !important' }} />}
            onClick={handleBulkApprove}
            sx={{ fontSize: '0.78rem', fontWeight: 700, borderRadius: 1.5, bgcolor: st.primaryColor, color: '#fff', boxShadow: 'none', flex: { xs: 1, sm: 'none' }, '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: 'none' } }}
          >
            일괄 지급 완료
          </Button>
          <Button size="small" variant="outlined"
            startIcon={<BlockIcon sx={{ fontSize: '0.9rem !important' }} />}
            onClick={handleBulkReject}
            sx={{ fontSize: '0.78rem', fontWeight: 700, borderRadius: 1.5, color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)', flex: { xs: 1, sm: 'none' }, '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#ef4444' } }}
          >
            일괄 반려
          </Button>
        </Box>
      )}

      {/* ── 모바일 카드 목록 ── */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* 전체 선택 바 */}
          {pendingInView.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
              <Checkbox
                size="small" checked={allPendingSelected}
                indeterminate={!allPendingSelected && somePendingSelected}
                onChange={handleToggleAll}
                sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor }, '&.MuiCheckbox-indeterminate': { color: colors.accentColor }, p: 0.5 }}
              />
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                신청중 전체 선택 ({pendingInView.length}건)
              </Typography>
            </Box>
          )}

          {filtered.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                {searchTerm || startDate || endDate ? '검색 결과가 없습니다' : '현금 전환 신청 내역이 없습니다'}
              </Typography>
            </Box>
          ) : filtered.map((item) => {
            const statusStyle = STATUS_MAP[item.status] ?? STATUS_MAP['신청중']
            const isPending = item.status === '신청중'
            const isSelected = selectedIds.has(item.id)
            return (
              <Card
                key={item.id}
                elevation={0}
                sx={{
                  borderRadius: 2.5, overflow: 'hidden',
                  bgcolor: isSelected
                    ? isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.05)'
                    : colors.cardBg,
                  border: `1px solid ${isSelected ? (isDarkMode ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)') : colors.borderColor}`,
                  transition: 'all 0.15s',
                }}
              >
                {/* 카드 상단 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 2, pt: 1.75, pb: 1 }}>
                  {isPending && (
                    <Checkbox
                      size="small" checked={isSelected} onChange={() => handleToggleRow(item.id)}
                      sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor }, p: 0.5, flexShrink: 0 }}
                    />
                  )}
                  <Box flex={1} minWidth={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography fontWeight={700} sx={{ fontSize: '0.95rem', color: colors.textPrimary }}>
                        {item.name}
                      </Typography>
                      <Chip label={statusStyle.label} size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, bgcolor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                      {item.department} · {item.position} · <Box component="span" sx={{ fontFamily: 'monospace' }}>{item.employeeNumber}</Box>
                    </Typography>
                  </Box>
                </Box>

                {/* 카드 본문 */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, mx: 2, mb: 1.5, borderRadius: 1.5, overflow: 'hidden', border: `1px solid ${colors.borderColor}` }}>
                  {[
                    { label: '신청일', value: item.requestDate },
                    { label: '마일리지', value: `${item.amount.toLocaleString()}마리`, highlight: true },
                    { label: '현금 환산', value: `${item.cashAmount.toLocaleString()}원` },
                  ].map((cell, i) => (
                    <Box key={cell.label} sx={{ px: 1.25, py: 1, borderRight: i < 2 ? `1px solid ${colors.borderColor}` : 'none', bgcolor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)' }}>
                      <Typography sx={{ fontSize: '0.6rem', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.04em', mb: 0.25 }}>{cell.label}</Typography>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: cell.highlight ? st.primaryColor : colors.textPrimary, lineHeight: 1.2 }}>{cell.value}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* 카드 액션 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2, pb: 1.75 }}>
                  {isPending && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth variant="contained" size="medium"
                        startIcon={<CheckCircleIcon sx={{ fontSize: '1rem !important' }} />}
                        onClick={() => handleSingleApprove(item)}
                        sx={{ fontSize: '0.82rem', fontWeight: 700, borderRadius: 2, py: 0.9, bgcolor: st.primaryColor, color: '#fff', boxShadow: 'none', '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: 'none' } }}
                      >
                        지급 완료
                      </Button>
                      <Button
                        fullWidth variant="outlined" size="medium"
                        startIcon={<BlockIcon sx={{ fontSize: '1rem !important' }} />}
                        onClick={() => handleSingleReject(item)}
                        sx={{ fontSize: '0.82rem', fontWeight: 700, borderRadius: 2, py: 0.9, color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)', '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#ef4444' } }}
                      >
                        반려
                      </Button>
                    </Box>
                  )}
                  <Button
                    fullWidth variant="outlined" size="small"
                    startIcon={<ReceiptLongIcon sx={{ fontSize: '0.9rem !important' }} />}
                    onClick={() => setDrawerUser(item)}
                    sx={{ fontSize: '0.78rem', fontWeight: 600, borderRadius: 2, py: 0.7, color: st.primaryColor, borderColor: `${st.primaryColor}50`, '&:hover': { bgcolor: `${st.primaryColor}0a`, borderColor: st.primaryColor } }}
                  >
                    마일리지 수령 내역
                  </Button>
                </Box>
              </Card>
            )
          })}
        </Box>
      ) : (
        /* ── 데스크탑 테이블 ── */
        <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: colors.cardBg, border: `1px solid ${colors.borderColor}`, boxShadow: colors.shadowSmall }}>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  <TableCell padding="checkbox" sx={{ borderBottom: `1px solid ${colors.borderColor}`, pl: 2 }}>
                    <Checkbox size="small" checked={allPendingSelected} indeterminate={!allPendingSelected && somePendingSelected}
                      onChange={handleToggleAll} disabled={pendingInView.length === 0}
                      sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor }, '&.MuiCheckbox-indeterminate': { color: colors.accentColor } }}
                    />
                  </TableCell>
                  {['신청일', '사원번호', '이름', '부서 / 직급', '신청 마일리지', '현금 환산', '상태', ''].map((col) => (
                    <TableCell key={col} sx={{ color: colors.textSecondary, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: `1px solid ${colors.borderColor}`, py: 1.75, whiteSpace: 'nowrap' }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => {
                  const statusStyle = STATUS_MAP[item.status] ?? STATUS_MAP['신청중']
                  const isPending = item.status === '신청중'
                  const isSelected = selectedIds.has(item.id)
                  return (
                    <TableRow key={item.id} sx={{
                      transition: 'background-color 0.15s',
                      bgcolor: isSelected ? (isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)') : 'transparent',
                      '&:hover': { bgcolor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
                      '& .MuiTableCell-root': { borderBottom: `1px solid ${colors.borderColor}`, color: colors.textPrimary, py: 1.5, fontSize: '0.875rem' },
                      '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
                    }}>
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        {isPending && (
                          <Checkbox size="small" checked={isSelected} onChange={() => handleToggleRow(item.id)}
                            sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor } }}
                          />
                        )}
                      </TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: colors.textPrimary }}>{item.requestDate}</Typography></TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: colors.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>{item.employeeNumber}</Typography></TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} sx={{ color: colors.textPrimary }}>
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: colors.textSecondary }}>{item.department} · {item.position}</Typography></TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} sx={{ color: st.primaryColor }}>
                          {item.amount.toLocaleString()}<Box component="span" sx={{ fontWeight: 500, color: colors.textSecondary, ml: 0.5 }}>마리</Box>
                        </Typography>
                      </TableCell>
                      <TableCell><Typography variant="body2" fontWeight={600} sx={{ color: colors.textPrimary }}>{item.cashAmount.toLocaleString()}원</Typography></TableCell>
                      <TableCell>
                        <Chip label={statusStyle.label} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, fontWeight: 700, fontSize: '0.72rem', height: 22 }} />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right', pr: 2 }}>
                        <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'flex-end', alignItems: 'center' }}>
                          {isPending && (<>
                            <Button size="small" variant="outlined" startIcon={<CheckCircleIcon sx={{ fontSize: '0.85rem !important' }} />} onClick={() => handleSingleApprove(item)}
                              sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: '#10b981', borderColor: 'rgba(16,185,129,0.4)', '&:hover': { bgcolor: 'rgba(16,185,129,0.08)', borderColor: '#10b981' } }}>
                              지급 완료
                            </Button>
                            <Button size="small" variant="outlined" startIcon={<BlockIcon sx={{ fontSize: '0.85rem !important' }} />} onClick={() => handleSingleReject(item)}
                              sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)', '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#ef4444' } }}>
                              반려
                            </Button>
                          </>)}
                          <Button
                            size="small" variant="outlined"
                            startIcon={<ReceiptLongIcon sx={{ fontSize: '0.85rem !important' }} />}
                            onClick={() => setDrawerUser(item)}
                            sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: st.primaryColor, borderColor: `${st.primaryColor}50`, '&:hover': { bgcolor: `${st.primaryColor}0a`, borderColor: st.primaryColor } }}
                          >
                            내역
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: 'center', py: 8, border: 'none' }}>
                      <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                        {searchTerm || startDate || endDate ? '검색 결과가 없습니다' : '현금 전환 신청 내역이 없습니다'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Card>
      )}

      <ConfirmDialog
        open={confirmMode !== null}
        title={isApproveMode ? '지급 완료 처리' : '반려 처리'}
        message={confirmMessage}
        confirmLabel={isApproveMode ? '지급 완료' : '반려'}
        cancelLabel="취소"
        variant={isApproveMode ? 'warning' : 'error'}
        onConfirm={handleConfirm}
        onCancel={() => { setConfirmMode(null); setConfirmTarget(null) }}
      />

      <UserMileageDrawer user={drawerUser} onClose={() => setDrawerUser(null)} />
    </Box>
  )
}
