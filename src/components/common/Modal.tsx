// src/components/common/Modal.tsx
import CloseIcon from '@mui/icons-material/Close'
import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: number | string
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 520,
}: ModalProps) {
  if (!open) return null

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: 1400,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Fade in={open}>
        <Paper
          onClick={(e) => e.stopPropagation()}
          elevation={24}
          sx={{
            width: '100%',
            maxWidth,
            maxHeight: '90vh',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0,0,0,0.7)'
                : '0 20px 60px rgba(0,0,0,0.25)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 3,
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>{children}</Box>
        </Paper>
      </Fade>
    </Backdrop>
  )
}
