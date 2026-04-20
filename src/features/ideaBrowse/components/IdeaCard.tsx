// src/routes/ideaBrowse/components/IdeaCard.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Avatar, Box, Tooltip, Typography } from '@mui/material'
import { useIdeaBrowseTheme, ideaAccent, IDEA_STATUS_CONFIG } from '@/theme/ideaBrowseTheme'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { useCategories } from '@/api/queries/useCategories'
import { useSimilarIdeas } from '@/api/queries/useIdeas'
import { fmtDate } from '../utils'

interface IdeaCardProps {
  idea: IdeaItem
  showSimilarOnly: boolean
  onClick: () => void
}

const CAT_FALLBACK = { emoji: '📁', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)', label: '' }

export default function IdeaCard({ idea, showSimilarOnly, onClick }: IdeaCardProps) {
  const { textPrimary, textSecondary, borderColor, cardBg, similar, dividerColor, cardShadow, cardHoverShadow, avatarBg, similarCardShadow } = useIdeaBrowseTheme()
  const { categories } = useCategories()
  const { data: similarTitles = [] } = useSimilarIdeas(idea.id)

  const cat = categories.find((c) => Number(c.id) === idea.categoryId) ?? CAT_FALLBACK
  const stat = IDEA_STATUS_CONFIG[idea.status]
  const isSimilar = similarTitles.length > 0

  // showSimilarOnly 필터: 유사 아이디어가 없으면 카드를 렌더하지 않음
  if (showSimilarOnly && !isSimilar) return null

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      aria-label={`아이디어: ${idea.title}`}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: cardBg,
        border: `1px solid ${isSimilar ? similar.border : borderColor}`,
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: isSimilar ? similarCardShadow : cardShadow,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: cardHoverShadow,
          borderColor: isSimilar ? 'rgba(245,158,11,0.7)' : 'rgba(99,102,241,0.2)',
        },
        '&:focus-visible': {
          outline: `2px solid ${isSimilar ? ideaAccent.similar : ideaAccent.primary}`,
          outlineOffset: 2,
        },
      }}
    >
      {/* 상단 카테고리 색상 스트립 */}
      <Box sx={{ height: 3, background: isSimilar ? `linear-gradient(90deg, ${similar.gradientFrom}, ${similar.gradientTo})` : `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }} />

      {/* 유사 아이디어 배지 */}
      {isSimilar && (
        <Tooltip
          title={
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>내 아이디어와 유사한 건</Typography>
              {similarTitles.map((t) => (
                <Typography key={t} variant="caption" sx={{ display: 'block', opacity: 0.9 }}>• {t}</Typography>
              ))}
            </Box>
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              position: 'absolute', top: 11, right: 10, zIndex: 1,
              display: 'flex', alignItems: 'center', gap: 0.4,
              px: 0.8, py: 0.25, borderRadius: 1,
              bgcolor: similar.badgeBg,
              border: `1px solid ${similar.badgeBorder}`,
            }}
          >
            <WarningAmberIcon sx={{ fontSize: '0.7rem', color: ideaAccent.similar }} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: similar.textColor, lineHeight: 1 }}>
              유사
            </Typography>
          </Box>
        </Tooltip>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, md: 2.5 }, gap: 1.75 }}>
        {/* 카테고리 + 상태 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.5,
              px: 0.9, py: 0.3, borderRadius: 1.5,
              bgcolor: cat.bg, border: `1px solid ${cat.border}`,
            }}
          >
            <Box component="span" sx={{ fontSize: '0.75rem', lineHeight: 1 }}>{cat.emoji}</Box>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: cat.color, lineHeight: 1 }}>
              {idea.category}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center',
              px: 0.9, py: 0.3, borderRadius: 1.5,
              bgcolor: stat.bg, border: `1px solid ${stat.border}`,
            }}
          >
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {idea.status}
            </Typography>
          </Box>
        </Box>

        {/* 제목 */}
        <Typography
          sx={{
            fontSize: '0.9rem', fontWeight: 700, color: textPrimary,
            lineHeight: 1.45, letterSpacing: '-0.01em',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {idea.title}
        </Typography>

        {/* 문제점 요약 */}
        <Typography
          sx={{
            fontSize: '0.8rem', color: textSecondary, lineHeight: 1.6,
            flexGrow: 1,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {idea.problem}
        </Typography>

        {/* 하단 메타 */}
        <Box
          sx={{
            mt: 'auto', pt: 1.5,
            borderTop: `1px solid ${dividerColor}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1,
          }}
        >
          {/* 작성자 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
            <Avatar
              sx={{
                width: 22, height: 22, fontSize: '0.65rem', fontWeight: 700,
                bgcolor: avatarBg, flexShrink: 0,
              }}
            >
              {idea.author[0]}
            </Avatar>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {idea.author} · {idea.department}
            </Typography>
          </Box>

          {/* 통계 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ThumbUpOutlinedIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.likes}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.comments}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <VisibilityOutlinedIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{idea.views}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <CalendarTodayIcon sx={{ fontSize: '0.72rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>{fmtDate(idea.submittedAt)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
