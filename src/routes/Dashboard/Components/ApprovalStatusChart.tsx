import { Box, Card, CardContent, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { useThemeMode } from '../../../context/ThemeContext'
import { pieChartData } from '../data'
import { getCardStyle, getNivoTheme } from '../styles'

export default function ApprovalStatusChart() {
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
          결재 단계별 현황
        </Typography>

        <Box sx={{ flex: 1 }}>
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 20, right: 140, bottom: 140, left: 20 }}
            innerRadius={0.52}
            padAngle={3}
            cornerRadius={10}
            activeOuterRadiusOffset={14}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={textPrimary}
            arcLinkLabelsThickness={2}
            arcLabelsSkipAngle={10}
            theme={getNivoTheme(isDarkMode, textPrimary, textSecondary)}
          />
        </Box>

        <Typography
          align="center"
          variant="subtitle1"
          color={textSecondary}
          sx={{ mt: 3 }}
        >
          부문장 단계 병목 68% – 우선 개선 대상
        </Typography>
      </CardContent>
    </Card>
  )
}
