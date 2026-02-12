// src/routes/idea/components/ReviewerSelectModal.tsx
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
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

// 임시 데이터 (나중에 axios로 대체)
const dummyReviewers = [
  {
    id: 1,
    name: '김디자인',
    position: 'UX Designer',
    avatar: '/avatars/1.jpg',
  },
  {
    id: 2,
    name: '박프로덕트',
    position: 'Product Manager',
    avatar: '/avatars/2.jpg',
  },
  {
    id: 3,
    name: '이개발',
    position: 'Frontend Engineer',
    avatar: '/avatars/3.jpg',
  },
  {
    id: 4,
    name: '최마케팅',
    position: 'Growth Marketer',
    avatar: '/avatars/4.jpg',
  },
  { id: 5, name: '정기획', position: 'Planner', avatar: '/avatars/5.jpg' },
]

interface ReviewerSelectModalProps {
  open: boolean
  onClose: () => void
  selected: string[]
  onToggle: (name: string) => void // 이름 변경: onSelect → onToggle
}

export default function ReviewerSelectModal({
  open,
  onClose,
  selected,
  onToggle,
}: ReviewerSelectModalProps) {
  const [search, setSearch] = useState('')

  const filtered = dummyReviewers.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Modal open={open} onClose={onClose} title="심사자 선택" maxWidth={480}>
      <TextField
        fullWidth
        placeholder="이름으로 검색..."
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

      <List sx={{ pt: 0 }}>
        {filtered.map((reviewer) => {
          const isSelected = selected.includes(reviewer.name)
          return (
            <ListItem key={reviewer.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onToggle(reviewer.name)} // 토글 호출
                sx={{
                  borderRadius: 2,
                  bgcolor: isSelected ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={reviewer.name}
                    src={reviewer.avatar}
                    sx={{ width: 42, height: 42 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={reviewer.name}
                  secondary={reviewer.position}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                {isSelected && (
                  <Chip
                    label="선택됨"
                    size="small"
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}

        {filtered.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            검색 결과가 없습니다
          </Typography>
        )}
      </List>
    </Modal>
  )
}
