// src/routes/Judge/JudgeDetail.tsx
import { Box, Dialog, DialogContent } from '@mui/material'
import AttachmentsSection from './components/AttachmentsSection'
import BasicInfoSection from './components/BasicInfoSection'
import ExecutionPlanSection from './components/ExecutionPlanSection'
import JudgeDetailActions from './components/JudgeDetailActions'
import JudgeDetailHeader from './components/JudgeDetailHeader'
import ParticipantsSection from './components/ParticipantsSection'
import ScheduleSection from './components/ScheduleSection'
import { Proposal } from './JudgeData'

interface Props {
  proposal: Proposal
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onApprove: (reason: string) => void
  onReject: (reason: string) => void
  isFirst: boolean
  isLast: boolean
  isDarkMode: boolean
}

function SectionDivider({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: isDarkMode
          ? 'rgba(148,163,184,0.08)'
          : 'rgba(203,213,225,0.4)',
        my: 4,
      }}
    />
  )
}

export default function JudgeDetail({ proposal, onClose, onPrev, onNext, onApprove, onReject, isFirst, isLast, isDarkMode }: Props) {
  const borderColor = isDarkMode
    ? 'rgba(148,163,184,0.1)'
    : 'rgba(203,213,225,0.5)'
  const scrollThumbColor = isDarkMode ? '#6366f1' : '#d8c7ff'
  const scrollTrackColor = isDarkMode
    ? 'rgba(30,41,59,0.4)'
    : 'rgba(241,245,249,0.7)'

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper" // paper 스크롤 방식으로 변경 (더 자연스러운 스크롤)
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode
              ? '0 24px 64px rgba(0,0,0,0.6)'
              : '0 24px 64px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            maxHeight: '92vh', // 너무 크지 않게 제한
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: isDarkMode
              ? 'rgba(0,0,0,0.65)'
              : 'rgba(0,0,0,0.45)',
          },
        },
      }}
    >
      <JudgeDetailHeader
        title={proposal.title}
        onClose={onClose}
        isDarkMode={isDarkMode}
      />

      <DialogContent
        sx={{
          p: { xs: 3, md: 5 },
          pt: 2,
          pb: 6,
          // 현대적인 스크롤바 스타일 적용
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px', // 아주 얇게
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: scrollTrackColor,
            borderRadius: '10px',
            margin: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: scrollThumbColor,
            borderRadius: '10px',
            border: `2px solid ${scrollTrackColor}`, // 테두리로 깔끔하게
            minHeight: '40px',
            transition: 'background 0.2s ease',
            '&:hover': {
              background: isDarkMode ? '#7c7ff2' : '#a78bfa',
            },
          },
          // 모바일 터치 스크롤 최적화
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.5 }}>
          <BasicInfoSection
            problem={proposal.problem}
            solution={proposal.solution}
            isDarkMode={isDarkMode}
          />

          <SectionDivider isDarkMode={isDarkMode} />

          <ParticipantsSection
            reviewer={proposal.reviewer}
            proposers={proposal.proposers}
            isDarkMode={isDarkMode}
          />

          <SectionDivider isDarkMode={isDarkMode} />

          <ScheduleSection
            startDate={proposal.startDate}
            endDate={proposal.endDate}
            scope={proposal.scope}
            isDarkMode={isDarkMode}
          />

          <SectionDivider isDarkMode={isDarkMode} />

          <ExecutionPlanSection
            executionPlan={proposal.executionPlan}
            isDarkMode={isDarkMode}
          />

          <SectionDivider isDarkMode={isDarkMode} />

          <AttachmentsSection
            attachments={proposal.attachments}
            isDarkMode={isDarkMode}
          />
        </Box>
      </DialogContent>

      <JudgeDetailActions
        proposalTitle={proposal.title}
        isFirst={isFirst}
        isLast={isLast}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
        onApprove={onApprove}
        onReject={onReject}
        isDarkMode={isDarkMode}
      />
    </Dialog>
  )
}
