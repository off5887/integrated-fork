// src/routes/Judge/Judge.tsx
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
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
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import { judgeData, Proposal } from './JudgeData'
import JudgeDetail from './JudgeDetail'
import ReviewerChangeModal from './components/ReviewerChangeModal'

const statusConfig = {
  심사대기: {
    label: '심사대기',
    bg: 'rgba(245,158,11,0.1)',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.25)',
  },
  심사중: {
    label: '심사중',
    bg: 'rgba(99,102,241,0.1)',
    color: '#6366f1',
    border: 'rgba(99,102,241,0.25)',
  },
  승인: {
    label: '승인',
    bg: 'rgba(16,185,129,0.1)',
    color: '#10b981',
    border: 'rgba(16,185,129,0.25)',
  },
  반려: {
    label: '반려',
    bg: 'rgba(239,68,68,0.1)',
    color: '#ef4444',
    border: 'rgba(239,68,68,0.25)',
  },
} as const

type StatusFilter = '전체' | '심사대기' | '심사중' | '승인' | '반려'

// ─── 내 결재 현황 요약 카드 ───────────────────────────────────────────────────

interface StatCardProps {
  label: string
  count: number
  color: string
  bg: string
  border: string
  icon: React.ReactNode
  isDarkMode: boolean
  active: boolean
  onClick: () => void
}

