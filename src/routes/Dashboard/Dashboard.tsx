// src/pages/Dashboard/RealDashboard.tsx
import { Box, Container, Grid, Typography, alpha } from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

import ApprovalStatusPie from './Components/ApprovalStatusPie'
import DepartmentTop5Bar from './Components/DepartmentTop5Bar'
import ExecutionCompletionRate from './Components/ExecutionCompletionRate'
import MyGomgomiCard from './Components/MyGomgomiCard'
import PopularImaginationTop5 from './Components/PopularImaginationTop5'

import DashboardCard from './Components/DashboardCard'

const KPI_STATS = [
  { label: '전체 아이디어', value: '150건', icon: '💡', color: '#3b82f6' },
  { label: '승인 완료', value: '68건', icon: '✅', color: '#10b981' },
  { label: '이번 달 신규', value: '23건', icon: '🚀', color: '#f59e0b' },
  { label: '전체 실행률', value: '73.4%', icon: '📊', color: '#8b5cf6' },
]

const RECENT_ACTIVITIES = [
  { user: 'John', action: 'Q3 예산 아이디어 승인', time: '2시간 전', icon: '✓', color: '#10b981' },
  { user: 'Sarah', action: '새로운 디자인 안 업로드', time: '4시간 전', icon: '📎', color: '#3b82f6' },
  { user: 'Mike', action: '마일스톤 완료', time: '어제', icon: '🎯', color: '#f59e0b' },
  { user: '김민지', action: '원격근무 제안 공감 50건 달성', time: '어제', icon: '♥', color: '#ef4444' },
]

export default function RealDashboard() {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.4)'
  const dividerColor = isDarkMode ? 'rgba(148,163,184,0.15)' : 'rgba(203,213,225,0.5)'
  const bgBase = isDarkMode ? '#0d1117' : '#f8fafc'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: bgBase,
        color: textPrimary,
      }}
    >
      {/* 헤더 */}
      <Box
        component="header"
        sx={{
          px: { xs: 3, md: 5 },
          pt: { xs: 3, md: 4 },
          pb: { xs: 2, md: 3 },
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: isDarkMode ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: textPrimary, letterSpacing: '-0.02em' }}
          >
            대시보드
          </Typography>
          <Typography variant="caption" sx={{ color: textSecondary, mt: 0.25, display: 'block' }}>
            {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} 기준
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)',
            border: `1px solid ${isDarkMode ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
          }}
        >
          <Typography variant="caption" fontWeight={600} sx={{ color: '#3b82f6' }}>
            실시간 현황
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth={false}
        sx={{ px: { xs: 2, md: 4, lg: 5 }, py: { xs: 3, md: 4 } }}
      >
        <Grid container spacing={{ xs: 2, md: 2.5 }}>

          {/* Row 1: KPI 요약 카드 4개 */}
          {KPI_STATS.map((stat, i) => (
            <Grid key={i} size={{ xs: 6, lg: 3 }}>
              <DashboardCard delay={i * 0.05}>
                <Box
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: alpha(stat.color, isDarkMode ? 0.15 : 0.1),
                      border: `1px solid ${alpha(stat.color, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      flexShrink: 0,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: textSecondary, fontWeight: 500, display: 'block', mb: 0.25 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: stat.color, lineHeight: 1.2 }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </DashboardCard>
            </Grid>
          ))}

          {/* Row 2: MyGomgomi (5) + ApprovalStatusPie (7) */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <DashboardCard delay={0.2} sx={{ minHeight: 400, height: '100%' }}>
              <MyGomgomiCard fishTotal={5420} fishToNextLevel={8000} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <DashboardCard delay={0.25} sx={{ minHeight: 400, height: '100%' }}>
              <ApprovalStatusPie />
            </DashboardCard>
          </Grid>

          {/* Row 3: PopularTop5 (7) + DepartmentBar (5) */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <DashboardCard delay={0.3} sx={{ minHeight: 380, height: '100%' }}>
              <PopularImaginationTop5 />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <DashboardCard delay={0.35} sx={{ minHeight: 380, height: '100%' }}>
              <DepartmentTop5Bar />
            </DashboardCard>
          </Grid>

          {/* Row 4: ExecutionRate (4) + RecentActivity (8) */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard delay={0.4} sx={{ minHeight: 380, height: '100%' }}>
              <ExecutionCompletionRate completionRate={73.4} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard delay={0.45} sx={{ minHeight: 380, height: '100%' }}>
              <Box sx={{ p: { xs: 2.5, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: textPrimary, mb: 0.5, letterSpacing: '-0.01em' }}
                >
                  최근 활동
                </Typography>
                <Typography variant="caption" sx={{ color: textSecondary, mb: 3, display: 'block' }}>
                  팀 내 최신 아이디어 활동 내역입니다
                </Typography>

                <Box
                  role="list"
                  aria-label="최근 활동 목록"
                  sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}
                >
                  {RECENT_ACTIVITIES.map((act, i) => (
                    <Box
                      key={i}
                      role="listitem"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 2,
                        borderBottom:
                          i < RECENT_ACTIVITIES.length - 1
                            ? `1px solid ${dividerColor}`
                            : 'none',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: alpha(act.color, isDarkMode ? 0.15 : 0.1),
                          border: `1px solid ${alpha(act.color, 0.25)}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          flexShrink: 0,
                        }}
                      >
                        {act.icon}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: textPrimary, lineHeight: 1.4 }}
                          noWrap
                        >
                          {act.user}
                        </Typography>
                        <Typography variant="caption" sx={{ color: textSecondary }} noWrap>
                          {act.action}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: textSecondary,
                          flexShrink: 0,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: isDarkMode
                            ? 'rgba(148,163,184,0.08)'
                            : 'rgba(203,213,225,0.3)',
                        }}
                      >
                        {act.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
