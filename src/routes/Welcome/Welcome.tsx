// src/routes/Dashboard/Dashboard.tsx
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import {
  alpha,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeContext'
import GomEvolutionSection from './GomEvolutionSection'
import IntroSection from './IntroSection'

export default function Welcome() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const fishCount = 3200 // 임시값

  return (
    <Box
      component="main"
      className="snap-container"
      sx={{
        minHeight: '100dvh',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        background: `linear-gradient(135deg, ${
          isDarkMode ? '#0f172a' : '#f8fafc'
        } 0%, ${isDarkMode ? '#1e293b' : '#e2e8f0'} 100%)`,
        color: theme.palette.text.primary,
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        transition: 'background 0.5s ease',
        '@supports (height: 100dvh)': {
          minHeight: '100dvh',
        },
      }}
    >
      {/* 다크모드 토글 - 로그인과 동일하게 */}
      <IconButton
        onClick={toggleTheme}
        size="medium"
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1300,
          bgcolor: alpha(
            theme.palette.background.paper,
            isDarkMode ? 0.7 : 0.85,
          ),
          backdropFilter: 'blur(12px)',
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.2 : 0.12)}`,
          borderRadius: '50%',
          boxShadow: theme.shadows[4],
          transition: 'all 0.25s ease',
          '&:hover': {
            bgcolor: alpha(
              theme.palette.background.paper,
              isDarkMode ? 0.9 : 0.98,
            ),
            transform: 'scale(1.12)',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {isDarkMode ? (
          <LightModeIcon sx={{ color: '#fbbf24' }} />
        ) : (
          <DarkModeIcon sx={{ color: '#64748b' }} />
        )}
      </IconButton>

      {/* 1. 환영 섹션 */}
      <Box
        component="section"
        sx={{
          height: '100dvh',
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 10 },
          py: { xs: 4, md: 8 },
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.2 : 0.1)}`,
          backdropFilter: 'blur(16px)',
          boxShadow: theme.shadows[6],
          margin: 0,
          boxSizing: 'border-box',
        }}
      >
        <Box
          component="img"
          src="/gomgom_logo.png"
          alt="Gomgom Logo"
          sx={{
            width: 90,
            height: 90,
            mb: 5,
            objectFit: 'contain',
            borderRadius: '20%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.08)' },
          }}
        />

        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: { xs: '2.5rem', md: '3.6rem' },
            lineHeight: 1.15,
            mb: 4,
            background: `linear-gradient(90deg, ${
              isDarkMode ? '#93c5fd' : theme.palette.primary.light
            }, ${isDarkMode ? '#60a5fa' : theme.palette.primary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Gomgom Dashboard
        </Typography>

        <Typography
          variant="h3"
          sx={{
            maxWidth: 720,
            mb: 6,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            color: isDarkMode ? '#94a3b8' : '#64748b',
            lineHeight: 1.7,
            textAlign: 'center',
          }}
        >
          🎉 메인 대시보드에 오신 걸 환영해요 🎉
          <br />
          아래로 스크롤하면 곰곰세상 소개와 나의 곰곰이 상태를 확인할 수 있어요
          🐻
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 6,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{
              py: 1.6,
              px: 6,
              borderRadius: 3,
              fontWeight: 600,
              bgcolor: theme.palette.primary.main,
              color: '#ffffff',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.35)}`,
              },
              transition: 'all 0.25s ease',
            }}
          >
            대시보드 가기
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              localStorage.removeItem('accessToken')
              window.location.href = '/login'
            }}
            sx={{
              py: 1.6,
              px: 6,
              borderRadius: 3,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            로그아웃
          </Button>
        </Box>

        <Box
          sx={{
            mt: 8,
            color: theme.palette.primary.main,
            fontSize: '3.2rem',
            animation: 'bounce 2.4s infinite',
          }}
        >
          ↓
        </Box>
      </Box>

      {/* 2. 소개 섹션 */}
      <IntroSection />

      {/* 3. 곰곰이 진화 섹션 */}
      <Box
        component="section"
        sx={{
          height: '100dvh',
          minHeight: '100vh',
          width: '100vw',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 10 },
          py: { xs: 4, md: 8 },
          bgcolor: alpha(
            theme.palette.background.paper,
            isDarkMode ? 0.75 : 0.92,
          ),
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.2 : 0.1)}`,
          backdropFilter: 'blur(14px)',
          margin: 0,
          boxSizing: 'border-box',
        }}
      >
        <GomEvolutionSection fishCount={fishCount} />
      </Box>
    </Box>
  )
}
