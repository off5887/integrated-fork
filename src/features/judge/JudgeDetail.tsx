// src/routes/Judge/JudgeDetail.tsx
import GradingIcon from '@mui/icons-material/Grading'
import { Box, Dialog, DialogContent, LinearProgress, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'
import { useIdeaDetail } from '@/api/queries/useIdeas'
import type { Attachment, Proposal } from '@/api/types/judge'
import { toDateOnly } from '@/utils/dateUtils'
import AttachmentsSection from './components/AttachmentsSection'
import BasicInfoSection from './components/BasicInfoSection'
import ExecutionPlanSection from './components/ExecutionPlanSection'
import JudgeDetailActions from './components/JudgeDetailActions'
import JudgeDetailHeader from './components/JudgeDetailHeader'
import ParticipantsSection from './components/ParticipantsSection'
import ScheduleSection from './components/ScheduleSection'

interface Props {
  proposal: Proposal
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onApprove: (reason: string, scoreInnovation?: number, scoreFeasibility?: number, scoreProfitability?: number, awardedPoints?: number) => void
  onReject: (reason: string) => void
  onWithdrawApprove: (reason: string) => void
  onWithdrawReject: (reason: string) => void
  isFirst: boolean
  isLast: boolean
}

import type { IdeaDetailExtras } from '@/api/types/idea'

interface ReviewResultProps {
  detail: IdeaDetailExtras
  colors: ReturnType<typeof usePageColors>
  theme: ReturnType<typeof useJudgeTheme>
}

function ScoreBar({ label, value, colors }: { label: string; value: number; colors: ReviewResultProps['colors'] }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '0.78rem', color: colors.textSecondary }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: colors.textPrimary }}>{value}점</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6, borderRadius: 9999,
          bgcolor: 'rgba(99,102,241,0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 9999,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          },
        }}
      />
    </Box>
  )
}

