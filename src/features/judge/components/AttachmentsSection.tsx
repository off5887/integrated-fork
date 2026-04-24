// src/routes/Judge/components/AttachmentsSection.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Box, Button, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'
import type { Attachment } from '@/api/types/judge'

interface Props {
  attachments: Attachment[]
}

export default function AttachmentsSection({ attachments }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: theme.sectionNumBg, color: theme.sectionNumColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          5
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          첨부 자료
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3, borderRadius: 2.5,
          bgcolor: theme.attachmentPanelBg,
          border: `1px dashed ${theme.attachmentPanelBorder}`,
        }}
      >
        {attachments.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {attachments.map((file) => (
              <Button
                key={file.url}
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
                  borderColor: theme.attachmentBtnBorder,
                  color: theme.attachmentBtnColor,
                  '&:hover': {
                    borderColor: theme.primaryIconColor,
                    bgcolor: theme.attachmentBtnHoverBg,
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
            <AttachFileIcon sx={{ color: colors.textSecondary, fontSize: '1.75rem', mb: 1, opacity: 0.4 }} />
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              첨부된 자료가 없습니다
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
