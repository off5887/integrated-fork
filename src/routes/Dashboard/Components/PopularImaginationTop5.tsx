// src/pages/Dashboard/components/PopularImaginationTop5.tsx
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '../../../context/ThemeContext'

const ITEMS = [
  { title: '사내 카페 메뉴 다양화', likes: 142 },
  { title: '원격 근무 시간 유연화', likes: 98 },
  { title: '재택근무 복지 확대', likes: 87 },
  { title: '회의 문화 개선', likes: 76 },
  { title: '사내 도서관 디지털화', likes: 65 },
]

const RANK_COLORS = ['#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b']

export default function PopularImaginationTop5() {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const dividerColor = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'

  return (
    <Box
      role="region"
      aria-label="인기 상상 TOP 5 목록"
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* 헤더 스트립 */}
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(90deg, #6366f1, #3b82f6, #06b6d4)',
          borderRadius: '4px 4px 0 0',
          mx: -2,
          mt: -2,
          mb: 2.5,
        }}
      />

      {/* 타이틀 */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ color: textPrimary, letterSpacing: '-0.02em', mb: 0.5 }}
      >
        인기 상상 TOP 5
      </Typography>
      <Typography variant="caption" sx={{ color: textSecondary, mb: 2, display: 'block' }}>
        가장 많은 공감을 얻은 아이디어들입니다
      </Typography>

      {/* 리스트 - overflow 없이 자연스럽게 */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {ITEMS.map((item, i) => (
          <Box
            key={i}
            tabIndex={0}
            role="listitem"
            aria-label={`${i + 1}위: ${item.title} - 공감 ${item.likes}건`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              borderBottom: i < ITEMS.length - 1 ? `1px solid ${dividerColor}` : 'none',
              borderRadius: 1.5,
              px: 1,
              cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(148,163,184,0.06)' : 'rgba(241,245,249,0.8)',
                transform: 'translateX(4px)',
              },
              '&:focus': {
                outline: 'none',
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
              },
            }}
          >
            {/* 랭킹 번호 */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: `${RANK_COLORS[i]}20`,
                border: `1px solid ${RANK_COLORS[i]}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: RANK_COLORS[i],
                flexShrink: 0,
              }}
            >
              {i + 1}
            </Box>

            {/* 제목 */}
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                flex: 1,
                color: textPrimary,
                lineHeight: 1.4,
                minWidth: 0,
              }}
              noWrap
            >
              {item.title}
            </Typography>

            {/* 공감 수 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                flexShrink: 0,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: textPrimary, fontSize: '0.9rem' }}
              >
                {item.likes}
              </Typography>
              <Typography sx={{ color: '#ef4444', fontSize: '0.85rem', lineHeight: 1 }}>
                ♥
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
