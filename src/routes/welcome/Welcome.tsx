// src/routes/Welcome/Welcome.tsx
import DarkModeIcon from '@mui/icons-material/DarkMode'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/ThemeContext'
import { fishCount } from '@/api/mock/welcome'
import GomEvolutionSection from './components/GomEvolutionSection'
import IntroSection from './components/IntroSection'

export default function Welcome() {
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const fishCount = 3200

  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        '&::-webkit-scrollbar': { width: 0 },
      }}
    >
      {/* 다크모드 토글 */}
      <IconButton
        onClick={toggleTheme}
        size="medium"
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1300,
          bgcolor: isDarkMode ? 'rgba(22,30,46,0.85)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.15)' : 'rgba(203,213,225,0.6)'}`,
          borderRadius: '50%',
          boxShadow: isDarkMode
            ? '0 4px 16px rgba(0,0,0,0.3)'
            : '0 2px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.25s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            bgcolor: isDarkMode
              ? 'rgba(22,30,46,0.95)'
              : 'rgba(255,255,255,0.98)',
          },
        }}
      >
        {isDarkMode ? (
          <LightModeIcon sx={{ color: '#fbbf24' }} />
        ) : (
          <DarkModeIcon sx={{ color: '#64748b' }} />
        )}
      </IconButton>

      {/* 히어로 섹션 */}
      <Box
        component="section"
        sx={{
          height: '100dvh',
          minHeight: '100vh',
          width: '100vw',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 3, sm: 6 },
          transition: 'background-color 0.3s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* 배경 장식 오브 */}
        <Box
          sx={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '55%',
            width: '30vw',
            height: '30vw',
            borderRadius: '50%',
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 메인 콘텐츠 */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: 760,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 로고 - 가운데 강조 버전 */}
          <Box
            component="img"
            src="/src/assets/gomgom_logo.png"
            alt="Gomgom Logo"
            sx={{
              width: { xs: 110, sm: 130, md: 100 },
              height: { xs: 110, sm: 130, md: 100 },
              mb: { xs: 4, md: 5.5 },
              objectFit: 'contain',
              borderRadius: '32px',
              boxShadow: '0 12px 40px rgba(99,102,241,0.5)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.45)' : 'rgba(99,102,241,0.35)'}`,
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              animation: 'float 7s ease-in-out infinite',
              '&:hover': {
                transform: 'scale(1.12) rotate(6deg)',
                boxShadow: '0 15px 50px rgba(99,102,241,0.65)',
              },
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-14px)' },
              },
            }}
          />

          {/* 배지 */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: 9999,
              bgcolor: isDarkMode
                ? 'rgba(99,102,241,0.15)'
                : 'rgba(99,102,241,0.08)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#6366f1',
                animation: 'pulseDot 2s ease-in-out infinite',
                '@keyframes pulseDot': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(0.7)' },
                },
              }}
            />
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                letterSpacing: '0.1em',
                fontFamily: 'monospace',
              }}
            >
              GOMGOM WORLD
            </Typography>
          </Box>

          {/* 타이틀 */}
          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              mb: 2.5,
              background:
                'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Gomgom Dashboard
          </Typography>

          {/* 설명 */}
          <Typography
            sx={{
              fontSize: { xs: '.9rem', md: '1rem' },
              color: textSecondary,
              lineHeight: 1.75,
              mb: 5,
              maxWidth: 540,
              mx: 'auto',
            }}
          >
            안녕하세요. 곰곰세상입니다.
            <br />
            아래로 스크롤하면 곰곰세상 소개와 나의 곰곰이 상태를 확인할 수
            있어요.
          </Typography>

          {/* 버튼 */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 6,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: '0.95rem',
                bgcolor: '#6366f1',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                '&:hover': {
                  bgcolor: '#4f46e5',
                  boxShadow: '0 12px 32px rgba(99,102,241,0.55)',
                  transform: 'translateY(-2px)',
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
                py: 1.5,
                px: 5,
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: '0.95rem',
                borderColor: isDarkMode
                  ? 'rgba(99,102,241,0.4)'
                  : 'rgba(99,102,241,0.3)',
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                '&:hover': {
                  borderColor: '#6366f1',
                  bgcolor: 'rgba(99,102,241,0.08)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.25s ease',
              }}
            >
              로그아웃
            </Button>
          </Box>

          {/* 스크롤 인디케이터 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              animation: 'bounceDown 2s ease-in-out infinite',
              '@keyframes bounceDown': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: textSecondary,
                opacity: 0.7,
              }}
            >
              scroll
            </Typography>
            <KeyboardArrowDownIcon
              sx={{ fontSize: '1.4rem', color: '#6366f1' }}
            />
          </Box>
        </Box>
      </Box>

      {/* 소개 섹션 */}
      <IntroSection />

      {/* 곰곰이 진화 섹션 */}
      <GomEvolutionSection fishCount={fishCount} />
    </Box>
  )
}
