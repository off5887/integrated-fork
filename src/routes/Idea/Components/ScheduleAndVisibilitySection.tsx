// src/routes/idea/ScheduleAndVisibilitySection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

interface Props {
  startDate: string
  setStartDate: (v: string) => void
  endDate: string
  setEndDate: (v: string) => void
  security: 'public' | 'private'
  setSecurity: (v: 'public' | 'private') => void
  inputSx: any
  labelSx: any
  isDarkMode: boolean
}

export default function ScheduleAndVisibilitySection({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  security,
  setSecurity,
  inputSx,
  labelSx,
  isDarkMode,
}: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  const panelBase = {
    flex: 1,
    minWidth: 0,
    p: { xs: 3, md: 3.5 },
    borderRadius: 3,
    bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.10)'}`,
    display: 'flex',
    flexDirection: 'column',
  }

  // 두 패널의 높이를 비슷하게 맞추기 위한 최소 높이
  const commonMinHeight = { xs: '280px', md: '320px', lg: '340px' }

  const dateFieldSx = {
    ...inputSx,
    '& .MuiInputBase-root': {
      borderRadius: '12px',
      height: '56px',
      background: isDarkMode ? 'rgba(30,41,59,0.55)' : 'rgba(241,245,249,0.85)',
    },
    '& .MuiInputBase-input': {
      fontSize: '1rem',
      fontWeight: 500,
      color: textPrimary,
    },
    '& .MuiInputLabel-root': {
      ...labelSx,
      '&.MuiInputLabel-shrink': { color: '#6366f1', fontWeight: 600 },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode
        ? 'rgba(148,163,184,0.3)'
        : 'rgba(203,213,225,0.65)',
      borderWidth: '1.5px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '2px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '2.5px',
      boxShadow: `0 0 0 4px ${isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.15)'}`,
    },
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#6366f1',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 800,
            }}
          >
            3
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary }}>
            실행 일정 & 공개 범위
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            '& > *': { minHeight: commonMinHeight }, // 핵심: 두 패널 높이 강제 동기화
          }}
        >
          {/* 실행 일정 패널 */}
          <Box sx={panelBase}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}
            >
              <CalendarTodayIcon
                sx={{ color: '#6366f1', fontSize: '1.4rem' }}
              />
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{ color: textPrimary }}
              >
                실행 일정
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.25,
                mt: 1,
              }}
            >
              <DatePicker
                label="시작일"
                value={startDate ? dayjs(startDate) : null}
                onChange={(newValue) =>
                  setStartDate(newValue ? newValue.format('YYYY-MM-DD') : '')
                }
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { fullWidth: true, sx: dateFieldSx },
                  openPickerIcon: {
                    children: (
                      <CalendarTodayIcon
                        sx={{ color: startDate ? '#6366f1' : textSecondary }}
                      />
                    ),
                  },
                }}
              />

              <DatePicker
                label="종료일"
                value={endDate ? dayjs(endDate) : null}
                onChange={(newValue) =>
                  setEndDate(newValue ? newValue.format('YYYY-MM-DD') : '')
                }
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { fullWidth: true, sx: dateFieldSx },
                  openPickerIcon: {
                    children: (
                      <CalendarTodayIcon
                        sx={{ color: endDate ? '#6366f1' : textSecondary }}
                      />
                    ),
                  },
                }}
              />
            </Box>

            {/* 높이 채우기용 빈 공간 (필요 시) */}
            <Box sx={{ flex: 1, minHeight: '40px' }} />
          </Box>

          {/* 공개 범위 패널 */}
          <Box sx={panelBase}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}
            >
              <PublicIcon sx={{ color: '#6366f1', fontSize: '1.4rem' }} />
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{ color: textPrimary }}
              >
                공개 범위
              </Typography>
            </Box>

            <FormControl component="fieldset" sx={{ width: '100%', flex: 1 }}>
              <RadioGroup
                value={security}
                onChange={(e) =>
                  setSecurity(e.target.value as 'public' | 'private')
                }
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  justifyContent: 'center', // 중앙 정렬로 균형감
                }}
              >
                {[
                  { value: 'public', label: '전체 공개', icon: PublicIcon },
                  { value: 'private', label: '전체 미공개', icon: LockIcon },
                ].map((opt) => {
                  const isSelected = security === opt.value
                  const IconComponent = opt.icon

                  return (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={
                        <Radio
                          size="medium"
                          sx={{
                            color: textSecondary,
                            '&.Mui-checked': { color: '#6366f1' },
                            ml: 1,
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            flex: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.75,
                            }}
                          >
                            <IconComponent
                              sx={{
                                color: isSelected ? '#6366f1' : textSecondary,
                                fontSize: '1.5rem',
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: '1.05rem',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected
                                  ? isDarkMode
                                    ? '#c7d2fe'
                                    : '#4f46e5'
                                  : textPrimary,
                              }}
                            >
                              {opt.label}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      disableTypography
                      sx={{
                        m: 0,
                        width: '100%',
                        borderRadius: 2.5,
                        px: 3,
                        py: 2.2,
                        bgcolor: isSelected
                          ? isDarkMode
                            ? 'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(139,92,246,0.08))'
                            : 'linear-gradient(135deg, rgba(99,102,241,0.10), rgba(139,92,246,0.05))'
                          : 'transparent',
                        border: isSelected
                          ? `1px solid ${isDarkMode ? 'rgba(99,102,241,0.40)' : 'rgba(99,102,241,0.30)'}`
                          : `1px solid ${isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.40)'}`,
                        boxShadow: isSelected
                          ? '0 3px 14px rgba(99,102,241,0.12)'
                          : 'none',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: isDarkMode
                            ? 'rgba(99,102,241,0.09)'
                            : 'rgba(99,102,241,0.05)',
                          borderColor: '#6366f1',
                        },
                      }}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}
