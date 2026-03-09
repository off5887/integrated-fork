// src/routes/MileagePage.tsx
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
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

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (!startDate || date.isAfter(startDate.startOf('day'))) &&
        (!endDate || date.isBefore(endDate.endOf('day')))
      return inRange && item.detail.toLowerCase().includes(searchTerm.toLowerCase())
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

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(paginatedData.map((item) => item.id))
    } else {
      setSelected([])
    }
  }

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 4 },
          maxWidth: 1440,
          mx: 'auto',
          minHeight: '100vh',
          color: textPrimary,
        }}
      >
        {/* 페이지 헤더 */}
        <Box
          sx={{
            mb: 5,
            pb: 4,
            borderBottom: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}
            >
              마일리지
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              보유 생선 현황 및 현금 전환을 관리합니다
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 2,
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
            }}
          >
            <Typography variant="caption" fontWeight={600} sx={{ color: '#6366f1' }}>
              전체 {data.length}건
            </Typography>
          </Box>
        </Box>

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

        {/* 액션 바 */}
        <Box
          sx={{
            mb: 3,
            px: 2.5,
            py: 2,
            borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(148,163,184,0.05)' : 'rgba(241,245,249,0.8)',
            border: `1px solid ${borderColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selected.length > 0 ? (
              <>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: '999px',
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'}`,
                  }}
                >
                  <Typography variant="caption" fontWeight={700} sx={{ color: '#6366f1' }}>
                    {selected.length}건 선택됨
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} sx={{ color: textPrimary }}>
                  합계{' '}
                  <Box component="span" sx={{ color: '#6366f1', fontWeight: 800 }}>
                    {selectedFishSum.toLocaleString()}
                  </Box>{' '}
                  마리
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: textSecondary }}>
                항목을 선택하면 현금 전환이 가능합니다
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            disabled={selected.length === 0}
            onClick={() => setDialogOpen(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              fontSize: '0.875rem',
              bgcolor: '#6366f1',
              color: '#ffffff',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              },
              '&.Mui-disabled': {
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(99,102,241,0.35)',
              },
            }}
          >
            현금 전환하기
          </Button>
        </Box>

        {/* 테이블 / 모바일 카드 */}
        {isMobile ? (
          <MileageMobileCards data={paginatedData} selected={selected} onToggle={handleToggle} />
        ) : (
          <MileageDesktopTable
            data={paginatedData}
            selected={selected}
            onToggle={handleToggle}
            onSelectAll={handleSelectAllClick}
            page={page}
            rowsPerPage={rowsPerPage}
            total={filteredData.length}
            onPageChange={(_e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
          />
        )}

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
