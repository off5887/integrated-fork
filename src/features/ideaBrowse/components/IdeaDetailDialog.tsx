// src/routes/ideaBrowse/components/IdeaDetailDialog.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme, ideaAccent, IDEA_STATUS_CONFIG } from '@/theme/ideaBrowseTheme'
import type { IdeaItem } from '@/api/types/ideaBrowse'
import { getCatConfig } from '../utils'

interface IdeaDetailDialogProps {
  idea: IdeaItem | null
  onClose: () => void
  similarTitles: string[]
  isOwner?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function IdeaDetailDialog({
  idea,
  onClose,
  similarTitles,
  isOwner,
  onEdit,
  onDelete,
}: IdeaDetailDialogProps) {
  const { isDarkMode } = useThemeMode()
  const {
    textPrimary, textSecondary, borderColor, cardBg,
    similar, avatarBg, dialogShadow, backdropBg, similarListColor,
    inputBg,
  } = getIdeaTheme(isDarkMode)
  const muiTheme = useTheme()
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'))

  const [likesOpen, setLikesOpen] = useState(false)
  const [showAllLikes, setShowAllLikes] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)

  const LIKES_INITIAL = 10
  const COMMENTS_INITIAL = 3

  if (!idea) return null
  const cat = getCatConfig(idea.category)
  const stat = IDEA_STATUS_CONFIG[idea.status]
  const hasComments = (idea.commentsData?.length ?? 0) > 0
  const hasLikes = (idea.likesData?.length ?? 0) > 0

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
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* 좋아요 — 클릭 시 목록 토글 */}
            <Box
              onClick={() => hasLikes && setLikesOpen((v) => !v)}
              onKeyDown={(e) => { if (hasLikes && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setLikesOpen((v) => !v) } }}
              role={hasLikes ? 'button' : undefined}
              tabIndex={hasLikes ? 0 : undefined}
              aria-expanded={hasLikes ? likesOpen : undefined}
              aria-label={hasLikes ? (likesOpen ? '좋아요 목록 접기' : '좋아요 누른 사람 보기') : undefined}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                cursor: hasLikes ? 'pointer' : 'default',
                borderRadius: 1.5,
                px: hasLikes ? 1 : 0,
                py: hasLikes ? 0.4 : 0,
                mx: hasLikes ? -1 : 0,
                transition: 'background 0.15s',
                outline: 'none',
                '&:hover': hasLikes ? { bgcolor: `${ideaAccent.primary}12` } : {},
                '&:focus-visible': hasLikes ? { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2 } : {},
              }}
            >
              <Box sx={{ color: likesOpen ? ideaAccent.primary : textSecondary }}>
                {likesOpen
                  ? <ThumbUpIcon sx={{ fontSize: '0.9rem' }} />
                  : <ThumbUpOutlinedIcon sx={{ fontSize: '0.9rem' }} />}
              </Box>
              <Typography sx={{ fontSize: '0.82rem', color: likesOpen ? ideaAccent.primary : textSecondary }}>좋아요</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: likesOpen ? ideaAccent.primary : textPrimary }}>{idea.likes}</Typography>
              {hasLikes && (
                <Box sx={{ color: textSecondary, display: 'flex', alignItems: 'center' }}>
                  {likesOpen
                    ? <KeyboardArrowUpIcon sx={{ fontSize: '0.9rem' }} />
                    : <KeyboardArrowDownIcon sx={{ fontSize: '0.9rem' }} />}
                </Box>
              )}
            </Box>

            {[
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

          {/* 좋아요 누른 사람 목록 */}
          {hasLikes && (
            <Collapse in={likesOpen} unmountOnExit>
              <Box
                sx={{
                  mt: -1,
                  p: 1.75,
                  borderRadius: 2,
                  bgcolor: inputBg,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {(showAllLikes ? idea.likesData! : idea.likesData!.slice(0, LIKES_INITIAL)).map((name) => (
                    <Box
                      key={name}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 0.6,
                        px: 1, py: 0.35, borderRadius: 10,
                        bgcolor: `${ideaAccent.primary}14`,
                        border: `1px solid ${ideaAccent.primary}30`,
                      }}
                    >
                      <Avatar sx={{ width: 18, height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: avatarBg }}>
                        {name[0]}
                      </Avatar>
                      <Typography sx={{ fontSize: '0.76rem', color: textPrimary, fontWeight: 500 }}>{name}</Typography>
                    </Box>
                  ))}
                </Box>
                {idea.likesData!.length > LIKES_INITIAL && (
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-expanded={showAllLikes}
                    onClick={() => setShowAllLikes((v) => !v)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowAllLikes((v) => !v) } }}
                    sx={{
                      mt: 1, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.5,
                      fontSize: '0.75rem', fontWeight: 600, color: ideaAccent.primary,
                      outline: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2, borderRadius: 1 },
                    }}
                  >
                    {showAllLikes
                      ? '접기'
                      : `+${idea.likesData!.length - LIKES_INITIAL}명 더보기`}
                  </Box>
                )}
              </Box>
            </Collapse>
          )}

          {/* 댓글 섹션 */}
          {hasComments && (
            <>
              <Divider sx={{ borderColor }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <ChatBubbleOutlineIcon sx={{ fontSize: '0.95rem', color: ideaAccent.primary }} />
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: textPrimary }}>
                    댓글 {idea.comments}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                  {(showAllComments ? idea.commentsData! : idea.commentsData!.slice(0, COMMENTS_INITIAL)).map((comment) => (
                    <Box
                      key={comment.id}
                      sx={{
                        display: 'flex', gap: 1.25,
                        p: 1.5, borderRadius: 2,
                        bgcolor: inputBg,
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <Avatar sx={{ width: 28, height: 28, bgcolor: avatarBg, fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                        {comment.author[0]}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: textPrimary }}>
                            {comment.author}
                          </Typography>
                          <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                            {comment.createdAt}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.84rem', color: textPrimary, lineHeight: 1.6 }}>
                          {comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {idea.commentsData!.length > COMMENTS_INITIAL && (
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-expanded={showAllComments}
                    onClick={() => setShowAllComments((v) => !v)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowAllComments((v) => !v) } }}
                    sx={{
                      mt: 1, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.5,
                      fontSize: '0.75rem', fontWeight: 600, color: ideaAccent.primary,
                      outline: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      '&:focus-visible': { outline: `2px solid ${ideaAccent.primary}`, outlineOffset: 2, borderRadius: 1 },
                    }}
                  >
                    {showAllComments
                      ? '접기'
                      : `댓글 ${idea.commentsData!.length - COMMENTS_INITIAL}개 더보기`}
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
