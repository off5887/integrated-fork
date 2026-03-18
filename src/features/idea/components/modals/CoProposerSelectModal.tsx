// src/features/idea/components/modals/CoProposerSelectModal.tsx
// 공동 제안자 검색·선택 모달 (부서별 그룹 토글 포함)
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
import { useThemeMode } from '@/context/ThemeContext'
import { ORG_STRUCTURE } from '@/api/mock/idea'
import { getIdeaTheme } from '@/theme/ideaTheme'
import { onKeyboardClick } from '@/utils/keyboardClick'

// 검색을 위한 플랫 멤버 목록
const allMembers = ORG_STRUCTURE.flatMap((div) =>
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

  const it = getIdeaTheme(isDarkMode)
  const { textPrimary, textSecondary, borderColor } = it

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
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`${member.name} ${member.position} ${isSelected ? '선택됨' : '선택 안됨'}`}
        tabIndex={0}
        onClick={() => onToggle(member.name)}
        onKeyDown={onKeyboardClick(() => onToggle(member.name))}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          pl: indent ? `${indent * 16 + 8}px` : 1.25,
          pr: 1.25,
          py: 1,
          borderRadius: 1.5,
          cursor: 'pointer',
          outline: 'none',
          border: `1px solid ${isSelected ? it.accent.borderHover : borderColor}`,
          '&:focus-visible': { outline: `2px solid ${it.accent.border}`, outlineOffset: 2 },
          bgcolor: isSelected
            ? it.accent.bgSelected
            : it.listItemBg,
          transition: 'all 0.12s ease',
          '&:hover': {
            bgcolor: it.accent.bgHover,
            borderColor: it.accent.border,
          },
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            bgcolor: isSelected
              ? it.accent.bgAvatarSelected
              : it.avatarBg,
            color: isSelected
              ? it.accent.text
              : textSecondary,
            fontSize: '0.8rem',
            fontWeight: 700,
            border: `1px solid ${isSelected ? it.accent.border : borderColor}`,
          }}
        >
          {member.name[0]}
        </Avatar>

        <Box flex={1} minWidth={0}>
          <Typography
            sx={{
              fontSize: '0.83rem',
              fontWeight: isSelected ? 700 : 600,
              color: isSelected ? it.accent.text : textPrimary,
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
            sx={{ fontSize: '1rem', color: it.accent.text, flexShrink: 0 }}
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
            bgcolor: it.modalBg,
            border: `1px solid ${borderColor}`,
            boxShadow: it.dialogShadow,
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: it.backdropBg,
          },
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: it.modalHeaderGradient }} />

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
            bgcolor: it.accent.color,
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
            <Typography variant="caption" sx={{ color: it.accent.textMuted, fontWeight: 600 }}>
              {selected.length}명 선택됨
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          onClick={handleClose}
          aria-label="닫기"
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
              backgroundColor: it.searchInputBg,
              fontSize: '0.875rem',
              '& fieldset': { borderColor },
              '&:hover fieldset': { borderColor: it.accent.borderHover },
              '&.Mui-focused fieldset': { borderColor: it.accent.color },
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
          role="group"
          aria-label="구성원 목록"
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
              background: it.accent.border,
              borderRadius: 9999,
            },
            scrollbarWidth: 'thin',
            scrollbarColor: `${it.accent.border} transparent`,
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
            ORG_STRUCTURE.map((div) => (
              <Box key={div.id} sx={{ mb: 0.5 }}>
                {/* 부문 헤더 */}
                <Box
                  role="button"
                  aria-expanded={expandedDivs.includes(div.id)}
                  aria-label={`${div.name} 부문 ${expandedDivs.includes(div.id) ? '접기' : '펼치기'}`}
                  tabIndex={0}
                  onClick={() => handleToggleDiv(div.id)}
                  onKeyDown={onKeyboardClick(() => handleToggleDiv(div.id))}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.9,
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    outline: 'none',
                    border: `1px solid ${expandedDivs.includes(div.id) ? it.accent.border : borderColor}`,
                    bgcolor: expandedDivs.includes(div.id)
                      ? it.accent.bgHover
                      : it.categoryCardBg,
                    transition: 'all 0.12s ease',
                    '&:hover': { bgcolor: it.accent.bgHover, borderColor: it.accent.border },
                    '&:focus-visible': { outline: `2px solid ${it.accent.border}`, outlineOffset: 2 },
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: '0.83rem',
                      fontWeight: 700,
                      color: expandedDivs.includes(div.id) ? it.accent.text : textPrimary,
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
                          role="button"
                          aria-expanded={expandedTeams.includes(team.id)}
                          aria-label={`${team.name} 팀 ${expandedTeams.includes(team.id) ? '접기' : '펼치기'}`}
                          tabIndex={0}
                          onClick={() => handleToggleTeam(team.id)}
                          onKeyDown={onKeyboardClick(() => handleToggleTeam(team.id))}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1.25,
                            py: 0.7,
                            mb: 0.5,
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            outline: 'none',
                            border: `1px solid ${borderColor}`,
                            bgcolor: 'transparent',
                            transition: 'all 0.12s ease',
                            '&:hover': { bgcolor: it.accent.bgVerySubtle },
                            '&:focus-visible': { outline: `2px solid ${it.accent.border}`, outlineOffset: 2 },
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
          bgcolor: it.modalFooterBg,
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
            bgcolor: it.accent.color,
            color: '#fff',
            '&:hover': {
              bgcolor: it.accent.hover,
              boxShadow: it.accent.btnModalHoverShadow,
            },
          }}
        >
          완료
        </Button>
      </Box>
    </Dialog>
  )
}
