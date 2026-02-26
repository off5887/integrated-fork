// src/routes/Judge/components/AttachmentsSection.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile'
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
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <AttachFileIcon sx={{ color: accent, fontSize: 24 }} />
        <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
          첨부 자료
        </Typography>
      </Box>

      {attachments.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {attachments.map((file, idx) => (
            <Button
              key={idx}
              variant="outlined"
              startIcon={<AttachFileIcon />}
              onClick={() => window.open(file.url, '_blank')}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                py: 1,
                px: 3,
                borderColor: isDarkMode ? '#475569' : '#cbd5e1',
                color: isDarkMode ? '#cbd5e1' : '#475569',
                fontWeight: 500,
                '&:hover': {
                  borderColor: accent,
                  color: accent,
                  bgcolor: isDarkMode
                    ? 'rgba(129,140,248,0.08)'
                    : 'rgba(99,102,241,0.06)',
                },
              }}
            >
              {file.name}
            </Button>
          ))}
        </Box>
      ) : (
        <Typography
          sx={{
            color: isDarkMode ? '#94a3b8' : '#64748b',
            fontStyle: 'italic',
            fontSize: '1.05rem',
          }}
        >
          첨부된 자료가 없습니다
        </Typography>
      )}
    </Box>
  )
}
