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
import { useMsgTheme, msgAccent } from '@/theme/messageTheme'

interface ReceiverOption {
  id: string
  name: string
  department: string
  position: string
}

interface MessageComposeDialogProps {
  open: boolean
  /** 답장 시 수신자 고정 */
  initialReceiverId?: string
  initialReceiverName?: string
  /** 관리자 일괄 수신 모드 — 이 값이 있으면 수신자 칩 목록으로 미리 채움 */
  adminReceivers?: { id: string; name: string }[]
  onClose: () => void
}

export default function MessageComposeDialog({
  open,
  initialReceiverId = '',
  initialReceiverName = '',
  adminReceivers,
  onClose,
}: MessageComposeDialogProps) {
  const t = useMsgTheme()
  const sendMessage = useSendMessage()
  const { data: orgTree = [] } = useOrgUsersTree()

  const isReplyMode = !!initialReceiverId
  const isAdminMode = !!adminReceivers

  const userOptions = useMemo<ReceiverOption[]>(
    () => flattenUsers(orgTree).map((u) => ({
      id: u.id,
      name: u.name,
      department: u.department,
      position: u.position,
    })),
    [orgTree],
  )

  const buildInitialReceivers = (): ReceiverOption[] => {
    if (isReplyMode) {
      const found = userOptions.find((u) => u.id === initialReceiverId)
      return [found ?? { id: initialReceiverId, name: initialReceiverName, department: '', position: '' }]
    }
    if (adminReceivers) {
      return adminReceivers.map((a) => {
        const found = userOptions.find((u) => u.id === a.id)
        return found ?? { id: a.id, name: a.name, department: '', position: '' }
      })
    }
    return []
  }

  const [receivers, setReceivers] = useState<ReceiverOption[]>(buildInitialReceivers)
  const [title,     setTitle]     = useState('')
  const [content,   setContent]   = useState('')
  const [errors,    setErrors]    = useState<{ receivers?: string; title?: string; content?: string }>({})

  useEffect(() => {
    if (open) {
      setReceivers(buildInitialReceivers())
      setTitle('')
      setContent('')
      setErrors({})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialReceiverId, adminReceivers])

  const validate = () => {
    const e: typeof errors = {}
    if (receivers.length === 0) e.receivers = '수신자를 한 명 이상 선택해 주세요'
    if (!title.trim())           e.title     = '제목을 입력해 주세요'
    if (title.length > 200)      e.title     = '제목은 200자 이하로 입력해 주세요'
    if (!content.trim())         e.content   = '내용을 입력해 주세요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSend = () => {
    if (!validate()) return
    sendMessage.mutate(
      { receiverIds: receivers.map((r) => r.id), title: title.trim(), content: content.trim() },
      { onSuccess: () => handleClose() },
    )
  }

  const handleClose = () => {
    setReceivers(buildInitialReceivers())
    setTitle('')
    setContent('')
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="message-compose-dialog-title"
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
          <Typography id="message-compose-dialog-title" sx={{ fontWeight: 700, fontSize: '1rem', color: t.textPrimary }}>
            {isAdminMode ? '관리자에게 쪽지 보내기' : '쪽지 보내기'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
        {/* 수신자 */}
        <Autocomplete
          multiple
          options={userOptions}
          value={receivers}
          onChange={(_, v) => { setReceivers(v); setErrors((p) => ({ ...p, receivers: undefined })) }}
          disabled={isReplyMode}
          getOptionLabel={(o) => `${o.name} (${o.department})`}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          renderOption={(props, o) => (
            <Box component="li" {...props} key={o.id}>
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>{o.name}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: t.textSecondary }}>{o.department} · {o.position}</Typography>
              </Box>
            </Box>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index })
              return (
                <Chip
                  key={key}
                  label={option.name}
                  size="small"
                  {...tagProps}
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
              )
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={`수신자${receivers.length > 0 ? ` (${receivers.length}명)` : ''}`}
              size="small"
              error={!!errors.receivers}
              helperText={errors.receivers ?? (isReplyMode ? '답장 대상은 변경할 수 없습니다' : '이름 또는 부서로 검색')}
              sx={{ '& .MuiOutlinedInput-root': { bgcolor: t.textFieldBg } }}
            />
          )}
          noOptionsText="검색 결과가 없습니다"
          sx={{ width: '100%' }}
        />

        <TextField
          label="제목"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: undefined })) }}
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
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: undefined })) }}
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
          sx={{ color: t.textSecondary, '&:hover': { bgcolor: t.cancelBtnHoverBg } }}
        >
          취소
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          size="small"
          disabled={sendMessage.isPending || receivers.length === 0}
          startIcon={sendMessage.isPending ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : <SendIcon />}
          sx={{
            bgcolor: msgAccent.primary,
            color: '#fff',
            fontWeight: 600,
            boxShadow: t.sendBtnShadow,
            '&:hover': { bgcolor: '#4f46e5', boxShadow: t.sendBtnHoverShadow },
            '&.Mui-disabled': { bgcolor: t.sendDisabledBg, color: 'rgba(255,255,255,0.6)' },
          }}
        >
          {sendMessage.isPending
            ? '전송 중...'
            : receivers.length > 1
            ? `${receivers.length}명에게 보내기`
            : '보내기'
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
