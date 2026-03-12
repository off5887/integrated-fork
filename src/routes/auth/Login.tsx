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
import { getLoginErrorMessage, useLoginMutation } from '@/api/queries/useLoginMutation'
import { useThemeMode } from '@/context/ThemeContext'

// ─── 색상 토큰 ────────────────────────────────────────────────────────────────

function getColors(isDarkMode: boolean) {
  return {
    bg: isDarkMode
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    cardBg: isDarkMode ? 'rgba(30,41,59,0.78)' : 'rgba(255,255,255,0.94)',
    cardBorder: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
    cardShadow: isDarkMode ? '0 20px 60px rgba(0,0,0,0.55)' : '0 20px 60px rgba(0,0,0,0.1)',
    toggleBg: isDarkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.85)',
    toggleBorder: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    toggleHover: isDarkMode ? 'rgba(51,65,85,0.9)' : 'rgba(255,255,255,0.98)',
    logoGradient: isDarkMode
      ? 'linear-gradient(135deg, #60a5fa, #93c5fd)'
      : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    titleGradient: isDarkMode
      ? 'linear-gradient(90deg, #93c5fd, #60a5fa)'
      : 'linear-gradient(90deg, #2563eb, #3b82f6)',
    muted: isDarkMode ? '#94a3b8' : '#64748b',
    demoBg: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
    demoBorder: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
    demoAccent: isDarkMode ? '#a5b4fc' : '#4338ca',
    demoValue: isDarkMode ? '#e2e8f0' : '#1e293b',
    errorBg: isDarkMode ? 'rgba(127,29,29,0.45)' : '#fee2e2',
    errorText: isDarkMode ? '#fca5a5' : '#991b1b',
    errorBorder: isDarkMode ? 'rgba(248,113,113,0.35)' : '#fca5a5',
    inputBg: isDarkMode ? 'rgba(51,65,85,0.55)' : '#ffffff',
    inputText: isDarkMode ? '#f1f5f9' : '#0f172a',
    inputBorder: isDarkMode ? 'rgba(148,163,184,0.4)' : 'rgba(203,213,225,0.8)',
    inputAccent: isDarkMode ? '#38bdf8' : '#0ea5e9',
    btnBg: isDarkMode ? '#38bdf8' : '#0ea5e9',
    btnHover: isDarkMode ? '#0ea5e9' : '#0284c7',
    link: isDarkMode ? '#60a5fa' : '#2563eb',
    linkHover: isDarkMode ? '#93c5fd' : '#1d4ed8',
  }
}

type LoginColors = ReturnType<typeof getColors>

// ─── 데모 계정 ────────────────────────────────────────────────────────────────

const DEMO_CREDENTIALS = { id: 'demo', password: 'demo1234' } as const

// ─── LoginField ───────────────────────────────────────────────────────────────

interface LoginFieldProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  colors: LoginColors
}

function LoginField({ label, type = 'text', value, onChange, colors }: LoginFieldProps) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      required
      variant="outlined"
      autoComplete="off"
      slotProps={{
        input: {
          sx: {
            borderRadius: 3,
            bgcolor: colors.inputBg,
            color: colors.inputText,
            '& fieldset': { borderColor: colors.inputBorder },
            '&:hover fieldset': { borderColor: colors.inputAccent },
            '&.Mui-focused fieldset': { borderColor: colors.inputAccent, borderWidth: 2 },
          },
        },
        inputLabel: {
          sx: {
            color: colors.muted,
            '&.Mui-focused': { color: colors.inputAccent },
          },
        },
      }}
    />
  )
}

// ─── LoginLogo ────────────────────────────────────────────────────────────────

function LoginLogo({ colors }: { colors: LoginColors }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: 'auto',
          mb: 2,
          borderRadius: '20%',
          background: colors.logoGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 900, color: '#ffffff', letterSpacing: '-0.05em' }}
        >
          G
        </Typography>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          background: colors.titleGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Gomgom
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, color: colors.muted }}>
        Welcome back
      </Typography>
    </Box>
  )
}

// ─── DemoHint ─────────────────────────────────────────────────────────────────

function DemoHint({ colors }: { colors: LoginColors }) {
  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2.5,
        bgcolor: colors.demoBg,
        border: `1px solid ${colors.demoBorder}`,
      }}
    >
      <Typography
        sx={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: colors.demoAccent,
          mb: 0.75,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        데모 계정
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DemoField label="사번" value={DEMO_CREDENTIALS.id} colors={colors} />
        <DemoField label="비밀번호" value={DEMO_CREDENTIALS.password} colors={colors} />
      </Box>
    </Box>
  )
}

function DemoField({ label, value, colors }: { label: string; value: string; colors: LoginColors }) {
  return (
    <Box>
      <Typography sx={{ fontSize: '0.72rem', color: colors.muted }}>{label}</Typography>
      <Typography
        sx={{ fontSize: '0.85rem', fontWeight: 700, color: colors.demoValue, letterSpacing: '0.02em' }}
      >
        {value}
      </Typography>
    </Box>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────

export default function Login() {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { isDarkMode, toggleTheme } = useThemeMode()
  const colors = getColors(isDarkMode)
  const mutation = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    if (employeeId === DEMO_CREDENTIALS.id && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem('accessToken', 'demo-token')
      navigate('/welcome')
      return
    }

    try {
      const data = await mutation.mutateAsync({ employeeId, password })
      localStorage.setItem('accessToken', data.token)
      navigate('/welcome')
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
        background: colors.bg,
        transition: 'background 0.5s ease',
      }}
    >
      {/* 다크모드 토글 */}
      <IconButton
        onClick={toggleTheme}
        size="medium"
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: colors.toggleBg,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${colors.toggleBorder}`,
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: colors.toggleHover,
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

      {/* 로그인 카드 */}
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          border: `1px solid ${colors.cardBorder}`,
          bgcolor: colors.cardBg,
          backdropFilter: 'blur(16px)',
          boxShadow: colors.cardShadow,
          overflow: 'hidden',
          transition: 'all 0.4s ease',
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 }, pt: 8, pb: 6 }}>
          <LoginLogo colors={colors} />

          <DemoHint colors={colors} />

          {errorMsg && (
            <Box
              sx={{
                mb: 4,
                p: 2.5,
                borderRadius: 3,
                bgcolor: colors.errorBg,
                color: colors.errorText,
                textAlign: 'center',
                fontSize: '0.9rem',
                border: `1px solid ${colors.errorBorder}`,
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
            <LoginField
              label="사번 (Employee ID)"
              value={employeeId}
              onChange={setEmployeeId}
              colors={colors}
            />
            <LoginField
              label="비밀번호"
              type="password"
              value={password}
              onChange={setPassword}
              colors={colors}
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
                bgcolor: colors.btnBg,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: colors.btnHover,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
                },
              }}
            >
              {mutation.isPending ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1.5 }} />
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
                color: colors.link,
                '&:hover': { color: colors.linkHover },
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
