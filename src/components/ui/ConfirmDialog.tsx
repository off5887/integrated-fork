// src/components/ui/ConfirmDialog.tsx
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { CONFIRM_DIALOG_VARIANTS, getConfirmDialogTheme } from '@/theme/uiTheme'

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
  const v  = CONFIRM_DIALOG_VARIANTS[variant]
  const dt = getConfirmDialogTheme(isDarkMode)

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
            boxShadow: dt.boxShadow,
            overflow: 'hidden',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            bgcolor: dt.backdropBg,
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
          sx={{ color: textSecondary, lineHeight: 1.7, mb: 3.5, fontSize: '0.875rem', whiteSpace: 'pre-line' }}
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
                bgcolor: dt.cancelHoverBg,
                borderColor: dt.cancelHoverBorder,
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
