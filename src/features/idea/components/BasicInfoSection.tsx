// src/routes/idea/BasicInfoSection.tsx
import { Box, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { CATEGORIES } from '@/api/mock/idea'
import { getIdeaTheme } from '@/theme/ideaTheme'

interface Props {
  title: string
  setTitle: (v: string) => void
  categories: string[]
  setCategories: (v: string[]) => void
  problem: string
  setProblem: (v: string) => void
  solution: string
  setSolution: (v: string) => void
  inputSx: SxProps<Theme>
  labelSx: SxProps<Theme>
}

export default function BasicInfoSection({
  title,
  setTitle,
  categories,
  setCategories,
  problem,
  setProblem,
  solution,
  setSolution,
  inputSx,
  labelSx,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, categoryCardBg } = getIdeaTheme(isDarkMode)

  const handleToggle = (id: string) => {
    if (categories.includes(id)) {
      setCategories(categories.filter((c) => c !== id))
    } else {
      setCategories([...categories, id])
    }
  }

  const isEmpty = categories.length === 0

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
          {/* 레이블 행 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem' }}>
              카테고리
            </Typography>
            <Box
              component="span"
              sx={{
                fontSize: '0.68rem',
                color: '#ef4444',
                bgcolor: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 1,
                px: 0.75, py: 0.2,
                fontWeight: 600,
              }}
            >
              필수 · 1개 이상
            </Box>
            {categories.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#10b981' }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                  {categories.length}개 선택
                </Typography>
              </Box>
            )}
          </Box>

          {/* 카테고리 카드 그리드 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(7, 1fr)' },
              gap: 1,
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = categories.includes(cat.id)
              return (
                <Box
                  key={cat.id}
                  onClick={() => handleToggle(cat.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={cat.label}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleToggle(cat.id)
                    }
                  }}
                  sx={{
                    position: 'relative',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 0.75,
                    py: 1.5, px: 0.5,
                    borderRadius: 2.5,
                    border: `1.5px solid ${isSelected ? cat.border : borderColor}`,
                    bgcolor: isSelected
                      ? cat.bg
                      : categoryCardBg,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.18s ease',
                    outline: 'none',
                    boxShadow: isSelected
                      ? `0 2px 12px ${cat.bg}, inset 0 0 0 1px ${cat.border}`
                      : isDarkMode
                        ? 'none'
                        : '0 1px 3px rgba(0,0,0,0.05)',
                    '&:hover': {
                      bgcolor: cat.bg,
                      borderColor: cat.border,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 16px ${cat.bg}`,
                    },
                    '&:active': { transform: 'translateY(0px)' },
                    '&:focus-visible': {
                      outline: `2px solid ${cat.color}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {/* 선택 체크 배지 */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute', top: 5, right: 5,
                        width: 15, height: 15, borderRadius: '50%',
                        bgcolor: cat.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontWeight: 900,
                        lineHeight: 1,
                        boxShadow: `0 1px 4px ${cat.border}`,
                      }}
                    >
                      ✓
                    </Box>
                  )}

                  {/* 이모지 */}
                  <Box
                    component="span"
                    sx={{
                      fontSize: '1.5rem',
                      lineHeight: 1,
                      filter: isSelected ? 'none' : (isDarkMode ? 'grayscale(20%)' : 'grayscale(10%)'),
                      transition: 'filter 0.18s ease',
                    }}
                    aria-hidden
                  >
                    {cat.emoji}
                  </Box>

                  {/* 레이블 */}
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? cat.color : textSecondary,
                      lineHeight: 1,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.id}
                  </Typography>
                </Box>
              )
            })}
          </Box>

          {/* 미선택 에러 */}
          {isEmpty && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#ef4444', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#ef4444' }}>
                카테고리를 1개 이상 선택해주세요
              </Typography>
            </Box>
          )}
        </Box>

        {/* 문제점 도출 */}
        <TextField
          fullWidth
          label="문제점 도출"
          multiline
          minRows={3}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          required
          slotProps={{
            input: { sx: { ...inputSx, '& textarea': { resize: 'vertical', minHeight: '76px' } } },
            inputLabel: { sx: labelSx },
          }}
        />

        {/* 해결 대안 */}
        <TextField
          fullWidth
          label="해결 대안"
          multiline
          minRows={3}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          required
          slotProps={{
            input: { sx: { ...inputSx, '& textarea': { resize: 'vertical', minHeight: '76px' } } },
            inputLabel: { sx: labelSx },
          }}
        />
      </Box>
    </Box>
  )
}