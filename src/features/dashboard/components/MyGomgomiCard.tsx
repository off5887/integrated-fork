// src/pages/Dashboard/components/MyGomgomiCard.tsx
import godBear from '@/assets/tarot/god_bear.png'
import { Box, Typography, Modal, alpha } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getDashboardTheme } from '@/theme/dashboardTheme'
import { MY_GOMGOMI, KPI_STATS } from '@/api/mock/dashboard'
import type { MyGomgomiCardProps } from '@/api/types/dashboard'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'

const MINI_STATS = MY_GOMGOMI.miniStats

const ROLE_LABEL: Record<string, string> = {
  user:     '일반 사용자',
  reviewer: '심사자',
  admin:    '관리자',
}

export default function MyGomgomiCard({ fishTotal }: MyGomgomiCardProps) {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)
  const user = useCurrentUser()
  const [open, setOpen] = useState(false)

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

      {/* 프로필 섹션 */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: 2.5,
        bgcolor: dt.gom.profileBg,
        border: `1px solid ${dt.gom.profileBorder}`,
      }}>
        {/* 곰 이모티콘 아바타 — 클릭 시 타로카드 모달 */}
        <Box
          onClick={() => setOpen(true)}
          title="타로카드 보기"
          sx={{
            width: 52, height: 52, flexShrink: 0,
            borderRadius: 2,
            border: `1.5px solid ${dt.gom.levelBadgeBorder}`,
            bgcolor: alpha('#6366f1', 0.12),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
            '&:hover': {
              transform: 'scale(1.06)',
              boxShadow: `0 0 0 2px ${dt.gom.levelBadgeBorder}`,
            },
          }}
        >
          🐻
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight={700} sx={{ color: dt.textPrimary, lineHeight: 1.3 }} noWrap>
            {user?.name ?? '—'}
          </Typography>
          <Typography variant="caption" sx={{ color: dt.textSecondary, lineHeight: 1.3, display: 'block' }} noWrap>
            {[user?.position, user?.department].filter(Boolean).join(' · ')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, flexWrap: 'wrap' }}>
            <Box sx={{ px: 1.1, py: 0.25, borderRadius: '999px', flexShrink: 0, bgcolor: dt.gom.levelBadgeBg, border: `1px solid ${dt.gom.levelBadgeBorder}` }}>
              <Typography sx={{ color: dt.gom.levelBadgeColor, fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap' }}>곰곰신</Typography>
            </Box>
            <Box sx={{ px: 1.1, py: 0.25, borderRadius: '999px', flexShrink: 0, bgcolor: dt.gom.rankBadgeBg, border: `1px solid ${dt.dividerColor}` }}>
              <Typography sx={{ color: dt.textSecondary, fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {ROLE_LABEL[user?.role ?? ''] ?? '—'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 보유 생선 */}
      <Box>
        <Typography variant="caption" sx={{ color: dt.textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', mb: 0.5 }}>
          보유 생선
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
          <Typography sx={{
            fontSize: '2rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em',
            background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {fishTotal.toLocaleString()}
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: dt.textSecondary }}>마리</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: dt.textSecondary, mt: 0.25, display: 'block' }}>
          현금 환산{' '}
          <Box component="span" sx={{ fontWeight: 700, color: dt.gom.levelBadgeColor }}>
            ≈ {(fishTotal * 100).toLocaleString()}원
          </Box>
        </Typography>
      </Box>

      {/* 미니 스탯 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        {MINI_STATS.map((stat) => (
          <Box key={stat.label} sx={{ p: 1.25, borderRadius: 2, bgcolor: dt.gom.miniStatBg, border: `1px solid ${dt.gom.miniStatBorder}` }}>
            <Typography variant="caption" sx={{ color: dt.textSecondary, display: 'block', mb: 0.25, fontSize: '0.68rem' }}>
              {stat.label}
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: stat.color }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 구분선 */}
      <Box sx={{ height: '1px', bgcolor: dt.dividerColor }} />

      {/* 현황 요약 (KPI) */}
      <Box>
        <Typography variant="caption" sx={{ color: dt.textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 1 }}>
          현황 요약
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
          {KPI_STATS.map((kpi) => (
            <Box key={kpi.label} sx={{ p: 1, borderRadius: 1.75, bgcolor: dt.gom.miniStatBg, border: `1px solid ${dt.gom.miniStatBorder}` }}>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: kpi.color, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                {kpi.value}
              </Typography>
              <Typography variant="caption" sx={{ color: dt.textSecondary, fontSize: '0.64rem', lineHeight: 1.2, display: 'block', mt: 0.2 }}>
                {kpi.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>

    {/* ── 타로카드 모달 ─────────────────────────────────────── */}
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        onClick={() => setOpen(false)}
        sx={{
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          p: 3,
        }}
      >
        <Box sx={{
          maxWidth: 320,
          width: '80vw',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          border: `2px solid ${alpha('#a78bfa', 0.5)}`,
        }}>
          <img
            src={godBear}
            alt="나의 곰곰이 타로카드"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: alpha('#fff', 0.6) }}>
          클릭하면 닫힙니다
        </Typography>
      </Box>
    </Modal>
    </>
  )
}
