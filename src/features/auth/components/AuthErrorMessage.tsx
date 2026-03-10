// src/features/auth/components/AuthErrorMessage.tsx
import CloseIcon from '@mui/icons-material/Close'
import { Alert, AlertTitle, Box, Collapse, IconButton } from '@mui/material'
import { useState } from 'react'

interface AuthErrorMessageProps {
  message: string | null
  severity?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  onClose?: () => void
  autoHide?: boolean // true면 6초 후 자동 사라짐
}

export default function AuthErrorMessage({
  message,
  severity = 'error',
  title,
  onClose,
  autoHide = true,
}: AuthErrorMessageProps) {
  const [open, setOpen] = useState(!!message)

  if (!message) return null

  // autoHide 옵션 사용 시 6초 후 사라짐
  if (autoHide) {
    setTimeout(() => setOpen(false), 6000)
  }

  return (
    <Collapse in={open}>
      <Box sx={{ mb: 2 }}>
        <Alert
          severity={severity}
          action={
            onClose ? (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                  onClose?.()
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            ) : undefined
          }
          sx={{ borderRadius: 2 }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Box>
    </Collapse>
  )
}
