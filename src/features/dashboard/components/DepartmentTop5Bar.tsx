// src/routes/dashboard/components/DepartmentTop5Bar.tsx
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { useDashboardTheme } from '@/theme/dashboardTheme'
import { useDepartmentStats } from '@/api/queries/useIdeas'

const DEPT_COLORS = ['#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b']

export default function DepartmentTop5Bar() {
  const dt = useDashboardTheme()
  const { data: stats = [] } = useDepartmentStats(5)

  const barColors    = stats.map((_, i) => DEPT_COLORS[i] ?? '#8b5cf6')
  const gradientTo   = stats.map(() => '#ffffff')
  const maxCount     = Math.max(...stats.map((d) => d.count), 1)

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 700,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: false },
      },
      redrawOnParentResize: false,
    },
    colors: barColors,
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '52%',
        distributed: true,
        borderRadius: 8,
        borderRadiusApplication: 'end',
        dataLabels: { position: 'right' },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: gradientTo,
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val + '건',
      offsetX: 12,
      style: { fontSize: '12px', fontWeight: 700, colors: [dt.textPrimary] },
      background: { enabled: false },
    },
    xaxis: {
      categories: stats.map((d) => d.department),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: dt.textSecondary, fontSize: '12px', fontWeight: 500 } },
      max: Math.ceil(maxCount * 1.15),
    },
    yaxis: {
      labels: {
        style: { colors: dt.textSecondary, fontSize: '12px', fontWeight: 600 },
        offsetX: 0,
        maxWidth: 110,
      },
    },
    grid: {
      borderColor: dt.gridColor,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { left: 10, right: 20 },
    },
    tooltip: {
      enabled: true,
      theme: dt.chartTheme,
      style: { fontSize: '12px', fontFamily: 'inherit' },
      y: { formatter: (val: number) => val + '건' },
    },
    legend: { show: false },
    states: {
      hover: { filter: { type: 'brighten' } as { type: string } },
      active: { filter: { type: 'none' } },
    },
  }

  const series = [{ name: '아이디어 제출', data: stats.map((d) => d.count) }]
  const top = stats[0]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)',
          borderRadius: '4px 4px 0 0',
          mx: -2,
          mt: -2,
          mb: 3,
        }}
      />
      <Typography variant="h6" fontWeight={700} sx={{ color: dt.textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}>
        부서별 TOP 5 아이디어 제출
      </Typography>
      <Typography variant="caption" sx={{ color: dt.textSecondary, mb: 2, display: 'block' }}>
        부서별 아이디어 제출 현황을 비교하세요
      </Typography>
      <Box>
        <Chart options={options} series={series} type="bar" height={290} width="100%" />
      </Box>
      {top && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: 2,
            bgcolor: dt.insightBg,
            border: `1px solid ${dt.insightBorder}`,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              flexShrink: 0,
            }}
          >
            🏆
          </Box>
          <Typography variant="caption" sx={{ color: dt.textSecondary }}>
            <Box component="span" fontWeight={700} sx={{ color: '#6366f1' }}>
              {top.department}
            </Box>
            이 {top.count}건으로 1위 — 가장 많은 아이디어를 제출하고 있습니다
          </Typography>
        </Box>
      )}
    </Box>
  )
}
