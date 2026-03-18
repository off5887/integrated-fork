import DeleteIcon from '@mui/icons-material/Delete'
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import { SelectedReviewer } from '@/api/types/reviewer'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { levelConfig } from '../../config/levelConfig'

interface Props {
  selected: SelectedReviewer[]
  onLevelChange: (id: string, newLevel: 1 | 2 | 3) => void
  onDelete: (id: string) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetLevel: 1 | 2 | 3) => void
}

const SelectedReviewersPanel: React.FC<Props> = ({
  selected,
  onLevelChange,
  onDelete,
  onDrop,
}) => {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

  const byLevel = (level: 1 | 2 | 3) => selected.filter((r) => r.level === level)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {([1, 2, 3] as const).map((level) => {
        const reviewers = byLevel(level)
        const cfg = levelConfig[level]

        return (
          <Box
            key={level}
            sx={{
              borderRadius: 2.5,
              border: `1px solid ${borderColor}`,
              overflow: 'hidden',
            }}
          >
            {/* 레벨 헤더 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 1.5,
                bgcolor: cfg.bg(isDarkMode),
                borderBottom: `1px solid ${borderColor}`,
                borderLeft: `3px solid ${cfg.accent}`,
              }}
            >
              <Box
                sx={{
                  width: 22, height: 22, borderRadius: '50%',
                  bgcolor: cfg.accent,
                  color: st.primaryBtnColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 800, flexShrink: 0,
                  fontFamily: 'monospace',
                }}
              >
                {level}
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary, flex: 1, fontSize: '0.82rem' }}>
                {cfg.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: cfg.chipColor(isDarkMode),
                  bgcolor: cfg.chipBg(isDarkMode),
                  border: `1px solid ${cfg.border(isDarkMode)}`,
                  px: 1.25, py: 0.3,
                  borderRadius: 9999,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                }}
              >
                {reviewers.length}명
              </Typography>
            </Box>

            {/* 드롭 존 */}
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, level)}
              sx={{
                minHeight: 90,
                p: 1.5,
                bgcolor: st.dropZoneBg,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {reviewers.length === 0 ? (
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1.5px dashed ${cfg.border(isDarkMode)}`,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: cfg.bg(isDarkMode),
                      borderStyle: 'solid',
                    },
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.8 }}>
                    여기에 드래그해서 추가하세요
                  </Typography>
                </Box>
              ) : (
                reviewers.map((reviewer) => (
                  <Box
                    key={reviewer.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      bgcolor: st.reviewerItemBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 2,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: cfg.bg(isDarkMode),
                        borderColor: cfg.border(isDarkMode),
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32, height: 32,
                        bgcolor: cfg.avatarBg(isDarkMode),
                        color: cfg.avatarColor(isDarkMode),
                        fontSize: '0.8rem', fontWeight: 700,
                        border: `1px solid ${cfg.border(isDarkMode)}`,
                        flexShrink: 0,
                      }}
                    >
                      {reviewer.name[0]}
                    </Avatar>

                    <Box flex={1} minWidth={0}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary, fontSize: '0.82rem', lineHeight: 1.3 }}>
                        {reviewer.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.72rem', fontFamily: 'monospace' }}>
                        {reviewer.position} · {reviewer.department}
                      </Typography>
                    </Box>

                    <Select
                      value={reviewer.level}
                      onChange={(e) => onLevelChange(reviewer.id, e.target.value as 1 | 2 | 3)}
                      size="small"
                      sx={{
                        width: 80,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: cfg.chipColor(isDarkMode),
                        bgcolor: cfg.chipBg(isDarkMode),
                        borderRadius: 1.5,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: cfg.border(isDarkMode),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: cfg.accent,
                        },
                        '& .MuiSelect-icon': { color: cfg.chipColor(isDarkMode) },
                      }}
                    >
                      <MenuItem value={1}>1차</MenuItem>
                      <MenuItem value={2}>2차</MenuItem>
                      <MenuItem value={3}>3차</MenuItem>
                    </Select>

                    <IconButton
                      size="small"
                      onClick={() => onDelete(reviewer.id)}
                      sx={{
                        color: textSecondary,
                        opacity: 0.6,
                        '&:hover': {
                          color: st.deleteHoverColor,
                          opacity: 1,
                          bgcolor: st.deleteHoverBg,
                        },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default SelectedReviewersPanel
