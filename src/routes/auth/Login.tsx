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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getLoginErrorMessage,
  useLoginMutation,
} from '../../api/queries/useLoginMutation'
import { useThemeMode } from '../../context/ThemeContext'

export default function Login() {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { isDarkMode, toggleTheme } = useThemeMode()

  const mutation = useLoginMutation()
  const navigate = useNavigate()

  // 데모용 우회 계정
  const DEMO_ID = 'demo'
  const DEMO_PW = 'demo1234'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // 데모 계정 우회 로그인 (서버 통신 없음)
    if (employeeId === DEMO_ID && password === DEMO_PW) {
      localStorage.setItem('accessToken', 'demo-token')
      navigate('/welcome')
      return
    }

    try {
      const data = await mutation.mutateAsync({ employeeId, password })
      localStorage.setItem('accessToken', data.token)
      console.log('로그인 성공, 토큰 저장됨:', data.token)
      navigate('/welcome')
      console.log('navigate 호출 완료!')
    } catch (err: unknown) {
      setErrorMsg(getLoginErrorMessage(err))
    }
  }

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

        // ── 배경 ────────────────────────────────
        bgcolor: isDarkMode ? '#0f172a' : '#f8fafc',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',

        transition: 'background 0.5s ease',
      }}
    >
      {/* 다크모드 토글 버튼 */}
      <IconButton
        onClick={toggleTheme}
        size="medium"
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: isDarkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',

          '&:hover': {
            bgcolor: isDarkMode
              ? 'rgba(51,65,85,0.9)'
              : 'rgba(255,255,255,0.98)',
            transform: 'scale(1.1)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          },
        }}
      >
        {isDarkMode ? (
          <LightModeOutlined sx={{ color: '#fbbf24' }} />
        ) : (
          <DarkModeOutlined sx={{ color: '#64748b' }} />
        )}
      </IconButton>

      {/* 중앙 로그인 카드 */}
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}`,
          bgcolor: isDarkMode
            ? 'rgba(30,41,59,0.78)'
            : 'rgba(255,255,255,0.94)',

          backdropFilter: 'blur(16px)',
          boxShadow: isDarkMode
            ? '0 20px 60px rgba(0,0,0,0.55)'
            : '0 20px 60px rgba(0,0,0,0.1)',

          overflow: 'hidden',
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
                  ? 'linear-gradient(135deg, #60a5fa, #93c5fd)'
                  : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.05em',
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
                  ? 'linear-gradient(90deg, #93c5fd, #60a5fa)'
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
              Welcome back
            </Typography>
          </Box>

          {/* 데모 계정 안내 */}
          <Box
            sx={{
              mb: 4,
              p: 2,
              borderRadius: 2.5,
              bgcolor: isDarkMode
                ? 'rgba(99,102,241,0.1)'
                : 'rgba(99,102,241,0.06)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                mb: 0.75,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              데모 계정
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                  }}
                >
                  사번
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: isDarkMode ? '#e2e8f0' : '#1e293b',
                    letterSpacing: '0.02em',
                  }}
                >
                  demo
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                  }}
                >
                  비밀번호
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: isDarkMode ? '#e2e8f0' : '#1e293b',
                    letterSpacing: '0.02em',
                  }}
                >
                  demo1234
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 에러 메시지 */}
          {errorMsg && (
            <Box
              sx={{
                mb: 4,
                p: 2.5,
                borderRadius: 3,
                bgcolor: isDarkMode ? 'rgba(127,29,29,0.45)' : '#fee2e2',
                color: isDarkMode ? '#fca5a5' : '#991b1b',
                textAlign: 'center',
                fontSize: '0.9rem',
                border: `1px solid ${isDarkMode ? 'rgba(248,113,113,0.35)' : '#fca5a5'}`,
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
                  bgcolor: isDarkMode ? 'rgba(51,65,85,0.55)' : '#ffffff',
                  color: isDarkMode ? '#f1f5f9' : '#0f172a',

                  '& fieldset': {
                    borderColor: isDarkMode
                      ? 'rgba(148,163,184,0.4)'
                      : 'rgba(203,213,225,0.8)',
                  },

                  '&:hover fieldset': {
                    borderColor: isDarkMode ? '#38bdf8' : '#0ea5e9',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: isDarkMode ? '#38bdf8' : '#0ea5e9',
                    borderWidth: 2,
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: isDarkMode ? '#94a3b8' : '#475569',
                  '&.Mui-focused': {
                    color: isDarkMode ? '#38bdf8' : '#0ea5e9',
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
                  bgcolor: isDarkMode ? 'rgba(51,65,85,0.55)' : '#ffffff',
                  color: isDarkMode ? '#f1f5f9' : '#0f172a',
                  '& fieldset': {
                    borderColor: isDarkMode
                      ? 'rgba(148,163,184,0.4)'
                      : 'rgba(203,213,225,0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? '#38bdf8' : '#0ea5e9',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDarkMode ? '#38bdf8' : '#0ea5e9',
                    borderWidth: 2,
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: isDarkMode ? '#94a3b8' : '#475569',
                  '&.Mui-focused': {
                    color: isDarkMode ? '#38bdf8' : '#0ea5e9',
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
                bgcolor: isDarkMode ? '#38bdf8' : '#0ea5e9',
                '&:hover': {
                  bgcolor: isDarkMode ? '#0ea5e9' : '#0284c7',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
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
                  로그인 중...
                </>
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
                color: isDarkMode ? '#60a5fa' : '#2563eb',
                '&:hover': {
                  color: isDarkMode ? '#93c5fd' : '#1d4ed8',
                },
              }}
            >
              비밀번호를 잊으셨나요?
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
