// src/routes/Dashboard/Components/ApprovalStatusPie.tsx
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '../../../context/ThemeContext'

const STAGES = [
  { label: '부문장', value: 68, color: '#6366f1' },
  { label: '팀장', value: 15, color: '#3b82f6' },
  { label: '접수', value: 10, color: '#06b6d4' },
  { label: '실행요청', value: 7, color: '#8b5cf6' },
]

export default function ApprovalStatusPie() {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  const options: any = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 900,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 200 },
      },
    },
    colors: STAGES.map((s) => s.color),
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              fontWeight: 600,
              color: textSecondary,
              offsetY: -4,
            },
            value: {
              show: true,
              fontSize: '26px',
              fontWeight: 800,
              color: textPrimary,
              offsetY: 6,
              formatter: (val: string) => val + '건',
            },
            total: {
              show: true,
              label: '전체',
              fontSize: '12px',
              fontWeight: 600,
              color: textSecondary,
              formatter: () => {
                const total = STAGES.reduce((acc, s) => acc + s.value, 0)
                return total + '건'
              },
            },
          },
        },
        expandOnClick: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDarkMode ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: 0.35,
        gradientToColors: ['#818cf8', '#60a5fa', '#22d3ee', '#a78bfa'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.82,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 3, colors: [isDarkMode ? '#0d1117' : '#f8fafc'] },
    states: {
      hover: { filter: { type: 'brighten', value: 0.08 } },
      active: { filter: { type: 'none' } },
    },
    tooltip: {
      enabled: true,
      theme: isDarkMode ? 'dark' : 'light',
      style: { fontSize: '13px', fontFamily: 'inherit' },
      y: { formatter: (val: number) => val + '건' },
    },
  }

  const series = STAGES.map((s) => s.value)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(90deg, #6366f1, #3b82f6, #06b6d4)',
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
        결재 단계별 현황
      </Typography>
      <Typography variant="caption" sx={{ color: textSecondary, mb: 2, display: 'block' }}>
        아이디어 제안의 결재 진행 상황입니다
      </Typography>

      {/* 차트 */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Chart
          options={options}
          series={series}
          type="donut"
          height={280}
          width="100%"
        />
      </Box>

      {/* 커스텀 범례 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1.5,
          mt: 2,
        }}
      >
        {STAGES.map((stage) => (
          <Box
            key={stage.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              bgcolor: isDarkMode ? 'rgba(148,163,184,0.06)' : 'rgba(241,245,249,0.7)',
              border: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.4)'}`,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '3px',
                bgcolor: stage.color,
                flexShrink: 0,
                boxShadow: `0 0 8px ${stage.color}80`,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{ color: textSecondary, display: 'block', fontSize: '0.7rem' }}
              >
                {stage.label}
              </Typography>
              <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary }}>
                {stage.value}건
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 'auto',
                px: 1,
                py: 0.2,
                borderRadius: '999px',
                bgcolor: `${stage.color}20`,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: stage.color, fontSize: '0.7rem' }}
              >
                {stage.value}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: textSecondary,
          mt: 2,
          display: 'block',
          p: 1.5,
          borderRadius: 2,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
        }}
      >
        ⚡ 부문장 단계 68% 집중 — 검토 가속화가 필요합니다
      </Typography>
    </Box>
  )
}
