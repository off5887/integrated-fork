// src/routes/Dashboard/IntroSection.tsx
import {
  alpha,
  Box,
  Button,
  Fade,
  Grid,
  Slide,
  Typography,
  useTheme,
} from '@mui/material'
import { useThemeMode } from '../../context/ThemeContext' // ← 이 경로로 통일

export default function IntroSection() {
  const { isDarkMode } = useThemeMode()
  const theme = useTheme()

  // 배경/카드 관련만 colors.ts에서 가져오고 나머지는 theme.palette 사용
  // (필요 없으면 import 자체 제거 가능)
  // const palette = isDarkMode ? darkPalette : lightPalette;

  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 4, sm: 6, md: 10 },
        py: { xs: 6, md: 8 },
        bgcolor: theme.palette.background.default, // MUI 배경 기본값
        transition: 'background-color 0.6s ease',
      }}
    >
      <Slide direction="up" in={true} timeout={800} mountOnEnter unmountOnExit>
        <Fade in={true} timeout={1200}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 1100,
              mx: 'auto',
              p: { xs: 5, sm: 6, md: 8 },
              textAlign: 'center',
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: 'blur(16px)',
              transition: 'all 0.4s ease',
            }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                mb: 6,
                color: theme.palette.text.primary,
                letterSpacing: '-0.01em',
              }}
            >
              곰곰세상이란?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                lineHeight: 1.9,
                color: theme.palette.text.secondary,
                maxWidth: 880,
                mx: 'auto',
                mb: 10,
              }}
            >
              곰곰세상은 대림바스 직원 모두가 자유롭게 참여하는{' '}
              <strong style={{ color: theme.palette.primary.main }}>
                업무 개선 & 혁신 제안 제도
              </strong>
              입니다. 누구나 아이디어를 제안하고, 채택·실행되면
              생선(마일리지)으로 보상받으며, 생선이 쌓일수록 나만의 곰곰이가
              진화하는 재미까지 있는 시스템이에요.
            </Typography>

            <Grid
              container
              spacing={{ xs: 3, sm: 4, md: 5 }}
              justifyContent="center"
            >
              {[
                {
                  title: '누구나 제안 가능',
                  desc: '복잡한 절차 없이 간단히 등록',
                },
                {
                  title: '생선 = 현금 보상',
                  desc: '1마리 = 100원, 매월 급여에 반영',
                },
                {
                  title: '곰곰이 진화',
                  desc: '생선 모을수록 곰곰이가 레벨업!',
                },
              ].map((item, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Box
                    sx={{
                      p: { xs: 4, sm: 5 },
                      borderRadius: 16,
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.35s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.35)}`,
                        bgcolor: alpha(
                          theme.palette.primary.main,
                          isDarkMode ? 0.08 : 0.04,
                        ),
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ mb: 2, color: theme.palette.primary.main }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 10,
                py: 2,
                px: { xs: 6, sm: 8 },
                borderRadius: 50,
                fontSize: '1.15rem',
                fontWeight: 600,
                bgcolor: theme.palette.primary.main,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'translateY(-6px)',
                  boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.45)}`,
                },
                transition: 'all 0.3s ease',
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              지금 상상 제안하기 🐻
            </Button>
          </Box>
        </Fade>
      </Slide>
    </Box>
  )
}
