// src/pages/Dashboard/components/MyGomgomiCard.tsx
import babyBear    from '@/assets/tarot/baby_bear.png'
import godBear     from '@/assets/tarot/god_bear.png'
import judgeBear   from '@/assets/tarot/judge_bear.png'
import kidBear     from '@/assets/tarot/kid_bear.png'
import masterBear  from '@/assets/tarot/master_bear.png'
import mechaBear   from '@/assets/tarot/mecha_bear.png'
import warriorBear from '@/assets/tarot/warrior_bear.png'
import { Box, LinearProgress, Modal, Typography, alpha } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { useDashboardTheme } from '@/theme/dashboardTheme'
import { useLevelConfigs } from '@/api/queries/useLevelConfigs'
import { useMyIdeas, useReviewerDashboardStats } from '@/api/queries/useIdeas'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { KpiStat } from '@/api/types/dashboard'

function getUserTarotImage(level: number): string {
  if (level <= 0) return babyBear
  if (level === 1) return kidBear
  if (level === 2) return warriorBear
  if (level === 3) return masterBear
  if (level === 4) return godBear
  return mechaBear
}
function getTarotImage(role: string, level: number): string {
  if (role === 'reviewer') return judgeBear
  if (role === 'admin')    return mechaBear
  return getUserTarotImage(level)
}

const ROLE_LABEL: Record<string, string> = { user: '일반 사용자', reviewer: '심사자', admin: '관리자' }
const ROLE_COLOR: Record<string, string>  = { user: '#6366f1', reviewer: '#10b981', admin: '#f59e0b' }

