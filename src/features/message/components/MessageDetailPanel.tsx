// src/features/message/components/MessageDetailPanel.tsx
import { useEffect, useState } from 'react'
import {
  Box, Typography, Avatar, Divider, Button, IconButton,
  TextField, CircularProgress, Tooltip,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ReplyIcon from '@mui/icons-material/Reply'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useMsgTheme, msgAccent } from '@/theme/messageTheme'
import { useUpdateMessage, useDeleteMessage, useMarkMessageRead } from '@/api/queries/useMessages'
import type { MessageApiItem } from '@/api/types/message'
import { toDatetime } from '@/utils/dateUtils'

interface MessageDetailPanelProps {
  message: MessageApiItem
  currentEmployeeId: string
  onReply: (receiverId: string, receiverName: string) => void
  onDeleted: () => void
}

function fmtDatetime(s: string) {
  return toDatetime(s)
}

export default function MessageDetailPanel({
  message,
  currentEmployeeId,
  onReply,
  onDeleted,
}: MessageDetailPanelProps) {
  const t = useMsgTheme()

  const isSender  = message.senderId === currentEmployeeId
  const anyRead   = message.receivers.some((r) => r.isRead)
  const canEdit   = isSender && !anyRead
  const canDelete = !isSender || !anyRead

  // 답장 대상: 수신자이면 발신자에게, 발신자이면 첫 번째 수신자에게
  const replyTarget = isSender
    ? message.receivers[0]
    : { id: message.senderId, name: message.senderName }

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle,   setEditTitle]   = useState(message.title)
  const [editContent, setEditContent] = useState(message.content)

  const updateMsg = useUpdateMessage(message.messageId)
  const deleteMsg = useDeleteMessage()
  const markRead  = useMarkMessageRead()

  useEffect(() => {
    if (!isSender && !message.isRead) {
      markRead.mutate(message.messageId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.messageId])

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

          {/* 발신자 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: t.avatarBg }}>
              {message.senderName[0]}
            </Avatar>
            <Typography sx={{ fontSize: '0.8rem', color: t.textSecondary }}>
              보낸 사람: <Box component="span" fontWeight={600} sx={{ color: t.textPrimary }}>{message.senderName}</Box>
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: t.textSecondary, ml: 'auto' }}>
              {fmtDatetime(message.createdAt)}
            </Typography>
          </Box>

          {/* 수신자 목록 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.75rem', color: t.textSecondary, flexShrink: 0 }}>받는 사람:</Typography>
            {message.receivers.map((r) => (
              <Box
                key={r.id}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.4,
                  px: 0.75, py: 0.2, borderRadius: 1,
                  bgcolor: r.isRead ? 'transparent' : t.unreadBg,
                  border: `1px solid ${r.isRead ? t.borderColor : t.unreadBorder}`,
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: t.textPrimary }}>{r.name}</Typography>
                <Typography sx={{ fontSize: '0.65rem', color: r.isRead ? msgAccent.success : t.textSecondary }}>
                  {r.isRead ? '읽음' : '안읽음'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {!isSender && (
            <Tooltip title="답장">
              <IconButton size="small" onClick={() => onReply(replyTarget.id, replyTarget.name)}>
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
          <Tooltip title={canDelete ? '삭제' : '상대방이 읽은 메시지는 삭제할 수 없습니다'}>
            <span>
              <IconButton size="small" onClick={handleDelete} disabled={deleteMsg.isPending || !canDelete}>
                {deleteMsg.isPending
                  ? <CircularProgress size={14} />
                  : <DeleteOutlineIcon sx={{ fontSize: '1.1rem', color: msgAccent.danger }} />}
              </IconButton>
            </span>
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

      {/* 답장 버튼 (하단) */}
      {!isSender && (
        <Button
          startIcon={<ReplyIcon />}
          variant="outlined"
          size="small"
          onClick={() => onReply(replyTarget.id, replyTarget.name)}
          sx={{ alignSelf: 'flex-start', borderColor: msgAccent.primary, color: msgAccent.primary }}
        >
          답장
        </Button>
      )}
    </Box>
  )
}
