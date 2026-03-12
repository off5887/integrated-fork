// src/routes/idea/ParticipantsSection.tsx
// import GroupAddIcon from '@mui/icons-material/GroupAdd'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PublicIcon from '@mui/icons-material/Public'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { getIdeaTheme } from '@/theme/ideaTheme'

interface Props {
  reviewer: string[]
  setReviewer: (v: string[]) => void
  // coProposers: string[]
  // setCoProposers: (v: string[]) => void
  security: 'public' | 'private'
  setSecurity: (v: 'public' | 'private') => void
  isDarkMode: boolean
  onOpenReviewerModal: () => void
  // onOpenCoProposerModal: () => void
}

const VISIBILITY_OPTIONS = [
  {
    value: 'public' as const,
    icon: PublicIcon,
    label: '전체 공개',
    description: '모든 구성원이 이 제안을 열람할 수 있습니다',
    accentColor: '#6366f1',
    accentBg: 'rgba(99,102,241,0.1)',
    accentBorder: 'rgba(99,102,241,0.35)',
    accentBgDark: 'rgba(99,102,241,0.12)',
    accentBorderDark: 'rgba(99,102,241,0.4)',
  },
  {
    value: 'private' as const,
    icon: LockIcon,
    label: '비공개',
    description: '제안자와 담당 심사자만 확인할 수 있습니다',
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.1)',
    accentBorder: 'rgba(139,92,246,0.35)',
    accentBgDark: 'rgba(139,92,246,0.12)',
    accentBorderDark: 'rgba(139,92,246,0.4)',
  },
]

