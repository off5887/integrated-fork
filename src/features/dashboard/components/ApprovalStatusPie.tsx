// src/routes/dashboard/components/ApprovalStatusPie.tsx
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '@/context/ThemeContext'
import { getDashboardTheme } from '@/theme/dashboardTheme'
import { APPROVAL_STAGES as STAGES } from '@/api/mock/dashboard'

export default function ApprovalStatusPie() {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 900,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: false },
      },
      redrawOnParentResize: false,
    },
    colors: STAGES.map((s) => s.color),
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            name: { show: true, fontSize: '12px', fontWeight: 600, color: dt.textSecondary, offsetY: -4 },
            value: {
              show: true,
              fontSize: '26px',
              fontWeight: 800,
              color: dt.textPrimary,
              offsetY: 6,
              formatter: (val: string) => val + '건',
            },
            total: {
              show: true,
              label: '전체',
              fontSize: '12px',
              fontWeight: 600,
              color: dt.textSecondary,
              formatter: () => STAGES.reduce((acc, s) => acc + s.value, 0) + '건',
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
    stroke: { width: 3, colors: [dt.bgBase] },
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
      <Typography variant="h6" fontWeight={700} sx={{ color: dt.textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}>
        결재 단계별 현황
      </Typography>
      <Typography variant="caption" sx={{ color: dt.textSecondary, mb: 2, display: 'block' }}>
        아이디어 제안의 결재 진행 상황입니다
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Chart options={options} series={series} type="donut" height={280} width="100%" />
      </Box>

      {/* 커스텀 범례 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 2 }}>
        {STAGES.map((stage) => (
          <Box
            key={stage.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              bgcolor: dt.subtleBg,
              border: `1px solid ${dt.subtleBorder}`,
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
              <Typography variant="caption" sx={{ color: dt.textSecondary, display: 'block', fontSize: '0.7rem' }}>
                {stage.label}
              </Typography>
              <Typography variant="body2" fontWeight={700} sx={{ color: dt.textPrimary }}>
                {stage.value}건
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto', px: 1, py: 0.2, borderRadius: '999px', bgcolor: `${stage.color}20` }}>
              <Typography variant="caption" fontWeight={700} sx={{ color: stage.color, fontSize: '0.7rem' }}>
                {stage.value}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: dt.textSecondary,
          mt: 2,
          display: 'block',
          p: 1.5,
          borderRadius: 2,
          bgcolor: dt.insightBg,
          border: `1px solid ${dt.insightBorder}`,
        }}
      >
        ⚡ 부문장 단계 68% 집중 — 검토 가속화가 필요합니다
      </Typography>
    </Box>
  )
}