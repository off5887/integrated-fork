// src/pages/Dashboard/components/PopularImaginationTop5.tsx
import { alpha, Box, Typography, useTheme } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

export default function PopularImaginationTop5() {
  const theme = useTheme()
  const { isDarkMode } = useThemeMode()

  const items = [
    { title: '사내 카페 메뉴 다양화', likes: 142 },
    { title: '원격 근무 시간 유연화', likes: 98 },
    { title: '재택근무 복지 확대', likes: 87 },
    { title: '회의 문화 개선', likes: 76 },
    { title: '사내 도서관 디지털화', likes: 65 },
  ]

  // 현대적 색상 팔레트 (GomEvolutionSection과 통일감 있게)
  const accentColor = isDarkMode ? '#38bdf8' : '#0ea5e9'
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const dividerColor = isDarkMode
    ? alpha('#475569', 0.25)
    : alpha('#e2e8f0', 0.6)
  // 하트 색상 개선
  const heartColor = '#ef4444'

  return (
    <Box
      role="region"
      aria-label="인기 상상 TOP 5 목록"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.5, md: 3 },
      }}
    >
      {/* 타이틀 */}
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{
          mb: 3,
          background: `linear-gradient(90deg, ${accentColor}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        인기 상상 TOP 5
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: textSecondary, mb: 3, display: 'block' }}
      >
        가장 많은 공감을 얻은 아이디어들입니다
      </Typography>

      {/* 리스트 컨테이너 */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {items.map((item, i) => (
          <Box
            key={i}
            tabIndex={0}
            role="listitem"
            aria-label={`${i + 1}위: ${item.title} - 공감 ${item.likes}건`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: { xs: 1.8, sm: 2.2 },
              px: { xs: 2, sm: 2.5 },
              borderRadius: 2.5,
              borderBottom:
                i < items.length - 1 ? `1px solid ${dividerColor}` : 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover, &:focus': {
                bgcolor: isDarkMode
                  ? alpha('#475569', 0.15)
                  : alpha('#e2e8f0', 0.4),
                transform: 'translateX(8px)',
              },
              '&:focus': {
                outline: 'none',
                boxShadow: `inset 0 0 0 2px ${accentColor}`,
              },
            }}
          >
            {/* 랭킹 번호 */}
            <Box
              className="rank-number"
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: '50%',
                background: isDarkMode
                  ? alpha('#475569', 0.4)
                  : alpha('#e2e8f0', 0.7),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.15rem',
                color: textPrimary,
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {i + 1}
            </Box>

            {/* 제목 */}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                flex: 1,
                ml: 3,
                color: textPrimary,
                fontSize: { xs: '1rem', sm: '1.05rem' },
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </Typography>

            {/* 공감 수 */}
            <Box
              className="likes-count"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                minWidth: 90,
                textAlign: 'right',
                color: textSecondary,
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'color 0.3s ease',
              }}
            >
              <Typography component="span" fontWeight={700}>
                {item.likes}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: heartColor,
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                ♥
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
