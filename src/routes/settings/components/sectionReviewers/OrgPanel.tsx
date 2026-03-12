import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { OrgMember } from '@/api/types/reviewer'

interface Props {
  members: OrgMember[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  isDarkMode: boolean
}

const OrgPanel: React.FC<Props> = ({ members, searchTerm, setSearchTerm, isDarkMode }) => {
  const textPrimary = isDarkMode ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDarkMode ? '#94a3b8' : '#64748b'
  const borderColor = isDarkMode ? 'rgba(148,163,184,0.1)' : 'rgba(203,213,225,0.5)'

  const grouped = useMemo(() => {
    const filtered = members.filter(
      (m) =>
        m.name.includes(searchTerm) ||
        m.position.includes(searchTerm) ||
        m.department.includes(searchTerm) ||
        m.division.includes(searchTerm),
    )
    const map = new Map<string, OrgMember[]>()
    filtered.forEach((m) => {
      if (!map.has(m.division)) map.set(m.division, [])
      map.get(m.division)!.push(m)
    })
    return Array.from(map.entries())
  }, [members, searchTerm])

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="이름·직급·부서 검색"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 2.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
            fontSize: '0.875rem',
            '& fieldset': { borderColor },
            '&:hover fieldset': {
              borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)',
            },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
          '& .MuiInputBase-input': {
            color: textPrimary,
            '&::placeholder': { color: textSecondary, opacity: 1 },
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          maxHeight: 600,
          overflow: 'auto',
          pr: 0.5,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
            borderRadius: 9999,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: isDarkMode ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.4)',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: isDarkMode
            ? 'rgba(99,102,241,0.25) transparent'
            : 'rgba(99,102,241,0.2) transparent',
        }}
      >
        {grouped.map(([division, people]) => (
          <Accordion
            key={division}
            defaultExpanded
            disableGutters
            elevation={0}
            sx={{
              bgcolor: isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(99,102,241,0.02)',
              border: `1px solid ${borderColor}`,
              borderRadius: '10px !important',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                borderRadius: 2.5,
                minHeight: 44,
                px: 2,
                '&.Mui-expanded': { minHeight: 44 },
              },
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
              sx={{
                bgcolor: isDarkMode ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)',
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <Typography variant="caption" fontWeight={700} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                {division}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Box display="flex" flexDirection="column" gap={1}>
                {people.map((member) => (
                  <Box
                    key={member.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify(member))
                    }}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'grab',
                      '&:active': { cursor: 'grabbing' },
                      bgcolor: isDarkMode ? 'rgba(30,41,59,0.6)' : '#ffffff',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 2,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
                        borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32, height: 32,
                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                        color: isDarkMode ? '#a5b4fc' : '#4338ca',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                        flexShrink: 0,
                      }}
                    >
                      {member.name[0]}
                    </Avatar>
                    <Box flex={1} minWidth={0}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: textPrimary, fontSize: '0.82rem', lineHeight: 1.3 }}>
                        {member.name}
                      </Typography>
                      <Box display="flex" gap={0.75} alignItems="center" mt={0.3}>
                        <Chip
                          label={member.position}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            bgcolor: isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)',
                            color: isDarkMode ? '#a5b4fc' : '#4338ca',
                            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.15)'}`,
                            '& .MuiChip-label': { px: 0.75 },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: textSecondary, fontSize: '0.7rem', fontFamily: 'monospace' }}>
                          {member.department}
                        </Typography>
                      </Box>
                    </Box>
                    <DragIndicatorIcon sx={{ color: textSecondary, opacity: 0.4, fontSize: '1rem', flexShrink: 0 }} />
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}


export default OrgPanel
