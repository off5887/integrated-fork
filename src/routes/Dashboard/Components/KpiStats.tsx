import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'
import { getCardStyle } from '../styles'

export default function KpiStats() {
  const { isDarkMode } = useThemeMode()
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'

  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs={12}>
        <Card sx={{ ...getCardStyle(isDarkMode), height: { lg: 220 } }}>
          <CardContent sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="subtitle1" color={textSecondary}>
              이번 주 공감
            </Typography>
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ mt: 2, color: primaryColor }}
            >
              +284
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ ...getCardStyle(isDarkMode), height: { lg: 220 } }}>
          <CardContent sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="subtitle1" color={textSecondary}>
              내 아이디어 수
            </Typography>
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ mt: 2, color: primaryColor }}
            >
              12개
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
