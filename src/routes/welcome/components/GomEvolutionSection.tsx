// src/routes/Welcome/GomEvolutionSection.tsx
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getWelcomeTheme } from '@/theme/welcomeTheme'
import { GOM_LEVELS } from '@/api/mock/welcome'
import GomEvolutionModal from './GomEvolutionModal'

function getGomLevel(fishCount: number) {
  return GOM_LEVELS.reduce((prev, curr) =>
    fishCount >= curr.min ? curr : prev,
  )
}

interface GomEvolutionSectionProps {
  fishCount: number
}

export default function GomEvolutionSection({
  fishCount,
}: GomEvolutionSectionProps) {
  const { isDarkMode } = useThemeMode()
  const t = getWelcomeTheme(isDarkMode)
  const [openModal, setOpenModal] = useState(false)

  const currentLevel = getGomLevel(fishCount)
  const nextLevel =
    GOM_LEVELS.find((l) => l.min > fishCount) ||
    GOM_LEVELS[GOM_LEVELS.length - 1]
  const progress =
    nextLevel.min > fishCount
      ? Math.min(100, Math.round((fishCount / nextLevel.min) * 100))
      : 100

  return (
    <Box
      component="section"
      sx={{
        height: '100dvh',
        minHeight: '100vh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        bgcolor: t.bgBase,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* 배경 장식 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: t.orb4,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: t.orb5,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 520,
          mx: 'auto',
          bgcolor: t.cardBg,
          border: `1px solid ${t.borderColor}`,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: t.cardShadowLarge,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 상단 그라디언트 스트립 */}
        <Box
          sx={{
            height: 3,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
          }}
        />

        <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                mb: 1,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              곰곰이 진화
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', color: t.textSecondary }}>
              생선을 모을수록 성장하는 나만의 곰곰이
            </Typography>
          </Box>

          {/* 캐릭터 이미지 */}
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 130, md: 150 },
                height: { xs: 130, md: 150 },
                borderRadius: '50%',
                bgcolor: t.accentBgLight,
                border: `2px solid ${t.accentBorderSubtle}`,
                mb: 2,
                mx: 'auto',
              }}
            >
              <Box
                component="img"
                src={currentLevel.image}
                alt={currentLevel.name}
                sx={{
                  width: '78%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(99,102,241,0.25))',
                }}
              />
            </Box>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: t.textPrimary, mb: 0.5, fontSize: '1.3rem' }}
            >
              {currentLevel.name}
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 2,
                py: 0.6,
                borderRadius: 9999,
                bgcolor: t.accentBgVerySubtle,
                border: `1px solid ${t.accentBorderSubtle}`,
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: '0.9rem',
                  color: t.accentColor,
                }}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: t.accentColor,
                }}
              >
                {fishCount.toLocaleString()} 마일리지
              </Typography>
            </Box>
          </Box>

          {/* 진행률 */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  color: t.textSecondary,
                  fontWeight: 600,
                }}
              >
                다음 레벨까지
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: t.accentColor,
                }}
              >
                {progress}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 9999,
                bgcolor: t.progressBg,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 9999,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                },
              }}
            />

            {nextLevel.min > fishCount && (
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: t.textSecondary,
                  mt: 1,
                  textAlign: 'right',
                }}
              >
                {nextLevel.name}까지{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: t.remainColor,
                  }}
                >
                  {(nextLevel.min - fishCount).toLocaleString()}
                </Box>{' '}
                마일리지 남음
              </Typography>
            )}
          </Box>

          {/* 버튼 */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenModal(true)}
              sx={{
                borderRadius: 9999,
                px: 4,
                py: 1.25,
                fontWeight: 700,
                fontSize: '0.9rem',
                bgcolor: '#6366f1',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
                '&:hover': {
                  bgcolor: '#4f46e5',
                  boxShadow: '0 10px 28px rgba(99,102,241,0.5)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.25s ease',
              }}
            >
              모든 단계 보기
            </Button>
          </Box>
        </Box>
      </Box>

      <GomEvolutionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        currentLevelMin={currentLevel.min}
        fishCount={fishCount}
      />
    </Box>
  )
}
