// src/features/error/NotFoundPage.tsx
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getErrorTheme } from '@/theme/errorTheme'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const { textPrimary, textSecondary, bgBase } = usePageColors()
  const t = getErrorTheme(isDarkMode)

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: bgBase,
        p: 3,
      }}
    >
      {/* 배경 블롭 */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: { xs: 320, md: 520 },
          height: { xs: 320, md: 520 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.blobIndigo}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: t.blobOpacity,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-8%',
          width: { xs: 280, md: 440 },
          height: { xs: 280, md: 440 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.blobPurple}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: t.blobOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* 테마 토글 버튼 */}
      <Tooltip title={isDarkMode ? '라이트 모드' : '다크 모드'} placement="left">
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 2,
            color: textSecondary,
            bgcolor: t.toggleBg,
            border: `1px solid ${t.toggleBorder}`,
            '&:hover': { bgcolor: t.toggleHoverBg },
          }}
        >
          {isDarkMode ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>

      {/* 그리드 도트 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${t.gridDot} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 480,
        }}
      >
        {/* 플로팅 이모지 */}
        <Box
          sx={{
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-14px)' },
            },
            animation: 'float 3.2s ease-in-out infinite',
            fontSize: '5rem',
            lineHeight: 1,
            mb: 3,
            filter: t.emojiFilter,
            userSelect: 'none',
          }}
        >
          👻
        </Box>

        {/* 404 */}
        <Typography
          sx={{
            fontSize: { xs: '5.5rem', sm: '8rem' },
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            background: t.gradient404,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 0.5,
            userSelect: 'none',
          }}
        >
          404
        </Typography>

        {/* 구분선 */}
        <Box
          sx={{
            width: 48,
            height: 3,
            borderRadius: 2,
            background: t.dividerGradient,
            mb: 3,
            opacity: 0.6,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: textPrimary, mb: 1.5, fontSize: { xs: '1rem', sm: '1.15rem' } }}
        >
          페이지를 찾을 수 없어요
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: textSecondary, lineHeight: 1.8, mb: 4.5, fontSize: '0.875rem' }}
        >
          요청하신 주소가 잘못되었거나
          <br />
          더 이상 존재하지 않는 페이지입니다.
        </Typography>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 2.5,
              fontSize: '0.875rem',
              border: `1.5px solid ${t.outlinedBorder}`,
              color: t.outlinedColor,
              bgcolor: 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                border: `1.5px solid ${t.outlinedHoverBorder}`,
                bgcolor: t.outlinedHoverBg,
                transform: 'translateY(-1px)',
              },
            }}
          >
            이전 페이지
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard')}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 700,
              borderRadius: 2.5,
              fontSize: '0.875rem',
              background: t.btnGradient,
              color: t.btnColor,
              boxShadow: t.btnShadow,
              transition: 'all 0.2s',
              '&:hover': {
                background: t.btnHoverGradient,
                boxShadow: t.btnHoverShadow,
                transform: 'translateY(-1px)',
              },
            }}
          >
            대시보드로 이동
          </Button>
        </Box>
      </Box>

      {/* 하단 힌트 */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 28,
          color: textSecondary,
          opacity: 0.45,
          fontSize: '0.72rem',
          letterSpacing: '0.02em',
        }}
      >
        URL을 다시 확인하거나 관리자에게 문의하세요
      </Typography>
    </Box>
  )
}
