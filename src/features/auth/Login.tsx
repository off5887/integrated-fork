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
import { getLoginColors, type LoginColors } from '@/theme/loginTheme'
import { DEMO_ACCOUNTS } from '@/api/mock/auth'

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

const ROLE_COLOR: Record<string, string> = {
  user:     '#3b82f6',
  reviewer: '#8b5cf6',
  admin:    '#10b981',
}

interface DemoHintProps {
  colors: LoginColors
  onSelect: (id: string, password: string) => void
}

function DemoHint({ colors, onSelect }: DemoHintProps) {
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
          mb: 1.25,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        데모 계정 (클릭하면 자동 입력)
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {DEMO_ACCOUNTS.map((account) => (
          <Box
            key={account.id}
            onClick={() => onSelect(account.id, account.password)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(account.id, account.password) } }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.5,
              py: 1,
              borderRadius: 1.5,
              cursor: 'pointer',
              border: `1px solid transparent`,
              transition: 'all 0.15s',
              '&:hover': {
                bgcolor: `${ROLE_COLOR[account.profile.role]}18`,
                borderColor: `${ROLE_COLOR[account.profile.role]}40`,
              },
              '&:focus-visible': { outline: `2px solid ${ROLE_COLOR[account.profile.role]}` },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8, height: 8, borderRadius: '50%',
                  bgcolor: ROLE_COLOR[account.profile.role],
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: colors.demoValue, lineHeight: 1.2 }}>
                  {account.roleLabel}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: colors.muted }}>
                  {account.description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: colors.demoValue, fontFamily: 'monospace' }}>
                {account.id}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: colors.muted, fontFamily: 'monospace' }}>
                {account.password}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────

export default function Login() {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { isDarkMode, toggleTheme } = useThemeMode()
  const colors = getLoginColors(isDarkMode)
  const mutation = useLoginMutation()
  const navigate = useNavigate()

  const loginWithDemo = (id: string, pw: string) => {
    const account = DEMO_ACCOUNTS.find((a) => a.id === id && a.password === pw)
    if (!account) return false
    localStorage.setItem('accessToken', `demo-token-${account.profile.role}`)
    localStorage.setItem('userProfile', JSON.stringify(account.profile))
    navigate('/dashboard')
    return true
  }

  const handleDemoSelect = (id: string, pw: string) => {
    setEmployeeId(id)
    setPassword(pw)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    if (loginWithDemo(employeeId, password)) return

    try {
      const data = await mutation.mutateAsync({ employeeId, password })
      localStorage.setItem('accessToken', data.token)
      localStorage.setItem('userProfile', JSON.stringify({
        employeeId: data.employeeId,
        name: data.name,
        position: (data.position as string) ?? '',
        department: (data.department as string) ?? '',
        role: (data.role as string) ?? 'user',
      }))
      navigate('/dashboard')
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
          <LightModeOutlined sx={{ color: colors.toggleIconColor }} />
        ) : (
          <DarkModeOutlined sx={{ color: colors.toggleIconColor }} />
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

          <DemoHint colors={colors} onSelect={handleDemoSelect} />

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
