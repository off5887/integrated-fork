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
  Typography,
} from '@mui/material'
import { useState } from 'react'
import Modal from '../../../components/common/Modal'
import { useThemeMode } from '../../../context/ThemeContext'

// 부문 → 팀 → 멤버 구조
const dummyOrg = [
  {
    id: 'div1',
    name: 'A부문',
    teams: [
      {
        id: 'team-a1',
        name: 'A팀',
        members: [
          { id: 101, name: '김프로', position: 'Product Owner' },
          { id: 102, name: '박디자이너', position: 'Senior Designer' },
          { id: 103, name: '최기획', position: 'Planner' },
        ],
      },
    ],
  },
  {
    id: 'div2',
    name: 'B부문',
    teams: [
      {
        id: 'team-b1',
        name: 'B팀',
        members: [
          { id: 201, name: '이프론트', position: 'Frontend Lead' },
          { id: 202, name: '윤백엔드', position: 'Backend Engineer' },
        ],
      },
      {
        id: 'team-b2',
        name: 'C팀',
        members: [
          { id: 301, name: '정모바일', position: 'iOS Developer' },
          { id: 302, name: '한안드로이드', position: 'Android Developer' },
        ],
      },
    ],
  },
  {
    id: 'div3',
    name: 'C부문',
    teams: [
      {
        id: 'team-c1',
        name: '마케팅팀',
        members: [{ id: 401, name: '윤그로스', position: 'Growth Hacker' }],
      },
    ],
  },
]

interface CoProposerSelectModalProps {
  open: boolean
  onClose: () => void
  selected: string[]
  onToggle: (name: string) => void
}

export default function CoProposerSelectModal({
  open,
  onClose,
  selected,
  onToggle,
}: CoProposerSelectModalProps) {
  const { isDarkMode } = useThemeMode()

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode
    ? 'rgba(148,163,184,0.12)'
    : 'rgba(203,213,225,0.55)'
  const selectedBg = isDarkMode
    ? 'rgba(99,102,241,0.18)'
    : 'rgba(99,102,241,0.12)'
  const hoverBg = isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)'

  // 부문별 확장 상태 관리
  const [expandedDivs, setExpandedDivs] = useState<string[]>(['div1', 'div2'])

  const handleToggleDivision = (divId: string) => {
    setExpandedDivs((prev) =>
      prev.includes(divId)
        ? prev.filter((id) => id !== divId)
        : [...prev, divId],
    )
  }

  // 팀별 확장 상태 (부문 내에서 독립적으로 관리)
  const [expandedTeams, setExpandedTeams] = useState<string[]>([
    'team-a1',
    'team-b1',
  ])

  const handleToggleTeam = (teamId: string) => {
    setExpandedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId],
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="공동제안자 선택"
      maxWidth={580}
      titleSx={{
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
      }}
    >
      <List sx={{ pt: 1, pb: 2 }}>
        {dummyOrg.map((division) => (
          <Box key={division.id} sx={{ mb: 2 }}>
            {/* 부문 헤더 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleToggleDivision(division.id)}
                sx={{
                  borderRadius: 2.5,
                  py: 1.5,
                  px: 3,
                  bgcolor: expandedDivs.includes(division.id)
                    ? isDarkMode
                      ? 'rgba(99,102,241,0.10)'
                      : 'rgba(99,102,241,0.06)'
                    : 'transparent',
                  border: `1px solid ${borderColor}`,
                  '&:hover': {
                    bgcolor: hoverBg,
                    borderColor: '#6366f1',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ color: textPrimary }}
                    >
                      {division.name}
                    </Typography>
                  }
                />
                {expandedDivs.includes(division.id) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={expandedDivs.includes(division.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ pt: 1 }}>
                {division.teams.map((team) => (
                  <Box key={team.id} sx={{ mb: 1 }}>
                    {/* 팀 헤더 */}
                    <ListItem disablePadding sx={{ pl: 3 }}>
                      <ListItemButton
                        onClick={() => handleToggleTeam(team.id)}
                        sx={{
                          borderRadius: 2,
                          py: 1.2,
                          px: 3,
                          bgcolor: expandedTeams.includes(team.id)
                            ? selectedBg
                            : 'transparent',
                          border: `1px solid ${borderColor}`,
                          '&:hover': {
                            bgcolor: hoverBg,
                            borderColor: '#6366f1',
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              sx={{ color: textSecondary }}
                            >
                              {team.name}
                            </Typography>
                          }
                        />
                        {expandedTeams.includes(team.id) ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </ListItemButton>
                    </ListItem>

                    <Collapse
                      in={expandedTeams.includes(team.id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding sx={{ pl: 6 }}>
                        {team.members.map((member) => {
                          const isSelected = selected.includes(member.name)
                          return (
                            <ListItem
                              key={member.id}
                              disablePadding
                              sx={{ mb: 0.5 }}
                            >
                              <ListItemButton
                                onClick={() => onToggle(member.name)}
                                sx={{
                                  borderRadius: 2,
                                  py: 1,
                                  px: 2.5,
                                  transition: 'all 0.18s ease',
                                  bgcolor: isSelected
                                    ? selectedBg
                                    : 'transparent',
                                  border: isSelected
                                    ? `1px solid ${
                                        isDarkMode
                                          ? 'rgba(99,102,241,0.35)'
                                          : 'rgba(99,102,241,0.25)'
                                      }`
                                    : `1px solid ${borderColor}`,
                                  boxShadow: isSelected
                                    ? isDarkMode
                                      ? '0 3px 12px rgba(99,102,241,0.18)'
                                      : '0 3px 10px rgba(99,102,241,0.12)'
                                    : 'none',
                                  '&:hover': {
                                    bgcolor: hoverBg,
                                    borderColor: '#6366f1',
                                  },
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    sx={{
                                      width: 38,
                                      height: 38,
                                      bgcolor: isDarkMode
                                        ? '#4f46e5'
                                        : '#6366f1',
                                      color: '#fff',
                                      fontSize: '1rem',
                                      fontWeight: 600,
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                    }}
                                  >
                                    {member.name[0]}
                                  </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      fontWeight={isSelected ? 600 : 500}
                                      sx={{ color: textPrimary, ml: 1 }}
                                    >
                                      {member.name}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="caption"
                                      sx={{ color: textSecondary, ml: 1 }}
                                    >
                                      {member.position}
                                    </Typography>
                                  }
                                />

                                {isSelected && (
                                  <Chip
                                    label="선택됨"
                                    size="small"
                                    sx={{
                                      ml: 1.5,
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
                      </List>
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Modal>
  )
}
