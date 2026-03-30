import { useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import GroupIcon from '@mui/icons-material/Group'
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'
import type { SectionReviewer } from '@/api/types/settings'

interface Props {
  reviewers: SectionReviewer[]
  isLoading: boolean
  onEdit: (r: SectionReviewer) => void
  onDelete: (id: number) => void
}

export default function SectionReviewerTable({ reviewers, isLoading, onEdit, onDelete }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, headerBg, rowBg, rowHoverBg } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])

  const columns = [
    { label: '부서',      hide: false },
    { label: '심사자',    hide: false },
    { label: '직급',      hide: true  },
    { label: '1차 심사',  hide: true  },
    { label: '상태',      hide: false },
    { label: '',          hide: false },
  ]

  return (
    <Box sx={{ borderRadius: 2.5, border: `1px solid ${borderColor}`, overflow: 'hidden', overflowX: 'auto' }}>
      <Table sx={{ minWidth: { xs: 0, sm: 560 } }}>
        <TableHead>
          <TableRow sx={{ bgcolor: headerBg }}>
            {columns.map(({ label, hide }, i) => (
              <TableCell
                key={label || `col-${i}`}
                align={i === 5 ? 'right' : 'left'}
                sx={{
                  color: textSecondary, fontWeight: 600, fontSize: '0.72rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  py: 1.75, px: { xs: 1.5, sm: 2 }, borderBottomColor: borderColor,
                  display: hide ? { xs: 'none', sm: 'table-cell' } : 'table-cell',
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6, color: textSecondary, borderBottomColor: borderColor }}>
                불러오는 중...
              </TableCell>
            </TableRow>
          ) : reviewers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6, borderBottomColor: borderColor }}>
                <GroupIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1, display: 'block', mx: 'auto' }} />
                <Typography variant="body2" sx={{ color: textSecondary }}>지정된 심사자가 없습니다</Typography>
              </TableCell>
            </TableRow>
          ) : (
            reviewers.map(r => (
              <TableRow
                key={r.id}
                sx={{
                  bgcolor: rowBg,
                  '&:hover': { bgcolor: rowHoverBg },
                  '& .MuiTableCell-root': { borderBottomColor: borderColor, py: { xs: 1, sm: 1.5 }, px: { xs: 1.5, sm: 2 } },
                  opacity: r.isActive ? 1 : 0.5,
                }}
              >
                <TableCell>
                  <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, fontWeight: 600, color: textPrimary, whiteSpace: 'nowrap' }}>
                    {r.deptNm}
                  </Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace', display: { xs: 'none', sm: 'block' } }}>
                    {r.deptCd}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, bgcolor: st.avatarBgLight, color: st.primaryColor, fontSize: '0.68rem', fontWeight: 700, border: `1px solid ${st.avatarBorder}`, flexShrink: 0 }}>
                      {r.name[0]}
                    </Avatar>
                    <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, fontWeight: 600, color: textPrimary, whiteSpace: 'nowrap' }}>
                      {r.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{r.rollNm || '-'}</Typography>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <Chip label={`${r.reviewStage}차`} size="small" sx={{ fontSize: '0.72rem', fontWeight: 700, bgcolor: st.chipBg, color: st.primaryColor, border: `1px solid ${st.avatarBorder}` }} />
                </TableCell>

                <TableCell>
                  <Chip
                    label={r.isActive ? '활성' : '비활성'}
                    size="small"
                    sx={{
                      fontSize: '0.7rem', fontWeight: 700,
                      bgcolor: r.isActive ? st.activeChipBg : st.inactiveChipBg,
                      color: r.isActive ? st.activeChipColor : st.inactiveChipColor,
                      border: `1px solid ${r.isActive ? st.activeChipBorder : st.inactiveChipBorder}`,
                    }}
                  />
                </TableCell>

                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  <Tooltip title="수정">
                    <IconButton size="small" onClick={() => onEdit(r)} sx={{ mr: 0.5, color: textSecondary, opacity: 0.6, '&:hover': { color: st.primaryColor, opacity: 1, bgcolor: st.accentIconHoverBg } }}>
                      <EditIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="제외">
                    <IconButton size="small" onClick={() => onDelete(r.id)} sx={{ color: textSecondary, opacity: 0.6, '&:hover': { color: st.deleteHoverColor, opacity: 1, bgcolor: st.deleteHoverBg } }}>
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  )
}
