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
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useOrgUsersTree } from '@/api/queries/useUsers'
import type { UserApiMember } from '@/api/types/settings'
import { useIdeaTheme } from '@/theme/ideaTheme'
import { onKeyboardClick } from '@/utils/keyboardClick'

interface FlatMember extends UserApiMember {
  bizAreaNm: string
  deptNm: string
}

interface CoProposerSelectModalProps {
  open: boolean
  onClose: () => void
  selected: string[]          // "이름 (팀)" 형식 목록 (UI 표시용)
  onToggle: (label: string, employeeId: string) => void
}

export default function CoProposerSelectModal({
  open,
  onClose,
  selected,
  onToggle,
}: CoProposerSelectModalProps) {
  const [search, setSearch] = useState('')
  const [expandedDivs, setExpandedDivs] = useState<string[]>([])
  const [expandedTeams, setExpandedTeams] = useState<string[]>([])

  const { data: orgTree, isLoading } = useOrgUsersTree()

  const it = useIdeaTheme()
  const { textPrimary, textSecondary, borderColor } = it

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  const handleToggleDiv = (name: string) => {
    setExpandedDivs((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name],
    )
  }

  const handleToggleTeam = (deptCd: string) => {
    setExpandedTeams((prev) =>
      prev.includes(deptCd) ? prev.filter((t) => t !== deptCd) : [...prev, deptCd],
    )
  }

  // 첫 로드 시 첫 번째 부문/팀 자동 펼치기
  useEffect(() => {
    if (!orgTree || orgTree.length === 0) return
    setExpandedDivs([orgTree[0].bizAreaNm])
    if (orgTree[0].teams.length > 0) {
      setExpandedTeams([orgTree[0].teams[0].deptCd])
    }
  }, [orgTree])

  const isSearching = search.trim().length > 0

  const allMembers: FlatMember[] = useMemo(() => {
    if (!orgTree) return []
    return orgTree.flatMap((biz) =>
      biz.teams.flatMap((team) =>
        team.members
          .filter((m) => m.isActive !== false)
          .map((m) => ({ ...m, bizAreaNm: biz.bizAreaNm, deptNm: team.deptNm })),
      ),
    )
  }, [orgTree])

  const filteredMembers = useMemo(() => {
    if (!isSearching) return null
    const q = search.trim().toLowerCase()
    return allMembers.filter(
      (m) =>
        m.name.includes(q) ||
        m.deptNm.includes(q) ||
        m.bizAreaNm.includes(q) ||
        m.rollNm.toLowerCase().includes(q),
    )
  }, [search, isSearching, allMembers])

  const MemberRow = ({
    member,
  }: {
    member: FlatMember
  }) => {
    const label = `${member.name} (${member.deptNm})`
    const isSelected = selected.includes(label)
    return (
      <Box
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`${member.name} ${member.rollNm} ${isSelected ? '선택됨' : '선택 안됨'}`}
        tabIndex={0}
        onClick={() => onToggle(label, member.employeeId)}
        onKeyDown={onKeyboardClick(() => onToggle(label, member.employeeId))}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          pl: 1.25,
          pr: 1.25,
          py: 1,
          borderRadius: 1.5,
          cursor: 'pointer',
          outline: 'none',
          border: `1px solid ${isSelected ? it.accent.borderHover : borderColor}`,
          '&:focus-visible': { outline: `2px solid ${it.accent.border}`, outlineOffset: 2 },
          bgcolor: isSelected ? it.accent.bgSelected : it.listItemBg,
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
            bgcolor: isSelected ? it.accent.bgAvatarSelected : it.avatarBg,
            color: isSelected ? it.accent.text : textSecondary,
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
            {isSearching ? `${member.bizAreaNm} · ${member.deptNm}` : member.rollNm}
          </Typography>
        </Box>

        {isSelected && (
          <CheckIcon sx={{ fontSize: '1rem', color: it.accent.text, flexShrink: 0 }} />
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
      aria-labelledby="co-proposer-dialog-title"
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
            id="co-proposer-dialog-title"
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
          placeholder="이름, 사업소, 팀, 직급으로 검색"
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
          {isLoading ? (
            <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={28} sx={{ color: it.accent.color }} />
            </Box>
          ) : isSearching ? (
            /* 검색 결과 */
            filteredMembers && filteredMembers.length > 0 ? (
              filteredMembers.map((m) => <MemberRow key={m.employeeId} member={m} />)
            ) : (
              <Box sx={{ py: 5, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: textSecondary }}>
                  검색 결과가 없습니다
                </Typography>
              </Box>
            )
          ) : (
            /* 조직도 트리 */
            (orgTree ?? []).map((biz) => (
              <Box key={biz.bizAreaNm} sx={{ mb: 0.5 }}>
                {/* 사업소(부문) 헤더 */}
                <Box
                  role="button"
                  aria-expanded={expandedDivs.includes(biz.bizAreaNm)}
                  aria-label={`${biz.bizAreaNm} ${expandedDivs.includes(biz.bizAreaNm) ? '접기' : '펼치기'}`}
                  tabIndex={0}
                  onClick={() => handleToggleDiv(biz.bizAreaNm)}
                  onKeyDown={onKeyboardClick(() => handleToggleDiv(biz.bizAreaNm))}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.9,
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    outline: 'none',
                    border: `1px solid ${expandedDivs.includes(biz.bizAreaNm) ? it.accent.border : borderColor}`,
                    bgcolor: expandedDivs.includes(biz.bizAreaNm) ? it.accent.bgHover : it.categoryCardBg,
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
                      color: expandedDivs.includes(biz.bizAreaNm) ? it.accent.text : textPrimary,
                    }}
                  >
                    {biz.bizAreaNm}
                  </Typography>
                  {expandedDivs.includes(biz.bizAreaNm) ? (
                    <ExpandLessIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                  )}
                </Box>

                <Collapse in={expandedDivs.includes(biz.bizAreaNm)} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 1.5, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {biz.teams.map((team) => (
                      <Box key={team.deptCd}>
                        {/* 팀 헤더 */}
                        <Box
                          role="button"
                          aria-expanded={expandedTeams.includes(team.deptCd)}
                          aria-label={`${team.deptNm} ${expandedTeams.includes(team.deptCd) ? '접기' : '펼치기'}`}
                          tabIndex={0}
                          onClick={() => handleToggleTeam(team.deptCd)}
                          onKeyDown={onKeyboardClick(() => handleToggleTeam(team.deptCd))}
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
                            {team.deptNm}
                          </Typography>
                          {expandedTeams.includes(team.deptCd) ? (
                            <ExpandLessIcon sx={{ fontSize: '0.85rem', color: textSecondary }} />
                          ) : (
                            <ExpandMoreIcon sx={{ fontSize: '0.85rem', color: textSecondary }} />
                          )}
                        </Box>

                        <Collapse in={expandedTeams.includes(team.deptCd)} timeout="auto" unmountOnExit>
                          <Box sx={{ pl: 1, mb: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {team.members
                              .filter((m) => m.isActive !== false)
                              .map((member) => (
                                <MemberRow
                                  key={member.employeeId}
                                  member={{ ...member, bizAreaNm: biz.bizAreaNm, deptNm: team.deptNm }}
                                />
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
