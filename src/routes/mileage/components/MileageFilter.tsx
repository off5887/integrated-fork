// src/routes/MileageFilter.tsx
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useThemeMode } from '../../../context/ThemeContext'

interface Props {
  startDate: Dayjs | null
  setStartDate: (date: Dayjs | null) => void
  endDate: Dayjs | null
  setEndDate: (date: Dayjs | null) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function MileageFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchTerm,
  setSearchTerm,
}: Props) {
  const { isDarkMode } = useThemeMode()

  const borderColor = isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(203,213,225,0.5)'
  const inputBg = isDarkMode ? 'rgba(22,30,46,0.8)' : '#ffffff'
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const focusBorder = '#6366f1'

  const inputSx = {
    '& .MuiInputBase-root': {
      bgcolor: inputBg,
      borderRadius: 2,
    },
    '& .MuiInputBase-input': { color: textPrimary, fontSize: '0.875rem' },
    '& .MuiInputLabel-root': { color: textSecondary, fontSize: '0.875rem' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? 'rgba(148,163,184,0.18)' : 'rgba(203,213,225,0.7)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.5)',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focusBorder,
      borderWidth: '1.5px',
    },
    '& .MuiSvgIcon-root': { color: textSecondary },
  }

  return (
    <Box
      sx={{
        mb: 4,
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: isDarkMode ? 'rgba(148,163,184,0.04)' : 'rgba(248,250,252,0.9)',
        border: `1px solid ${borderColor}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: textSecondary,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          display: 'block',
          mb: 2,
        }}
      >
        기간 및 검색
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <DatePicker
          label="시작 날짜"
          value={startDate}
          onChange={setStartDate}
          slotProps={{
            textField: { sx: { ...inputSx, minWidth: 170 }, size: 'small' },
          }}
        />
        <DatePicker
          label="종료 날짜"
          value={endDate}
          onChange={setEndDate}
          slotProps={{
            textField: { sx: { ...inputSx, minWidth: 170 }, size: 'small' },
          }}
        />
        <TextField
          label="지급내역 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1.1rem', color: textSecondary }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ...inputSx,
            minWidth: 220,
            flex: 1,
            maxWidth: { xs: '100%', sm: 320 },
          }}
        />
      </Box>
    </Box>
  )
}
