// src/routes/idea/components/FileUploadSection.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { getIdeaTheme } from '../../../theme/ideaTheme'

interface FileUploadSectionProps {
  files: File[]
  filePreviews: string[]
  onFilesChange: (newFiles: File[]) => void
  onRemoveFile: (index: number) => void
  isDarkMode: boolean
}

export default function FileUploadSection({
  files,
  filePreviews,
  onFilesChange,
  onRemoveFile,
  isDarkMode,
}: FileUploadSectionProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    onFilesChange([...files, ...Array.from(e.target.files)])
  }

  const openPreview = (index: number) => {
    if (files[index]?.type.startsWith('image/') && filePreviews[index]) {
      setSelectedIndex(index)
      setPreviewOpen(true)
    }
  }

  const closePreview = () => {
    setPreviewOpen(false)
    setSelectedIndex(null)
  }

  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)

  return (
    <>
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

        {/* 업로드 영역 */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
            border: `1px dashed ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.18)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: files.length > 0 ? 3 : 0 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<AttachFileIcon sx={{ fontSize: '1rem' }} />}
              size="small"
              sx={{
                borderRadius: 1.5,
                px: 2.5, py: 0.9,
                fontWeight: 600,
                fontSize: '0.82rem',
                borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                '&:hover': {
                  borderColor: '#6366f1',
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                },
              }}
            >
              파일 첨부
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              여러 파일을 한 번에 선택할 수 있습니다
            </Typography>
          </Box>

          {files.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {files.map((file, index) => {
                const isImage = file.type.startsWith('image/')
                const previewUrl = filePreviews[index]
                return (
                  <Box
                    key={index}
                    onClick={() => isImage && openPreview(index)}
                    sx={{
                      position: 'relative',
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: `1px solid ${borderColor}`,
                      bgcolor: isDarkMode ? 'rgba(22,30,46,0.8)' : '#f8fafc',
                      boxShadow: isDarkMode ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.2s ease',
                      cursor: isImage ? 'zoom-in' : 'default',
                      '&:hover': {
                        transform: isImage ? 'scale(1.04)' : undefined,
                        boxShadow: isDarkMode ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    {previewUrl ? (
                      <img src={previewUrl} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Box
                        sx={{
                          height: '100%', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center', p: 1.5, gap: 0.75,
                        }}
                      >
                        <InsertDriveFileIcon sx={{ color: textSecondary, fontSize: '2rem' }} />
                        <Typography variant="caption" sx={{ color: textSecondary, textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.2 }} noWrap>
                          {file.name}
                        </Typography>
                      </Box>
                    )}

                    {isImage && (
                      <Box
                        sx={{
                          position: 'absolute', inset: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          bgcolor: 'rgba(0,0,0,0.45)',
                          opacity: 0, transition: 'opacity 0.2s',
                          pointerEvents: 'none',
                          '&:hover': { opacity: 1 },
                        }}
                      >
                        <ZoomInIcon sx={{ color: '#fff', fontSize: 36 }} />
                      </Box>
                    )}

                    <IconButton
                      size="small"
                      onClick={(e) => { e.stopPropagation(); onRemoveFile(index) }}
                      sx={{
                        position: 'absolute', top: 4, right: 4,
                        width: 22, height: 22,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        '&:hover': { bgcolor: 'rgba(239,68,68,0.9)' },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '0.75rem' }} />
                    </IconButton>
                  </Box>
                )
              })}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" sx={{ color: textSecondary }}>
                아직 첨부된 파일이 없습니다
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* 이미지 미리보기 모달 */}
      <Dialog
        open={previewOpen}
        onClose={closePreview}
        maxWidth="xl"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'rgba(0,0,0,0.94)',
              borderRadius: 3,
              boxShadow: '0 0 80px rgba(0,0,0,0.9)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <IconButton
          onClick={closePreview}
          size="small"
          sx={{
            position: 'absolute', top: 12, right: 12,
            color: '#fff', bgcolor: 'rgba(0,0,0,0.5)', zIndex: 10,
            '&:hover': { bgcolor: 'rgba(239,68,68,0.85)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          {selectedIndex !== null && filePreviews[selectedIndex] && (
            <img
              src={filePreviews[selectedIndex]}
              alt={files[selectedIndex]?.name || 'Preview'}
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }}
            />
          )}
        </DialogContent>

        {selectedIndex !== null && (
          <Box sx={{ p: 2, textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
            {files[selectedIndex]?.name}
          </Box>
        )}
      </Dialog>
    </>
  )
}
