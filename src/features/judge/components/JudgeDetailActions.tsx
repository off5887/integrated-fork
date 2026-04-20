// src/routes/Judge/components/JudgeDetailActions.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import UndoIcon from '@mui/icons-material/Undo'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'
import type { DecisionType, Proposal } from '@/api/types/judge'
import JudgeDecisionModal from './JudgeDecisionModal'

interface Props {
  proposalTitle: string
  status: Proposal['status']
  isFirst: boolean
  isLast: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onApprove: (reason: string, scoreInnovation?: number, scoreFeasibility?: number, scoreProfitability?: number, mileage?: number) => void
  onReject: (reason: string) => void
  onWithdrawApprove: (reason: string) => void
  onWithdrawReject: (reason: string) => void
}

export default function JudgeDetailActions({
  proposalTitle, status,
  isFirst, isLast,
  onClose, onPrev, onNext,
  onApprove, onReject, onWithdrawApprove, onWithdrawReject,
}: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

  const [decisionType, setDecisionType] = useState<DecisionType | null>(null)

  const handleConfirm = (type: DecisionType, reason: string, scoreInnovation?: number, scoreFeasibility?: number, scoreProfitability?: number, mileage?: number) => {
    if (type === '승인') onApprove(reason, scoreInnovation, scoreFeasibility, scoreProfitability, mileage)
    else if (type === '반려') onReject(reason)
    else if (type === '승인회수') onWithdrawApprove(reason)
    else onWithdrawReject(reason)
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

          {status === '승인' ? (
            <Button
              variant="contained"
              startIcon={<UndoIcon sx={{ fontSize: '1rem' }} />}
              size="small"
              onClick={() => setDecisionType('승인회수')}
              sx={{
                borderRadius: 1.5,
                px: 2.5, py: 0.9,
                fontWeight: 700,
                fontSize: '0.82rem',
                bgcolor: theme.withdrawApproveBtnBg,
                color: theme.withdrawApproveColor,
                border: `1px solid ${theme.withdrawApproveBtnBorder}`,
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: theme.withdrawApproveColor,
                  color: theme.primaryBtnColor,
                  border: `1px solid ${theme.withdrawApproveColor}`,
                  boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              승인 회수
            </Button>
          ) : status === '반려' ? (
            <Button
              variant="contained"
              startIcon={<UndoIcon sx={{ fontSize: '1rem' }} />}
              size="small"
              onClick={() => setDecisionType('반려회수')}
              sx={{
                borderRadius: 1.5,
                px: 2.5, py: 0.9,
                fontWeight: 700,
                fontSize: '0.82rem',
                bgcolor: theme.withdrawRejectBtnBg,
                color: theme.withdrawRejectColor,
                border: `1px solid ${theme.withdrawRejectBtnBorder}`,
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: theme.withdrawRejectColor,
                  color: theme.primaryBtnColor,
                  border: `1px solid ${theme.withdrawRejectColor}`,
                  boxShadow: '0 4px 14px rgba(13,148,136,0.35)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              반려 회수
            </Button>
          ) : (
            <>
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
                  color: theme.rejectColor,
                  border: `1px solid ${theme.rejectBtnBorder}`,
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: theme.rejectColor,
                    color: theme.primaryBtnColor,
                    border: `1px solid ${theme.rejectColor}`,
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
                  bgcolor: theme.primaryBtnBg,
                  color: theme.primaryBtnColor,
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: theme.primaryBtnHoverBg,
                    boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                승인
              </Button>
            </>
          )}
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
