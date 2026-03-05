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
  isDarkMode: boolean
}

function SectionDivider({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.4)',
      }}
    />
  )
}

export default function JudgeDetail({ proposal, onClose, isDarkMode }: Props) {
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
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
          },
        },
      }}
    >
      <JudgeDetailHeader
        title={proposal.title}
        onClose={onClose}
        isDarkMode={isDarkMode}
      />

      <DialogContent sx={{ p: { xs: 3, md: 5 }, pt: 4, pb: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
        proposalId={proposal.id}
        onClose={onClose}
        isDarkMode={isDarkMode}
      />
    </Dialog>
  )
}
