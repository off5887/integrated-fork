// src/components/common/routing/ErrorFallback.tsx
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getErrorFallbackTheme } from '@/theme/errorTheme'

interface ErrorFallbackProps {
  error: Error | null
  onReload: () => void
}

export default function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { isDarkMode, toggleTheme } = useThemeMode()
  const { textPrimary, textSecondary, bgBase } = usePageColors()
  const et = getErrorFallbackTheme(isDarkMode)

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
            bgcolor: et.toggleBg,
            border: `1px solid ${et.toggleBorder}`,
            '&:hover': {
              bgcolor: et.toggleHoverBg,
            },
          }}
        >
          {isDarkMode ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>

      {/* 배경 블롭 */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: { xs: 300, md: 480 },
          height: { xs: 300, md: 480 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${et.red}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: et.blobOpacity,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${et.amber}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: et.blobOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* 그리드 도트 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${et.gridDot} 1px, transparent 1px)`,
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
          maxWidth: 500,
          width: '100%',
        }}
      >
        {/* 아이콘 */}
        <Box
          sx={{
            '@keyframes shake': {
              '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
              '20%': { transform: 'rotate(-9deg) scale(1.05)' },
              '40%': { transform: 'rotate(9deg) scale(1.05)' },
              '60%': { transform: 'rotate(-5deg) scale(1.02)' },
              '80%': { transform: 'rotate(5deg) scale(1.02)' },
            },
            animation: 'shake 3s ease-in-out infinite 0.6s',
            fontSize: '5rem',
            lineHeight: 1,
            mb: 3,
            filter: et.emojiFilter,
            userSelect: 'none',
          }}
        >
          ⚠️
        </Box>

        {/* 제목 */}
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            color: textPrimary,
            mb: 0.5,
            letterSpacing: '-0.02em',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          예기치 않은 오류가 발생했어요
        </Typography>

        {/* 구분선 */}
        <Box
          sx={{
            width: 40,
            height: 3,
            borderRadius: 2,
            background: et.dividerGradient,
            my: 2.5,
            opacity: 0.65,
          }}
        />

        <Typography
          variant="body2"
          sx={{ color: textSecondary, lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}
        >
          일시적인 문제일 수 있어요.
          <br />
          새로고침 후에도 반복된다면 관리자에게 문의해 주세요.
        </Typography>

        {/* 에러 메시지 박스 */}
        {error?.message && (
          <Box
            sx={{
              width: '100%',
              mb: 4,
              borderRadius: 2.5,
              overflow: 'hidden',
              border: `1px solid ${et.errorBoxBorder}`,
            }}
          >
            {/* 박스 헤더 */}
            <Box
              sx={{
                px: 2,
                py: 0.75,
                bgcolor: et.errorHeaderBg,
                borderBottom: `1px solid ${et.errorHeaderBorder}`,
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', opacity: 0.8 }} />
              <Typography
                variant="caption"
                sx={{
                  color: et.errorTextColor,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Error
              </Typography>
            </Box>
            {/* 에러 메시지 */}
            <Box sx={{ px: 2, py: 1.5, bgcolor: et.errorBodyBg }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  color: et.errorMonoColor,
                  wordBreak: 'break-all',
                  display: 'block',
                  textAlign: 'left',
                  lineHeight: 1.6,
                  fontSize: '0.78rem',
                }}
              >
                {error.message}
              </Typography>
            </Box>
          </Box>
        )}

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => (window.location.href = '/dashboard')}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 2.5,
              fontSize: '0.875rem',
              border: `1.5px solid ${et.outlinedBorder}`,
              color: et.outlinedColor,
              bgcolor: 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                border: `1.5px solid ${et.outlinedHoverBorder}`,
                bgcolor: et.outlinedHoverBg,
                transform: 'translateY(-1px)',
              },
            }}
          >
            홈으로 이동
          </Button>
          <Button
            variant="contained"
            onClick={onReload}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 700,
              borderRadius: 2.5,
              fontSize: '0.875rem',
              background: et.btnGradient,
              color: '#fff',
              boxShadow: et.btnShadow,
              transition: 'all 0.2s',
              '&:hover': {
                background: et.btnHoverGradient,
                boxShadow: et.btnHoverShadow,
                transform: 'translateY(-1px)',
              },
            }}
          >
            새로고침
          </Button>
        </Box>
      </Box>

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
        오류가 반복되면 관리자에게 문의하세요
      </Typography>
    </Box>
  )
}
