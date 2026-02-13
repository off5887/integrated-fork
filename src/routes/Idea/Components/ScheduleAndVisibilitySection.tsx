// src/routes/idea/ScheduleAndVisibilitySection.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
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
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 4,
          color: isDarkMode ? '#60a5fa' : '#2563eb',
        }}
      >
        3. 실행 일정 & 공개 범위
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 5 },
        }}
      >
        {/* 실행 일정 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
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
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}
            >
              <CalendarTodayIcon
                sx={{ color: isDarkMode ? '#93c5fd' : '#1d4ed8' }}
                fontSize="medium"
              />
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
              >
                실행 일정
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 3, sm: 2 },
                mt: 1,
              }}
            >
              <TextField
                label="시작일"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    ...labelSx,
                    color: isDarkMode ? '#94a3b8' : '#475569',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#60a5fa' : '#3b82f6',
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    ...inputSx,
                    bgcolor: isDarkMode
                      ? 'rgba(30,41,59,0.88)'
                      : 'rgba(255,255,255,0.97)',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon
                        fontSize="small"
                        sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="종료일"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    ...labelSx,
                    color: isDarkMode ? '#94a3b8' : '#475569',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#60a5fa' : '#3b82f6',
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    ...inputSx,
                    bgcolor: isDarkMode
                      ? 'rgba(30,41,59,0.88)'
                      : 'rgba(255,255,255,0.97)',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon
                        fontSize="small"
                        sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Box>

        {/* 공개 범위 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
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
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  color: isDarkMode ? '#cbd5e1' : '#334155',
                  mb: 2.5,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                공개 범위
              </FormLabel>

              <RadioGroup
                value={security}
                onChange={(e) =>
                  setSecurity(e.target.value as 'public' | 'private')
                }
                sx={{
                  gap: { xs: 3, sm: 4 },
                  pl: 1,
                }}
              >
                <FormControlLabel
                  value="public"
                  control={
                    <Radio
                      sx={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        '&.Mui-checked': {
                          color: isDarkMode ? '#60a5fa' : '#2563eb',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: isDarkMode ? '#e2e8f0' : '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      전체 공개
                    </Typography>
                  }
                />

                <FormControlLabel
                  value="private"
                  control={
                    <Radio
                      sx={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        '&.Mui-checked': {
                          color: isDarkMode ? '#60a5fa' : '#2563eb',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: isDarkMode ? '#e2e8f0' : '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      전체 미공개
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
