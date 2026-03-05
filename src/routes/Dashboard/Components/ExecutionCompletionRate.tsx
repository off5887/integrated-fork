// src/routes/Dashboard/Components/ExecutionCompletionRate.tsx
import { alpha, Box, Typography, useTheme } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '../../../context/ThemeContext'

interface Props {
  completionRate: number // 0~100
}

export default function ExecutionCompletionRate({
  completionRate = 73.4,
}: Props) {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const primaryColor = isDarkMode ? '#38bdf8' : '#0ea5e9'

  // 진행도에 따른 색상
  const getStatusColor = (rate: number) => {
    if (rate >= 80) return '#059669' // 진한 초록
    if (rate >= 60) return '#d97706' // 진한 주황
    return '#dc2626' // 진한 빨강
  }

  const statusColor = getStatusColor(completionRate)
  const statusLabel =
    completionRate >= 80 ? '우수' : completionRate >= 60 ? '보통' : '개선 필요'

  const options: any = {
    chart: {
      type: 'radialBar',
      fontFamily: 'inherit',
      sparkline: { enabled: false },
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 200,
        },
      },
    },
    colors: [statusColor],
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        hollow: {
          margin: 5,
          size: '55%',
          background: 'transparent',
          imageWidth: 150,
          imageHeight: 150,
        },
        track: {
          show: true,
          background: alpha(textSecondary, 0.15),
          strokeWidth: '100%',
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            fontSize: '13px',
            color: textSecondary,
            fontWeight: 500,
          },
          value: {
            offsetY: 5,
            fontSize: '28px',
            color: statusColor,
            fontWeight: 700,
          },
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
    labels: ['진행률'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDarkMode ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: isDarkMode ? 0.2 : 0.1,
        gradientToColors: [statusColor],
        opacityFrom: 1,
        opacityTo: 0.85,
      },
    },
  }

  const series = [completionRate]

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,23,42,0.4) 100%)'
          : 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(251,191,36,0.08) 100%)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${isDarkMode ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)'}`,
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
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
            전체 실행 완료율
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: textSecondary, mt: 0.5, display: 'block' }}
          >
            프로젝트 진행 현황을 한눈에 확인하세요
          </Typography>
        </Box>

        {/* 차트 */}
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
            type="radialBar"
            height={340}
            width="100%"
          />
        </Box>

        {/* 상세 정보 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mt: 2,
            pt: 2,
            borderTop: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.2)' : 'rgba(203,213,225,0.3)'}`,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: isDarkMode
                ? alpha('#475569', 0.15)
                : alpha('#e2e8f0', 0.5),
              border: `1px solid ${isDarkMode ? alpha('#64748b', 0.2) : alpha('#cbd5e1', 0.3)}`,
            }}
          >
            <Typography variant="caption" sx={{ color: textSecondary }}>
              완료 건수
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: textPrimary, mt: 0.5 }}
            >
              {Math.round((completionRate / 100) * 150)}건
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: isDarkMode
                ? alpha('#475569', 0.15)
                : alpha('#e2e8f0', 0.5),
              border: `1px solid ${isDarkMode ? alpha('#64748b', 0.2) : alpha('#cbd5e1', 0.3)}`,
            }}
          >
            <Typography variant="caption" sx={{ color: textSecondary }}>
              총 건수
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: textPrimary, mt: 0.5 }}
            >
              150건
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
