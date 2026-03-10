// src/routes/idea/ParticipantsSection.tsx
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Button, Chip, Typography } from '@mui/material'
import { getIdeaTheme } from '../../../theme/ideaTheme'

interface Props {
  reviewer: string[]
  setReviewer: (v: string[]) => void
  coProposers: string[]
  setCoProposers: (v: string[]) => void
  isDarkMode: boolean
  onOpenReviewerModal: () => void
  onOpenCoProposerModal: () => void
}

export default function ParticipantsSection({
  reviewer,
  setReviewer,
  coProposers,
  setCoProposers,
  isDarkMode,
  onOpenReviewerModal,
  onOpenCoProposerModal,
}: Props) {
  const { textPrimary, textSecondary } = getIdeaTheme(isDarkMode)

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
          참여자
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
            <PersonAddIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
              심사자
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 44, mb: 2.5 }}>
            {reviewer.length === 0 ? (
              <Typography variant="body2" sx={{ color: textSecondary, py: 0.5 }}>
                아직 추가된 심사자가 없습니다
              </Typography>
            ) : reviewer.map((name, i) => {
              const [displayName, deptPart] = name.includes(' (') ? name.split(' (') : [name, '']
              const dept = deptPart ? deptPart.replace(')', '') : ''
              return (
                <Chip
                  key={i}
                  label={
                    <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.3 }}>
                      <span>{displayName.trim()}</span>
                      {dept && (
                        <Typography component="span" variant="caption" sx={{ fontSize: '0.68rem', opacity: 0.75 }}>
                          {dept}
                        </Typography>
                      )}
                    </Box>
                  }
                  variant="outlined"
                  size="medium"
                  onDelete={() => setReviewer(reviewer.filter((_, idx) => idx !== i))}
                  sx={{
                    borderColor: isDarkMode ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)',
                    color: isDarkMode ? '#c7d2fe' : '#4338ca',
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                    height: 'auto', py: 0.5,
                    '& .MuiChip-label': { padding: '4px 10px' },
                    '&:hover': { bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)' },
                  }}
                />
              )
            })}
          </Box>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<PersonAddIcon sx={{ fontSize: '1rem' }} />}
            onClick={onOpenReviewerModal}
            sx={{
              borderRadius: 1.5, py: 0.9, fontWeight: 600, fontSize: '0.8rem',
              borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
              color: isDarkMode ? '#a5b4fc' : '#4338ca',
              '&:hover': { borderColor: '#6366f1', bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)' },
            }}
          >
            심사자 추가
          </Button>
        </Box>

        {/* 공동제안자 */}
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
      </Box>
    </Box>
  )
}
