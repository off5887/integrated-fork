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
  const [search, setSearch] = useState('')

  const filtered = dummyReviewers.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase()) ||
      r.position.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Modal open={open} onClose={onClose} title="심사자 선택" maxWidth={520}>
      <TextField
        fullWidth
        placeholder="이름, 부서, 직무로 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          ),
        }}
        sx={{ mb: 3 }}
        size="small"
      />

      <List sx={{ pt: 0, maxHeight: 420, overflowY: 'auto' }}>
        {filtered.map((reviewer) => {
          const isSelected = selected.includes(reviewer.name)
          return (
            <ListItem key={reviewer.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onToggle(reviewer.name)}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  bgcolor: isSelected ? 'action.selected' : 'transparent',
                  '&.Mui-selected': {
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={reviewer.name}
                    src={reviewer.avatar}
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {reviewer.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {reviewer.dept} · {reviewer.position}
                      </Typography>
                    </Box>
                  }
                />

                {isSelected && (
                  <Chip
                    label="선택됨"
                    size="small"
                    color="success"
                    variant="filled"
                    sx={{ ml: 1.5 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}

        {filtered.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
            검색 결과가 없습니다
          </Typography>
        )}
      </List>
    </Modal>
  )
}