function ReviewResultSection({ detail, colors, theme }: ReviewResultProps) {
  const hasScores = detail.scoreInnovation != null || detail.scoreFeasibility != null || detail.scoroProfitability != null
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <Box
          sx={{
            width: 28, height: 28, borderRadius: '50%',
            bgcolor: theme.sectionNumBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <GradingIcon sx={{ fontSize: '0.95rem', color: '#fff' }} />
        </Box>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: colors.textPrimary }}>
          심사 결과
        </Typography>
        {detail.reviewedAt && (
          <Typography sx={{ fontSize: '0.75rem', color: colors.textSecondary, ml: 'auto' }}>
            {toDateOnly(detail.reviewedAt)} 심사 완료
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* 점수 */}
        {hasScores && (
          <Box
            sx={{
              p: 2.5, borderRadius: 2.5,
              border: `1px solid ${colors.borderColor}`,
              bgcolor: 'rgba(99,102,241,0.04)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
              <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>
                {detail.ideaScore ?? '—'}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: colors.textSecondary }}>/ 100점</Typography>
              {detail.awardedPoints != null && detail.awardedPoints > 0 && (
                <Box
                  sx={{
                    ml: 'auto', px: 1.25, py: 0.4, borderRadius: 9999,
                    bgcolor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                  }}
                >
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                    +{detail.awardedPoints.toLocaleString()} 마일리지
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {detail.scoreInnovation    != null && <ScoreBar label="혁신성"  value={detail.scoreInnovation}    colors={colors} />}
              {detail.scoreFeasibility   != null && <ScoreBar label="실현가능성" value={detail.scoreFeasibility}   colors={colors} />}
              {detail.scoroProfitability != null && <ScoreBar label="수익성"   value={detail.scoroProfitability} colors={colors} />}
            </Box>
          </Box>
        )}

        {/* 심사 의견 */}
        {detail.reviewComment && (
          <Box
            sx={{
              p: 2, borderRadius: 2,
              border: `1px solid ${colors.borderColor}`,
              bgcolor: colors.cardBg,
            }}
          >
            <Typography sx={{ fontSize: '0.73rem', fontWeight: 700, color: colors.textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              심사 의견
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: colors.textPrimary, lineHeight: 1.7 }}>
              {detail.reviewComment}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

function SectionDivider() {
  const theme = useJudgeTheme()
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: theme.sectionDividerBg,
        my: 4,
      }}
    />
  )
}

export default function JudgeDetail({ proposal, onClose, onPrev, onNext, onApprove, onReject, onWithdrawApprove, onWithdrawReject, isFirst, isLast }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

  // 심사자/관리자도 실행계획·첨부파일 조회 가능 (백엔드 권한 확장)
  const { data: detail } = useIdeaDetail(proposal.id)

  const executors = detail?.executors ?? null
  const apiAttachments = detail?.attachments ?? []

  // 실행계획: API executors → 번호+날짜+내용 조합, 없으면 mock 데이터 사용
  const executionPlan: string = executors && executors.length > 0
    ? executors.map((e, i) => {
        const dateRange = e.endDate && e.endDate.slice(0, 10) !== e.startDate.slice(0, 10)
          ? `${toDateOnly(e.startDate)} ~ ${toDateOnly(e.endDate)}`
          : toDateOnly(e.startDate)
        return `${i + 1}. [${dateRange}] ${e.content}`
      }).join('\n\n')
    : proposal.executionPlan

  // 기대성과: 첫 executor의 expectedResult 사용, 없으면 mock 데이터 사용
  const expectedOutcome: string | undefined = executors && executors.length > 0
    ? executors.map((e) => e.expectedResult).filter(Boolean).join('\n') || undefined
    : proposal.expectedOutcome

  // 첨부파일: API 응답 우선, 없으면 mock 데이터 사용
  const attachments: Attachment[] = apiAttachments.length > 0
    ? apiAttachments.map((att) => ({
        name: att.originalName,
        url: `/api/ideas/${proposal.id}/attachments/${att.attachmentId}`,
      }))
    : proposal.attachments

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      aria-labelledby="judge-detail-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: theme.dialogBg,
            border: `1px solid ${colors.borderColor}`,
            boxShadow: theme.dialogShadow,
            overflow: 'hidden',
            maxHeight: '92vh',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: theme.backdropDetail,
          },
        },
      }}
    >
      <JudgeDetailHeader
        title={proposal.title}
        onClose={onClose}
        ideaType={proposal.ideaType}
        categories={proposal.categories}
        status={proposal.status}
      />

      <DialogContent
        sx={{
          p: { xs: 3, md: 5 },
          pt: 2,
          pb: 6,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.scrollTrackColor,
            borderRadius: '10px',
            margin: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.scrollThumbColor,
            borderRadius: '10px',
            border: `2px solid ${theme.scrollTrackColor}`,
            minHeight: '40px',
            transition: 'background 0.2s ease',
            '&:hover': {
              background: theme.scrollThumbHover,
            },
          },
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.5 }}>
          <BasicInfoSection
            ideaType={proposal.ideaType}
            categories={proposal.categories}
            problem={proposal.problem}
            solution={proposal.solution}
          />

          <SectionDivider />

          <ParticipantsSection
            reviewer={proposal.reviewer}
            author={proposal.author}
            coProposers={proposal.proposers}
          />

          <SectionDivider />

          <ScheduleSection
            startDate={proposal.startDate}
            endDate={proposal.endDate}
            security={proposal.security}
          />

          <SectionDivider />

          <ExecutionPlanSection
            executionPlan={executionPlan}
            expectedOutcome={expectedOutcome}
          />

          <SectionDivider />

          <AttachmentsSection
            attachments={attachments}
          />

          {/* 심사 결과 — 승인/반려된 건에만 표시 */}
          {detail && (detail.scoreInnovation != null || detail.reviewComment) && (
            <>
              <SectionDivider />
              <ReviewResultSection detail={detail} colors={colors} theme={theme} />
            </>
          )}
        </Box>
      </DialogContent>

      <JudgeDetailActions
        proposalTitle={proposal.title}
        status={proposal.status}
        isFirst={isFirst}
        isLast={isLast}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
        onApprove={onApprove}
        onReject={onReject}
        onWithdrawApprove={onWithdrawApprove}
        onWithdrawReject={onWithdrawReject}
      />
    </Dialog>
  )
}
