// src/routes/Mileage/MileageDesktopTable.tsx
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'

interface Props {
  data: any[]
  page: number
  rowsPerPage: number
  total: number
  onPageChange: (event: unknown, newPage: number) => void
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const STATUS_MAP: Record<string, { color: string; bg: string; border: string }> = {
  전환완료:   { color: '#10b981', bg: '#10b98112', border: '#10b98128' },
  전환요청중: { color: '#f59e0b', bg: '#f59e0b12', border: '#f59e0b28' },
  default:   { color: '#ef4444', bg: '#ef444412', border: '#ef444428' },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.default
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center',
        px: 1.25, py: 0.35, borderRadius: '999px',
        bgcolor: s.bg, border: `1px solid ${s.border}`,
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: s.color, mr: 0.75, flexShrink: 0 }} />
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: s.color }}>{status}</Typography>
    </Box>
  )
}

const HEAD_COLS = ['번호', '지급일', '지급내역', '생선', '상태']

export default function MileageDesktopTable({
  data, page, rowsPerPage, total, onPageChange, onRowsPerPageChange,
}: Props) {
  const { isDarkMode } = useThemeMode()

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const headBg        = isDarkMode ? 'rgba(148,163,184,0.06)' : 'rgba(248,250,252,0.9)'
  const hoverBg       = isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(248,250,252,0.8)'

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3, overflow: 'hidden',
        bgcolor: isDarkMode ? 'rgba(22,30,46,0.92)' : '#ffffff',
        border: `1px solid ${borderColor}`,
        boxShadow: isDarkMode ? '0 2px 16px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: headBg }}>
            {HEAD_COLS.map((col) => (
              <TableCell
                key={col}
                sx={{
                  color: textSecondary, fontWeight: 600,
                  fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderBottom: `1px solid ${borderColor}`, py: 1.75,
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                transition: 'background-color 0.15s',
                '&:hover': { bgcolor: hoverBg },
                '& .MuiTableCell-root': {
                  borderBottom: `1px solid ${borderColor}`,
                  color: textPrimary, py: 1.75, fontSize: '0.875rem',
                },
                '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
              }}
            >
              <TableCell>
                <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 500 }}>
                  #{item.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: textPrimary }}>{item.paymentDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: textPrimary }}>{item.detail}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#6366f1' }}>
                  {item.fish.toLocaleString()}
                  <Box component="span" sx={{ fontWeight: 500, color: textSecondary, ml: 0.5 }}>마리</Box>
                </Typography>
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8, border: 'none' }}>
                <Typography variant="body2" sx={{ color: textSecondary }}>표시할 데이터가 없습니다</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="페이지당:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
        sx={{
          borderTop: `1px solid ${borderColor}`,
          color: textSecondary, fontSize: '0.8rem',
          '.MuiTablePagination-select, .MuiTablePagination-selectIcon': { color: textPrimary },
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': { color: textSecondary, fontSize: '0.8rem' },
          '.MuiIconButton-root': { color: textSecondary },
          '.MuiIconButton-root.Mui-disabled': { color: borderColor },
        }}
      />
    </Card>
  )
}
