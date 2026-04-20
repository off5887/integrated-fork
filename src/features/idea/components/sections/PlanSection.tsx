// src/features/idea/components/sections/PlanSection.tsx
// 실행 계획 · 실행 일정 · 기대 성과 입력 섹션
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import { Box, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { useIdeaTheme } from '@/theme/ideaTheme'

interface PlanSectionProps {
  plan: string
  setPlan: (value: string) => void
  startDate: string
  setStartDate: (value: string) => void
  endDate: string
  setEndDate: (value: string) => void
  expectedOutcome: string
  setExpectedOutcome: (value: string) => void
  fieldErrors?: { startDate?: boolean; endDate?: boolean; plan?: boolean; expectedOutcome?: boolean }
}

function calcDuration(start: string, end: string): string | null {
  if (!start || !end) return null
  const s = new Date(start)
  const e = new Date(end)
  const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return null
  if (diff === 0) return '당일'
  if (diff < 7) return `${diff}일`
  if (diff < 30) return `약 ${Math.round(diff / 7)}주`
  if (diff < 365) return `약 ${Math.round(diff / 30)}개월`
  return `약 ${Math.round(diff / 365)}년`
}

export default function PlanSection({
  plan,
  setPlan,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  expectedOutcome,
  setExpectedOutcome,
  fieldErrors,
}: PlanSectionProps) {
  const { isDarkMode } = useThemeMode()
  const it = useIdeaTheme()
  const { textPrimary, textSecondary } = it

  const duration = calcDuration(startDate, endDate)

  const textareaSx = {
    width: '100%',
    resize: 'vertical' as const,
    p: 2,
    borderRadius: 2,
    border: `1px solid ${it.inputBorder}`,
    bgcolor: it.inputBg,
    color: textPrimary,
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    lineHeight: 1.7,
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
    '&::placeholder': { color: textSecondary },
    '&:hover': { borderColor: it.inputHoverBorder },
    '&:focus': {
      borderColor: it.accent.color,
      borderWidth: '1.5px',
      boxShadow: `0 0 0 3px ${it.accent.bgStrong}`,
    },
  }

  const dateInputSx = {
    width: '100%',
    border: 'none',
    outline: 'none',
    bgcolor: 'transparent',
    color: textPrimary,
    fontSize: '0.95rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    colorScheme: isDarkMode ? 'dark' : 'light',
    '&::-webkit-calendar-picker-indicator': {
      cursor: 'pointer',
      opacity: isDarkMode ? 0.85 : 0.5,
      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none',
    },
  }

  return (
    <Box>
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
          실행 계획
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

        {/* 실행 일정 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem' }}>
              실행 일정
            </Typography>
            {duration && (
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  px: 1, py: 0.25, borderRadius: '999px',
                  bgcolor: it.accent.bg,
                  border: `1px solid ${it.accent.border}`,
                }}
              >
                <EventAvailableIcon sx={{ fontSize: '0.7rem', color: it.accent.color }} />
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: it.accent.color }}>
                  {duration}
                </Typography>
              </Box>
            )}
          </Box>

          {/* 날짜 범위 카드 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              border: `1px solid ${(fieldErrors?.startDate || fieldErrors?.endDate) ? '#ef4444' : it.inputBorder}`,
              borderRadius: 2.5,
              bgcolor: it.inputBg,
              overflow: 'hidden',
              transition: 'border-color 0.15s ease',
              '&:focus-within': {
                borderColor: it.accent.color,
                boxShadow: `0 0 0 3px ${it.accent.bgStrong}`,
              },
            }}
          >
            {/* 시작일 */}
            <Box
              sx={{
                flex: 1, p: 2,
                display: 'flex', flexDirection: 'column', gap: 0.75,
                borderRight: { xs: 'none', sm: `1px solid ${it.inputBorder}` },
                borderBottom: { xs: `1px solid ${it.inputBorder}`, sm: 'none' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CalendarMonthIcon sx={{ fontSize: '0.8rem', color: it.accent.color }} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: it.accent.color, letterSpacing: '0.03em' }}>
                  시작일
                </Typography>
              </Box>
              <Box
                component="input"
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                sx={dateInputSx}
              />
              {startDate && (
                <Typography sx={{ fontSize: '0.7rem', color: textSecondary }}>
                  {new Date(startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
                </Typography>
              )}
            </Box>

            {/* 구분선 — 화살표 */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center', justifyContent: 'center',
                px: 1.5, flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  px: 1.25, py: 0.5, borderRadius: '999px',
                  bgcolor: it.accent.bg,
                  border: `1px solid ${it.accent.border}`,
                }}
              >
                <Box sx={{ width: 16, height: 1.5, bgcolor: it.accent.color, borderRadius: 1 }} />
                <Box
                  sx={{
                    width: 0, height: 0,
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderLeft: `5px solid ${it.accent.color}`,
                  }}
                />
              </Box>
            </Box>

            {/* 종료일 */}
            <Box
              sx={{
                flex: 1, p: 2,
                display: 'flex', flexDirection: 'column', gap: 0.75,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CalendarMonthIcon sx={{ fontSize: '0.8rem', color: it.accent.color }} />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: it.accent.color, letterSpacing: '0.03em' }}>
                  종료일
                </Typography>
              </Box>
              <Box
                component="input"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                sx={dateInputSx}
              />
              {endDate && (
                <Typography sx={{ fontSize: '0.7rem', color: textSecondary }}>
                  {new Date(endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
          {fieldErrors?.startDate && !fieldErrors?.endDate && (
            <Typography sx={{ fontSize: '0.75rem', color: '#ef4444', mt: 0.75, fontWeight: 600 }}>시작일을 입력해주세요.</Typography>
          )}
          {fieldErrors?.endDate && !fieldErrors?.startDate && (
            <Typography sx={{ fontSize: '0.75rem', color: '#ef4444', mt: 0.75, fontWeight: 600 }}>
              {!endDate ? '종료일을 입력해주세요.' : '종료일은 시작일 이후여야 합니다.'}
            </Typography>
          )}
          {fieldErrors?.startDate && fieldErrors?.endDate && (
            <Typography sx={{ fontSize: '0.75rem', color: '#ef4444', mt: 0.75, fontWeight: 600 }}>시작일과 종료일을 모두 입력해주세요.</Typography>
          )}

        {/* 실행 내용 */}
        <Box>
          <Typography sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem', mb: 1.5 }}>
            실행 내용
          </Typography>
          <Box
            component="textarea"
            value={plan}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlan(e.target.value)}
            placeholder="구체적인 실행 계획을 작성해주세요"
            rows={5}
            sx={{ ...textareaSx, ...(fieldErrors?.plan ? { borderColor: '#ef4444' } : {}) }}
          />
          {fieldErrors?.plan && (
            <Typography sx={{ fontSize: '0.75rem', color: '#ef4444', mt: 0.75, fontWeight: 600 }}>실행 내용을 입력해주세요.</Typography>
          )}
        </Box>

        {/* 기대 성과 */}
        <Box>
          <Typography sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem', mb: 1.5 }}>
            기대 성과
          </Typography>
          <Box
            component="textarea"
            value={expectedOutcome}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExpectedOutcome(e.target.value)}
            placeholder="이 아이디어를 실행했을 때 기대되는 성과나 효과를 작성해주세요"
            rows={4}
            sx={{ ...textareaSx, ...(fieldErrors?.expectedOutcome ? { borderColor: '#ef4444' } : {}) }}
          />
          {fieldErrors?.expectedOutcome && (
            <Typography sx={{ fontSize: '0.75rem', color: '#ef4444', mt: 0.75, fontWeight: 600 }}>기대 성과를 입력해주세요.</Typography>
          )}
        </Box>

      </Box>
    </Box>
  )
}
