// src/routes/MileageExchangeDialog.tsx
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

interface Props {
  open: boolean
  onClose: () => void
  amount: number
  onConfirm: () => void
}

export default function MileageExchangeDialog({ open, onClose, amount, onConfirm }: Props) {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode
              ? '0 24px 48px rgba(0,0,0,0.5)'
              : '0 24px 48px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* 상단 컬러 스트립 */}
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
        }}
      />

      <Box sx={{ px: 4, pt: 4, pb: 4, textAlign: 'center' }}>
        {/* 제목 */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: textPrimary, letterSpacing: '-0.01em', mb: 0.75 }}
        >
          현금 전환 신청
        </Typography>
        <Typography variant="caption" sx={{ color: textSecondary, display: 'block', mb: 3.5 }}>
          아래 수량을 현금으로 전환합니다
        </Typography>

        {/* 금액 하이라이트 박스 */}
        <Box
          sx={{
            py: 2.5,
            px: 3,
            borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, justifyContent: 'center' }}>
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#6366f1',
              }}
            >
              {amount.toLocaleString()}
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ color: textSecondary }}>
              마리
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: textSecondary, mt: 0.5, display: 'block' }}>
            현금 환산 ≈{' '}
            <Box component="span" fontWeight={700} sx={{ color: isDarkMode ? '#c4b5fd' : '#7c3aed' }}>
              {(amount * 100).toLocaleString()}원
            </Box>
          </Typography>
        </Box>

        {/* 경고 문구 */}
        <Box
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.05)',
            border: `1px solid ${isDarkMode ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.12)'}`,
            mb: 4,
          }}
        >
          <Typography variant="caption" sx={{ color: isDarkMode ? '#fca5a5' : '#dc2626', fontWeight: 600 }}>
            전환 후에는 취소할 수 없습니다
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1,
              fontWeight: 600,
              borderColor: borderColor,
              color: textSecondary,
              '&:hover': {
                borderColor: isDarkMode ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.6)',
                bgcolor: 'transparent',
              },
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1,
              fontWeight: 600,
              bgcolor: '#6366f1',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
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
