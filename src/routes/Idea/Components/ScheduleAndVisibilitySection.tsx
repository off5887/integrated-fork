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
    flex: 1, minWidth: 0, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
    bgcolor: isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
    border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.09)'}`,
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
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

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* 실행 일정 */}
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
            <CalendarTodayIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
              실행 일정
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <TextField
              label="시작일"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: labelSx },
                input: {
                  sx: inputSx,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon fontSize="small" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="종료일"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: labelSx },
                input: {
                  sx: inputSx,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon fontSize="small" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Box>

        {/* 공개 범위 */}
        <Box sx={panelBase}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
            <PublicIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
              공개 범위
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              value={security}
              onChange={(e) => setSecurity(e.target.value as 'public' | 'private')}
              sx={{ gap: 1 }}
            >
              {[
                { value: 'public', label: '전체 공개', icon: <PublicIcon sx={{ fontSize: '1rem' }} /> },
                { value: 'private', label: '전체 미공개', icon: <LockIcon sx={{ fontSize: '1rem' }} /> },
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box sx={{ color: isSelected ? '#6366f1' : textSecondary, display: 'flex' }}>
                          {opt.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? (isDarkMode ? '#c7d2fe' : '#4338ca') : (isDarkMode ? '#e2e8f0' : '#1e293b'),
                          }}
                        >
                          {opt.label}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      m: 0,
                      px: 1.5, py: 1,
                      borderRadius: 2,
                      bgcolor: isSelected
                        ? (isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)')
                        : 'transparent',
                      border: `1px solid ${isSelected ? (isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)') : 'transparent'}`,
                      transition: 'all 0.15s ease',
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
