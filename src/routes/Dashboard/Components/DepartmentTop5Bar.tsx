// src/routes/Dashboard/Components/DepartmentTop5Bar.tsx
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '../../../context/ThemeContext'

const DATA = [
  { department: '개발1팀', value: 85, color: '#6366f1' },
  { department: '개발2팀', value: 72, color: '#3b82f6' },
  { department: '기획팀', value: 68, color: '#06b6d4' },
  { department: '디자인팀', value: 55, color: '#10b981' },
  { department: '운영팀', value: 49, color: '#f59e0b' },
]

const BAR_COLORS = DATA.map((d) => d.color)
const GRADIENT_TO = DATA.map(() => '#ffffff')

export default function DepartmentTop5Bar() {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const gridColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.3)'

  const options: any = {
    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 700,
        animateGradually: { enabled: true, delay: 100 },
      },
    },
    colors: BAR_COLORS,
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
        gradientToColors: GRADIENT_TO,
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
      style: {
        fontSize: '12px',
        fontWeight: 700,
        colors: [textPrimary],
      },
      background: { enabled: false },
    },
    xaxis: {
      categories: DATA.map((d) => d.department),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: textSecondary, fontSize: '12px', fontWeight: 500 },
      },
      max: 100,
    },
    yaxis: {
      labels: {
        style: { colors: textSecondary, fontSize: '12px', fontWeight: 600 },
        offsetX: -4,
      },
    },
    grid: {
      borderColor: gridColor,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { left: 0, right: 20 },
    },
    tooltip: {
      enabled: true,
      theme: isDarkMode ? 'dark' : 'light',
      style: { fontSize: '12px', fontFamily: 'inherit' },
      y: { formatter: (val: number) => val + '건' },
    },
    legend: { show: false },
    states: {
      hover: { filter: { type: 'brighten', value: 0.08 } },
      active: { filter: { type: 'none' } },
    },
  }

  const series = [{ name: '실행 건수', data: DATA.map((d) => d.value) }]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 스트립 */}
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
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ color: textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}
      >
        부서별 TOP 5 실행 건수
      </Typography>
      <Typography variant="caption" sx={{ color: textSecondary, mb: 2, display: 'block' }}>
        부서의 아이디어 실행 현황을 비교하세요
      </Typography>

      {/* 차트 */}
      <Box sx={{ flex: 1 }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={290}
          width="100%"
        />
      </Box>

      {/* 1위 하이라이트 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          borderRadius: 2,
          background: isDarkMode
            ? 'linear-gradient(90deg, rgba(99,102,241,0.12), rgba(59,130,246,0.08))'
            : 'linear-gradient(90deg, rgba(99,102,241,0.07), rgba(59,130,246,0.04))',
          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'}`,
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
        <Typography variant="caption" sx={{ color: textSecondary }}>
          <Box component="span" fontWeight={700} sx={{ color: '#6366f1' }}>
            개발1팀
          </Box>
          이 85건으로 1위 — 가장 많은 아이디어를 실현하고 있습니다
        </Typography>
      </Box>
    </Box>
  )
}
