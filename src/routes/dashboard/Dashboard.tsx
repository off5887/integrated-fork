// src/routes/dashboard/Dashboard.tsx
import { Box, Container, Grid, Typography, alpha } from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'
import { dashboardAccent, getDashboardTheme } from '../../theme/dashboardTheme'

import ApprovalStatusPie from './components/ApprovalStatusPie'
import DepartmentTop5Bar from './components/DepartmentTop5Bar'
import ExecutionCompletionRate from './components/ExecutionCompletionRate'
import MyGomgomiCard from './components/MyGomgomiCard'
import PopularImaginationTop5 from './components/PopularImaginationTop5'

import {
  EXECUTION_RATE,
  KPI_STATS,
  MY_GOMGOMI,
  RECENT_ACTIVITIES,
} from '../../api/mock/dashboard'
import DashboardCard from './components/DashboardCard'

export default function RealDashboard() {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: dt.bgBase,
        color: dt.textPrimary,
      }}
    >
      {/* 헤더 */}
      <Box
        component="header"
        sx={{
          px: { xs: 3, md: 5 },
          pt: { xs: 3, md: 4 },
          pb: { xs: 2, md: 3 },
          borderBottom: `1px solid ${dt.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: dt.headerBg,
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
            sx={{ color: dt.textPrimary, letterSpacing: '-0.02em' }}
          >
            대시보드
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: dt.textSecondary, mt: 0.25, display: 'block' }}
          >
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            기준
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: 2,
            bgcolor: isDarkMode
              ? 'rgba(59,130,246,0.12)'
              : 'rgba(59,130,246,0.08)',
            border: `1px solid ${isDarkMode ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: dashboardAccent.blue }}
          >
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
                      sx={{
                        color: dt.textSecondary,
                        fontWeight: 500,
                        display: 'block',
                        mb: 0.25,
                      }}
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
              <MyGomgomiCard
                fishTotal={MY_GOMGOMI.fishTotal}
                fishToNextLevel={MY_GOMGOMI.fishToNextLevel}
              />
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
              <ExecutionCompletionRate completionRate={EXECUTION_RATE} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard delay={0.45} sx={{ minHeight: 380, height: '100%' }}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    color: dt.textPrimary,
                    mb: 0.5,
                    letterSpacing: '-0.01em',
                  }}
                >
                  최근 활동
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: dt.textSecondary, mb: 3, display: 'block' }}
                >
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
                            ? `1px solid ${dt.dividerColor}`
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
                          sx={{ color: dt.textPrimary, lineHeight: 1.4 }}
                          noWrap
                        >
                          {act.user}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: dt.textSecondary }}
                          noWrap
                        >
                          {act.action}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: dt.textSecondary,
                          flexShrink: 0,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: dt.timeBadgeBg,
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
