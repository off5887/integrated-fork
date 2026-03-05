// src/routes/Dashboard/Components/DepartmentTop5Bar.tsx
import { alpha, Box, Typography, useTheme } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '../../../context/ThemeContext'

const data = [
  { department: '개발1팀', value: 85 },
  { department: '개발2팀', value: 72 },
  { department: '기획팀', value: 68 },
  { department: '디자인팀', value: 55 },
  { department: '운영팀', value: 49 },
]

export default function DepartmentTop5Bar() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'
  const gridColor = isDarkMode ? 'rgba(148,163,184,0.15)' : 'rgba(203,213,225,0.3)'

  const options: any = {
    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      sparkline: { enabled: false },
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    colors: ['#2563eb'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '55%',
        distributed: false,
        dataLabels: {
          position: 'right',
          maxWidth: 100,
        },
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val: number) {
        return val
      },
      offsetX: 10,
      style: {
        fontSize: '12px',
        fontWeight: 700,
        colors: [textPrimary],
      },
    },
    xaxis: {
      categories: data.map((d) => d.department),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: textSecondary,
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textSecondary,
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: gridColor,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: isDarkMode ? 'dark' : 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
      },
      y: {
        formatter(val: number) {
          return val + '건'
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDarkMode ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: isDarkMode ? 0.15 : 0.08,
        gradientToColors: [isDarkMode ? '#2563eb' : '#3b82f6'],
        opacityFrom: 1,
        opacityTo: 0.8,
      },
    },
  }

  const series = [
    {
      name: '실행 건수',
      data: data.map((d) => d.value),
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(15,23,42,0.4) 100%)'
          : 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(196,181,253,0.08) 100%)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${isDarkMode ? 'rgba(59,130,246,0.15)' : 'rgba(37,99,235,0.1)'}`,
      }}
    >
      <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 헤더 */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            background: `linear-gradient(90deg, ${primaryColor}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          부서별 TOP 5 실행 건수
        </Typography>
        <Typography variant="caption" sx={{ color: textSecondary, mt: 0.5, display: 'block' }}>
          부서의 아이디어 실행 현황을 비교하세요
        </Typography>
      </Box>

      {/* 차트 */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={340}
          width="100%"
        />
      </Box>

      {/* 범례 및 설명 */}
      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.2)' : 'rgba(203,213,225,0.3)'}`,
        }}
      >
        <Typography variant="caption" sx={{ color: textSecondary, display: 'block' }}>
          💡 상위의 부서들이 더 많은 아이디어를 실현하고 있습니다.
        </Typography>
      </Box>
      </Box>
    </Box>
  )
}
