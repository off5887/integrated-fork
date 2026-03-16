// src/routes/Judge/components/JudgeDetailHeader.tsx
import CloseIcon from '@mui/icons-material/Close'
import GavelIcon from '@mui/icons-material/Gavel'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import { stageConfig } from '../config/judgeStageConfig'

interface Props {
  title: string
  reviewStage: 1 | 2 | 3
  onClose: () => void
}

export default function JudgeDetailHeader({ title, reviewStage, onClose }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  return (
    <>
      <Box sx={{ height: 3, background: theme.accentGradientExtended }} />
      <Box
        sx={{
          px: { xs: 3, md: 5 },
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.sectionDividerBg}`,
        }}
      >
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2,
            background: theme.accentGradientDiag,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
          }}
        >
          <GavelIcon sx={{ color: theme.modalIconColor, fontSize: '1.1rem' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: colors.textPrimary, letterSpacing: '-0.01em', lineHeight: 1.3 }}
          >
            {title}
          </Typography>
          <Chip
            label={`${reviewStage}차 심사`}
            size="small"
            sx={{
              flexShrink: 0,
              bgcolor: stageConfig[reviewStage].bg,
              color: stageConfig[reviewStage].color,
              border: `1px solid ${stageConfig[reviewStage].border}`,
              fontWeight: 700,
              fontSize: '0.72rem',
              height: 22,
            }}
          />
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            ml: 'auto',
            color: colors.textSecondary,
            width: 32, height: 32,
            '&:hover': {
              bgcolor: theme.closeIconHoverBg,
              color: theme.closeIconHoverColor,
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
