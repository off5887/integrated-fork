// src/routes/tf/components/ApplicantList.tsx
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { getTFTheme } from '@/theme/tfTheme'
import type { Applicant } from '@/api/types/mercenary'

interface ApplicantListProps {
  applicants: Applicant[]
  onAccept: (id: number) => void
  onReject: (id: number) => void
}

export default function ApplicantList({ applicants, onAccept, onReject }: ApplicantListProps) {
  const colors = usePageColors()
  const { isDarkMode } = useThemeMode()
  const tf = getTFTheme(isDarkMode)

  return (
    <Box
      sx={{
        bgcolor: colors.cardBg,
        borderRadius: 3,
        border: `1px solid ${colors.borderColor}`,
        boxShadow: colors.cardShadow,
        overflow: 'hidden',
      }}
    >
      {/* 상단 그라디언트 스트립 */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 26, height: 26, borderRadius: '50%',
              bgcolor: '#6366f1', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
            }}
          >
            <PersonIcon sx={{ fontSize: '0.9rem' }} />
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: colors.textPrimary, letterSpacing: '-0.01em' }}>
            지원 온 용병 목록
          </Typography>
          {applicants.length > 0 && (
            <Chip
              label={`${applicants.length}명`}
              size="small"
              sx={{
                bgcolor: tf.urgentBgStrong,
                color: tf.urgentColor,
                border: `1px solid ${tf.urgentBorderStrong}`,
                fontWeight: 700,
                fontSize: '0.72rem',
              }}
            />
          )}
        </Box>

        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {applicants.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 10,
                borderRadius: 2,
                border: `1px dashed ${tf.emptyStateBorder}`,
                bgcolor: tf.emptyStateBg,
              }}
            >
              <GroupsIcon sx={{ fontSize: '2.5rem', color: colors.textSecondary, opacity: 0.3, mb: 1.5 }} />
              <Typography sx={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                아직 지원 온 용병이 없습니다
              </Typography>
            </Box>
          ) : (
            applicants.map((app) => (
              <ListItem
                key={app.id}
                sx={{
                  bgcolor: colors.rowBg,
                  borderRadius: 2,
                  border: `1px solid ${colors.borderColor}`,
                  px: 3,
                  py: 1.75,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: colors.rowHoverBg,
                    borderColor: tf.hoverAccentBorder,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 38, height: 38,
                      bgcolor: colors.accentBg,
                      color: colors.accentColor,
                      border: `1px solid ${colors.accentBorder}`,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: '1.1rem' }} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={app.name}
                  secondary={app.dept}
                  slotProps={{
                    primary: { style: { fontWeight: 700, fontSize: '0.92rem', color: colors.textPrimary } },
                    secondary: { style: { fontSize: '0.78rem', color: colors.textSecondary } },
                  }}
                />

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onAccept(app.id)}
                    sx={{
                      borderRadius: 9999,
                      px: 2.5,
                      py: 0.7,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'none',
                      borderColor: tf.acceptBorder,
                      color: tf.acceptColor,
                      '&:hover': {
                        bgcolor: tf.acceptHoverBg,
                        borderColor: tf.acceptHoverBorder,
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    수락
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onReject(app.id)}
                    sx={{
                      borderRadius: 9999,
                      px: 2.5,
                      py: 0.7,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textTransform: 'none',
                      borderColor: tf.rejectBorder,
                      color: tf.rejectColor,
                      '&:hover': {
                        bgcolor: tf.rejectHoverBg,
                        borderColor: tf.rejectHoverBorder,
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    거절
                  </Button>
                </Stack>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  )
}
