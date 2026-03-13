// src/routes/Dashboard/Components/ExecutionCompletionRate.tsx
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { useThemeMode } from '@/context/ThemeContext'
import { getDashboardTheme } from '@/theme/dashboardTheme'
import type { ExecutionCompletionRateProps } from '@/api/types/dashboard'

const getStatus = (rate: number) => {
  if (rate >= 80) return { label: '우수', color: '#10b981', gradTo: '#34d399', bg: '#10b98118', border: '#10b98130' }
  if (rate >= 60) return { label: '보통', color: '#f59e0b', gradTo: '#fcd34d', bg: '#f59e0b18', border: '#f59e0b30' }
  return { label: '개선 필요', color: '#ef4444', gradTo: '#f87171', bg: '#ef444418', border: '#ef444430' }
}

export default function ExecutionCompletionRate({ completionRate = 73.4 }: ExecutionCompletionRateProps) {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)
  const status = getStatus(completionRate)
  const completed = Math.round((completionRate / 100) * 150)

  const options: any = {
    chart: {
      type: 'radialBar',
      fontFamily: 'inherit',
      toolbar: { show: false },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 1000,
        animateGradually: { enabled: true, delay: 200 },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '62%',
          background: 'transparent',
        },
        track: {
          background: dt.gridColor,
          strokeWidth: '100%',
          margin: 0,
          dropShadow: { enabled: false },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: 20,
            fontSize: '11px',
            fontWeight: 600,
            color: dt.textSecondary,
          },
          value: {
            offsetY: -10,
            fontSize: '30px',
            fontWeight: 900,
            color: status.color,
            formatter: (val: number) => val + '%',
          },
        },
      },
    },
    colors: [status.color],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.4,
        gradientToColors: [status.gradTo],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: { lineCap: 'round' },
    labels: ['진행률'],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  }

  const STATS = [
    { label: '완료', value: `${completed}건`, color: status.color },
    { label: '전체', value: '150건', color: dt.textSecondary },
    { label: '진행 중', value: `${150 - completed}건`, color: '#3b82f6' },
    { label: '완료율', value: `${completionRate}%`, color: status.color },
  ]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 스트립 */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${status.color}, ${status.gradTo})`,
          borderRadius: '4px 4px 0 0',
          mx: -2,
          mt: -2,
          mb: 2.5,
        }}
      />

      {/* 제목 + 상태 배지 한 줄 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: dt.textPrimary, letterSpacing: '-0.02em' }}>
          전체 실행 완료율
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.35,
            borderRadius: '999px',
            bgcolor: status.bg,
            border: `1px solid ${status.border}`,
            flexShrink: 0,
          }}
        >
          <Typography variant="caption" fontWeight={700} sx={{ color: status.color, fontSize: '0.7rem' }}>
            {status.label}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: dt.textSecondary, mb: 0, display: 'block' }}>
        프로젝트 진행 현황을 한눈에 확인하세요
      </Typography>

      {/* 차트 - 고정 높이, 여백 없이 */}
      <Box sx={{ flexShrink: 0 }}>
        <Chart
          options={options}
          series={[completionRate]}
          type="radialBar"
          height={220}
          width="100%"
        />
      </Box>

      {/* 스탯 그리드 - 차트 바로 아래 자연스럽게 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          mt: 0,
        }}
      >
        {STATS.map((item) => (
          <Box
            key={item.label}
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: dt.subtleBg,
              border: `1px solid ${dt.subtleBorder}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: dt.textSecondary, display: 'block', fontSize: '0.68rem' }}>
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: item.color, mt: 0.2 }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
