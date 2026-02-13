// src/routes/idea/BasicInfoSection.tsx
import { Box, TextField, Typography } from '@mui/material'

interface Props {
  title: string
  setTitle: (v: string) => void
  problem: string
  setProblem: (v: string) => void
  solution: string
  setSolution: (v: string) => void
  inputSx: any
  labelSx: any
  isDarkMode: boolean
}

export default function BasicInfoSection({
  title,
  setTitle,
  problem,
  setProblem,
  solution,
  setSolution,
  inputSx,
  labelSx,
  isDarkMode,
}: Props) {
  return (
    <>
      <Box sx={{ width: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 3,
            color: isDarkMode ? '#60a5fa' : '#2563eb',
            float: 'left',
          }}
        >
          1. 기본 정보
        </Typography>

        <TextField
          fullWidth
          label="상상 제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          InputProps={{ sx: inputSx }}
          InputLabelProps={{ sx: labelSx }}
        />

        <TextField
          fullWidth
          label="문제점 도출"
          multiline
          rows={5}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          required
          sx={{ mt: 3 }}
          InputProps={{ sx: inputSx }}
          InputLabelProps={{ sx: labelSx }}
        />

        <TextField
          fullWidth
          label="해결 대안"
          multiline
          rows={5}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          required
          sx={{ mt: 3 }}
          InputProps={{ sx: inputSx }}
          InputLabelProps={{ sx: labelSx }}
        />
      </Box>
    </>
  )
}
