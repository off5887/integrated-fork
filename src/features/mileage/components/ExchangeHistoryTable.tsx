// src/routes/Mileage/ExchangeHistoryTable.tsx
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'
import type { ExchangeItem } from '@/api/types/mileage'

interface Props {
  data: ExchangeItem[]
}

const STATUS_MAP: Record<string, { color: string; bg: string; border: string }> = {
  완료:   { color: '#10b981', bg: '#10b98112', border: '#10b98128' },
  신청중: { color: '#f59e0b', bg: '#f59e0b12', border: '#f59e0b28' },
  반려:   { color: '#ef4444', bg: '#ef444412', border: '#ef444428' },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.신청중
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.35, borderRadius: '999px', bgcolor: s.bg, border: `1px solid ${s.border}` }}>
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: s.color, mr: 0.75, flexShrink: 0 }} />
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: s.color }}>{status}</Typography>
    </Box>
  )
}

const HEAD_COLS = ['번호', '신청일', '신청 마일리지', '현금 환산', '상태']

export default function ExchangeHistoryTable({ data }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3, overflow: 'hidden',
        bgcolor: t.cardBg,
        border: `1px solid ${t.borderColor}`,
        boxShadow: t.cardShadowLarge,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: t.headBg }}>
            {HEAD_COLS.map((col) => (
              <TableCell
                key={col}
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
                <Typography variant="body2" sx={{ color: t.textSecondary, fontWeight: 500 }}>#{item.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: t.textPrimary }}>{item.requestDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#6366f1' }}>
                  {item.amount.toLocaleString()}
                  <Box component="span" sx={{ fontWeight: 500, color: t.textSecondary, ml: 0.5 }}>마리</Box>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={600} sx={{ color: t.cashAmountColor }}>
                  {item.cashAmount.toLocaleString()}원
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
                <Typography variant="body2" sx={{ color: t.textSecondary }}>환전 신청 내역이 없습니다</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
