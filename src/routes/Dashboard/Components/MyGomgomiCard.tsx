// src/pages/Dashboard/components/MyGomgomiCard.tsx
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

type Props = {
  fishTotal: number
  fishToNextLevel: number
}

const MINI_STATS = [
  { label: '이달 획득', value: '320마리', color: '#8b5cf6' },
  { label: '연속 출석', value: '14일', color: '#a78bfa' },
]

export default function MyGomgomiCard({ fishTotal, fishToNextLevel }: Props) {
  const { isDarkMode } = useThemeMode()

  const progress = Math.min(100, (fishTotal / fishToNextLevel) * 100)
  const remaining = fishToNextLevel - fishTotal

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const divider = isDarkMode
    ? 'rgba(148,163,184,0.1)'
    : 'rgba(203,213,225,0.45)'
  const subtleBg = isDarkMode
    ? 'rgba(139,92,246,0.06)'
    : 'rgba(139,92,246,0.04)'
  const subtleBorder = isDarkMode
    ? 'rgba(139,92,246,0.18)'
    : 'rgba(139,92,246,0.12)'

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
            bgcolor: isDarkMode
              ? 'rgba(99,102,241,0.08)'
              : 'rgba(99,102,241,0.05)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
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
              border: `1.5px solid ${isDarkMode ? 'rgba(139,92,246,0.35)' : 'rgba(99,102,241,0.25)'}`,
            }}
          >
            <img
              src="/tarot/god_bear.png"
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
                color: textPrimary,
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
                  bgcolor: isDarkMode
                    ? 'rgba(139,92,246,0.25)'
                    : 'rgba(99,102,241,0.12)',
                  border: `1px solid ${isDarkMode ? 'rgba(139,92,246,0.4)' : 'rgba(99,102,241,0.25)'}`,
                }}
              >
                <Typography
                  sx={{
                    color: isDarkMode ? '#c4b5fd' : '#6366f1',
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
                  bgcolor: isDarkMode
                    ? 'rgba(148,163,184,0.08)'
                    : 'rgba(203,213,225,0.4)',
                  border: `1px solid ${divider}`,
                }}
              >
                <Typography
                  sx={{
                    color: textSecondary,
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
        <Box sx={{ height: '1px', bgcolor: divider }} />

        {/* 히어로 수치: 보유 생선 */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: textSecondary,
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
              sx={{ color: textSecondary }}
            >
              마리
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: textSecondary, mt: 0.5, display: 'block' }}
          >
            현금 환산{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? '#c4b5fd' : '#7c3aed',
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
                bgcolor: subtleBg,
                border: `1px solid ${subtleBorder}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: textSecondary, display: 'block', mb: 0.4 }}
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
        <Box sx={{ height: '1px', bgcolor: divider }} />

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
                color: textSecondary,
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
                color: isDarkMode ? '#a78bfa' : '#6366f1',
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
              bgcolor: isDarkMode
                ? 'rgba(148,163,184,0.12)'
                : 'rgba(203,213,225,0.5)',
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
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {fishTotal.toLocaleString()} / {fishToNextLevel.toLocaleString()}
              마리
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              {remaining.toLocaleString()}마리 남음
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
