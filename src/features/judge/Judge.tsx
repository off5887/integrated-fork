// src/routes/Judge/Judge.tsx
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { Box, Chip, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { judgeData } from '@/api/mock/judge'
import { Proposal } from '@/api/types/judge'
import { useCurrentUser } from '@/components/common/hooks/useCurrentUser'
import JudgeDetail from './JudgeDetail'
import ReviewerChangeModal from './components/ReviewerChangeModal'
import StatCard from './components/StatCard'
import JudgeTable from './components/JudgeTable'
import { statusConfig, type StatusFilter } from './config/judgeStatusConfig'

export default function Judge() {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)
  const user = useCurrentUser()

  const [isLoading, setIsLoading] = useState(true)
  const [proposals, setProposals] = useState<Proposal[]>(judgeData)
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [reviewerChangeTarget, setReviewerChangeTarget] = useState<Proposal | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // 내 심사 목록:
  // 1) 현재 내가 담당 심사자인 건 (심사대기/심사중/승인/반려)
  // 2) 내 심사 단계를 이미 지났으나 후속 단계(2차·3차)가 아직 진행 중인 건 (심사중 추적)
  const myName = user?.name ?? ''

  const myProposals = useMemo(() => {
    return proposals.filter((p) => {
      if (p.reviewer === myName) return true
      if (p.status === '심사중') {
        const myStage =
          p.reviewer1 === myName ? 1 :
          p.reviewer2 === myName ? 2 :
          p.reviewer3 === myName ? 3 : null
        if (myStage !== null && p.reviewStage > myStage) return true
      }
      return false
    })
  }, [proposals, myName])

  const stats = useMemo(() => ({
    // 심사대기: 아직 내가 심사 안 한 건 (status=심사대기 또는 status=심사중이지만 내가 현재 담당자)
    심사대기: myProposals.filter(
      (p) => p.status === '심사대기' || (p.status === '심사중' && p.reviewer === myName),
    ).length,
    // 심사중: 내가 이미 심사를 마치고 후속 단계가 진행 중인 건
    심사중: myProposals.filter((p) => p.status === '심사중' && p.reviewer !== myName).length,
    승인: myProposals.filter((p) => p.status === '승인').length,
    반려: myProposals.filter((p) => p.status === '반려').length,
  }), [myProposals, myName])

  const filteredProposals = useMemo(() => {
    if (statusFilter === '전체') return myProposals
    if (statusFilter === '심사대기') {
      return myProposals.filter(
        (p) => p.status === '심사대기' || (p.status === '심사중' && p.reviewer === myName),
      )
    }
    if (statusFilter === '심사중') {
      return myProposals.filter((p) => p.status === '심사중' && p.reviewer !== myName)
    }
    return myProposals.filter((p) => p.status === statusFilter)
  }, [myProposals, statusFilter, myName])

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
      prev.map((p) =>
        p.id === proposalId
          ? { ...p, reviewer: newReviewer, transferredFrom: p.reviewer }
          : p,
      ),
    )
  }

  const handleApprove = (_reason: string, score?: number, mileage?: number) => {
    if (!selectedProposal) return
    setProposals((prev) =>
      prev.map((p) =>
        p.id === selectedProposal.id
          ? {
              ...p,
              status: '승인' as const,
              ...(score !== undefined && { score }),
              ...(mileage !== undefined && { mileage }),
            }
          : p,
      ),
    )
    setSelectedProposal(null)
    // TODO: API 연동 시 reason, score, mileage와 함께 서버로 전송
  }

  const handleReject = (_reason: string) => {
    if (!selectedProposal) return
    setProposals((prev) =>
      prev.map((p) => (p.id === selectedProposal.id ? { ...p, status: '반려' as const } : p)),
    )
    setSelectedProposal(null)
    // TODO: API 연동 시 _reason과 함께 서버로 전송
  }

  const handleWithdrawApprove = (_reason: string) => {
    if (!selectedProposal) return
    setProposals((prev) =>
      prev.map((p) => (p.id === selectedProposal.id ? { ...p, status: '심사중' as const } : p)),
    )
    setSelectedProposal(null)
    // TODO: API 연동 시 _reason과 함께 서버로 전송
  }

  const handleWithdrawReject = (_reason: string) => {
    if (!selectedProposal) return
    setProposals((prev) =>
      prev.map((p) => (p.id === selectedProposal.id ? { ...p, status: '심사중' as const } : p)),
    )
    setSelectedProposal(null)
    // TODO: API 연동 시 _reason과 함께 서버로 전송
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
    if (selectedIndex < filteredProposals.length - 1)
      setSelectedProposal(filteredProposals[selectedIndex + 1])
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.bgBase,
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
              background: theme.accentGradientDiag,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            }}
          >
            <AssignmentTurnedInIcon sx={{ color: theme.primaryBtnColor, fontSize: '1.4rem' }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: colors.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              심사하기
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              제출된 제안을 검토하고 심사 결과를 입력하세요
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`전체 ${myProposals.length}건`}
              size="small"
              sx={{
                bgcolor: theme.totalChipBg,
                color: theme.totalChipColor,
                fontWeight: 700,
                fontSize: '0.8rem',
                border: `1px solid ${theme.totalChipBorder}`,
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
            active={statusFilter === '반려'}
            onClick={() => handleFilterChange(statusFilter === '반려' ? '전체' : '반려')}
          />
        </Box>

        {/* 필터 안내 */}
        {statusFilter !== '전체' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
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
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              {filteredProposals.length}건 표시 중
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <LoadingSpinner size={44} text="심사 목록을 불러오는 중..." />
          </Box>
        ) : filteredProposals.length === 0 ? (
          <Box
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`,
              boxShadow: colors.shadowSmall,
            }}
          >
            <AssignmentTurnedInIcon
              sx={{ fontSize: 48, color: colors.textSecondary, mb: 2, opacity: 0.4 }}
            />
            <Typography variant="h6" fontWeight={600} sx={{ color: colors.textPrimary, mb: 0.75 }}>
              {statusFilter === '전체' ? '심사할 글이 없습니다' : `'${statusFilter}' 항목이 없습니다`}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              {statusFilter === '전체'
                ? '현재 담당 부서의 제안이 모두 처리되었어요.'
                : '다른 필터를 선택해보세요.'}
            </Typography>
          </Box>
        ) : (
          <JudgeTable
            displayedData={displayedData}
            filteredTotal={filteredProposals.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowClick={setSelectedProposal}
            onReviewerChangeClick={setReviewerChangeTarget}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
          />
        )}
      </Box>

      {/* 상세 보기 다이얼로그 */}
      {selectedProposal && (
        <JudgeDetail
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          onApprove={handleApprove}
          onReject={handleReject}
          onWithdrawApprove={handleWithdrawApprove}
          onWithdrawReject={handleWithdrawReject}
          isFirst={isFirst}
          isLast={isLast}
        />
      )}

      {/* 결재자 변경 모달 */}
      <ReviewerChangeModal
        open={reviewerChangeTarget !== null}
        proposal={reviewerChangeTarget}
        onClose={() => setReviewerChangeTarget(null)}
        onConfirm={handleReviewerChange}
      />
    </Box>
  )
}
