import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  alpha,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemeMode } from '../../../context/ThemeContext'
import { getCardStyle } from '../styles'

export default function MyGomgomCard() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const fishTotal = 5420
  const fishToNextLevel = 8000
  const progress = (fishTotal / fishToNextLevel) * 100

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'

  return (
    <Card sx={{ ...getCardStyle(isDarkMode), height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, md: 5, lg: 6 } }}>
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{ mb: 5, color: primaryColor }}
        >
          나의 곰곰이
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, mb: 6 }}>
          <img
            src="/tarot/kid_bear.png"
            alt="곰곰이"
            style={{
              width: 160,
              height: 160,
              borderRadius: 36,
              objectFit: 'contain',
            }}
          />
          <Box>
            <Typography variant="h2" fontWeight={900} lineHeight={1}>
              Lv.2
            </Typography>
            <Typography variant="h5" color={textSecondary} sx={{ mt: 1 }}>
              꼬마 곰곰이
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" fontWeight={700}>
            생선 {fishTotal.toLocaleString()} 마리
          </Typography>
          <Typography variant="h6" color={textSecondary} sx={{ mt: 1 }}>
            ≈ {(fishTotal * 100).toLocaleString()} 원
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 20,
              borderRadius: 10,
              bgcolor: alpha(primaryColor, 0.12),
              '& .MuiLinearProgress-bar': {
                borderRadius: 10,
                background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${primaryColor})`,
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              right: 0,
              top: -36,
              color: primaryColor,
              fontWeight: 800,
            }}
          >
            {progress.toFixed(0)}%
          </Typography>
        </Box>

        <Typography variant="subtitle1" align="right" color={textSecondary}>
          다음 레벨까지 {(fishToNextLevel - fishTotal).toLocaleString()} 마리
          남음
        </Typography>
      </CardContent>
    </Card>
  )
}
