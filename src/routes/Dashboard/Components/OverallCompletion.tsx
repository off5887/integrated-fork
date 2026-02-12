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

export default function OverallCompletion() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'

  const completionRate = 73.4

  return (
    <Card sx={getCardStyle(isDarkMode)}>
      <CardContent sx={{ p: { xs: 6, lg: 8 }, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{ mb: 6, color: primaryColor }}
        >
          전체 실행 완료율
        </Typography>

        <Box
          sx={{
            position: 'relative',
            height: 280,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h1"
            fontWeight={900}
            sx={{ color: primaryColor, lineHeight: 0.9 }}
          >
            {completionRate}%
          </Typography>

          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{
              position: 'absolute',
              bottom: 50,
              left: '12%',
              right: '12%',
              height: 20,
              borderRadius: 10,
              bgcolor: alpha(primaryColor, 0.12),
              '& .MuiLinearProgress-bar': {
                borderRadius: 10,
                background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${primaryColor})`,
              },
            }}
          />
        </Box>

        <Typography variant="h6" color={textSecondary} sx={{ mt: 5 }}>
          실행요청 후 방치 비율 개선이 가장 시급합니다
        </Typography>
      </CardContent>
    </Card>
  )
}
