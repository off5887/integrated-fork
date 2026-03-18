// src/features/idea/components/modals/SimilarIdeaDetailPanel.tsx
// 유사 아이디어 검색 모달 내 선택된 아이디어의 상세 내용을 표시하는 패널
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Avatar, Box, Divider, Typography } from '@mui/material'
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

interface DetailPanelProps {
  idea: IdeaItem
  onBack: () => void
}

export default function SimilarIdeaDetailPanel({ idea, onBack }: DetailPanelProps) {
  const { isDarkMode } = useThemeMode()
  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor } = it
  const cat = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* 뒤로 */}
      <Box
        onClick={onBack}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onBack()
        }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.6,
          cursor: 'pointer',
          color: it.accent.textMuted,
          fontSize: '0.82rem',
          fontWeight: 600,
          width: 'fit-content',
          outline: 'none',
          '&:hover': { opacity: 0.75 },
          '&:focus-visible': { outline: `2px solid ${it.accent.color}`, outlineOffset: 2 },
        }}
      >
        ← 목록으로
      </Box>

      {/* 뱃지 */}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.35,
            borderRadius: 1.5,
            bgcolor: cat.bg,
            border: `1px solid ${cat.border}`,
          }}
        >
          <Box component="span" sx={{ fontSize: '0.8rem' }}>{cat.emoji}</Box>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color }}>
            {idea.category}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1,
            py: 0.35,
            borderRadius: 1.5,
            bgcolor: stat.bg,
            border: `1px solid ${stat.border}`,
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color }}>
            {idea.status}
          </Typography>
        </Box>
      </Box>

      {/* 제목 */}
      <Typography
        sx={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: textPrimary,
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
        }}
      >
        {idea.title}
      </Typography>

      {/* 작성자 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Avatar
          sx={{
            width: 32, height: 32,
            bgcolor: it.accent.color,
            fontSize: '0.8rem', fontWeight: 700,
          }}
        >
          {idea.author[0]}
        </Avatar>
        <Box>
          <Typography
            sx={{ fontSize: '0.85rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}
          >
            {idea.author}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
            {idea.division} · {idea.department}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: '0.78rem', color: textSecondary }} />
          <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>
            {idea.submittedAt}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 문제점 */}
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem', fontWeight: 700, color: textSecondary, mb: 0.75,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}
        >
          문제점 도출
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>
          {idea.problem}
        </Typography>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 해결 대안 */}
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem', fontWeight: 700, color: textSecondary, mb: 0.75,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}
        >
          해결 대안
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>
          {idea.solution}
        </Typography>
      </Box>

      <Divider sx={{ borderColor }} />

      {/* 통계 */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {[
          { icon: <ThumbUpOutlinedIcon sx={{ fontSize: '0.88rem' }} />, label: '좋아요', value: idea.likes },
          { icon: <ChatBubbleOutlineIcon sx={{ fontSize: '0.88rem' }} />, label: '댓글', value: idea.comments },
          { icon: <VisibilityOutlinedIcon sx={{ fontSize: '0.88rem' }} />, label: '조회수', value: idea.views },
        ].map(({ icon, label, value }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ color: textSecondary }}>{icon}</Box>
            <Typography sx={{ fontSize: '0.8rem', color: textSecondary }}>{label}</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
