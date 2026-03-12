// src/routes/TF/MercenarySupportPage.tsx
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import TFIdeaCard from './components/TFIdeaCard'
import { mockIdeas } from '@/api/mock/mercenary'

const FISH_COUNT = 12480

export default function MercenarySupportPage() {
  const [ideas] = useState(mockIdeas)
  const { isDarkMode } = useThemeMode()

  const handleApply = (id: number) => {
    alert(`아이디어 #${id}에 용병 지원 완료되었습니다!`)
  }

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0a0f1e' : '#f1f5f9',
        pt: { xs: 9, md: 10 },
        pb: 14,
        px: { xs: 2, sm: 3, md: 4 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* 페이지 헤더 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            mb: { xs: 5, md: 6 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48, height: 48, borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(99,102,241,0.38)',
                flexShrink: 0,
              }}
            >
              <GroupsIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                용병 지원 모집중
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary }}>
                함께 아이디어를 실행하고 마일리지를 모아보세요
              </Typography>
            </Box>
          </Box>

          {/* 마일리지 뱃지 */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 2.5, py: 1.25,
              borderRadius: 2.5,
              bgcolor: isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff',
              border: `1px solid ${borderColor}`,
              boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <Box
              sx={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <MonetizationOnIcon sx={{ color: '#fff', fontSize: '1rem' }} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={800} sx={{ color: textPrimary, lineHeight: 1.1 }}>
                {FISH_COUNT.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: textSecondary, display: 'block', lineHeight: 1.2 }}>
                보유 마일리지
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 통계 칩 */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap' }}>
          <Chip
            icon={<EmojiEventsIcon sx={{ fontSize: '0.9rem !important' }} />}
            label={`${ideas.length}개 프로젝트 모집중`}
            size="small"
            sx={{
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
              color: isDarkMode ? '#a5b4fc' : '#4338ca',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
              fontWeight: 600,
              fontSize: '0.78rem',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
          <Chip
            label="마감 임박 포함"
            size="small"
            sx={{
              bgcolor: isDarkMode ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.07)',
              color: isDarkMode ? '#fbbf24' : '#92400e',
              border: `1px solid ${isDarkMode ? 'rgba(245,158,11,0.25)' : 'rgba(245,158,11,0.18)'}`,
              fontWeight: 600,
              fontSize: '0.78rem',
            }}
          />
        </Box>

        {/* 카드 그리드 */}
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {ideas.map((idea) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={idea.id}>
              <TFIdeaCard idea={idea} onApply={handleApply} isDarkMode={isDarkMode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
