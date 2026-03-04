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

// 진화 단계 데이터
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

// 특별 카드 데이터
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
  const primaryMain = palette.primaryMain ?? theme.palette.primary.main

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth={isMobile ? false : 'lg'} // xl → lg로 줄여서 너무 넓지 않게
      fullWidth={!isMobile}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: isDarkMode ? '#0f172a' : '#ffffff',
          borderRadius: 8, // 너무 둥글지 않게 8px
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          overflow: 'hidden',
          maxHeight: isMobile ? '100%' : '90vh',
          width: isLargeScreen ? '80%' : '100%',
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
            '&:hover': { opacity: 0.7 },
          }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          p: isMobile ? { xs: 2, sm: 3 } : { xs: 3, md: 4, lg: 5 },
          overflowY: 'auto',
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
                    borderRadius: 6, // 둥글기 줄임
                    overflow: 'hidden',
                    bgcolor: palette.cardBg || 'background.paper',
                    border: `1px solid ${isCurrent ? primaryMain : alpha(theme.palette.divider, 0.2)}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.22s ease',
                    height: '100%',
                    maxWidth: isLargeScreen ? 210 : 240,
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
                    },
                    opacity: isAchieved ? 1 : 0.75,
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 1.8, lg: 2 },
                      bgcolor: alpha(primaryMain, isCurrent ? 0.08 : 0.03),
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
                      }}
                    />
                  </Box>

                  <Box sx={{ p: { xs: 1.6, lg: 2 }, textAlign: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: '0.96rem', lg: '1.02rem' },
                        color: isCurrent ? primaryMain : 'text.primary',
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
                  borderRadius: 6, // 둥글기 줄임
                  overflow: 'hidden',
                  border: `1px solid ${alpha(primaryMain, 0.3)}`,
                  bgcolor: palette.cardBg || 'background.paper',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.22s ease',
                  maxWidth: 340,
                  mx: 'auto',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
                    borderColor: primaryMain,
                  },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, lg: 3 },
                    bgcolor: alpha(primaryMain, 0.04),
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
