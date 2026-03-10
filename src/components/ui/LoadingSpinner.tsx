// src/components/ui/LoadingSpinner.tsx
import { Box, CircularProgress, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface LoadingSpinnerProps {
  /** 스피너 크기 (px) */
  size?: number
  /** 전체 화면 오버레이 여부 */
  fullPage?: boolean
  /** 하단에 표시할 텍스트 */
  text?: string
  /** 커스텀 색상 (기본: 테마 primary) */
  color?: string
}

export default function LoadingSpinner({
  size = 40,
  fullPage = false,
  text,
  color,
}: LoadingSpinnerProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const spinnerColor = color ?? (isDark ? '#818cf8' : '#6366f1')
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const overlayBg = isDark ? 'rgba(11,18,31,0.75)' : 'rgba(241,245,249,0.75)'

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <CircularProgress
        size={size}
        thickness={3.5}
        sx={{
          color: spinnerColor,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      {text && (
        <Typography
          variant="body2"
          sx={{ color: textColor, fontSize: '0.8125rem', letterSpacing: '0.01em' }}
        >
          {text}
        </Typography>
      )}
    </Box>
  )

  if (!fullPage) return content

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        bgcolor: overlayBg,
      }}
    >
      {content}
    </Box>
  )
}
