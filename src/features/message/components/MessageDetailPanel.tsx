// src/features/message/components/MessageDetailPanel.tsx
import { useState } from 'react'
import {
  Box, Typography, Avatar, Divider, Button, IconButton,
  TextField, CircularProgress, Tooltip,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ReplyIcon from '@mui/icons-material/Reply'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useThemeMode } from '@/context/ThemeContext'
import { getMsgTheme, msgAccent } from '@/theme/messageTheme'
import { useUpdateMessage, useDeleteMessage } from '@/api/queries/useMessages'
import type { MessageApiItem } from '@/api/types/message'

interface MessageDetailPanelProps {
  message: MessageApiItem
  currentEmployeeId: string
  onReply: (receiverId: string, receiverName: string) => void
  onDeleted: () => void
}

function fmtDatetime(s: string) {
  return s.replace('T', ' ').slice(0, 16)
}

export default function MessageDetailPanel({
  message,
  currentEmployeeId,
  onReply,
  onDeleted,
}: MessageDetailPanelProps) {
  const { isDarkMode } = useThemeMode()
  const t = getMsgTheme(isDarkMode)

  const isSender   = message.senderId === currentEmployeeId
  const canEdit    = isSender && !message.isRead
  const otherName  = isSender ? message.receiverName : message.senderName
  const otherId    = isSender ? message.receiverId   : message.senderId

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle,   setEditTitle]   = useState(message.title)
  const [editContent, setEditContent] = useState(message.content)

  const updateMsg = useUpdateMessage(message.messageId)
  const deleteMsg = useDeleteMessage()

  const handleSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return
    updateMsg.mutate(
      { title: editTitle.trim(), content: editContent.trim() },
      { onSuccess: () => setIsEditing(false) },
    )
  }

  const handleDelete = () => {
    deleteMsg.mutate(message.messageId, { onSuccess: onDeleted })
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: { xs: 2, md: 3 }, gap: 2 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {isEditing ? (
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              size="small"
              fullWidth
              inputProps={{ maxLength: 200 }}
              sx={{ mb: 1 }}
            />
          ) : (
            <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: t.textPrimary, wordBreak: 'break-word' }}>
              {message.title}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: t.avatarBg }}>
              {otherName[0]}
            </Avatar>
            <Typography sx={{ fontSize: '0.8rem', color: t.textSecondary }}>
              {isSender ? `받는 사람: ${otherName}` : `보낸 사람: ${otherName}`}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: t.textSecondary, ml: 'auto' }}>
              {fmtDatetime(message.createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {!isSender && (
            <Tooltip title="답장">
              <IconButton size="small" onClick={() => onReply(otherId, otherName)}>
                <ReplyIcon sx={{ fontSize: '1.1rem', color: msgAccent.primary }} />
              </IconButton>
            </Tooltip>
          )}
          {canEdit && !isEditing && (
            <Tooltip title="수정">
              <IconButton size="small" onClick={() => setIsEditing(true)}>
                <EditOutlinedIcon sx={{ fontSize: '1.1rem', color: t.textSecondary }} />
              </IconButton>
            </Tooltip>
          )}
          {isEditing && (
            <>
              <Tooltip title="저장">
                <IconButton size="small" onClick={handleSave} disabled={updateMsg.isPending}>
                  {updateMsg.isPending
                    ? <CircularProgress size={14} />
                    : <SaveIcon sx={{ fontSize: '1.1rem', color: msgAccent.success }} />}
                </IconButton>
              </Tooltip>
              <Tooltip title="취소">
                <IconButton size="small" onClick={() => { setIsEditing(false); setEditTitle(message.title); setEditContent(message.content) }}>
                  <CloseIcon sx={{ fontSize: '1.1rem', color: t.textSecondary }} />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="삭제">
            <IconButton size="small" onClick={handleDelete} disabled={deleteMsg.isPending}>
              {deleteMsg.isPending
                ? <CircularProgress size={14} />
                : <DeleteOutlineIcon sx={{ fontSize: '1.1rem', color: msgAccent.danger }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ borderColor: t.dividerColor }} />

      {/* 본문 */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {isEditing ? (
          <TextField
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            multiline
            minRows={6}
            fullWidth
          />
        ) : (
          <Typography
            sx={{
              fontSize: '0.88rem', color: t.textPrimary, lineHeight: 1.8,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}
          >
            {message.content}
          </Typography>
        )}
      </Box>

      {/* 읽음 상태 */}
      {isSender && (
        <Box sx={{ pt: 1, borderTop: `1px solid ${t.dividerColor}` }}>
          <Typography sx={{ fontSize: '0.75rem', color: t.textSecondary }}>
            {message.isRead
              ? `읽음 · ${message.readAt ? fmtDatetime(message.readAt) : ''}`
              : '아직 읽지 않음'}
          </Typography>
        </Box>
      )}

      {/* 답장 버튼 (하단) */}
      {!isSender && (
        <Button
          startIcon={<ReplyIcon />}
          variant="outlined"
          size="small"
          onClick={() => onReply(otherId, otherName)}
          sx={{ alignSelf: 'flex-start', borderColor: msgAccent.primary, color: msgAccent.primary }}
        >
          답장
        </Button>
      )}
    </Box>
  )
}
