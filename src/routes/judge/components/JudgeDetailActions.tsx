// src/routes/Judge/components/JudgeDetailActions.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import JudgeDecisionModal, { DecisionType } from './JudgeDecisionModal'

interface Props {
  proposalTitle: string
  isFirst: boolean
  isLast: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onApprove: (reason: string) => void
  onReject: (reason: string) => void
}

export default function JudgeDetailActions({
  proposalTitle,
  isFirst,
  isLast,
  onClose,
  onPrev,
  onNext,
  onApprove,
  onReject,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  const [decisionType, setDecisionType] = useState<DecisionType | null>(null)

  const handleConfirm = (type: DecisionType, reason: string) => {
    if (type === '승인') onApprove(reason)
    else onReject(reason)
    setDecisionType(null)
  }

  return (
    <>
      <Box
        sx={{
          px: { xs: 3, md: 5 },
          py: 2.5,
          borderTop: `1px solid ${colors.borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          bgcolor: theme.footerBgActions,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: '0.9rem' }} />}
            disabled={isFirst}
            onClick={onPrev}
            size="small"
            sx={{
              borderRadius: 1.5,
              px: 2, py: 0.9,
              fontWeight: 500,
              fontSize: '0.82rem',
              color: colors.textSecondary,
              '&:hover': {
                bgcolor: theme.navBtnHoverBg,
              },
              '&.Mui-disabled': { opacity: 0.35 },
            }}
          >
            이전
          </Button>
          <Button
            endIcon={<ArrowForwardIcon sx={{ fontSize: '0.9rem' }} />}
            disabled={isLast}
            onClick={onNext}
            size="small"
            sx={{
              borderRadius: 1.5,
              px: 2, py: 0.9,
              fontWeight: 500,
              fontSize: '0.82rem',
              color: colors.textSecondary,
              '&:hover': {
                bgcolor: theme.navBtnHoverBg,
              },
              '&.Mui-disabled': { opacity: 0.35 },
            }}
          >
            다음
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            size="small"
            sx={{
              borderRadius: 1.5,
              px: 2.5, py: 0.9,
              fontWeight: 600,
              fontSize: '0.82rem',
              borderColor: theme.closeBtnBorder,
              color: colors.textSecondary,
              '&:hover': {
                borderColor: theme.closeBtnHoverBorder,
                bgcolor: 'transparent',
              },
            }}
          >
            닫기
          </Button>

          <Button
            variant="contained"
            startIcon={<DoNotDisturbIcon sx={{ fontSize: '1rem' }} />}
            size="small"
            onClick={() => setDecisionType('반려')}
            sx={{
              borderRadius: 1.5,
              px: 2.5, py: 0.9,
              fontWeight: 700,
              fontSize: '0.82rem',
              bgcolor: theme.rejectBtnBg,
              color: '#ef4444',
              border: `1px solid ${theme.rejectBtnBorder}`,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#ef4444',
                color: '#fff',
                border: '1px solid #ef4444',
                boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            반려
          </Button>

          <Button
            variant="contained"
            startIcon={<CheckCircleOutlineIcon sx={{ fontSize: '1rem' }} />}
            size="small"
            onClick={() => setDecisionType('승인')}
            sx={{
              borderRadius: 1.5,
              px: 2.5, py: 0.9,
              fontWeight: 700,
              fontSize: '0.82rem',
              bgcolor: '#6366f1',
              color: '#fff',
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            승인
          </Button>
        </Box>
      </Box>

      <JudgeDecisionModal
        open={decisionType !== null}
        type={decisionType}
        proposalTitle={proposalTitle}
        onClose={() => setDecisionType(null)}
        onConfirm={handleConfirm}
      />
    </>
  )
}
