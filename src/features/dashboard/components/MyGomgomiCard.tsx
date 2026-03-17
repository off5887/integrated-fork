// src/pages/Dashboard/components/MyGomgomiCard.tsx
import godBear from '@/assets/tarot/god_bear.png'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getDashboardTheme } from '@/theme/dashboardTheme'
import { MY_GOMGOMI } from '@/api/mock/dashboard'
import type { MyGomgomiCardProps } from '@/api/types/dashboard'

const MINI_STATS = MY_GOMGOMI.miniStats

export default function MyGomgomiCard({ fishTotal, fishToNextLevel }: MyGomgomiCardProps) {
  const { isDarkMode } = useThemeMode()
  const dt = getDashboardTheme(isDarkMode)

  const progress = Math.min(100, (fishTotal / fishToNextLevel) * 100)
  const remaining = fishToNextLevel - fishTotal

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        // 왼쪽 accent 바 - 다른 카드의 상단 스트립과 다른 결
        // borderLeft: '3px solid transparent',
        // borderImage: 'linear-gradient(to bottom, #6366f1, #8b5cf6, #a78bfa) 1',
        pl: 2,
        ml: -2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          width: '100%',
        }}
      >
        {/* 프로필 섹션 - 다른 카드들과 달리 배경 tint 적용 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.75,
            borderRadius: 2.5,
            bgcolor: dt.gom.profileBg,
            border: `1px solid ${dt.gom.profileBorder}`,
          }}
        >
          {/* 아바타 */}
          <Box
            sx={{
              width: 60,
              height: 60,
              flexShrink: 0,
              borderRadius: 2.5,
              overflow: 'hidden',
              border: `1.5px solid ${dt.gom.levelBadgeBorder}`,
            }}
          >
            <img
              src={godBear}
              alt="나의 곰곰이"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          {/* 이름 + 배지 */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                color: dt.textPrimary,
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              나의 곰곰이
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                mt: 0.75,
              }}
            >
              <Box
                sx={{
                  px: 1.25,
                  py: 0.3,
                  borderRadius: '999px',
                  bgcolor: dt.gom.levelBadgeBg,
                  border: `1px solid ${dt.gom.levelBadgeBorder}`,
                }}
              >
                <Typography
                  sx={{
                    color: dt.gom.levelBadgeColor,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                  }}
                >
                  Lv.12
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 1.25,
                  py: 0.3,
                  borderRadius: '999px',
                  bgcolor: dt.gom.rankBadgeBg,
                  border: `1px solid ${dt.dividerColor}`,
                }}
              >
                <Typography
                  sx={{
                    color: dt.textSecondary,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                  }}
                >
                  아기 곰곰이
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 구분선 */}
        <Box sx={{ height: '1px', bgcolor: dt.dividerColor }} />

        {/* 히어로 수치: 보유 생선 */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: dt.textSecondary,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              display: 'block',
              mb: 0.75,
            }}
          >
            보유 생선
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography
              sx={{
                fontSize: '2.4rem',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {fishTotal.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: dt.textSecondary }}
            >
              마리
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: dt.textSecondary, mt: 0.5, display: 'block' }}
          >
            현금 환산{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: dt.gom.levelBadgeColor,
              }}
            >
              ≈ {(fishTotal * 100).toLocaleString()}원
            </Box>
          </Typography>
        </Box>

        {/* 미니 스탯 2열 */}
        <Box
          sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}
        >
          {MINI_STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                bgcolor: dt.gom.miniStatBg,
                border: `1px solid ${dt.gom.miniStatBorder}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: dt.textSecondary, display: 'block', mb: 0.4 }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: stat.color }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 구분선 */}
        <Box sx={{ height: '1px', bgcolor: dt.dividerColor }} />

        {/* 레벨 프로그레스 */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.25,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: dt.textSecondary,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              다음 레벨까지
            </Typography>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: dt.gom.progressText,
                fontSize: '0.8rem',
              }}
            >
              {progress.toFixed(0)}%
            </Typography>
          </Box>

          {/* 프로그레스 바 */}
          <Box
            sx={{
              height: 7,
              borderRadius: '999px',
              bgcolor: dt.gom.progressTrack,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                borderRadius: '999px',
                transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ color: dt.textSecondary }}>
              {fishTotal.toLocaleString()} / {fishToNextLevel.toLocaleString()}
              마리
            </Typography>
            <Typography variant="caption" sx={{ color: dt.textSecondary }}>
              {remaining.toLocaleString()}마리 남음
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
