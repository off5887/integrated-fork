// src/routes/Judge/components/ParticipantsSection.tsx
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Chip, Typography } from '@mui/material'
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getJudgeTheme } from '@/theme/judgeTheme'
import { stageConfig } from '../config/judgeStageConfig'

interface Props {
  reviewer1: string
  reviewer2: string
  reviewer3: string
  reviewStage: 1 | 2 | 3
  proposers: string[]
}

export default function ParticipantsSection({ reviewer1, reviewer2, reviewer3, reviewStage, proposers }: Props) {
  const { isDarkMode } = useThemeMode()
  const colors = usePageColors()
  const theme = getJudgeTheme(isDarkMode)

  const reviewers: { stage: 1 | 2 | 3; name: string }[] = [
    { stage: 1, name: reviewer1 },
    { stage: 2, name: reviewer2 },
    { stage: 3, name: reviewer3 },
  ]

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
        {/* 심사자 (1차/2차/3차) */}
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {reviewers.map(({ stage, name }) => {
              const sc = stageConfig[stage]
              const isActive = stage === reviewStage
              return (
                <Box
                  key={stage}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: isActive ? sc.activeBg : 'transparent',
                    border: `1px solid ${isActive ? sc.border : 'transparent'}`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Chip
                    label={`${stage}차`}
                    size="small"
                    sx={{
                      bgcolor: sc.bg,
                      color: sc.color,
                      border: `1px solid ${sc.border}`,
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      height: 20,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? sc.color : colors.textPrimary,
                    }}
                  >
                    {name}
                  </Typography>
                  {isActive && (
                    <Chip
                      label="진행 중"
                      size="small"
                      sx={{
                        ml: 'auto',
                        bgcolor: sc.bg,
                        color: sc.color,
                        border: `1px solid ${sc.border}`,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: 18,
                      }}
                    />
                  )}
                </Box>
              )
            })}
          </Box>
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
            {proposers.length > 0 ? (
              proposers.map((name, idx) => (
                <Chip
                  key={idx}
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
      </Box>
    </Box>
  )
}
