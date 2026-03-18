// src/components/common/routing/ErrorFallback.tsx
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'

interface ErrorFallbackProps {
  error: Error | null
  onReload: () => void
}

export default function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { isDarkMode, toggleTheme } = useThemeMode()
  const { textPrimary, textSecondary, bgBase } = usePageColors()

  const red = isDarkMode ? '#ef4444' : '#dc2626'
  const amber = isDarkMode ? '#f97316' : '#ea580c'
  const blobOpacity = isDarkMode ? 0.16 : 0.1

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
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            '&:hover': {
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
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
          background: `radial-gradient(circle, ${red}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: blobOpacity,
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
          background: `radial-gradient(circle, ${amber}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: blobOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* 그리드 도트 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'rgba(148,163,184,0.07)' : 'rgba(100,116,139,0.1)'} 1px, transparent 1px)`,
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
            filter: isDarkMode
              ? 'drop-shadow(0 0 10px rgba(239,68,68,0.4))'
              : 'drop-shadow(0 4px 8px rgba(220,38,38,0.2))',
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
            background: isDarkMode
              ? 'linear-gradient(90deg, #ef4444, #f97316)'
              : 'linear-gradient(90deg, #dc2626, #ea580c)',
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
              border: `1px solid ${isDarkMode ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'}`,
            }}
          >
            {/* 박스 헤더 */}
            <Box
              sx={{
                px: 2,
                py: 0.75,
                bgcolor: isDarkMode ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)',
                borderBottom: `1px solid ${isDarkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', opacity: 0.8 }} />
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? '#fca5a5' : '#dc2626',
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
            <Box sx={{ px: 2, py: 1.5, bgcolor: isDarkMode ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.03)' }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  color: isDarkMode ? '#fca5a5' : '#b91c1c',
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
              border: `1.5px solid ${isDarkMode ? 'rgba(239,68,68,0.35)' : 'rgba(220,38,38,0.3)'}`,
              color: isDarkMode ? '#fca5a5' : '#dc2626',
              bgcolor: 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                border: `1.5px solid ${isDarkMode ? '#ef4444' : '#dc2626'}`,
                bgcolor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(220,38,38,0.06)',
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
              background: isDarkMode
                ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
              color: '#fff',
              boxShadow: isDarkMode
                ? '0 4px 14px rgba(239,68,68,0.4)'
                : '0 4px 14px rgba(220,38,38,0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                background: isDarkMode
                  ? 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)'
                  : 'linear-gradient(135deg, #b91c1c 0%, #c2410c 100%)',
                boxShadow: isDarkMode
                  ? '0 6px 20px rgba(239,68,68,0.55)'
                  : '0 6px 20px rgba(220,38,38,0.4)',
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
