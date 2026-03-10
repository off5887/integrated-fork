// src/components/ui/Button.tsx
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LoadingSpinner from './LoadingSpinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  variant?: Variant
  size?: Size
  /** 로딩 상태: 스피너 표시 + 비활성화 */
  loading?: boolean
}

const SIZE_MAP: Record<Size, { fontSize: string; px: number; py: number; minW: number }> = {
  sm: { fontSize: '0.8125rem', px: 2,   py: 0.625, minW: 64  },
  md: { fontSize: '0.875rem',  px: 2.5, py: 0.875, minW: 80  },
  lg: { fontSize: '0.9375rem', px: 3.5, py: 1.125, minW: 100 },
}

function useVariantStyles(variant: Variant, isDark: boolean) {
  switch (variant) {
    case 'primary':
      return {
        bgcolor: isDark ? '#6366f1' : '#6366f1',
        color: '#ffffff',
        border: 'none',
        '&:hover': { bgcolor: isDark ? '#4f46e5' : '#4f46e5' },
        '&:active': { bgcolor: '#4338ca' },
        boxShadow: isDark
          ? '0 2px 12px rgba(99,102,241,0.35)'
          : '0 2px 8px rgba(99,102,241,0.28)',
      }
    case 'secondary':
      return {
        bgcolor: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
        color: isDark ? '#a5b4fc' : '#4f46e5',
        border: `1px solid ${isDark ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'}`,
        '&:hover': {
          bgcolor: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.14)',
          borderColor: isDark ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.4)',
        },
      }
    case 'ghost':
      return {
        bgcolor: 'transparent',
        color: isDark ? '#94a3b8' : '#64748b',
        border: `1px solid ${isDark ? 'rgba(148,163,184,0.2)' : 'rgba(203,213,225,0.6)'}`,
        '&:hover': {
          bgcolor: isDark ? 'rgba(148,163,184,0.08)' : 'rgba(241,245,249,0.8)',
          color: isDark ? '#cbd5e1' : '#475569',
          borderColor: isDark ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.5)',
        },
      }
    case 'danger':
      return {
        bgcolor: isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
        color: isDark ? '#fca5a5' : '#dc2626',
        border: `1px solid ${isDark ? 'rgba(239,68,68,0.35)' : 'rgba(239,68,68,0.25)'}`,
        '&:hover': {
          bgcolor: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.14)',
          borderColor: isDark ? 'rgba(239,68,68,0.55)' : 'rgba(239,68,68,0.45)',
        },
      }
  }
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  sx,
  startIcon,
  ...rest
}: ButtonProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const variantSx = useVariantStyles(variant, isDark)
  const { fontSize, px, py, minW } = SIZE_MAP[size]

  return (
    <MuiButton
      disableRipple={false}
      disabled={disabled || loading}
      startIcon={loading ? undefined : startIcon}
      {...rest}
      sx={{
        fontSize,
        px,
        py,
        minWidth: minW,
        fontWeight: 500,
        borderRadius: 1.5,
        textTransform: 'none',
        letterSpacing: '0.01em',
        transition: 'all 0.18s ease',
        position: 'relative',
        ...variantSx,
        '&.Mui-disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
          pointerEvents: 'auto',
        },
        ...sx,
      }}
    >
      {loading ? (
        <LoadingSpinner
          size={16}
          color={variant === 'primary' ? 'rgba(255,255,255,0.85)' : undefined}
        />
      ) : (
        children
      )}
    </MuiButton>
  )
}
