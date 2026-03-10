// src/routes/Mileage/MileagePage.tsx
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Button, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import { awardData, exchangeData } from './data'

import ExchangeHistoryTable from './ExchangeHistoryTable'
import MileageDesktopTable from './MileageDesktopTable'
import MileageExchangeDialog from './MileageExchangeDialog'
import MileageFilter from './MileageFilter'
import MileageMobileCards from './MileageMobileCards'
import MileageStatsCards from './MileageStatsCards'

type TabValue = 'awards' | 'exchanges'

export default function MileagePage() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [tab, setTab] = useState<TabValue>('awards')
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [exchangeHistory, setExchangeHistory] = useState(exchangeData)

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'

  const totalMileage = awardData.reduce((sum, item) => sum + item.fish, 0)

  const filteredAwards = useMemo(() => {
    return awardData.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (!startDate || date.isAfter(startDate.startOf('day'))) &&
        (!endDate || date.isBefore(endDate.endOf('day')))
      return inRange && item.detail.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [startDate, endDate, searchTerm])

  const paginatedAwards = filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const thisMonthFish = useMemo(
    () =>
      filteredAwards
        .filter((item) => {
          const d = dayjs(item.paymentDate)
          const now = dayjs()
          return d.month() === now.month() && d.year() === now.year()
        })
        .reduce((sum, item) => sum + item.fish, 0),
    [filteredAwards],
  )

  const thisMonthExchanged = useMemo(
    () =>
      exchangeHistory
        .filter((item) => {
          const d = dayjs(item.requestDate)
          const now = dayjs()
          return d.month() === now.month() && d.year() === now.year() && item.status === '완료'
        })
        .reduce((sum, item) => sum + item.amount, 0),
    [exchangeHistory],
  )

  const handleConfirmExchange = (amount: number) => {
    const newRequest = {
      id: exchangeHistory.length + 1,
      requestDate: dayjs().format('YYYY-MM-DD'),
      amount,
      cashAmount: amount * 100,
      status: '신청중',
    }
    setExchangeHistory((prev) => [newRequest, ...prev])
    setDialogOpen(false)
    setTab('exchanges')
  }

  const handleTabChange = (_: React.SyntheticEvent, newVal: TabValue) => {
    setTab(newVal)
    setPage(0)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 4 },
          maxWidth: 1440, mx: 'auto',
          minHeight: '100vh',
          color: textPrimary,
        }}
      >
        {/* 페이지 헤더 */}
        <Box
          sx={{
            mb: 5, pb: 4,
            borderBottom: `1px solid ${borderColor}`,
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}>
              마일리지
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              보유 생선 현황 및 현금 전환을 관리합니다
            </Typography>
          </Box>

          {/* 환전 신청 버튼 */}
          <Button
            variant="contained"
            startIcon={<SwapHorizIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{
              borderRadius: 2, px: 3, py: 1,
              fontWeight: 600, fontSize: '0.875rem',
              bgcolor: '#6366f1', color: '#ffffff', boxShadow: 'none',
              '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' },
            }}
          >
            현금 전환 신청
          </Button>
        </Box>

        {/* 통계 카드 */}
        <MileageStatsCards
          totalFish={totalMileage}
          thisMonthFish={thisMonthFish}
          thisMonthExchanged={thisMonthExchanged}
        />

        {/* 탭 */}
        <Box sx={{ mb: 3, borderBottom: `1px solid ${borderColor}` }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              minHeight: 44,
              '& .MuiTab-root': {
                fontSize: '0.875rem', fontWeight: 600, textTransform: 'none',
                minHeight: 44, color: textSecondary,
                '&.Mui-selected': { color: '#6366f1' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#6366f1', height: 2 },
            }}
          >
            <Tab label={`마일리지 수상내역 (${awardData.length}건)`} value="awards" />
            <Tab label={`환전 신청내역 (${exchangeHistory.length}건)`} value="exchanges" />
          </Tabs>
        </Box>

        {/* 수상내역 탭 */}
        {tab === 'awards' && (
          <>
            <MileageFilter
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {isMobile ? (
              <MileageMobileCards data={paginatedAwards} />
            ) : (
              <MileageDesktopTable
                data={paginatedAwards}
                page={page}
                rowsPerPage={rowsPerPage}
                total={filteredAwards.length}
                onPageChange={(_e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage(0)
                }}
              />
            )}
          </>
        )}

        {/* 환전 신청내역 탭 */}
        {tab === 'exchanges' && (
          <ExchangeHistoryTable data={exchangeHistory} />
        )}

        {/* 환전 다이얼로그 */}
        <MileageExchangeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          totalMileage={totalMileage}
          onConfirm={handleConfirmExchange}
        />
      </Box>
    </LocalizationProvider>
  )
}
