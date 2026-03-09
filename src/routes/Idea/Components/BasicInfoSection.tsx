// src/routes/idea/BasicInfoSection.tsx
import { Box, TextField, Typography } from '@mui/material'

interface CategoryOption {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  border: string
}

const CATEGORIES: CategoryOption[] = [
  { id: '절감', label: '절감 아이디어', emoji: '💰', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)' },
  { id: '혁신', label: '혁신 아이디어', emoji: '🚀', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.35)' },
  { id: '안전', label: '안전 아이디어', emoji: '🛡️', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)' },
  { id: '복지', label: '복지 아이디어', emoji: '❤️', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.35)' },
  { id: '품질', label: '품질 아이디어', emoji: '⭐', color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.35)' },
  { id: '환경', label: '환경 아이디어', emoji: '🌿', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.35)' },
  { id: '기타', label: '기타', emoji: '📌', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)' },
]

interface Props {
  title: string
  setTitle: (v: string) => void
  category: string
  setCategory: (v: string) => void
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
  category,
  setCategory,
  problem,
  setProblem,
  solution,
  setSolution,
  inputSx,
  labelSx,
  isDarkMode,
}: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

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
        {/* 제목 */}
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

        {/* 카테고리 선택 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem' }}
            >
              카테고리
            </Typography>
            <Box
              component="span"
              sx={{
                fontSize: '0.68rem',
                color: textSecondary,
                bgcolor: isDarkMode ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.1)',
                border: `1px solid ${borderColor}`,
                borderRadius: 1,
                px: 0.75,
                py: 0.2,
                fontWeight: 500,
              }}
            >
              선택 사항
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id
              return (
                <Box
                  key={cat.id}
                  onClick={() => setCategory(isSelected ? '' : cat.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setCategory(isSelected ? '' : cat.id)
                    }
                  }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.5,
                    py: 0.7,
                    borderRadius: 2,
                    border: `1px solid ${isSelected ? cat.border : borderColor}`,
                    bgcolor: isSelected
                      ? cat.bg
                      : isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,0.8)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    '&:hover': {
                      bgcolor: cat.bg,
                      borderColor: cat.border,
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${cat.color}`,
                      outlineOffset: 2,
                    },
                    boxShadow: isSelected
                      ? `0 2px 8px ${cat.bg}`
                      : 'none',
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: '0.9rem', lineHeight: 1, flexShrink: 0 }}
                    aria-hidden
                  >
                    {cat.emoji}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? cat.color : textSecondary,
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.label}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* 문제점 도출 */}
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

        {/* 해결 대안 */}
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
