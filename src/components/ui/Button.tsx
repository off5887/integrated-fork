// src/components/ui/Button.tsx
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getButtonTheme } from '@/theme/uiTheme'
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
  const t = getButtonTheme(isDark)
  switch (variant) {
    case 'primary':
      return {
        bgcolor: t.primary.bgcolor,
        color:   t.primary.color,
        border:  'none',
        '&:hover':  { bgcolor: t.primary.hoverBg },
        '&:active': { bgcolor: t.primary.activeBg },
        boxShadow: t.primary.shadow,
      }
    case 'secondary':
      return {
        bgcolor: t.secondary.bgcolor,
        color:   t.secondary.color,
        border:  `1px solid ${t.secondary.border}`,
        '&:hover': { bgcolor: t.secondary.hoverBg, borderColor: t.secondary.hoverBorder },
      }
    case 'ghost':
      return {
        bgcolor: 'transparent',
        color:   t.ghost.color,
        border:  `1px solid ${t.ghost.border}`,
        '&:hover': { bgcolor: t.ghost.hoverBg, color: t.ghost.hoverColor, borderColor: t.ghost.hoverBorder },
      }
    case 'danger':
      return {
        bgcolor: t.danger.bgcolor,
        color:   t.danger.color,
        border:  `1px solid ${t.danger.border}`,
        '&:hover': { bgcolor: t.danger.hoverBg, borderColor: t.danger.hoverBorder },
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
