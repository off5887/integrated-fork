import { Box, Card, CardContent, Typography } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { useThemeMode } from '../../../context/ThemeContext'
import { barChartData } from '../data'
import { getCardStyle, getNivoTheme } from '../styles'

export default function TeamExecutionsChart() {
  const { isDarkMode } = useThemeMode()
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#cbd5e1' : '#475569'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'

  return (
    <Card sx={{ ...getCardStyle(isDarkMode), height: { lg: 560 } }}>
      <CardContent
        sx={{ p: 6, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mb: 5, color: primaryColor }}
        >
          부문/팀별 실행 건수 TOP 5
        </Typography>

        <Box sx={{ flex: 1 }}>
          <ResponsiveBar
            data={barChartData}
            keys={['value']}
            indexBy="team"
            margin={{ top: 20, right: 30, bottom: 90, left: 90 }}
            padding={0.35}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 10,
              tickRotation: -35,
              legend: '팀 / 부서',
              legendPosition: 'middle',
              legendOffset: 60,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 0,
              legend: '실행 건수',
              legendPosition: 'middle',
              legendOffset: -70,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            theme={getNivoTheme(isDarkMode, textPrimary, textSecondary)}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
