// src/routes/idea/components/SimilarIdeaResultCard.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { Avatar, Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { CATEGORY_CONFIG } from '@/api/mock/ideaBrowse'
import type { CategoryConfig, IdeaItem } from '@/api/types/ideaBrowse'
import { getIdeaTheme, IDEA_STATUS_CONFIG } from '@/theme/ideaTheme'

function getCatConfig(id: string): CategoryConfig {
  return (
    CATEGORY_CONFIG.find((c) => c.id === id) ??
    CATEGORY_CONFIG[CATEGORY_CONFIG.length - 1]
  )
}

function fmtDate(s: string) {
  return s.replace(/-/g, '.').slice(2) // "26.02.20"
}

interface ResultCardProps {
  idea: IdeaItem
  score: number
  onClick: () => void
}

export default function SimilarIdeaResultCard({ idea, score, onClick }: ResultCardProps) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)
  const cat = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]
  const isHighSimilarity = score >= 4

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      sx={{
        p: 1.75,
        borderRadius: 2,
        cursor: 'pointer',
        outline: 'none',
        border: `1px solid ${
          isHighSimilarity
            ? isDarkMode
              ? 'rgba(245,158,11,0.3)'
              : 'rgba(245,158,11,0.25)'
            : borderColor
        }`,
        bgcolor: isHighSimilarity
          ? isDarkMode
            ? 'rgba(245,158,11,0.05)'
            : 'rgba(245,158,11,0.03)'
          : isDarkMode
            ? 'rgba(30,41,59,0.5)'
            : 'rgba(248,250,252,0.7)',
        transition: 'all 0.15s ease',
        '&:hover': {
          borderColor: isHighSimilarity
            ? 'rgba(245,158,11,0.5)'
            : 'rgba(99,102,241,0.3)',
          bgcolor: isHighSimilarity
            ? isDarkMode
              ? 'rgba(245,158,11,0.08)'
              : 'rgba(245,158,11,0.06)'
            : isDarkMode
              ? 'rgba(99,102,241,0.06)'
              : 'rgba(99,102,241,0.04)',
        },
        '&:focus-visible': { outline: '2px solid #6366f1', outlineOffset: 2 },
      }}
    >
      {/* 뱃지 행 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          mb: 1,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.4,
            px: 0.8,
            py: 0.25,
            borderRadius: 1,
            bgcolor: cat.bg,
            border: `1px solid ${cat.border}`,
          }}
        >
          <Box component="span" sx={{ fontSize: '0.7rem' }}>
            {cat.emoji}
          </Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: cat.color,
              lineHeight: 1,
            }}
          >
            {idea.category}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 0.8,
            py: 0.25,
            borderRadius: 1,
            bgcolor: stat.bg,
            border: `1px solid ${stat.border}`,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: stat.color,
              lineHeight: 1,
            }}
          >
            {idea.status}
          </Typography>
        </Box>
        {isHighSimilarity && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 0.8,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#f59e0b',
                lineHeight: 1,
              }}
            >
              ⚠ 유사도 높음
            </Typography>
          </Box>
        )}
        <Typography
          sx={{
            fontSize: '0.68rem',
            color: textSecondary,
            ml: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {idea.department}
        </Typography>
      </Box>

      {/* 제목 */}
      <Typography
        sx={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: textPrimary,
          lineHeight: 1.4,
          mb: 0.6,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {idea.title}
      </Typography>

      {/* 문제점 요약 */}
      <Typography
        sx={{
          fontSize: '0.78rem',
          color: textSecondary,
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 1.25,
        }}
      >
        {idea.problem}
      </Typography>

      {/* 메타 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Avatar
            sx={{
              width: 18,
              height: 18,
              fontSize: '0.6rem',
              fontWeight: 700,
              bgcolor: '#6366f1',
            }}
          >
            {idea.author[0]}
          </Avatar>
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
            {idea.author}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <ThumbUpOutlinedIcon
            sx={{ fontSize: '0.7rem', color: textSecondary }}
          />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
            {idea.likes}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <ChatBubbleOutlineIcon
            sx={{ fontSize: '0.7rem', color: textSecondary }}
          />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
            {idea.comments}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 0.3, ml: 'auto' }}
        >
          <CalendarTodayIcon
            sx={{ fontSize: '0.68rem', color: textSecondary }}
          />
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
            {fmtDate(idea.submittedAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
