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

interface Props {
  open: boolean
  onClose: () => void
  totalMileage: number
  onConfirm: (amount: number) => void
}

export default function MileageExchangeDialog({ open, onClose, totalMileage, onConfirm }: Props) {
  const { isDarkMode } = useThemeMode()
  const [inputValue, setInputValue] = useState('')

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'

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
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.3)',
          },
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

      {/* 헤더 */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', gap: 1.25, borderBottom: `1px solid ${borderColor}` }}>
        <Box
          sx={{
            width: 32, height: 32, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <SwapHorizIcon sx={{ fontSize: '1.1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography fontWeight={700} sx={{ color: textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}>
            현금 전환 신청
          </Typography>
          <Typography variant="caption" sx={{ color: textSecondary }}>
            마일리지를 현금으로 전환합니다
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} sx={{ color: textSecondary }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 3, pt: 3, pb: 3 }}>
        {/* 보유 마일리지 */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1.5, mb: 3, borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.14)'}`,
          }}
        >
          <Typography variant="body2" sx={{ color: textSecondary, fontWeight: 500 }}>보유 마일리지</Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography fontWeight={800} sx={{ fontSize: '1.15rem', color: '#6366f1' }}>
              {totalMileage.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>마리</Typography>
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
                <Typography variant="caption" sx={{ color: textSecondary }}>마리</Typography>
              </InputAdornment>,
            },
          }}
          sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
              fontSize: '1rem',
              fontWeight: 700,
              '& fieldset': { borderColor },
              '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.35)' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiInputBase-input': {
              color: textPrimary,
              WebkitTextFillColor: textPrimary,
            },
            '& .MuiInputLabel-root': { color: textSecondary, '&.Mui-focused': { color: '#6366f1' } },
            '& .MuiFormHelperText-root': {
              color: isValid ? '#10b981' : undefined,
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
            fontSize: '0.75rem', fontWeight: 600, color: '#6366f1',
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
            bgcolor: isDarkMode ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.04)',
            border: `1px solid ${isDarkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)'}`,
          }}
        >
          <Typography variant="caption" sx={{ color: isDarkMode ? '#fca5a5' : '#dc2626', fontWeight: 600 }}>
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
              borderColor: borderColor, color: textSecondary,
              '&:hover': { borderColor: isDarkMode ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.6)', bgcolor: 'transparent' },
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
              bgcolor: '#6366f1', boxShadow: 'none',
              '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' },
              '&.Mui-disabled': {
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(99,102,241,0.35)',
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
