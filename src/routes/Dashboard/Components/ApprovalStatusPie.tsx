// src/routes/Dashboard/Components/ApprovalStatusPie.tsx
import { Box, Typography, useTheme } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '../../../context/ThemeContext'

export default function ApprovalStatusPie() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'

  const options: any = {
    chart: {
      type: 'donut',
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
        dynamicAnimation: {
          enabled: true,
          speed: 150,
        },
      },
    },
    // 세련된 그라데이션 색상
    colors: [
      '#3b82f6', // 선명한 파랑
      '#10b981', // 신선한 초록
      '#f59e0b', // 따뜻한 주황
      '#ef4444', // 생생한 빨강
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '13px',
              fontWeight: 600,
              color: textPrimary,
              offsetY: 0,
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: textPrimary,
              offsetY: 5,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontWeight: 600,
      labels: {
        colors: textPrimary,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 0,
        fillColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
      itemMargin: {
        horizontal: 12,
      },
    },
    labels: ['부문장', '팀장', '접수', '실행요청'],
    states: {
      hover: {
        filter: {
          type: 'none',
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
    stroke: {
      width: 0,
    },
  }

  const series = [68, 15, 10, 7]

  return (
    <Box
      role="region"
      aria-label="결재 단계별 현황 도넛 차트"
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.4) 100%)'
          : 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.08) 100%)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${isDarkMode ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.1)'}`,
      }}
    >
      <Box
        sx={{
          p: { xs: 2.5, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            mb: 1,
            background: `linear-gradient(90deg, ${primaryColor}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          결재 단계별 현황
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: textSecondary, mb: 3, display: 'block' }}
        >
          아이디어 제안의 결재 진행 상황입니다
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Chart
            options={options}
            series={series}
            type="donut"
            height={360}
            width="100%"
          />
        </Box>

        <Typography
          align="center"
          variant="caption"
          sx={{ color: textSecondary, mt: 1, fontWeight: 500 }}
        >
          💡 부문장 단계가 병목 (68%) - 검토 가속화 필요
        </Typography>
      </Box>
    </Box>
  )
}
