// src/routes/Judge/components/ParticipantsSection.tsx
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Chip, Typography } from '@mui/material'

interface Props {
  reviewer: string
  proposers: string[]
  isDarkMode: boolean
}

export default function ParticipantsSection({ reviewer, proposers, isDarkMode }: Props) {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'

  return (
    <Box>
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
            flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.1)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonAddIcon sx={{ color: '#6366f1', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem' }}>
              심사자
            </Typography>
          </Box>
          <Chip
            label={reviewer}
            size="medium"
            sx={{
              bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
              color: isDarkMode ? '#c7d2fe' : '#4338ca',
              border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)'}`,
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          />
        </Box>

        {/* 공동제안자 */}
        <Box
          sx={{
            flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 2.5,
            bgcolor: isDarkMode ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.03)',
            border: `1px solid ${isDarkMode ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0.1)'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <GroupAddIcon sx={{ color: '#8b5cf6', fontSize: '1.1rem' }} />
            <Typography variant="body1" fontWeight={700} sx={{ color: isDarkMode ? '#e2e8f0' : '#1e293b', fontSize: '0.875rem' }}>
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
                    bgcolor: isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.07)',
                    color: isDarkMode ? '#c4b5fd' : '#6d28d9',
                    border: `1px solid ${isDarkMode ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.18)'}`,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: textSecondary, fontStyle: 'italic' }}>
                공동제안자가 없습니다
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
