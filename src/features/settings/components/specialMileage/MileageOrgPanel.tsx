import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { usePageColors } from '@/theme/pageColors'
import { useThemeMode } from '@/context/ThemeContext'
import { mockMileageMembers } from '@/api/mock/settings'
import type { MileageMember } from '@/api/types/settings'

interface Props {
  searchTerm: string
  onSearchChange: (v: string) => void
  onAdd: (member: MileageMember) => void
  selectedIds: string[]
}

export default function MileageOrgPanel({
  searchTerm,
  onSearchChange,
  onAdd,
  selectedIds,
}: Props) {
  const { isDarkMode } = useThemeMode()
  const { textPrimary, textSecondary, borderColor, headerBg } = usePageColors()
  const panelBg = isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(99,102,241,0.02)'

  const isMobile = useMediaQuery('(max-width: 1199px)')
  const [orgPanelOpen, setOrgPanelOpen] = useState(false)
  const showOrgContent = !isMobile || orgPanelOpen

  // 조직도 필터링 + 2단계 그룹핑 (부문 → 팀 → 사람)
  const grouped = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    const filtered = q
      ? mockMileageMembers.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.employeeNumber.toLowerCase().includes(q) ||
            m.department.toLowerCase().includes(q) ||
            m.division.toLowerCase().includes(q) ||
            m.position.toLowerCase().includes(q),
        )
      : mockMileageMembers

    // 부문 → 팀 → 사람 2단계 Map
    const divisionMap = new Map<string, Map<string, MileageMember[]>>()
    filtered.forEach((m) => {
      if (!divisionMap.has(m.division)) divisionMap.set(m.division, new Map())
      const teamMap = divisionMap.get(m.division)!
      if (!teamMap.has(m.department)) teamMap.set(m.department, [])
      teamMap.get(m.department)!.push(m)
    })

    return Array.from(divisionMap.entries()).map(([division, teamMap]) => ({
      division,
      teams: Array.from(teamMap.entries()).map(([team, people]) => ({ team, people })),
      totalCount: filtered.filter((m) => m.division === division).length,
    }))
  }, [searchTerm])

  const isSelected = (id: string) => selectedIds.includes(id)

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? 'rgba(22,30,46,0.6)' : '#fafbff',
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* 패널 헤더 — 모바일에서 클릭하면 접기/펼치기 */}
      <Box
        onClick={() => isMobile && setOrgPanelOpen((v) => !v)}
        sx={{
          px: 2, py: 1.5,
          display: 'flex', alignItems: 'center', gap: 1,
          borderBottom: showOrgContent ? `1px solid ${borderColor}` : 'none',
          bgcolor: headerBg,
          cursor: isMobile ? 'pointer' : 'default',
          userSelect: 'none',
          transition: 'background 0.15s ease',
          '&:hover': isMobile ? { bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)' } : {},
        }}
      >
        <PersonSearchIcon sx={{ fontSize: '1rem', color: isDarkMode ? '#a5b4fc' : '#4338ca' }} />
        <Typography variant="caption" fontWeight={700} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
          조직도 인원
        </Typography>
        <Chip
          label={`${mockMileageMembers.length}명`}
          size="small"
          sx={{
            ml: 'auto', height: 18, fontSize: '0.65rem', fontWeight: 700,
            bgcolor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
            color: isDarkMode ? '#a5b4fc' : '#4338ca',
            border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
        {isMobile && (
          <ExpandMoreIcon
            sx={{
              fontSize: '1.1rem',
              color: isDarkMode ? '#a5b4fc' : '#4338ca',
              ml: 0.5,
              transition: 'transform 0.2s ease',
              transform: orgPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </Box>

      <Collapse in={showOrgContent} timeout={220} unmountOnExit>
      <Box sx={{ p: 2 }}>
        {/* 검색 */}
        <TextField
          fullWidth
          placeholder="이름, 사번, 부서로 검색"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon sx={{ fontSize: '1rem', color: textSecondary }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onSearchChange('')} sx={{ color: textSecondary, p: 0.25 }}>
                    <CloseIcon sx={{ fontSize: '0.9rem' }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: isDarkMode ? 'rgba(15,23,42,0.5)' : '#f8fafc',
              fontSize: '0.875rem',
              '& fieldset': { borderColor },
              '&:hover fieldset': { borderColor: isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.3)' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiInputBase-input': {
              color: textPrimary,
              '&::placeholder': { color: textSecondary, opacity: 1 },
            },
          }}
        />

        {/* 조직도 아코디언 */}
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', gap: 1.5,
            maxHeight: 520, overflow: 'auto', pr: 0.5,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
              borderRadius: 9999,
            },
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode
              ? 'rgba(99,102,241,0.25) transparent'
              : 'rgba(99,102,241,0.2) transparent',
          }}
        >
          {grouped.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <PersonSearchIcon sx={{ fontSize: '2rem', color: textSecondary, opacity: 0.3, mb: 1 }} />
              <Typography variant="body2" sx={{ color: textSecondary }}>
                검색 결과가 없습니다
              </Typography>
            </Box>
          ) : (
            grouped.map(({ division, teams, totalCount }) => (
              /* 부문 아코디언 */
              <Accordion
                key={division}
                defaultExpanded
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: panelBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px !important',
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    borderRadius: 2.5, minHeight: 40, px: 1.75,
                    '&.Mui-expanded': { minHeight: 40 },
                  },
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: textSecondary }} />}
                  sx={{
                    bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)',
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" fontWeight={800} sx={{ color: isDarkMode ? '#a5b4fc' : '#4338ca', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                      {division}
                    </Typography>
                    <Chip
                      label={`${totalCount}명`}
                      size="small"
                      sx={{
                        height: 16, fontSize: '0.6rem', fontWeight: 700,
                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                        color: isDarkMode ? '#a5b4fc' : '#4338ca',
                        '& .MuiChip-label': { px: 0.6 },
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1, pt: 1.25 }}>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {teams.map(({ team, people }) => (
                      /* 팀 아코디언 */
                      <Accordion
                        key={team}
                        defaultExpanded
                        disableGutters
                        elevation={0}
                        sx={{
                          bgcolor: 'transparent',
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px !important',
                          '&:before': { display: 'none' },
                          '& .MuiAccordionSummary-root': {
                            minHeight: 34, px: 1.5,
                            '&.Mui-expanded': { minHeight: 34 },
                          },
                          '& .MuiAccordionSummary-content': { my: 0 },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color: textSecondary }} />}
                          sx={{
                            bgcolor: isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(241,245,249,0.8)',
                            borderBottom: `1px solid ${borderColor}`,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Typography variant="caption" fontWeight={700} sx={{ color: textSecondary, fontSize: '0.7rem' }}>
                              {team}
                            </Typography>
                            <Chip
                              label={`${people.length}`}
                              size="small"
                              sx={{
                                height: 14, fontSize: '0.58rem', fontWeight: 700,
                                bgcolor: isDarkMode ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.08)',
                                color: textSecondary,
                                '& .MuiChip-label': { px: 0.5 },
                              }}
                            />
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0.75 }}>
                          <Box display="flex" flexDirection="column" gap={0.6}>
                            {people.map((member) => {
                              const added = isSelected(member.id)
                              return (
                                <Box
                                  key={member.id}
                                  onClick={() => !added && onAdd(member)}
                                  sx={{
                                    p: 1.1,
                                    display: 'flex', alignItems: 'center', gap: 1.25,
                                    cursor: added ? 'default' : 'pointer',
                                    bgcolor: added
                                      ? isDarkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'
                                      : isDarkMode ? 'rgba(30,41,59,0.6)' : '#ffffff',
                                    border: `1px solid ${added
                                      ? isDarkMode ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'
                                      : borderColor}`,
                                    borderRadius: 1.5,
                                    transition: 'all 0.15s ease',
                                    opacity: added ? 0.65 : 1,
                                    '&:hover': added ? {} : {
                                      bgcolor: isDarkMode ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
                                      borderColor: isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)',
                                    },
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 28, height: 28, flexShrink: 0,
                                      bgcolor: added
                                        ? isDarkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.18)'
                                        : isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                                      color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                      fontSize: '0.7rem', fontWeight: 700,
                                      border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'}`,
                                    }}
                                  >
                                    {member.name[0]}
                                  </Avatar>
                                  <Box flex={1} minWidth={0}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: textPrimary, lineHeight: 1.3 }}>
                                        {member.name}
                                      </Typography>
                                      <Typography sx={{ fontSize: '0.63rem', color: textSecondary, fontFamily: 'monospace' }}>
                                        {member.employeeNumber}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.2, alignItems: 'center' }}>
                                      <Chip
                                        label={member.position}
                                        size="small"
                                        sx={{
                                          height: 15, fontSize: '0.58rem', fontWeight: 700,
                                          bgcolor: isDarkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                                          color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                          border: `1px solid ${isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.13)'}`,
                                          '& .MuiChip-label': { px: 0.5 },
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                  {added ? (
                                    <Chip
                                      label="선택됨"
                                      size="small"
                                      sx={{
                                        height: 16, fontSize: '0.58rem', fontWeight: 700,
                                        bgcolor: isDarkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                                        color: isDarkMode ? '#a5b4fc' : '#4338ca',
                                        '& .MuiChip-label': { px: 0.5 },
                                      }}
                                    />
                                  ) : (
                                    <AddIcon sx={{ fontSize: '0.95rem', color: textSecondary, opacity: 0.5, flexShrink: 0 }} />
                                  )}
                                </Box>
                              )
                            })}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>
      </Collapse>
    </Box>
  )
}
