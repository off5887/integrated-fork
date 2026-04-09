// src/routes/Mileage/MileagePage.tsx
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Button, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import { useMyMileages, useMyWithdrawals, useRequestWithdrawal } from '@/api/queries/useMileage'
import { toAwardItem, toExchangeItem } from '@/api/types/mileage'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

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
  const { showSnackbar } = useSnackbar()
  const t = getMileageTheme(isDarkMode)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: mileageRecords = [], isLoading: isLoadingMileages } = useMyMileages()
  const { data: withdrawalRecords = [], isLoading: isLoadingWithdrawals } = useMyWithdrawals()
  const requestWithdrawalMutation = useRequestWithdrawal()

  const isLoading = isLoadingMileages || isLoadingWithdrawals

  const awardItems = useMemo(() => mileageRecords.map(toAwardItem), [mileageRecords])
  const exchangeItems = useMemo(() => withdrawalRecords.map(toExchangeItem), [withdrawalRecords])

  // 보유 마일리지 = 전체 지급 - 승인/신청 출금
  const availableMileage = useMemo(() => {
    const totalEarned = mileageRecords.reduce((sum, r) => sum + r.points, 0)
    const totalWithdrawn = withdrawalRecords
      .filter((r) => r.status === 'approved' || r.status === 'pending')
      .reduce((sum, r) => sum + r.requestPoints, 0)
    return totalEarned - totalWithdrawn
  }, [mileageRecords, withdrawalRecords])

  const [tab, setTab] = useState<TabValue>('awards')
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [withdrawTarget, setWithdrawTarget] = useState<number | null>(null)

  const filteredAwards = useMemo(() => {
    return awardItems.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (!startDate || date.isAfter(startDate.startOf('day'))) &&
        (!endDate || date.isBefore(endDate.endOf('day')))
      return inRange && item.detail.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [awardItems, startDate, endDate, searchTerm])

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
      exchangeItems
        .filter((item) => {
          const d = dayjs(item.requestDate)
          const now = dayjs()
          return (
            d.month() === now.month() &&
            d.year() === now.year() &&
            (item.status === '완료' || item.status === '신청중')
          )
        })
        .reduce((sum, item) => sum + item.amount, 0),
    [exchangeItems],
  )

  const handleConfirmExchange = async (amount: number) => {
    try {
      await requestWithdrawalMutation.mutateAsync({ requestPoints: amount })
      setDialogOpen(false)
      setTab('exchanges')
      showSnackbar(`${amount.toLocaleString()}마리 현금 전환 신청이 완료되었습니다.`, 'success')
    } catch {
      showSnackbar('현금 전환 신청에 실패했습니다.', 'error')
    }
  }

  const handleWithdrawConfirm = () => {
    // 환전 취소 API 엔드포인트가 없어 UI 알림만 표시
    showSnackbar('환전 신청 취소는 관리자에게 문의해주세요.', 'info')
    setWithdrawTarget(null)
  }

  const handleTabChange = (_: React.SyntheticEvent, newVal: TabValue) => {
    setTab(newVal)
    setPage(0)
  }

  if (isLoading) return <LoadingSpinner fullPage text="마일리지를 불러오는 중..." />

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
          totalFish={availableMileage}
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
            <Tab label={`마일리지 수상내역 (${awardItems.length}건)`} value="awards" />
            <Tab label={`환전 신청내역 (${exchangeItems.length}건)`} value="exchanges" />
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
          <ExchangeHistoryTable data={exchangeItems} onWithdraw={setWithdrawTarget} />
        )}

        {/* 환전 다이얼로그 */}
        <MileageExchangeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          totalMileage={availableMileage}
          onConfirm={handleConfirmExchange}
        />

        {/* 회수 확인 다이얼로그 */}
        <ConfirmDialog
          open={withdrawTarget !== null}
          title="환전 신청 회수"
          message="환전 신청 취소는 관리자에게 직접 문의해주세요."
          confirmLabel="확인"
          cancelLabel="닫기"
          onConfirm={handleWithdrawConfirm}
          onCancel={() => setWithdrawTarget(null)}
        />
      </Box>
    </LocalizationProvider>
  )
}