export default function ParticipantsSection({
  reviewer,
  setReviewer,
  // coProposers,
  // setCoProposers,
  security,
  setSecurity,
  isDarkMode,
  onOpenReviewerModal,
  // onOpenCoProposerModal,
}: Props) {
  const { textPrimary, textSecondary, borderColor } = getIdeaTheme(isDarkMode)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: '#6366f1', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          2
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary, letterSpacing: '-0.01em' }}>
          심사자 & 공개 범위
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* 심사자 */}
        <Box
          sx={{
            flex: 1, minWidth: 0, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.1)'}`,
          }}
        >
          {/* 헤더 + 추가 버튼 한 줄 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonAddIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
              <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
                심사자
              </Typography>
              {reviewer.length > 0 && (
                <Box
                  aria-label={`${reviewer.length}명 선택됨`}
                  sx={{
                    minWidth: 20, height: 20, borderRadius: '50%', px: 0.5,
                    bgcolor: '#6366f1', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', fontWeight: 800,
                  }}
                >
                  {reviewer.length}
                </Box>
              )}
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PersonAddIcon sx={{ fontSize: '0.85rem' }} />}
              onClick={onOpenReviewerModal}
              sx={{
                borderRadius: 1.5, px: 1.5, py: 0.45, fontWeight: 600, fontSize: '0.76rem',
                borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
                color: isDarkMode ? '#a5b4fc' : '#4338ca',
                '&:hover': { borderColor: '#6366f1', bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)' },
              }}
            >
              추가
            </Button>
          </Box>

          {/* 칩 목록 or 빈 상태 */}
          {reviewer.length === 0 ? (
            <Box
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                py: 3, gap: 1, borderRadius: 2,
                border: `1px dashed ${isDarkMode ? 'rgba(148,163,184,0.2)' : 'rgba(203,213,225,0.9)'}`,
                bgcolor: isDarkMode ? 'rgba(15,23,42,0.2)' : 'rgba(248,250,252,0.6)',
              }}
            >
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: '50%', mb: 0.5,
                  bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <PersonAddIcon sx={{ fontSize: '1.1rem', color: isDarkMode ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.4)' }} />
              </Box>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: textSecondary }}>
                심사자를 추가해주세요
              </Typography>
              <Typography sx={{ fontSize: '0.73rem', color: textSecondary, opacity: 0.7 }}>
                위 버튼을 눌러 심사자를 선택할 수 있습니다
              </Typography>
            </Box>
          ) : (
            <Box
              role="list"
              aria-label="선택된 심사자 목록"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {reviewer.map((name, i) => {
                const [displayName, deptPart] = name.includes(' (') ? name.split(' (') : [name, '']
                const dept = deptPart ? deptPart.replace(')', '') : ''
                const initial = displayName.trim().charAt(0)
                return (
                  <Box
                    key={i}
                    role="listitem"
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 1.5, py: 1, borderRadius: 2,
                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                      border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
                    }}
                  >
                    {/* 아바타 */}
                    <Box
                      aria-hidden
                      sx={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        bgcolor: '#6366f1', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.78rem', fontWeight: 700,
                      }}
                    >
                      {initial}
                    </Box>
                    {/* 이름 + 부서 */}
                    <Box flex={1} minWidth={0}>
                      <Typography sx={{ fontSize: '0.83rem', fontWeight: 600, color: isDarkMode ? '#e2e8f0' : '#1e293b', lineHeight: 1.2 }}>
                        {displayName.trim()}
                      </Typography>
                      {dept && (
                        <Typography sx={{ fontSize: '0.72rem', color: textSecondary, lineHeight: 1.3 }}>
                          {dept}
                        </Typography>
                      )}
                    </Box>
                    {/* 삭제 */}
                    <IconButton
                      size="small"
                      onClick={() => setReviewer(reviewer.filter((_, idx) => idx !== i))}
                      aria-label={`${displayName.trim()} 심사자 제거`}
                      sx={{
                        p: 0.5, color: textSecondary,
                        '&:hover': { color: '#ef4444', bgcolor: 'rgba(239,68,68,0.08)' },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                )
              })}
            </Box>
          )}

          {/* 안내 메시지 */}
          <Box
            sx={{
              mt: 2, display: 'flex', alignItems: 'flex-start', gap: 0.75,
              px: 1.5, py: 1.25, borderRadius: 1.5,
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)'}`,
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: '0.85rem', color: '#6366f1', mt: '1px', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.75rem', color: textSecondary, lineHeight: 1.6 }}>
              심사자는 관리자가 등록한 구성원 중에서만 선택할 수 있으며, 선택된 심사자에게 제안 검토 요청이 전달됩니다.
            </Typography>
          </Box>
        </Box>

        {/* 공동제안자 - 추후 사용 */}
        {/*
        <Box
          sx={{
            flex: 1, minWidth: 0, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.03)',
            border: `1px solid ${isDarkMode ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0.1)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
            <GroupAddIcon sx={{ color: '#8b5cf6', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
              공동제안자
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 44, mb: 2.5 }}>
            {coProposers.length === 0 ? (
              <Typography variant="body2" sx={{ color: textSecondary, py: 0.5 }}>
                아직 추가된 공동제안자가 없습니다
              </Typography>
            ) : coProposers.map((name, i) => (
              <Chip
                key={i}
                label={name}
                variant="outlined"
                size="medium"
                onDelete={() => setCoProposers(coProposers.filter((_, idx) => idx !== i))}
                sx={{
                  borderColor: isDarkMode ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.3)',
                  color: isDarkMode ? '#c4b5fd' : '#6d28d9',
                  bgcolor: isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)',
                  '&:hover': { bgcolor: isDarkMode ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.12)' },
                }}
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<GroupAddIcon sx={{ fontSize: '1rem' }} />}
            onClick={onOpenCoProposerModal}
            sx={{
              borderRadius: 1.5, py: 0.9, fontWeight: 600, fontSize: '0.8rem',
              borderColor: isDarkMode ? 'rgba(139,92,246,0.35)' : 'rgba(139,92,246,0.3)',
              color: isDarkMode ? '#c4b5fd' : '#6d28d9',
              '&:hover': { borderColor: '#8b5cf6', bgcolor: isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)' },
            }}
          >
            공동제안자 추가
          </Button>
        </Box>
        */}

        {/* 공개 범위 */}
        <Box
          sx={{
            flex: 1, minWidth: 0, borderRadius: 2.5,
            border: `1px solid ${borderColor}`,
            bgcolor: isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbfc',
            overflow: 'hidden',
          }}
        >
          {/* 패널 헤더 */}
          <Box
            sx={{
              px: 2.5, py: 1.75,
              display: 'flex', alignItems: 'center', gap: 1,
              borderBottom: `1px solid ${borderColor}`,
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)',
            }}
          >
            <PublicIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography fontWeight={700} sx={{ color: textPrimary, fontSize: '0.9rem' }}>
              공개 범위
            </Typography>
          </Box>

          {/* 선택 카드 */}
          <Box
            sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}
            role="radiogroup"
            aria-label="공개 범위 선택"
          >
            {VISIBILITY_OPTIONS.map((opt) => {
              const isSelected = security === opt.value
              const IconComp = opt.icon
              return (
                <Box
                  key={opt.value}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => setSecurity(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSecurity(opt.value)
                    }
                  }}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    p: 2, borderRadius: 2.5,
                    border: `1.5px solid ${isSelected
                      ? isDarkMode ? opt.accentBorderDark : opt.accentBorder
                      : borderColor}`,
                    bgcolor: isSelected
                      ? isDarkMode ? opt.accentBgDark : opt.accentBg
                      : isDarkMode ? 'rgba(30,41,59,0.4)' : '#ffffff',
                    cursor: 'pointer', outline: 'none',
                    transition: 'all 0.18s ease',
                    boxShadow: isSelected ? `0 4px 16px ${opt.accentBg}` : 'none',
                    '&:hover': {
                      bgcolor: isDarkMode ? opt.accentBgDark : opt.accentBg,
                      borderColor: isDarkMode ? opt.accentBorderDark : opt.accentBorder,
                    },
                    '&:focus-visible': { outline: `2px solid ${opt.accentColor}`, outlineOffset: 2 },
                  }}
                >
                  <Box
                    sx={{
                      width: 40, height: 40, borderRadius: 2,
                      bgcolor: isSelected
                        ? isDarkMode ? opt.accentBgDark : opt.accentBg
                        : isDarkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)',
                      border: `1px solid ${isSelected
                        ? isDarkMode ? opt.accentBorderDark : opt.accentBorder
                        : borderColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.18s ease',
                    }}
                  >
                    <IconComp sx={{ fontSize: '1.3rem', color: isSelected ? opt.accentColor : textSecondary, transition: 'color 0.18s ease' }} />
                  </Box>
                  <Box flex={1} minWidth={0}>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? opt.accentColor : textPrimary, lineHeight: 1.3, mb: 0.3, transition: 'color 0.18s ease' }}>
                      {opt.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.73rem', color: isSelected ? (isDarkMode ? `${opt.accentColor}cc` : `${opt.accentColor}aa`) : textSecondary, lineHeight: 1.4, transition: 'color 0.18s ease' }}>
                      {opt.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${isSelected ? opt.accentColor : borderColor}`,
                      bgcolor: isSelected ? opt.accentColor : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.18s ease',
                    }}
                  >
                    {isSelected && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fff' }} />}
                  </Box>
                </Box>
              )
            })}

            {/* 선택 상태 요약 */}
            <Box
              sx={{
                mt: 0.5, px: 1.75, py: 1.25, borderRadius: 2,
                bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,250,252,0.8)',
                border: `1px dashed ${borderColor}`,
                display: 'flex', alignItems: 'center', gap: 1,
              }}
            >
              {security === 'public'
                ? <PublicIcon sx={{ fontSize: '0.9rem', color: '#6366f1', flexShrink: 0 }} />
                : <LockOpenIcon sx={{ fontSize: '0.9rem', color: '#8b5cf6', flexShrink: 0 }} />
              }
              <Typography sx={{ fontSize: '0.75rem', color: textSecondary, lineHeight: 1.4 }}>
                {security === 'public'
                  ? '이 제안은 등록 후 모든 구성원에게 공개됩니다.'
                  : '이 제안은 등록 후 제안자와 심사자만 볼 수 있습니다.'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}