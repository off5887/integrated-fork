// src/routes/MileageFilter.tsx
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useThemeMode } from '@/context/ThemeContext'
import { getMileageTheme } from '@/theme/mileageTheme'

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
  const t = getMileageTheme(isDarkMode)

  const inputSx = {
    '& .MuiInputBase-root': {
      bgcolor: t.inputBg,
      borderRadius: 2,
    },
    '& .MuiInputBase-input': { color: t.textPrimary, fontSize: '0.875rem' },
    '& .MuiInputLabel-root': { color: t.textSecondary, fontSize: '0.875rem' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: t.inputBorderColor,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: t.inputHoverBorder,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '1.5px',
    },
    '& .MuiSvgIcon-root': { color: t.textSecondary },
  }

  return (
    <Box
      sx={{
        mb: 4,
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: t.filterBg,
        border: `1px solid ${t.borderColorStrict}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: t.textSecondary,
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
                  <SearchIcon sx={{ fontSize: '1.1rem', color: t.textSecondary }} />
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
