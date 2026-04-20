// src/features/dashboard/components/RolePanel.tsx
// 역할별 맞춤 패널: 일반사용자(내 아이디어) / 심사자(심사 대기) / 관리자(마일리지 신청)
import { useMemo } from 'react'
import { Box, CircularProgress, Typography, alpha } from '@mui/material'
import { useDashboardTheme, dashboardAccent } from '@/theme/dashboardTheme'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useMyIdeas, useJudgeIdeas } from '@/api/queries/useIdeas'
import { useAllWithdrawals } from '@/api/queries/useMileage'
import { useUsers } from '@/api/queries/useUsers'
import { toDateOnly } from '@/utils/dateUtils'

export default function RolePanel() {
  const dt = useDashboardTheme()
  const { role } = useCurrentUser()

  return (
    <Box>
      {role === 'user'     && <UserPanel     dt={dt} />}
      {role === 'reviewer' && <ReviewerPanel dt={dt} />}
      {role === 'admin'    && <AdminPanel    dt={dt} />}
    </Box>
  )
}

// ─── 타입 ───────────────────────────────────────────────────────────────────

type DT = ReturnType<typeof useDashboardTheme>
interface PanelProps { dt: DT }

// ─── 상태 API key → 표시 라벨 + 색상 ───────────────────────────────────────

const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
  pending:     { label: '심사대기', color: '#f59e0b' },
  approved:    { label: '승인',     color: '#10b981' },
  rejected:    { label: '반려',     color: '#ef4444' },
  in_progress: { label: '실행중',   color: '#6366f1' },
  completed:   { label: '완료',     color: '#94a3b8' },
}

// ─── 일반 사용자: 내가 최근에 올린 아이디어 ─────────────────────────────────

function UserPanel({ dt }: PanelProps) {
  const { data: myIdeasPage, isLoading } = useMyIdeas(0, 5)
  const items = myIdeasPage?.content ?? []

  return (
    <>
      <PanelHeader title="내 상상 아이디어" subtitle="최근 제안한 아이디어" dt={dt} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={22} sx={{ color: dashboardAccent.indigo }} />
        </Box>
      ) : items.length === 0 ? (
        <Typography variant="caption" sx={{ color: dt.textSecondary, px: 0.5 }}>
          아직 제안한 아이디어가 없습니다.
        </Typography>
      ) : (
        <Box>
          {items.map((item, i) => {
            const s = STATUS_DISPLAY[item.status] ?? { label: item.status, color: '#94a3b8' }
            const dateStr = new Date(item.submitDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
            return (
              <Box
                key={item.ideaId}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  py: 1.1, px: 0.5,
                  borderBottom: i < items.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
                }}
              >
                <Box sx={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  bgcolor: s.color, boxShadow: `0 0 6px ${s.color}80`,
                }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={500} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.2 }}>
                    <Typography sx={{
                      fontSize: '0.65rem', fontWeight: 700, color: s.color,
                      px: 0.75, py: 0.15, borderRadius: 0.75,
                      bgcolor: alpha(s.color, 0.12), lineHeight: 1.4,
                    }}>
                      {s.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                      🐟 {item.mileagePoints.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{
                  color: dt.textSecondary, flexShrink: 0, fontSize: '0.63rem', whiteSpace: 'nowrap',
                }}>
                  {dateStr}
                </Typography>
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}

// ─── 심사자: 심사해야 하는 아이디어 ─────────────────────────────────────────

function ReviewerPanel({ dt }: PanelProps) {
  const { data: proposals = [], isLoading } = useJudgeIdeas()
  const pending = proposals.filter((p) => p.status === '심사대기').slice(0, 5)

  return (
    <>
      <PanelHeader title="심사 대기 목록" subtitle="내가 심사해야 하는 아이디어" dt={dt} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={22} sx={{ color: dashboardAccent.indigo }} />
        </Box>
      ) : pending.length === 0 ? (
        <Typography variant="caption" sx={{ color: dt.textSecondary, px: 0.5 }}>
          심사 대기 중인 아이디어가 없습니다.
        </Typography>
      ) : (
        <Box>
          {pending.map((item, i) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.25,
                py: 1.1, px: 0.5,
                borderBottom: i < pending.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
              }}
            >
              <Box sx={{
                width: 28, height: 28, borderRadius: 1.25, flexShrink: 0,
                bgcolor: alpha(dashboardAccent.indigo, 0.1),
                border: `1px solid ${alpha(dashboardAccent.indigo, 0.2)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem',
              }}>
                📋
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={500} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
                  {item.title}
                </Typography>
                <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                  {item.proposers[0] ?? ''}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{
                color: dt.textSecondary, flexShrink: 0, fontSize: '0.63rem', whiteSpace: 'nowrap',
              }}>
                {toDateOnly(item.submittedAt)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

// ─── 관리자: 마일리지 현금전환 신청 ─────────────────────────────────────────

function AdminPanel({ dt }: PanelProps) {
  const { data: withdrawals = [], isLoading } = useAllWithdrawals('pending')
  const { data: userList = [] } = useUsers()
  const userMap = useMemo(
    () => new Map(userList.map((u) => [u.employeeId, u])),
    [userList],
  )
  const items = withdrawals.slice(0, 5)

  return (
    <>
      <PanelHeader title="마일리지 전환 신청" subtitle="신청 중인 현금 전환 요청" dt={dt} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={22} sx={{ color: dashboardAccent.indigo }} />
        </Box>
      ) : items.length === 0 ? (
        <Typography variant="caption" sx={{ color: dt.textSecondary, px: 0.5 }}>
          신청 중인 전환 요청이 없습니다.
        </Typography>
      ) : (
        <Box>
          {items.map((item, i) => {
            const user = userMap.get(item.employeeId)
            const displayName = user?.name ?? item.employeeId
            return (
              <Box
                key={item.withdrawalId}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  py: 1.1, px: 0.5,
                  borderBottom: i < items.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
                }}
              >
                <Box sx={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  bgcolor: alpha(dashboardAccent.purple, 0.15),
                  border: `1px solid ${alpha(dashboardAccent.purple, 0.25)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: dashboardAccent.purple }}>
                    {displayName.charAt(0)}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: dt.textPrimary, lineHeight: 1.3 }}>
                    {displayName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                    🐟 {item.requestPoints.toLocaleString()}마리
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: dashboardAccent.purple, lineHeight: 1.2 }}>
                    {item.cashAmount.toLocaleString()}원
                  </Typography>
                  <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.63rem' }}>
                    {toDateOnly(item.requestDate)}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}

// ─── 공통 헤더 ───────────────────────────────────────────────────────────────

function PanelHeader({ title, subtitle, dt }: { title: string; subtitle: string; dt: DT }) {
  return (
    <Box sx={{ flexShrink: 0, mb: 1.25 }}>
      <Typography fontWeight={700} sx={{ color: dt.textPrimary, fontSize: '0.875rem', lineHeight: 1.3 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: dt.textSecondary, mt: 0.2, display: 'block' }}>
        {subtitle}
      </Typography>
    </Box>
  )
}
