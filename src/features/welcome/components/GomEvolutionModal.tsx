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
import { useThemeMode } from '@/context/ThemeContext'
import { getWelcomeTheme } from '@/theme/welcomeTheme'
import { SPECIAL_CARDS } from '@/api/mock/welcome'

interface Level {
  level: number
  name: string
  min: number
  image: string
  desc: string
}

interface GomEvolutionModalProps {
  open: boolean
  onClose: () => void
  currentLevelMin: number
  fishCount: number
  levels: Level[]
}

export default function GomEvolutionModal({
  open,
  onClose,
  currentLevelMin,
  fishCount,
  levels,
}: GomEvolutionModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isDarkMode } = useThemeMode()
  const t = getWelcomeTheme(isDarkMode)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
      aria-labelledby="gom-evolution-dialog-title"
      slotProps={{
        paper: {
          sx: {
            bgcolor: t.dialogBg,
            borderRadius: isMobile ? 0 : 3,
            border: `1px solid ${t.borderColor}`,
            boxShadow: t.dialogShadow,
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
            bgcolor: t.dialogHeaderBg,
            borderBottom: `1px solid ${t.borderColor}`,
          }}
        >
          <Box>
            <Typography
              id="gom-evolution-dialog-title"
              variant="h5"
              fontWeight={800}
              sx={{
                color: t.textPrimary,
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              곰곰이 진화 단계
            </Typography>
            <Typography variant="caption" sx={{ color: t.textSecondary }}>
              생선을 모을수록 성장하는 나만의 곰곰이 — 모든 단계 보기
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: t.textSecondary,
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
            color: t.accentColor,
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.72rem',
          }}
        >
          진화 단계
        </Typography>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {levels.map((level) => {
            const isCurrent = level.min === currentLevelMin
            const isAchieved = fishCount >= level.min

            return (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={level.min}>
                <Box
                  sx={{
                    bgcolor: t.cardBg,
                    border: `1px solid ${isCurrent ? 'rgba(99,102,241,0.5)' : t.borderColor}`,
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
                      bgcolor: isCurrent ? t.cardCurrentBg : t.cardDefaultBg,
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
                        color: isCurrent ? t.currentLevelColor : t.textPrimary,
                        mb: 0.5,
                      }}
                    >
                      {level.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: t.textSecondary,
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
                        color: isAchieved ? t.achievedColor : t.textSecondary,
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

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: t.borderColor }} />

        {/* 특별 카드 */}
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 2,
            color: t.accentColor,
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
                  bgcolor: t.cardBg,
                  border: `1px solid ${t.borderColor}`,
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
                    borderColor: t.accentBorder,
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
                    bgcolor: t.specialCardBg,
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
                      color: t.specialCardNameColor,
                      fontSize: '1rem',
                      mb: 1,
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: t.textSecondary,
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
