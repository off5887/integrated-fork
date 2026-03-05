// src/routes/Judge/components/AttachmentsSection.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Box, Button, Typography } from '@mui/material'

interface Attachment {
  name: string
  url: string
}

interface Props {
  attachments: Attachment[]
  isDarkMode: boolean
}

export default function AttachmentsSection({ attachments, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          5
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          첨부 자료
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3, borderRadius: 2.5,
          bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
          border: `1px dashed ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.18)'}`,
        }}
      >
        {attachments.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {attachments.map((file, idx) => (
              <Button
                key={idx}
                variant="outlined"
                startIcon={<InsertDriveFileIcon sx={{ fontSize: '1rem' }} />}
                onClick={() => window.open(file.url, '_blank')}
                size="small"
                sx={{
                  borderRadius: 1.5,
                  textTransform: 'none',
                  py: 0.9, px: 2,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
                  color: isDarkMode ? '#a5b4fc' : '#4338ca',
                  '&:hover': {
                    borderColor: '#6366f1',
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                {file.name}
              </Button>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <AttachFileIcon sx={{ color: textSecondary, fontSize: '1.75rem', mb: 1, opacity: 0.4 }} />
            <Typography variant="body2" sx={{ color: textSecondary }}>
              첨부된 자료가 없습니다
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
