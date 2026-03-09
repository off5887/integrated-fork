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
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          1
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          기본 정보
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          fullWidth
          label="상상 제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          slotProps={{
            input: { sx: inputSx },
            inputLabel: { sx: labelSx },
          }}
        />
        <TextField
          fullWidth
          label="문제점 도출"
          multiline
          rows={5}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          required
          slotProps={{
            input: { sx: inputSx },
            inputLabel: { sx: labelSx },
          }}
        />
        <TextField
          fullWidth
          label="해결 대안"
          multiline
          rows={5}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          required
          slotProps={{
            input: { sx: inputSx },
            inputLabel: { sx: labelSx },
          }}
        />
      </Box>
    </Box>
  )
}
