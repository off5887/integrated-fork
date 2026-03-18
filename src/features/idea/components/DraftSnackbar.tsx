// src/features/idea/components/DraftSnackbar.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert, Box, Snackbar } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'

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
          bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
          color: isDarkMode ? '#f1f5f9' : '#0f172a',
          border: `1px solid ${isDarkMode ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.25)'}`,
          boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)',
          '& .MuiAlert-icon': { color: '#10b981' },
          '& .MuiAlert-action': { color: isDarkMode ? '#94a3b8' : '#64748b' },
        }}
      >
        {message}
        {lastSavedAt && (
          <Box
            component="span"
            sx={{ color: isDarkMode ? '#94a3b8' : '#64748b', ml: 0.5, fontWeight: 500 }}
          >
            · {formatTime(lastSavedAt)}
          </Box>
        )}
      </Alert>
    </Snackbar>
  )
}
