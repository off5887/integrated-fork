// src/routes/stats/Stats.tsx
import { Box, CircularProgress, Grid } from '@mui/material'
import { lazy, Suspense } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getStatsTheme } from '@/theme/statsTheme'
import StatsMyGom from './components/StatsMyGom'
import StatsTopIdeas from './components/StatsTopIdeas'
import StatsExecutionRate from './components/StatsExecutionRate'

const StatsApprovalPie = lazy(() => import('./components/StatsApprovalPie'))
const StatsTeamBar     = lazy(() => import('./components/StatsTeamBar'))

const FISH_TOTAL = 5420
const FISH_TO_NEXT_LEVEL = 8000

export default function Stats() {
  const { isDarkMode } = useThemeMode()
  const t = getStatsTheme(isDarkMode)

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        m: 0,
        p: { xs: 3, sm: 4, md: 5, lg: 6 },
        bgcolor: t.bgBase,
        background: t.bgGradient,
        color: t.textPrimary,
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* 1. 나의 곰곰이 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <StatsMyGom
            t={t}
            fishTotal={FISH_TOTAL}
            fishToNextLevel={FISH_TO_NEXT_LEVEL}
          />
        </Grid>

        {/* 2. 인기 상상 TOP 5 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <StatsTopIdeas t={t} />
        </Grid>

        {/* 3. 결재 단계별 현황 - Nivo Pie */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Suspense fallback={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}><CircularProgress size={32} /></Box>}>
            <StatsApprovalPie t={t} />
          </Suspense>
        </Grid>

        {/* 4. 실행 완료율 */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <StatsExecutionRate t={t} />
        </Grid>

        {/* 5. 부문/팀별 TOP5 - Nivo Bar */}
        <Grid size={12}>
          <Suspense fallback={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}><CircularProgress size={32} /></Box>}>
            <StatsTeamBar t={t} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}
