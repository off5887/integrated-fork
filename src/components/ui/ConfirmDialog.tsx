// src/components/ui/ConfirmDialog.tsx
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'

type Variant = 'warning' | 'error' | 'info'

interface Props {
  open: boolean
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: Variant
  onConfirm: () => void
  onCancel: () => void
}

const VARIANT_CONFIG: Record<
  Variant,
  { emoji: string; lightColor: string; darkColor: string; lightBg: string; darkBg: string; lightBorder: string; darkBorder: string; lightGradient: string; darkGradient: string }
> = {
  warning: {
    emoji: '⚠️',
    lightColor:   '#d97706',
    darkColor:    '#fbbf24',
    lightBg:      'rgba(245,158,11,0.08)',
    darkBg:       'rgba(245,158,11,0.12)',
    lightBorder:  'rgba(245,158,11,0.2)',
    darkBorder:   'rgba(245,158,11,0.25)',
    lightGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    darkGradient:  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  error: {
    emoji: '🗑️',
    lightColor:   '#dc2626',
    darkColor:    '#f87171',
    lightBg:      'rgba(239,68,68,0.07)',
    darkBg:       'rgba(239,68,68,0.12)',
    lightBorder:  'rgba(239,68,68,0.18)',
    darkBorder:   'rgba(239,68,68,0.25)',
    lightGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    darkGradient:  'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  info: {
    emoji: '💡',
    lightColor:   '#4338ca',
    darkColor:    '#a5b4fc',
    lightBg:      'rgba(99,102,241,0.07)',
    darkBg:       'rgba(99,102,241,0.12)',
    lightBorder:  'rgba(99,102,241,0.18)',
    darkBorder:   'rgba(99,102,241,0.25)',
    lightGradient: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
    darkGradient:  'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
  },
}

export default function ConfirmDialog({
  open,
  title = '확인',
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  variant = 'warning',
  onConfirm,
  onCancel,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, cardBg, borderColor } = usePageColors()
  const v = VARIANT_CONFIG[variant]

  const accentColor  = isDarkMode ? v.darkColor    : v.lightColor
  const accentBg     = isDarkMode ? v.darkBg       : v.lightBg
  const accentBorder = isDarkMode ? v.darkBorder   : v.lightBorder
  const gradient     = isDarkMode ? v.darkGradient : v.lightGradient

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      aria-labelledby="confirm-dialog-title"
      slotProps={{
        paper: {
          sx: {
            bgcolor: cardBg,
            backgroundImage: 'none',
            border: `1px solid ${borderColor}`,
            borderRadius: 3.5,
            boxShadow: isDarkMode
              ? '0 24px 64px rgba(0,0,0,0.6)'
              : '0 24px 64px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            bgcolor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.3)',
          },
        },
      }}
    >
      <Box sx={{ p: 3.5 }}>
        {/* 이모지 아이콘 */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2.5,
            bgcolor: accentBg,
            border: `1.5px solid ${accentBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            mb: 2.5,
          }}
        >
          {v.emoji}
        </Box>

        {/* 제목 */}
        <Typography
          id="confirm-dialog-title"
          fontWeight={700}
          sx={{ color: textPrimary, fontSize: '1rem', mb: 1, lineHeight: 1.4 }}
        >
          {title}
        </Typography>

        {/* 메시지 */}
        <Typography
          variant="body2"
          sx={{ color: textSecondary, lineHeight: 1.7, mb: 3.5, fontSize: '0.875rem' }}
        >
          {message}
        </Typography>

        {/* 버튼 영역 */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {/* 취소 */}
          <Button
            onClick={onCancel}
            fullWidth
            sx={{
              py: 1.1,
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 2,
              textTransform: 'none',
              border: `1.5px solid ${borderColor}`,
              color: textSecondary,
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              },
            }}
          >
            {cancelLabel}
          </Button>

          {/* 확인 */}
          <Button
            onClick={onConfirm}
            fullWidth
            sx={{
              py: 1.1,
              fontWeight: 700,
              fontSize: '0.875rem',
              borderRadius: 2,
              textTransform: 'none',
              background: gradient,
              color: '#fff',
              boxShadow: `0 4px 14px ${accentColor}40`,
              '&:hover': {
                background: gradient,
                filter: 'brightness(1.08)',
                boxShadow: `0 6px 20px ${accentColor}55`,
              },
            }}
          >
            {confirmLabel}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
