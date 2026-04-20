// src/features/message/MessagePage.tsx
import { useState } from 'react'
import {
  Box, Typography, Tab, Tabs, Button, Pagination,
  CircularProgress,
} from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import EditNoteIcon from '@mui/icons-material/EditNote'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useMsgTheme, msgAccent } from '@/theme/messageTheme'
import { useReceivedMessages, useSentMessages } from '@/api/queries/useMessages'
import { useAdminUsers } from '@/api/queries/useUsers'
import type { MessageApiItem } from '@/api/types/message'
import PageHeader from '@/components/ui/PageHeader'
import MessageListItem from './components/MessageListItem'
import MessageDetailPanel from './components/MessageDetailPanel'
import MessageComposeDialog from './components/MessageComposeDialog'

export default function MessagePage() {
  const t = useMsgTheme()
  const { employeeId } = useCurrentUser()
  const { data: adminUserList = [] } = useAdminUsers()

  const [tab,            setTab]            = useState<0 | 1>(0)  // 0: 받은, 1: 보낸
  const [page,           setPage]           = useState(1)
  const [selected,       setSelected]       = useState<MessageApiItem | null>(null)
  const [composeOpen,    setComposeOpen]    = useState(false)
  const [replyReceiver,  setReplyReceiver]  = useState<{ id: string; name: string } | null>(null)

  // 관리자 목록 (본인 제외) — GET /api/org 로 가져와 admin만 필터
  const adminReceivers = adminUserList
    .filter((u) => u.employeeId !== employeeId)
    .map((u) => ({ id: u.employeeId, name: u.name }))

  const handleToAdmins = () => {
    setReplyReceiver({ id: '__admins__', name: '' })
    setComposeOpen(true)
  }

  const isSentTab = tab === 1
  const apiPage   = page - 1  // API는 0-indexed

  const { data: receivedPage, isLoading: loadingReceived } = useReceivedMessages(isSentTab ? 0 : apiPage)
  const { data: sentPage,     isLoading: loadingSent     } = useSentMessages(apiPage, isSentTab)

  const currentPage = isSentTab ? sentPage     : receivedPage
  const isLoading   = isSentTab ? loadingSent  : loadingReceived
  const messages    = currentPage?.content ?? []
  const totalPages  = currentPage?.totalPages ?? 1
  const unreadCount = (receivedPage?.content ?? []).filter((m) => !m.isRead).length

  // 수정·읽음 처리 후 쿼리가 리페치되면 messages가 최신 데이터로 교체됨
  // selected는 messageId만 추적하고, 실제 표시 데이터는 최신 목록에서 파생
  const displayedMessage = selected
    ? (messages.find((m) => m.messageId === selected.messageId) ?? selected)
    : null

  const handleTabChange = (_: React.SyntheticEvent, v: number) => {
    setTab(v as 0 | 1)
    setPage(1)
    setSelected(null)
  }

  const handleSelect = (msg: MessageApiItem) => setSelected(msg)

  const handleReply = (id: string, name: string) => {
    setReplyReceiver({ id, name })
    setComposeOpen(true)
  }

  const handleDeleted = () => setSelected(null)

  const handleComposeClose = () => {
    setComposeOpen(false)
    setReplyReceiver(null)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: t.pageBg, pb: 6 }}>
      {/* ── 헤더 ─────────────────────────────────────────────── */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 5 }, pb: 3,
          borderBottom: `1px solid ${t.borderColor}`,
          bgcolor: t.sidebarBg,
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <PageHeader
            icon={MailOutlineIcon}
            title="쪽지함"
            subtitle="동료들과 쪽지를 주고받으세요"
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<AdminPanelSettingsOutlinedIcon />}
              onClick={handleToAdmins}
              sx={{
                borderRadius: 2, fontWeight: 600, fontSize: '0.82rem',
                borderColor: t.adminBtnBorder,
                color: t.adminBtnColor,
                bgcolor: t.adminBtnBg,
                '&:hover': {
                  borderColor: msgAccent.primary,
                  bgcolor: t.adminBtnHoverBg,
                },
              }}
            >
              관리자에게 보내기
            </Button>
            <Button
              variant="contained"
              startIcon={<EditNoteIcon />}
              onClick={() => { setReplyReceiver(null); setComposeOpen(true) }}
              sx={{
                borderRadius: 2, fontWeight: 600, fontSize: '0.82rem',
                bgcolor: msgAccent.primary,
                color: '#fff',
                boxShadow: t.sendBtnShadow,
                '&:hover': {
                  bgcolor: '#4f46e5',
                  boxShadow: t.sendBtnHoverShadow,
                },
              }}
            >
              쪽지 쓰기
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── 본문 레이아웃 ────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, pt: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: selected ? { xs: '1fr', md: '340px 1fr' } : '1fr',
            gap: 2,
            minHeight: 540,
          }}
        >
          {/* ── 목록 패널 ──────────────────────────────────── */}
          <Box
            sx={{
              bgcolor: t.sidebarBg,
              border: `1px solid ${t.borderColor}`,
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 탭 */}
            <Tabs
              value={tab}
              onChange={handleTabChange}
              sx={{
                borderBottom: `1px solid ${t.borderColor}`,
                minHeight: 44,
                '& .MuiTab-root': { minHeight: 44, fontSize: '0.82rem', fontWeight: 500, color: t.tabColor },
                '& .Mui-selected': { color: t.tabActiveColor, fontWeight: 700 },
                '& .MuiTabs-indicator': { bgcolor: msgAccent.primary },
              }}
            >
              <Tab
                icon={<MailOutlineIcon sx={{ fontSize: '1rem' }} />}
                iconPosition="start"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    받은 쪽지
                    {unreadCount > 0 && (
                      <Box sx={{ bgcolor: msgAccent.primary, color: '#fff', borderRadius: '10px', px: 0.7, py: 0.1, fontSize: '0.65rem', fontWeight: 700, lineHeight: 1.4 }}>
                        {unreadCount}
                      </Box>
                    )}
                  </Box>
                }
              />
              <Tab
                icon={<SendOutlinedIcon sx={{ fontSize: '1rem' }} />}
                iconPosition="start"
                label="보낸 쪽지"
              />
            </Tabs>

            {/* 목록 */}
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress size={32} />
                </Box>
              ) : messages.length === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 1 }}>
                  <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>✉️</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: t.textSecondary }}>
                    {isSentTab ? '보낸 쪽지가 없습니다' : '받은 쪽지가 없습니다'}
                  </Typography>
                </Box>
              ) : (
                messages.map((msg) => (
                  <MessageListItem
                    key={msg.messageId}
                    message={msg}
                    isActive={selected?.messageId === msg.messageId}
                    isSent={isSentTab}
                    onClick={() => handleSelect(msg)}
                  />
                ))
              )}
            </Box>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5, borderTop: `1px solid ${t.borderColor}` }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, v) => { setPage(v); setSelected(null) }}
                  color="primary"
                  shape="rounded"
                  size="small"
                />
              </Box>
            )}
          </Box>

          {/* ── 상세 패널 ──────────────────────────────────── */}
          {displayedMessage && (
            <Box
              sx={{
                bgcolor: t.contentBg,
                border: `1px solid ${t.borderColor}`,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <MessageDetailPanel
                message={displayedMessage}
                currentEmployeeId={employeeId}
                onReply={handleReply}
                onDeleted={handleDeleted}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* ── 쪽지 작성 다이얼로그 ────────────────────────────── */}
      <MessageComposeDialog
        open={composeOpen}
        initialReceiverId={replyReceiver?.id === '__admins__' ? '' : (replyReceiver?.id ?? '')}
        initialReceiverName={replyReceiver?.id === '__admins__' ? '' : (replyReceiver?.name ?? '')}
        adminReceivers={replyReceiver?.id === '__admins__' ? adminReceivers : undefined}
        onClose={handleComposeClose}
      />
    </Box>
  )
}
