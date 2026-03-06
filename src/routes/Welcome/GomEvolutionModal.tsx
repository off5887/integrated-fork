// src/routes/Welcome/GomEvolutionModal.tsx
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const GOM_LEVELS = [
  {
    min: 0,
    name: '아기 곰곰이',
    image: '/src/assets/tarot/baby_bear.png',
    desc: '아직 애기예요',
  },
  {
    min: 500,
    name: '꼬마 곰곰이',
    image: '/src/assets/tarot/kid_bear.png',
    desc: '이제 좀 낚시할 줄 알아요',
  },
  {
    min: 2000,
    name: '곰곰 워리어',
    image: '/src/assets/tarot/warrior_bear.png',
    desc: '사냥꾼 곰곰 등장!',
  },
  {
    min: 5000,
    name: '곰곰 마스터',
    image: '/src/assets/tarot/master_bear.png',
    desc: '전설의 시작',
  },
  {
    min: 10000,
    name: '곰신',
    image: '/src/assets/tarot/god_bear.png',
    desc: '곰신 강림',
  },
] as const

const SPECIAL_CARDS = [
  {
    name: '심사위원 곰',
    image: '/src/assets/tarot/judge_bear.png',
    desc: '아이디어를 심사할 수 있는 공정한 곰곰이예요. 채택 여부를 결정하는 중요한 역할을 맡고 있어요!',
  },
  {
    name: '시스템 관리자 곰',
    image: '/src/assets/tarot/mecha_bear.png',
    desc: '곰곰세상을 관리하는 시스템 관리자 곰이에요. 서버, 데이터, 규칙을 모두 지키고 있어요!',
  },
] as const

interface GomEvolutionModalProps {
  open: boolean
  onClose: () => void
  currentLevelMin: number
  fishCount: number
  isDarkMode: boolean
}

export default function GomEvolutionModal({
  open,
  onClose,
  currentLevelMin,
  fishCount,
  isDarkMode,
}: GomEvolutionModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const borderColor = isDarkMode
    ? 'rgba(148,163,184,0.1)'
    : 'rgba(203,213,225,0.5)'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: isDarkMode ? '#0d1526' : '#f8fafc',
            borderRadius: isMobile ? 0 : 3,
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode
              ? '0 16px 60px rgba(0,0,0,0.7)'
              : '0 12px 48px rgba(0,0,0,0.14)',
            overflow: 'hidden',
            maxHeight: isMobile ? '100%' : '90vh',
          },
        },
      }}
    >
      {/* 헤더 */}
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            height: 3,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 3, md: 4 },
            py: 2.5,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                color: textPrimary,
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              곰곰이 진화 단계
            </Typography>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              생선을 모을수록 성장하는 나만의 곰곰이 — 모든 단계 보기
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: textSecondary,
              '&:hover': {
                bgcolor: isDarkMode
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, md: 4 }, overflowY: 'auto' }}>
        {/* 진화 단계 */}
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 2,
            mt: 1,
            color: isDarkMode ? '#a5b4fc' : '#4338ca',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.72rem',
          }}
        >
          진화 단계
        </Typography>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {GOM_LEVELS.map((level) => {
            const isCurrent = level.min === currentLevelMin
            const isAchieved = fishCount >= level.min

            return (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={level.min}>
                <Box
                  sx={{
                    bgcolor: cardBg,
                    border: `1px solid ${isCurrent ? 'rgba(99,102,241,0.5)' : borderColor}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: isCurrent
                      ? '0 4px 20px rgba(99,102,241,0.25)'
                      : isDarkMode
                        ? '0 2px 12px rgba(0,0,0,0.3)'
                        : '0 2px 8px rgba(0,0,0,0.05)',
                    opacity: isAchieved ? 1 : 0.6,
                    transition: 'all 0.25s ease',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      opacity: 1,
                      boxShadow: isDarkMode
                        ? '0 12px 32px rgba(0,0,0,0.5)'
                        : '0 12px 28px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {isCurrent && (
                    <Box
                      sx={{
                        height: 2,
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: isDarkMode
                        ? isCurrent
                          ? 'rgba(99,102,241,0.12)'
                          : 'rgba(99,102,241,0.05)'
                        : isCurrent
                          ? 'rgba(99,102,241,0.06)'
                          : 'rgba(99,102,241,0.03)',
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={level.image}
                      alt={level.name}
                      sx={{
                        width: '80%',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: isAchieved
                          ? 'none'
                          : 'grayscale(0.7) brightness(0.85)',
                      }}
                    />
                  </Box>

                  <Box sx={{ p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        fontSize: '0.85rem',
                        color: isCurrent
                          ? isDarkMode
                            ? '#a5b4fc'
                            : '#4338ca'
                          : textPrimary,
                        mb: 0.5,
                      }}
                    >
                      {level.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: textSecondary,
                        display: 'block',
                        mb: 0.75,
                      }}
                    >
                      {level.desc}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.78rem',
                        fontWeight: isAchieved ? 700 : 500,
                        color: isAchieved
                          ? isDarkMode
                            ? '#a5b4fc'
                            : '#4338ca'
                          : textSecondary,
                      }}
                    >
                      {isAchieved
                        ? '달성 ✓'
                        : `${level.min.toLocaleString()} 마일리지`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor }} />

        {/* 특별 카드 */}
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 2,
            color: isDarkMode ? '#a5b4fc' : '#4338ca',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.72rem',
          }}
        >
          특별 카드
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {SPECIAL_CARDS.map((card) => (
            <Grid size={{ xs: 12, sm: 6 }} key={card.name}>
              <Box
                sx={{
                  bgcolor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  maxWidth: 360,
                  mx: 'auto',
                  boxShadow: isDarkMode
                    ? '0 2px 12px rgba(0,0,0,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: isDarkMode
                      ? 'rgba(99,102,241,0.3)'
                      : 'rgba(99,102,241,0.2)',
                    boxShadow: isDarkMode
                      ? '0 12px 32px rgba(0,0,0,0.5)'
                      : '0 12px 28px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: 2,
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  }}
                />
                <Box
                  sx={{
                    p: 3,
                    bgcolor: isDarkMode
                      ? 'rgba(99,102,241,0.08)'
                      : 'rgba(99,102,241,0.04)',
                    aspectRatio: '2/1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.name}
                    sx={{ width: '45%', height: 'auto', objectFit: 'contain' }}
                  />
                </Box>
                <Box sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: isDarkMode ? '#a5b4fc' : '#4338ca',
                      fontSize: '1rem',
                      mb: 1,
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.65,
                      fontSize: '0.88rem',
                    }}
                  >
                    {card.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
