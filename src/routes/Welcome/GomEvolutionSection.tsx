// src/routes/Dashboard/GomEvolutionSection.tsx
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Fade,
  Slide,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
import GomEvolutionModal from './GomEvolutionModal'

function FishIcon({ size = 20 }: { size?: number }) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: size, height: size }}>
      <path
        d="M6 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="18" cy="12" r="2.5" fill="#ffffff" />
      <circle cx="19" cy="11.5" r="1" fill="#000000" opacity="0.4" />
      <path d="M22 12l6-4v8z" fill="currentColor" opacity="0.85" />
      <path d="M4 12l4-3v6z" fill="currentColor" opacity="0.7" />
    </SvgIcon>
  )
}

const GOM_LEVELS = [
  { min: 0, name: '아기 곰곰이', image: '/tarot/baby_bear.png' },
  { min: 500, name: '꼬마 곰곰이', image: '/tarot/kid_bear.png' },
  { min: 2000, name: '곰곰 워리어', image: '/tarot/warrior_bear.png' },
  { min: 5000, name: '곰곰 마스터', image: '/tarot/master_bear.png' },
  { min: 10000, name: '곰신', image: '/tarot/god_bear.png' },
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

  const currentLevel = getGomLevel(fishCount)
  const nextLevel =
    GOM_LEVELS.find((l) => l.min > fishCount) ||
    GOM_LEVELS[GOM_LEVELS.length - 1]
  const [openModal, setOpenModal] = useState(false)

  const progress =
    nextLevel.min > fishCount
      ? Math.min(100, Math.round((fishCount / nextLevel.min) * 100))
      : 100

  const glassBg = isDarkMode
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.72), rgba(30, 41, 59, 0.52))'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(248, 250, 252, 0.82))'

  const glassBorder = isDarkMode
    ? alpha('#64748b', 0.12)
    : alpha(theme.palette.primary.main, 0.08)

  return (
    <Box
      component="section"
      sx={{
        height: '100dvh',
        minHeight: '100vh',
        minHeight: '-webkit-fill-available',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 1.5, sm: 3, md: 5 },
        bgcolor: isDarkMode ? '#0a0f1c' : '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at 30% 20%, rgba(147, 197, 253, 0.07) 0%, transparent 60%)'
            : 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Slide direction="up" in timeout={900} mountOnEnter unmountOnExit>
        <Fade in timeout={1200}>
          <Box
            sx={{
              width: 'min(92%, 680px)',
              maxWidth: { xs: '92vw', sm: 520, md: 620, lg: 680 },
              minHeight: 'min(65dvh, 480px)',
              mx: 'auto',
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: { xs: 4, md: 5 },
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: isDarkMode
                ? '0 24px 70px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)'
                : '0 24px 70px -10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.92)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92dvh',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '&:hover': {
                transform: 'translateY(-6px)',
              },
            }}
          >
            {/* 헤더 - 여백 줄임 */}
            <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 3.5 } }}>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.2rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  mb: 0.75,
                  background: isDarkMode
                    ? 'linear-gradient(90deg, #c4d0ff, #60a5fa, #a5b4fc)'
                    : `linear-gradient(90deg, ${theme.palette.primary.dark}, #3b82f6)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                곰곰이 진화
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  maxWidth: 580,
                  mx: 'auto',
                }}
              >
                생선 모을수록 성장하는 나만의 곰곰이
              </Typography>
            </Box>

            {/* 메인 콘텐츠 */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                my: 1,
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  component="img"
                  src={currentLevel.image}
                  alt={currentLevel.name}
                  sx={{
                    width: { xs: 120, sm: 150, md: 170 },
                    height: 'auto',
                    borderRadius: 4,
                    objectFit: 'contain',
                    mb: 2,
                    mx: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))',
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: '1.3rem', sm: '1.45rem', md: '1.65rem' },
                    mb: 0.75,
                    color: isDarkMode ? '#f8fafc' : theme.palette.text.primary,
                    textShadow: isDarkMode
                      ? '0 1px 6px rgba(0,0,0,0.5)'
                      : 'none',
                  }}
                >
                  {currentLevel.name}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.45rem', sm: '1.6rem' },
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {fishCount.toLocaleString()}
                  </Typography>
                  <FishIcon size={20} />
                </Box>
              </Box>

              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={{ xs: 70, md: 80 }}
                    thickness={4}
                    sx={{
                      color: isDarkMode
                        ? alpha('#64748b', 0.18)
                        : alpha('#e2e8f0', 0.5),
                      position: 'absolute',
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={{ xs: 70, md: 80 }}
                    thickness={5}
                    sx={{
                      color: theme.palette.primary.main,
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      fontWeight: 700,
                      color: isDarkMode
                        ? '#f8fafc'
                        : theme.palette.text.primary,
                    }}
                  >
                    {progress}%
                  </Box>
                </Box>

                {nextLevel.min > fishCount && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: theme.palette.text.secondary,
                      fontSize: '0.95rem',
                    }}
                  >
                    다음 단계까지 <strong>{nextLevel.min - fishCount}</strong>{' '}
                    마리
                  </Typography>
                )}
              </Box>
            </Box>

            {/* 버튼 영역 */}
            <Box sx={{ textAlign: 'center', mt: 'auto', pt: 2, pb: 3 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setOpenModal(true)}
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  px: 5,
                  py: 1.2,
                  borderRadius: 3,
                  textTransform: 'none',
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  color: theme.palette.primary.main,
                  minWidth: 180,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(
                      theme.palette.primary.main,
                      isDarkMode ? 0.15 : 0.1,
                    ),
                  },
                }}
              >
                모든 단계 보기 →
              </Button>
            </Box>
          </Box>
        </Fade>
      </Slide>

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
