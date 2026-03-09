// src/routes/Judge/components/JudgeDetailHeader.tsx
import CloseIcon from '@mui/icons-material/Close'
import GavelIcon from '@mui/icons-material/Gavel'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
  title: string
  onClose: () => void
  isDarkMode: boolean
}

export default function JudgeDetailHeader({ title, onClose, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  return (
    <>
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />
      <Box
        sx={{
          px: { xs: 3, md: 5 },
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.4)'}`,
        }}
      >
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
          }}
        >
          <GavelIcon sx={{ color: '#fff', fontSize: '1.1rem' }} />
        </Box>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: textPrimary, letterSpacing: '-0.01em', lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            ml: 'auto',
            color: textSecondary,
            width: 32, height: 32,
            '&:hover': {
              bgcolor: isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
              color: '#ef4444',
            },
            transition: 'all 0.15s ease',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  )
}
