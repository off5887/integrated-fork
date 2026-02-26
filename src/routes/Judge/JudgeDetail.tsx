// src/routes/Judge/JudgeDetail.tsx
import { Box, Dialog, DialogContent, Divider } from '@mui/material'
import AttachmentsSection from './components/AttachmentsSection'
import BasicInfoSection from './components/BasicInfoSection'
import ExecutionPlanSection from './components/ExecutionPlanSection'
import JudgeDetailActions from './components/JudgeDetailActions'
import JudgeDetailHeader from './components/JudgeDetailHeader'
import ParticipantsSection from './components/ParticipantsSection'
import ScheduleSection from './components/ScheduleSection'
import { Proposal } from './judgeData'

interface Props {
  proposal: Proposal
  onClose: () => void
  isDarkMode: boolean
}

export default function JudgeDetail({ proposal, onClose, isDarkMode }: Props) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          bgcolor: isDarkMode ? '#0f172a' : '#f8fafc',
          border: `1px solid ${isDarkMode ? '#1e293b' : '#e2e8f0'}`,
          boxShadow: isDarkMode
            ? '0 20px 60px -15px rgba(0,0,0,0.7)'
            : '0 20px 60px -15px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
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
          p: { xs: 5, md: 7 },
          pt: 4,
          pb: 6,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BasicInfoSection
            problem={proposal.problem}
            solution={proposal.solution}
            isDarkMode={isDarkMode}
          />

          <Divider sx={{ borderColor: isDarkMode ? '#1e293b' : '#e2e8f0' }} />

          <ParticipantsSection
            reviewer={proposal.reviewer}
            proposers={proposal.proposers}
            isDarkMode={isDarkMode}
          />

          <Divider sx={{ borderColor: isDarkMode ? '#1e293b' : '#e2e8f0' }} />

          <ScheduleSection
            startDate={proposal.startDate}
            endDate={proposal.endDate}
            scope={proposal.scope}
            isDarkMode={isDarkMode}
          />

          <Divider sx={{ borderColor: isDarkMode ? '#1e293b' : '#e2e8f0' }} />

          <ExecutionPlanSection
            executionPlan={proposal.executionPlan}
            isDarkMode={isDarkMode}
          />

          <Divider sx={{ borderColor: isDarkMode ? '#1e293b' : '#e2e8f0' }} />

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
