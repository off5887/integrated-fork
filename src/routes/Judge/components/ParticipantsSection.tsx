// src/routes/Judge/components/ParticipantsSection.tsx
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Chip, Typography } from '@mui/material'

interface Props {
  reviewer: string
  proposers: string[]
  isDarkMode: boolean
}

export default function ParticipantsSection({
  reviewer,
  proposers,
  isDarkMode,
}: Props) {
  const accent = isDarkMode ? '#a5b4fc' : '#000000'

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <PeopleAltIcon sx={{ color: accent, fontSize: 24 }} />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: accent, letterSpacing: '-0.01em' }}
        >
          참여자
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* 심사자 */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              mb: 1.5,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
            }}
          >
            심사자
          </Typography>
          <Chip
            icon={<PersonIcon fontSize="small" />}
            label={reviewer}
            sx={{
              height: 40,
              fontSize: '1.05rem',
              fontWeight: 500,
              px: 2,
              bgcolor: isDarkMode
                ? 'rgba(129,140,248,0.12)'
                : 'rgba(99,102,241,0.08)',
              color: isDarkMode ? '#e0e7ff' : '#4338ca',
              border: 'none',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
        </Box>

        {/* 공동제안자 */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              mb: 1.5,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
            }}
          >
            공동제안자
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {proposers.length > 0 ? (
              proposers.map((name, idx) => (
                <Chip
                  key={idx}
                  label={name}
                  sx={{
                    height: 38,
                    fontSize: '1rem',
                    fontWeight: 500,
                    bgcolor: 'transparent',
                    border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`,
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    '&:hover': {
                      borderColor: accent,
                      color: accent,
                      bgcolor: isDarkMode
                        ? 'rgba(129,140,248,0.08)'
                        : 'rgba(99,102,241,0.06)',
                    },
                  }}
                />
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? '#94a3b8' : '#64748b',
                  fontStyle: 'italic',
                }}
              >
                공동제안자가 없습니다
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
