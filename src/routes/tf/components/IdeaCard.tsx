// src/routes/TF/components/IdeaCard.tsx
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Button, Chip, Typography } from '@mui/material'
import { Idea } from '../mocks/mercenaryData'

interface Props {
  idea: Idea
  onApply: (id: number) => void
  isDarkMode: boolean
}

export default function IdeaCard({ idea, onApply, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'
  const cardBg = isDarkMode ? 'rgba(22,30,46,0.95)' : '#ffffff'

  const isUrgent = idea.remainingDays <= 7

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: isDarkMode
            ? '0 20px 40px rgba(0,0,0,0.5), 0 8px 16px rgba(99,102,241,0.3)'
            : '0 20px 40px rgba(0,0,0,0.09), 0 8px 16px rgba(99,102,241,0.12)',
          borderColor: isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

      <Box
        sx={{
          flex: 1, display: 'flex', flexDirection: 'column',
          p: { xs: 2.5, md: 3 },
          gap: 2.5,
        }}
      >
        {/* 상단 - 분야 + 보상 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
          <Chip
            label={idea.field}
            size="small"
            sx={{
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
              color: isDarkMode ? '#a5b4fc' : '#4338ca',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.18)'}`,
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.01em',
            }}
          />

          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                background: isDarkMode
                  ? 'linear-gradient(90deg, #c4b5fd, #a78bfa)'
                  : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
                fontSize: '1.2rem',
              }}
            >
              +{idea.reward.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, justifyContent: 'flex-end', mt: 0.3 }}>
              <EmojiEventsIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.7rem' }}>
                마일리지
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 제목 */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            color: textPrimary,
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            letterSpacing: '-0.01em',
          }}
        >
          {idea.title}
        </Typography>

        {/* 설명 */}
        <Typography
          variant="body2"
          sx={{
            color: textSecondary,
            lineHeight: 1.65,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.85rem',
          }}
        >
          {idea.desc}
        </Typography>

        {/* 하단 */}
        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
            pt: 2,
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: '0.85rem !important' }} />}
            label={`${idea.remainingDays}일 남음`}
            size="small"
            sx={{
              bgcolor: isUrgent
                ? (isDarkMode ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.08)')
                : 'transparent',
              color: isUrgent ? (isDarkMode ? '#fbbf24' : '#92400e') : textSecondary,
              border: `1px solid ${isUrgent
                ? (isDarkMode ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.2)')
                : borderColor}`,
              fontWeight: isUrgent ? 700 : 500,
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />

          <Button
            variant="contained"
            size="small"
            onClick={() => onApply(idea.id)}
            sx={{
              borderRadius: 9999,
              px: 2.5,
              py: 0.85,
              fontWeight: 700,
              fontSize: '0.82rem',
              bgcolor: '#6366f1',
              color: '#fff',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            지원하기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
