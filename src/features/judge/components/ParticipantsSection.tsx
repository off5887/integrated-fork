// src/routes/Judge/components/ParticipantsSection.tsx
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Chip, Typography } from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useJudgeTheme } from '@/theme/judgeTheme'

interface Props {
  reviewer: string
  author: string
  coProposers: string[]
}

export default function ParticipantsSection({ reviewer, author, coProposers }: Props) {
  const colors = usePageColors()
  const theme = useJudgeTheme()

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 26, height: 26, borderRadius: '50%',
            bgcolor: theme.sectionNumBg, color: theme.sectionNumColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
          }}
        >
          2
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
          참여자
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* 작성자 */}
        <Box
          sx={{
            flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: theme.proposerPanelBg,
            border: `1px solid ${theme.proposerPanelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonAddIcon sx={{ color: theme.proposerIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              작성자
            </Typography>
          </Box>
          {author ? (
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                p: 1.25, borderRadius: 1.5,
                bgcolor: theme.proposerChipBg,
                border: `1px solid ${theme.proposerChipBorder}`,
              }}
            >
              <Box
                sx={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  bgcolor: theme.proposerIconColor, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 700,
                }}
              >
                {author.charAt(0)}
              </Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: theme.proposerChipColor }}>
                {author}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: colors.textSecondary, fontStyle: 'italic' }}>
              작성자 정보 없음
            </Typography>
          )}
        </Box>

        {/* 공동제안자 */}
        <Box
          sx={{
            flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: theme.proposerPanelBg,
            border: `1px solid ${theme.proposerPanelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <GroupAddIcon sx={{ color: theme.proposerIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              공동제안자
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {coProposers.length > 0 ? (
              coProposers.map((name, idx) => (
                <Chip
                  key={`${name}-${idx}`}
                  label={name}
                  size="medium"
                  sx={{
                    bgcolor: theme.proposerChipBg,
                    color: theme.proposerChipColor,
                    border: `1px solid ${theme.proposerChipBorder}`,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: colors.textSecondary, fontStyle: 'italic' }}>
                공동제안자가 없습니다
              </Typography>
            )}
          </Box>
        </Box>

        {/* 심사자 */}
        <Box
          sx={{
            flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: theme.reviewerPanelBg,
            border: `1px solid ${theme.reviewerPanelBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonAddIcon sx={{ color: theme.primaryIconColor, fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: theme.panelLabelColor, fontSize: '0.875rem' }}>
              심사자
            </Typography>
          </Box>
          {reviewer ? (
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                p: 1.25, borderRadius: 1.5,
                bgcolor: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.3)',
              }}
            >
              <Box
                sx={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  bgcolor: theme.primaryIconColor, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 700,
                }}
              >
                {reviewer.charAt(0)}
              </Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#0ea5e9' }}>
                {reviewer}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: colors.textSecondary, fontStyle: 'italic' }}>
              심사자가 배정되지 않았습니다
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
