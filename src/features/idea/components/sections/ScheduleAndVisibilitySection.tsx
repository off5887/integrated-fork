// src/features/idea/components/sections/ScheduleAndVisibilitySection.tsx
// 제안 일정(시작일·마감일) 및 공개/비공개 설정 섹션
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PublicIcon from '@mui/icons-material/Public'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useThemeMode } from '@/context/ThemeContext'
import { useIdeaTheme } from '@/theme/ideaTheme'
import { VISIBILITY_OPTIONS } from '@/features/idea/config/visibilityOptions'

interface Props {
  startDate: string
  setStartDate: (v: string) => void
  endDate: string
  setEndDate: (v: string) => void
  security: 'public' | 'private'
  setSecurity: (v: 'public' | 'private') => void
  inputSx: SxProps<Theme>
  labelSx: SxProps<Theme>
}

export default function ScheduleAndVisibilitySection({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  security,
  setSecurity,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const it = useIdeaTheme()
  const { textPrimary, textSecondary, borderColor } = it

  // 기간 계산
  const start = startDate ? dayjs(startDate) : null
  const end = endDate ? dayjs(endDate) : null
  const isEndBeforeStart = start && end ? end.isBefore(start) : false
  const durationDays = start && end && !isEndBeforeStart ? end.diff(start, 'day') + 1 : null

  const dateFieldSx = {
    '& .MuiInputBase-root': {
      borderRadius: 2,
      backgroundColor: it.searchInputBg,
      height: 50,
    },
    '& .MuiPickersSectionList-root': {
      color: `${textPrimary} !important`,
    },
    '& .MuiPickersSectionList-section': {
      color: `${textPrimary} !important`,
    },
    '& .MuiPickersSectionList-sectionContent': {
      color: `${textPrimary} !important`,
    },
    '& .MuiPickersSectionList-separator': {
      color: `${textSecondary} !important`,
    },
    '& .MuiPickersSectionList-section[data-placeholder]': {
      color: `${textSecondary} !important`,
      opacity: 0.6,
    },
    '& .MuiInputBase-input': {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: `${textPrimary} !important`,
      WebkitTextFillColor: `${textPrimary} !important`,
    },
    '& .MuiInputLabel-root': {
      color: textSecondary,
      fontSize: '0.875rem',
      '&.Mui-focused': { color: it.accent.color },
      '&.MuiInputLabel-shrink': { color: it.accent.color, fontWeight: 600 },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: it.inputBorder,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: it.accent.borderHover,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: it.accent.color,
      borderWidth: '1.5px',
    },
    '& .MuiSvgIcon-root': { color: textSecondary },
    '& .MuiIconButton-root': { color: textSecondary },
  }

  const panelSx = {
    flex: 1,
    minWidth: 0,
    borderRadius: 2.5,
    border: `1px solid ${borderColor}`,
    bgcolor: it.panelBg,
    overflow: 'hidden',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        {/* 섹션 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: it.accent.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
            }}
          >
            3
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
            실행 일정 & 공개 범위
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2.5,
          }}
        >
          {/* ─── 실행 일정 패널 ───────────────────────────────────── */}
          <Box sx={panelSx}>
            {/* 패널 헤더 */}
            <Box
              sx={{
                px: 2.5,
                py: 1.75,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderBottom: `1px solid ${borderColor}`,
                bgcolor: it.accent.bg,
              }}
            >
              <CalendarMonthIcon sx={{ color: it.accent.color, fontSize: '1.1rem' }} />
              <Typography fontWeight={700} sx={{ color: textPrimary, fontSize: '0.9rem' }}>
                실행 일정
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                {durationDays !== null && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1.25,
                      py: 0.3,
                      borderRadius: 99,
                      bgcolor: it.accent.bgStrong,
                      border: `1px solid ${it.accent.border}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: it.accent.color }}>
                      {durationDays}일
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* 날짜 입력 */}
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DatePicker
                label="시작일"
                value={start}
                onChange={(v) => setStartDate(v ? v.format('YYYY-MM-DD') : '')}
                format="YYYY년 MM월 DD일"
                slotProps={{ textField: { fullWidth: true, sx: dateFieldSx } }}
              />

              {/* 방향 화살표 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: borderColor }} />
                <Box
                  sx={{
                    width: 28, height: 28, borderRadius: '50%',
                    bgcolor: it.accent.bgStrong,
                    border: `1px solid ${it.accent.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <SwapHorizIcon sx={{ fontSize: '0.9rem', color: it.accent.color }} />
                </Box>
                <Box sx={{ flex: 1, height: '1px', bgcolor: borderColor }} />
              </Box>

              <DatePicker
                label="종료일"
                value={end}
                onChange={(v) => setEndDate(v ? v.format('YYYY-MM-DD') : '')}
                format="YYYY년 MM월 DD일"
                minDate={start ?? undefined}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      ...dateFieldSx,
                      ...(isEndBeforeStart && {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${it.danger.color} !important`,
                        },
                      }),
                    },
                  },
                }}
              />

              {/* 기간 요약 또는 오류 */}
              {isEndBeforeStart && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: it.danger.bg,
                    border: `1px solid ${it.danger.border}`,
                  }}
                >
                  <WarningAmberIcon sx={{ fontSize: '0.9rem', color: it.danger.color, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.75rem', color: it.danger.color, fontWeight: 600 }}>
                    종료일이 시작일보다 앞설 수 없습니다
                  </Typography>
                </Box>
              )}

              {durationDays !== null && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    py: 1.25,
                    borderRadius: 2,
                    bgcolor: it.accent.bgHover,
                    border: `1px dashed ${it.accent.border}`,
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: '0.9rem', color: it.accent.color }} />
                  <Typography sx={{ fontSize: '0.8rem', color: it.accent.color, fontWeight: 600 }}>
                    {start!.format('M.D')} → {end!.format('M.D')} &nbsp;·&nbsp; 총 {durationDays}일
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* ─── 공개 범위 패널 ───────────────────────────────────── */}
          <Box sx={panelSx}>
            {/* 패널 헤더 */}
            <Box
              sx={{
                px: 2.5,
                py: 1.75,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderBottom: `1px solid ${borderColor}`,
                bgcolor: it.accent.bg,
              }}
            >
              <PublicIcon sx={{ color: it.accent.color, fontSize: '1.1rem' }} />
              <Typography fontWeight={700} sx={{ color: textPrimary, fontSize: '0.9rem' }}>
                공개 범위
              </Typography>
            </Box>

            {/* 선택 카드 */}
            <Box
              sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}
              role="radiogroup"
              aria-label="공개 범위 선택"
            >
              {VISIBILITY_OPTIONS.map((opt) => {
                const isSelected = security === opt.value
                const IconComp = opt.icon
                const accentBg = isDarkMode ? opt.accentBgDark : opt.accentBg
                const accentBorder = isDarkMode ? opt.accentBorderDark : opt.accentBorder

                return (
                  <Box
                    key={opt.value}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => setSecurity(opt.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSecurity(opt.value)
                      }
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2.5,
                      border: `1.5px solid ${isSelected ? accentBorder : borderColor}`,
                      bgcolor: isSelected ? accentBg : it.itemBg,
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected
                        ? `0 4px 16px ${opt.accentBg}`
                        : 'none',
                      '&:hover': {
                        bgcolor: accentBg,
                        borderColor: accentBorder,
                      },
                      '&:focus-visible': {
                        outline: `2px solid ${opt.accentColor}`,
                        outlineOffset: 2,
                      },
                    }}
                  >
                    {/* 아이콘 */}
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: isSelected ? accentBg : it.avatarBg,
                        border: `1px solid ${isSelected ? accentBorder : borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <IconComp
                        sx={{
                          fontSize: '1.4rem',
                          color: isSelected ? opt.accentColor : textSecondary,
                          transition: 'color 0.18s ease',
                        }}
                      />
                    </Box>

                    {/* 텍스트 */}
                    <Box flex={1} minWidth={0}>
                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? opt.accentColor : textPrimary,
                          lineHeight: 1.3,
                          mb: 0.3,
                          transition: 'color 0.18s ease',
                        }}
                      >
                        {opt.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: isSelected ? `${opt.accentColor}bb` : textSecondary,
                          lineHeight: 1.4,
                          transition: 'color 0.18s ease',
                        }}
                      >
                        {opt.description}
                      </Typography>
                    </Box>

                    {/* 선택 표시 */}
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? opt.accentColor : borderColor}`,
                        bgcolor: isSelected ? opt.accentColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            bgcolor: '#fff',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )
              })}

              {/* 선택 상태 요약 */}
              <Box
                sx={{
                  mt: 0.5,
                  px: 1.75,
                  py: 1.25,
                  borderRadius: 2,
                  bgcolor: it.subtleBg,
                  border: `1px dashed ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {security === 'public'
                  ? <PublicIcon sx={{ fontSize: '0.9rem', color: it.accent.color, flexShrink: 0 }} />
                  : <LockOpenIcon sx={{ fontSize: '0.9rem', color: it.purple.color, flexShrink: 0 }} />
                }
                <Typography sx={{ fontSize: '0.75rem', color: textSecondary, lineHeight: 1.4 }}>
                  {security === 'public'
                    ? '이 제안은 등록 후 모든 구성원에게 공개됩니다.'
                    : '이 제안은 등록 후 제안자와 심사자만 볼 수 있습니다.'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}