export default function MyGomgomiCard() {
  const { isDarkMode } = useThemeMode()
  const dt = useDashboardTheme()
  const { user, role, name, gomLevel, levelName } = useCurrentUser()
  const fishTotal = user?.totalMileage ?? 0
  const [open, setOpen] = useState(false)

  const { data: levelConfigs = [] } = useLevelConfigs()
  const { data: myIdeasPage } = useMyIdeas(0, 200)
  const { data: reviewerStats } = useReviewerDashboardStats()
  const totalIdeas    = myIdeasPage?.totalElements ?? 0
  const approvedIdeas = (myIdeasPage?.content ?? []).filter((i) =>
    ['approved', 'in_progress', 'completed'].includes(i.status ?? ''),
  ).length
  const pendingIdeas  = (myIdeasPage?.content ?? []).filter((i) => i.status === 'pending').length

  const kpiStats: KpiStat[] = role === 'user'
    ? [
        { label: '내 아이디어',   value: `${totalIdeas}건`,               icon: '💡', color: '#3b82f6' },
        { label: '승인 완료',     value: `${approvedIdeas}건`,             icon: '✅', color: '#10b981' },
        { label: '심사 중',       value: `${pendingIdeas}건`,              icon: '⏳', color: '#f59e0b' },
        { label: '획득 마일리지', value: `${fishTotal.toLocaleString()}마리`, icon: '🐟', color: '#8b5cf6' },
      ]
    : role === 'admin'
    ? [
        { label: '전체 아이디어', value: `${totalIdeas}건`,    icon: '💡', color: '#3b82f6' },
        { label: '승인 완료',     value: `${approvedIdeas}건`, icon: '✅', color: '#10b981' },
      ]
    : [
        { label: '심사 할당', value: `${reviewerStats?.assigned  ?? 0}건`,                      icon: '📋', color: '#6366f1' },
        { label: '심사 완료', value: `${reviewerStats?.completed ?? 0}건`,                      icon: '✅', color: '#10b981' },
        { label: '대기 중',   value: `${reviewerStats?.pending   ?? 0}건`,                      icon: '⏳', color: '#f59e0b' },
        { label: '평균 처리', value: `${(reviewerStats?.avgDays  ?? 0).toFixed(1)}일`,           icon: '📊', color: '#8b5cf6' },
      ]
  const tarotImage = getTarotImage(role, gomLevel)
  const roleColor = ROLE_COLOR[role] ?? '#6366f1'

  const nextConfig = levelConfigs.find((l) => l.level === gomLevel + 1)
  const currConfig = levelConfigs.find((l) => l.level === gomLevel)
  const isMaxLevel = !nextConfig
  const progress = isMaxLevel ? 100
    : (nextConfig && currConfig && nextConfig.minMileage > currConfig.minMileage)
      ? Math.min(100, Math.round(((fishTotal - currConfig.minMileage) / (nextConfig.minMileage - currConfig.minMileage)) * 100))
      : 0
  const remaining = nextConfig ? Math.max(0, nextConfig.minMileage - fishTotal) : 0

  return (
    <>
    {/* 카드 전체 — height:100% 로 부모 DashboardCard 꽉 채움 */}
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1.5 }}>

      {/* ── 히어로: 타로 이미지 + 이름 오버레이 ── */}
      <Box
        role="button"
        aria-label={`${levelName} 타로카드 크게 보기`}
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
        sx={{
          position: 'relative',
          borderRadius: 2.5,
          overflow: 'hidden',
          cursor: 'pointer',
          flexShrink: 0,
          height: 148,
          '&:hover .tarot-img': { transform: 'scale(1.06)' },
          '&:focus-visible': { outline: `2px solid ${roleColor}`, outlineOffset: 2 },
        }}
      >
        {/* 타로 이미지 */}
        <img
          className="tarot-img"
          src={tarotImage}
          alt={levelName}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.25s ease',
          }}
        />

        {/* 그라디언트 오버레이 */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        }} />

        {/* 역할 뱃지 (우상단) */}
        <Box sx={{
          position: 'absolute', top: 8, right: 8,
          px: 0.9, py: 0.3, borderRadius: '999px',
          bgcolor: alpha(roleColor, 0.85),
          backdropFilter: 'blur(4px)',
        }}>
          <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
            {ROLE_LABEL[role] ?? '—'}
          </Typography>
        </Box>

        {/* 이름 + 소속 오버레이 (하단) */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 1.25, pb: 1 }}>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', lineHeight: 1.25, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }} noWrap>
            {name || '—'}
          </Typography>
          <Typography sx={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }} noWrap>
            {[user?.position, user?.department].filter(Boolean).join(' · ') || ' '}
          </Typography>
        </Box>
      </Box>

      {/* ── 레벨 + 프로그레스 ── */}
      <Box
        sx={{
          px: 1.5, py: 1.25,
          borderRadius: 2,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
          border: `1px solid ${alpha(roleColor, 0.18)}`,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: roleColor, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: dt.textPrimary }}>
              {levelName}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: roleColor, fontFamily: 'monospace' }}>
            Lv.{gomLevel}{!isMaxLevel && ` / ${gomLevel + 1}`}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          aria-label={isMaxLevel ? '최고 레벨' : `다음 레벨까지 ${progress}%`}
          sx={{
            height: 6, borderRadius: 9999, mb: 0.6,
            bgcolor: alpha(roleColor, 0.14),
            '& .MuiLinearProgress-bar': {
              borderRadius: 9999,
              background: `linear-gradient(90deg, ${roleColor}, #a78bfa)`,
              transition: 'transform 0.15s linear',
            },
          }}
        />

        <Typography sx={{ fontSize: '0.6rem', color: dt.textSecondary, textAlign: 'right' }}>
          {isMaxLevel
            ? '🏆 최고 레벨 달성'
            : `다음까지 ${remaining.toLocaleString()}마리`}
        </Typography>
      </Box>

      {/* ── 마일리지 ── */}
      <Box sx={{ flexShrink: 0 }}>
        <Typography sx={{ fontSize: '0.62rem', color: dt.textSecondary, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.5 }}>
          보유 생선
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.4, minWidth: 0 }}>
            <Typography sx={{
              fontSize: '1.55rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em',
              background: `linear-gradient(90deg, ${roleColor}, #a78bfa)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              flexShrink: 0,
            }}>
              {fishTotal.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: dt.textSecondary, flexShrink: 0 }}>
              마리
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: dt.gom.levelBadgeColor, flexShrink: 0, ml: 0.5 }}>
            ≈ {(fishTotal * 100).toLocaleString()}원
          </Typography>
        </Box>
      </Box>

      {/* ── 구분선 ── */}
      <Box sx={{ height: '1px', bgcolor: dt.dividerColor, flexShrink: 0 }} />

      {/* ── KPI 그리드 ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: kpiStats.length <= 2 ? '1fr' : '1fr 1fr', gap: 0.75, mt: 'auto' }}>
        {kpiStats.map((kpi) => (
          <Box
            key={kpi.label}
            sx={{
              p: kpiStats.length <= 2 ? '14px 16px 12px' : '10px 10px 8px',
              borderRadius: 2,
              bgcolor: dt.gom.miniStatBg,
              border: `1px solid ${dt.gom.miniStatBorder}`,
            }}
          >
            <Typography sx={{ fontSize: kpiStats.length <= 2 ? '1.05rem' : '0.85rem', fontWeight: 800, color: kpi.color, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              {kpi.value}
            </Typography>
            <Typography sx={{ fontSize: kpiStats.length <= 2 ? '0.7rem' : '0.62rem', color: dt.textSecondary, lineHeight: 1.3, mt: 0.35 }}>
              {kpi.label}
            </Typography>
          </Box>
        ))}
      </Box>

    </Box>

    {/* ── 타로카드 모달 ── */}
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-label={`${levelName} 타로카드`}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        role="button"
        tabIndex={0}
        aria-label="닫기"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') setOpen(false) }}
        sx={{ outline: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, p: 3 }}
      >
        <Box sx={{
          maxWidth: 300, width: '72vw',
          borderRadius: 4, overflow: 'hidden',
          boxShadow: `0 24px 64px rgba(0,0,0,0.65), 0 0 0 1.5px ${alpha('#a78bfa', 0.45)}`,
        }}>
          <img src={tarotImage} alt={`${levelName} 타로카드`} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', mb: 0.25 }}>
            {levelName}
          </Typography>
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.45) }}>
            클릭하면 닫힙니다
          </Typography>
        </Box>
      </Box>
    </Modal>
    </>
  )
}
