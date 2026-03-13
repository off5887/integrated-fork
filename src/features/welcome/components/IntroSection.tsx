// src/routes/Welcome/IntroSection.tsx
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PetsIcon from '@mui/icons-material/Pets'
import { Box, Grid, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getWelcomeTheme } from '@/theme/welcomeTheme'

const features = [
  {
    Icon: LightbulbOutlinedIcon,
    number: '01',
    title: '누구나 제안 가능',
    desc: '복잡한 승인 절차 없이 간단하게 아이디어를 등록하고 공유하세요.',
  },
  {
    Icon: MonetizationOnOutlinedIcon,
    number: '02',
    title: '실질적인 보상',
    desc: '1마리 생선 = 100원. 채택된 제안은 매월 급여에 직접 반영됩니다.',
  },
  {
    Icon: PetsIcon,
    number: '03',
    title: '곰곰이와 함께 성장',
    desc: '생선을 모을수록 곰곰이가 진화합니다. 레벨업의 재미를 느껴보세요.',
  },
]

export default function IntroSection() {
  const { isDarkMode } = useThemeMode()
  const t = getWelcomeTheme(isDarkMode)

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
          top: '20%',
          right: '-8%',
          width: '42vw',
          height: '42vw',
          borderRadius: '50%',
          background: t.orb6,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 980,
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
        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <Box sx={{ p: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                fontSize: { xs: '1.9rem', md: '2.5rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                mb: 2,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              곰곰세상이란?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.98rem', md: '1.05rem' },
                color: t.textSecondary,
                maxWidth: 580,
                mx: 'auto',
                lineHeight: 1.75,
              }}
            >
              곰곰세상은 대림바스 구성원 누구나 자유롭게 아이디어를 제안하고, 실행되는 순간{' '}
              <Box component="span" sx={{ color: '#6366f1', fontWeight: 700 }}>
                실질적인 보상
              </Box>
              을 받는 내부 혁신 제도입니다.
              <br />
              제안할수록, 생선이 쌓일수록 나만의 곰곰이가 성장하는 재미까지 더했습니다.
            </Typography>
          </Box>

          {/* 피처 카드 */}
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {features.map(({ Icon, number, title, desc }) => (
              <Grid size={{ xs: 12, md: 4 }} key={number}>
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    border: `1px solid ${t.borderColor}`,
                    bgcolor: t.featureCardBg,
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    '&:hover': {
                      borderColor: t.featureHoverBorder,
                      transform: 'translateY(-5px)',
                      boxShadow: t.featureHoverShadow,
                    },
                  }}
                >
                  {/* 번호 워터마크 */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 14,
                      fontSize: '3.2rem',
                      fontWeight: 900,
                      color: t.numberWatermark,
                      lineHeight: 1,
                      userSelect: 'none',
                      fontFamily: 'monospace',
                    }}
                  >
                    {number}
                  </Typography>

                  {/* 아이콘 */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      bgcolor: t.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: '1.25rem', color: t.accentColor }} />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: t.textPrimary, mb: 1, fontSize: '1rem', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: t.textSecondary, lineHeight: 1.65, fontSize: '0.88rem' }}
                  >
                    {desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
