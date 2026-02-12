import { Box, Card, CardContent, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemeMode } from '../../../context/ThemeContext'
import { popularIdeasData } from '../data'
import { getCardStyle } from '../styles'

export default function PopularIdeas() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'

  return (
    <Card sx={{ ...getCardStyle(isDarkMode), height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, lg: 5 } }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mb: 4, color: primaryColor }}
        >
          인기 상상 TOP 5
        </Typography>

        {popularIdeasData.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 2.5,
              borderBottom:
                i < popularIdeasData.length - 1
                  ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  : 'none',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ minWidth: 48, color: primaryColor }}
            >
              {i + 1}
            </Typography>
            <Typography variant="h6" sx={{ flex: 1, mx: 4 }}>
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color={textSecondary}>
              {item.likes} 공감
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
