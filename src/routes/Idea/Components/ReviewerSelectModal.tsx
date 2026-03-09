// src/routes/idea/components/ReviewerSelectModal.tsx
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import Modal from '../../../components/common/Modal'
import { useThemeMode } from '../../../context/ThemeContext'

const dummyReviewers = [
  {
    id: 1,
    name: '김디자인',
    dept: 'UX팀',
    position: 'UX Designer',
    avatar: '/avatars/1.jpg',
  },
  {
    id: 2,
    name: '박프로덕트',
    dept: '프로덕트팀',
    position: 'Product Manager',
    avatar: '/avatars/2.jpg',
  },
  {
    id: 3,
    name: '이개발',
    dept: '프론트엔드팀',
    position: 'Frontend Engineer',
    avatar: '/avatars/3.jpg',
  },
  {
    id: 4,
    name: '최마케팅',
    dept: '그로스팀',
    position: 'Growth Marketer',
    avatar: '/avatars/4.jpg',
  },
  {
    id: 5,
    name: '정기획',
    dept: '기획팀',
    position: 'Planner',
    avatar: '/avatars/5.jpg',
  },
  {
    id: 6,
    name: '윤서버',
    dept: '백엔드팀',
    position: 'Backend Engineer',
    avatar: '/avatars/6.jpg',
  },
  {
    id: 7,
    name: '한디렉터',
    dept: '디자인실',
    position: 'Design Director',
    avatar: '/avatars/7.jpg',
  },
]

interface ReviewerSelectModalProps {
  open: boolean
  onClose: () => void
  selected: string[]
  onToggle: (name: string) => void
}

export default function ReviewerSelectModal({
  open,
  onClose,
  selected,
  onToggle,
}: ReviewerSelectModalProps) {
  const { isDarkMode } = useThemeMode()
  const [search, setSearch] = useState('')

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode
    ? 'rgba(148,163,184,0.12)'
    : 'rgba(203,213,225,0.55)'
  const bgInput = isDarkMode ? 'rgba(15,23,42,0.45)' : 'rgba(248,250,252,0.85)'

  const inputSx = {
    bgcolor: bgInput,
    borderRadius: 2,
    color: textPrimary,
    '& .MuiInputBase-input': { color: textPrimary },
    '& .MuiInputBase-input::placeholder': {
      color: textSecondary,
      opacity: 0.7,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: borderColor,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDarkMode
        ? 'rgba(148,163,184,0.4)'
        : 'rgba(148,163,184,0.6)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '1.5px',
    },
  }

  const filtered = dummyReviewers.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase()) ||
      r.position.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="심사자 선택"
      maxWidth={540}
      titleSx={{
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
      }}
    >
      <TextField
        fullWidth
        placeholder="이름, 부서, 직무로 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ mr: 1.5, color: '#6366f1', opacity: 0.9 }} />
          ),
        }}
        sx={{ mb: 3.5 }}
        size="medium"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        sxInput={inputSx} // ← MUI v5에서는 slotProps.input 사용 권장
        // 만약 MUI v5라면 아래처럼 변경하세요:
        // slotProps={{ input: { sx: inputSx } }}
      />

      <List
        sx={{
          pt: 0,
          maxHeight: 460,
          overflowY: 'auto',
          '& .MuiListItem-root': { px: 0 },
        }}
      >
        {filtered.map((reviewer) => {
          const isSelected = selected.includes(reviewer.name)

          return (
            <ListItem key={reviewer.id} disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                onClick={() => onToggle(reviewer.name)}
                selected={isSelected}
                sx={{
                  borderRadius: 2.5,
                  py: 1.5,
                  px: 2.5,
                  transition: 'all 0.18s ease',
                  bgcolor: isSelected
                    ? isDarkMode
                      ? 'rgba(99,102,241,0.18)'
                      : 'rgba(99,102,241,0.12)'
                    : 'transparent',
                  border: isSelected
                    ? `1px solid ${isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'}`
                    : `1px solid ${borderColor}`,
                  boxShadow: isSelected
                    ? isDarkMode
                      ? '0 4px 16px rgba(99,102,241,0.22)'
                      : '0 4px 12px rgba(99,102,241,0.15)'
                    : 'none',
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(99,102,241,0.12)'
                      : 'rgba(99,102,241,0.08)',
                    borderColor: '#6366f1',
                  },
                  '&.Mui-selected': {
                    bgcolor: isDarkMode
                      ? 'rgba(99,102,241,0.18)'
                      : 'rgba(99,102,241,0.12)',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: isDarkMode
                      ? 'rgba(99,102,241,0.24)'
                      : 'rgba(99,102,241,0.16)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={reviewer.name}
                    src={reviewer.avatar}
                    sx={{
                      width: 52,
                      height: 52,
                      border: `2px solid ${isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box sx={{ ml: 1 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ color: textPrimary }}
                      >
                        {reviewer.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: textSecondary,
                          fontSize: '0.875rem',
                          mt: 0.25,
                        }}
                      >
                        {reviewer.dept} · {reviewer.position}
                      </Typography>
                    </Box>
                  }
                />

                {isSelected && (
                  <Chip
                    label="선택됨"
                    size="small"
                    sx={{
                      ml: 2,
                      bgcolor: '#10b981',
                      color: '#fff',
                      fontWeight: 600,
                      '& .MuiChip-label': { px: 1.5 },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}

        {filtered.length === 0 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{ color: textSecondary, fontWeight: 500 }}
            >
              검색 결과가 없습니다
            </Typography>
          </Box>
        )}
      </List>
    </Modal>
  )
}
