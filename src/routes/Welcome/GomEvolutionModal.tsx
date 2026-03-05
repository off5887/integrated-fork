// src/routes/Dashboard/GomEvolutionModal.tsx
import CloseIcon from '@mui/icons-material/Close'
import {
  alpha,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { darkPalette, lightPalette } from '../../theme/index'

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

const SPECIAL_CARDS = [
  {
    name: '심사위원 곰',
    image: '/tarot/judge_bear.png',
    desc: '아이디어를 심사할 수 있는 공정한 곰곰이예요. 채택 여부를 결정하는 중요한 역할을 맡고 있어요!',
  },
  {
    name: '시스템 관리자 곰',
    image: '/tarot/mecha_bear.png',
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
  const palette = isDarkMode ? darkPalette : lightPalette
  const primaryMain = theme.palette.primary.main

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth={isMobile ? false : 'lg'}
      fullWidth={!isMobile}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: alpha(
            theme.palette.background.paper,
            isDarkMode ? 0.68 : 0.92,
          ),
          borderRadius: 3,
          boxShadow: isDarkMode
            ? '0 16px 60px rgba(0,0,0,0.65), 0 0 32px rgba(96,165,250,0.15)'
            : '0 12px 48px rgba(0,0,0,0.18)',
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.25 : 0.12)}`,
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          maxHeight: isMobile ? '100%' : '90vh',
          width: isLargeScreen ? '82%' : '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: primaryMain,
          color: '#ffffff',
          py: isMobile ? 2 : 2.5,
          px: { xs: 3, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${alpha('#ffffff', 0.18)}`,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          곰곰이 진화 & 특별 카드
        </Typography>
        <CloseIcon
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            fontSize: isMobile ? 32 : 28,
            '&:hover': { opacity: 0.75 },
          }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          p: isMobile ? { xs: 2, sm: 3 } : { xs: 3, md: 4, lg: 5 },
          overflowY: 'auto',
          bgcolor: 'transparent',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            mt: 2,
            mb: 3,
            color: primaryMain,
            textAlign: 'center',
          }}
        >
          진화 단계
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}
          justifyContent="center"
        >
          {GOM_LEVELS.map((level) => {
            const isCurrent = level.min === currentLevelMin
            const isAchieved = fishCount >= level.min

            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={isLargeScreen ? 2 : 3}
                xl={2}
                key={level.min}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: alpha(
                      palette.cardBg || theme.palette.background.paper,
                      isDarkMode ? 0.68 : 0.92,
                    ),
                    border: `1px solid ${isCurrent ? primaryMain : alpha(theme.palette.divider, isDarkMode ? 0.28 : 0.18)}`,
                    boxShadow: isDarkMode
                      ? '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(96,165,250,0.12)'
                      : '0 6px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.28s ease',
                    height: '100%',
                    maxWidth: isLargeScreen ? 210 : 240,
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: isDarkMode
                        ? '0 16px 48px rgba(0,0,0,0.6), 0 0 32px rgba(96,165,250,0.20)'
                        : '0 12px 32px rgba(0,0,0,0.18)',
                    },
                    opacity: isAchieved ? 1 : 0.78,
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 1.8, lg: 2 },
                      bgcolor: alpha(
                        primaryMain,
                        isCurrent ? (isDarkMode ? 0.18 : 0.1) : 0.05,
                      ),
                      aspectRatio: '4/4.2',
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
                        width: '88%',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: isAchieved
                          ? 'none'
                          : 'grayscale(0.7) brightness(0.9)',
                      }}
                    />
                  </Box>

                  <Box sx={{ p: { xs: 1.6, lg: 2 }, textAlign: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: '0.96rem', lg: '1.02rem' },
                        color: isCurrent
                          ? primaryMain
                          : theme.palette.text.primary,
                      }}
                    >
                      {level.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.78rem', lg: '0.82rem' },
                        display: 'block',
                        mt: 0.5,
                        lineHeight: 1.45,
                      }}
                    >
                      {level.desc}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        fontSize: { xs: '0.8rem', lg: '0.84rem' },
                        color: isAchieved
                          ? primaryMain
                          : theme.palette.text.secondary,
                        fontWeight: isAchieved ? 600 : 400,
                        display: 'block',
                      }}
                    >
                      {isAchieved ? '달성 ✓' : `${level.min.toLocaleString()}`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>

        <Divider sx={{ my: { xs: 5, lg: 6 } }} />

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            mb: 3,
            color: primaryMain,
            textAlign: 'center',
          }}
        >
          특별 카드
        </Typography>

        <Grid container spacing={{ xs: 3, lg: 4 }} justifyContent="center">
          {SPECIAL_CARDS.map((card) => (
            <Grid item xs={12} sm={6} md={6} lg={5} key={card.name}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(primaryMain, isDarkMode ? 0.35 : 0.25)}`,
                  bgcolor: alpha(
                    palette.cardBg || theme.palette.background.paper,
                    isDarkMode ? 0.68 : 0.92,
                  ),
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(96,165,250,0.12)'
                    : '0 6px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.28s ease',
                  maxWidth: 340,
                  mx: 'auto',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isDarkMode
                      ? '0 16px 48px rgba(0,0,0,0.6), 0 0 32px rgba(96,165,250,0.22)'
                      : '0 12px 32px rgba(0,0,0,0.18)',
                    borderColor: alpha(primaryMain, 0.6),
                  },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, lg: 3 },
                    bgcolor: alpha(primaryMain, isDarkMode ? 0.12 : 0.06),
                    aspectRatio: '4/4.2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.name}
                    sx={{
                      width: '86%',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                <Box sx={{ p: { xs: 2, lg: 2.5 }, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: primaryMain,
                      fontSize: { xs: '1.05rem', lg: '1.1rem' },
                      mb: 1,
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.9rem', lg: '0.95rem' },
                      lineHeight: 1.55,
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
