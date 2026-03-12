// src/routes/ideaBrowse/components/IdeaDetailDialog.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { getIdeaTheme, ideaAccent, IDEA_STATUS_CONFIG } from '@/theme/ideaBrowseTheme'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { getCatConfig } from '../utils'

interface IdeaDetailDialogProps {
  idea: IdeaItem | null
  onClose: () => void
  isDarkMode: boolean
  similarTitles: string[]
}

export default function IdeaDetailDialog({ idea, onClose, isDarkMode, similarTitles }: IdeaDetailDialogProps) {
  const { textPrimary, textSecondary, borderColor, cardBg, similar } = getIdeaTheme(isDarkMode)

  if (!idea) return null
  const cat = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]

  return (
    <Dialog
      open={!!idea}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 24px 64px rgba(0,0,0,0.6)' : '0 24px 64px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: { backdropFilter: 'blur(6px)', backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)' },
        },
      }}
    >
      {/* 상단 스트립 */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }} />

      {/* 헤더 */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5, borderBottom: `1px solid ${borderColor}` }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.35, borderRadius: 1.5, bgcolor: cat.bg, border: `1px solid ${cat.border}` }}>
              <Box component="span" sx={{ fontSize: '0.8rem' }}>{cat.emoji}</Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color }}>{idea.category}</Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.35, borderRadius: 1.5, bgcolor: stat.bg, border: `1px solid ${stat.border}` }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color }}>{idea.status}</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: textPrimary, lineHeight: 1.4 }}>
            {idea.title}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: textSecondary, flexShrink: 0, mt: -0.5 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* 유사 아이디어 경고 */}
          {similarTitles.length > 0 && (
            <Box
              sx={{
                display: 'flex', alignItems: 'flex-start', gap: 1.25,
                p: 1.75, borderRadius: 2,
                bgcolor: similar.badgeBg,
                border: `1px solid ${similar.badgeBorder}`,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: '1.1rem', color: ideaAccent.similar, flexShrink: 0, mt: 0.1 }} />
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: ideaAccent.similar, mb: 0.4 }}>
                  내 아이디어와 유사한 건이 있습니다
                </Typography>
                {similarTitles.map((t) => (
                  <Typography key={t} sx={{ fontSize: '0.78rem', color: isDarkMode ? similar.gradientTo : '#92400e', lineHeight: 1.6 }}>
                    • {t}
                  </Typography>
                ))}
                <Typography sx={{ fontSize: '0.75rem', color: textSecondary, mt: 0.75 }}>
                  제출 전 내용을 비교하여 중복 제안을 방지해 주세요.
                </Typography>
              </Box>
            </Box>
          )}

          {/* 작성자 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: isDarkMode ? '#4f46e5' : ideaAccent.primary, fontSize: '0.85rem', fontWeight: 700 }}>
              {idea.author[0]}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}>
                {idea.author}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
                {idea.division} · {idea.department}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: '0.8rem', color: textSecondary }} />
              <Typography sx={{ fontSize: '0.78rem', color: textSecondary }}>{idea.submittedAt}</Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* 문제점 */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              문제점 도출
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: textPrimary, lineHeight: 1.7 }}>
              {idea.problem}
            </Typography>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* 해결 대안 */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
              { icon: <ThumbUpOutlinedIcon sx={{ fontSize: '0.9rem' }} />, label: '좋아요', value: idea.likes },
              { icon: <ChatBubbleOutlineIcon sx={{ fontSize: '0.9rem' }} />, label: '댓글', value: idea.comments },
              { icon: <VisibilityOutlinedIcon sx={{ fontSize: '0.9rem' }} />, label: '조회수', value: idea.views },
            ].map(({ icon, label, value }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ color: textSecondary }}>{icon}</Box>
                <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: textPrimary }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
