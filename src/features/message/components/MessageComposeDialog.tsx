// src/features/message/components/MessageComposeDialog.tsx
import { useState, useEffect, useMemo } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, CircularProgress, Chip, Autocomplete,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { useSendMessage } from '@/api/queries/useMessages'
import { useOrgUsersTree } from '@/api/queries/useUsers'
import { flattenUsers } from '@/utils/userUtils'
import { useThemeMode } from '@/context/ThemeContext'
import { getMsgTheme, msgAccent } from '@/theme/messageTheme'

interface AdminReceiver {
  id: string
  name: string
}

interface ReceiverOption {
  id: string
  name: string
  department: string
  position: string
}

interface MessageComposeDialogProps {
  open: boolean
  initialReceiverId?: string
  initialReceiverName?: string
  /** 관리자 일괄 수신 모드 — 이 값이 있으면 수신자 칩 목록으로 표시 */
  adminReceivers?: AdminReceiver[]
  onClose: () => void
}

export default function MessageComposeDialog({
  open,
  initialReceiverId = '',
  initialReceiverName = '',
  adminReceivers,
  onClose,
}: MessageComposeDialogProps) {
  const { isDarkMode } = useThemeMode()
  const t = getMsgTheme(isDarkMode)
  const sendMessage = useSendMessage()
  const { data: orgTree = [] } = useOrgUsersTree()

  const isAdminMode = !!adminReceivers

  // 전체 유저 목록 (Autocomplete 옵션)
  const userOptions = useMemo<ReceiverOption[]>(
    () => flattenUsers(orgTree).map((u) => ({
      id: u.id,
      name: u.name,
      department: u.department,
      position: u.position,
    })),
    [orgTree],
  )

  // 답장 등 수신자가 고정된 경우 초기값 세팅
  const initialOption = useMemo<ReceiverOption | null>(() => {
    if (!initialReceiverId) return null
    const found = userOptions.find((u) => u.id === initialReceiverId)
    return found ?? { id: initialReceiverId, name: initialReceiverName, department: '', position: '' }
  }, [initialReceiverId, initialReceiverName, userOptions])

  const [receiver,       setReceiver]       = useState<ReceiverOption | null>(initialOption)
  const [title,          setTitle]          = useState('')
  const [content,        setContent]        = useState('')
  const [errors,         setErrors]         = useState<{ receiver?: string; title?: string; content?: string }>({})
  const [sending,        setSending]        = useState(false)
  const [selectedAdmins, setSelectedAdmins] = useState<AdminReceiver[]>(adminReceivers ?? [])

  // open/mode 변경 시 초기화
  useEffect(() => {
    if (open) {
      setReceiver(initialOption)
      setTitle('')
      setContent('')
      setErrors({})
      setSelectedAdmins(adminReceivers ?? [])
    }
  }, [open, initialOption, adminReceivers])

  const validate = () => {
    const e: typeof errors = {}
    if (!isAdminMode && !receiver) e.receiver = '수신자를 선택해 주세요'
    if (!title.trim())      e.title   = '제목을 입력해 주세요'
    if (title.length > 200) e.title   = '제목은 200자 이하로 입력해 주세요'
    if (!content.trim())    e.content = '내용을 입력해 주세요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSend = async () => {
    if (!validate()) return

    if (isAdminMode && selectedAdmins.length > 0) {
      // 선택된 관리자에게 순차 발송
      setSending(true)
      try {
        for (const admin of selectedAdmins) {
          await new Promise<void>((resolve, reject) => {
            sendMessage.mutate(
              { receiverId: admin.id, title: title.trim(), content: content.trim() },
              { onSuccess: () => resolve(), onError: reject },
            )
          })
        }
        handleClose()
      } finally {
        setSending(false)
      }
    } else {
      sendMessage.mutate(
        { receiverId: receiver!.id, title: title.trim(), content: content.trim() },
        { onSuccess: () => handleClose() },
      )
    }
  }

  const handleClose = () => {
    setReceiver(initialOption)
    setTitle('')
    setContent('')
    setErrors({})
    onClose()
  }

  const isPending = sending || sendMessage.isPending

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: t.contentBg,
          backgroundImage: 'none',
          borderRadius: 3,
          border: `1px solid ${t.borderColor}`,
          boxShadow: t.dialogShadow,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1.5, borderBottom: `1px solid ${t.borderColor}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAdminMode
            ? <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '1.2rem', color: msgAccent.primary }} />
            : <SendIcon sx={{ fontSize: '1.2rem', color: msgAccent.primary }} />
          }
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: t.textPrimary }}>
            {isAdminMode ? '관리자에게 쪽지 보내기' : '쪽지 보내기'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
        {/* 수신자 영역 */}
        {isAdminMode ? (
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: t.textSecondary, mb: 0.75 }}>
              수신자 ({selectedAdmins.length}명)
              {selectedAdmins.length < (adminReceivers?.length ?? 0) && (
                <Typography component="span" sx={{ fontSize: '0.72rem', color: t.textSecondary, ml: 0.75, fontWeight: 400 }}>
                  — 일부 관리자가 제외되었습니다
                </Typography>
              )}
            </Typography>
            <Box
              sx={{
                display: 'flex', flexWrap: 'wrap', gap: 0.75, p: 1.25,
                borderRadius: 1.5, border: `1px solid ${t.borderColor}`,
                bgcolor: t.recipientListBg,
                minHeight: 44,
              }}
            >
              {selectedAdmins.length > 0
                ? selectedAdmins.map((a) => (
                    <Chip
                      key={a.id}
                      label={a.name}
                      size="small"
                      onDelete={() => setSelectedAdmins((prev) => prev.filter((x) => x.id !== a.id))}
                      sx={{
                        fontSize: '0.73rem', fontWeight: 600,
                        bgcolor: t.adminChipBg,
                        color: t.adminChipColor,
                        border: `1px solid ${t.adminChipBorder}`,
                        '& .MuiChip-deleteIcon': {
                          color: t.adminChipDelColor,
                          '&:hover': { color: t.adminChipColor },
                        },
                      }}
                    />
                  ))
                : (
                  <Typography sx={{ fontSize: '0.78rem', color: t.textSecondary }}>
                    수신자가 없습니다 (모두 제외됨)
                  </Typography>
                )
              }
            </Box>
          </Box>
        ) : (
          <Autocomplete
            options={userOptions}
            value={receiver}
            onChange={(_, v) => { setReceiver(v); setErrors((prev) => ({ ...prev, receiver: undefined })) }}
            disabled={!!initialReceiverId}
            getOptionLabel={(o) => `${o.name} (${o.department})`}
            isOptionEqualToValue={(a, b) => a.id === b.id}
            renderOption={(props, o) => (
              <Box component="li" {...props} key={o.id}>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>
                    {o.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: t.textSecondary }}>
                    {o.department} · {o.position}
                  </Typography>
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="수신자"
                size="small"
                error={!!errors.receiver}
                helperText={errors.receiver ?? (receiver ? `사번: ${receiver.id}` : '이름 또는 부서로 검색')}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: t.textFieldBg } }}
              />
            )}
            noOptionsText="검색 결과가 없습니다"
            sx={{ width: '100%' }}
          />
        )}

        <TextField
          label="제목"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })) }}
          error={!!errors.title}
          helperText={errors.title ?? `${title.length}/200`}
          size="small"
          fullWidth
          inputProps={{ maxLength: 200 }}
          sx={{ '& .MuiOutlinedInput-root': { bgcolor: t.textFieldBg } }}
        />
        <TextField
          label="내용"
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((prev) => ({ ...prev, content: undefined })) }}
          error={!!errors.content}
          helperText={errors.content}
          multiline
          rows={5}
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { bgcolor: t.textFieldBg } }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5, gap: 1, borderTop: `1px solid ${t.borderColor}` }}>
        <Button
          onClick={handleClose}
          size="small"
          sx={{
            color: t.textSecondary,
            '&:hover': { bgcolor: t.cancelBtnHoverBg },
          }}
        >
          취소
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          size="small"
          disabled={isPending || (isAdminMode && selectedAdmins.length === 0)}
          startIcon={isPending ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : <SendIcon />}
          sx={{
            bgcolor: msgAccent.primary,
            color: '#fff',
            fontWeight: 600,
            boxShadow: t.sendBtnShadow,
            '&:hover': {
              bgcolor: '#4f46e5',
              boxShadow: t.sendBtnHoverShadow,
            },
            '&.Mui-disabled': {
              bgcolor: t.sendDisabledBg,
              color: 'rgba(255,255,255,0.6)',
            },
          }}
        >
          {isPending
            ? '전송 중...'
            : isAdminMode
            ? `관리자 ${selectedAdmins.length}명에게 보내기`
            : '보내기'
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
