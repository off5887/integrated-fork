// src/features/dashboard/Dashboard.tsx
// 콘텐츠 높이 기준 자연 레이아웃 — 잘림·내부스크롤 없음
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Box, CircularProgress, Typography, alpha } from '@mui/material'
import { lazy, Suspense, useState } from 'react'
import { dashboardAccent, useDashboardTheme } from '@/theme/dashboardTheme'
import { TEAM_ACTIVITIES, MY_ACTIVITIES } from '@/api/mock/dashboard'
import type { RecentActivity } from '@/api/types/dashboard'
import type { IdeaApiItem } from '@/api/types/idea'
import { useMyIdeas, useTeamIdeas, useIdeaStats } from '@/api/queries/useIdeas'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { toRelativeTime } from '@/utils/dateUtils'
import DashboardCard from './components/DashboardCard'
import MyGomgomiCard from './components/MyGomgomiCard'
import RolePanel from './components/RolePanel'

const DepartmentTop5Bar       = lazy(() => import('./components/DepartmentTop5Bar'))
const ExecutionCompletionRate = lazy(() => import('./components/ExecutionCompletionRate'))

const ChartFallback = ({ height = 200 }: { height?: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
    <CircularProgress size={28} />
  </Box>
)

const STATUS_ICON: Record<string, { icon: string; color: string }> = {
  pending:           { icon: '⏳', color: '#f59e0b' },
  approved:          { icon: '✓',  color: '#10b981' },
  rejected:          { icon: '✕',  color: '#ef4444' },
  in_progress:       { icon: '🎯', color: '#6366f1' },
  completed:         { icon: '✅', color: '#10b981' },
  withdraw_approved: { icon: '↩',  color: '#f97316' },
  withdraw_rejected: { icon: '↩',  color: '#0d9488' },
}

function toRecentActivity(raw: IdeaApiItem): RecentActivity {
  const { icon, color } = STATUS_ICON[raw.status ?? ''] ?? { icon: '💡', color: '#6366f1' }
  return {
    user:   raw.author ?? raw.submittedBy ?? '알 수 없음',
    action: raw.title ?? '',
    time:   toRelativeTime(raw.submitDate ?? raw.createdAt ?? new Date().toISOString()),
    icon,
    color,
  }
}

export default function RealDashboard() {
  const dt = useDashboardTheme()
  const { department } = useCurrentUser()
  const [activityTab, setActivityTab] = useState<'team' | 'my'>('team')

  const { data: myIdeasPage }  = useMyIdeas(0, 5)
  const { data: teamIdeasRaw } = useTeamIdeas(department || undefined, 5)
  const { data: ideaStats }    = useIdeaStats()

  const myActivities:   RecentActivity[] = myIdeasPage?.content?.length
    ? myIdeasPage.content.map(toRecentActivity)
    : MY_ACTIVITIES
  const teamActivities: RecentActivity[] = teamIdeasRaw?.length
    ? teamIdeasRaw.map(toRecentActivity)
    : TEAM_ACTIVITIES

  const activities = activityTab === 'team' ? teamActivities : myActivities

  return (
    <Box sx={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: dt.bgBase,
      color: dt.textPrimary,
    }}>

      {/* ── Compact Header ─────────────────────────────────── */}
      <Box sx={{
        px: { xs: 2, md: 3 },
        height: 52,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: `1px solid ${dt.borderColor}`,
        bgcolor: dt.headerBg,
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Box sx={{
          width: 28, height: 28, borderRadius: 1.5,
          bgcolor: alpha(dashboardAccent.indigo, 0.15),
          border: `1px solid ${alpha(dashboardAccent.indigo, 0.2)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <DashboardIcon sx={{ fontSize: '0.9rem', color: dashboardAccent.indigo }} />
        </Box>
        <Typography variant="body2" fontWeight={700} sx={{ color: dt.textPrimary }}>
          대시보드
        </Typography>
        <Typography variant="caption" sx={{ color: dt.textSecondary, display: { xs: 'none', sm: 'block' } }}>
          {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} 기준
        </Typography>
        <Box sx={{ ml: 'auto', px: 1.5, py: 0.4, borderRadius: 1.5, bgcolor: dt.realtimeBadgeBg, border: `1px solid ${dt.realtimeBadgeBorder}` }}>
          <Typography variant="caption" fontWeight={600} sx={{ color: dashboardAccent.blue }}>
            ● 실시간
          </Typography>
        </Box>
      </Box>

      {/* ── Content ─────────────────────────────────────────── */}
      <Box sx={{ p: { xs: 1.5, md: 2 } }}>

        {/*
          ── Main Layout (CSS Grid) ─────────────────────────────
          DashboardCard의 sx는 motion.div inline style로 spread됩니다.
          MUI 반응형 객체 { md: ... }는 inline style로 작동하지 않으므로
          gridColumn/gridRow는 plain string으로 전달합니다.
          (모바일은 display:flex이므로 gridColumn/gridRow 값이 무시됩니다)

          Col1(220px): 나의곰곰이  | Col2(380px): 실행완료율  | Col3(1fr): 부서별TOP5
          Col1-2 span: 역할별패널                              | Col3: 최근활동
        */}
        <Box sx={{
          display: { xs: 'flex', md: 'grid' },
          flexDirection: { xs: 'column' },
          gridTemplateColumns: { md: '250px 380px 1fr' },
          gap: 1.5,
        }}>

          {/* ── 나의 곰곰이 (col1 row1) ─────────────────────── */}
          <DashboardCard delay={0.08} sx={{ gridColumn: '1', gridRow: '1', padding: '14px' }}>
            <MyGomgomiCard />
          </DashboardCard>

          {/* ── 전체 실행 완료율 (col2 row1) ────────────────── */}
          <DashboardCard delay={0.15} sx={{ gridColumn: '2', gridRow: '1' }}>
            <Suspense fallback={<ChartFallback height={240} />}>
              <ExecutionCompletionRate stats={ideaStats ?? { totalIdeas: 0, approvedIdeas: 0, inProgressIdeas: 0, completedIdeas: 0, completionRate: 0 }} />
            </Suspense>
          </DashboardCard>

          {/* ── 부서별 TOP5 (col3 row1) ─────────────────────── */}
          <DashboardCard delay={0.2} sx={{ gridColumn: '3', gridRow: '1' }}>
            <Suspense fallback={<ChartFallback height={280} />}>
              <DepartmentTop5Bar />
            </Suspense>
          </DashboardCard>

          {/* ── 역할별 패널 (col1-2 span, row2) ─────────────── */}
          <DashboardCard delay={0.28} sx={{ gridColumn: '1 / span 2', gridRow: '2' }}>
            <RolePanel />
          </DashboardCard>

          {/* ── 최근 활동 (col3 row2) ────────────────────────── */}
          <DashboardCard delay={0.33} sx={{ gridColumn: '3', gridRow: '2' }}>
            {/* 헤더 + 탭 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
              <Typography fontWeight={700} sx={{ color: dt.textPrimary, fontSize: '0.875rem', lineHeight: 1.3 }}>
                최근 활동
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {(['team', 'my'] as const).map((tab) => (
                  <Box
                    key={tab}
                    onClick={() => setActivityTab(tab)}
                    sx={{
                      px: 1.25, py: 0.3, borderRadius: '999px', cursor: 'pointer',
                      fontSize: '0.7rem', fontWeight: 600,
                      transition: 'all 0.15s',
                      ...(activityTab === tab
                        ? { bgcolor: alpha(dashboardAccent.indigo, 0.15), color: dashboardAccent.indigo, border: `1px solid ${alpha(dashboardAccent.indigo, 0.3)}` }
                        : { bgcolor: 'transparent', color: dt.textSecondary, border: `1px solid ${dt.borderColor}` }
                      ),
                    }}
                  >
                    {tab === 'team' ? '팀' : '개인'}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box role="list" aria-label="최근 활동 목록">
              {activities.map((act) => (
                <Box
                  key={act.action}
                  role="listitem"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    py: 1.1,
                    px: 0.5,
                    borderBottom: `1px solid ${dt.dividerColor}`,
                  }}
                >
                  <Box sx={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    bgcolor: alpha(act.color, dt.iconBgAlpha),
                    border: `1px solid ${alpha(act.color, 0.25)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}>
                    {act.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
                      {act.user}
                    </Typography>
                    <Typography variant="caption" sx={{ color: dt.textSecondary, lineHeight: 1.2 }} noWrap>
                      {act.action}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{
                    color: dt.textSecondary, flexShrink: 0,
                    px: 1, py: 0.35, borderRadius: 1,
                    bgcolor: dt.timeBadgeBg, fontSize: '0.65rem',
                    whiteSpace: 'nowrap',
                  }}>
                    {act.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </DashboardCard>

        </Box>
      </Box>
    </Box>
  )
}
