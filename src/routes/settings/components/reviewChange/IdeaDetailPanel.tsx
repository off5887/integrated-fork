import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import SaveIcon from '@mui/icons-material/Save'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Avatar,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { OrgMember } from '@/api/types/reviewer'
import { levelConfig } from '../../config/levelConfig'
import { statusConfig, ALL_STATUSES } from '../../config/statusConfig'
import type { Idea, IdeaStatus } from '../../types'
import { mockReviewerPools } from '@/api/mock/settings'

interface Props {
  idea: Idea
  changingLevel: 1 | 2 | 3 | null
  onStatusChange: (status: IdeaStatus) => void
  onReviewerChange: (level: 1 | 2 | 3, reviewer: OrgMember | null) => void
  onChangingLevel: (level: 1 | 2 | 3 | null) => void
  onSave: () => void
}

export default function IdeaDetailPanel({
  idea,
  changingLevel,
  onStatusChange,
  onReviewerChange,
  onChangingLevel,
  onSave,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, headerBg } = usePageColors()
  const panelBg = isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff'

  return (
    <Box
      sx={{
        bgcolor: panelBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* 패널 헤더 — 아이디어 정보 */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LightbulbOutlinedIcon
            sx={{ fontSize: '1.1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }}
          />
        </Box>
        <Box flex={1} minWidth={0}>
          <Typography
            sx={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: textPrimary,
              lineHeight: 1.35,
            }}
          >
            {idea.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.4 }}>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>
              {idea.submitter}
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: textSecondary, opacity: 0.5 }}>
              ·
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>
              {idea.department}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: textSecondary, opacity: 0.5, ml: 'auto', fontFamily: 'monospace' }}>
              {idea.submittedAt}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* 진행 상태 변경 */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            border: `1px solid ${borderColor}`,
            bgcolor: isDarkMode ? 'rgba(15,23,42,0.3)' : '#ffffff',
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{
              color: textSecondary,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: '0.68rem',
              display: 'block',
              mb: 1.5,
            }}
          >
            진행 상태
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={idea.status}
              sx={{
                fontWeight: 700,
                fontSize: '0.78rem',
                bgcolor: statusConfig[idea.status].bg(isDarkMode),
                color: statusConfig[idea.status].color,
                border: `1px solid ${statusConfig[idea.status].border(isDarkMode)}`,
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 200 }}>
              <Typography sx={{ fontSize: '0.72rem', color: textSecondary }}>
                변경:
              </Typography>
              <Select
                value={idea.status}
                onChange={(e) => onStatusChange(e.target.value as IdeaStatus)}
                size="small"
                sx={{
                  flex: 1,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: textPrimary,
                  bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : '#f8fafc',
                  borderRadius: 1.5,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6366f1',
                  },
                  '& .MuiSelect-icon': { color: textSecondary },
                }}
              >
                {ALL_STATUSES.map((s) => (
                  <MenuItem key={s} value={s} sx={{ fontSize: '0.82rem' }}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>

        {/* 심사자 변경 — 레벨별 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {([1, 2, 3] as const).map((level) => {
            const cfg = levelConfig[level]
            const currentReviewer = idea.reviewers[`level${level}`]
            const pool = mockReviewerPools[level]
            const isChanging = changingLevel === level

            return (
              <Box
                key={level}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${isChanging ? cfg.border(isDarkMode) : borderColor}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.15s ease',
                }}
              >
                {/* 레벨 헤더 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    bgcolor: cfg.bg(isDarkMode),
                    borderBottom: `1px solid ${borderColor}`,
                    borderLeft: `3px solid ${cfg.accent}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      bgcolor: cfg.accent,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      fontFamily: 'monospace',
                    }}
                  >
                    {level}
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ color: textPrimary, flex: 1, fontSize: '0.82rem' }}
                  >
                    {cfg.label}
                  </Typography>
                  <Button
                    size="small"
                    variant={isChanging ? 'contained' : 'outlined'}
                    startIcon={
                      isChanging ? (
                        <CloseIcon sx={{ fontSize: '0.85rem !important' }} />
                      ) : (
                        <SwapHorizIcon sx={{ fontSize: '0.85rem !important' }} />
                      )
                    }
                    onClick={() =>
                      onChangingLevel(isChanging ? null : level)
                    }
                    sx={{
                      borderRadius: 9999,
                      px: 1.75,
                      py: 0.4,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      minWidth: 0,
                      ...(isChanging
                        ? {
                            bgcolor: cfg.accent,
                            color: '#fff',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: cfg.accent, opacity: 0.88, boxShadow: 'none' },
                          }
                        : {
                            borderColor: cfg.border(isDarkMode),
                            color: cfg.chipColor(isDarkMode),
                            '&:hover': {
                              bgcolor: cfg.bg(isDarkMode),
                              borderColor: cfg.accent,
                            },
                          }),
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isChanging ? '취소' : '변경'}
                  </Button>
                </Box>

                {/* 현재 심사자 */}
                <Box sx={{ px: 2, py: 1.5, bgcolor: isDarkMode ? 'rgba(15,23,42,0.25)' : '#ffffff' }}>
                  {currentReviewer ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor: cfg.avatarBg(isDarkMode),
                          color: cfg.avatarColor(isDarkMode),
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          border: `1px solid ${cfg.border(isDarkMode)}`,
                          flexShrink: 0,
                        }}
                      >
                        {currentReviewer.name[0]}
                      </Avatar>
                      <Box flex={1} minWidth={0}>
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: textPrimary,
                            lineHeight: 1.3,
                          }}
                        >
                          {currentReviewer.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.72rem',
                            color: textSecondary,
                            fontFamily: 'monospace',
                          }}
                        >
                          {currentReviewer.position} · {currentReviewer.department}
                        </Typography>
                      </Box>
                      <Chip
                        label={cfg.label}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          bgcolor: cfg.chipBg(isDarkMode),
                          color: cfg.chipColor(isDarkMode),
                          border: `1px solid ${cfg.border(isDarkMode)}`,
                          '& .MuiChip-label': { px: 0.75 },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{ color: textSecondary, opacity: 0.65 }}
                    >
                      배정된 심사자 없음
                    </Typography>
                  )}
                </Box>

                {/* 심사자 선택 패널 (변경 버튼 클릭 시 펼쳐짐) */}
                {isChanging && (
                  <Box
                    sx={{
                      borderTop: `1px dashed ${cfg.border(isDarkMode)}`,
                      px: 2,
                      py: 1.5,
                      bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,250,252,0.8)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{
                        color: textSecondary,
                        fontSize: '0.68rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      {cfg.label} 목록에서 선택
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      {pool.map((reviewer) => {
                        const isCurrent = currentReviewer?.id === reviewer.id
                        return (
                          <Box
                            key={reviewer.id}
                            onClick={() => onReviewerChange(level, reviewer)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.25,
                              p: 1.25,
                              borderRadius: 1.5,
                              border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
                              bgcolor: isCurrent
                                ? cfg.bg(isDarkMode)
                                : isDarkMode
                                ? 'rgba(30,41,59,0.5)'
                                : '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.12s ease',
                              '&:hover': {
                                bgcolor: cfg.bg(isDarkMode),
                                borderColor: cfg.border(isDarkMode),
                              },
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: isCurrent
                                  ? cfg.avatarBg(isDarkMode)
                                  : isDarkMode
                                  ? 'rgba(30,41,59,0.8)'
                                  : 'rgba(241,245,249,0.9)',
                                color: isCurrent
                                  ? cfg.avatarColor(isDarkMode)
                                  : textSecondary,
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
                                flexShrink: 0,
                              }}
                            >
                              {reviewer.name[0]}
                            </Avatar>
                            <Box flex={1} minWidth={0}>
                              <Typography
                                sx={{
                                  fontSize: '0.8rem',
                                  fontWeight: isCurrent ? 700 : 600,
                                  color: isCurrent
                                    ? cfg.chipColor(isDarkMode)
                                    : textPrimary,
                                  lineHeight: 1.3,
                                }}
                              >
                                {reviewer.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '0.68rem',
                                  color: textSecondary,
                                  fontFamily: 'monospace',
                                }}
                              >
                                {reviewer.position} · {reviewer.department}
                              </Typography>
                            </Box>
                            {isCurrent && (
                              <CheckIcon
                                sx={{
                                  fontSize: '1rem',
                                  color: cfg.accent,
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            )
          })}
        </Box>

        {/* 저장 버튼 */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={onSave}
            sx={{
              borderRadius: 9999,
              px: 3,
              py: 0.9,
              fontWeight: 700,
              fontSize: '0.82rem',
              textTransform: 'none',
              bgcolor: '#6366f1',
              color: '#fff',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#4f46e5',
                boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
