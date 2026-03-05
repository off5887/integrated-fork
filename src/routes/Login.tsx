import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getLoginErrorMessage,
  useLoginMutation,
} from '../api/queries/useLoginMutation'

export default function Login() {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  const mutation = useLoginMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDarkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    try {
      const data = await mutation.mutateAsync({ employeeId, password })
      localStorage.setItem('accessToken', data.token)
      navigate('/welcome')
    } catch (err: unknown) {
      setErrorMsg(getLoginErrorMessage(err))
    }
  }

  // 다크 모드에서만 사용할 심플 neon 색상
  const neon = isDarkMode ? '#22d3ee' : 'inherit'
  const neonSoft = isDarkMode ? 'rgba(34, 211, 238, 0.7)' : 'transparent'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        m: 0,
        p: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',

        // 배경 - 라이트: 원래 스타일 유지 / 다크: 아주 은은한 HUD 느낌
        bgcolor: isDarkMode ? '#0b111f' : '#f8fafc',
        background: isDarkMode
          ? 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 60%), linear-gradient(135deg, #0b111f 0%, #111827 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',

        // 아주 미세한 scanline (다크모드에서만)
        ...(isDarkMode && {
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.018) 2px, rgba(34,211,238,0.018) 4px)',
            pointerEvents: 'none',
            animation: 'scanline 18s linear infinite',
            opacity: 0.4,
          },
        }),
        '@keyframes scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },

        transition: 'background 0.6s ease',
      }}
    >
      {/* 다크모드 토글 */}
      <IconButton
        onClick={() => setIsDarkMode(!isDarkMode)}
        size="medium"
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: isDarkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDarkMode ? 'rgba(34,211,238,0.3)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '50%',
          color: isDarkMode ? neon : '#64748b',
          boxShadow: isDarkMode
            ? `0 0 16px ${neonSoft}`
            : '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',

          '&:hover': {
            bgcolor: isDarkMode
              ? 'rgba(30,41,59,0.9)'
              : 'rgba(255,255,255,0.98)',
            boxShadow: isDarkMode
              ? `0 0 24px ${neonSoft}`
              : '0 8px 30px rgba(0,0,0,0.15)',
            transform: 'scale(1.08)',
          },
        }}
      >
        {isDarkMode ? (
          <LightModeOutlined sx={{ color: neon }} />
        ) : (
          <DarkModeOutlined />
        )}
      </IconButton>

      {/* 중앙 카드 */}
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          border: isDarkMode
            ? `1px solid rgba(34,211,238,0.7)`
            : `1px solid rgba(0,0,0,0.07)`,
          bgcolor: isDarkMode
            ? 'rgba(15,23,42,0.52)'
            : 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(16px)',
          boxShadow: isDarkMode
            ? `0 16px 50px rgba(0,0,0,0.6), 0 0 5px ${neonSoft}`
            : '0 20px 60px rgba(0,0,0,0.1)',
          transition: 'all 0.4s ease',
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 }, pt: 8, pb: 6 }}>
          {/* 로고 영역 */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                borderRadius: '20%',
                background: isDarkMode
                  ? `linear-gradient(135deg, ${neon}, #0891b2)`
                  : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDarkMode
                  ? `0 0 24px ${neonSoft}`
                  : '0 8px 24px rgba(59,130,246,0.3)',
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.05em',
                  textShadow: isDarkMode ? `0 0 8px ${neon}` : 'none',
                }}
              >
                G
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                background: isDarkMode
                  ? `linear-gradient(90deg, ${neon}, #60a5fa)`
                  : 'linear-gradient(90deg, #2563eb, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Gomgom
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: isDarkMode ? '#94a3b8' : '#64748b',
              }}
            >
              {isDarkMode ? 'HOLO-NET ACCESS' : 'Welcome back'}
            </Typography>
          </Box>

          {/* 에러 */}
          {errorMsg && (
            <Box
              sx={{
                mb: 4,
                p: 2.5,
                borderRadius: 3,
                bgcolor: isDarkMode ? 'rgba(127,29,29,0.35)' : '#fee2e2',
                color: isDarkMode ? '#fca5a5' : '#991b1b',
                textAlign: 'center',
                fontSize: '0.9rem',
                border: `1px solid ${isDarkMode ? 'rgba(248,113,113,0.3)' : '#fca5a5'}`,
              }}
            >
              {errorMsg}
            </Box>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}
          >
            <TextField
              label="사번 (Employee ID)"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              fullWidth
              required
              variant="outlined"
              autoComplete="off"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  bgcolor: isDarkMode ? 'rgba(30,41,59,0.45)' : '#ffffff',
                  color: isDarkMode ? '#f1f5f9' : '#0f172a',
                  '& fieldset': {
                    borderColor: isDarkMode
                      ? 'rgba(34,211,238,0.35)'
                      : 'rgba(203,213,225,0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? neon : '#0ea5e9',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDarkMode ? neon : '#0ea5e9',
                    borderWidth: 2,
                    boxShadow: isDarkMode ? `0 0 12px ${neonSoft}` : 'none',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: isDarkMode ? '#94a3b8' : '#475569',
                  '&.Mui-focused': {
                    color: isDarkMode ? neon : '#0ea5e9',
                  },
                },
              }}
            />

            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
              autoComplete="off"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  bgcolor: isDarkMode ? 'rgba(30,41,59,0.45)' : '#ffffff',
                  color: isDarkMode ? '#f1f5f9' : '#0f172a',
                  '& fieldset': {
                    borderColor: isDarkMode
                      ? 'rgba(34,211,238,0.35)'
                      : 'rgba(203,213,225,0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? neon : '#0ea5e9',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDarkMode ? neon : '#0ea5e9',
                    borderWidth: 2,
                    boxShadow: isDarkMode ? `0 0 12px ${neonSoft}` : 'none',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: isDarkMode ? '#94a3b8' : '#475569',
                  '&.Mui-focused': {
                    color: isDarkMode ? neon : '#0ea5e9',
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={mutation.isPending}
              sx={{
                py: 1.8,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.05rem',
                bgcolor: isDarkMode ? 'transparent' : '#0ea5e9',
                color: isDarkMode ? neon : '#ffffff',
                border: isDarkMode ? `1.5px solid ${neon}` : 'none',
                boxShadow: isDarkMode ? `0 0 5px ${neonSoft}` : 'none',
                '&:hover': {
                  bgcolor: isDarkMode ? `${neon}1a` : '#0284c7',
                  boxShadow: isDarkMode
                    ? `0 0 28px ${neonSoft}`
                    : '0 10px 30px rgba(59,130,246,0.35)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {mutation.isPending ? (
                <>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ mr: 1.5 }}
                  />
                  {isDarkMode ? 'AUTHORIZING...' : '로그인 중...'}
                </>
              ) : isDarkMode ? (
                'ACCESS'
              ) : (
                '로그인'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isDarkMode ? neon : '#2563eb',
                '&:hover': {
                  color: isDarkMode ? '#ffffff' : '#1d4ed8',
                },
              }}
            >
              {isDarkMode ? 'FORGOT CODE?' : '비밀번호를 잊으셨나요?'}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
