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
import { useThemeMode } from '@/context/ThemeContext'
import { usePageColors } from '@/theme/pageColors'
import { getSettingsTheme } from '@/theme/settingsTheme'

interface Props {
  members: OrgMember[]
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const OrgPanel: React.FC<Props> = ({ members, searchTerm, setSearchTerm }) => {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor } = usePageColors()
  const st = getSettingsTheme(isDarkMode)

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
            bgcolor: st.inputBg,
            fontSize: '0.875rem',
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor: st.inputHoverBorder },
            '&.Mui-focused fieldset': { borderColor: st.inputFocusBorder },
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
            background: st.scrollbarThumb,
            borderRadius: 9999,
          },
          '&::-webkit-scrollbar-thumb:hover': { background: st.scrollbarThumbHover },
          scrollbarWidth: 'thin',
          scrollbarColor: `${st.scrollbarThumb} transparent`,
        }}
      >
        {grouped.map(([division, people]) => (
          <Accordion
            key={division}
            defaultExpanded
            disableGutters
            elevation={0}
            sx={{
              bgcolor: st.panelAccordionBg,
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
                bgcolor: st.accordionDivisionBg,
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <Typography variant="caption" fontWeight={700} sx={{ color: st.primaryColor, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
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
                      bgcolor: st.memberRowBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 2,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: st.memberRowHoverBg,
                        borderColor: st.memberRowHoverBorder,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32, height: 32,
                        bgcolor: st.avatarBg,
                        color: st.primaryColor,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: `1px solid ${st.avatarBorder}`,
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
                            bgcolor: st.chipBg,
                            color: st.primaryColor,
                            border: `1px solid ${st.avatarBorder}`,
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
