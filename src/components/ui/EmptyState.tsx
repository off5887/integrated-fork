// src/components/ui/EmptyState.tsx
import { Box, Button, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'

interface EmptyStateProps {
  emoji?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({
  emoji = '📭',
  title,
  description,
  action,
}: EmptyStateProps) {
  const { textPrimary, textSecondary, borderColor, accentColor } = usePageColors()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: 8,
        px: 4,
      }}
    >
      <Box sx={{ fontSize: '3rem', mb: 2, lineHeight: 1, opacity: 0.7, userSelect: 'none' }}>
        {emoji}
      </Box>
      <Typography fontWeight={700} sx={{ color: textPrimary, mb: 0.75, fontSize: '0.95rem' }}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: textSecondary,
            mb: action ? 3 : 0,
            maxWidth: 300,
            lineHeight: 1.7,
            fontSize: '0.85rem',
          }}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button
          variant="outlined"
          size="small"
          onClick={action.onClick}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '0.8rem',
            border: `1.5px solid ${borderColor}`,
            color: accentColor,
            '&:hover': { border: `1.5px solid ${accentColor}`, bgcolor: 'transparent' },
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  )
}
