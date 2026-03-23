// src/routes/Judge/JudgeDetail.tsx
import { Box, Dialog, DialogContent } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import AttachmentsSection from './components/AttachmentsSection'
import BasicInfoSection from './components/BasicInfoSection'
import ExecutionPlanSection from './components/ExecutionPlanSection'
import JudgeDetailActions from './components/JudgeDetailActions'
import JudgeDetailHeader from './components/JudgeDetailHeader'
import ParticipantsSection from './components/ParticipantsSection'
import ScheduleSection from './components/ScheduleSection'
import { Proposal } from '@/api/types/judge'

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
  const { isDarkMode } = useThemeMode()
  const theme = getJudgeTheme(isDarkMode)
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
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
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
            executionPlan={proposal.executionPlan}
            expectedOutcome={proposal.expectedOutcome}
          />

          <SectionDivider />

          <AttachmentsSection
            attachments={proposal.attachments}
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
