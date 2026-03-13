// src/features/stats/components/StatsTeamBar.tsx
import { Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import { useThemeMode } from '@/context/ThemeContext'
import type { StatsTheme } from '@/theme/statsTheme'
import { barChartData as BAR_DATA } from '@/api/mock/stats'

const BAR_COLORS = ['#6366f1', '#a78bfa', '#38bdf8', '#34d399', '#fb923c']

interface Props {
  t: StatsTheme
}

export default function StatsTeamBar({ t }: Props) {
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
      type: 'bar',
      fontFamily: 'inherit',
      background: 'transparent',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 100 },
      },
    },
    colors: BAR_COLORS,
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 8,
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDarkMode ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        opacityFrom: 0.95,
        opacityTo: 0.65,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val + '건',
      offsetY: -6,
      style: { fontSize: '12px', fontWeight: 700, colors: [t.textPrimary] },
      background: { enabled: false },
    },
    xaxis: {
      categories: BAR_DATA.map((d) => d.team),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: t.textSecondary, fontSize: '13px', fontWeight: 500 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: t.textSecondary, fontSize: '12px', fontWeight: 500 },
        formatter: (val: number) => val + '건',
      },
    },
    grid: {
      borderColor: isDarkMode ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)',
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
      padding: { top: 10, bottom: 0 },
    },
    legend: { show: false },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      style: { fontSize: '13px', fontFamily: 'inherit' },
      y: { formatter: (val: number) => val + '건' },
    },
    states: {
      hover: { filter: { type: 'brighten', value: 0.08 } },
      active: { filter: { type: 'none' } },
    },
  }

  const series = [{ name: '실행 건수', data: BAR_DATA.map((d) => d.value) }]

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
            <Chart
              options={options}
              series={series}
              type="bar"
              height={450}
              width="100%"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
