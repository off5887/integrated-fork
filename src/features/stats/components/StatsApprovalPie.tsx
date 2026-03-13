// src/routes/stats/components/StatsApprovalPie.tsx
import { Box, Card, CardContent, Typography, alpha } from '@mui/material'
import { motion } from 'framer-motion'
import { ResponsivePie } from '@nivo/pie'
import type { StatsTheme } from '@/theme/statsTheme'

const PIE_COLORS = ['#6366f1', '#a78bfa', '#f472b6', '#fb7185']

const PIE_DATA = [
  { id: '부문장', label: '부문장', value: 68, color: PIE_COLORS[0] },
  { id: '팀장',  label: '팀장',  value: 15, color: PIE_COLORS[1] },
  { id: '접수',  label: '접수',  value: 10, color: PIE_COLORS[2] },
  { id: '실행요청', label: '실행요청', value: 7, color: PIE_COLORS[3] },
]

interface Props {
  t: StatsTheme
}

export default function StatsApprovalPie({ t }: Props) {
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
      transition={{ duration: 0.7, delay: 0.2 }}
      whileHover={{ scale: 1.015 }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={{ p: { xs: 3, md: 4, lg: 5 } }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 3, color: t.primaryColor }}
          >
            결재 단계별 현황
          </Typography>

          <div style={{ height: '450px', width: '100%' }}>
            <ResponsivePie
              data={PIE_DATA}
              margin={{ top: 40, right: 140, bottom: 140, left: 40 }}
              innerRadius={0.48}
              padAngle={1.5}
              cornerRadius={12}
              activeOuterRadiusOffset={14}
              colors={PIE_COLORS}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
              arcLinkLabelsSkipAngle={15}
              arcLinkLabelsTextColor={t.textPrimary}
              arcLinkLabelsThickness={3}
              arcLinkLabelsColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
              arcLabelsSkipAngle={20}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 90,
                  itemWidth: 110,
                  itemHeight: 24,
                  symbolSize: 20,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: t.primaryColor,
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              theme={nivoTheme}
            />
          </div>

          <Typography
            align="center"
            variant="body2"
            color={t.textSecondary}
            sx={{ mt: 2 }}
          >
            부문장 단계 병목 68%
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}
