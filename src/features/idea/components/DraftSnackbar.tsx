// src/features/idea/components/DraftSnackbar.tsx
// 임시저장 완료 시 하단에 표시되는 스낵바 (저장 시각 함께 표시)
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert, Box, Snackbar } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'

interface DraftSnackbarProps {
  open: boolean
  message: string
  lastSavedAt: Date | null
  onClose: () => void
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
}

export default function DraftSnackbar({ open, message, lastSavedAt, onClose }: DraftSnackbarProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: { xs: 8, md: 2 } }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        icon={<CheckCircleIcon fontSize="small" />}
        sx={{
          borderRadius: 2.5,
          fontWeight: 600,
          fontSize: '0.875rem',
          bgcolor: it.snackbarBg,
          color: it.snackbarColor,
          border: `1px solid ${it.success.border}`,
          boxShadow: it.snackbarShadow,
          '& .MuiAlert-icon': { color: it.success.color },
          '& .MuiAlert-action': { color: it.textSecondary },
        }}
      >
        {message}
        {lastSavedAt && (
          <Box
            component="span"
            sx={{ color: it.textSecondary, ml: 0.5, fontWeight: 500 }}
          >
            · {formatTime(lastSavedAt)}
          </Box>
        )}
      </Alert>
    </Snackbar>
  )
}
