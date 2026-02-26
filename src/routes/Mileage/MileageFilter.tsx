// src/routes/MileageFilter.tsx
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useThemeMode } from '../../context/ThemeContext'

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
  const isDarkMode = useThemeMode().isDarkMode

  const inputSx = {
    '& .MuiInputBase-root': { bgcolor: isDarkMode ? '#1e293b' : '#fff' },
    '& .MuiInputBase-input': { color: isDarkMode ? '#f1f5f9' : '#0f172a' },
    '& .MuiInputLabel-root': { color: isDarkMode ? '#cbd5e1' : '#475569' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? '#475569' : '#94a3b8',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? '#94a3b8' : '#64748b',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode ? '#818cf8' : '#6366f1',
    },
  }

  return (
    <Box sx={{ mb: 6, display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
      <DatePicker
        label="시작 날짜"
        value={startDate}
        onChange={setStartDate}
        slotProps={{ textField: { sx: { ...inputSx, minWidth: 180 } } }}
      />
      <DatePicker
        label="종료 날짜"
        value={endDate}
        onChange={setEndDate}
        slotProps={{ textField: { sx: { ...inputSx, minWidth: 180 } } }}
      />
      <TextField
        label="지급내역 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        sx={{
          ...inputSx,
          minWidth: 240,
          flex: 1,
          maxWidth: { xs: '100%', sm: 320 },
        }}
      />
    </Box>
  )
}
