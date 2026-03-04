// src/routes/Dashboard/IntroSection.tsx
import {
  alpha,
  Box,
  Fade,
  Grid,
  Slide,
  Typography,
  useTheme,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext'

export default function IntroSection() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

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
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        bgcolor: isDarkMode ? '#0a0f1c' : '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
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

      <Slide direction="up" in timeout={800} mountOnEnter unmountOnExit>
        <Fade in timeout={1100}>
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 520, sm: 680, md: '86%', lg: 1080, xl: 1200 },
              mx: 'auto',
              p: {
                xs: 3.5,
                sm: 5,
                md: 6.5, // ← 여기 늘림 (기존 5 → 6.5)
                lg: 8, // ← 여기 늘림 (기존 7 → 8)
                xl: 9,
              },
              borderRadius: { xs: 4, md: 5, lg: 6 },
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: isDarkMode
                ? '0 24px 70px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)'
                : '0 24px 70px -10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.92)',
              position: 'relative',
              zIndex: 2,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: isDarkMode
                  ? '0 36px 90px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(147,197,253,0.1)'
                  : '0 36px 90px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(59,130,246,0.09)',
              },
            }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4.5, lg: 5.5 } }}>
              <Typography
                variant="h2"
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs: '1.6rem',
                    sm: '2rem',
                    md: '2.3rem',
                    lg: '2.5rem',
                    xl: '3rem',
                  },
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  mb: 1, // ← 제목 아래 여백 줄임 (기존 1.5 → 1)
                  background: isDarkMode
                    ? 'linear-gradient(90deg, #c4d0ff, #60a5fa, #a5b4fc)'
                    : `linear-gradient(90deg, ${theme.palette.primary.dark}, #3b82f6)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                곰곰세상이란?
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.15rem',
                    lg: '1.3rem',
                  },
                  fontWeight: 500,
                  color: isDarkMode ? '#94a3b8' : '#64748b',
                  maxWidth: 660,
                  mb: 1, // ← 서브타이틀 아래 여백 줄임 (기존 1.5 → 1)
                  mx: 'auto',
                }}
              >
                누구나 참여하는 혁신 플랫폼
              </Typography>
            </Box>

            <Typography
              variant="body1"
              align="center"
              sx={{
                fontSize: {
                  xs: '0.98rem',
                  sm: '1.02rem',
                  md: '1.06rem',
                  lg: '1.1rem',
                },
                lineHeight: 1.78,
                maxWidth: 680,
                mx: 'auto',
                mb: { xs: 3.5, md: 4.5, lg: 5 }, // ← 본문 아래 여백도 조금 줄임
                color: isDarkMode ? '#94a3b8' : '#64748b',
                fontWeight: 400,
              }}
            >
              곰곰세상은 대림바스 구성원 누구나 자유롭게 아이디어를 제안하고,
              실행되는 순간{' '}
              <Box
                component="span"
                sx={{ color: 'primary.main', fontWeight: 700 }}
              >
                실질적인 보상
              </Box>
              을 받는 내부 혁신 제도입니다. 제안할수록, 생선이 쌓일수록 나만의
              곰곰이가 성장하는 재미까지 더했습니다.
            </Typography>

            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3, lg: 4 }}
              sx={{
                width: '100%',
                maxWidth: '100%',
                mx: 'auto',
                mb: { xs: 4, md: 6, lg: 7 }, // ← 그리드 아래 여백도 약간 줄임
              }}
            >
              {[
                {
                  number: '01',
                  title: '누구나 제안 가능',
                  desc: '복잡한 승인 절차 없이 간단하게 아이디어를 등록하고 공유하세요.',
                },
                {
                  number: '02',
                  title: '실질적인 보상',
                  desc: '1마리 생선 = 100원. 채택된 제안은 매월 급여에 직접 반영됩니다.',
                },
                {
                  number: '03',
                  title: '곰곰이와 함께 성장',
                  desc: '생선을 모을수록 곰곰이가 진화합니다. 레벨업의 재미를 느껴보세요.',
                },
              ].map((item, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Box
                    sx={{
                      height: '100%',
                      p: { xs: 2.5, sm: 3, md: 3.5, lg: 4.5 },
                      borderRadius: 4,
                      background: isDarkMode
                        ? 'rgba(15, 23, 42, 0.62)'
                        : 'rgba(255, 255, 255, 0.78)',
                      border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.09 : 0.07)}`,
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                        boxShadow: isDarkMode
                          ? '0 20px 50px -10px rgba(59, 130, 246, 0.25)'
                          : '0 20px 50px -10px rgba(59, 130, 246, 0.2)',
                      },
                      '&::before': {
                        content: `"${item.number}"`,
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontSize: '2.8rem',
                        fontWeight: 900,
                        lineHeight: 1,
                        opacity: isDarkMode ? 0.2 : 0.2,
                        color: '#94a3b8',
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2.5, position: 'relative', zIndex: 1 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 3,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          fontSize: {
                            xs: '1.1rem',
                            md: '1.18rem',
                            lg: '1.25rem',
                          },
                          mb: 1.2,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          xs: '0.9rem',
                          md: '0.94rem',
                          lg: '0.97rem',
                        },
                        lineHeight: 1.65,
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* 버튼이 있었다면 여기 다시 추가하세요 */}
          </Box>
        </Fade>
      </Slide>
    </Box>
  )
}
