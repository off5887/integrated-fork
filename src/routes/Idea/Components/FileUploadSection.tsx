// src/routes/idea/components/FileUploadSection.tsx
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

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
  const theme = useTheme()

  // 미리보기 모달 상태
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    onFilesChange([...files, ...newFiles])
  }

  const openPreview = (index: number) => {
    // 이미지 파일만 미리보기 열기
    if (files[index]?.type.startsWith('image/') && filePreviews[index]) {
      setSelectedIndex(index)
      setPreviewOpen(true)
    }
  }

  const closePreview = () => {
    setPreviewOpen(false)
    setSelectedIndex(null)
  }

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 4,
            color: isDarkMode ? '#60a5fa' : '#2563eb',
          }}
        >
          5. 첨부 자료
        </Typography>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            bgcolor: isDarkMode
              ? 'rgba(30,41,59,0.85)'
              : 'rgba(255,255,255,0.94)',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)'}`,
            boxShadow: isDarkMode
              ? '0 10px 40px rgba(0,0,0,0.4)'
              : '0 10px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Button
            component="label"
            variant="contained"
            startIcon={<AttachFileIcon />}
            sx={{
              mb: 4,
              borderRadius: 3,
              px: { xs: 4, md: 6 },
              py: 1.6,
              fontWeight: 600,
              fontSize: '1.05rem',
              bgcolor: isDarkMode ? '#475569' : '#64748b',
              color: '#ffffff',
              '&:hover': {
                bgcolor: isDarkMode ? '#64748b' : '#475569',
                boxShadow: isDarkMode
                  ? '0 6px 20px rgba(100,116,139,0.4)'
                  : '0 6px 20px rgba(71,85,105,0.3)',
              },
            }}
          >
            파일 첨부 (여러 개 가능)
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>

          {files.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
              {files.map((file, index) => {
                const isImage = file.type.startsWith('image/')
                const previewUrl = filePreviews[index]

                return (
                  <Box
                    key={index}
                    onClick={() => isImage && openPreview(index)}
                    sx={{
                      position: 'relative',
                      width: 160,
                      height: 160,
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'}`,
                      bgcolor: isDarkMode ? 'rgba(30,41,59,0.88)' : '#f8fafc',
                      boxShadow: isDarkMode
                        ? '0 4px 16px rgba(0,0,0,0.35)'
                        : '0 4px 16px rgba(0,0,0,0.08)',
                      transition: 'all 0.25s ease',
                      cursor: isImage ? 'zoom-in' : 'default',
                      '&:hover': {
                        transform: isImage ? 'scale(1.04)' : undefined,
                        boxShadow: isDarkMode
                          ? '0 12px 32px rgba(0,0,0,0.5)'
                          : '0 12px 32px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={file.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 2,
                          textAlign: 'center',
                          bgcolor: isDarkMode
                            ? 'rgba(15,23,42,0.4)'
                            : 'rgba(241,245,249,0.6)',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDarkMode ? '#cbd5e1' : '#475569',
                            fontWeight: 500,
                          }}
                          noWrap
                        >
                          {file.name}
                        </Typography>
                      </Box>
                    )}

                    {/* 확대 아이콘 오버레이 (이미지만) */}
                    {isImage && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(0,0,0,0.45)',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          pointerEvents: 'none',
                          '&:hover': { opacity: 1 },
                        }}
                      >
                        <ZoomInIcon sx={{ color: '#fff', fontSize: 60 }} />
                      </Box>
                    )}

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation() // 모달 열리는 것 방지
                        onRemoveFile(index)
                      }}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: isDarkMode
                          ? 'rgba(0,0,0,0.7)'
                          : 'rgba(0,0,0,0.65)',
                        color: '#ffffff',
                        '&:hover': {
                          bgcolor: 'rgba(239,68,68,0.9)',
                          transform: 'scale(1.15)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )
              })}
            </Box>
          ) : (
            <Box
              sx={{
                py: 6,
                textAlign: 'center',
                color: isDarkMode ? '#94a3b8' : '#64748b',
              }}
            >
              <Typography variant="body1" fontWeight={500}>
                아직 첨부된 파일이 없습니다
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                버튼을 눌러 자료를 추가해 주세요
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* 이미지 미리보기 모달 */}
      <Dialog
        open={previewOpen}
        onClose={closePreview}
        maxWidth="xl"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'rgba(0,0,0,0.92)',
            borderRadius: 3,
            boxShadow: '0 0 80px rgba(0,0,0,0.9)',
            overflow: 'hidden',
          },
        }}
      >
        <IconButton
          onClick={closePreview}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
            '&:hover': {
              bgcolor: 'rgba(239,68,68,0.9)',
            },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          {selectedIndex !== null && filePreviews[selectedIndex] && (
            <img
              src={filePreviews[selectedIndex]}
              alt={files[selectedIndex]?.name || 'Preview'}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 12,
              }}
            />
          )}
        </DialogContent>

        {/* 하단 파일명 (옵션) */}
        {selectedIndex !== null && (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              color: '#ddd',
              fontSize: '0.95rem',
            }}
          >
            {files[selectedIndex]?.name}
          </Box>
        )}
      </Dialog>
    </>
  )
}
