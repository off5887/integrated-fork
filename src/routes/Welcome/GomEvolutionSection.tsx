// src/routes/Dashboard/GomEvolutionSection.tsx
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '../../context/ThemeContext'
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
  const palette = isDarkMode ? darkPalette : lightPalette

  const currentLevel = getGomLevel(fishCount)
  const nextLevel = GOM_LEVELS.find((l) => l.min > fishCount) || null

  const [openModal, setOpenModal] = useState(false)

  const primaryMain =
    palette.primaryMain ?? (isDarkMode ? '#7dd3fc' : '#0ea5e9')

  return (
    <Box
      sx={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        maxWidth: 900,
        mx: 'auto',
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      {/* 현재 레벨 */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, color: palette.textPrimary }}
      >
        현재 곰곰이 단계
      </Typography>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          mb: 5,
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        <Box
          component="img"
          src={currentLevel.image}
          alt={currentLevel.name}
          sx={{
            width: '100%',
            borderRadius: 2,
            objectFit: 'contain',
            transition: 'all 0.4s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: `0 24px 64px ${palette.shadowSoft}1a`,
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: -20,
            borderRadius: 12,
            background: `radial-gradient(circle, ${primaryMain}59 0%, transparent 70%)`,
            animation: 'pulse 4s infinite ease-in-out',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Typography
        variant="h3"
        fontWeight="900"
        sx={{
          background: `linear-gradient(90deg, ${palette.levelTextGradientStart}, ${palette.levelTextGradientEnd})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
          fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
        }}
      >
        {currentLevel.name}
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: primaryMain, mb: 2 }}
      >
        {fishCount.toLocaleString()} 마리
      </Typography>

      {nextLevel && (
        <Typography
          variant="body1"
          sx={{ color: palette.textSecondary, mb: 4, fontSize: '1.1rem' }}
        >
          다음 진화까지 {nextLevel.min - fishCount} 마리 남았어요!
        </Typography>
      )}

      <Button
        variant="outlined"
        size="large"
        onClick={() => setOpenModal(true)}
        sx={{
          py: 1.5,
          px: 5,
          borderRadius: 50,
          borderColor: primaryMain,
          color: primaryMain,
          fontWeight: 600,
          '&:hover': {
            bgcolor: `${primaryMain}1a`,
            borderColor: palette.primaryDark ?? primaryMain,
          },
        }}
      >
        다른 진화 단계 & 특별 카드 구경하기 🐻
      </Button>

      {/* 모달 */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: isDarkMode ? '#0f172a' : '#ffffff',
            borderRadius: 12,
            overflow: 'hidden',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: primaryMain,
            color: '#fff',
            py: 2,
            px: { xs: 3, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            곰곰이 진화 & 특별 카드
          </Typography>
          <CloseIcon
            onClick={() => setOpenModal(false)}
            sx={{ cursor: 'pointer', fontSize: 28 }}
          />
        </DialogTitle>

        <DialogContent
          sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 }, overflowY: 'auto' }}
        >
          {/* 진화 단계 */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: palette.textPrimary }}
          >
            진화 단계
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            {GOM_LEVELS.map((level) => {
              const isCurrent = level.min === currentLevel.min
              const isAchieved = fishCount >= level.min

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={level.min}>
                  <Box
                    sx={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      bgcolor: palette.cardBg,
                      border: `2px solid ${isCurrent ? primaryMain : palette.cardBorder}`,
                      boxShadow: isCurrent
                        ? `0 10px 24px ${palette.shadowPrimary}59`
                        : `0 4px 12px ${palette.shadowSoft}1a`,
                      transition: 'all 0.3s ease',
                      maxWidth: 240, // ← 카드 최대 너비 축소
                      width: '100%',
                      mx: 'auto',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 14px 32px ${palette.shadowPrimary}80`,
                      },
                      opacity: isAchieved ? 1 : 0.75,
                      filter: isAchieved
                        ? 'none'
                        : 'grayscale(0.6) brightness(0.95)',
                    }}
                  >
                    <Box
                      component="img"
                      src={level.image}
                      alt={level.name}
                      sx={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'contain',
                        background: palette.cardItemBg,
                        p: 2, // ← padding 줄임
                      }}
                    />
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          color: isCurrent ? primaryMain : palette.textPrimary,
                          fontSize: '1rem',
                        }}
                      >
                        {level.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: palette.textSecondary,
                          display: 'block',
                          mt: 0.5,
                        }}
                      >
                        {level.desc}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1,
                          color: isAchieved
                            ? primaryMain
                            : palette.textSecondary,
                          fontWeight: isAchieved ? 600 : 400,
                        }}
                      >
                        {isAchieved
                          ? '달성 ✓'
                          : `${level.min.toLocaleString()}`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>

          <Divider sx={{ my: 5, borderColor: palette.cardBorder }} />

          {/* 특별 카드 */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: palette.textPrimary }}
          >
            특별 카드
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {SPECIAL_CARDS.map((card) => (
              <Grid item xs={12} sm={6} md={6} lg={5} key={card.name}>
                <Box
                  sx={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    bgcolor: palette.cardBg,
                    border: `2px solid ${primaryMain}`,
                    boxShadow: `0 8px 24px ${primaryMain}4d`,
                    transition: 'all 0.3s ease',
                    maxWidth: 320, // ← 특별 카드도 크기 축소
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 40px ${primaryMain}80`,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.name}
                    sx={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'contain',
                      background: palette.cardItemBg,
                      p: 3,
                    }}
                  />
                  <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: primaryMain, mb: 1 }}
                    >
                      {card.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: palette.textSecondary }}
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
    </Box>
  )
}
