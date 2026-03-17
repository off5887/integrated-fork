// src/routes/Mileage/MileageExchangeDialog.tsx
import CloseIcon from '@mui/icons-material/Close'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'

interface Props {
  open: boolean
  onClose: () => void
  totalMileage: number
  onConfirm: (amount: number) => void
}

export default function MileageExchangeDialog({ open, onClose, totalMileage, onConfirm }: Props) {
  const { isDarkMode } = useThemeMode()
  const t = getMileageTheme(isDarkMode)
  const [inputValue, setInputValue] = useState('')

  const parsed  = parseInt(inputValue, 10)
  const amount  = isNaN(parsed) ? 0 : parsed
  const isValid = amount > 0 && amount <= totalMileage
  const isEmpty = inputValue === ''

  const handleClose = () => {
    setInputValue('')
    onClose()
  }

  const handleConfirm = () => {
    if (!isValid) return
    onConfirm(amount)
    setInputValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(v)
  }

  const errorMsg =
    !isEmpty && amount <= 0
      ? '1 이상의 숫자를 입력해주세요'
      : !isEmpty && amount > totalMileage
        ? `보유 마일리지(${totalMileage.toLocaleString()}마리)를 초과할 수 없습니다`
        : ''

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: t.dialogBg,
            border: `1px solid ${t.borderColorStrict}`,
            boxShadow: t.dialogShadow,
            overflow: 'hidden',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: t.backdropBg,
          },
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: t.accentGradient }} />

      {/* 헤더 */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', gap: 1.25, borderBottom: `1px solid ${t.borderColorStrict}` }}>
        <Box
          sx={{
            width: 32, height: 32, borderRadius: '50%',
            bgcolor: t.modalIconBg, color: t.modalIconColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <SwapHorizIcon sx={{ fontSize: '1.1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography fontWeight={700} sx={{ color: t.textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}>
            현금 전환 신청
          </Typography>
          <Typography variant="caption" sx={{ color: t.textSecondary }}>
            마일리지를 현금으로 전환합니다
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} sx={{ color: t.textSecondary }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 3, pt: 3, pb: 3 }}>
        {/* 보유 마일리지 */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1.5, mb: 3, borderRadius: 2,
            bgcolor: t.mileageBoxBg,
            border: `1px solid ${t.mileageBoxBorder}`,
          }}
        >
          <Typography variant="body2" sx={{ color: t.textSecondary, fontWeight: 500 }}>보유 마일리지</Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography fontWeight={800} sx={{ fontSize: '1.15rem', color: t.primaryColor }}>
              {totalMileage.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: t.textSecondary }}>마리</Typography>
          </Box>
        </Box>

        {/* 금액 입력 */}
        <TextField
          fullWidth
          label="전환할 마일리지"
          placeholder="숫자 입력"
          value={inputValue}
          onChange={handleChange}
          error={!!errorMsg}
          helperText={errorMsg || (isValid ? `현금 환산 ≈ ${(amount * 100).toLocaleString()}원` : ' ')}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
                <Typography variant="caption" sx={{ color: t.textSecondary }}>마리</Typography>
              </InputAdornment>,
            },
          }}
          sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: t.inputBg,
              fontSize: '1rem',
              fontWeight: 700,
              '& fieldset': { borderColor: t.borderColorStrict },
              '&:hover fieldset': { borderColor: t.inputFocusHoverBorder },
              '&.Mui-focused fieldset': { borderColor: t.inputFocusColor },
            },
            '& .MuiInputBase-input': {
              color: t.textPrimary,
              WebkitTextFillColor: t.textPrimary,
            },
            '& .MuiInputLabel-root': { color: t.textSecondary, '&.Mui-focused': { color: t.inputFocusColor } },
            '& .MuiFormHelperText-root': {
              color: isValid ? t.helperTextSuccessColor : undefined,
              fontWeight: isValid ? 600 : undefined,
            },
          }}
        />

        {/* 전체 신청 버튼 */}
        <Button
          size="small"
          variant="text"
          onClick={() => setInputValue(String(totalMileage))}
          sx={{
            fontSize: '0.75rem', fontWeight: 600, color: t.primaryColor,
            textTransform: 'none', p: 0, mb: 3,
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
          }}
        >
          전체 마일리지 신청 ({totalMileage.toLocaleString()}마리)
        </Button>

        {/* 경고 문구 */}
        <Box
          sx={{
            py: 1.25, px: 2, mb: 3, borderRadius: 2,
            bgcolor: t.warningBoxBg,
            border: `1px solid ${t.warningBoxBorder}`,
          }}
        >
          <Typography variant="caption" sx={{ color: t.warningTextColor, fontWeight: 600 }}>
            전환 신청 후에는 취소할 수 없습니다
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            sx={{
              borderRadius: 2, py: 1, fontWeight: 600,
              borderColor: t.borderColorStrict, color: t.textSecondary,
              '&:hover': { borderColor: t.inputHoverBorder, bgcolor: 'transparent' },
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!isValid}
            fullWidth
            sx={{
              borderRadius: 2, py: 1, fontWeight: 600,
              bgcolor: t.primaryColor, color: '#fff', boxShadow: 'none',
              '&:hover': { bgcolor: t.primaryHoverBg, boxShadow: t.primaryBtnHoverShadow },
              '&.Mui-disabled': {
                bgcolor: t.disabledBtnBg,
                color: t.disabledBtnColor,
              },
            }}
          >
            전환 신청
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
