// src/routes/MileagePage.tsx
import {
  alpha,
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
  useTheme,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import { data } from './data'

// 임시 데이터 타입
interface PaymentItem {
  id: number
  paymentDate: string
  detail: string
  fish: number
  status: '미전환' | '전환완료' | '전환요청중'
}

export default function MileagePage() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<number[]>([])
  const [openDialog, setOpenDialog] = useState(false)

  // ── 필터링 & 계산값 ─────────────────────────────────────────────
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = dayjs(item.paymentDate)
      const inRange =
        (startDate ? date.isAfter(startDate.startOf('day')) : true) &&
        (endDate ? date.isBefore(endDate.endOf('day')) : true)
      return (
        inRange && item.detail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [startDate, endDate, searchTerm, data])

  const totalFish = useMemo(
    () => data.reduce((sum, item) => sum + item.fish, 0),
    [data],
  )

  const thisMonthFish = useMemo(() => {
    const now = dayjs()
    return data.reduce((sum, item) => {
      const date = dayjs(item.paymentDate)
      return date.month() === now.month() && date.year() === now.year()
        ? sum + item.fish
        : sum
    }, 0)
  }, [data])

  const thisMonthExchanged = useMemo(() => {
    const now = dayjs()
    return data.reduce((sum, item) => {
      const date = dayjs(item.paymentDate)
      return date.month() === now.month() &&
        date.year() === now.year() &&
        item.status === '전환완료'
        ? sum + item.fish
        : sum
    }, 0)
  }, [data])

  const selectedFishSum = selected.reduce((sum, id) => {
    const item = data.find((it) => it.id === id)
    return item ? sum + item.fish : sum
  }, 0)

  // ── 핸들러 ───────────────────────────────────────────────────────
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => item.id)
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleExchange = () => setOpenDialog(true)

  const handleConfirmExchange = () => {
    console.log('환전 신청:', selectedFishSum, '마리')
    setOpenDialog(false)
    setSelected([])
  }

  const isSelected = (id: number) => selected.includes(id)

  // ── 세련된 통일 컬러 팔레트 ──────────────────────────────────────
  const colors = {
    // 배경
    pageBg: isDarkMode ? '#0f172a' : '#f8fafc',
    surface: isDarkMode ? '#1e293b' : '#ffffff',
    surface2: isDarkMode ? 'rgba(30,41,59,0.94)' : 'rgba(255,255,255,0.97)',
    border: isDarkMode ? 'rgba(148,163,184,0.22)' : 'rgba(148,163,184,0.32)',

    // 텍스트
    textPrimary: isDarkMode ? '#f1f5f9' : '#0f172a',
    textSecondary: isDarkMode ? '#cbd5e1' : '#475569',
    textTertiary: isDarkMode ? '#94a3b8' : '#64748b',

    // 포인트 (indigo 계열 통일)
    primary: isDarkMode ? '#6366f1' : '#4f46e5',
    primaryHover: isDarkMode ? '#818cf8' : '#4338ca',
    primaryLight: isDarkMode ? '#a5b4fc' : '#6366f1',

    // 상태 색상
    success: isDarkMode ? '#34d399' : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#d97706',
    danger: isDarkMode ? '#f87171' : '#ef4444',

    // hover & selected
    hover: isDarkMode ? 'rgba(99,102,241,0.09)' : 'rgba(79,70,229,0.05)',
    selected: isDarkMode ? 'rgba(99,102,241,0.16)' : 'rgba(79,70,229,0.08)',
  }

  // 다크모드 전용 테이블 본문 텍스트 색상 (요청하신 대로 밝게)
  const tableBodyTextColor = isDarkMode ? '#f1f5f9' : colors.textPrimary

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 3, md: 6 },
          width: 1,
          px: { xs: 3, md: 25 },
          mx: 'auto',
          bgcolor: colors.pageBg,
          minHeight: '100vh',
          color: colors.textPrimary,
        }}
      >
        {/* 상단 지표 카드 */}
        <Grid container spacing={3} sx={{ mb: 7 }}>
          {[
            {
              emoji: '🐟',
              title: '내가 잡은 생선',
              value: totalFish,
              color: colors.primaryLight,
              bgAlpha: colors.primary,
            },
            {
              emoji: '🌱',
              title: '이달에 잡은 생선',
              value: thisMonthFish,
              color: colors.success,
              bgAlpha: colors.success,
            },
            {
              emoji: '💰',
              title: '이달에 바꾼 생선',
              value: thisMonthExchanged,
              color: colors.warning,
              bgAlpha: colors.warning,
            },
          ].map((card, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: colors.surface2,
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.22s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: isDarkMode
                      ? '0 20px 50px rgba(0,0,0,0.38)'
                      : '0 20px 50px rgba(79,70,229,0.12)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      bgcolor: alpha(card.bgAlpha, isDarkMode ? 0.18 : 0.11),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2.5,
                    }}
                  >
                    <Typography variant="h4">{card.emoji}</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: colors.textPrimary }}
                  >
                    {card.title}
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    color: card.color,
                    lineHeight: 1.1,
                  }}
                >
                  {card.value.toLocaleString()}
                  <Typography
                    component="span"
                    variant="h5"
                    sx={{ ml: 1, color: colors.textSecondary }}
                  >
                    마리
                  </Typography>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 필터 영역 */}
        <Box sx={{ mb: 6, display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
          <DatePicker
            label="시작 날짜"
            value={startDate}
            onChange={setStartDate}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'medium',
                sx: {
                  minWidth: 180,
                  '& .MuiInputBase-root': { bgcolor: colors.surface },
                  '& .MuiInputBase-input': { color: colors.textPrimary },
                  '& .MuiInputLabel-root': { color: colors.textSecondary },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.textSecondary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary,
                    borderWidth: 1.5,
                  },
                },
              },
            }}
          />

          <DatePicker
            label="종료 날짜"
            value={endDate}
            onChange={setEndDate}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'medium',
                sx: {
                  minWidth: 180,
                  '& .MuiInputBase-root': { bgcolor: colors.surface },
                  '& .MuiInputBase-input': { color: colors.textPrimary },
                  '& .MuiInputLabel-root': { color: colors.textSecondary },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.textSecondary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary,
                    borderWidth: 1.5,
                  },
                },
              },
            }}
          />

          <TextField
            label="지급내역 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{
              minWidth: 240,
              flex: 1,
              maxWidth: { xs: '100%', sm: 320 },
              '& .MuiInputBase-root': { bgcolor: colors.surface },
              '& .MuiInputBase-input': { color: colors.textPrimary },
              '& .MuiInputLabel-root': { color: colors.textSecondary },
              '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.border,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.textSecondary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
                borderWidth: 1.5,
              },
            }}
          />
        </Box>

        {/* 선택 합계 + 버튼 */}
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} color={colors.textPrimary}>
            선택된 생선 합: <strong>{selectedFishSum.toLocaleString()}</strong>{' '}
            마리
          </Typography>

          <Button
            variant="contained"
            disableElevation
            disabled={selected.length === 0}
            onClick={handleExchange}
            sx={{
              borderRadius: 2.5,
              px: 5,
              py: 1.4,
              fontWeight: 600,
              fontSize: '1.05rem',
              minWidth: 180,
              bgcolor: colors.primary,
              color: '#ffffff',
              '&:hover': {
                bgcolor: colors.primaryHover,
              },
              '&.Mui-disabled': {
                bgcolor: alpha(colors.primary, 0.4),
                color: alpha('#ffffff', 0.7),
              },
            }}
          >
            현금전환하기
          </Button>
        </Box>

        {/* 테이블 */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: colors.surface2,
            border: `1px solid ${colors.border}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: alpha(colors.primary, isDarkMode ? 0.18 : 0.88),
                }}
              >
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
                    sx={{ color: isDarkMode ? '#e0e7ff' : '#ffffff' }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: isDarkMode ? '#e0e7ff' : '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  번호
                </TableCell>
                <TableCell
                  sx={{
                    color: isDarkMode ? '#e0e7ff' : '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  지급일
                </TableCell>
                <TableCell
                  sx={{
                    color: isDarkMode ? '#e0e7ff' : '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  지급내역
                </TableCell>
                <TableCell
                  sx={{
                    color: isDarkMode ? '#e0e7ff' : '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  생선
                </TableCell>
                <TableCell
                  sx={{
                    color: isDarkMode ? '#e0e7ff' : '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  현금 전환상태
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{ '& .MuiTableCell-root': { color: tableBodyTextColor } }}
            >
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const selectedRow = isSelected(item.id)
                  return (
                    <TableRow
                      hover
                      selected={selectedRow}
                      onClick={(e) => handleClick(e, item.id)}
                      sx={{
                        bgcolor: selectedRow ? colors.selected : 'inherit',
                        '&:hover': { bgcolor: colors.hover },
                        cursor: 'pointer',
                        transition: 'background-color 0.16s',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedRow} color="primary" />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.paymentDate}</TableCell>
                      <TableCell>{item.detail}</TableCell>
                      <TableCell fontWeight={600}>{item.fish}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            color:
                              item.status === '전환완료'
                                ? colors.success
                                : item.status === '전환요청중'
                                  ? colors.warning
                                  : colors.danger,
                          }}
                        >
                          {item.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="페이지당 행:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} / ${count}`
            }
            sx={{
              borderTop: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              '.MuiTablePagination-select, .MuiTablePagination-selectIcon': {
                color: colors.textPrimary,
              },
              '.MuiTablePagination-displayedRows': {
                color: colors.textPrimary,
              },
            }}
          />
        </Card>

        {/* 다이얼로그 */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              bgcolor: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.textPrimary,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>
            현금 전환 신청
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              {selectedFishSum.toLocaleString()} 마리
            </Typography>
            <Typography variant="body1" color={colors.textSecondary}>
              선택한 생선을 현금으로 전환하시겠습니까?
              <br />
              <strong>전환 후에는 취소할 수 없습니다.</strong>
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(false)}
              sx={{
                minWidth: 120,
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmExchange}
              sx={{
                minWidth: 120,
                bgcolor: colors.primary,
                color: '#ffffff',
                '&:hover': { bgcolor: colors.primaryHover },
              }}
            >
              전환 신청
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}
