// src/routes/Mileage/MileagePage.tsx
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Button, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import { awardData, exchangeData } from '@/api/mock/mileage'

import ExchangeHistoryTable from './components/ExchangeHistoryTable'
import MileageDesktopTable from './components/MileageDesktopTable'
import MileageExchangeDialog from './components/MileageExchangeDialog'
import MileageFilter from './components/MileageFilter'
import MileageMobileCards from './components/MileageMobileCards'
import MileageStatsCards from './components/MileageStatsCards'
import PageHeader from '@/components/ui/PageHeader'

type TabValue = 'awards' | 'exchanges'

export default function MileagePage() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [tab, setTab] = useState<TabValue>('awards')
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [exchangeHistory, setExchangeHistory] = useState(exchangeData)

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
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          maxWidth: 1440, mx: 'auto',
          minHeight: '100vh',
          color: t.textPrimary,
        }}
      >
        {/* 페이지 헤더 */}
        <Box sx={{ mb: 5, pb: 4, borderBottom: `1px solid ${t.borderColorStrict}` }}>
          <PageHeader
            icon={AttachMoneyIcon}
            title="마일리지"
            subtitle="보유 생선 현황 및 현금 전환을 관리합니다"
            right={
              <Button
                variant="contained"
                startIcon={<SwapHorizIcon />}
                onClick={() => setDialogOpen(true)}
                sx={{
                  borderRadius: 2, px: 3, py: 1,
                  fontWeight: 600, fontSize: '0.875rem',
                  bgcolor: t.primaryColor, color: t.primaryBtnColor, boxShadow: 'none',
                  '&:hover': { bgcolor: t.primaryHoverBg, boxShadow: t.primaryBtnHoverShadow },
                }}
              >
                현금 전환 신청
              </Button>
            }
          />
        </Box>

        {/* 통계 카드 */}
        <MileageStatsCards
          totalFish={totalMileage}
          thisMonthFish={thisMonthFish}
          thisMonthExchanged={thisMonthExchanged}
        />

        {/* 탭 */}
        <Box sx={{ mb: 3, borderBottom: `1px solid ${t.borderColorStrict}` }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              minHeight: 44,
              '& .MuiTab-root': {
                fontSize: '0.875rem', fontWeight: 600, textTransform: 'none',
                minHeight: 44, color: t.textSecondary,
                '&.Mui-selected': { color: t.primaryColor },
              },
              '& .MuiTabs-indicator': { backgroundColor: t.primaryColor, height: 2 },
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
