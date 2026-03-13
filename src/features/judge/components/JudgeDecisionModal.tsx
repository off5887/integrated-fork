// src/routes/Judge/components/JudgeDecisionModal.tsx
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'

export type DecisionType = '승인' | '반려'

interface Props {
  open: boolean
  type: DecisionType | null
  proposalTitle: string
  onClose: () => void
  onConfirm: (type: DecisionType, reason: string) => void
}

const MAX_CHARS = 500

export default function JudgeDecisionModal({
  open,
  type,
  proposalTitle,
  onClose,
  onConfirm,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  const [reason, setReason] = useState('')
  const [touched, setTouched] = useState(false)

  const isApprove = type === '승인'
  const accentColor = isApprove ? '#6366f1' : '#ef4444'
  const accentBg = isApprove ? 'rgba(99,102,241,0.1)' : 'rgba(239,68,68,0.1)'
  const accentBorder = isApprove ? 'rgba(99,102,241,0.3)' : 'rgba(239,68,68,0.3)'
  const accentBgLight = isApprove ? 'rgba(99,102,241,0.06)' : 'rgba(239,68,68,0.06)'

  const isError = touched && reason.trim().length === 0
  const charCount = reason.length
  const isOverLimit = charCount > MAX_CHARS

  const handleClose = () => {
    setReason('')
    setTouched(false)
    onClose()
  }

  const handleConfirm = () => {
    setTouched(true)
    if (!type || reason.trim().length === 0 || isOverLimit) return
    onConfirm(type, reason.trim())
    setReason('')
    setTouched(false)
  }

  if (!type) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: theme.dialogBg,
            border: `1px solid ${colors.borderColor}`,
            boxShadow: theme.dialogShadow,
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: theme.backdropBg,
          },
        },
      }}
    >
      {/* 상단 컬러 스트립 */}
      <Box
        sx={{
          height: 3,
          background: isApprove
            ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
            : 'linear-gradient(90deg, #ef4444, #f97316)',
        }}
      />

      {/* 헤더 */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          pt: 2.5,
          pb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          borderBottom: `1px solid ${colors.borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            bgcolor: accentBg,
            border: `1px solid ${accentBorder}`,
            color: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {isApprove
            ? <CheckCircleOutlineIcon sx={{ fontSize: '1.2rem' }} />
            : <DoNotDisturbIcon sx={{ fontSize: '1.2rem' }} />
          }
        </Box>

        <Box flex={1} minWidth={0}>
          <Typography
            fontWeight={700}
            sx={{ color: accentColor, fontSize: '1rem', lineHeight: 1.3 }}
          >
            {isApprove ? '제안 승인' : '제안 반려'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.textSecondary,
              display: 'block',
              mt: 0.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {proposalTitle}
          </Typography>
        </Box>

        <IconButton size="small" onClick={handleClose} sx={{ color: colors.textSecondary, flexShrink: 0 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, pb: 2 }}>
        {/* 안내 배너 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.25,
            p: 1.75,
            mb: 2.5,
            borderRadius: 2,
            bgcolor: accentBgLight,
            border: `1px solid ${accentBorder}`,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: '1rem', color: accentColor, flexShrink: 0, mt: 0.1 }} />
          <Typography variant="caption" sx={{ color: theme.decisionBannerText, lineHeight: 1.6 }}>
            {isApprove
              ? '승인 후에는 취소가 어렵습니다. 승인 사유를 명확하게 작성해 주세요. 작성된 사유는 제안자에게 전달됩니다.'
              : '반려 후에는 제안자가 내용을 수정하여 재제출할 수 있습니다. 반려 사유를 구체적으로 작성해 주세요. 작성된 사유는 제안자에게 전달됩니다.'}
          </Typography>
        </Box>

        {/* 사유 입력 */}
        <Box sx={{ mb: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.8rem' }}
            >
              {isApprove ? '승인 사유' : '반려 사유'}
              <Box component="span" sx={{ color: accentColor, ml: 0.5 }}>*</Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isOverLimit ? '#ef4444' : colors.textSecondary,
                fontSize: '0.72rem',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {charCount} / {MAX_CHARS}
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder={
              isApprove
                ? '승인 사유를 입력해 주세요. (예: 제안 내용이 현실적이며 비용 절감 효과가 명확합니다.)'
                : '반려 사유를 입력해 주세요. (예: 실행 가능성에 대한 근거가 부족합니다. 구체적인 비용 계획 보완 후 재제출 바랍니다.)'
            }
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
              if (!touched) setTouched(true)
            }}
            error={isError || isOverLimit}
            helperText={
              isError
                ? `${isApprove ? '승인' : '반려'} 사유를 입력해 주세요.`
                : isOverLimit
                ? `최대 ${MAX_CHARS}자까지 입력 가능합니다.`
                : ''
            }
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: theme.decisionInputBg,
                fontSize: '0.875rem',
                color: colors.textPrimary,
                alignItems: 'flex-start',
                '& fieldset': {
                  borderColor: isError || isOverLimit ? '#ef4444' : colors.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: isError || isOverLimit ? '#ef4444' : accentColor + '66',
                },
                '&.Mui-focused fieldset': {
                  borderColor: isError || isOverLimit ? '#ef4444' : accentColor,
                },
              },
              '& .MuiInputBase-input': {
                color: colors.textPrimary,
                lineHeight: 1.65,
                '&::placeholder': { color: colors.textSecondary, opacity: 1 },
              },
              '& .MuiFormHelperText-root': {
                fontSize: '0.75rem',
                mt: 0.5,
                mx: 0,
              },
            }}
          />
        </Box>
      </DialogContent>

      {/* 하단 버튼 */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 2,
          borderTop: `1px solid ${colors.borderColor}`,
          display: 'flex',
          gap: 1.5,
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          bgcolor: theme.decisionModalFooterBg,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleClose}
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            py: 0.85,
            fontWeight: 600,
            fontSize: '0.82rem',
            textTransform: 'none',
            borderColor: theme.decisionCancelBorder,
            color: colors.textSecondary,
            '&:hover': { borderColor: colors.textSecondary, bgcolor: 'transparent' },
          }}
        >
          취소
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={handleConfirm}
          disabled={isOverLimit}
          startIcon={
            isApprove
              ? <CheckCircleOutlineIcon sx={{ fontSize: '0.95rem' }} />
              : <DoNotDisturbIcon sx={{ fontSize: '0.95rem' }} />
          }
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            py: 0.85,
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'none',
            boxShadow: 'none',
            ...(isApprove
              ? {
                  bgcolor: '#6366f1',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#4f46e5',
                    boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                  },
                }
              : {
                  bgcolor: theme.rejectBtnBg,
                  color: '#ef4444',
                  border: `1px solid ${theme.rejectBtnBorder}`,
                  '&:hover': {
                    bgcolor: '#ef4444',
                    color: '#fff',
                    border: '1px solid #ef4444',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
                  },
                }),
            '&.Mui-disabled': { opacity: 0.38 },
            transition: 'all 0.2s ease',
          }}
        >
          {isApprove ? '승인하기' : '반려하기'}
        </Button>
      </Box>
    </Dialog>
  )
}
