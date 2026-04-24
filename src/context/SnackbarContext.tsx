import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, IconButton, Snackbar, Typography } from '@mui/material'
import { createContext, forwardRef, useCallback, useContext, useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'

type Severity = 'success' | 'error' | 'warning' | 'info'

interface SnackbarContextValue {
  showSnackbar: (message: string, severity?: Severity) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

const SEVERITY_CONFIG = {
  success: {
    Icon: CheckCircleIcon,
    color: '#10b981',
    bgLight: 'rgba(16,185,129,0.06)',
    bgDark:  'rgba(16,185,129,0.08)',
    borderLight: 'rgba(16,185,129,0.2)',
    borderDark:  'rgba(16,185,129,0.25)',
  },
  error: {
    Icon: ErrorOutlineIcon,
    color: '#ef4444',
    bgLight: 'rgba(239,68,68,0.05)',
    bgDark:  'rgba(239,68,68,0.08)',
    borderLight: 'rgba(239,68,68,0.2)',
    borderDark:  'rgba(239,68,68,0.25)',
  },
  warning: {
    Icon: WarningAmberIcon,
    color: '#f59e0b',
    bgLight: 'rgba(245,158,11,0.06)',
    bgDark:  'rgba(245,158,11,0.08)',
    borderLight: 'rgba(245,158,11,0.2)',
    borderDark:  'rgba(245,158,11,0.25)',
  },
  info: {
    Icon: InfoOutlinedIcon,
    color: '#6366f1',
    bgLight: 'rgba(99,102,241,0.06)',
    bgDark:  'rgba(99,102,241,0.08)',
    borderLight: 'rgba(99,102,241,0.2)',
    borderDark:  'rgba(99,102,241,0.25)',
  },
} as const

const StyledToast = forwardRef<HTMLDivElement, {
  message: string
  severity: Severity
  onClose: () => void
}>(function StyledToast({ message, severity, onClose }, ref) {
  const { isDarkMode } = useThemeMode()
  const cfg = SEVERITY_CONFIG[severity]
  const { Icon } = cfg
  const bg = isDarkMode ? cfg.bgDark : cfg.bgLight
  const borderColor = isDarkMode ? cfg.borderDark : cfg.borderLight

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 2,
        py: 1.25,
        minWidth: 280,
        maxWidth: 420,
        borderRadius: 2.5,
        bgcolor: isDarkMode ? 'rgba(22,30,46,0.97)' : '#ffffff',
        border: `1px solid ${borderColor}`,
        borderLeft: `4px solid ${cfg.color}`,
        boxShadow: isDarkMode
          ? '0 8px 32px rgba(0,0,0,0.45)'
          : '0 4px 24px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* 아이콘 */}
      <Icon sx={{ fontSize: '1.15rem', color: cfg.color, flexShrink: 0 }} />

      {/* 메시지 */}
      <Typography
        sx={{
          flex: 1,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: isDarkMode ? '#f1f5f9' : '#0f172a',
          lineHeight: 1.4,
        }}
      >
        {message}
      </Typography>

      {/* 닫기 버튼 */}
      <IconButton
        size="small"
        onClick={onClose}
        sx={{
          flexShrink: 0,
          ml: 0.5,
          color: isDarkMode ? '#64748b' : '#94a3b8',
          '&:hover': {
            bgcolor: bg,
            color: isDarkMode ? '#94a3b8' : '#64748b',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: '0.9rem' }} />
      </IconButton>
    </Box>
  )
})

/**
 * React 트리 밖(axios 인터셉터 등)에서 스낵바를 띄울 수 있도록
 * Provider 마운트 시점에 함수 참조를 모듈 레벨에 등록합니다.
 */
let _showSnackbar: ((message: string, severity?: Severity) => void) | null = null

export function globalShowSnackbar(message: string, severity: Severity = 'info') {
  _showSnackbar?.(message, severity)
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<Severity>('success')

  const showSnackbar = useCallback((msg: string, sev: Severity = 'success') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  // 모듈 레벨 참조 등록
  _showSnackbar = showSnackbar

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: { xs: 8, md: 2 } }}
      >
        <StyledToast
          message={message}
          severity={severity}
          onClose={() => setOpen(false)}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}
