// src/routes/MileagePage.tsx
import {
  alpha,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import { data } from './data'

import MileageDesktopTable from './MileageDesktopTable'
import MileageExchangeDialog from './MileageExchangeDialog'
import MileageFilter from './MileageFilter'
import MileageMobileCards from './MileageMobileCards'
import MileageStatsCards from './MileageStatsCards'

export default function MileagePage() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<number[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  // ── 필터링된 데이터 ─────────────────────────────────────────────
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (!startDate || date.isAfter(startDate.startOf('day'))) &&
        (!endDate || date.isBefore(endDate.endOf('day')))
      return (
        inRange && item.detail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [startDate, endDate, searchTerm])

  const selectedFishSum = useMemo(
    () =>
      selected.reduce((sum, id) => {
        const item = data.find((i) => i.id === id)
        return sum + (item?.fish ?? 0)
      }, 0),
    [selected],
  )

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  // 전체 선택 핸들러
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = paginatedData.map((item) => item.id)
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }

  // 개별 행 선택/해제
  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  // ── 다크모드 최적화 색상 ──────────────────────────────────────────
  const colors = {
    pageBg: isDarkMode ? '#0f172a' : '#f8fafc',
    surface: isDarkMode ? '#1e293b' : '#ffffff',
    surface2: isDarkMode ? 'rgba(30,41,59,0.96)' : 'rgba(255,255,255,0.98)',
    border: isDarkMode ? 'rgba(148,163,184,0.30)' : 'rgba(148,163,184,0.28)',
    textPrimary: isDarkMode ? '#f1f5f9' : '#0f172a', // 본문 기본 색상
    textSecondary: isDarkMode ? '#cbd5e1' : '#475569', // 보조 텍스트
    textTertiary: isDarkMode ? '#94a3b8' : '#64748b', // placeholder, 라벨
    primary: isDarkMode ? '#6366f1' : '#4f46e5',
    primaryHover: isDarkMode ? '#818cf8' : '#4338ca',
    success: isDarkMode ? '#34d399' : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#d97706',
    danger: isDarkMode ? '#f87171' : '#ef4444',
    hover: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.06)',
    selected: isDarkMode ? 'rgba(99,102,241,0.20)' : 'rgba(79,70,229,0.10)',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 3, md: 6 },
          width: 1,
          maxWidth: 1440,
          mx: 'auto',
          bgcolor: colors.pageBg,
          minHeight: '100vh',
          color: colors.textPrimary,
        }}
      >
        {/* 통계 카드 */}
        <MileageStatsCards
          totalFish={data.reduce((sum, item) => sum + item.fish, 0)}
          thisMonthFish={filteredData
            .filter((item) => {
              const d = dayjs(item.paymentDate)
              const now = dayjs()
              return d.month() === now.month() && d.year() === now.year()
            })
            .reduce((sum, item) => sum + item.fish, 0)}
          thisMonthExchanged={filteredData
            .filter((item) => {
              const d = dayjs(item.paymentDate)
              const now = dayjs()
              return (
                d.month() === now.month() &&
                d.year() === now.year() &&
                item.status === '전환완료'
              )
            })
            .reduce((sum, item) => sum + item.fish, 0)}
        />

        {/* 필터 */}
        <MileageFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* 선택 합계 + 버튼 */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: colors.textPrimary }}
          >
            선택: <strong>{selectedFishSum.toLocaleString()}</strong> 마리
          </Typography>

          <Button
            variant="contained"
            disabled={selected.length === 0}
            onClick={() => setDialogOpen(true)}
            sx={{
              borderRadius: 2,
              px: 5,
              py: 1.2,
              fontWeight: 600,
              bgcolor: colors.primary,
              color: '#ffffff',
              boxShadow: isDarkMode
                ? '0 4px 12px rgba(99,102,241,0.3)'
                : '0 4px 12px rgba(79,70,229,0.2)',
              '&:hover': {
                bgcolor: colors.primaryHover,
                boxShadow: isDarkMode
                  ? '0 8px 20px rgba(99,102,241,0.45)'
                  : '0 8px 20px rgba(79,70,229,0.3)',
              },
              '&.Mui-disabled': {
                bgcolor: alpha(colors.primary, 0.45),
                color: alpha('#ffffff', 0.75),
              },
            }}
          >
            현금 전환하기
          </Button>
        </Box>

        {/* 모바일 / 데스크톱 분기 */}
        {isMobile ? (
          <MileageMobileCards
            data={paginatedData}
            selected={selected}
            onToggle={handleToggle}
          />
        ) : (
          <MileageDesktopTable
            data={paginatedData}
            selected={selected}
            onToggle={handleToggle}
            onSelectAll={handleSelectAllClick}
            page={page}
            rowsPerPage={rowsPerPage}
            total={filteredData.length}
            onPageChange={setPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
          />
        )}

        {/* 다이얼로그 */}
        <MileageExchangeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          amount={selectedFishSum}
          onConfirm={() => {
            console.log('환전 신청:', selectedFishSum, '마리')
            setDialogOpen(false)
            setSelected([])
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}
