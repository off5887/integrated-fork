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
import { useMileageTheme } from '@/theme/mileageTheme'
import type { AwardItem } from '@/api/types/mileage'

interface Props {
  data: AwardItem[]
  page: number
  rowsPerPage: number
  total: number
  onPageChange: (event: unknown, newPage: number) => void
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const HEAD_COLS = ['번호', '지급일', '지급내역', '생선', '점수']

export default function MileageDesktopTable({
  data, page, rowsPerPage, total, onPageChange, onRowsPerPageChange,
}: Props) {
  const t = useMileageTheme()

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3, overflow: 'hidden',
        bgcolor: t.cardBg,
        border: `1px solid ${t.borderColor}`,
        boxShadow: t.cardShadow,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: t.headBg }}>
            {HEAD_COLS.map((col) => (
              <TableCell
                key={col}
                scope="col"
                sx={{
                  color: t.textSecondary, fontWeight: 600,
                  fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderBottom: `1px solid ${t.borderColor}`, py: 1.75,
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
                '&:hover': { bgcolor: t.rowHoverBg },
                '& .MuiTableCell-root': {
                  borderBottom: `1px solid ${t.borderColor}`,
                  color: t.textPrimary, py: 1.75, fontSize: '0.875rem',
                },
                '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
              }}
            >
              <TableCell>
                <Typography variant="body2" sx={{ color: t.textSecondary, fontWeight: 500 }}>
                  #{item.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: t.textPrimary }}>{item.paymentDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: t.textPrimary }}>{item.detail}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={700} sx={{ color: t.primaryColor }}>
                  {item.fish.toLocaleString()}
                  <Box component="span" sx={{ fontWeight: 500, color: t.textSecondary, ml: 0.5 }}>마리</Box>
                </Typography>
              </TableCell>
              <TableCell>
                {item.score != null ? (
                  <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 0.4 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: t.primaryColor }}>
                      {item.score}
                    </Typography>
                    <Typography variant="caption" sx={{ color: t.textSecondary, fontWeight: 500 }}>점</Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: t.textSecondary }}>—</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8, border: 'none' }}>
                <Typography variant="body2" sx={{ color: t.textSecondary }}>표시할 데이터가 없습니다</Typography>
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
          borderTop: `1px solid ${t.borderColor}`,
          color: t.textSecondary, fontSize: '0.8rem',
          '.MuiTablePagination-select, .MuiTablePagination-selectIcon': { color: t.textPrimary },
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': { color: t.textSecondary, fontSize: '0.8rem' },
          '.MuiIconButton-root': { color: t.textSecondary },
          '.MuiIconButton-root.Mui-disabled': { color: t.borderColor },
        }}
      />
    </Card>
  )
}
