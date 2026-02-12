// src/routes/idea/components/CoProposerSelectModal.tsx
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import Modal from '../../../components/common/Modal'

// 나중에 axios로 대체할 dummy 조직도 데이터
const dummyOrg = [
  {
    id: 'team1',
    name: '프로덕트팀',
    members: [
      { id: 101, name: '김프로', position: 'Product Owner' },
      { id: 102, name: '박디자이너', position: 'Senior Designer' },
    ],
  },
  {
    id: 'team2',
    name: '개발팀',
    members: [
      { id: 201, name: '이프론트', position: 'Frontend Lead' },
      { id: 202, name: '최백엔드', position: 'Backend Engineer' },
      { id: 203, name: '정모바일', position: 'iOS Developer' },
    ],
  },
  {
    id: 'team3',
    name: '마케팅팀',
    members: [{ id: 301, name: '윤그로스', position: 'Growth Hacker' }],
  },
]

interface CoProposerSelectModalProps {
  open: boolean
  onClose: () => void
  selected: string[]
  onToggle: (name: string) => void // 이름 변경: onSelect → onToggle
}

export default function CoProposerSelectModal({
  open,
  onClose,
  selected,
  onToggle,
}: CoProposerSelectModalProps) {
  const [expanded, setExpanded] = useState<string[]>(['team1', 'team2'])

  const handleToggle = (teamId: string) => {
    setExpanded((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId],
    )
  }

  return (
    <Modal open={open} onClose={onClose} title="공동제안자 선택" maxWidth={560}>
      <List sx={{ pt: 0 }}>
        {dummyOrg.map((team) => (
          <Box key={team.id}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleToggle(team.id)}
                sx={{
                  borderRadius: 2,
                  bgcolor: expanded.includes(team.id)
                    ? 'action.selected'
                    : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemText
                  primary={team.name}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                {expanded.includes(team.id) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={expanded.includes(team.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {team.members.map((member) => {
                  const isSelected = selected.includes(member.name)
                  return (
                    <ListItem key={member.id} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => onToggle(member.name)} // 토글 호출
                        sx={{
                          borderRadius: 2,
                          bgcolor: isSelected
                            ? 'action.selected'
                            : 'transparent',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor: 'secondary.main',
                              fontSize: '0.9rem',
                            }}
                          >
                            {member.name[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={member.name}
                          secondary={member.position}
                          primaryTypographyProps={{
                            fontWeight: isSelected ? 600 : 400,
                          }}
                        />
                        {isSelected && (
                          <Chip
                            label="선택됨"
                            size="small"
                            color="secondary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Modal>
  )
}
