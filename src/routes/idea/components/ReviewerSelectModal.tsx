// src/routes/idea/components/ReviewerSelectModal.tsx
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useThemeMode } from '../../../context/ThemeContext'
import { REVIEWERS } from '../../../api/mock/idea'

interface Props {
  open: boolean
  onClose: () => void
  selected: string[]
  onToggle: (name: string) => void
}

export default function ReviewerSelectModal({ open, onClose, selected, onToggle }: Props) {
  const { isDarkMode } = useThemeMode()
  const [search, setSearch] = useState('')

  const textPrimary   = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor   = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return REVIEWERS
    return REVIEWERS.filter(
      (r) => r.name.includes(q) || r.dept.includes(q) || r.position.toLowerCase().includes(q),
    )
  }, [search])

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.98)' : '#ffffff',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode
              ? '0 24px 64px rgba(0,0,0,0.6)'
              : '0 24px 64px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)',
          },
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

      {/* 헤더 */}
      <Box
        sx={{
          px: 2.5, pt: 2, pb: 1.75,
          display: 'flex', alignItems: 'center', gap: 1.25,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 32, height: 32, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <PersonAddIcon sx={{ fontSize: '1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography fontWeight={700} sx={{ color: textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}>
            심사자 선택
          </Typography>
          {selected.length > 0 && (
            <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600 }}>
              {selected.length}명 선택됨
            </Typography>
          )}
        </Box>
        <IconButton size="small" onClick={handleClose} sx={{ color: textSecondary, flexShrink: 0 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 2, pb: 0 }}>
        {/* 검색 */}
        <TextField
          fullWidth
          size="small"
          placeholder="이름, 부서, 직무로 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
              fontSize: '0.875rem',
              '& fieldset': { borderColor },
              '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.35)' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiInputBase-input': {
              color: textPrimary,
              WebkitTextFillColor: textPrimary,
              '&::placeholder': { color: textSecondary, opacity: 1 },
            },
          }}
        />

        {/* 목록 */}
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', gap: 0.75,
            maxHeight: 340, overflowY: 'auto', pr: 0.25, mb: 2,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
              borderRadius: 9999,
            },
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode
              ? 'rgba(99,102,241,0.25) transparent'
              : 'rgba(99,102,241,0.2) transparent',
          }}
        >
          {filtered.length === 0 ? (
            <Box sx={{ py: 5, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: textSecondary }}>
                검색 결과가 없습니다
              </Typography>
            </Box>
          ) : (
            filtered.map((r) => {
              const isSelected = selected.includes(r.name)
              return (
                <Box
                  key={r.id}
                  onClick={() => onToggle(r.name)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.25,
                    p: 1.25, borderRadius: 1.5, cursor: 'pointer',
                    border: `1px solid ${isSelected
                      ? isDarkMode ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)'
                      : borderColor}`,
                    bgcolor: isSelected
                      ? isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.05)'
                      : isDarkMode ? 'rgba(30,41,59,0.5)' : '#ffffff',
                    transition: 'all 0.12s ease',
                    '&:hover': {
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
                      borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 34, height: 34, flexShrink: 0,
                      bgcolor: isSelected
                        ? isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)'
                        : isDarkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)',
                      color: isSelected
                        ? isDarkMode ? '#a5b4fc' : '#4338ca'
                        : textSecondary,
                      fontSize: '0.8rem', fontWeight: 700,
                      border: `1px solid ${isSelected
                        ? isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'
                        : borderColor}`,
                    }}
                  >
                    {r.name[0]}
                  </Avatar>

                  <Box flex={1} minWidth={0}>
                    <Typography
                      sx={{
                        fontSize: '0.83rem', fontWeight: isSelected ? 700 : 600,
                        color: isSelected
                          ? isDarkMode ? '#a5b4fc' : '#4338ca'
                          : textPrimary,
                        lineHeight: 1.3,
                      }}
                    >
                      {r.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace' }}>
                      {r.dept} · {r.position}
                    </Typography>
                  </Box>

                  {isSelected && (
                    <CheckIcon sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca', flexShrink: 0 }} />
                  )}
                </Box>
              )
            })
          )}
        </Box>
      </DialogContent>

      {/* 하단 버튼 */}
      <Box
        sx={{
          px: 2.5, py: 2,
          borderTop: `1px solid ${borderColor}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          bgcolor: isDarkMode ? 'rgba(15,23,42,0.3)' : 'rgba(248,250,252,0.8)',
        }}
      >
        <Typography variant="caption" sx={{ color: textSecondary }}>
          {selected.length > 0 ? `${selected.length}명 선택됨` : '클릭하여 선택'}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleClose}
          sx={{
            borderRadius: 1.5, px: 3, py: 0.85,
            fontWeight: 700, fontSize: '0.82rem',
            textTransform: 'none', boxShadow: 'none',
            bgcolor: '#6366f1', color: '#fff',
            '&:hover': { bgcolor: '#4f46e5', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' },
          }}
        >
          완료
        </Button>
      </Box>
    </Dialog>
  )
}
