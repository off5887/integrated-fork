// src/routes/Judge/components/JudgeDetailHeader.tsx
import CloseIcon from '@mui/icons-material/Close'
import GavelIcon from '@mui/icons-material/Gavel'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
  title: string
  onClose: () => void
  isDarkMode: boolean
}

export default function JudgeDetailHeader({
  title,
  onClose,
  isDarkMode,
}: Props) {
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box
      sx={{
        p: { xs: 5, md: 6 },
        pb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: `1px solid ${isDarkMode ? '#1e293b' : '#e2e8f0'}`,
      }}
    >
      <GavelIcon sx={{ fontSize: 28, color: accent }} />
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{
          color: accent,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </Typography>

      <IconButton
        onClick={onClose}
        sx={{
          ml: 'auto',
          color: isDarkMode ? '#94a3b8' : '#64748b',
          '&:hover': {
            color: accent,
            bgcolor: 'transparent',
          },
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
