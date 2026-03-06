// src/routes/idea/ScheduleAndVisibilitySection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

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
    p: { xs: 2.5, md: 3 },
    borderRadius: 2.5,
    bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.09)'}`,
  }

  // 날짜 입력 전용 스타일 (잘림/눈에 띄지 않는 문제 해결 중심)
  const dateInputSx = {
    ...inputSx,
    '& .MuiInputBase-root': {
      borderRadius: '12px',
      height: '56px', // 높이 확보
      background: isDarkMode ? 'rgba(30,41,59,0.55)' : 'rgba(241,245,249,0.85)',
    },
    '& .MuiInputBase-input': {
      padding: '14px 16px 14px 52px !important', // 왼쪽 크게 → 아이콘 + 텍스트 여유
      fontSize: '1.00rem', // 숫자 더 크게
      fontWeight: 500,
      color: textPrimary,
      letterSpacing: '0.03em',
    },
    '& .MuiInputLabel-root': {
      ...labelSx,
      transform: 'translate(14px, 16px) scale(1)',
      fontSize: '0.95rem',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
        color: '#6366f1',
        fontWeight: 600,
      },
    },
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            bgcolor: '#6366f1',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          3
        </Box>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: textPrimary, letterSpacing: '-0.01em' }}
        >
          실행 일정 & 공개 범위
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        {/* 실행 일정 패널 */}
        <Box sx={panelBase}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}
          >
            <CalendarTodayIcon sx={{ color: '#6366f1', fontSize: '1.3rem' }} />
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
            >
              실행 일정
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
            }}
          >
            {/* 시작일 */}
            <TextField
              label="시작일"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true, sx: labelSx }}
              InputProps={{
                sx: dateInputSx,
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon
                      sx={{
                        fontSize: '1.4rem',
                        color: startDate ? '#6366f1' : textSecondary,
                        opacity: startDate ? 1 : 0.65,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: startDate ? '#6366f1 !important' : textSecondary,
                  fontWeight: startDate ? 600 : 400,
                },
              }}
            />

            {/* 종료일 */}
            <TextField
              label="종료일"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true, sx: labelSx }}
              InputProps={{
                sx: dateInputSx,
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon
                      sx={{
                        fontSize: '1.4rem',
                        color: endDate ? '#6366f1' : textSecondary,
                        opacity: endDate ? 1 : 0.65,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: endDate ? '#6366f1 !important' : textSecondary,
                  fontWeight: endDate ? 600 : 400,
                },
              }}
            />
          </Box>
        </Box>

        {/* 공개 범위 패널 */}
        <Box sx={panelBase}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}
          >
            <PublicIcon sx={{ color: '#6366f1', fontSize: '1.3rem' }} />
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
            >
              공개 범위
            </Typography>
          </Box>

          <FormControl>
            <RadioGroup
              value={security}
              onChange={(e) =>
                setSecurity(e.target.value as 'public' | 'private')
              }
              sx={{ gap: 1.5 }}
            >
              {[
                {
                  value: 'public',
                  label: '전체 공개',
                  icon: <PublicIcon sx={{ fontSize: '1.1rem' }} />,
                },
                {
                  value: 'private',
                  label: '전체 미공개',
                  icon: <LockIcon sx={{ fontSize: '1.1rem' }} />,
                },
              ].map((opt) => {
                const isSelected = security === opt.value
                return (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: textSecondary,
                          '&.Mui-checked': { color: '#6366f1' },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box
                          sx={{
                            color: isSelected ? '#6366f1' : textSecondary,
                            display: 'flex',
                            opacity: isSelected ? 1 : 0.85,
                          }}
                        >
                          {opt.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.92rem',
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected
                              ? isDarkMode
                                ? '#c7d2fe'
                                : '#4338ca'
                              : textPrimary,
                          }}
                        >
                          {opt.label}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      m: 0,
                      px: 2,
                      py: 1.2,
                      borderRadius: 2.5,
                      bgcolor: isSelected
                        ? isDarkMode
                          ? 'rgba(99,102,241,0.14)'
                          : 'rgba(99,102,241,0.08)'
                        : 'transparent',
                      border: isSelected
                        ? `1px solid ${
                            isDarkMode
                              ? 'rgba(99,102,241,0.28)'
                              : 'rgba(99,102,241,0.20)'
                          }`
                        : `1px solid ${isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(203,213,225,0.3)'}`,
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        bgcolor: isDarkMode
                          ? 'rgba(99,102,241,0.08)'
                          : 'rgba(99,102,241,0.05)',
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
  )
}
