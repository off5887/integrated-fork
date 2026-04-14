// src/features/ideaBrowse/components/IdeaCommentSection.tsx
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SendIcon from '@mui/icons-material/Send'
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme, ideaAccent } from '@/theme/ideaBrowseTheme'
import { useAddComment, useDeleteComment, useEditComment, useIdeaComments } from '@/api/queries/useIdeas'
import { useCurrentUserQuery } from '@/api/queries/useAuth'
import type { IdeaApiComment } from '@/api/types/idea'

interface IdeaCommentSectionProps {
  ideaId: number
  commentCount: number
}

export default function IdeaCommentSection({ ideaId, commentCount }: IdeaCommentSectionProps) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, inputBg, avatarBg } = getIdeaTheme(isDarkMode)

  const { data: commentsPage, isLoading } = useIdeaComments(ideaId)
  const { data: currentUser } = useCurrentUserQuery()
  const addComment = useAddComment(ideaId)
  const editComment = useEditComment(ideaId)
  const deleteComment = useDeleteComment(ideaId)

  const [newContent, setNewContent] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  const comments = commentsPage?.content ?? []

  function handleAdd() {
    const trimmed = newContent.trim()
    if (!trimmed) return
    addComment.mutate(trimmed, { onSuccess: () => setNewContent('') })
  }

  function startEdit(comment: IdeaApiComment) {
    setEditingId(comment.commentId)
    setEditContent(comment.content)
  }

  function handleEdit() {
    if (editingId === null) return
    const trimmed = editContent.trim()
    if (!trimmed) return
    editComment.mutate({ commentId: editingId, content: trimmed }, {
      onSuccess: () => { setEditingId(null); setEditContent('') },
    })
  }

  function handleDelete(commentId: number) {
    deleteComment.mutate(commentId)
  }

  const commentInputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: inputBg,
      fontSize: '0.84rem',
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor: ideaAccent.accentHoverBorder },
      '&.Mui-focused fieldset': { borderColor: ideaAccent.primary },
    },
    '& .MuiInputBase-input': { color: textPrimary },
  }

  return (
    <>
      {/* 댓글 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <ChatBubbleOutlineIcon sx={{ fontSize: '0.95rem', color: ideaAccent.primary }} />
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: textPrimary }}>
          댓글 {commentCount}
        </Typography>
      </Box>

      {/* 댓글 목록 */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
          {comments.map((comment) => {
            const isOwn = currentUser?.employeeId === comment.employeeId
            const isEditing = editingId === comment.commentId
            return (
              <Box
                key={comment.commentId}
                sx={{
                  display: 'flex', gap: 1.25,
                  p: 1.5, borderRadius: 2,
                  bgcolor: inputBg,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Avatar sx={{ width: 28, height: 28, bgcolor: avatarBg, fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  {comment.name[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: textPrimary }}>
                      {comment.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                      {comment.createdAt.slice(0, 10)}
                    </Typography>
                    {comment.updatedAt && (
                      <Typography sx={{ fontSize: '0.7rem', color: textSecondary }}>(수정됨)</Typography>
                    )}
                    {isOwn && !isEditing && (
                      <Box sx={{ ml: 'auto', display: 'flex', gap: 0.25 }}>
                        <IconButton size="small" aria-label="댓글 수정" onClick={() => startEdit(comment)} sx={{ color: textSecondary, p: 0.25 }}>
                          <EditOutlinedIcon sx={{ fontSize: '0.85rem' }} />
                        </IconButton>
                        <IconButton size="small" aria-label="댓글 삭제" onClick={() => handleDelete(comment.commentId)} sx={{ color: textSecondary, p: 0.25 }}>
                          <DeleteOutlineIcon sx={{ fontSize: '0.85rem' }} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        maxRows={4}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        sx={commentInputSx}
                      />
                      <IconButton size="small" aria-label="수정 저장" onClick={handleEdit} disabled={editComment.isPending} sx={{ color: ideaAccent.primary, flexShrink: 0 }}>
                        <SendIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                      <IconButton size="small" aria-label="수정 취소" onClick={() => setEditingId(null)} sx={{ color: textSecondary, flexShrink: 0 }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: '0.84rem', color: textPrimary, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {comment.content}
                    </Typography>
                  )}
                </Box>
              </Box>
            )
          })}
          {comments.length === 0 && (
            <Typography sx={{ fontSize: '0.82rem', color: textSecondary, textAlign: 'center', py: 1.5 }}>
              아직 댓글이 없습니다.
            </Typography>
          )}
        </Box>
      )}

      {/* 댓글 입력 */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder="댓글을 입력하세요..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd() } }}
          sx={commentInputSx}
        />
        <IconButton
          size="small"
          aria-label="댓글 등록"
          onClick={handleAdd}
          disabled={!newContent.trim() || addComment.isPending}
          sx={{ color: newContent.trim() ? ideaAccent.primary : textSecondary, flexShrink: 0, mb: 0.25 }}
        >
          <SendIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>
    </>
  )
}
