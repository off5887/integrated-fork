// src/features/message/components/MessageListItem.tsx
import { Box, Avatar, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useMsgTheme, msgAccent } from '@/theme/messageTheme'
import type { MessageApiItem } from '@/api/types/message'

interface MessageListItemProps {
  message: MessageApiItem
  isActive: boolean
  isSent: boolean
  onClick: () => void
}

function fmtDate(s: string) {
  const d = new Date(s)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) return d.toTimeString().slice(0, 5)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function MessageListItem({ message, isActive, isSent, onClick }: MessageListItemProps) {
  const t = useMsgTheme()

  const otherName = isSent ? message.receiverName : message.senderName
  const isUnread  = !isSent && !message.isRead

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.25,
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        bgcolor: isActive ? t.cardActiveBg : isUnread ? t.unreadBg : 'transparent',
        borderLeft: isActive ? `3px solid ${msgAccent.primary}` : '3px solid transparent',
        borderBottom: `1px solid ${t.dividerColor}`,
        transition: 'background 0.12s',
        outline: 'none',
        '&:hover': { bgcolor: isActive ? t.cardActiveBg : t.cardHoverBg },
        '&:focus-visible': { outline: `2px solid ${msgAccent.primary}`, outlineOffset: -2 },
      }}
    >
      <Avatar sx={{ width: 34, height: 34, fontSize: '0.8rem', bgcolor: t.avatarBg, flexShrink: 0, mt: 0.25 }}>
        {otherName[0]}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: isUnread ? 700 : 500, color: t.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}>
            {otherName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            {isUnread && (
              <FiberManualRecordIcon sx={{ fontSize: '0.55rem', color: t.unreadDot }} />
            )}
            <Typography sx={{ fontSize: '0.72rem', color: t.textSecondary }}>
              {fmtDate(message.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: isUnread ? 600 : 400, color: t.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {message.title}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: t.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {message.content}
        </Typography>
      </Box>
    </Box>
  )
}
