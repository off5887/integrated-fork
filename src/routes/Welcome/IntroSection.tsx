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
import { useThemeMode } from '../../context/ThemeContext'

export default function IntroSection() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  return (
    <Box
      component="section"
      sx={{
        height: '100dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2.5, sm: 4, md: 6, lg: 10 },
        py: { xs: 3, sm: 5, md: 7 },
        bgcolor: alpha(theme.palette.background.paper, 0.35),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Slide direction="up" in timeout={600} mountOnEnter unmountOnExit>
        <Fade in timeout={900}>
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 480, sm: 700, md: 900, lg: 1100 },
              mx: 'auto',
              p: { xs: 3, sm: 5, md: 6, lg: 7 },
              borderRadius: { xs: 2, sm: 3 },
              bgcolor: alpha(theme.palette.background.paper, 0.88),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              align="center"
              sx={{
                fontSize: { xs: '1.85rem', sm: '2.2rem', md: '2.8rem' },
                lineHeight: 1.2,
                mb: { xs: 3.5, sm: 4.5, md: 5.5 },
                letterSpacing: '-0.01em',
              }}
            >
              곰곰세상이란?
            </Typography>

            <Typography
              variant="body1"
              align="center"
              sx={{
                fontSize: { xs: '0.96rem', sm: '1.02rem', md: '1.1rem' },
                lineHeight: 1.7,
                maxWidth: 760,
                mx: 'auto',
                mb: { xs: 5, sm: 7, md: 8 },
                color: theme.palette.text.secondary,
              }}
            >
              곰곰세상은 대림바스 직원 모두가 자유롭게 참여하는{' '}
              <Box component="span" fontWeight={600} color="primary.main">
                업무 개선 & 혁신 제안 제도
              </Box>
              입니다. 누구나 아이디어를 제안하고, 채택·실행되면
              생선(마일리지)으로 보상받으며, 생선이 쌓일수록 나만의 곰곰이가
              진화하는 재미까지 있는 시스템이에요.
            </Typography>

            <Grid
              container
              spacing={{ xs: 2.5, sm: 3, md: 4 }}
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
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box
                    sx={{
                      p: { xs: 2.5, sm: 3.5, md: 4.5 },
                      borderRadius: 2.5,
                      height: '100%',
                      bgcolor: alpha(theme.palette.background.paper, 0.92),
                      border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 10px 24px ${alpha(
                          theme.palette.primary.main,
                          isDarkMode ? 0.18 : 0.12,
                        )}`,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary.main"
                      sx={{
                        mb: 1.2,
                        fontSize: { xs: '1.05rem', sm: '1.15rem' },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.88rem', sm: '0.95rem' },
                        lineHeight: 1.55,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: { xs: 5, sm: 7, md: 9 } }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  minWidth: { xs: 200, sm: 240 },
                  py: { xs: 1.4, sm: 1.6 },
                  px: { xs: 5, sm: 7 },
                  borderRadius: 50,
                  fontSize: { xs: '0.98rem', sm: '1.05rem' },
                  fontWeight: 600,
                  boxShadow: `0 5px 16px ${alpha(theme.palette.primary.main, 0.28)}`,
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                지금 상상 제안하기 🐻
              </Button>
            </Box>
          </Box>
        </Fade>
      </Slide>
    </Box>
  )
}
