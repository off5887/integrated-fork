// src/routes/Dashboard/GomEvolutionSection.tsx
import { alpha, Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import { darkPalette, lightPalette } from '../../theme/index'
import GomEvolutionModal from './GomEvolutionModal'

const GOM_LEVELS = [
  {
    min: 0,
    name: '아기 곰곰이',
    image: '/tarot/baby_bear.png',
    desc: '아직 애기예요 🍼',
  },
  {
    min: 500,
    name: '꼬마 곰곰이',
    image: '/tarot/kid_bear.png',
    desc: '이제 좀 낚시할 줄 알아요 🎣',
  },
  {
    min: 2000,
    name: '곰곰 워리어',
    image: '/tarot/warrior_bear.png',
    desc: '사냥꾼 곰곰 등장!',
  },
  {
    min: 5000,
    name: '곰곰 마스터',
    image: '/tarot/master_bear.png',
    desc: '전설의 시작',
  },
  {
    min: 10000,
    name: '곰신',
    image: '/tarot/god_bear.png',
    desc: '곰신 강림 🐻✨',
  },
] as const

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
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()
  const palette = isDarkMode ? darkPalette : lightPalette

  const currentLevel = getGomLevel(fishCount)
  const nextLevel = GOM_LEVELS.find((l) => l.min > fishCount) || null
  const [openModal, setOpenModal] = useState(false)

  const primaryMain = theme.palette.primary.main

  return (
    <Box
      sx={{
        height: '100dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 3, sm: 5, md: 8, lg: 12 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          textAlign: 'center',
          bgcolor: alpha(
            theme.palette.background.paper,
            isDarkMode ? 0.68 : 0.92,
          ),
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.22 : 0.12)}`,
          backdropFilter: 'blur(12px)',
          boxShadow: isDarkMode
            ? '0 12px 40px rgba(0,0,0,0.55), 0 0 24px rgba(96,165,250,0.10)'
            : theme.shadows[4],
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: { xs: 4, md: 5 },
            fontSize: { xs: '1.8rem', md: '2.25rem' },
            color: theme.palette.text.primary,
          }}
        >
          현재 곰곰이 단계
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            maxWidth: { xs: 220, sm: 260, md: 300 },
            mb: { xs: 4, md: 6 },
            mx: 'auto',
          }}
        >
          <Box
            component="img"
            src={currentLevel.image}
            alt={currentLevel.name}
            sx={{
              width: '100%',
              borderRadius: 3,
              objectFit: 'contain',
              border: `2px solid ${alpha(primaryMain, isDarkMode ? 0.35 : 0.25)}`,
              boxShadow: isDarkMode
                ? '0 16px 48px rgba(0,0,0,0.6), 0 0 28px rgba(96,165,250,0.22)'
                : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              transition: 'all 0.4s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />
        </Box>

        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' },
            background: `linear-gradient(90deg, ${palette.gom?.levelTextStart || primaryMain}, ${
              palette.gom?.levelTextEnd || theme.palette.primary.dark
            })`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          {currentLevel.name}
        </Typography>

        <Typography variant="h5" color="primary.main" sx={{ mb: 1 }}>
          {fishCount.toLocaleString()} 마리
        </Typography>

        {nextLevel && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, fontSize: '1.05rem' }}
          >
            다음 진화까지 {nextLevel.min - fishCount} 마리 남았어요!
          </Typography>
        )}

        <Button
          variant="outlined"
          size="large"
          onClick={() => setOpenModal(true)}
          sx={{
            py: 1.4,
            px: 6,
            borderRadius: 50,
            borderColor: primaryMain,
            color: primaryMain,
            fontWeight: 600,
            '&:hover': {
              bgcolor: alpha(primaryMain, isDarkMode ? 0.15 : 0.08),
              borderColor: primaryMain,
            },
          }}
        >
          다른 진화 단계 & 특별 카드 구경하기 🐻
        </Button>
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
