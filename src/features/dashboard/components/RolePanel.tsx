// src/features/dashboard/components/RolePanel.tsx
// 역할별 맞춤 패널: 일반사용자(내 아이디어) / 심사자(심사 대기) / 관리자(마일리지 신청)
import { Box, Typography, alpha } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getDashboardTheme, dashboardAccent } from '@/theme/dashboardTheme'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import {
  MY_RECENT_IDEAS,
  PENDING_REVIEW_IDEAS,
  MILEAGE_REQUESTS,
} from '@/api/mock/dashboard'

export default function RolePanel() {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)
  const user = useCurrentUser()
  const role = user?.role ?? 'user'

  return (
    <Box>
      {role === 'user'     && <UserPanel     dt={dt} />}
      {role === 'reviewer' && <ReviewerPanel dt={dt} />}
      {role === 'admin'    && <AdminPanel    dt={dt} />}
    </Box>
  )
}

// ─── 타입 ───────────────────────────────────────────────────────────────────

type DT = ReturnType<typeof getDashboardTheme>
interface PanelProps { dt: DT }

// ─── 일반 사용자: 내가 최근에 올린 아이디어 ─────────────────────────────────

function UserPanel({ dt }: PanelProps) {
  return (
    <>
      <PanelHeader title="내 상상 아이디어" subtitle="최근 제안한 아이디어" dt={dt} />
      <Box>
        {MY_RECENT_IDEAS.map((item, i) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              py: 1.1,
              px: 0.5,
              borderBottom: i < MY_RECENT_IDEAS.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
            }}
          >
            {/* 상태 점 */}
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              bgcolor: item.statusColor,
              boxShadow: `0 0 6px ${item.statusColor}80`,
            }} />

            {/* 제목 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.2 }}>
                <Typography sx={{
                  fontSize: '0.65rem', fontWeight: 700,
                  color: item.statusColor,
                  px: 0.75, py: 0.15, borderRadius: 0.75,
                  bgcolor: alpha(item.statusColor, 0.12),
                  lineHeight: 1.4,
                }}>
                  {item.status}
                </Typography>
                <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                  ♥ {item.likes}
                </Typography>
              </Box>
            </Box>

            {/* 날짜 */}
            <Typography variant="caption" sx={{
              color: dt.textSecondary, flexShrink: 0,
              fontSize: '0.63rem', whiteSpace: 'nowrap',
            }}>
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

// ─── 심사자: 심사해야 하는 아이디어 ─────────────────────────────────────────

function ReviewerPanel({ dt }: PanelProps) {
  return (
    <>
      <PanelHeader title="심사 대기 목록" subtitle="내가 심사해야 하는 아이디어" dt={dt} />
      <Box>
        {PENDING_REVIEW_IDEAS.map((item, i) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              py: 1.1,
              px: 0.5,
              borderBottom: i < PENDING_REVIEW_IDEAS.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
            }}
          >
            {/* 긴급 여부 */}
            <Box sx={{
              width: 28, height: 28, borderRadius: 1.25, flexShrink: 0,
              bgcolor: item.urgent ? alpha(dashboardAccent.red, 0.12) : alpha(dashboardAccent.indigo, 0.1),
              border: `1px solid ${item.urgent ? alpha(dashboardAccent.red, 0.3) : alpha(dashboardAccent.indigo, 0.2)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem',
            }}>
              {item.urgent ? '🔥' : '📋'}
            </Box>

            {/* 제목 + 제안자 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                {item.proposer}
              </Typography>
            </Box>

            {/* 마감 */}
            <Typography sx={{
              fontSize: '0.63rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap',
              color: item.urgent ? dashboardAccent.red : dt.textSecondary,
              px: 0.75, py: 0.2, borderRadius: 0.75,
              bgcolor: item.urgent ? alpha(dashboardAccent.red, 0.1) : 'transparent',
            }}>
              {item.dueDate}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

// ─── 관리자: 마일리지 현금전환 신청 ─────────────────────────────────────────

function AdminPanel({ dt }: PanelProps) {
  return (
    <>
      <PanelHeader title="마일리지 전환 신청" subtitle="최근 도착한 현금 전환 요청" dt={dt} />
      <Box>
        {MILEAGE_REQUESTS.map((item, i) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              py: 1.1,
              px: 0.5,
              borderBottom: i < MILEAGE_REQUESTS.length - 1 ? `1px solid ${dt.dividerColor}` : 'none',
            }}
          >
            {/* 이니셜 아바타 */}
            <Box sx={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              bgcolor: alpha(dashboardAccent.purple, 0.15),
              border: `1px solid ${alpha(dashboardAccent.purple, 0.25)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: dashboardAccent.purple }}>
                {item.name.charAt(0)}
              </Typography>
            </Box>

            {/* 이름 + 생선 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} sx={{ color: dt.textPrimary, lineHeight: 1.3 }}>
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.65rem' }}>
                🐟 {item.fish.toLocaleString()}마리
              </Typography>
            </Box>

            {/* 금액 + 시간 */}
            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: dashboardAccent.purple, lineHeight: 1.2 }}>
                {item.cashAmount.toLocaleString()}원
              </Typography>
              <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.63rem' }}>
                {item.requestDate}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
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
