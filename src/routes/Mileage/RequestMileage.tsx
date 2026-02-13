// src/routes/MileagePage.tsx (or src/pages/MileagePage.tsx - 라우팅에 추가하세요)
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'
import { data } from './data' // 임시 데이터 import

// 임시 데이터 타입
interface PaymentItem {
  id: number
  paymentDate: string
  detail: string
  fish: number
  status: '미전환' | '전환완료' | '전환요청중'
}

export default function MileagePage() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<number[]>([])
  const [openDialog, setOpenDialog] = useState(false)

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (startDate ? date.isAfter(startDate.startOf('day')) : true) &&
        (endDate ? date.isBefore(endDate.endOf('day')) : true)
      const matchesSearch = item.detail
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      return inRange && matchesSearch
    })
  }, [startDate, endDate, searchTerm])

  // 전체 생선 계산
  const totalFish = useMemo(
    () => data.reduce((sum, item) => sum + item.fish, 0),
    [],
  )
  const thisMonthFish = useMemo(() => {
    const now = dayjs()
    return data.reduce((sum, item) => {
      const date = dayjs(item.paymentDate)
      if (date.month() === now.month() && date.year() === now.year())
        return sum + item.fish
      return sum
    }, 0)
  }, [])
  const thisMonthExchanged = useMemo(() => {
    const now = dayjs()
    return data.reduce((sum, item) => {
      const date = dayjs(item.paymentDate)
      if (
        date.month() === now.month() &&
        date.year() === now.year() &&
        item.status === '전환완료'
      )
        return sum + item.fish
      return sum
    }, 0)
  }, [])

  // 선택된 row의 생선 합
  const selectedFishSum = selected.reduce((sum, id) => {
    const item = data.find((item) => item.id === id)
    return item ? sum + item.fish : sum
  }, 0)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => item.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleExchange = () => {
    setOpenDialog(true)
  }

  const handleConfirmExchange = () => {
    // 여기서 환전 API 호출 (임시 콘솔)
    console.log('환전 신청: ', selectedFishSum + ' 마리')
    setOpenDialog(false)
    setSelected([])
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 3, md: 6 },
          maxWidth: 1400,
          mx: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {/* 상단 지표 카드 3개 */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* 1. 내가 잡은 생선 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(99,102,241,0.15)',
                bgcolor:
                  'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))',
                border: '1px solid',
                borderColor: alpha('#6366f1', 0.3),
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(99,102,241,0.25)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: alpha('#6366f1', 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" color="primary.main">
                    🐟
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="700" color="text.primary">
                  내가 잡은 생선
                </Typography>
              </Box>
              <Typography
                variant="h3"
                fontWeight="900"
                sx={{
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                {totalFish.toLocaleString()}
                <Typography
                  component="span"
                  variant="h5"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  마리
                </Typography>
              </Typography>
            </Card>
          </Grid>

          {/* 2. 이달에 잡은 생선 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(16,185,129,0.15)',
                bgcolor:
                  'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(52,211,153,0.05))',
                border: '1px solid',
                borderColor: alpha('#10b981', 0.3),
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(16,185,129,0.25)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: alpha('#10b981', 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" color="success.main">
                    🌱
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="700" color="text.primary">
                  이달에 잡은 생선
                </Typography>
              </Box>
              <Typography
                variant="h3"
                fontWeight="900"
                sx={{
                  color: 'success.main',
                  lineHeight: 1,
                }}
              >
                {thisMonthFish.toLocaleString()}
                <Typography
                  component="span"
                  variant="h5"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  마리
                </Typography>
              </Typography>
            </Card>
          </Grid>

          {/* 3. 이달에 바꾼 생선 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(234,179,8,0.15)',
                bgcolor:
                  'linear-gradient(135deg, rgba(234,179,8,0.05), rgba(245,158,11,0.05))',
                border: '1px solid',
                borderColor: alpha('#eab308', 0.3),
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(234,179,8,0.25)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: alpha('#eab308', 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" color="#eab308">
                    💰
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="700" color="text.primary">
                  이달에 바꾼 생선
                </Typography>
              </Box>
              <Typography
                variant="h3"
                fontWeight="900"
                sx={{
                  color: '#eab308',
                  lineHeight: 1,
                }}
              >
                {thisMonthExchanged.toLocaleString()}
                <Typography
                  component="span"
                  variant="h5"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  마리
                </Typography>
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* 기간 필터 */}
        <Box sx={{ mb: 6, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <DatePicker
            label="시작 날짜"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                sx={{ maxWidth: 200 }}
              />
            )}
          />

          <DatePicker
            label="종료 날짜"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                sx={{ maxWidth: 200 }}
              />
            )}
          />

          <TextField
            label="지급내역 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 300 }}
          />
        </Box>

        {/* 테이블 상단 합산 + 버튼 */}
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="700">
            선택된 생선 합: {selectedFishSum.toLocaleString()} 마리
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={selected.length === 0}
            onClick={handleExchange}
            sx={{
              borderRadius: 4,
              py: 1.5,
              px: 4,
              fontWeight: 600,
            }}
          >
            현금전환하기
          </Button>
        </Box>

        {/* 테이블 */}
        <Card
          sx={{ borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredData.length
                    }
                    checked={
                      rowsPerPage > 0 &&
                      selected.length ===
                        filteredData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        ).length
                    }
                    onChange={handleSelectAllClick}
                    sx={{ color: 'white' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  번호
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  지급일
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  지급내역
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  생선
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                  현금 전환상태
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isItemSelected = isSelected(item.id)
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                      sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.paymentDate}</TableCell>
                      <TableCell>{item.detail}</TableCell>
                      <TableCell>{item.fish}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
          />
        </Card>

        {/* 환전 확인 팝업 (레이어 팝업) */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>
            환전 신청
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              선택된 생선 합: {selectedFishSum.toLocaleString()} 마리
            </Typography>
            <Typography variant="body1" color="text.secondary">
              환전을 신청하시겠습니까? (환전 후 취소 불가)
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              sx={{ minWidth: 120 }}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirmExchange}
              variant="contained"
              color="primary"
              sx={{ minWidth: 120 }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}
