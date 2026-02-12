// src/routes/idea/ParticipantsSection.tsx
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'

interface Props {
  reviewer: string[]
  setReviewer: (v: string[]) => void
  coProposers: string[]
  setCoProposers: (v: string[]) => void
  isDarkMode: boolean
}

export default function ParticipantsSection({
  reviewer,
  setReviewer,
  coProposers,
  setCoProposers,
  isDarkMode,
}: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 4,
          color: isDarkMode ? '#60a5fa' : '#2563eb',
        }}
      >
        2. 참여자
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 5 },
        }}
      >
        {/* 심사자 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: isDarkMode
                ? 'rgba(30,41,59,0.85)'
                : 'rgba(255,255,255,0.94)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)'}`,
              boxShadow: isDarkMode
                ? '0 10px 40px rgba(0,0,0,0.4)'
                : '0 10px 40px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}
            >
              <PersonAddIcon
                sx={{ color: isDarkMode ? '#93c5fd' : '#1d4ed8' }}
                fontSize="medium"
              />
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
              >
                심사자
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.2,
                minHeight: 52,
                mb: 3.5,
              }}
            >
              {reviewer.map((name, i) => (
                <Chip
                  key={i}
                  label={name}
                  color="primary"
                  variant="outlined"
                  size="medium"
                  sx={{
                    borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                    color: isDarkMode ? '#dbeafe' : '#1e40af',
                    bgcolor: isDarkMode
                      ? 'rgba(96,165,250,0.15)'
                      : 'rgba(37,99,235,0.1)',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(96,165,250,0.25)'
                        : 'rgba(37,99,235,0.15)',
                    },
                  }}
                />
              ))}

              {reviewer.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    py: 1,
                  }}
                >
                  아직 추가된 심사자가 없습니다
                </Typography>
              )}
            </Box>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<PersonAddIcon />}
              onClick={() => alert('심사자 선택 모달')}
              sx={{
                borderRadius: 2,
                py: 1.5,
                borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                color: isDarkMode ? '#bfdbfe' : '#1e40af',
                fontWeight: 500,
                '&:hover': {
                  borderColor: isDarkMode ? '#3b82f6' : '#1d4ed8',
                  bgcolor: isDarkMode
                    ? 'rgba(59,130,246,0.15)'
                    : 'rgba(29,78,216,0.08)',
                  color: isDarkMode ? '#dbeafe' : '#1e3a8a',
                },
              }}
            >
              심사자 추가
            </Button>
          </Paper>
        </Box>

        {/* 공동제안자 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: isDarkMode
                ? 'rgba(30,41,59,0.85)'
                : 'rgba(255,255,255,0.94)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)'}`,
              boxShadow: isDarkMode
                ? '0 10px 40px rgba(0,0,0,0.4)'
                : '0 10px 40px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}
            >
              <GroupAddIcon
                sx={{ color: isDarkMode ? '#c4b5fd' : '#6d28d9' }}
                fontSize="medium"
              />
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
              >
                공동제안자
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.2,
                minHeight: 52,
                mb: 3.5,
              }}
            >
              {coProposers.map((name, i) => (
                <Chip
                  key={i}
                  label={name}
                  color="secondary"
                  variant="outlined"
                  size="medium"
                  sx={{
                    borderColor: isDarkMode ? '#a78bfa' : '#7c3aed',
                    color: isDarkMode ? '#e9d5ff' : '#5b21b6',
                    bgcolor: isDarkMode
                      ? 'rgba(167,139,250,0.15)'
                      : 'rgba(124,58,237,0.1)',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(167,139,250,0.25)'
                        : 'rgba(124,58,237,0.15)',
                    },
                  }}
                />
              ))}

              {coProposers.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    py: 1,
                  }}
                >
                  아직 추가된 공동제안자가 없습니다
                </Typography>
              )}
            </Box>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GroupAddIcon />}
              onClick={() => alert('공동제안자 선택 모달')}
              sx={{
                borderRadius: 2,
                py: 1.5,
                borderColor: isDarkMode ? '#a78bfa' : '#7c3aed',
                color: isDarkMode ? '#ddd6fe' : '#5b21b6',
                fontWeight: 500,
                '&:hover': {
                  borderColor: isDarkMode ? '#8b5cf6' : '#6d28d9',
                  bgcolor: isDarkMode
                    ? 'rgba(139,92,246,0.15)'
                    : 'rgba(109,40,217,0.08)',
                  color: isDarkMode ? '#f3e8ff' : '#4c1d95',
                },
              }}
            >
              공동제안자 추가
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
