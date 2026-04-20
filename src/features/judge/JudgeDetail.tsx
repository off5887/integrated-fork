// src/routes/Judge/JudgeDetail.tsx
import { Box, Dialog, DialogContent } from '@mui/material'
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
  onApprove: (reason: string, scoreInnovation?: number, scoreFeasibility?: number, scoreProfitability?: number, mileage?: number) => void
  onReject: (reason: string) => void
  onWithdrawApprove: (reason: string) => void
  onWithdrawReject: (reason: string) => void
  isFirst: boolean
  isLast: boolean
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
    ? executors.map((e, i) => `${i + 1}. [${toDateOnly(e.scheduleDate)}] ${e.content}`).join('\n\n')
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
            proposers={proposal.proposers}
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
