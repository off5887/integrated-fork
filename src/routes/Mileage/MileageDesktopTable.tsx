// src/routes/MileageDesktopTable.tsx
import {
  alpha,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  data: any[]
  selected: number[]
  onToggle: (id: number) => void
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void
  page: number
  rowsPerPage: number
  total: number
  onPageChange: (event: unknown, newPage: number) => void
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MileageDesktopTable({
  data,
  selected,
  onToggle,
  onSelectAll,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const isDarkMode = useThemeMode().isDarkMode

  const colors = {
    surface2: isDarkMode ? 'rgba(30,41,59,0.94)' : 'rgba(255,255,255,0.97)',
    border: isDarkMode ? 'rgba(148,163,184,0.22)' : 'rgba(148,163,184,0.32)',
    textPrimary: isDarkMode ? '#f1f5f9' : '#0f172a',
    primary: isDarkMode ? '#6366f1' : '#4f46e5',
    success: isDarkMode ? '#34d399' : '#10b981',
    warning: isDarkMode ? '#fbbf24' : '#d97706',
    danger: isDarkMode ? '#f87171' : '#ef4444',
    selected: isDarkMode ? 'rgba(99,102,241,0.18)' : 'rgba(79,70,229,0.10)',
    hover: isDarkMode ? 'rgba(99,102,241,0.10)' : 'rgba(79,70,229,0.06)',
  }

  const tableTextColor = isDarkMode ? '#f1f5f9' : colors.textPrimary

  return (
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
            sx={{ bgcolor: alpha(colors.primary, isDarkMode ? 0.18 : 0.88) }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < total}
                checked={rowsPerPage > 0 && selected.length === data.length}
                onChange={onSelectAll}
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

        <TableBody sx={{ '& .MuiTableCell-root': { color: tableTextColor } }}>
          {data.map((item) => {
            const isSelectedRow = selected.includes(item.id)
            return (
              <TableRow
                hover
                selected={isSelectedRow}
                onClick={() => onToggle(item.id)}
                sx={{
                  bgcolor: isSelectedRow ? colors.selected : 'inherit',
                  '&:hover': { bgcolor: colors.hover },
                  cursor: 'pointer',
                  transition: 'background-color 0.16s',
                }}
                key={item.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelectedRow} color="primary" />
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
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="페이지당 행:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
        sx={{
          borderTop: `1px solid ${colors.border}`,
          color: colors.textSecondary,
          '.MuiTablePagination-select, .MuiTablePagination-selectIcon': {
            color: colors.textPrimary,
          },
          '.MuiTablePagination-displayedRows': { color: colors.textPrimary },
        }}
      />
    </Card>
  )
}
