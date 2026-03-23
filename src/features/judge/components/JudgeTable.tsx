import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import { Proposal } from '@/api/types/judge'
import { statusConfig } from '../config/judgeStatusConfig'

interface JudgeTableProps {
  displayedData: Proposal[]
  filteredTotal: number
  page: number
  rowsPerPage: number
  onRowClick: (item: Proposal) => void
  onReviewerChangeClick: (item: Proposal) => void
  onPageChange: (_: unknown, newPage: number) => void
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function JudgeTable({
  displayedData,
  filteredTotal,
  page,
  rowsPerPage,
  onRowClick,
  onReviewerChangeClick,
  onPageChange,
  onRowsPerPageChange,
}: JudgeTableProps) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.borderColor}`,
        boxShadow: colors.cardShadow,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ height: 3, background: theme.accentGradientExtended }} />

      {/* 모바일 카드 뷰 (xs only) */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 1.25, p: 1.5 }}>
        {displayedData.map((item) => {
          const status = statusConfig[item.status]
          const isPending = item.status === '심사대기' || item.status === '심사중'
          return (
            <Box
              key={item.id}
              onClick={() => onRowClick(item)}
              sx={{
                p: 2,
                borderRadius: 2.5,
                border: `1.5px solid ${item.transferredFrom ? theme.transferredBadgeBorder : colors.borderColor}`,
                bgcolor: item.transferredFrom ? theme.transferredRowBg : colors.cardBg,
                boxShadow: item.transferredFrom ? theme.transferredRowShadow : colors.shadowSmall,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: item.transferredFrom ? theme.transferredRowHover : colors.rowHoverBg,
                },
              }}
            >
              {/* 제목 + 상태 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    fontSize: '0.88rem', fontWeight: 600, color: colors.textPrimary,
                    flex: 1, minWidth: 0, lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </Typography>
                <Chip
                  label={status.label}
                  size="small"
                  sx={{ bgcolor: status.bg, color: status.color, border: `1px solid ${status.border}`, fontWeight: 700, fontSize: '0.68rem', height: 22, flexShrink: 0 }}
                />
              </Box>

              {/* 이관 배지 */}
              {item.transferredFrom && (
                <Box
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.4, mb: 1,
                    px: 0.8, py: 0.25, borderRadius: 1,
                    bgcolor: theme.transferredBadgeBg, border: `1px solid ${theme.transferredBadgeBorder}`,
                  }}
                >
                  <SwapHorizIcon sx={{ fontSize: '0.62rem', color: theme.transferredColor }} />
                  <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: theme.transferredColor }}>
                    이관됨 · {item.transferredFrom}
                  </Typography>
                </Box>
              )}

              {/* 메타 + 버튼 */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontSize: '0.74rem', color: colors.textSecondary }}>
                    {item.proposers.join(', ')}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: colors.textSecondary, opacity: 0.5 }}>·</Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: colors.textSecondary }}>
                    {item.submittedAt}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
                  <Tooltip title={isPending ? `결재자 변경 (${item.reviewer})` : '완료된 항목은 변경 불가'}>
                    <Box component="span">
                      <IconButton
                        size="small"
                        disabled={!isPending}
                        aria-label={isPending ? `결재자 변경 (현재: ${item.reviewer})` : '완료된 항목은 변경 불가'}
                        onClick={(e) => { e.stopPropagation(); onReviewerChangeClick(item) }}
                        sx={{
                          width: 30, height: 30,
                          color: isPending ? theme.reviewerBtnColor : colors.textSecondary,
                          bgcolor: isPending ? theme.reviewerBtnBg : 'transparent',
                          border: isPending ? `1px solid ${theme.reviewerBtnBorder}` : '1px solid transparent',
                          '&:hover': { bgcolor: theme.reviewerBtnHoverBg, borderColor: theme.reviewerBtnHoverBorder, color: theme.primaryIconColor },
                          '&.Mui-disabled': { opacity: 0.28 },
                        }}
                      >
                        <SwapHorizIcon sx={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    </Box>
                  </Tooltip>
                  <Tooltip title="상세 보기">
                    <IconButton
                      size="small"
                      aria-label="상세 보기"
                      onClick={(e) => { e.stopPropagation(); onRowClick(item) }}
                      sx={{
                        width: 30, height: 30,
                        color: colors.textSecondary,
                        '&:hover': { bgcolor: theme.viewBtnHoverBg, color: theme.primaryIconColor },
                      }}
                    >
                      <OpenInNewIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* 테이블 뷰 (sm+) */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 680 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: colors.headerBg }}>
              {[
                { label: '번호', sx: { display: { xs: 'none', sm: 'table-cell' } } },
                { label: '제안 제목', sx: {} },
                { label: '제안자', sx: { display: { xs: 'none', md: 'table-cell' } } },
                { label: '제출일', sx: { display: { xs: 'none', lg: 'table-cell' } } },
                { label: '상태', sx: {} },
                { label: '결재자 변경', sx: {}, align: 'center' as const },
                { label: '상세', sx: {}, align: 'center' as const },
              ].map((col) => (
                <TableCell
                  key={col.label}
                  align={col.align}
                  scope="col"
                  sx={{
                    color: colors.textSecondary,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    py: 1.75,
                    borderBottomColor: colors.borderColor,
                    whiteSpace: 'nowrap',
                    ...col.sx,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedData.map((item) => {
              const status = statusConfig[item.status]
              const isPending = item.status === '심사대기' || item.status === '심사중'
              return (
                <TableRow
                  key={item.id}
                  onClick={() => onRowClick(item)}
                  hover
                  sx={{
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                    ...(item.transferredFrom && {
                      boxShadow: theme.transferredRowShadow,
                      bgcolor: theme.transferredRowBg,
                    }),
                    '&:hover': {
                      bgcolor: item.transferredFrom
                        ? theme.transferredRowHover
                        : colors.rowHoverBg,
                    },
                    '& .MuiTableCell-root': {
                      borderBottomColor: colors.borderColor,
                      py: 1.75,
                      color: colors.textPrimary,
                    },
                  }}
                >
                  {/* 번호 */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography sx={{ fontSize: '0.8rem', color: colors.textSecondary, fontWeight: 500 }}>
                      #{item.id}
                    </Typography>
                  </TableCell>

                  {/* 제안 제목 */}
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography
                          sx={{ fontSize: '0.9rem', color: colors.textPrimary, fontWeight: 500 }}
                        >
                          {item.title}
                        </Typography>
                        {/* 모바일: 상태 인라인 표시 */}
                        <Chip
                          label={status.label}
                          size="small"
                          sx={{
                            display: { xs: 'flex', sm: 'none' },
                            bgcolor: status.bg,
                            color: status.color,
                            border: `1px solid ${status.border}`,
                            fontWeight: 600,
                            fontSize: '0.68rem',
                            height: 20,
                          }}
                        />
                      </Box>

                      {/* 이관 배지 */}
                      {item.transferredFrom && (
                        <Tooltip
                          title={`결재자 변경된 항목 · 이전 담당자: ${item.transferredFrom}`}
                          placement="right"
                          arrow
                        >
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.4,
                              width: 'fit-content',
                              px: 0.8,
                              py: 0.2,
                              borderRadius: 1,
                              bgcolor: theme.transferredBadgeBg,
                              border: `1px solid ${theme.transferredBadgeBorder}`,
                              cursor: 'default',
                            }}
                          >
                            <SwapHorizIcon sx={{ fontSize: '0.65rem', color: theme.transferredColor }} />
                            <Typography
                              sx={{ fontSize: '0.65rem', fontWeight: 700, color: theme.transferredColor, lineHeight: 1 }}
                            >
                              이관됨 · {item.transferredFrom}
                            </Typography>
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                  {/* 제안자 */}
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography sx={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                      {item.proposers.join(', ')}
                    </Typography>
                  </TableCell>

                  {/* 제출일 */}
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                    <Typography sx={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                      {item.submittedAt}
                    </Typography>
                  </TableCell>

                  {/* 상태 + 심사 단계 */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        bgcolor: status.bg,
                        color: status.color,
                        border: `1px solid ${status.border}`,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  </TableCell>

                  {/* 결재자 변경 */}
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Tooltip
                      title={
                        isPending
                          ? `결재자 변경 (현재: ${item.reviewer})`
                          : '완료된 항목은 변경 불가'
                      }
                      placement="top"
                    >
                      <Box component="span">
                        <IconButton
                          size="small"
                          disabled={!isPending}
                          onClick={(e) => {
                            e.stopPropagation()
                            onReviewerChangeClick(item)
                          }}
                          sx={{
                            width: 30,
                            height: 30,
                            color: isPending
                              ? theme.reviewerBtnColor
                              : colors.textSecondary,
                            bgcolor: isPending
                              ? theme.reviewerBtnBg
                              : 'transparent',
                            border: isPending
                              ? `1px solid ${theme.reviewerBtnBorder}`
                              : `1px solid transparent`,
                            '&:hover': {
                              bgcolor: theme.reviewerBtnHoverBg,
                              borderColor: theme.reviewerBtnHoverBorder,
                              color: theme.primaryIconColor,
                            },
                            '&.Mui-disabled': { opacity: 0.28 },
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <SwapHorizIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Box>
                    </Tooltip>
                  </TableCell>

                  {/* 상세 */}
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="상세 보기" placement="left">
                      <IconButton
                        size="small"
                        aria-label="상세 보기"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRowClick(item)
                        }}
                        sx={{
                          color: colors.textSecondary,
                          width: 30,
                          height: 30,
                          '&:hover': {
                            bgcolor: theme.viewBtnHoverBg,
                            color: theme.primaryIconColor,
                          },
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ borderTop: `1px solid ${colors.borderColor}` }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{
            color: colors.textSecondary,
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              color: colors.textSecondary,
              fontSize: '0.8rem',
            },
            '.MuiTablePagination-select': { color: colors.textPrimary },
            '.MuiTablePagination-selectIcon': { color: colors.textSecondary },
            '.MuiTablePagination-actions button': { color: colors.textSecondary },
          }}
        />
      </Box>
    </Box>
  )
}
