// src/routes/Welcome/GomEvolutionSection.tsx
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import GomEvolutionModal from './GomEvolutionModal'

const GOM_LEVELS = [
  { min: 0, name: '아기 곰곰이', image: '/tarot/baby_bear.png' },
  { min: 500, name: '꼬마 곰곰이', image: '/tarot/kid_bear.png' },
  { min: 2000, name: '곰곰 워리어', image: '/tarot/warrior_bear.png' },
  { min: 5000, name: '곰곰 마스터', image: '/tarot/master_bear.png' },
  { min: 10000, name: '곰신', image: '/tarot/god_bear.png' },
] as const

function getGomLevel(fishCount: number) {
  return GOM_LEVELS.reduce((prev, curr) => (fishCount >= curr.min ? curr : prev))
}

interface GomEvolutionSectionProps {
  fishCount: number
}

export default function GomEvolutionSection({ fishCount }: GomEvolutionSectionProps) {
  const { isDarkMode } = useThemeMode()
  const [openModal, setOpenModal] = useState(false)

  const currentLevel = getGomLevel(fishCount)
  const nextLevel =
    GOM_LEVELS.find((l) => l.min > fishCount) || GOM_LEVELS[GOM_LEVELS.length - 1]
  const progress =
    nextLevel.min > fishCount
      ? Math.min(100, Math.round((fishCount / nextLevel.min) * 100))
      : 100

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  return (
    <Box
      component="section"
      sx={{
        height: '100dvh',
        minHeight: '100vh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
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
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
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
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 520,
          mx: 'auto',
          bgcolor: isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: isDarkMode
            ? '0 8px 40px rgba(0,0,0,0.5)'
            : '0 4px 32px rgba(0,0,0,0.08)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 상단 그라디언트 스트립 */}
        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

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
            <Typography sx={{ fontSize: '0.9rem', color: textSecondary }}>
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
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.06)',
                border: `2px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
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
              sx={{ color: textPrimary, mb: 0.5, fontSize: '1.3rem' }}
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
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: '0.9rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }} />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                }}
              >
                {fishCount.toLocaleString()} 마일리지
              </Typography>
            </Box>
          </Box>

          {/* 진행률 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '0.82rem', color: textSecondary, fontWeight: 600 }}>
                다음 레벨까지
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
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
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 9999,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                },
              }}
            />

            {nextLevel.min > fishCount && (
              <Typography
                sx={{ fontSize: '0.8rem', color: textSecondary, mt: 1, textAlign: 'right' }}
              >
                {nextLevel.name}까지{' '}
                <Box component="span" sx={{ fontWeight: 700, color: isDarkMode ? '#c4b5fd' : '#6366f1' }}>
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
        isDarkMode={isDarkMode}
      />
    </Box>
  )
}
