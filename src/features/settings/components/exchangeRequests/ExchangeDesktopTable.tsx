// src/features/settings/components/exchangeRequests/ExchangeDesktopTable.tsx
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { AdminExchangeItem } from '@/api/types/mileage'
import type { usePageColors } from '@/theme/pageColors'
import type { useSettingsTheme } from '@/theme/settingsTheme'

const STATUS_MAP = {
  신청중: { label: '신청중', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  완료:   { label: '완료',   color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  반려:   { label: '반려',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)' },
}

interface Props {
  filtered: AdminExchangeItem[]
  allPendingSelected: boolean
  somePendingSelected: boolean
  pendingInViewCount: number
  selectedIds: Set<number>
  hasFilter: boolean
  colors: ReturnType<typeof usePageColors>
  st: ReturnType<typeof useSettingsTheme>
  onToggleAll: () => void
  onToggleRow: (id: number) => void
  onApprove: (item: AdminExchangeItem) => void
  onReject: (item: AdminExchangeItem) => void
  onViewHistory: (item: AdminExchangeItem) => void
}

export default function ExchangeDesktopTable({
  filtered, allPendingSelected, somePendingSelected, pendingInViewCount,
  selectedIds, hasFilter, colors, st,
  onToggleAll, onToggleRow, onApprove, onReject, onViewHistory,
}: Props) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: colors.cardBg, border: `1px solid ${colors.borderColor}`, boxShadow: colors.shadowSmall }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 820 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: st.subtleBg }}>
              <TableCell padding="checkbox" sx={{ borderBottom: `1px solid ${colors.borderColor}`, pl: 2 }}>
                <Checkbox size="small" checked={allPendingSelected} indeterminate={!allPendingSelected && somePendingSelected}
                  onChange={onToggleAll} disabled={pendingInViewCount === 0}
                  sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor }, '&.MuiCheckbox-indeterminate': { color: colors.accentColor } }}
                />
              </TableCell>
              {['신청일', '사원번호', '이름', '부서 / 직급', '신청 마일리지', '현금 환산', '상태', ''].map((col) => (
                <TableCell key={col} sx={{ color: colors.textSecondary, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: `1px solid ${colors.borderColor}`, py: 1.75, whiteSpace: 'nowrap' }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((item) => {
              const statusStyle = STATUS_MAP[item.status] ?? STATUS_MAP['신청중']
              const isPending = item.status === '신청중'
              const isSelected = selectedIds.has(item.id)
              return (
                <TableRow key={item.id} sx={{
                  transition: 'background-color 0.15s',
                  bgcolor: isSelected ? st.selectedRowBg : 'transparent',
                  '&:hover': { bgcolor: st.tableRowHoverBg },
                  '& .MuiTableCell-root': { borderBottom: `1px solid ${colors.borderColor}`, color: colors.textPrimary, py: 1.5, fontSize: '0.875rem' },
                  '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
                }}>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    {isPending && (
                      <Checkbox size="small" checked={isSelected} onChange={() => onToggleRow(item.id)}
                        sx={{ color: colors.textSecondary, '&.Mui-checked': { color: colors.accentColor } }}
                      />
                    )}
                  </TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: colors.textPrimary }}>{item.requestDate}</Typography></TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: colors.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>{item.employeeNumber}</Typography></TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} sx={{ color: colors.textPrimary }}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: colors.textSecondary }}>{item.department} · {item.position}</Typography></TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} sx={{ color: st.primaryColor }}>
                      {item.amount.toLocaleString()}<Box component="span" sx={{ fontWeight: 500, color: colors.textSecondary, ml: 0.5 }}>마리</Box>
                    </Typography>
                  </TableCell>
                  <TableCell><Typography variant="body2" fontWeight={600} sx={{ color: colors.textPrimary }}>{item.cashAmount.toLocaleString()}원</Typography></TableCell>
                  <TableCell>
                    <Chip label={statusStyle.label} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, fontWeight: 700, fontSize: '0.72rem', height: 22 }} />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right', pr: 2 }}>
                    <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'flex-end', alignItems: 'center' }}>
                      {isPending && (<>
                        <Button size="small" variant="outlined" startIcon={<CheckCircleIcon sx={{ fontSize: '0.85rem !important' }} />} onClick={() => onApprove(item)}
                          sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: '#10b981', borderColor: 'rgba(16,185,129,0.4)', '&:hover': { bgcolor: 'rgba(16,185,129,0.08)', borderColor: '#10b981' } }}>
                          지급 완료
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<BlockIcon sx={{ fontSize: '0.85rem !important' }} />} onClick={() => onReject(item)}
                          sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)', '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', borderColor: '#ef4444' } }}>
                          반려
                        </Button>
                      </>)}
                      <Button
                        size="small" variant="outlined"
                        startIcon={<ReceiptLongIcon sx={{ fontSize: '0.85rem !important' }} />}
                        onClick={() => onViewHistory(item)}
                        sx={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: 1.5, py: 0.3, px: 1.25, whiteSpace: 'nowrap', color: st.primaryColor, borderColor: `${st.primaryColor}50`, '&:hover': { bgcolor: `${st.primaryColor}0a`, borderColor: st.primaryColor } }}
                      >
                        내역
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: 'center', py: 8, border: 'none' }}>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    {hasFilter ? '검색 결과가 없습니다' : '현금 전환 신청 내역이 없습니다'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}
