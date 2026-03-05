// src/pages/Dashboard/components/MyGomgomiCard.tsx
import { alpha, Box, LinearProgress, Typography, useTheme } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

type Props = {
  fishTotal: number
  fishToNextLevel: number
}

export default function MyGomgomiCard({ fishTotal, fishToNextLevel }: Props) {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const progress = Math.min(100, (fishTotal / fishToNextLevel) * 100)
  const remaining = fishToNextLevel - fishTotal

  // 현대적 감각의 색상 팔레트 (2026 트렌드 반영: 선명한 색상)
  const accentColor = isDarkMode ? '#38bdf8' : '#0ea5e9' // 청량한 블루
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const progressBg = isDarkMode ? alpha('#475569', 0.25) : alpha('#e2e8f0', 0.6)
  const progressColor = isDarkMode ? '#3b82f6' : '#2563eb' // 더 선명한 파랑

  return (
    <Box
      role="region"
      aria-label="나의 곰곰이 프로필 및 진행도"
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.12) 50%, rgba(34,197,94,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(16,185,129,0.06) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1.5px solid ${isDarkMode ? 'rgba(96,165,250,0.25)' : 'rgba(59,130,246,0.2)'}`,
        boxShadow: isDarkMode
          ? '0 20px 40px -8px rgba(96,165,250,0.15)'
          : '0 20px 40px -8px rgba(59,130,246,0.1)',
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* 헤더 섹션 */}
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              background: `linear-gradient(90deg, ${accentColor}, ${isDarkMode ? '#10b981' : '#06b6d4'})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            나의 곰곰이
          </Typography>
          <Box
            sx={{
              height: 3,
              background: `linear-gradient(90deg, ${accentColor}, ${isDarkMode ? '#10b981' : '#06b6d4'})`,
              borderRadius: '999px',
              width: 60,
            }}
          />
        </Box>

        {/* 프로필 섹션 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2.5,
            mb: 3,
            pb: 3,
            borderBottom: `1px solid ${isDarkMode ? 'rgba(148,163,184,0.2)' : 'rgba(203,213,225,0.3)'}`,
          }}
        >
          {/* 곰곰이 이미지 */}
          <Box
            sx={{
              position: 'relative',
              width: 110,
              height: 110,
              minWidth: 110,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: isDarkMode
                ? '0 20px 48px -12px rgba(96,165,250,0.4)'
                : '0 20px 48px -12px rgba(14,165,233,0.3)',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(34,197,94,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(34,197,94,0.08) 100%)',
              border: `2px solid ${isDarkMode ? 'rgba(96,165,250,0.3)' : 'rgba(59,130,246,0.2)'}`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.08) translateY(-4px)',
                boxShadow: isDarkMode
                  ? '0 24px 56px -8px rgba(96,165,250,0.5)'
                  : '0 24px 56px -8px rgba(14,165,233,0.4)',
              },
            }}
          >
            <img
              src="/tarot/god_bear.png"
              alt="나의 곰곰이"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
          </Box>

          {/* 레벨 정보 */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: accentColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                }}
              >
                현재 레벨
              </Typography>
              <Typography
                sx={{
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  background: `linear-gradient(90deg, ${accentColor}, ${isDarkMode ? '#10b981' : '#06b6d4'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Lv.12
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: textSecondary,
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                등급
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: textPrimary,
                  fontSize: '1.1rem',
                }}
              >
                아기 곰곰이
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 생선 정보 섹션 */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 1.5,
              }}
            >
              보유 생선
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
              <Typography
                sx={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: textPrimary,
                  letterSpacing: '-0.02em',
                }}
              >
                {fishTotal.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: textSecondary,
                }}
              >
                마리
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: accentColor,
              fontWeight: 600,
              display: 'block',
            }}
          >
            💰 현금 환산: ≈ {(fishTotal * 100).toLocaleString()} 원
          </Typography>
        </Box>

        {/* 프로그레스 섹션 */}
        <Box>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              다음 레벨까지
            </Typography>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: accentColor,
                background: isDarkMode
                  ? 'rgba(96,165,250,0.15)'
                  : 'rgba(59,130,246,0.12)',
                px: 2,
                py: 0.75,
                borderRadius: '999px',
              }}
            >
              {progress.toFixed(0)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: '999px',
              backgroundColor: progressBg,
              overflow: 'hidden',
              mb: 1.5,
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${progressColor}, ${accentColor})`,
                borderRadius: '999px',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: textSecondary,
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {remaining.toLocaleString()} 마리 남음
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