function StatCard({ label, count, color, bg, border, icon, isDarkMode, active, onClick }: StatCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        flex: '1 1 120px',
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2.5,
        border: `1px solid ${active ? border : isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'}`,
        bgcolor: active
          ? bg
          : isDarkMode ? 'rgba(22,30,46,0.6)' : '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        transition: 'all 0.15s ease',
        '&:hover': {
          bgcolor: bg,
          borderColor: border,
        },
        boxShadow: active
          ? isDarkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)'
          : 'none',
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: bg,
          border: `1px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontWeight: 800,
            color,
            lineHeight: 1,
            mb: 0.25,
          }}
        >
          {count}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.72rem',
            color: active ? color : isDarkMode ? '#94a3b8' : '#64748b',
            fontWeight: active ? 700 : 500,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export default function Judge() {
  const { isDarkMode } = useThemeMode()

  // mutable proposals state (reviewer 변경을 위해)
  const [proposals, setProposals] = useState<Proposal[]>(judgeData)
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [reviewerChangeTarget, setReviewerChangeTarget] = useState<Proposal | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'
  const headerBg = isDarkMode ? 'rgba(15,23,42,0.8)' : 'rgba(248,250,252,0.9)'
  const rowHoverBg = isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'

  // 통계
  const stats = useMemo(() => ({
    심사대기: proposals.filter((p) => p.status === '심사대기').length,
    심사중: proposals.filter((p) => p.status === '심사중').length,
    승인: proposals.filter((p) => p.status === '승인').length,
    반려: proposals.filter((p) => p.status === '반려').length,
  }), [proposals])

  // 필터링
  const filteredProposals = useMemo(() => {
    if (statusFilter === '전체') return proposals
    return proposals.filter((p) => p.status === statusFilter)
  }, [proposals, statusFilter])

  const displayedData = filteredProposals.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const handleFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter)
    setPage(0)
  }

  const handleReviewerChange = (proposalId: number, newReviewer: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, reviewer: newReviewer } : p)),
    )
  }

  const selectedIndex = selectedProposal
    ? filteredProposals.findIndex((p) => p.id === selectedProposal.id)
    : -1
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex >= filteredProposals.length - 1

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedProposal(filteredProposals[selectedIndex - 1])
  }
  const handleNext = () => {
    if (selectedIndex < filteredProposals.length - 1) setSelectedProposal(filteredProposals[selectedIndex + 1])
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
        pt: { xs: 9, md: 10 },
        pb: 14,
        px: { xs: 2, sm: 3 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            }}
          >
            <AssignmentTurnedInIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              심사하기
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              제출된 제안을 검토하고 심사 결과를 입력하세요
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`전체 ${proposals.length}건`}
              size="small"
              sx={{
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)'}`,
              }}
            />
          </Box>
        </Box>

        {/* 내 결재 현황 요약 */}
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, mb: 3.5, flexWrap: 'wrap' }}>
          <StatCard
            label="심사대기"
            count={stats.심사대기}
            color="#f59e0b"
            bg="rgba(245,158,11,0.08)"
            border="rgba(245,158,11,0.25)"
            icon={<HourglassEmptyIcon sx={{ fontSize: '1.1rem' }} />}
            isDarkMode={isDarkMode}
            active={statusFilter === '심사대기'}
            onClick={() => handleFilterChange(statusFilter === '심사대기' ? '전체' : '심사대기')}
          />
          <StatCard
            label="심사중"
            count={stats.심사중}
            color="#6366f1"
            bg="rgba(99,102,241,0.08)"
            border="rgba(99,102,241,0.25)"
            icon={<PendingActionsIcon sx={{ fontSize: '1.1rem' }} />}
            isDarkMode={isDarkMode}
            active={statusFilter === '심사중'}
            onClick={() => handleFilterChange(statusFilter === '심사중' ? '전체' : '심사중')}
          />
          <StatCard
            label="승인"
            count={stats.승인}
            color="#10b981"
            bg="rgba(16,185,129,0.08)"
            border="rgba(16,185,129,0.25)"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />}
            isDarkMode={isDarkMode}
            active={statusFilter === '승인'}
            onClick={() => handleFilterChange(statusFilter === '승인' ? '전체' : '승인')}
          />
          <StatCard
            label="반려"
            count={stats.반려}
            color="#ef4444"
            bg="rgba(239,68,68,0.08)"
            border="rgba(239,68,68,0.25)"
            icon={<DoNotDisturbIcon sx={{ fontSize: '1.1rem' }} />}
            isDarkMode={isDarkMode}
            active={statusFilter === '반려'}
            onClick={() => handleFilterChange(statusFilter === '반려' ? '전체' : '반려')}
          />
        </Box>

        {/* 필터 안내 */}
        {statusFilter !== '전체' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              필터:
            </Typography>
            <Chip
              label={statusFilter}
              size="small"
              onDelete={() => handleFilterChange('전체')}
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                bgcolor: statusConfig[statusFilter].bg,
                color: statusConfig[statusFilter].color,
                border: `1px solid ${statusConfig[statusFilter].border}`,
                '& .MuiChip-deleteIcon': { color: statusConfig[statusFilter].color, opacity: 0.7 },
              }}
            />
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {filteredProposals.length}건 표시 중
            </Typography>
          </Box>
        )}

        {filteredProposals.length === 0 ? (
          <Box
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.05)',
            }}
          >
            <AssignmentTurnedInIcon
              sx={{ fontSize: 48, color: textSecondary, mb: 2, opacity: 0.4 }}
            />
            <Typography variant="h6" fontWeight={600} sx={{ color: textPrimary, mb: 0.75 }}>
              {statusFilter === '전체' ? '심사할 글이 없습니다' : `'${statusFilter}' 항목이 없습니다`}
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary }}>
              {statusFilter === '전체'
                ? '현재 담당 부서의 제안이 모두 처리되었어요.'
                : '다른 필터를 선택해보세요.'}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: 3,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

            {/* 테이블 — 모바일 수평 스크롤 */}
            <Box sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 680 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: headerBg }}>
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
                        sx={{
                          color: textSecondary,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          py: 1.75,
                          borderBottomColor: borderColor,
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
                        onClick={() => setSelectedProposal(item)}
                        hover
                        sx={{
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                          '&:hover': { bgcolor: rowHoverBg },
                          '& .MuiTableCell-root': {
                            borderBottomColor: borderColor,
                            py: 1.75,
                            color: textPrimary,
                          },
                        }}
                      >
                        {/* 번호 */}
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                          <Typography sx={{ fontSize: '0.8rem', color: textSecondary, fontWeight: 500 }}>
                            #{item.id}
                          </Typography>
                        </TableCell>

                        {/* 제안 제목 */}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              sx={{ fontSize: '0.9rem', color: textPrimary, fontWeight: 500 }}
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
                        </TableCell>

                        {/* 제안자 */}
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                          <Typography sx={{ fontSize: '0.875rem', color: textSecondary }}>
                            {item.proposers.join(', ')}
                          </Typography>
                        </TableCell>

                        {/* 제출일 */}
                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                          <Typography sx={{ fontSize: '0.875rem', color: textSecondary }}>
                            {item.submittedAt}
                          </Typography>
                        </TableCell>

                        {/* 상태 */}
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
                                  setReviewerChangeTarget(item)
                                }}
                                sx={{
                                  width: 30,
                                  height: 30,
                                  color: isPending
                                    ? isDarkMode ? '#a5b4fc' : '#6366f1'
                                    : textSecondary,
                                  bgcolor: isPending
                                    ? isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)'
                                    : 'transparent',
                                  border: isPending
                                    ? `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'}`
                                    : `1px solid transparent`,
                                  '&:hover': {
                                    bgcolor: isDarkMode
                                      ? 'rgba(99,102,241,0.18)'
                                      : 'rgba(99,102,241,0.1)',
                                    borderColor: '#6366f1',
                                    color: '#6366f1',
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
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedProposal(item)
                              }}
                              sx={{
                                color: textSecondary,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: isDarkMode
                                    ? 'rgba(99,102,241,0.15)'
                                    : 'rgba(99,102,241,0.08)',
                                  color: '#6366f1',
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

            <Box sx={{ borderTop: `1px solid ${borderColor}` }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredProposals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage(0)
                }}
                sx={{
                  color: textSecondary,
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    color: textSecondary,
                    fontSize: '0.8rem',
                  },
                  '.MuiTablePagination-select': { color: textPrimary },
                  '.MuiTablePagination-selectIcon': { color: textSecondary },
                  '.MuiTablePagination-actions button': { color: textSecondary },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* 상세 보기 다이얼로그 */}
      {selectedProposal && (
        <JudgeDetail
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={isFirst}
          isLast={isLast}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 결재자 변경 모달 */}
      <ReviewerChangeModal
        open={reviewerChangeTarget !== null}
        proposal={reviewerChangeTarget}
        onClose={() => setReviewerChangeTarget(null)}
        onConfirm={handleReviewerChange}
        isDarkMode={isDarkMode}
      />
    </Box>
  )
}
