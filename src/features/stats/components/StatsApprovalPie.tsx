// src/features/stats/components/StatsApprovalPie.tsx
import { Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import { useThemeMode } from '@/context/ThemeContext'
import type { StatsTheme } from '@/theme/statsTheme'
import { pieChartData as PIE_DATA } from '@/api/mock/stats'

const PIE_COLORS = ['#6366f1', '#a78bfa', '#f472b6', '#fb7185']

interface Props {
  t: StatsTheme
}

export default function StatsApprovalPie({ t }: Props) {
  const { isDarkMode } = useThemeMode()

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

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      background: 'transparent',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 900,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: false },
      },
      redrawOnParentResize: false,
    },
    colors: PIE_COLORS,
    labels: PIE_DATA.map((d) => d.label),
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '13px',
              fontWeight: 600,
              color: t.textSecondary,
              offsetY: -4,
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 800,
              color: t.textPrimary,
              offsetY: 6,
              formatter: (val: string) => val + '%',
            },
            total: {
              show: true,
              label: '전체',
              fontSize: '13px',
              fontWeight: 600,
              color: t.textSecondary,
              formatter: () =>
                PIE_DATA.reduce((acc, d) => acc + d.value, 0) + '%',
            },
          },
        },
        expandOnClick: false,
      },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: t.textSecondary },
      fontSize: '13px',
      fontWeight: 500,
      itemMargin: { horizontal: 12, vertical: 4 },
    },
    stroke: {
      width: 2,
      colors: [isDarkMode ? '#1e293b' : '#ffffff'],
    },
    states: {
      hover: { filter: { type: 'brighten', value: 0.08 } },
      active: { filter: { type: 'none' } },
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      style: { fontSize: '13px', fontFamily: 'inherit' },
      y: { formatter: (val: number) => val + '%' },
    },
  }

  const series = PIE_DATA.map((d) => d.value)

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
            <Chart
              options={options}
              series={series}
              type="donut"
              height={450}
              width="100%"
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
