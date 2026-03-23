// src/routes/Judge/components/JudgeDecisionModal.tsx
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import UndoIcon from '@mui/icons-material/Undo'
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
import type { DecisionType } from '@/api/types/judge'
import { stageConfig } from '../config/judgeStageConfig'
import { decisionConfig } from '../config/judgeDecisionConfig'

interface Props {
  open: boolean
  type: DecisionType | null
  proposalTitle: string
  reviewStage: 1 | 2 | 3
  onClose: () => void
  onConfirm: (type: DecisionType, reason: string, score?: number, mileage?: number) => void
}

const MAX_CHARS = 500

export default function JudgeDecisionModal({
  open,
  type,
  proposalTitle,
  reviewStage,
  onClose,
  onConfirm,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  const [reason, setReason] = useState('')
  const [touched, setTouched] = useState(false)
  const [score, setScore] = useState('')
  const [mileage, setMileage] = useState('')

  const isApprove = type === '승인'
  const isWithdraw = type === '승인회수' || type === '반려회수'
  const showScoreFields = isApprove && reviewStage === 1

  const isError = touched && reason.trim().length === 0
  const charCount = reason.length
  const isOverLimit = charCount > MAX_CHARS

  const scoreNum = score === '' ? NaN : Number(score)
  const mileageNum = mileage === '' ? NaN : Number(mileage)
  const isScoreError = touched && showScoreFields && (score === '' || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100)
  const isMileageError = touched && showScoreFields && (mileage === '' || isNaN(mileageNum) || mileageNum < 0)

  const handleClose = () => {
    setReason('')
    setScore('')
    setMileage('')
    setTouched(false)
    onClose()
  }

  const handleConfirm = () => {
    setTouched(true)
    if (!type || reason.trim().length === 0 || isOverLimit) return
    if (showScoreFields && (isScoreError || isMileageError)) return
    onConfirm(
      type,
      reason.trim(),
      showScoreFields ? scoreNum : undefined,
      showScoreFields ? mileageNum : undefined,
    )
    setReason('')
    setScore('')
    setMileage('')
    setTouched(false)
  }

  if (!type) return null

  const dc = decisionConfig[type]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="judge-decision-dialog-title"
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
            ? theme.accentGradient
            : type === '반려'
            ? theme.rejectGradient
            : type === '승인회수'
            ? theme.withdrawApproveGradient
            : theme.withdrawRejectGradient,
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
            bgcolor: dc.bg,
            border: `1px solid ${dc.border}`,
            color: dc.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {isApprove
            ? <CheckCircleOutlineIcon sx={{ fontSize: '1.2rem' }} />
            : isWithdraw
            ? <UndoIcon sx={{ fontSize: '1.2rem' }} />
            : <DoNotDisturbIcon sx={{ fontSize: '1.2rem' }} />
          }
        </Box>

        <Box flex={1} minWidth={0}>
          <Typography
            id="judge-decision-dialog-title"
            fontWeight={700}
            sx={{ color: dc.color, fontSize: '1rem', lineHeight: 1.3 }}
          >
            {isApprove ? '제안 승인' : isWithdraw ? (type === '승인회수' ? '승인 회수' : '반려 회수') : '제안 반려'}
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

        <IconButton size="small" aria-label="닫기" onClick={handleClose} sx={{ color: colors.textSecondary, flexShrink: 0 }}>
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
            bgcolor: dc.bgLight,
            border: `1px solid ${dc.border}`,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: '1rem', color: dc.color, flexShrink: 0, mt: 0.1 }} />
          <Typography variant="caption" sx={{ color: theme.decisionBannerText, lineHeight: 1.6 }}>
            {isApprove
              ? '승인 후에는 취소가 어렵습니다. 승인 사유를 명확하게 작성해 주세요. 작성된 사유는 제안자에게 전달됩니다.'
              : isWithdraw
              ? '회수 후에는 제안 상태가 심사 중으로 되돌아갑니다. 회수 사유를 구체적으로 작성해 주세요. 작성된 사유는 제안자에게 전달됩니다.'
              : '반려 후에는 제안자가 내용을 수정하여 재제출할 수 있습니다. 반려 사유를 구체적으로 작성해 주세요. 작성된 사유는 제안자에게 전달됩니다.'}
          </Typography>
        </Box>

        {/* 1차 승인 시: 점수 및 마일리지 입력 */}
        {showScoreFields && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mb: 2.5,
              p: 2,
              borderRadius: 2,
              bgcolor: theme.scoreFieldsBg,
              border: `1px solid ${theme.scoreFieldsBorder}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, gridColumn: '1 / -1', mb: 0.5 }}>
              <Box
                sx={{
                  px: 1, py: 0.25, borderRadius: 1,
                  bgcolor: stageConfig[1].bg,
                  border: `1px solid ${stageConfig[1].border}`,
                }}
              >
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: stageConfig[1].color }}>1차 심사</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                1차 심사 승인 시 점수와 마일리지를 입력해 주세요.
              </Typography>
            </Box>

            {/* 점수 */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.8rem', display: 'block', mb: 0.75 }}>
                점수 (0~100)
                <Box component="span" sx={{ color: dc.color, ml: 0.5 }}>*</Box>
              </Typography>
              <TextField
                fullWidth
                type="number"
                size="small"
                placeholder="예: 85"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                error={isScoreError}
                helperText={isScoreError ? '0~100 사이의 점수를 입력해 주세요.' : ''}
                slotProps={{ htmlInput: { min: 0, max: 100, 'aria-label': '점수 (0~100)', 'aria-required': 'true' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    bgcolor: theme.decisionInputBg,
                    fontSize: '0.875rem',
                    color: colors.textPrimary,
                    '& fieldset': { borderColor: isScoreError ? theme.inputErrorColor : colors.borderColor },
                    '&:hover fieldset': { borderColor: isScoreError ? theme.inputErrorColor : theme.inputHoverBorder },
                    '&.Mui-focused fieldset': { borderColor: isScoreError ? theme.inputErrorColor : theme.inputFocusColor },
                  },
                  '& .MuiInputBase-input': { color: colors.textPrimary, '&::placeholder': { color: colors.textSecondary, opacity: 1 } },
                  '& .MuiFormHelperText-root': { fontSize: '0.72rem', mt: 0.5, mx: 0 },
                }}
              />
            </Box>

            {/* 마일리지 */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.8rem', display: 'block', mb: 0.75 }}>
                마일리지 (원)
                <Box component="span" sx={{ color: dc.color, ml: 0.5 }}>*</Box>
              </Typography>
              <TextField
                fullWidth
                type="number"
                size="small"
                placeholder="예: 50000"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                error={isMileageError}
                helperText={isMileageError ? '마일리지를 입력해 주세요.' : ''}
                slotProps={{ htmlInput: { min: 0, 'aria-label': '마일리지 (원)', 'aria-required': 'true' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    bgcolor: theme.decisionInputBg,
                    fontSize: '0.875rem',
                    color: colors.textPrimary,
                    '& fieldset': { borderColor: isMileageError ? theme.inputErrorColor : colors.borderColor },
                    '&:hover fieldset': { borderColor: isMileageError ? theme.inputErrorColor : theme.inputHoverBorder },
                    '&.Mui-focused fieldset': { borderColor: isMileageError ? theme.inputErrorColor : theme.inputFocusColor },
                  },
                  '& .MuiInputBase-input': { color: colors.textPrimary, '&::placeholder': { color: colors.textSecondary, opacity: 1 } },
                  '& .MuiFormHelperText-root': { fontSize: '0.72rem', mt: 0.5, mx: 0 },
                }}
              />
            </Box>
          </Box>
        )}

        {/* 사유 입력 */}
        <Box sx={{ mb: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.8rem' }}
            >
              {isApprove ? '승인 사유' : isWithdraw ? '회수 사유' : '반려 사유'}
              <Box component="span" sx={{ color: dc.color, ml: 0.5 }}>*</Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isOverLimit ? theme.inputErrorColor : colors.textSecondary,
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
                : isWithdraw
                ? '회수 사유를 입력해 주세요. (예: 추가 검토가 필요하여 기존 결정을 회수합니다.)'
                : '반려 사유를 입력해 주세요. (예: 실행 가능성에 대한 근거가 부족합니다. 구체적인 비용 계획 보완 후 재제출 바랍니다.)'
            }
            slotProps={{ htmlInput: { 'aria-label': isApprove ? '승인 사유' : isWithdraw ? '회수 사유' : '반려 사유', 'aria-required': 'true' } }}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
              if (!touched) setTouched(true)
            }}
            error={isError || isOverLimit}
            helperText={
              isError
                ? `${isApprove ? '승인' : isWithdraw ? '회수' : '반려'} 사유를 입력해 주세요.`
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
                  borderColor: isError || isOverLimit ? theme.inputErrorColor : colors.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: isError || isOverLimit ? theme.inputErrorColor : dc.color + '66',
                },
                '&.Mui-focused fieldset': {
                  borderColor: isError || isOverLimit ? theme.inputErrorColor : dc.color,
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
              : isWithdraw
              ? <UndoIcon sx={{ fontSize: '0.95rem' }} />
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
                  bgcolor: theme.primaryBtnBg,
                  color: theme.primaryBtnColor,
                  '&:hover': {
                    bgcolor: theme.primaryBtnHoverBg,
                    boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                  },
                }
              : isWithdraw
              ? {
                  bgcolor: dc.bg,
                  color: dc.color,
                  border: `1px solid ${dc.border}`,
                  '&:hover': {
                    bgcolor: dc.color,
                    color: theme.primaryBtnColor,
                    border: `1px solid ${dc.color}`,
                    boxShadow: `0 4px 14px ${dc.color}59`,
                  },
                }
              : {
                  bgcolor: theme.rejectBtnBg,
                  color: theme.rejectColor,
                  border: `1px solid ${theme.rejectBtnBorder}`,
                  '&:hover': {
                    bgcolor: theme.rejectColor,
                    color: theme.primaryBtnColor,
                    border: `1px solid ${theme.rejectColor}`,
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
                  },
                }),
            '&.Mui-disabled': { opacity: 0.38 },
            transition: 'all 0.2s ease',
          }}
        >
          {isApprove ? '승인하기' : isWithdraw ? '회수하기' : '반려하기'}
        </Button>
      </Box>
    </Dialog>
  )
}
