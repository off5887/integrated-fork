// src/routes/Welcome/IntroSection.tsx
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PetsIcon from '@mui/icons-material/Pets'
import { Box, Grid, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

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
          top: '20%',
          right: '-8%',
          width: '42vw',
          height: '42vw',
          borderRadius: '50%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 980,
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
                color: textSecondary,
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
                    border: `1px solid ${borderColor}`,
                    bgcolor: isDarkMode ? 'rgba(15,23,42,0.6)' : '#f8fafc',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    '&:hover': {
                      borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)',
                      transform: 'translateY(-5px)',
                      boxShadow: isDarkMode
                        ? '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15)'
                        : '0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.1)',
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
                      color: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)',
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
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: '1.25rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }} />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: textPrimary, mb: 1, fontSize: '1rem', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: textSecondary, lineHeight: 1.65, fontSize: '0.88rem' }}
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
