// src/routes/Judge/components/ReviewerChangeModal.tsx
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'
import { useSnackbar } from '@/context/SnackbarContext'
import type { Proposal } from '@/api/types/judge'
import { useIdeaApprover, useAssignApprover } from '@/api/queries/useIdeas'
import { useUserRoles } from '@/api/queries/useUsers'

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  proposal: Proposal | null
  onClose: () => void
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function ReviewerChangeModal({ open, proposal, onClose }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()
  const { showSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // 현재 배정된 심사자 조회
  const { data: currentApprover } = useIdeaApprover(open ? (proposal?.id ?? null) : null)

  // 배정 가능한 후보 목록 (isAdmin || isReviewer)
  const { data: rolesData } = useUserRoles()
  const candidates = useMemo(() => {
    const admins    = rolesData?.admins    ?? []
    const reviewers = rolesData?.reviewers ?? []
    const seen = new Set<string>()
    return [...admins, ...reviewers].filter((u) => {
      if (seen.has(u.employeeId)) return false
      seen.add(u.employeeId)
      return true
    })
  }, [rolesData])

  const filtered = useMemo(() => {
    const q = debouncedTerm.trim().toLowerCase()
    if (!q) return candidates
    return candidates.filter(
      (u) =>
        u.name.includes(q) ||
        u.rollNm.includes(q) ||
        u.section.includes(q),
    )
  }, [candidates, debouncedTerm])

  const selectedCandidate = candidates.find((u) => u.employeeId === selectedId) ?? null
  const canConfirm =
    selectedCandidate !== null &&
    selectedCandidate.employeeId !== currentApprover?.approverId

  // 심사자 배정 뮤테이션
  const assignApprover = useAssignApprover(proposal?.id ?? 0)

  const handleConfirm = () => {
    if (!proposal || !selectedCandidate) return
    assignApprover.mutate(selectedCandidate.employeeId, {
      onSuccess: () => {
        showSnackbar(`'${proposal.title}' 심사자가 ${selectedCandidate.name}(으)로 변경되었습니다.`, 'success')
        handleClose()
      },
      onError: () => {
        showSnackbar('심사자 변경 중 오류가 발생했습니다.', 'error')
      },
    })
  }

  const handleClose = () => {
    setSearchTerm('')
    setSelectedId(null)
    onClose()
  }

  if (!proposal) return null

  const currentName = currentApprover?.approverName ?? '(미배정)'

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="reviewer-change-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: theme.dialogBg,
            border: `1px solid ${colors.borderColor}`,
            boxShadow: theme.dialogShadow,
            overflow: 'hidden',
          },
        },
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: theme.backdropBg,
          },
        },
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: theme.accentGradient }} />

      {/* 헤더 */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.75,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.25,
          borderBottom: `1px solid ${colors.borderColor}`,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: theme.modalIconBg,
            color: theme.modalIconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          <SwapHorizIcon sx={{ fontSize: '1rem' }} />
        </Box>
        <Box flex={1} minWidth={0}>
          <Typography id="reviewer-change-dialog-title" fontWeight={700} sx={{ color: colors.textPrimary, fontSize: '0.95rem', lineHeight: 1.3 }}>
            결재자 변경
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.textSecondary,
              display: 'block',
              mt: 0.25,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {proposal.title}
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} sx={{ color: colors.textSecondary, flexShrink: 0 }}>
          <CloseIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 2, pb: 0 }}>
        {/* 현재 → 변경 결재자 미리보기 */}
        <Box
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: 2,
            border: `1px solid ${colors.borderColor}`,
            bgcolor: theme.previewBg,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="caption" sx={{ color: colors.textSecondary, flexShrink: 0 }}>
            현재
          </Typography>
          <Chip
            label={currentName}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.78rem',
              bgcolor: colors.accentBg,
              color: colors.accentColor,
              border: `1px solid ${colors.accentBorder}`,
            }}
          />
          {selectedCandidate && canConfirm && (
            <>
              <SwapHorizIcon sx={{ fontSize: '1rem', color: colors.textSecondary, opacity: 0.5, flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: colors.textSecondary, flexShrink: 0 }}>
                변경
              </Typography>
              <Chip
                label={selectedCandidate.name}
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  bgcolor: theme.changeChipBg,
                  color: theme.changeChipColor,
                  border: `1px solid ${theme.changeChipBorder}`,
                }}
              />
            </>
          )}
        </Box>

        {/* 검색 */}
        <TextField
          fullWidth
          placeholder="이름, 직급, 부서로 검색"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1rem', color: colors.textSecondary }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: theme.searchBg,
              fontSize: '0.875rem',
              '& fieldset': { borderColor: colors.borderColor },
              '&:hover fieldset': { borderColor: theme.searchHoverBorder },
              '&.Mui-focused fieldset': { borderColor: theme.inputFocusColor },
            },
            '& .MuiInputBase-input': {
              color: colors.textPrimary,
              '&::placeholder': { color: colors.textSecondary, opacity: 1 },
            },
          }}
        />

        {/* 후보 목록 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            maxHeight: 280,
            overflow: 'auto',
            pr: 0.25,
            mb: 2,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: theme.scrollbarThumb,
              borderRadius: 9999,
            },
            scrollbarWidth: 'thin',
            scrollbarColor: theme.scrollbarColor,
          }}
        >
          {filtered.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                검색 결과가 없습니다
              </Typography>
            </Box>
          ) : (
            filtered.map((candidate) => {
              const isSelected = selectedId === candidate.employeeId
              const isCurrent  = candidate.employeeId === currentApprover?.approverId
              return (
                <Box
                  key={candidate.employeeId}
                  onClick={() => !isCurrent && setSelectedId(candidate.employeeId)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 1.5,
                    border: `1px solid ${isSelected ? theme.candidateSelectedBorder : colors.borderColor}`,
                    bgcolor: isSelected
                      ? theme.candidateSelectedBg
                      : isCurrent
                      ? theme.candidateCurrentBg
                      : theme.candidateBg,
                    cursor: isCurrent ? 'default' : 'pointer',
                    opacity: isCurrent ? 0.55 : 1,
                    transition: 'all 0.12s ease',
                    '&:hover': isCurrent
                      ? {}
                      : {
                          bgcolor: theme.candidateHoverBg,
                          borderColor: theme.candidateHoverBorder,
                        },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: isSelected ? theme.candidateAvatarSelectedBg : theme.candidateAvatarBg,
                      color: isSelected ? theme.candidateSelectedAvatarColor : colors.textSecondary,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: `1px solid ${isSelected ? theme.candidateSelectedAvatarBorder : colors.borderColor}`,
                      flexShrink: 0,
                    }}
                  >
                    {candidate.name[0]}
                  </Avatar>

                  <Box flex={1} minWidth={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography
                        sx={{
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? theme.candidateSelectedTextColor : colors.textPrimary,
                          lineHeight: 1.3,
                        }}
                      >
                        {candidate.name}
                      </Typography>
                      {isCurrent && (
                        <Chip
                          label="현재"
                          size="small"
                          sx={{
                            height: 14,
                            fontSize: '0.55rem',
                            fontWeight: 700,
                            bgcolor: theme.currentChipBg,
                            color: colors.textSecondary,
                            '& .MuiChip-label': { px: 0.5 },
                          }}
                        />
                      )}
                    </Box>
                    <Typography sx={{ fontSize: '0.68rem', color: colors.textSecondary, fontFamily: 'monospace' }}>
                      {candidate.rollNm} · {candidate.section}
                    </Typography>
                  </Box>

                  {isSelected && (
                    <CheckIcon sx={{ fontSize: '1rem', color: theme.candidateSelectedTextColor, flexShrink: 0 }} />
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
          px: 2.5,
          py: 2,
          borderTop: `1px solid ${colors.borderColor}`,
          display: 'flex',
          gap: 1.5,
          justifyContent: 'flex-end',
          bgcolor: theme.footerBg,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleClose}
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            py: 0.8,
            fontWeight: 600,
            fontSize: '0.82rem',
            textTransform: 'none',
            borderColor: theme.decisionCancelBorder,
            color: colors.textSecondary,
            '&:hover': { borderColor: colors.textSecondary, bgcolor: 'transparent' },
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={!canConfirm || assignApprover.isPending}
          onClick={handleConfirm}
          startIcon={<SwapHorizIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            py: 0.8,
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'none',
            bgcolor: theme.primaryBtnBg,
            color: theme.primaryBtnColor,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: theme.primaryBtnHoverBg,
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            },
            '&.Mui-disabled': { opacity: 0.38 },
            transition: 'all 0.2s ease',
          }}
        >
          {assignApprover.isPending ? '변경 중...' : '변경하기'}
        </Button>
      </Box>
    </Dialog>
  )
}
