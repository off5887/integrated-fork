import { useMemo, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import SaveIcon from '@mui/icons-material/Save'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { getSettingsTheme } from '@/theme/settingsTheme'
import { levelConfig } from '@/features/settings/config/levelConfig'
import { statusConfig } from '@/features/settings/config/statusConfig'
import type { Idea } from '@/api/types/settings'
import { useIdeaApprover, useAssignApprover } from '@/api/queries/useIdeas'
import { useUserRoles } from '@/api/queries/useUsers'
import { useSectionReviewers } from '@/api/queries/useSectionReviewers'

/** 심사자 선택 목록에서 사용하는 정규화된 후보 타입 */
interface CandidateItem {
  employeeId: string
  name: string
  rollNm: string
  dept: string
}

interface Props {
  idea: Idea
  changingLevel: 1 | null
  onChangingLevel: (level: 1 | null) => void
}

export default function IdeaDetailPanel({ idea, changingLevel, onChangingLevel }: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, headerBg } = usePageColors()
  const st = useMemo(() => getSettingsTheme(isDarkMode), [isDarkMode])
  const { showSnackbar } = useSnackbar()

  // 현재 배정된 심사자
  const { data: currentApprover } = useIdeaApprover(idea.id)

  // 아이디어 작성자 팀 배정 심사자
  const { data: sectionReviewers = [] } = useSectionReviewers(idea.deptCd)

  // 관리자 목록
  const { data: rolesData } = useUserRoles()

  const teamCandidates: CandidateItem[] = useMemo(
    () =>
      sectionReviewers.map((r) => ({
        employeeId: r.reviewerEmployeeId,
        name: r.name,
        rollNm: r.rollNm,
        dept: r.deptNm,
      })),
    [sectionReviewers],
  )

  const adminCandidates: CandidateItem[] = useMemo(
    () =>
      (rolesData?.admins ?? []).map((a) => ({
        employeeId: a.employeeId,
        name: a.name,
        rollNm: a.rollNm,
        dept: a.section,
      })),
    [rolesData],
  )

  // 심사자 배정 뮤테이션
  const assignApprover = useAssignApprover(idea.id)

  // 선택된 후보 (저장 전 로컬 상태)
  const [pendingApprover, setPendingApprover] = useState<CandidateItem | null>(null)

  const handleSelectCandidate = (candidate: CandidateItem) => {
    setPendingApprover(candidate)
    onChangingLevel(null)
  }

  const handleSave = () => {
    if (!pendingApprover) return
    assignApprover.mutate(pendingApprover.employeeId, {
      onSuccess: () => {
        showSnackbar(`'${idea.title}' 심사자가 ${pendingApprover.name}(으)로 변경되었습니다.`, 'success')
        setPendingApprover(null)
      },
      onError: () => {
        showSnackbar('심사자 변경 중 오류가 발생했습니다.', 'error')
      },
    })
  }

  const level = 1 as const
  const cfg = levelConfig[level]
  const isChanging = changingLevel === level

  // 표시할 심사자: 미저장 선택 > API 현재 심사자
  const displayReviewer = pendingApprover
    ? { name: pendingApprover.name, position: pendingApprover.rollNm, department: pendingApprover.dept, id: pendingApprover.employeeId }
    : currentApprover
    ? { name: currentApprover.approverName, position: '', department: '', id: currentApprover.approverId }
    : null

  const hasPendingChange = pendingApprover !== null

  return (
    <Box
      sx={{
        bgcolor: st.panelBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* 패널 헤더 */}
      <Box
        sx={{
          px: 2.5, py: 2,
          bgcolor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2,
            bgcolor: st.avatarBgLight, border: `1px solid ${st.avatarBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <LightbulbOutlinedIcon sx={{ fontSize: '1.1rem', color: st.primaryColor }} />
        </Box>
        <Box flex={1} minWidth={0}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: textPrimary, lineHeight: 1.35 }}>
            {idea.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.4 }}>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary, fontFamily: 'monospace' }}>
              {idea.submitter}
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: textSecondary, opacity: 0.5 }}>·</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary }}>{idea.department}</Typography>
            <Chip
              label={idea.status}
              size="small"
              sx={{
                ml: 0.5, height: 18, fontSize: '0.6rem', fontWeight: 700,
                bgcolor: statusConfig[idea.status].bg(isDarkMode),
                color: statusConfig[idea.status].color,
                border: `1px solid ${statusConfig[idea.status].border(isDarkMode)}`,
                '& .MuiChip-label': { px: 0.6 },
              }}
            />
            <Typography sx={{ fontSize: '0.7rem', color: textSecondary, opacity: 0.5, ml: 'auto', fontFamily: 'monospace' }}>
              {idea.submittedAt}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* 심사자 변경 섹션 */}
        <Box
          sx={{
            borderRadius: 2,
            border: `1px solid ${isChanging ? cfg.border(isDarkMode) : borderColor}`,
            overflow: 'hidden',
            transition: 'border-color 0.15s ease',
          }}
        >
          {/* 레벨 헤더 */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 2, py: 1.5,
              bgcolor: cfg.bg(isDarkMode),
              borderBottom: `1px solid ${borderColor}`,
              borderLeft: `3px solid ${cfg.accent}`,
            }}
          >
            <Box
              sx={{
                width: 22, height: 22, borderRadius: '50%',
                bgcolor: cfg.accent, color: st.primaryBtnColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, flexShrink: 0, fontFamily: 'monospace',
              }}
            >
              {level}
            </Box>
            <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary, flex: 1, fontSize: '0.82rem' }}>
              {cfg.label}
            </Typography>
            <Button
              size="small"
              variant={isChanging ? 'contained' : 'outlined'}
              startIcon={
                isChanging
                  ? <CloseIcon sx={{ fontSize: '0.85rem !important' }} />
                  : <SwapHorizIcon sx={{ fontSize: '0.85rem !important' }} />
              }
              onClick={() => onChangingLevel(isChanging ? null : level)}
              sx={{
                borderRadius: 9999, px: 1.75, py: 0.4,
                fontSize: '0.75rem', fontWeight: 700, textTransform: 'none', minWidth: 0,
                ...(isChanging
                  ? { bgcolor: cfg.accent, color: st.primaryBtnColor, boxShadow: 'none', '&:hover': { bgcolor: cfg.accent, opacity: 0.88, boxShadow: 'none' } }
                  : { borderColor: cfg.border(isDarkMode), color: cfg.chipColor(isDarkMode), '&:hover': { bgcolor: cfg.bg(isDarkMode), borderColor: cfg.accent } }),
                transition: 'all 0.15s ease',
              }}
            >
              {isChanging ? '취소' : '변경'}
            </Button>
          </Box>

          {/* 현재 심사자 */}
          <Box sx={{ px: 2, py: 1.5, bgcolor: st.contentBg }}>
            {displayReviewer ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 34, height: 34,
                    bgcolor: hasPendingChange ? '#f59e0b22' : cfg.avatarBg(isDarkMode),
                    color: hasPendingChange ? '#f59e0b' : cfg.avatarColor(isDarkMode),
                    fontSize: '0.82rem', fontWeight: 700,
                    border: `1px solid ${hasPendingChange ? '#f59e0b44' : cfg.border(isDarkMode)}`,
                    flexShrink: 0,
                  }}
                >
                  {displayReviewer.name[0]}
                </Avatar>
                <Box flex={1} minWidth={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: textPrimary, lineHeight: 1.3 }}>
                      {displayReviewer.name}
                    </Typography>
                    {hasPendingChange && (
                      <Chip
                        label="미저장"
                        size="small"
                        sx={{
                          height: 14, fontSize: '0.55rem', fontWeight: 700,
                          bgcolor: 'rgba(245,158,11,0.12)', color: '#f59e0b',
                          border: '1px solid rgba(245,158,11,0.3)',
                          '& .MuiChip-label': { px: 0.5 },
                        }}
                      />
                    )}
                  </Box>
                  {displayReviewer.position && (
                    <Typography sx={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace' }}>
                      {displayReviewer.position} · {displayReviewer.department}
                    </Typography>
                  )}
                </Box>
                <Chip
                  label={cfg.label}
                  size="small"
                  sx={{
                    height: 18, fontSize: '0.6rem', fontWeight: 700,
                    bgcolor: cfg.chipBg(isDarkMode), color: cfg.chipColor(isDarkMode),
                    border: `1px solid ${cfg.border(isDarkMode)}`,
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: textSecondary, opacity: 0.65 }}>
                배정된 심사자 없음
              </Typography>
            )}
          </Box>

          {/* 심사자 선택 패널 */}
          {isChanging && (
            <Box
              sx={{
                borderTop: `1px dashed ${cfg.border(isDarkMode)}`,
                px: 2, py: 1.5,
                bgcolor: st.dialogFooterBg,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: textSecondary, fontSize: '0.68rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', mb: 1 }}
              >
                심사자 목록에서 선택
              </Typography>
              <Box
                sx={{
                  display: 'flex', flexDirection: 'column', gap: 0.75,
                  maxHeight: 280, overflow: 'auto',
                  '&::-webkit-scrollbar': { width: 4 },
                  '&::-webkit-scrollbar-thumb': { background: st.scrollbarThumb, borderRadius: 9999 },
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${st.scrollbarThumb} transparent`,
                }}
              >
                {teamCandidates.length === 0 && adminCandidates.length === 0 ? (
                  <Typography variant="caption" sx={{ color: textSecondary, py: 2, textAlign: 'center', display: 'block' }}>
                    배정 가능한 심사자가 없습니다
                  </Typography>
                ) : (
                  <>
                    {/* 팀 배정 심사자 */}
                    {teamCandidates.length > 0 && (
                      <>
                        <Typography
                          variant="caption"
                          sx={{ color: textSecondary, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', pt: 0.25 }}
                        >
                          팀 심사자
                        </Typography>
                        {teamCandidates.map((candidate) => (
                          <CandidateRow
                            key={candidate.employeeId}
                            candidate={candidate}
                            isCurrent={candidate.employeeId === currentApprover?.approverId}
                            isPending={candidate.employeeId === pendingApprover?.employeeId}
                            cfg={cfg}
                            isDarkMode={isDarkMode}
                            textPrimary={textPrimary}
                            textSecondary={textSecondary}
                            borderColor={borderColor}
                            st={st}
                            onClick={handleSelectCandidate}
                          />
                        ))}
                      </>
                    )}

                    {/* 관리자 */}
                    {adminCandidates.length > 0 && (
                      <>
                        <Typography
                          variant="caption"
                          sx={{ color: textSecondary, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', pt: teamCandidates.length > 0 ? 1 : 0.25 }}
                        >
                          관리자
                        </Typography>
                        {adminCandidates.map((candidate) => (
                          <CandidateRow
                            key={candidate.employeeId}
                            candidate={candidate}
                            isCurrent={candidate.employeeId === currentApprover?.approverId}
                            isPending={candidate.employeeId === pendingApprover?.employeeId}
                            cfg={cfg}
                            isDarkMode={isDarkMode}
                            textPrimary={textPrimary}
                            textSecondary={textSecondary}
                            borderColor={borderColor}
                            st={st}
                            onClick={handleSelectCandidate}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>

        {/* 저장 버튼 */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="small"
            disabled={!hasPendingChange || assignApprover.isPending}
            startIcon={<SaveIcon sx={{ fontSize: '0.9rem' }} />}
            onClick={handleSave}
            sx={{
              borderRadius: 9999, px: 3, py: 0.9,
              fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
              bgcolor: st.primaryColor, color: st.primaryBtnColor, boxShadow: 'none',
              '&:hover': { bgcolor: st.primaryHoverBg, boxShadow: st.primaryBtnHoverShadow },
              '&.Mui-disabled': { opacity: 0.38 },
              transition: 'all 0.2s ease',
            }}
          >
            {assignApprover.isPending ? '저장 중...' : '저장하기'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// ─── 후보 행 ──────────────────────────────────────────────────────────────────

interface CandidateRowProps {
  candidate: CandidateItem
  isCurrent: boolean
  isPending: boolean
  cfg: (typeof import('@/features/settings/config/levelConfig').levelConfig)[1]
  isDarkMode: boolean
  textPrimary: string
  textSecondary: string
  borderColor: string
  st: ReturnType<typeof import('@/theme/settingsTheme').getSettingsTheme>
  onClick: (c: CandidateItem) => void
}

function CandidateRow({
  candidate, isCurrent, isPending,
  cfg, isDarkMode,
  textPrimary, textSecondary, borderColor, st,
  onClick,
}: CandidateRowProps) {
  return (
    <Box
      onClick={() => onClick(candidate)}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1.25,
        p: 1.25, borderRadius: 1.5,
        border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
        bgcolor: isCurrent ? cfg.bg(isDarkMode) : st.reviewerItemBg,
        cursor: 'pointer',
        transition: 'all 0.12s ease',
        '&:hover': { bgcolor: cfg.bg(isDarkMode), borderColor: cfg.border(isDarkMode) },
      }}
    >
      <Avatar
        sx={{
          width: 28, height: 28,
          bgcolor: isCurrent ? cfg.avatarBg(isDarkMode) : st.reviewerAvatarDefaultBg,
          color: isCurrent ? cfg.avatarColor(isDarkMode) : textSecondary,
          fontSize: '0.7rem', fontWeight: 700,
          border: `1px solid ${isCurrent ? cfg.border(isDarkMode) : borderColor}`,
          flexShrink: 0,
        }}
      >
        {candidate.name[0]}
      </Avatar>
      <Box flex={1} minWidth={0}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: isCurrent ? 700 : 600, color: isCurrent ? cfg.chipColor(isDarkMode) : textPrimary, lineHeight: 1.3 }}>
          {candidate.name}
        </Typography>
        <Typography sx={{ fontSize: '0.68rem', color: textSecondary, fontFamily: 'monospace' }}>
          {candidate.rollNm} · {candidate.dept}
        </Typography>
      </Box>
      {(isCurrent || isPending) && (
        <CheckIcon sx={{ fontSize: '1rem', color: cfg.accent, flexShrink: 0 }} />
      )}
    </Box>
  )
}
