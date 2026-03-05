// src/pages/Dashboard/RealDashboard.tsx
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

import ApprovalStatusPie from './Components/ApprovalStatusPie'
import DepartmentTop5Bar from './Components/DepartmentTop5Bar'
import ExecutionCompletionRate from './Components/ExecutionCompletionRate'
import MyGomgomiCard from './Components/MyGomgomiCard'
import PopularImaginationTop5 from './Components/PopularImaginationTop5'

import DashboardCard from './Components/DashboardCard'

export default function RealDashboard() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  // 2026 트렌드 반영: muted neutral 기반, saturation 낮춤
  const bgGradient = isDarkMode
    ? 'linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)' // deep charcoal/navy
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)' // soft cool gray

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        m: 0,
        p: 0,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: isDarkMode ? '#0b121f' : 'background.default',
        background: bgGradient,
        color: isDarkMode ? '#e2e8f0' : '#1e293b',
      }}
    >
      {/* 배경 Blob - muted indigo/blue 계열, opacity 낮춤 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(100px)', // 더 부드럽게
            opacity: isDarkMode ? 0.07 : 0.1,
          },
          '&::before': {
            width: '110%',
            height: '110%',
            top: '-30%',
            left: '-30%',
            background: isDarkMode ? '#4f46e5' : '#3b82f6', // indigo / blue muted
            transform: 'translate(-15%, -25%) rotate(25deg)',
          },
          '&::after': {
            width: '90%',
            height: '130%',
            bottom: '-50%',
            right: '-20%',
            background: isDarkMode ? '#6366f1' : '#60a5fa', // softer indigo/blue
            transform: 'translate(15%, 30%) rotate(-15deg)',
          },
        }}
      />

      {/* 상단 헤더 영역 */}
      <Box
        component="header"
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 3, md: 4 },
          pt: { xs: 4, md: 5 },
          pb: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: { xs: '2.2rem', md: '3rem', lg: '3.8rem' },
              background: isDarkMode
                ? 'linear-gradient(90deg, #60a5fa, #ffffff)' // muted blue → indigo
                : 'linear-gradient(90deg, #1d4ed8, #4f46e5)', // deep blue → indigo
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
            }}
          >
            대시보드
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.75 }}>
            마지막 업데이트: {new Date().toLocaleDateString('ko-KR')} {new Date().toLocaleTimeString('ko-KR')}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          aria-label="도움말 및 문의"
          sx={{
            borderRadius: 20,
            px: 3,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
            '&:focus': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: '2px',
            },
          }}
        >
          💡 도움말
        </Button>
      </Box>

      <Container maxWidth={false} sx={{ position: 'relative', zIndex: 2, pb: 8, px: { xs: 3, md: 4, lg: 8 } }}>
        {/* 섹션: 메인 대시보드 */}
        <Box component="section" sx={{ mb: 4 }}>
          <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ alignItems: 'stretch' }}>
            {/* 첫 번째 줄: MyGomgomiCard */}
            <Grid size={{ xs: 12, lg: 6 }} sx={{ height: '100%' }}>
              <DashboardCard delay={0} sx={{ minHeight: { md: '420px', lg: '420px' }, height: '100%' }}>
                <MyGomgomiCard fishTotal={5420} fishToNextLevel={8000} />
              </DashboardCard>
            </Grid>

            {/* 두 번째 줄: 3개 차트 */}
            <Grid size={{ xs: 12, lg: 6 }} sx={{ height: '100%' }}>
              <DashboardCard delay={0.1} sx={{ minHeight: { md: '420px', lg: '420px' }, height: '100%' }}>
                <ApprovalStatusPie />
              </DashboardCard>
            </Grid>

            {/* 세 번째 줄: DepartmentTop5Bar + ExecutionCompletionRate */}
            <Grid size={{ xs: 12, lg: 5 }} sx={{ height: '100%', display: 'flex' }}>
              <DashboardCard delay={0.25} sx={{ minHeight: { md: '400px', lg: '400px' }, height: '100%' }}>
                <PopularImaginationTop5 />
              </DashboardCard>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }} sx={{ height: '100%', display: 'flex' }}>
              <DashboardCard delay={0.2} sx={{ minHeight: { md: '400px', lg: '400px' }, height: '100%' }}>
                <DepartmentTop5Bar />
              </DashboardCard>
            </Grid>

            <Grid size={{ xs: 12, lg: 3 }} sx={{ height: '100%', display: 'flex' }}>
              <DashboardCard delay={0.15} sx={{ minHeight: { md: '400px', lg: '400px' }, height: '100%' }}>
                <ExecutionCompletionRate completionRate={73.4} />
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>

        {/* 섹션 3: 최근 활동 */}
        <Box component="section">
          <DashboardCard delay={0.3}>
            <Box
              role="region"
              aria-live="polite"
              aria-label="최근 활동 목록"
              sx={{ p: { xs: 2, md: 3 } }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  {
                    user: 'John',
                    action: 'Q3 예산 승인',
                    time: '2시간 전',
                    icon: '✓',
                  },
                  {
                    user: 'Sarah',
                    action: '새로운 디자인 업로드',
                    time: '4시간 전',
                    icon: '📎',
                  },
                  {
                    user: 'Mike',
                    action: '마일스톤 완료',
                    time: '어제',
                    icon: '🎯',
                  },
                ].map((act, i) => (
                  <Box
                    key={i}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {act.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {act.user} · {act.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {act.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </DashboardCard>
        </Box>
      </Container>
    </Box>
  )
}
