// src/features/settings/components/specialMileage/MileageHistoryPanel.tsx
// 특별 마일리지 지급 내역 — 날짜 범위 + 검색어 필터
// 모바일: 카드 리스트 / 데스크톱: 고정 높이 테이블 (레이아웃 시프트 없음)
import HistoryIcon from '@mui/icons-material/History'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { type Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { SpecialMileageHistory } from '@/api/types/settings'

interface Props {
  history: SpecialMileageHistory[]
}

const TABLE_BODY_HEIGHT = 360

export default function MileageHistoryPanel({ history }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, rowBg, rowHoverBg, headerBg } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

  const [fromDate, setFromDate] = useState<Dayjs | null>(null)
  const [toDate, setToDate] = useState<Dayjs | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return history.filter((h) => {
      if (fromDate && dayjs(h.grantedAt).isBefore(fromDate, 'day')) return false
      if (toDate && dayjs(h.grantedAt).isAfter(toDate, 'day')) return false
      if (search) {
        const q = search.toLowerCase()
        if (
          !h.name.includes(q) &&
          !h.department.toLowerCase().includes(q) &&
          !h.employeeNumber.toLowerCase().includes(q) &&
          !h.reason.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [history, fromDate, toDate, search])

  const scrollbarSx = {
    '&::-webkit-scrollbar': { width: 4, height: 4 },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': { background: st.scrollbarThumb, borderRadius: 9999 },
    scrollbarWidth: 'thin',
    scrollbarColor: `${st.scrollbarThumb} transparent`,
  }

  const pickerSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: st.inputBg,
      fontSize: '0.82rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: st.inputHoverBorder },
      '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
    },
    '& .MuiInputBase-input': { color: textPrimary, fontSize: '0.82rem' },
    '& .MuiInputLabel-root': {
      color: textSecondary,
      fontSize: '0.82rem',
      '&.Mui-focused': { color: st.inputFocusBorder },
    },
    '& .MuiIconButton-root': { color: textSecondary },
  }

  const popperSx = {
    '& .MuiPaper-root': {
      bgcolor: isDarkMode ? '#1e1e2e' : '#fff',
      border: `1px solid ${borderColor}`,
      borderRadius: 2,
      boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.12)',
    },
    '& .MuiPickersDay-root': {
      color: textPrimary,
      '&.Mui-selected': { bgcolor: st.primaryColor },
      '&:hover': { bgcolor: st.chipBg },
    },
    '& .MuiPickersCalendarHeader-label': { color: textPrimary },
    '& .MuiDayCalendar-weekDayLabel': { color: textSecondary },
    '& .MuiPickersArrowSwitcher-button': { color: textSecondary },
  }

  const columns = ['지급일', '이름 / 사번', '부서', '마일리지', '지급 사유']

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: st.panelBg, border: `1px solid ${borderColor}`, borderRadius: 2.5, overflow: 'clip' }}>

        {/* 패널 헤더 */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderBottom: `1px solid ${borderColor}`, bgcolor: headerBg }}>
          <HistoryIcon sx={{ fontSize: '1rem', color: st.primaryColor }} />
          <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
            지급 내역
          </Typography>
          <Chip
            label={`${filtered.length}건`}
            size="small"
            sx={{ ml: 'auto', height: 18, fontSize: '0.65rem', fontWeight: 700, bgcolor: st.chipBg, color: st.primaryColor, border: `1px solid ${st.avatarBorder}`, '& .MuiChip-label': { px: 0.75 } }}
          />
        </Box>

        {/* 필터 */}
        <Box
          sx={{
            px: 2, py: 1.5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '160px 160px 1fr' },
            gap: 1.5,
            borderBottom: `1px solid ${borderColor}`,
            bgcolor: headerBg,
          }}
        >
          <DatePicker
            label="시작일"
            value={fromDate}
            onChange={setFromDate}
            maxDate={toDate ?? undefined}
            slotProps={{ textField: { size: 'small', sx: pickerSx }, openPickerButton: { size: 'small' }, popper: { sx: popperSx } }}
          />
          <DatePicker
            label="종료일"
            value={toDate}
            onChange={setToDate}
            minDate={fromDate ?? undefined}
            slotProps={{ textField: { size: 'small', sx: pickerSx }, openPickerButton: { size: 'small' }, popper: { sx: popperSx } }}
          />
          <TextField
            placeholder="이름·부서·사번·사유 검색"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ gridColumn: { xs: '1 / -1', sm: 'auto' }, ...pickerSx }}
          />
        </Box>

        {/* ── 모바일 카드 리스트 (xs ~ sm): 페이지 자체가 스크롤되므로 내부 스크롤 없음 ── */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, p: 1.5 }}>
          {filtered.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 1 }}>
              <HistoryIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.25 }} />
              <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 500 }}>검색 결과가 없습니다</Typography>
            </Box>
          ) : filtered.map((h) => (
            <Box
              key={h.id}
              sx={{ bgcolor: rowBg, border: `1px solid ${borderColor}`, borderRadius: 2, overflow: 'hidden', transition: 'background 0.15s ease', '&:hover': { bgcolor: rowHoverBg } }}
            >
              {/* 카드 상단: 아바타 + 이름 + 마일리지 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.75, py: 1.25, borderBottom: `1px solid ${borderColor}`, bgcolor: st.accordionDivisionBg }}>
                <Avatar sx={{ width: 32, height: 32, flexShrink: 0, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.78rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}` }}>
                  {h.name[0]}
                </Avatar>
                <Box flex={1} minWidth={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>{h.name}</Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace' }}>{h.employeeNumber}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{h.department} · {h.position}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: st.primaryColor, lineHeight: 1 }}>{h.mileage.toLocaleString()}</Typography>
                  <Typography sx={{ fontSize: '0.62rem', color: textSecondary, mt: 0.25 }}>마일리지</Typography>
                </Box>
              </Box>
              {/* 카드 하단: 날짜 + 사유 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.75, py: 1 }}>
                <Chip label={h.grantedAt} size="small" sx={{ height: 18, fontSize: '0.62rem', fontFamily: 'monospace', flexShrink: 0, bgcolor: st.chipBg, color: textSecondary, border: `1px solid ${st.avatarBorder}`, '& .MuiChip-label': { px: 0.75 } }} />
                <Typography sx={{ fontSize: '0.78rem', color: textPrimary, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {h.reason || '—'}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── 데스크톱 테이블 (md+): sticky 헤더 + 고정 높이 바디 스크롤 ── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: TABLE_BODY_HEIGHT + 44, // 바디 + 헤더 행 높이
            overflowY: 'auto',
            overflowX: 'auto',
            ...scrollbarSx,
          }}
        >
          {filtered.length === 0 ? (
            <Box sx={{ height: TABLE_BODY_HEIGHT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <HistoryIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.25 }} />
              <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 500 }}>검색 결과가 없습니다</Typography>
            </Box>
          ) : (
            <Table size="small" stickyHeader sx={{ minWidth: 560 }}>
              <TableHead>
                <TableRow>
                  {columns.map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        bgcolor: headerBg,
                        color: textSecondary, fontWeight: 600, fontSize: '0.7rem',
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                        py: 1.5, borderBottomColor: borderColor, whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((h) => (
                  <TableRow
                    key={h.id}
                    sx={{
                      bgcolor: rowBg,
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: rowHoverBg },
                      '& .MuiTableCell-root': { borderBottomColor: borderColor, py: 1.25 },
                    }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography sx={{ fontSize: '0.78rem', color: textSecondary, fontFamily: 'monospace' }}>{h.grantedAt}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Avatar sx={{ width: 28, height: 28, flexShrink: 0, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.72rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}` }}>
                          {h.name[0]}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>{h.name}</Typography>
                          <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace' }}>{h.employeeNumber}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.78rem', color: textSecondary, lineHeight: 1.3 }}>{h.department}</Typography>
                      <Chip label={h.position} size="small" sx={{ mt: 0.25, height: 16, fontSize: '0.6rem', fontWeight: 700, bgcolor: st.chipBg, color: st.primaryColor, border: `1px solid ${st.avatarBorder}`, '& .MuiChip-label': { px: 0.5 } }} />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: st.primaryColor }}>{h.mileage.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.78rem', color: textPrimary }}>{h.reason || '—'}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>

      </Box>
    </LocalizationProvider>
  )
}
