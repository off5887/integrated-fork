// src/routes/idea/components/CoProposerSelectModal.tsx
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
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
          { id: 101, name: '김프로', dept: 'A팀', position: 'Product Owner' },
          { id: 102, name: '박디자이너', dept: 'A팀', position: 'Senior Designer' },
          { id: 103, name: '최기획', dept: 'A팀', position: 'Planner' },
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
          { id: 201, name: '이프론트', dept: 'B팀', position: 'Frontend Lead' },
          { id: 202, name: '윤백엔드', dept: 'B팀', position: 'Backend Engineer' },
        ],
      },
      {
        id: 'team-b2',
        name: 'C팀',
        members: [
          { id: 301, name: '정모바일', dept: 'C팀', position: 'iOS Developer' },
          { id: 302, name: '한안드로이드', dept: 'C팀', position: 'Android Developer' },
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
        members: [{ id: 401, name: '윤그로스', dept: '마케팅팀', position: 'Growth Hacker' }],
      },
    ],
  },
]

// 검색을 위한 플랫 멤버 목록
const allMembers = dummyOrg.flatMap((div) =>
  div.teams.flatMap((team) =>
    team.members.map((m) => ({ ...m, divName: div.name, teamName: team.name })),
  ),
)

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
  const [search, setSearch] = useState('')
  const [expandedDivs, setExpandedDivs] = useState<string[]>(['div1', 'div2'])
  const [expandedTeams, setExpandedTeams] = useState<string[]>(['team-a1', 'team-b1'])

  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  const handleToggleDiv = (id: string) => {
    setExpandedDivs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    )
  }

  const handleToggleTeam = (id: string) => {
    setExpandedTeams((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  const isSearching = search.trim().length > 0

  const filteredMembers = useMemo(() => {
    if (!isSearching) return null
    const q = search.trim().toLowerCase()
    return allMembers.filter(
      (m) =>
        m.name.includes(q) ||
        m.teamName.includes(q) ||
        m.divName.includes(q) ||
        m.position.toLowerCase().includes(q),
    )
  }, [search, isSearching])

  const MemberRow = ({
    member,
    indent = 0,
  }: {
    member: (typeof allMembers)[number]
    indent?: number
  }) => {
    const isSelected = selected.includes(member.name)
    return (
      <Box
        onClick={() => onToggle(member.name)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          pl: indent ? `${indent * 16 + 8}px` : 1.25,
          pr: 1.25,
          py: 1,
          borderRadius: 1.5,
          cursor: 'pointer',
          border: `1px solid ${
            isSelected
              ? isDarkMode
                ? 'rgba(99,102,241,0.4)'
                : 'rgba(99,102,241,0.3)'
              : borderColor
          }`,
          bgcolor: isSelected
            ? isDarkMode
              ? 'rgba(99,102,241,0.1)'
              : 'rgba(99,102,241,0.05)'
            : isDarkMode
              ? 'rgba(30,41,59,0.5)'
              : '#ffffff',
          transition: 'all 0.12s ease',
          '&:hover': {
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
            borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            bgcolor: isSelected
              ? isDarkMode
                ? 'rgba(99,102,241,0.25)'
                : 'rgba(99,102,241,0.12)'
              : isDarkMode
                ? 'rgba(30,41,59,0.8)'
                : 'rgba(241,245,249,0.9)',
            color: isSelected
              ? isDarkMode
                ? '#a5b4fc'
                : '#4338ca'
              : textSecondary,
            fontSize: '0.8rem',
            fontWeight: 700,
            border: `1px solid ${
              isSelected
                ? isDarkMode
                  ? 'rgba(99,102,241,0.3)'
                  : 'rgba(99,102,241,0.2)'
                : borderColor
            }`,
          }}
        >
          {member.name[0]}
        </Avatar>

        <Box flex={1} minWidth={0}>
          <Typography
            sx={{
              fontSize: '0.83rem',
              fontWeight: isSelected ? 700 : 600,
              color: isSelected ? (isDarkMode ? '#a5b4fc' : '#4338ca') : textPrimary,
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace' }}>
            {isSearching ? `${member.divName} · ${member.teamName}` : member.position}
          </Typography>
        </Box>

        {isSelected && (
          <CheckIcon
            sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca', flexShrink: 0 }}
          />
        )}
      </Box>
    )
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
          px: 2.5,
          pt: 2,
          pb: 1.75,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#6366f1',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <GroupAddIcon sx={{ fontSize: '1rem' }} />
        </Box>
        <Box flex={1}>
          <Typography
            fontWeight={700}
            sx={{ color: textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}
          >
            공동제안자 선택
          </Typography>
          {selected.length > 0 && (
            <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600 }}>
              {selected.length}명 선택됨
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ color: textSecondary, flexShrink: 0 }}
        >
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 2, pb: 0 }}>
        {/* 검색 */}
        <TextField
          fullWidth
          size="small"
          placeholder="이름, 부문, 팀, 직무로 검색"
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
            maxHeight: 360,
            overflowY: 'auto',
            pr: 0.25,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
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
          {/* 검색 결과 */}
          {isSearching ? (
            filteredMembers && filteredMembers.length > 0 ? (
              filteredMembers.map((m) => <MemberRow key={m.id} member={m} />)
            ) : (
              <Box sx={{ py: 5, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: textSecondary }}>
                  검색 결과가 없습니다
                </Typography>
              </Box>
            )
          ) : (
            /* 조직도 트리 */
            dummyOrg.map((div) => (
              <Box key={div.id} sx={{ mb: 0.5 }}>
                {/* 부문 헤더 */}
                <Box
                  onClick={() => handleToggleDiv(div.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.9,
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    border: `1px solid ${
                      expandedDivs.includes(div.id)
                        ? isDarkMode
                          ? 'rgba(99,102,241,0.25)'
                          : 'rgba(99,102,241,0.2)'
                        : borderColor
                    }`,
                    bgcolor: expandedDivs.includes(div.id)
                      ? isDarkMode
                        ? 'rgba(99,102,241,0.08)'
                        : 'rgba(99,102,241,0.04)'
                      : isDarkMode
                        ? 'rgba(30,41,59,0.4)'
                        : 'rgba(248,250,252,0.8)',
                    transition: 'all 0.12s ease',
                    '&:hover': {
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
                      borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: '0.83rem',
                      fontWeight: 700,
                      color: expandedDivs.includes(div.id)
                        ? isDarkMode
                          ? '#a5b4fc'
                          : '#4338ca'
                        : textPrimary,
                    }}
                  >
                    {div.name}
                  </Typography>
                  {expandedDivs.includes(div.id) ? (
                    <ExpandLessIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  )}
                </Box>

                <Collapse in={expandedDivs.includes(div.id)} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 1.5, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {div.teams.map((team) => (
                      <Box key={team.id}>
                        {/* 팀 헤더 */}
                        <Box
                          onClick={() => handleToggleTeam(team.id)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1.25,
                            py: 0.7,
                            mb: 0.5,
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            border: `1px solid ${borderColor}`,
                            bgcolor: 'transparent',
                            transition: 'all 0.12s ease',
                            '&:hover': {
                              bgcolor: isDarkMode
                                ? 'rgba(99,102,241,0.05)'
                                : 'rgba(99,102,241,0.03)',
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: '0.77rem',
                              fontWeight: 600,
                              color: textSecondary,
                              letterSpacing: '0.01em',
                            }}
                          >
                            {team.name}
                          </Typography>
                          {expandedTeams.includes(team.id) ? (
                            <ExpandLessIcon sx={{ fontSize: '0.85rem', color: textSecondary }} />
                          ) : (
                            <ExpandMoreIcon sx={{ fontSize: '0.85rem', color: textSecondary }} />
                          )}
                        </Box>

                        <Collapse
                          in={expandedTeams.includes(team.id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              pl: 1,
                              mb: 0.5,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                            }}
                          >
                            {team.members.map((member) => (
                              <MemberRow key={member.id} member={{ ...member, divName: div.name, teamName: team.name }} />
                            ))}
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            ))
          )}
        </Box>
      </DialogContent>

      {/* 하단 버튼 */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderTop: `1px solid ${borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
            borderRadius: 1.5,
            px: 3,
            py: 0.85,
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'none',
            boxShadow: 'none',
            bgcolor: '#6366f1',
            color: '#fff',
            '&:hover': {
              bgcolor: '#4f46e5',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            },
          }}
        >
          완료
        </Button>
      </Box>
    </Dialog>
  )
}
