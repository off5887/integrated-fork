// src/routes/stats/components/StatsTeamBar.tsx
import { Box, Card, CardContent, Typography, alpha } from '@mui/material'
import { motion } from 'framer-motion'
import { ResponsiveBar } from '@nivo/bar'
import type { StatsTheme } from '@/theme/statsTheme'

const BAR_DATA = [
  { team: '개발1팀', value: 320 },
  { team: '생산2부', value: 280 },
  { team: '영업3팀', value: 210 },
  { team: '품질팀',  value: 180 },
  { team: 'R&D팀',  value: 150 },
]

interface Props {
  t: StatsTheme
}

export default function StatsTeamBar({ t }: Props) {
  const cardStyle = {
    borderRadius: 16,
    background: t.cardBg,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${t.cardBorder}`,
    boxShadow: t.cardShadow,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: t.cardHoverShadow,
    },
  }

  const nivoTheme = {
    background: 'transparent',
    textColor: t.textPrimary,
    fontSize: 13,
    fontFamily: 'inherit',
    axis: {
      domain: { line: { stroke: alpha(t.textPrimary, 0.18) } },
      ticks: {
        line: { stroke: alpha(t.textPrimary, 0.18) },
        text: { fill: t.textSecondary, fontWeight: 500 },
      },
      legend: { text: { fill: t.textPrimary, fontWeight: 600 } },
    },
    grid: { line: { stroke: alpha(t.textPrimary, 0.09) } },
    legends: {
      text: { fill: t.textSecondary, fontSize: 13, fontWeight: 500 },
    },
    tooltip: {
      container: {
        background: t.tooltipBg,
        color: t.textPrimary,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
        padding: '12px 16px',
        fontSize: 13,
      },
    },
    labels: {
      text: {
        fontSize: 14,
        fontWeight: 700,
        textShadow: t.labelTextShadow,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.015 }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 3, color: t.primaryColor }}
          >
            부문/팀별 실행 건수 TOP 5
          </Typography>

          <div style={{ height: '450px', width: '100%' }}>
            <ResponsiveBar
              data={BAR_DATA}
              keys={['value']}
              indexBy="team"
              margin={{ top: 40, right: 40, bottom: 100, left: 80 }}
              padding={0.32}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'pastel1' }}
              borderWidth={1.5}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 8,
                tickRotation: -40,
                legend: '팀 / 부서',
                legendPosition: 'middle',
                legendOffset: 55,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 8,
                tickRotation: 0,
                legend: '실행 건수',
                legendPosition: 'middle',
                legendOffset: -60,
              }}
              labelSkipWidth={16}
              labelSkipHeight={16}
              labelTextColor={{ from: 'color', modifiers: [['darker', 2.2]] }}
              role="application"
              ariaLabel="팀별 실행 건수 바 차트"
              barAriaLabel={(e) =>
                `${e.id}: ${e.formattedValue} in team: ${e.indexValue}`
              }
              theme={nivoTheme}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
