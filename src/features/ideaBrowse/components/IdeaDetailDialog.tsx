// src/routes/ideaBrowse/components/IdeaDetailDialog.tsx
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme, ideaAccent, IDEA_STATUS_CONFIG } from '@/theme/ideaBrowseTheme'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { useIdeaDetail, useToggleLike, useSimilarIdeas } from '@/api/queries/useIdeas'
import { useCategories } from '@/api/queries/useCategories'
import IdeaCommentSection from './IdeaCommentSection'

interface IdeaDetailDialogProps {
  idea: IdeaItem | null
  ideaId: number | null
  onClose: () => void
  isOwner?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function IdeaDetailDialog({
  idea,
  ideaId,
  onClose,
  isOwner,
  onEdit,
  onDelete,
}: IdeaDetailDialogProps) {
  const { data: similarTitles = [] } = useSimilarIdeas(ideaId)
  const { isDarkMode } = useThemeMode()
  const {
    textPrimary, textSecondary, borderColor, cardBg,
    similar, avatarBg, dialogShadow, backdropBg, similarListColor,
  } = getIdeaTheme(isDarkMode)
  const muiTheme = useTheme()
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'))

  const { categories } = useCategories()
  const { data: detail } = useIdeaDetail(idea?.id ?? null)
  const toggleLike = useToggleLike(idea?.id ?? 0)

  if (!idea) return null
  const cat = categories.find((c) => Number(c.id) === idea.categoryId)
    ?? { emoji: '📁', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)', label: idea.category }
  const stat = IDEA_STATUS_CONFIG[idea.status]

  // live counts from API, fallback to IdeaItem values while loading
  const likeCount = detail?.likeCount ?? idea.likes
  const commentCount = detail?.commentCount ?? idea.comments
  const viewCount = detail?.viewCount ?? idea.views
  const isLiked = detail?.isLiked ?? false

  function handleLikeToggle() {
    toggleLike.mutate()
  }

  return (
    <Dialog
      open={!!idea}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : 3,
            bgcolor: cardBg,
            border: fullScreen ? 'none' : `1px solid ${borderColor}`,
            boxShadow: fullScreen ? 'none' : dialogShadow,
            overflow: 'hidden',
            m: fullScreen ? 0 : { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: { backdropFilter: 'blur(6px)', backgroundColor: backdropBg },
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, mt: -0.5 }}>
          {isOwner && (
            <>
              <Button
                size="small"
                startIcon={<EditOutlinedIcon sx={{ fontSize: '0.9rem' }} />}
                onClick={onEdit}
                sx={{
                  fontSize: '0.78rem', fontWeight: 600, textTransform: 'none',
                  color: ideaAccent.primary, px: 1.5, py: 0.5, borderRadius: 1.5,
                  minWidth: 0,
                  '&:hover': { bgcolor: `${ideaAccent.primary}12` },
                }}
              >
                수정
              </Button>
              <Button
                size="small"
                startIcon={<DeleteOutlineIcon sx={{ fontSize: '0.9rem' }} />}
                onClick={onDelete}
                sx={{
                  fontSize: '0.78rem', fontWeight: 600, textTransform: 'none',
                  color: ideaAccent.danger, px: 1.5, py: 0.5, borderRadius: 1.5,
                  minWidth: 0,
                  '&:hover': { bgcolor: `${ideaAccent.danger}12` },
                }}
              >
                삭제
              </Button>
            </>
          )}
          <IconButton size="small" aria-label="닫기" onClick={onClose} sx={{ color: textSecondary }}>
            <CloseIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
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
                  <Typography key={t} sx={{ fontSize: '0.78rem', color: similarListColor, lineHeight: 1.6 }}>
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
            <Avatar sx={{ width: 36, height: 36, bgcolor: avatarBg, fontSize: '0.85rem', fontWeight: 700 }}>
              {idea.author[0]}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: textPrimary, lineHeight: 1.3 }}>
                {idea.author}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
                {idea.bizArea} · {idea.department}
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
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* 좋아요 버튼 */}
            <Box
              onClick={handleLikeToggle}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLikeToggle() } }}
              role="button"
              tabIndex={0}
              aria-pressed={isLiked}
              aria-label={isLiked ? '좋아요 취소' : '좋아요'}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                cursor: 'pointer',
                borderRadius: 1.5,
                px: 1, py: 0.4, mx: -1,
                transition: 'background 0.15s',
                outline: 'none',
                '&:hover': { bgcolor: `${ideaAccent.primary}12` },
                '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 },
              }}
            >
              <Box sx={{ color: isLiked ? ideaAccent.primary : textSecondary }}>
                {isLiked
                  ? <ThumbUpIcon sx={{ fontSize: '0.9rem' }} />
                  : <ThumbUpOutlinedIcon sx={{ fontSize: '0.9rem' }} />}
              </Box>
              <Typography sx={{ fontSize: '0.82rem', color: isLiked ? ideaAccent.primary : textSecondary }}>좋아요</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: isLiked ? ideaAccent.primary : textPrimary }}>{likeCount}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ color: textSecondary }}><ChatBubbleOutlineIcon sx={{ fontSize: '0.9rem' }} /></Box>
              <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>댓글</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: textPrimary }}>{commentCount}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ color: textSecondary }}><VisibilityOutlinedIcon sx={{ fontSize: '0.9rem' }} /></Box>
              <Typography sx={{ fontSize: '0.82rem', color: textSecondary }}>조회수</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: textPrimary }}>{viewCount}</Typography>
            </Box>
          </Box>

          {/* 내 아이디어일 때만 표시 — 심사자 & 실행계획 */}
          {isOwner && (
            <>
              <Divider sx={{ borderColor }} />

              {/* 심사자 */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                  <PersonOutlineIcon sx={{ fontSize: '0.95rem', color: textSecondary }} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    담당 심사자
                  </Typography>
                </Box>
                {detail?.approverName ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: avatarBg, fontSize: '0.75rem', fontWeight: 700 }}>
                      {detail.approverName[0]}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.88rem', color: textPrimary, fontWeight: 600 }}>
                      {detail.approverName}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>
                      ({detail.approverId})
                    </Typography>
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: '0.85rem', color: textSecondary, fontStyle: 'italic' }}>
                    배정된 심사자 없음
                  </Typography>
                )}
              </Box>

              <Divider sx={{ borderColor }} />

              {/* 실행계획 */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: '0.95rem', color: textSecondary }} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    실행계획
                  </Typography>
                </Box>
                {detail?.executors && detail.executors.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {detail.executors.map((ex) => (
                      <Box
                        key={ex.executorId}
                        sx={{
                          p: 1.5, borderRadius: 2,
                          border: `1px solid ${borderColor}`,
                          bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                          <CalendarTodayIcon sx={{ fontSize: '0.75rem', color: textSecondary }} />
                          <Typography sx={{ fontSize: '0.73rem', color: textSecondary, fontFamily: 'monospace' }}>
                            {ex.scheduleDate.slice(0, 10)}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.85rem', color: textPrimary, lineHeight: 1.6, mb: 0.5 }}>
                          {ex.content}
                        </Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: textSecondary, lineHeight: 1.5 }}>
                          기대 성과: {ex.expectedResult}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: '0.85rem', color: textSecondary, fontStyle: 'italic' }}>
                    등록된 실행계획 없음
                  </Typography>
                )}
              </Box>
            </>
          )}

          <Divider sx={{ borderColor }} />

          {/* 댓글 섹션 */}
          <IdeaCommentSection ideaId={idea.id} commentCount={commentCount} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
