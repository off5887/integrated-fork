// src/features/idea/components/sections/FileUploadSection.tsx
// 이미지·문서 첨부파일 업로드 및 미리보기 섹션
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import type { IdeaAttachment } from '@/api/types/idea'
import { useThemeMode } from '@/context/ThemeContext'
import { getIdeaTheme } from '@/theme/ideaTheme'
import { formatBytes } from '@/utils/fileUtils'

interface FileUploadSectionProps {
  files: File[]
  filePreviews: string[]
  onFilesChange: (newFiles: File[]) => void
  onRemoveFile: (index: number) => void
  existingAttachments?: IdeaAttachment[]
  onDeleteExisting?: (attachmentId: number) => void
}


export default function FileUploadSection({
  files,
  filePreviews,
  onFilesChange,
  onRemoveFile,
  existingAttachments = [],
  onDeleteExisting,
}: FileUploadSectionProps) {
  const { isDarkMode } = useThemeMode()
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

  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor, fileItemBg } = it
  const hasAny = existingAttachments.length > 0 || files.length > 0

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: it.accent.color, color: it.accent.btnColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
            }}
          >
            4
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
            bgcolor: it.accent.bg,
            border: `1px dashed ${it.accent.border}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: hasAny ? 3 : 0 }}>
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
                borderColor: it.accent.borderHover,
                color: it.accent.text,
                '&:hover': {
                  borderColor: it.accent.color,
                  bgcolor: it.accent.bgStrong,
                },
              }}
            >
              파일 첨부
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <Typography variant="caption" sx={{ color: textSecondary }}>
              파일당 최대 20MB · 전체 100MB
            </Typography>
          </Box>

          {!hasAny && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" sx={{ color: textSecondary }}>
                아직 첨부된 파일이 없습니다
              </Typography>
            </Box>
          )}

          {/* 기존 첨부파일 (수정 모드) */}
          {existingAttachments.length > 0 && (
            <Box sx={{ mb: files.length > 0 ? 2 : 0 }}>
              <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 600, mb: 1, display: 'block' }}>
                기존 첨부파일
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {existingAttachments.map((att) => (
                  <Box
                    key={att.attachmentId}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 2, py: 1,
                      borderRadius: 1.5,
                      bgcolor: fileItemBg,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <InsertDriveFileIcon sx={{ color: textSecondary, fontSize: '1.25rem', flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ color: textPrimary, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {att.originalName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: textSecondary }}>
                        {formatBytes(att.fileSize)}
                      </Typography>
                    </Box>
                    <Chip label="저장됨" size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: it.accent.bg, color: it.accent.text }} />
                    {onDeleteExisting && (
                      <IconButton
                        size="small"
                        onClick={() => onDeleteExisting(att.attachmentId)}
                        sx={{
                          width: 26, height: 26,
                          color: textSecondary,
                          '&:hover': { color: '#ef4444', bgcolor: 'rgba(239,68,68,0.08)' },
                        }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* 새로 추가한 파일 */}
          {files.length > 0 && (
            <Box>
              {existingAttachments.length > 0 && (
                <Typography variant="caption" sx={{ color: textSecondary, fontWeight: 600, mb: 1, display: 'block' }}>
                  새로 추가
                </Typography>
              )}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {files.map((file, index) => {
                  const isImage = file.type.startsWith('image/')
                  const previewUrl = filePreviews[index]
                  return (
                    <Box
                      key={`${file.name}-${index}`}
                      onClick={() => isImage && openPreview(index)}
                      sx={{
                        position: 'relative',
                        width: 120,
                        height: 120,
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: `1px solid ${borderColor}`,
                        bgcolor: fileItemBg,
                        boxShadow: it.fileItemShadow,
                        transition: 'all 0.2s ease',
                        cursor: isImage ? 'zoom-in' : 'default',
                        '&:hover': {
                          transform: isImage ? 'scale(1.04)' : undefined,
                          boxShadow: it.fileItemHoverShadow,
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
                            bgcolor: it.overlay.imageBg,
                            opacity: 0, transition: 'opacity 0.2s',
                            pointerEvents: 'none',
                            '&:hover': { opacity: 1 },
                          }}
                        >
                          <ZoomInIcon sx={{ color: it.overlay.iconColor, fontSize: 36 }} />
                        </Box>
                      )}

                      <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); onRemoveFile(index) }}
                        sx={{
                          position: 'absolute', top: 4, right: 4,
                          width: 22, height: 22,
                          bgcolor: it.overlay.deleteButtonBg,
                          color: it.overlay.iconColor,
                          '&:hover': { bgcolor: it.overlay.deleteButtonHoverBg },
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <CloseIcon sx={{ fontSize: '0.75rem' }} />
                      </IconButton>
                    </Box>
                  )
                })}
              </Box>
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
              bgcolor: it.overlay.previewDialogBg,
              borderRadius: 3,
              boxShadow: it.overlay.previewDialogShadow,
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
            color: it.overlay.iconColor, bgcolor: it.overlay.closeBg, zIndex: 10,
            '&:hover': { bgcolor: it.overlay.closeHoverBg },
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
          <Box sx={{ p: 2, textAlign: 'center', color: it.overlay.textColor, fontSize: '0.85rem' }}>
            {files[selectedIndex]?.name}
          </Box>
        )}
      </Dialog>
    </>
  )
}
